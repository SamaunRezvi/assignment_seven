import type { Metadata } from "next";
import Link from "next/link";
import { routes } from "@/config/site";
import { requireSession } from "@/lib/auth/session";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "আমার প্রোফাইল" };

const joinedFormatter = new Intl.DateTimeFormat("bn-BD", {
  timeZone: "Asia/Dhaka",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function ProfilePage() {
  const { user } = await requireSession(routes.profile);

  return (
    <Container className="max-w-3xl space-y-5 py-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-base-content/70">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </header>
      <div className="card border-base-300 bg-base-100 border shadow-sm">
        <div className="card-body items-center gap-5 p-6 text-center sm:p-10">
          <span
            aria-hidden="true"
            className="bg-primary text-primary-content flex size-24 items-center justify-center rounded-full text-4xl font-bold"
          >
            {user.name.trim().charAt(0).toUpperCase()}
          </span>
          <div className="space-y-1">
            <h2 className="text-3xl font-bold">{user.name}</h2>
            <p className="text-base-content/70 break-all">{user.email}</p>
          </div>

          <dl className="border-base-300 grid w-full grid-cols-1 gap-3 border-t border-dashed pt-5 text-center sm:grid-cols-2">
            <div>
              <dt className="text-base-content/70 text-sm">নাম</dt>
              <dd className="font-medium">{user.name}</dd>
            </div>
            <div>
              <dt className="text-base-content/70 text-sm">যোগ দিয়েছেন</dt>
              <dd className="font-medium">
                {joinedFormatter.format(new Date(user.createdAt))}
              </dd>
            </div>
          </dl>

          <Link href={routes.profileUpdate} className="btn btn-primary w-full sm:w-auto">
            তথ্য আপডেট করুন
          </Link>
        </div>
      </div>
    </Container>
  );
}
