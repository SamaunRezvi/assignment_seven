import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { routes } from "@/config/site";
import { getSession } from "@/lib/auth/session";
import { getSafeRedirect } from "@/lib/validation/redirect";
import { AuthCard, AuthDivider } from "@/components/auth/auth-card";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { SocialButtons } from "@/components/auth/social-buttons";

export const metadata: Metadata = { title: "সাইন আপ" };

interface SignUpPageProps {
  searchParams: Promise<{ callbackUrl?: string }>;
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const { callbackUrl } = await searchParams;
  const safeCallback = getSafeRedirect(callbackUrl);

  if (await getSession()) redirect(routes.home);

  const signInHref =
    safeCallback === routes.home
      ? routes.signIn
      : `${routes.signIn}?callbackUrl=${encodeURIComponent(safeCallback)}`;

  return (
    <AuthCard
      title="রেজিস্ট্রেশন"
      description="নতুন অ্যাকাউন্ট খুলে বাজারের বিস্তারিত দাম দেখুন।"
      footer={
        <>
          আগেই অ্যাকাউন্ট আছে?{" "}
          <Link href={signInHref} className="link link-primary font-medium">
            সাইন ইন করুন
          </Link>
        </>
      }
    >
      <SignUpForm callbackUrl={safeCallback} />
      <AuthDivider />
      <SocialButtons callbackUrl={routes.home} />
    </AuthCard>
  );
}
