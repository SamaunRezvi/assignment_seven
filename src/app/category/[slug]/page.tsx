import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getCategory } from "@/lib/api/products";
import { getUserMessage, isApiError } from "@/lib/api/errors";
import {
  CategoryProducts,
  CategorySubtitle,
} from "@/components/product/category-products";
import { ProductGridSkeleton } from "@/components/product/product-grid-skeleton";
import { Container } from "@/components/ui/container";
import { DataLoadError } from "@/components/ui/data-load-error";
import type { Category } from "@/types/product";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const category = await getCategory(slug);
    return category
      ? { title: `${category.nameBn} এর আজকের দাম` }
      : { title: "পেজ পাওয়া যায়নি" };
  } catch {
    return { title: "পণ্যের দাম" };
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  let category: Category | null;
  try {
    category = await getCategory(slug);
  } catch (error) {
    console.error(
      `[category:${slug}] Failed to load category`,
      isApiError(error) ? error.kind : "unknown",
    );
    return (
      <DataLoadError
        message={getUserMessage(error)}
        retryable={!isApiError(error) || error.isRetryable}
      />
    );
  }

  // Resolved before anything streams, so unknown categories get a real 404 status.
  if (!category) notFound();

  return (
    <Container className="flex flex-col gap-6 py-6">
      <header className="border-base-300 bg-base-100 flex items-center gap-3 rounded-2xl border p-5">
        <span aria-hidden="true" className="text-4xl">
          {category.icon}
        </span>
        <div>
          <h1 className="text-2xl font-bold">{category.nameBn}</h1>
          <Suspense fallback={<div className="skeleton mt-1 h-4 w-56" />}>
            <CategorySubtitle slug={category.slug} />
          </Suspense>
        </div>
      </header>

      <Suspense fallback={<ProductGridSkeleton count={8} />}>
        <CategoryProducts slug={category.slug} />
      </Suspense>
    </Container>
  );
}
