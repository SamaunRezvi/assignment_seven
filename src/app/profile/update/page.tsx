import type { Metadata } from "next";
import { routes } from "@/config/site";
import { requireSession } from "@/lib/auth/session";
import { UpdateProfileForm } from "@/components/auth/update-profile-form";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "তথ্য আপডেট" };

export default async function UpdateProfilePage() {
  const { user } = await requireSession(routes.profileUpdate);

  return (
    <Container className="max-w-md py-10">
      <div className="card border-base-300 bg-base-100 border shadow-sm">
        <div className="card-body gap-5 p-6 sm:p-8">
          <div className="space-y-1.5">
            <h1 className="text-3xl font-bold">তথ্য আপডেট</h1>
            <p className="text-base-content/70">আপনার প্রোফাইলের নাম পরিবর্তন করুন।</p>
          </div>
          <UpdateProfileForm currentName={user.name} />
        </div>
      </div>
    </Container>
  );
}
