import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { fail, ok } from '@/lib/api';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) return fail('Unauthorized', 401);
  return ok(await db.order.findMany({ where: { userId: session.user.id }, include: { items: true }, orderBy: { createdAt: 'desc' } }));
}
