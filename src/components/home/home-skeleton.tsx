import { Container } from "@/components/ui/container";
import { ProductGridSkeleton } from "@/components/product/product-grid-skeleton";

export function HomeSkeleton() {
  return (
    <Container className="flex flex-col gap-8 py-6">
      <div className="skeleton h-56 w-full rounded-3xl" />
      <div className="skeleton h-7 w-48" />
      <ProductGridSkeleton count={6} />
      <div className="skeleton h-7 w-48" />
      <ProductGridSkeleton count={6} />
      <ProductGridSkeleton count={6} />
    </Container>
  );
}
