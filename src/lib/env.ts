import "server-only";
import { z } from "zod";

/** Tried in this order; the bundled snapshot is used only when all of them fail. */
const DEFAULT_API_BASE_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

const apiBaseUrl = z
  .string()
  .url()
  .refine((value) => value.startsWith("https://"), "API URLs must use HTTPS")
  .transform((value) => value.replace(/\/+$/, ""));

const serverEnvSchema = z.object({
  API_BASE_URLS: z
    .string()
    .transform((value) =>
      value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    )
    .pipe(z.array(apiBaseUrl).min(1).max(5)),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let cached: ServerEnv | undefined;

export function getServerEnv(): ServerEnv {
  if (!cached) {
    const result = serverEnvSchema.safeParse({
      API_BASE_URLS: process.env.API_BASE_URLS || DEFAULT_API_BASE_URLS.join(","),
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
