import "server-only";
import categories from "@/data/categories.json";
import products from "@/data/products.json";

const CATEGORY_PATH = /^\/categories\/([a-z0-9-]+)$/;
const CATEGORY_PRODUCTS_PATH = /^\/products\?category=([a-z0-9-]+)$/;

/**
 * Last known good data bundled with the app. It is used only when every API
 * endpoint is unavailable, so the site keeps working during an outage or a
 * rate limit. Returns undefined when the path has no bundled equivalent.
 */
export function getFallbackPayload(path: string): unknown {
  if (path === "/products") return products;
  if (path === "/categories") return categories;

  const categorySlug = CATEGORY_PATH.exec(path)?.[1];
  if (categorySlug) return categories.find((category) => category.slug === categorySlug);

  const productsSlug = CATEGORY_PRODUCTS_PATH.exec(path)?.[1];
  if (productsSlug)
    return products.filter((product) => product.category === productsSlug);

  return undefined;
}
