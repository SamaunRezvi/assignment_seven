import { formatMarketPrice, formatNumber } from "@/lib/format/bengali";
import {
  getMarketAverage,
  groupMarketsByDivision,
  sortMarketsByAverage,
} from "@/lib/products/selectors";
import type { MarketPrice } from "@/types/product";

export function MarketPrices({ markets }: { markets: MarketPrice[] }) {
  const groups = groupMarketsByDivision(markets);

  return (
    <section aria-labelledby="market-prices">
      <h2 id="market-prices" className="mb-1 text-2xl font-bold">
        বাজারভিত্তিক আজকের দাম
      </h2>
      <p className="text-base-content/70 mb-4">
        {formatNumber(groups.length)}টি বিভাগের {formatNumber(markets.length)}টি বাজারের
        সর্বনিম্ন, সর্বাধিক ও গড় দাম।
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((group) => (
          <article
            key={group.division}
            className="border-base-300 bg-base-100 min-w-0 overflow-hidden rounded-2xl border"
          >
            <h3 className="bg-primary/10 text-primary-strong px-5 py-3 font-semibold">
              {group.division} বিভাগ
            </h3>
            <div className="overflow-x-auto">
              <table className="table min-w-[26rem]">
                <thead>
                  <tr className="text-base-content/70 text-sm">
                    <th scope="col">বাজার</th>
                    <th scope="col" className="text-right">
                      সর্বনিম্ন
                    </th>
                    <th scope="col" className="text-right">
                      সর্বাধিক
                    </th>
                    <th scope="col" className="text-right">
                      গড়
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortMarketsByAverage(group.items).map((market) => (
                    <tr key={`${market.market}-${market.division}`}>
                      <th scope="row" className="font-medium">
                        {market.market}
                      </th>
                      <td className="price-up text-right whitespace-nowrap">
                        {formatMarketPrice(market.min)}
                      </td>
                      <td className="price-down text-right whitespace-nowrap">
                        {formatMarketPrice(market.max)}
                      </td>
                      <td className="text-right font-semibold whitespace-nowrap">
                        {formatMarketPrice(getMarketAverage(market))}
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
