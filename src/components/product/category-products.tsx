import Link from "next/link";
import { routes } from "@/config/site";
import { getProductsByCategory } from "@/lib/api/products";
import { getUserMessage, isApiError } from "@/lib/api/errors";
import { formatNumber } from "@/lib/format/bengali";
import { DataLoadError } from "@/components/ui/data-load-error";
import type { Product } from "@/types/product";
import { SortableProductGrid } from "./sortable-product-grid";

/** Short line under the category title, streamed in with the product data. */
export async function CategorySubtitle({ slug }: { slug: string }) {
  let count: number;
  try {
    count = (await getProductsByCategory(slug)).length;
  } catch {
    return null;
  }

  return (
    <p className="text-base-content/70">
      {formatNumber(count)}টি পণ্যের আজকের দাম ও পরিবর্তন
    </p>
  );
}

/** Streams in after the category header so a skeleton can show while it loads. */
export async function CategoryProducts({ slug }: { slug: string }) {
  let products: Product[];

  try {
    products = await getProductsByCategory(slug);
  } catch (error) {
    console.error(
      `[category:${slug}] Failed to load products`,
      isApiError(error) ? error.kind : "unknown",
    );
    return (
      <DataLoadError
        message={getUserMessage(error)}
        retryable={!isApiError(error) || error.isRetryable}
      />
    );
  }

  const total = formatNumber(products.length);

  if (products.length === 0) {
    return (
      <div className="card border-base-300 bg-base-100 mx-auto max-w-lg border text-center">
        <div className="card-body items-center gap-3 p-8">
          <span aria-hidden="true" className="text-5xl">
            📭
          </span>
          <h2 className="text-2xl font-bold">কোনো পণ্য পাওয়া যায়নি</h2>
          <p className="text-base-content/70">
            এই ধরনের কোনো পণ্যের দাম এখন তালিকায় নেই।
          </p>
          <Link href={routes.home} className="btn btn-primary mt-2">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <SortableProductGrid
      products={products}
      summary={`মোট ${total}টি পণ্য দেখানো হচ্ছে`}
    />
  );
}
