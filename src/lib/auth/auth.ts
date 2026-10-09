import "server-only";
import { betterAuth } from "better-auth";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { signUpSchema, updateNameSchema } from "@/lib/validation/auth";
import { getPool } from "./database";
import { getAuthEnv } from "./env";

const ONE_DAY = 60 * 60 * 24;

function createAuth() {
  const env = getAuthEnv();
  const isProduction = process.env.NODE_ENV === "production";

  const socialProviders = {
    ...(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
      ? { google: { clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET } }
      : {}),
    ...(env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET
      ? { github: { clientId: env.GITHUB_CLIENT_ID, clientSecret: env.GITHUB_CLIENT_SECRET } }
      : {}),
  };

  return betterAuth({
    appName: "BazarDor",
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    database: getPool(),
    trustedOrigins: [env.BETTER_AUTH_URL],
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignIn: false,
    },
    socialProviders,
    session: {
      expiresIn: 7 * ONE_DAY,
      updateAge: ONE_DAY,
      cookieCache: { enabled: true, maxAge: 5 * 60 },
    },
    rateLimit: {
      enabled: true,
      storage: "database",
      window: 60,
      max: 60,
      customRules: {
        "/sign-in/email": { window: 60, max: 5 },
        "/sign-up/email": { window: 60, max: 5 },
        "/update-user": { window: 60, max: 10 },
      },
    },
    advanced: {
      useSecureCookies: isProduction,
      defaultCookieAttributes: { httpOnly: true, sameSite: "lax", secure: isProduction },
    },
    hooks: {
      before: createAuthMiddleware(async (ctx) => {
        if (ctx.path === "/sign-up/email") {
          const result = signUpSchema.safeParse(ctx.body);
          if (!result.success) {
            throw new APIError("BAD_REQUEST", { message: "Invalid sign up details" });
          }
        }
        if (ctx.path === "/update-user" && ctx.body && "name" in ctx.body) {
          const result = updateNameSchema.safeParse({ name: ctx.body.name });
          if (!result.success) {
            throw new APIError("BAD_REQUEST", { message: "Invalid name" });
          }
        }
      }),
    },
    plugins: [nextCookies()],
  });
}

type AuthInstance = ReturnType<typeof createAuth>;

let instance: AuthInstance | undefined;

/** Created on first use so that builds never need runtime secrets. */
export function getAuth(): AuthInstance {
  instance ??= createAuth();
  return instance;
}
