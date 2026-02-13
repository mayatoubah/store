import { db } from '@/lib/db';
import { ok } from '@/lib/api';

export async function GET() {
  return ok(await db.category.findMany({ orderBy: { name: 'asc' } }));
}
