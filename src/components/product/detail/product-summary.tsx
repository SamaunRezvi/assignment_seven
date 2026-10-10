import Link from "next/link";
import { routes } from "@/config/site";
import { formatNumber, formatShortUnit, formatUnit } from "@/lib/format/bengali";
import { ChangeBadge } from "@/components/ui/change-badge";
import type { Product } from "@/types/product";

function describeChange(product: Product): string {
  const difference = product.today - product.yesterday;
  if (difference === 0) return "গতকালের তুলনায় আজ দাম অপরিবর্তিত";

  const direction = difference > 0 ? "বেড়েছে" : "কমেছে";
  return `গতকালের তুলনায় আজ দাম ${direction} · ${formatNumber(Math.abs(difference))} টাকা`;
}

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
              {formatUnit(product.unit)} · {product.categoryNameBn}
            </p>
            <p className="text-base-content/80 flex flex-wrap items-center gap-2">
              {describeChange(product)}
              <ChangeBadge change={product.change} className="text-sm" />
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
          <div className="border-base-300 border-t border-dashed pt-4 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6 sm:text-right">
            <p className="text-base-content/60 text-sm">আজকের দাম</p>
            <p className="text-primary text-4xl leading-tight font-bold">
              {formatNumber(product.today)}
            </p>
            <p className="text-base-content/60 text-sm">
              টাকা / {formatShortUnit(product.unit)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
