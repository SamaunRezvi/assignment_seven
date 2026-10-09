import "server-only";
import { z } from "zod";

const optionalSecret = z.string().min(1).optional();

const authEnvSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  BETTER_AUTH_SECRET: z
    .string()
    .min(32, "BETTER_AUTH_SECRET must be at least 32 characters"),
  BETTER_AUTH_URL: z.string().url("BETTER_AUTH_URL must be a valid URL"),
  GOOGLE_CLIENT_ID: optionalSecret,
  GOOGLE_CLIENT_SECRET: optionalSecret,
  GITHUB_CLIENT_ID: optionalSecret,
  GITHUB_CLIENT_SECRET: optionalSecret,
});

export type AuthEnv = z.infer<typeof authEnvSchema>;

let cached: AuthEnv | undefined;

export function getAuthEnv(): AuthEnv {
  if (!cached) {
    const result = authEnvSchema.safeParse({
      DATABASE_URL: process.env.DATABASE_URL,
      BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
      BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || undefined,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || undefined,
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || undefined,
      GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || undefined,
    });

    if (!result.success) {
      const details = result.error.issues.map((issue) => issue.message).join("; ");
      throw new Error(`Authentication is not configured correctly: ${details}`);
    }
    cached = result.data;
  }
  return cached;
}
