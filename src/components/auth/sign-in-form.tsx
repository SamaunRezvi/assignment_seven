"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth/auth-client";
import { NETWORK_ERROR_MESSAGE, getAuthErrorMessage } from "@/lib/auth/errors";
import {
  getFieldErrors,
  signInSchema,
  type FieldErrors,
  type SignInInput,
} from "@/lib/validation/auth";
import { getSafeRedirect } from "@/lib/validation/redirect";
import { FormField } from "./form-field";

export function SignInForm({ callbackUrl }: { callbackUrl?: string | null }) {
  const router = useRouter();
  const [errors, setErrors] = useState<FieldErrors<SignInInput>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const formData = new FormData(event.currentTarget);
    const parsed = signInSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!parsed.success) {
      const fieldErrors = getFieldErrors<SignInInput>(parsed.error);
      setErrors(fieldErrors);
      toast.error(Object.values(fieldErrors)[0] ?? "তথ্য সঠিকভাবে পূরণ করুন।");
      return;
    }

    setErrors({});
    setIsPending(true);

    try {
      const { error } = await authClient.signIn.email(parsed.data);
      if (error) {
        const message = getAuthErrorMessage(
          error,
          "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।",
        );
        setFormError(message);
        toast.error(message);
        return;
      }
      toast.success("সফলভাবে সাইন ইন হয়েছে।");
      router.replace(getSafeRedirect(callbackUrl));
      router.refresh();
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
        autoComplete="current-password"
        placeholder="••••••••"
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
        সাইন ইন
      </button>
    </form>
  );
}
