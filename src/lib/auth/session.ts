import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { routes } from "@/config/site";
import { getAuth } from "./auth";

export const getSession = cache(async () => {
  try {
    return await getAuth().api.getSession({ headers: await headers() });
  } catch (error) {
    console.error("[auth] Failed to resolve session", error);
    return null;
  }
});

/** Server-side guard that backs up the optimistic check made in the proxy. */
export async function requireSession(callbackUrl: string) {
  const session = await getSession();
  if (!session) {
    const params = new URLSearchParams({ callbackUrl, reason: "auth-required" });
    redirect(`${routes.signIn}?${params.toString()}`);
  }
  return session;
}
