import "server-only";
import { cache } from "react";
import { categoryListSchema, categorySchema, productListSchema } from "./schemas";
import { apiFetch } from "./client";
import { ApiError } from "./errors";
import type { Category, Product } from "@/types/product";

const SLUG_PATTERN = /^[a-z0-9-]+$/;

export const getProducts = cache(async (): Promise<Product[]> => {
  return apiFetch("/products", productListSchema);
});

export const getCategories = cache(async (): Promise<Category[]> => {
  return apiFetch("/categories", categoryListSchema);
});

/** Resolves to null when the category does not exist. */
export const getCategory = cache(async (slug: string): Promise<Category | null> => {
  if (!SLUG_PATTERN.test(slug)) return null;
  try {
    return await apiFetch(`/categories/${slug}`, categorySchema);
  } catch (error) {
    if (error instanceof ApiError && error.kind === "not-found") return null;
    throw error;
  }
});

export const getProductsByCategory = cache(async (slug: string): Promise<Product[]> => {
  if (!SLUG_PATTERN.test(slug)) return [];
  return apiFetch(`/products?category=${slug}`, productListSchema);
});

/** Resolves to null when no product matches the slug. */
export const getProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  if (!SLUG_PATTERN.test(slug)) return null;
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
});
