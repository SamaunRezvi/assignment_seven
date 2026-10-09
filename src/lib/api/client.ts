import "server-only";
import type { ZodType } from "zod";
import { getServerEnv } from "@/lib/env";
import { ApiError } from "./errors";

const REQUEST_TIMEOUT_MS = 8000;
const REVALIDATE_SECONDS = 300;

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

/**
 * Fetches and validates JSON from the primary API, then retries once on the
 * fallback API when the failure is transient (network, timeout, 5xx).
 */
export async function apiFetch<T>(path: string, schema: ZodType<T>): Promise<T> {
  const env = getServerEnv();

  try {
    return await requestOnce(env.API_BASE_URL, path, schema);
  } catch (error) {
    if (!(error instanceof ApiError) || !error.isRetryable) throw error;
    return requestOnce(env.API_FALLBACK_BASE_URL, path, schema);
  }
}
