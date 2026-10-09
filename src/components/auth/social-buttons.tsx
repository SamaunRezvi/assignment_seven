"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient, type SocialProvider } from "@/lib/auth/auth-client";
import { NETWORK_ERROR_MESSAGE, getAuthErrorMessage } from "@/lib/auth/errors";
import { getSafeRedirect } from "@/lib/validation/redirect";

const providers: Array<{ id: SocialProvider; label: string; icon: React.ReactNode }> = [
  {
    id: "google",
    label: "Google দিয়ে চালিয়ে যান",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
        <path
          fill="#4285F4"
          d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.27-2.09 3.57-5.17 3.57-8.81Z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.24 0 5.96-1.07 7.94-2.92l-3.87-3a7.2 7.2 0 0 1-10.7-3.78H1.4v3.1A12 12 0 0 0 12 24Z"
        />
        <path
          fill="#FBBC05"
          d="M5.37 14.3a7.2 7.2 0 0 1 0-4.6v-3.1H1.4a12 12 0 0 0 0 10.8l3.97-3.1Z"
        />
        <path
          fill="#EA4335"
          d="M12 4.75c1.76 0 3.34.6 4.58 1.8l3.43-3.43A11.5 11.5 0 0 0 12 0 12 12 0 0 0 1.4 6.6l3.97 3.1A7.2 7.2 0 0 1 12 4.75Z"
        />
      </svg>
    ),
  },
  {
    id: "github",
    label: "GitHub দিয়ে চালিয়ে যান",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" />
      </svg>
    ),
  },
];

export function SocialButtons({ callbackUrl }: { callbackUrl?: string | null }) {
  const [pending, setPending] = useState<SocialProvider | null>(null);

  async function handleClick(provider: SocialProvider) {
    setPending(provider);
    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: getSafeRedirect(callbackUrl),
      });
      if (error) {
        toast.error(getAuthErrorMessage(error, "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।"));
        setPending(null);
      }
    } catch {
      toast.error(NETWORK_ERROR_MESSAGE);
      setPending(null);
    }
  }

  return (
    <div className="grid gap-3">
      {providers.map((provider) => (
        <button
          key={provider.id}
          type="button"
          onClick={() => handleClick(provider.id)}
          disabled={pending !== null}
          className="btn btn-outline w-full gap-3"
        >
          {pending === provider.id ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            provider.icon
          )}
          {provider.label}
        </button>
      ))}
    </div>
  );
}
