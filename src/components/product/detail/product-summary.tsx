import Link from "next/link";
import { routes } from "@/config/site";
import { formatNumber, formatPrice, formatShortUnit, formatUnit } from "@/lib/format/bengali";
import { ChangeBadge } from "@/components/ui/change-badge";
import type { Product } from "@/types/product";

export function ProductSummary({ product }: { product: Product }) {
  return (
    <section className="card border-base-300 bg-base-100 border">
      <div className="card-body gap-4 p-5 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <span
            aria-hidden="true"
            className="bg-base-200 flex size-20 shrink-0 items-center justify-center rounded-2xl text-5xl sm:size-24 sm:text-6xl"
          >
            {product.image}
          </span>
          <div className="min-w-0 flex-1 space-y-2">
            <h1 className="text-2xl font-bold sm:text-4xl">{product.nameBn}</h1>
            <p className="text-base-content/70">
              {formatNumber(product.markets.length)}টি বাজারের তথ্য অনুযায়ী {product.nameBn} এর আজকের
              দাম {formatPrice(product.today)}, {formatUnit(product.unit)}।
            </p>
            <ul className="flex flex-wrap gap-2 pt-1">
              <li>
                <Link
                  href={routes.category(product.category)}
                  className="badge badge-primary badge-soft hover:badge-primary h-auto gap-1 px-3 py-1.5"
                >
                  <span aria-hidden="true">{product.categoryIcon}</span>
                  {product.categoryNameBn}
                </Link>
              </li>
              <li>
                <span className="badge badge-ghost h-auto px-3 py-1.5">
                  {formatUnit(product.unit)}
                </span>
              </li>
            </ul>
          </div>
          <div className="border-base-300 flex items-center justify-between gap-4 border-t border-dashed pt-4 sm:flex-col sm:items-end sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
            <div className="sm:text-right">
              <p className="text-base-content/60 text-sm">আজকের দাম</p>
              <p className="text-primary text-3xl font-bold">{formatPrice(product.today)}</p>
              <p className="text-base-content/60 text-xs">
                {formatUnit(product.unit)} ({formatShortUnit(product.unit)})
              </p>
            </div>
            <ChangeBadge change={product.change} className="text-sm" />
          </div>
        </div>
      </div>
    </section>
  );
}
