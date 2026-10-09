import { z } from "zod";

const marketPriceSchema = z.object({
  market: z.string(),
  division: z.string(),
  min: z.number().nonnegative(),
  max: z.number().nonnegative(),
});

export const productSchema = z.object({
  id: z.number().int(),
  slug: z.string().min(1),
  nameBn: z.string().min(1),
  category: z.string().min(1),
  categoryNameBn: z.string(),
  categoryIcon: z.string(),
  unit: z.enum(["kg", "litre", "dozen", "piece"]),
  image: z.string(),
  today: z.number().nonnegative(),
  yesterday: z.number().nonnegative(),
  lastWeek: z.number().nonnegative(),
  lastMonth: z.number().nonnegative(),
  change: z.object({
    dir: z.enum(["up", "down", "flat"]),
    pct: z.number(),
  }),
  markets: z.array(marketPriceSchema),
});

export const categorySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  nameBn: z.string().min(1),
  icon: z.string(),
});

export const productListSchema = z.array(productSchema);
export const categoryListSchema = z.array(categorySchema);
