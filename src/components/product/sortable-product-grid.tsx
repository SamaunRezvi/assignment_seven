"use client";

import { useMemo, useState } from "react";
import { sortProducts } from "@/lib/products/selectors";
import type { Product, SortOrder } from "@/types/product";
import { ProductGrid } from "./product-grid";
import { SortSelect } from "./sort-select";

interface SortableProductGridProps {
  products: Product[];
  summary: string;
}

export function SortableProductGrid({ products, summary }: SortableProductGridProps) {
  const [order, setOrder] = useState<SortOrder>("default");
  const sorted = useMemo(() => sortProducts(products, order), [products, order]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-base-content/70 text-sm">{summary}</p>
        <SortSelect value={order} onChange={setOrder} />
      </div>
      <ProductGrid products={sorted} />
    </div>
  );
}
