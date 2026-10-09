import { siteConfig } from "@/config/site";
import { getProducts } from "@/lib/api/products";
import { getUserMessage, isApiError } from "@/lib/api/errors";
import { formatNumber } from "@/lib/format/bengali";
import { getTopFallers, getTopRisers } from "@/lib/products/selectors";
import { Hero } from "@/components/home/hero";
import { SectionHeading } from "@/components/home/section-heading";
import { ProductGrid } from "@/components/product/product-grid";
import { SortableProductGrid } from "@/components/product/sortable-product-grid";
import { Container } from "@/components/ui/container";
import { DataLoadError } from "@/components/ui/data-load-error";
import type { Product } from "@/types/product";

export default async function HomePage() {
  let products: Product[];

  try {
    products = await getProducts();
  } catch (error) {
    console.error("[home] Failed to load products", error);
    return (
      <>
        <Hero />
        <DataLoadError
          message={getUserMessage(error)}
          retryable={!isApiError(error) || error.isRetryable}
        />
      </>
    );
  }

  const risers = getTopRisers(products);
  const fallers = getTopFallers(products);
  const total = formatNumber(products.length);

  return (
    <>
      <Hero />
      <Container className="space-y-14 py-10">
        <section aria-labelledby="risers">
          <SectionHeading
            id="risers"
            title="আজ দাম বেড়েছে"
            marker={{ symbol: "▲", tone: "up" }}
          />
          <ProductGrid products={risers} />
        </section>

        <section aria-labelledby="fallers">
          <SectionHeading
            id="fallers"
            title="আজ দাম কমেছে"
            marker={{ symbol: "▼", tone: "down" }}
          />
          <ProductGrid products={fallers} />
        </section>

        <section id={siteConfig.allProductsAnchor} aria-labelledby="all-products" className="scroll-mt-4">
          <SectionHeading id="all-products" title="সব পণ্য" />
          <SortableProductGrid
            products={products}
            summary={`মোট ${total}টি পণ্য দেখানো হচ্ছে`}
          />
        </section>
      </Container>
    </>
  );
}
