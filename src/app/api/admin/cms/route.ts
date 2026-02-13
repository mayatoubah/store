import { db } from '@/lib/db';
import { ok } from '@/lib/api';

export async function GET() { return ok(await db.cmsHome.findFirst()); }

export async function PUT(req: Request) {
  const body = await req.json();
  const current = await db.cmsHome.findFirst();
  if (!current) return ok(await db.cmsHome.create({ data: body }));
  return ok(await db.cmsHome.update({ where: { id: current.id }, data: body }));
}
