import { db } from '@/lib/db';
import { ok } from '@/lib/api';

export async function GET() {
  return ok(await db.auditLog.findMany({ orderBy: { createdAt: 'desc' }, take: 200 }));
}
