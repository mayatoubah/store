import { db } from '@/lib/db';

export default async function AdminDashboard() {
  const [sales, orders, lowStock] = await Promise.all([
    db.order.aggregate({ _sum: { total: true } }),
    db.order.count(),
    db.product.count({ where: { stock: { lte: 5 } } })
  ]);
  return <div className="grid gap-4 sm:grid-cols-3"><div className="rounded bg-white p-4">Ventes: {(sales._sum.total ?? 0) / 100}€</div><div className="rounded bg-white p-4">Commandes: {orders}</div><div className="rounded bg-white p-4">Low stock: {lowStock}</div></div>;
}
