import { ProductGridSkeleton } from "@/components/product/product-grid-skeleton";
import { Container } from "@/components/ui/container";

export default function CategoryLoading() {
  return (
    <Container className="py-8">
      <div className="mb-6 flex items-center gap-4">
        <div className="skeleton size-14 rounded-2xl" />
        <div className="space-y-2">
          <div className="skeleton h-8 w-32" />
          <div className="skeleton h-4 w-56" />
        </div>
      </div>
      <div className="mb-5 flex items-center justify-between">
        <div className="skeleton h-4 w-48" />
        <div className="skeleton h-10 w-48" />
      </div>
      <ProductGridSkeleton count={8} />
    </Container>
  );
}
