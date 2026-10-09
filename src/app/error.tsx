"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ui/error-state";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app] Unhandled error", error);
  }, [error]);

  return (
    <ErrorState
      title="কিছু একটা সমস্যা হয়েছে"
      message="অপ্রত্যাশিত একটি সমস্যা হয়েছে। আবার চেষ্টা করুন, সমস্যা থাকলে কিছুক্ষণ পর আসুন।"
      onRetry={reset}
    />
  );
}
