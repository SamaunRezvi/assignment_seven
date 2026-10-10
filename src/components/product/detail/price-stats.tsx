import { formatPrice, formatUnit } from "@/lib/format/bengali";
import type { PriceSummary } from "@/lib/products/selectors";
import type { PriceUnit } from "@/types/product";

interface PriceStatsProps {
  summary: PriceSummary;
  unit: PriceUnit;
}

export function PriceStats({ summary, unit }: PriceStatsProps) {
  const stats = [
    {
      label: "সর্বনিম্ন দাম",
      value: summary.min,
      caption: "সবচেয়ে কম দামের বাজার",
      market: summary.lowestMarket,
      tone: "text-success",
      icon: "📉",
    },
    {
      label: "সর্বাধিক দাম",
      value: summary.max,
      caption: "সবচেয়ে বেশি দামের বাজার",
      market: summary.highestMarket,
      tone: "text-error",
      icon: "📈",
    },
    {
      label: "গড় দাম",
      value: summary.average,
      caption: `${formatUnit(unit)}-এর হিসাবে`,
      market: "",
      tone: "text-primary",
      icon: "⚖️",
    },
  ];

  return (
    <section aria-labelledby="price-summary">
      <h2 id="price-summary" className="mb-4 text-2xl font-bold">
        দামের সারসংক্ষেপ
      </h2>
      <dl className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border-base-300 bg-base-100 flex items-center gap-4 rounded-2xl border p-5"
          >
            <span aria-hidden="true" className="text-3xl">
              {stat.icon}
            </span>
            <div className="min-w-0">
              <dt className="text-base-content/60 text-sm">{stat.label}</dt>
              <dd className={`text-2xl font-bold ${stat.tone}`}>
                {formatPrice(stat.value)}
              </dd>
              <dd className="text-base-content/60 text-xs">{stat.caption}</dd>
              {stat.market ? (
                <dd className="text-base-content/80 truncate text-xs font-medium">
                  {stat.market}
                </dd>
              ) : null}
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
