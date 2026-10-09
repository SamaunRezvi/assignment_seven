import "server-only";
import { z } from "zod";

const apiBaseUrl = z
  .string()
  .url()
  .refine((value) => value.startsWith("https://"), "API URLs must use HTTPS");

const serverEnvSchema = z.object({
  API_BASE_URL: apiBaseUrl.default("https://api.api-store.workers.dev/api/bazardor"),
  API_FALLBACK_BASE_URL: apiBaseUrl.default("https://api.abcz.workers.dev/api/bazardor"),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let cached: ServerEnv | undefined;

export function getServerEnv(): ServerEnv {
  if (!cached) {
    const result = serverEnvSchema.safeParse({
      API_BASE_URL: process.env.API_BASE_URL || undefined,
      API_FALLBACK_BASE_URL: process.env.API_FALLBACK_BASE_URL || undefined,
    });

    if (!result.success) {
      throw new Error(
        `Invalid environment configuration: ${result.error.issues
          .map((issue) => issue.path.join("."))
          .join(", ")}`,
      );
    }
    cached = result.data;
  }
  return cached;
}
