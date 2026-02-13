import { db } from '@/lib/db';
import { ProductCard } from '@/components/store/product-card';

export default async function ShopPage() {
  const products = await db.product.findMany({ include: { images: true }, orderBy: { createdAt: 'desc' } });
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{products.map((p) => <ProductCard key={p.id} product={p as never} />)}</div>;
}
