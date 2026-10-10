import { formatMarketPrice, formatNumber } from "@/lib/format/bengali";
import { getMarketAverage, sortMarketsByAverage } from "@/lib/products/selectors";
import type { MarketPrice } from "@/types/product";

export function MarketPrices({ markets }: { markets: MarketPrice[] }) {
  const rows = sortMarketsByAverage(markets);
  const divisions = new Set(markets.map((market) => market.division));

  return (
    <section aria-labelledby="market-prices">
      <h2 id="market-prices" className="mb-1 text-2xl font-bold">
        বাজারভিত্তিক আজকের দাম
      </h2>
      <p className="text-base-content/70 mb-4">
        {formatNumber(divisions.size)}টি বিভাগের {formatNumber(markets.length)}টি বাজারের
        সর্বনিম্ন, সর্বাধিক ও গড় দাম।
      </p>

      <div className="border-base-300 bg-base-100 overflow-x-auto rounded-2xl border">
        <table className="table min-w-[36rem]">
          <thead>
            <tr className="text-base-content/70 text-sm">
              <th scope="col">বাজার</th>
              <th scope="col">বিভাগ</th>
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
            {rows.map((market) => (
              <tr key={`${market.market}-${market.division}`}>
                <th scope="row" className="font-medium">
                  {market.market}
                </th>
                <td>{market.division}</td>
                <td className="text-success text-right whitespace-nowrap">
                  {formatMarketPrice(market.min)}
                </td>
                <td className="text-error text-right whitespace-nowrap">
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
    </section>
  );
}
