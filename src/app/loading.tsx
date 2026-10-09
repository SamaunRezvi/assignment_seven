import { Container } from "@/components/ui/container";
import { ProductGridSkeleton } from "@/components/product/product-grid-skeleton";

export default function HomeLoading() {
  return (
    <>
      <section className="bg-base-100">
        <Container className="grid items-center gap-8 py-10 md:grid-cols-2 md:py-16">
          <div className="space-y-4">
            <div className="skeleton h-7 w-2/3" />
            <div className="skeleton h-12 w-full" />
            <div className="skeleton h-20 w-full" />
            <div className="skeleton h-12 w-40" />
          </div>
          <div className="skeleton mx-auto h-56 w-full max-w-md" />
        </Container>
      </section>
      <Container className="space-y-14 py-10">
        <ProductGridSkeleton count={6} />
        <ProductGridSkeleton count={6} />
      </Container>
    </>
  );
}
