'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';
import { formatPrice } from '@/lib/utils';

export function ProductCard({ product }: { product: { id: string; slug: string; name: string; price: number; images: { url: string; alt: string }[]; stock: number } }) {
  const add = useCartStore((s) => s.addItem);
  const { ids, toggle } = useWishlistStore();
  const liked = ids.includes(product.id);
  return (
    <motion.article whileHover={{ y: -4 }} className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-premium dark:border-white/10 dark:bg-zinc-900">
      <Link href={`/product/${product.slug}`}>
        <Image src={product.images[0]?.url ?? '/images/product.jpg'} alt={product.images[0]?.alt ?? product.name} width={600} height={600} className="h-52 w-full object-cover" />
      </Link>
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-semibold">{product.name}</h3>
          <button onClick={() => toggle(product.id)}><Heart size={16} className={liked ? 'fill-brand-500 text-brand-500' : ''} /></button>
        </div>
        <p className="mb-3 text-sm text-zinc-500">{formatPrice(product.price)}</p>
        <button className="w-full rounded-xl bg-brand-500 px-3 py-2 text-sm text-white" onClick={() => add({ id: product.id, name: product.name, price: product.price, quantity: 1, image: product.images[0]?.url })}>Ajouter</button>
      </div>
    </motion.article>
  );
}
