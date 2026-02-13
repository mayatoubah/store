import { db } from '@/lib/db';
import { fail, ok } from '@/lib/api';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const product = await db.product.findUnique({ where: { id: params.id }, include: { images: true, category: true, reviews: true } });
  if (!product) return fail('Not found', 404);
  return ok(product);
}
