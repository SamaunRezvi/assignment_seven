import { parseBengaliNumber } from "@/lib/format/bengali";
import type { MarketPrice, Product, SortOrder } from "@/types/product";

const HIGHLIGHT_LIMIT = 6;

export function getTopRisers(products: Product[], limit = HIGHLIGHT_LIMIT): Product[] {
  return products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, limit);
}

export function getTopFallers(products: Product[], limit = HIGHLIGHT_LIMIT): Product[] {
  return products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, limit);
}

/** Sorts by numeric price value, never by string, so Bengali numerals are safe. */
export function sortProducts(products: readonly Product[], order: SortOrder): Product[] {
  if (order === "default") return [...products];

  const direction = order === "price-asc" ? 1 : -1;
  return [...products].sort(
    (a, b) => (parseBengaliNumber(a.today) - parseBengaliNumber(b.today)) * direction,
  );
}

export function isSortOrder(value: string): value is SortOrder {
  return value === "default" || value === "price-asc" || value === "price-desc";
}

export interface PriceSummary {
  min: number;
  max: number;
  average: number;
  lowestMarket: string;
  highestMarket: string;
}

/** The middle of a market's range, shown as that market's average price. */
export function getMarketAverage(market: MarketPrice): number {
  return (market.min + market.max) / 2;
}

/** Cheapest markets first, so the market table reads from low to high. */
export function sortMarketsByAverage(markets: readonly MarketPrice[]): MarketPrice[] {
  return [...markets].sort((a, b) => getMarketAverage(a) - getMarketAverage(b));
}

export function getPriceSummary(markets: readonly MarketPrice[]): PriceSummary | null {
  if (markets.length === 0) return null;

  const min = Math.min(...markets.map((market) => market.min));
  const max = Math.max(...markets.map((market) => market.max));
  const averages = markets.map(getMarketAverage);
  const average = averages.reduce((sum, value) => sum + value, 0) / averages.length;

  return {
    min,
    max,
    average: Math.round(average),
    lowestMarket: markets.find((market) => market.min === min)?.market ?? "",
    highestMarket: markets.find((market) => market.max === max)?.market ?? "",
  };
}
