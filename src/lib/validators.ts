import { z } from 'zod';

export const productInput = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  price: z.number().int().positive(),
  stock: z.number().int().nonnegative(),
  categoryId: z.string()
});

export const categoryInput = z.object({ name: z.string().min(2), slug: z.string().min(2) });

export const couponInput = z.object({ code: z.string().min(3), discountPercent: z.number().int().min(1).max(90), active: z.boolean().default(true) });
