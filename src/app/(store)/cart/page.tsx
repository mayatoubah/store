'use client';
import { useCartStore } from '@/stores/cart-store';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem } = useCartStore();
  const total = items.reduce((a, i) => a + i.price * i.quantity, 0);
  return <div className="space-y-4">{items.map((i) => <div key={i.id} className="flex items-center justify-between rounded-xl border p-4"><div>{i.name} x{i.quantity}</div><button onClick={() => removeItem(i.id)}>Retirer</button></div>)}<div className="text-xl font-semibold">Total {formatPrice(total)}</div></div>;
}
