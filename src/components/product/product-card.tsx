import Link from "next/link";
import { routes } from "@/config/site";
import { formatPrice, formatUnit } from "@/lib/format/bengali";
import { ChangeBadge } from "@/components/ui/change-badge";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={routes.product(product.slug)}
      className="card border-base-300 bg-base-100 hover:border-primary/50 border transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="card-body gap-3 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="bg-base-200 flex size-12 shrink-0 items-center justify-center rounded-xl text-3xl"
          >
            {product.image}
          </span>
          <div className="min-w-0">
            <h3 className="text-base-content truncate text-lg leading-snug font-semibold">
              {product.nameBn}
            </h3>
            <p className="text-base-content/60 text-sm">{formatUnit(product.unit)}</p>
          </div>
        </div>
        <div className="border-base-300 flex items-end justify-between gap-2 border-t border-dashed pt-3">
          <div>
            <p className="text-base-content/60 text-xs">আজকের দাম</p>
            <p className="text-primary text-xl font-bold">{formatPrice(product.today)}</p>
          </div>
          <ChangeBadge change={product.change} />
        </div>
      </div>
    </Link>
  );
}
