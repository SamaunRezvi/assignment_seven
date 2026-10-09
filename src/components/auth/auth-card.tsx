import Link from "next/link";
import { routes } from "@/config/site";
import { Container } from "@/components/ui/container";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <Container className="flex max-w-md flex-col gap-6 py-10">
      <header className="text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-base-content/70 mt-1 text-sm">{description}</p>
      </header>
      <div className="card border-base-300 bg-base-100 border">
        <div className="card-body">
          <div className="flex flex-col gap-4">
            {children}
            <p className="text-base-content/70 text-center text-sm">{footer}</p>
          </div>
        </div>
      </div>
      <p className="text-base-content/60 text-center text-sm">
        <Link href={routes.home} className="link">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </Container>
  );
}

export function AuthDivider() {
  return (
    <div className="divider my-0 text-xs" role="separator">
      অথবা
    </div>
  );
}
