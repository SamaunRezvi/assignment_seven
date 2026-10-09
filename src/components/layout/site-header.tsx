import Link from "next/link";
import { Suspense } from "react";
import { fallbackCategories } from "@/config/categories";
import { routes, siteConfig } from "@/config/site";
import { getCategories } from "@/lib/api/products";
import { formatBengaliDate } from "@/lib/format/bengali";
import type { Category } from "@/types/product";
import { Container } from "@/components/ui/container";
import { AuthMenu } from "./auth-menu";
import { CategoryNav } from "./category-nav";

async function loadCategories(): Promise<Category[]> {
  try {
    return await getCategories();
  } catch (error) {
    console.error("[header] Falling back to default categories", error);
    return fallbackCategories;
  }
}

async function HeaderCategoryNav() {
  return <CategoryNav categories={await loadCategories()} />;
}

export function SiteHeader() {
  return (
    <header className="border-base-300 bg-base-100/95 sticky top-0 z-40 border-b backdrop-blur">
      <Container>
        <div className="flex items-center gap-3 py-3">
          <Link href={routes.home} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="bg-primary text-primary-content grid size-10 place-items-center rounded-xl text-lg"
            >
              🛒
            </span>
            <span className="leading-tight">
              <span className="block text-xl font-bold tracking-tight">
                {siteConfig.name}
              </span>
              <span className="text-base-content/60 block text-xs">
                {formatBengaliDate()}
              </span>
            </span>
          </Link>
          <div className="ms-auto">
            <Suspense fallback={<div className="skeleton h-8 w-32 sm:h-12 sm:w-48" />}>
              <AuthMenu />
            </Suspense>
          </div>
        </div>
      </Container>
      <div className="border-base-200 bg-base-100 border-t">
        <Suspense
          fallback={<div className="skeleton border-base-300 mb-2 h-10 w-full" />}
        >
          <HeaderCategoryNav />
        </Suspense>
      </div>
    </header>
  );
}
