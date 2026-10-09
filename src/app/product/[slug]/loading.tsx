import { Container } from "@/components/ui/container";

export default function ProductLoading() {
  return (
    <Container className="space-y-10 py-8" aria-busy="true">
      <div className="skeleton h-4 w-32" />
      <div className="skeleton h-44 w-full rounded-2xl" />
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="skeleton h-24 rounded-2xl" />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="skeleton h-52 rounded-2xl" />
        ))}
      </div>
    </Container>
  );
}
