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
    <header className="bg-base-100 shadow-sm">
      <Container>
        <div className="flex items-center justify-between gap-3 py-3">
          <Link href={routes.home} className="group flex flex-col leading-tight">
            <span className="text-primary text-xl font-bold sm:text-2xl">
              <span aria-hidden="true">🛒</span> {siteConfig.name}
            </span>
            <span className="text-base-content/60 text-xs sm:text-sm">
              {formatBengaliDate()}
            </span>
          </Link>
          <Suspense fallback={<div className="skeleton h-8 w-32 sm:h-12 sm:w-48" />}>
            <AuthMenu />
          </Suspense>
        </div>
        <Suspense
          fallback={<div className="skeleton border-base-300 mb-2 h-10 w-full" />}
        >
          <HeaderCategoryNav />
        </Suspense>
      </Container>
    </header>
  );
}
