import "server-only";
import type { ZodType } from "zod";
import { getServerEnv } from "@/lib/env";
import { ApiError } from "./errors";
import { getFallbackPayload } from "./fallback-data";

const REQUEST_TIMEOUT_MS = 6000;
const UNHEALTHY_COOLDOWN_MS = 60_000;
const REVALIDATE_SECONDS = 1800;

async function requestOnce<T>(baseUrl: string, path: string, schema: ZodType<T>) {
  let response: Response;

  try {
    response = await fetch(`${baseUrl}${path}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      next: { revalidate: REVALIDATE_SECONDS },
    });
  } catch (error) {
    const isTimeout = error instanceof DOMException && error.name === "TimeoutError";
    throw new ApiError(isTimeout ? "timeout" : "network", { cause: error });
  }

  if (response.status === 404) throw new ApiError("not-found", { status: 404 });
  if (response.status === 429) throw new ApiError("rate-limited", { status: 429 });
  if (response.status >= 500) throw new ApiError("server", { status: response.status });
  if (!response.ok) throw new ApiError("client", { status: response.status });

  let payload: unknown;
  try {
    payload = await response.json();
  } catch (error) {
    throw new ApiError("invalid-response", { status: response.status, cause: error });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    throw new ApiError("invalid-response", {
      status: response.status,
      cause: parsed.error,
    });
  }
  return parsed.data;
}

/** Endpoints that failed recently, mapped to the time they may be tried first again. */
const unhealthyUntil = new Map<string, number>();

function isHealthy(url: string): boolean {
  return (unhealthyUntil.get(url) ?? 0) <= Date.now();
}

function orderEndpoints(endpoints: string[]): string[] {
  return [...endpoints.filter(isHealthy), ...endpoints.filter((url) => !isHealthy(url))];
}

/** Serves the bundled snapshot, validated like a live response, when one exists. */
function readSnapshot<T>(path: string, schema: ZodType<T>): T | undefined {
  const payload = getFallbackPayload(path);
  if (payload === undefined) return undefined;

  const parsed = schema.safeParse(payload);
  return parsed.success ? parsed.data : undefined;
}

/**
 * Fetches and validates JSON using whichever API is available. A failing API
 * is skipped for a minute so a single outage never slows every request, and
 * both APIs are still tried before falling back to the bundled snapshot.
 */
export async function apiFetch<T>(path: string, schema: ZodType<T>): Promise<T> {
  const env = getServerEnv();
  const configured = env.API_BASE_URLS;

  // Both APIs failed moments ago: do not hammer them again, use the snapshot.
  if (!configured.some(isHealthy)) {
    const snapshot = readSnapshot(path, schema);
    if (snapshot !== undefined) return snapshot;
  }

  const endpoints = orderEndpoints(configured);
  let lastError: ApiError | undefined;

  for (const baseUrl of endpoints) {
    try {
      const data = await requestOnce(baseUrl, path, schema);
      unhealthyUntil.delete(baseUrl);
      return data;
    } catch (error) {
      if (!(error instanceof ApiError)) throw error;
      // Not found and client errors are answers, not outages, so do not fail over.
      if (!error.shouldFailover) throw error;

      unhealthyUntil.set(baseUrl, Date.now() + UNHEALTHY_COOLDOWN_MS);
      console.warn(
        `[api] ${new URL(baseUrl).host} failed (${error.kind}), trying next endpoint`,
      );
      lastError = error;
    }
  }

  const snapshot = readSnapshot(path, schema);
  if (snapshot !== undefined) {
    console.warn(`[api] All endpoints failed for ${path}, serving the bundled snapshot`);
    return snapshot;
  }

  throw lastError ?? new ApiError("network");
}
