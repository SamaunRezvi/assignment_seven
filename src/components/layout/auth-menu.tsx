import Link from "next/link";
import { routes } from "@/config/site";
import { getSession } from "@/lib/auth/session";
import { UserMenu } from "./user-menu";

export async function AuthMenu() {
  const session = await getSession();

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link href={routes.signIn} className="btn btn-ghost btn-sm sm:btn-md">
          সাইন ইন
        </Link>
        <Link href={routes.signUp} className="btn btn-primary btn-sm sm:btn-md">
          সাইন আপ
        </Link>
      </div>
    );
  }

  return <UserMenu name={session.user.name} email={session.user.email} />;
}
