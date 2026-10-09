import Link from "next/link";
import { routes } from "@/config/site";
import { getSession } from "@/lib/auth/session";
import { SignOutButton } from "./sign-out-button";

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

  const { name } = session.user;

  return (
    <div className="flex items-center gap-2">
      <Link
        href={routes.profile}
        className="btn btn-ghost btn-sm sm:btn-md max-w-40 gap-2"
        aria-label="আমার প্রোফাইল"
      >
        <span
          aria-hidden="true"
          className="bg-primary text-primary-content flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
        >
          {name.trim().charAt(0).toUpperCase()}
        </span>
        <span className="hidden truncate sm:inline">{name}</span>
      </Link>
      <SignOutButton />
    </div>
  );
}
