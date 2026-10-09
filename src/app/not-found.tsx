import type { Metadata } from "next";
import { ErrorState } from "@/components/ui/error-state";

export const metadata: Metadata = { title: "পেজ পাওয়া যায়নি" };

export default function NotFound() {
  return (
    <ErrorState
      icon="🔍"
      title="৪০৪ | পেজ পাওয়া যায়নি"
      message="আপনি যে পেজটি খুঁজছেন তা নেই, সরানো হয়েছে বা ঠিকানাটি ভুল।"
    />
  );
}
