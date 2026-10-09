import "server-only";
import { Pool } from "pg";
import { getAuthEnv } from "./env";

const globalForPool = globalThis as unknown as { __bazardorPool?: Pool };

/** One small pooled connection set per server instance, reused across hot reloads. */
export function getPool(): Pool {
  if (!globalForPool.__bazardorPool) {
    globalForPool.__bazardorPool = new Pool({
      connectionString: getAuthEnv().DATABASE_URL,
      max: 5,
      idleTimeoutMillis: 20_000,
      connectionTimeoutMillis: 10_000,
    });
  }
  return globalForPool.__bazardorPool;
}
