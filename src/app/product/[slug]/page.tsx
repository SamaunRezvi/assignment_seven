import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { routes } from "@/config/site";
import { getProductBySlug } from "@/lib/api/products";
import { getUserMessage, isApiError } from "@/lib/api/errors";
import { requireSession } from "@/lib/auth/session";
import { getPriceSummary } from "@/lib/products/selectors";
import { MarketPrices } from "@/components/product/detail/market-prices";
import { PriceHistory } from "@/components/product/detail/price-history";
import { PriceStats } from "@/components/product/detail/price-stats";
import { ProductSummary } from "@/components/product/detail/product-summary";
import { Container } from "@/components/ui/container";
import { DataLoadError } from "@/components/ui/data-load-error";
import type { Product } from "@/types/product";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const metadata: Metadata = { title: "পণ্যের বিস্তারিত দাম" };

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  await requireSession(routes.product(slug));

  let product: Product | null;
  try {
    product = await getProductBySlug(slug);
  } catch (error) {
    if (!isApiError(error)) throw error;
    console.error(`[product:${slug}] Failed to load data`, error.kind);
    return (
      <DataLoadError message={getUserMessage(error)} retryable={error.isRetryable} />
    );
  }

  if (!product) notFound();

  const summary = getPriceSummary(product.markets);

  return (
    <Container className="space-y-10 py-8">
      <nav aria-label="পেজ নেভিগেশন">
        <ol className="text-base-content/70 flex flex-wrap items-center gap-2 text-sm">
          <li>
            <Link
              href={routes.home}
              className="link link-hover text-primary-strong font-medium"
            >
              হোম
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link
              href={routes.category(product.category)}
              className="link link-hover text-primary-strong font-medium"
            >
              {product.categoryNameBn}
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li aria-current="page">{product.nameBn}</li>
        </ol>
      </nav>
      <ProductSummary product={product} />
      {summary ? <PriceStats summary={summary} unit={product.unit} /> : null}
      <PriceHistory product={product} />
      <MarketPrices markets={product.markets} />
    </Container>
  );
}
