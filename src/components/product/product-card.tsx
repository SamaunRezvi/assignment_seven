import Link from "next/link";
import { routes } from "@/config/site";
import { formatNumber, formatUnit } from "@/lib/format/bengali";
import { ChangeBadge } from "@/components/ui/change-badge";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={routes.product(product.slug)}
      className="card border-base-300 bg-base-100 hover:border-primary focus-visible:outline-primary border transition hover:shadow-md focus-visible:outline-2"
    >
      <div className="card-body gap-3 p-4">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="bg-base-200 grid size-12 shrink-0 place-items-center rounded-xl text-2xl"
          >
            {product.image}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold">{product.nameBn}</h3>
            <p className="text-base-content/70 text-xs">{formatUnit(product.unit)}</p>
          </div>
        </div>
        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-base-content/70 text-xs">আজকের দাম</p>
            <p className="text-xl font-bold">
              {formatNumber(product.today)}{" "}
              <span className="text-sm font-medium">টাকা</span>
            </p>
          </div>
          <ChangeBadge change={product.change} />
        </div>
      </div>
    </Link>
  );
}
