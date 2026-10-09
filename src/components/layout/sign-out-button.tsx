"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { routes } from "@/config/site";
import { authClient } from "@/lib/auth/auth-client";
import { NETWORK_ERROR_MESSAGE, getAuthErrorMessage } from "@/lib/auth/errors";

export function SignOutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleSignOut() {
    setIsPending(true);
    try {
      const { error } = await authClient.signOut();
      if (error) {
        toast.error(getAuthErrorMessage(error, "সাইন আউট করা যায়নি। আবার চেষ্টা করুন।"));
        return;
      }
      toast.success("সফলভাবে সাইন আউট হয়েছে।");
      router.replace(routes.home);
      router.refresh();
    } catch {
      toast.error(NETWORK_ERROR_MESSAGE);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isPending}
      className="hover:bg-base-200 flex min-h-8 w-full cursor-pointer items-center gap-1 rounded-lg px-2 py-1 text-left text-sm text-red-500 disabled:cursor-wait disabled:opacity-60"
    >
      {isPending ? (
        <span aria-hidden="true" className="loading loading-spinner loading-xs" />
      ) : (
        <svg
          aria-hidden="true"
          className="size-3.5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 10-4 4 4 4M5 14h10a4 4 0 0 0 0-8h-2" />
        </svg>
      )}
      সাইন আউট
    </button>
  );
}
