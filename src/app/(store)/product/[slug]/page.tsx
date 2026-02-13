import Image from 'next/image';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { formatPrice } from '@/lib/utils';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await db.product.findUnique({ where: { slug: params.slug }, include: { images: true, category: true } });
  if (!product) return notFound();
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Image src={product.images[0]?.url ?? '/images/product.jpg'} alt={product.name} width={800} height={800} className="rounded-2xl object-cover" />
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="mt-2 text-zinc-500">{product.description}</p>
        <p className="mt-3 text-2xl font-semibold">{formatPrice(product.price)}</p>
        <p className="mt-2 text-sm">Stock: {product.stock}</p>
      </div>
    </div>
  );
}
