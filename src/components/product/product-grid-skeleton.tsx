import { productGridClassName } from "./product-grid";

export function ProductCardSkeleton() {
  return (
    <div className="card border-base-300 bg-base-100 border">
      <div className="card-body gap-3 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="skeleton size-12 shrink-0 rounded-xl" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-5 w-3/4" />
            <div className="skeleton h-4 w-1/3" />
          </div>
        </div>
        <div className="border-base-300 flex items-end justify-between border-t border-dashed pt-3">
          <div className="space-y-2">
            <div className="skeleton h-3 w-16" />
            <div className="skeleton h-6 w-24" />
          </div>
          <div className="skeleton h-6 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      className={productGridClassName}
      role="status"
      aria-label="পণ্যের তালিকা লোড হচ্ছে"
    >
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
      <span className="sr-only">লোড হচ্ছে...</span>
    </div>
  );
}
