import type { Product } from "@/types/product";
import { ProductCard } from "./product-card";

export const productGridClassName =
  "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";

export function ProductGrid({ products }: { products: readonly Product[] }) {
  return (
    <ul className={productGridClassName}>
      {products.map((product) => (
        <li key={product.id} className="flex">
          <div className="flex w-full flex-col [&>a]:h-full">
            <ProductCard product={product} />
          </div>
        </li>
      ))}
    </ul>
  );
}
