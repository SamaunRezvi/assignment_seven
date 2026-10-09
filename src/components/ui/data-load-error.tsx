"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { ErrorState } from "./error-state";

interface DataLoadErrorProps {
  message: string;
  retryable?: boolean;
}

/** Shown by server pages when the data API fails, with an in-place retry. */
export function DataLoadError({ message, retryable = true }: DataLoadErrorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <ErrorState
      title="তথ্য আনা যায়নি"
      message={isPending ? "আবার চেষ্টা করা হচ্ছে..." : message}
      onRetry={retryable ? () => startTransition(() => router.refresh()) : undefined}
    />
  );
}
