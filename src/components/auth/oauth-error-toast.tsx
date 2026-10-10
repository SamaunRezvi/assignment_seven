"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getOAuthErrorMessage } from "@/lib/auth/errors";

const TOAST_ID = "oauth-error";
const ERROR_CODE_PATTERN = /^[a-z_]{1,64}$/;

/**
 * Social sign in failures come back as `?error=code` on the callback URL. This
 * shows a localized message and removes the parameter. The raw code is never
 * displayed, so a crafted URL cannot inject text into the page.
 */
export function OAuthErrorToast() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const code = searchParams.get("error");

  useEffect(() => {
    if (!code || !ERROR_CODE_PATTERN.test(code)) return;

    toast.error(getOAuthErrorMessage(code), { id: TOAST_ID });

    const remaining = new URLSearchParams(searchParams.toString());
    remaining.delete("error");
    remaining.delete("error_description");
    const query = remaining.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [code, pathname, router, searchParams]);

  return null;
}
