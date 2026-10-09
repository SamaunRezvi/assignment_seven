import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { routes } from "@/config/site";
import { getSession } from "@/lib/auth/session";
import { getSafeRedirect } from "@/lib/validation/redirect";
import { AuthCard, AuthDivider } from "@/components/auth/auth-card";
import { AuthRequiredToast } from "@/components/auth/auth-required-toast";
import { SignInForm } from "@/components/auth/sign-in-form";
import { SocialButtons } from "@/components/auth/social-buttons";

export const metadata: Metadata = { title: "সাইন ইন" };

interface SignInPageProps {
  searchParams: Promise<{ callbackUrl?: string; reason?: string }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { callbackUrl, reason } = await searchParams;
  const safeCallback = getSafeRedirect(callbackUrl);

  if (await getSession()) redirect(safeCallback);

  const signUpHref =
    safeCallback === routes.home
      ? routes.signUp
      : `${routes.signUp}?callbackUrl=${encodeURIComponent(safeCallback)}`;

  return (
    <>
      {reason === "auth-required" ? <AuthRequiredToast /> : null}
      <AuthCard
        title="সাইন ইন"
        description="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
        footer={
          <>
            অ্যাকাউন্ট নেই?{" "}
            <Link href={signUpHref} className="link link-primary font-medium">
              সাইন আপ করুন
            </Link>
          </>
        }
      >
        <SignInForm callbackUrl={safeCallback} />
        <AuthDivider />
        <SocialButtons callbackUrl={safeCallback} />
      </AuthCard>
    </>
  );
}
