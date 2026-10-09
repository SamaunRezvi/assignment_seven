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
    <Container className="max-w-md py-10">
      <div className="card border-base-300 bg-base-100 border shadow-sm">
        <div className="card-body gap-5 p-6 sm:p-8">
          <div className="space-y-1.5">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-base-content/70">{description}</p>
            <Link href={routes.home} className="link link-hover text-primary text-sm">
              ← হোম পেজে ফিরে যান
            </Link>
          </div>
          {children}
          <p className="text-base-content/70 text-center text-sm">{footer}</p>
        </div>
      </div>
    </Container>
  );
}

export function AuthDivider() {
  return (
    <div
      className="text-base-content/50 flex items-center gap-3 text-sm"
      role="separator"
    >
      <span className="bg-base-300 h-px flex-1" />
      অথবা
      <span className="bg-base-300 h-px flex-1" />
    </div>
  );
}
