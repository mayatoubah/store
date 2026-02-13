import { db } from '@/lib/db';
import { ok } from '@/lib/api';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') ?? '';
  const category = searchParams.get('category') ?? undefined;
  const page = Number(searchParams.get('page') ?? '1');
  const take = 12;
  const where = {
    name: { contains: q, mode: 'insensitive' as const },
    ...(category ? { category: { slug: category } } : {})
  };
  const [items, total] = await Promise.all([
    db.product.findMany({ where, include: { images: true, category: true }, skip: (page - 1) * take, take }),
    db.product.count({ where })
  ]);
  return ok({ items, total, page, pageCount: Math.ceil(total / take) });
}
