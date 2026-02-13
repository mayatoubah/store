import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect('/account/login');
  const orders = await db.order.findMany({ where: { userId: session.user.id }, include: { items: true } });
  return <div className="space-y-2">{orders.map((o) => <div key={o.id} className="rounded border p-4">{o.id} - {o.status} - {o.total / 100}€</div>)}</div>;
}
