import { formatPercent, formatPrice } from "@/lib/format/bengali";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

function Trend({ current, previous }: { current: number; previous: number }) {
  if (previous === 0 || current === previous) {
    return <span className="text-base-content/50 text-sm">— ০.০%</span>;
  }

  const percent = ((current - previous) / previous) * 100;
  const isUp = percent > 0;

  return (
    <span className={cn("text-sm font-semibold", isUp ? "text-success" : "text-error")}>
      {isUp ? "▲" : "▼"} {formatPercent(percent)}
    </span>
  );
}

export function PriceHistory({ product }: { product: Product }) {
  const rows = [
    { label: "গতকাল", value: product.yesterday },
    { label: "গত সপ্তাহ", value: product.lastWeek },
    { label: "গত মাস", value: product.lastMonth },
  ];

  return (
    <section aria-labelledby="price-history">
      <h2 id="price-history" className="mb-4 text-2xl font-bold">
        আগের দামের তুলনা
      </h2>
      <ul className="grid gap-4 sm:grid-cols-3">
        {rows.map((row) => (
          <li
            key={row.label}
            className="border-base-300 bg-base-100 flex items-center justify-between gap-3 rounded-2xl border p-5"
          >
            <div>
              <p className="text-base-content/60 text-sm">{row.label}</p>
              <p className="text-xl font-bold">{formatPrice(row.value)}</p>
            </div>
            <div className="text-right">
              <p className="text-base-content/50 text-xs">আজকের তুলনায়</p>
              <Trend current={product.today} previous={row.value} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
