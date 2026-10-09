import Link from "next/link";
import { routes } from "@/config/site";
import { Container } from "@/components/ui/container";

interface ErrorStateProps {
  title: string;
  message: string;
  icon?: string;
  onRetry?: () => void;
  showHomeLink?: boolean;
}

export function ErrorState({
  title,
  message,
  icon = "⚠️",
  onRetry,
  showHomeLink = true,
}: ErrorStateProps) {
  return (
    <Container className="py-16">
      <div className="card border-base-300 bg-base-100 mx-auto max-w-lg border text-center">
        <div className="card-body items-center gap-3 p-8">
          <span aria-hidden="true" className="text-5xl">
            {icon}
          </span>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-base-content/70">{message}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {onRetry ? (
              <button type="button" onClick={onRetry} className="btn btn-primary">
                আবার চেষ্টা করুন
              </button>
            ) : null}
            {showHomeLink ? (
              <Link href={routes.home} className="btn btn-outline btn-primary">
                হোম পেজে ফিরে যান
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </Container>
  );
}
