import { betterAuth } from "better-auth";
import { Pool } from "pg";

/**
 * Schema-only configuration used by the Better Auth CLI to create and migrate
 * the database tables. Runtime settings live in src/lib/auth/auth.ts.
 */
export const auth = betterAuth({
  database: new Pool({ connectionString: process.env.DATABASE_URL }),
  emailAndPassword: { enabled: true },
  rateLimit: { storage: "database" },
});
