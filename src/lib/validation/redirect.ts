import { routes } from "@/config/site";

/**
 * Accepts only same-site relative paths so a crafted callback URL can never
 * send a user to another origin after signing in.
 */
export function getSafeRedirect(target: string | null | undefined): string {
  if (!target) return routes.home;
  if (!target.startsWith("/") || target.startsWith("//") || target.includes("\\")) {
    return routes.home;
  }
  if (/[\u0000-\u001f]/.test(target)) return routes.home;
  return target;
}
