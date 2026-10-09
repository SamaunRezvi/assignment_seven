import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { routes } from "@/config/site";
import { getAuth } from "./auth";

export const getSession = cache(async () => {
  // Reading headers first keeps every page dynamic, even when auth is misconfigured.
  const requestHeaders = await headers();

  try {
    return await getAuth().api.getSession({ headers: requestHeaders });
  } catch (error) {
    console.warn(
      "[auth] Could not resolve session, treating visitor as signed out:",
      error instanceof Error ? error.message : "unknown error",
    );
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
