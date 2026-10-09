import { getProducts } from "@/lib/api/products";
import { formatPercent, formatPrice, formatShortUnit } from "@/lib/format/bengali";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

const arrows = { up: "▲", down: "▼", flat: "—" } as const;

const tones = {
  up: "price-up",
  down: "price-down",
  flat: "price-flat",
} as const;

function TickerItem({ product }: { product: Product }) {
  const { change } = product;

  return (
    <li className="border-base-200 flex shrink-0 items-center gap-1.5 border-e px-4 py-2 text-sm whitespace-nowrap">
      <span aria-hidden="true">{product.image}</span>
      <span className="font-medium">{product.nameBn}</span>
      <span className="text-base-content/70">
        {formatPrice(product.today)}/{formatShortUnit(product.unit)}
      </span>
      <span className={cn("font-semibold", tones[change.dir])}>
        {arrows[change.dir]}{" "}
        {change.dir === "flat" ? formatPercent(0) : formatPercent(change.pct)}
      </span>
    </li>
  );
}

export function TickerSkeleton() {
  return <div className="skeleton h-10 w-full rounded-none" aria-hidden="true" />;
}

export async function PriceTicker() {
  let products: Product[];
  try {
    products = await getProducts();
  } catch (error) {
    console.error("[ticker] Price ticker is unavailable", error);
    return null;
  }

  if (products.length === 0) return null;

  return (
    <section
      aria-label="আজকের দামের তালিকা"
      className="ticker border-base-300 bg-base-100 overflow-hidden border-b"
    >
      <div className="animate-ticker flex w-max">
        <ul className="flex shrink-0 items-center">
          {products.map((product) => (
            <TickerItem key={product.id} product={product} />
          ))}
        </ul>
        <ul className="flex shrink-0 items-center" aria-hidden="true">
          {products.map((product) => (
            <TickerItem key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </section>
  );
}
