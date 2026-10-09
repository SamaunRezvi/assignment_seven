import { formatNumber, formatPrice } from "@/lib/format/bengali";
import { groupMarketsByDivision } from "@/lib/products/selectors";
import type { MarketPrice } from "@/types/product";

export function MarketPrices({ markets }: { markets: MarketPrice[] }) {
  const groups = groupMarketsByDivision(markets);

  return (
    <section aria-labelledby="market-prices">
      <h2 id="market-prices" className="mb-1 text-2xl font-bold">
        বাজারভিত্তিক আজকের দাম
      </h2>
      <p className="text-base-content/70 mb-4">
        {formatNumber(groups.length)}টি বিভাগের {formatNumber(markets.length)}টি বাজারের সর্বনিম্ন ও
        সর্বোচ্চ দাম।
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((group) => (
          <article
            key={group.division}
            className="border-base-300 bg-base-100 overflow-hidden rounded-2xl border"
          >
            <h3 className="bg-primary/10 text-primary px-5 py-3 font-semibold">
              {group.division} বিভাগ
            </h3>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="text-base-content/60 text-xs">
                    <th scope="col">বাজার</th>
                    <th scope="col" className="text-right">
                      সর্বনিম্ন
                    </th>
                    <th scope="col" className="text-right">
                      সর্বোচ্চ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {group.items.map((market) => (
                    <tr key={market.market}>
                      <th scope="row" className="font-medium">
                        {market.market}
                      </th>
                      <td className="text-success text-right whitespace-nowrap">
                        {formatPrice(market.min)}
                      </td>
                      <td className="text-error text-right whitespace-nowrap">
                        {formatPrice(market.max)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
