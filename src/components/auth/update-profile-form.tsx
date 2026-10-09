"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { routes } from "@/config/site";
import { authClient } from "@/lib/auth/auth-client";
import { NETWORK_ERROR_MESSAGE, getAuthErrorMessage } from "@/lib/auth/errors";
import { getFieldErrors, updateNameSchema, type FieldErrors, type UpdateNameInput } from "@/lib/validation/auth";
import { FormField } from "./form-field";

export function UpdateProfileForm({ currentName }: { currentName: string }) {
  const router = useRouter();
  const [errors, setErrors] = useState<FieldErrors<UpdateNameInput>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const parsed = updateNameSchema.safeParse({
      name: new FormData(event.currentTarget).get("name"),
    });

    if (!parsed.success) {
      const fieldErrors = getFieldErrors<UpdateNameInput>(parsed.error);
      setErrors(fieldErrors);
      toast.error(fieldErrors.name ?? "নাম সঠিকভাবে লিখুন।");
      return;
    }

    setErrors({});
    setIsPending(true);

    try {
      const { error } = await authClient.updateUser({ name: parsed.data.name });
      if (error) {
        const message = getAuthErrorMessage(error, "তথ্য আপডেট করা যায়নি। আবার চেষ্টা করুন।");
        setFormError(message);
        toast.error(message);
        return;
      }
      toast.success("আপনার তথ্য সফলভাবে আপডেট হয়েছে।");
      router.push(routes.profile);
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
        label="নাম"
        name="name"
        autoComplete="name"
        defaultValue={currentName}
        error={errors.name}
        disabled={isPending}
        required
      />
      {formError ? (
        <div role="alert" className="alert alert-error alert-soft text-sm">
          {formError}
        </div>
      ) : null}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="submit" disabled={isPending} className="btn btn-primary flex-1">
          {isPending ? <span className="loading loading-spinner loading-sm" /> : null}
          তথ্য আপডেট করুন
        </button>
        <Link href={routes.profile} className="btn btn-ghost">
          বাতিল
        </Link>
      </div>
    </form>
  );
}
