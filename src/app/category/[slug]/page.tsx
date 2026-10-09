import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { routes } from "@/config/site";
import { getCategory, getProductsByCategory } from "@/lib/api/products";
import { getUserMessage, isApiError } from "@/lib/api/errors";
import { formatNumber } from "@/lib/format/bengali";
import { SortableProductGrid } from "@/components/product/sortable-product-grid";
import { Container } from "@/components/ui/container";
import { DataLoadError } from "@/components/ui/data-load-error";
import type { Category, Product } from "@/types/product";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const category = await getCategory(slug);
    return category ? { title: `${category.nameBn} এর আজকের দাম` } : { title: "পেজ পাওয়া যায়নি" };
  } catch {
    return { title: "পণ্যের দাম" };
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  let category: Category | null;
  let products: Product[];

  try {
    category = await getCategory(slug);
    if (!category) notFound();
    products = await getProductsByCategory(category.slug);
  } catch (error) {
    if (!isApiError(error)) throw error;
    console.error(`[category:${slug}] Failed to load data`, error.kind);
    return <DataLoadError message={getUserMessage(error)} retryable={error.isRetryable} />;
  }

  const total = formatNumber(products.length);

  return (
    <Container className="py-8">
      <header className="mb-6 flex items-center gap-4">
        <span
          aria-hidden="true"
          className="bg-base-100 border-base-300 flex size-14 items-center justify-center rounded-2xl border text-3xl"
        >
          {category.icon}
        </span>
        <div>
          <h1 className="text-3xl font-bold">{category.nameBn}</h1>
          <p className="text-base-content/70">{total}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </header>

      {products.length === 0 ? (
        <div className="card border-base-300 bg-base-100 mx-auto max-w-lg border text-center">
          <div className="card-body items-center gap-3 p-8">
            <span aria-hidden="true" className="text-5xl">
              📭
            </span>
            <h2 className="text-2xl font-bold">কোনো পণ্য পাওয়া যায়নি</h2>
            <p className="text-base-content/70">এই ধরনের কোনো পণ্যের দাম এখন তালিকায় নেই।</p>
            <Link href={routes.home} className="btn btn-primary mt-2">
              হোম পেজে ফিরে যান
            </Link>
          </div>
        </div>
      ) : (
        <SortableProductGrid
          products={products}
          summary={`মোট ${total}টি পণ্য দেখানো হচ্ছে`}
        />
      )}
    </Container>
  );
}
