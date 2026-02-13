import { db } from '@/lib/db';
import { ProductCard } from '@/components/store/product-card';

export default async function HomePage() {
  const products = await db.product.findMany({ take: 8, include: { images: true } });
  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-gradient-to-br from-brand-500 to-brand-900 p-10 text-white">
        <h1 className="text-4xl font-bold">Maci Food</h1>
        <p className="mt-2 max-w-xl">Le market africain online premium: épicerie authentique, livraison rapide, expérience WOW.</p>
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Top produits</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{products.map((p) => <ProductCard key={p.id} product={p as never} />)}</div>
      </section>
    </div>
  );
}
