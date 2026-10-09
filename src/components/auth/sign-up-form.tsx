"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { routes } from "@/config/site";
import { authClient } from "@/lib/auth/auth-client";
import { NETWORK_ERROR_MESSAGE, getAuthErrorMessage } from "@/lib/auth/errors";
import {
  getFieldErrors,
  signUpSchema,
  type FieldErrors,
  type SignUpInput,
} from "@/lib/validation/auth";
import { getSafeRedirect } from "@/lib/validation/redirect";
import { FormField } from "./form-field";

export function SignUpForm({ callbackUrl }: { callbackUrl?: string | null }) {
  const router = useRouter();
  const [errors, setErrors] = useState<FieldErrors<SignUpInput>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const formData = new FormData(event.currentTarget);
    const parsed = signUpSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!parsed.success) {
      const fieldErrors = getFieldErrors<SignUpInput>(parsed.error);
      setErrors(fieldErrors);
      toast.error(Object.values(fieldErrors)[0] ?? "তথ্য সঠিকভাবে পূরণ করুন।");
      return;
    }

    setErrors({});
    setIsPending(true);

    try {
      const { error } = await authClient.signUp.email(parsed.data);
      if (error) {
        const message = getAuthErrorMessage(
          error,
          "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।",
        );
        setFormError(message);
        toast.error(message);
        return;
      }

      // Registration signs the user in; end that session so they land on the sign in page.
      await authClient.signOut().catch(() => undefined);

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।");
      const target = new URLSearchParams();
      const safeCallback = getSafeRedirect(callbackUrl);
      if (safeCallback !== routes.home) target.set("callbackUrl", safeCallback);
      const query = target.toString();
      router.replace(query ? `${routes.signIn}?${query}` : routes.signIn);
    } catch {
      setFormError(NETWORK_ERROR_MESSAGE);
      toast.error(NETWORK_ERROR_MESSAGE);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <FormField
        label="নাম"
        name="name"
        autoComplete="name"
        placeholder="আপনার নাম"
        error={errors.name}
        disabled={isPending}
        required
      />
      <FormField
        label="ইমেইল"
        name="email"
        type="email"
        autoComplete="email"
        inputMode="email"
        placeholder="you@example.com"
        error={errors.email}
        disabled={isPending}
        required
      />
      <FormField
        label="পাসওয়ার্ড"
        name="password"
        type="password"
        autoComplete="new-password"
        placeholder="কমপক্ষে ৮ অক্ষর, অক্ষর ও সংখ্যা সহ"
        error={errors.password}
        disabled={isPending}
        required
      />
      {formError ? (
        <div role="alert" className="alert alert-error alert-soft text-sm">
          {formError}
        </div>
      ) : null}
      <button type="submit" disabled={isPending} className="btn btn-primary w-full">
        {isPending ? <span className="loading loading-spinner loading-sm" /> : null}
        রেজিস্টার করুন
      </button>
    </form>
  );
}
