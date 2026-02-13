import { db } from '@/lib/db';
import { fail, ok } from '@/lib/api';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get('export') === 'csv') {
    const orders = await db.order.findMany({ include: { items: true } });
    const csv = ['id,status,total,createdAt', ...orders.map((o) => `${o.id},${o.status},${o.total},${o.createdAt.toISOString()}`)].join('\n');
    return new Response(csv, { headers: { 'content-type': 'text/csv' } });
  }
  return ok(await db.order.findMany({ include: { items: true }, orderBy: { createdAt: 'desc' } }));
}

export async function PATCH(req: Request) {
  const body = await req.json();
  if (!body.id) return fail('Missing id');
  return ok(await db.order.update({ where: { id: body.id }, data: { status: body.status, notesInternal: body.notesInternal } }));
}
