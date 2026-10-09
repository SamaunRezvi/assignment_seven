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
      className="btn btn-outline btn-primary btn-sm sm:btn-md"
    >
      {isPending ? <span className="loading loading-spinner loading-xs" /> : null}
      সাইন আউট
    </button>
  );
}
