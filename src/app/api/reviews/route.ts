import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { fail, ok } from '@/lib/api';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('productId');
  return ok(await db.review.findMany({ where: { productId: productId ?? undefined } }));
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) return fail('Unauthorized', 401);
  const body = await req.json();
  return ok(await db.review.create({ data: { rating: body.rating, comment: body.comment, productId: body.productId, userId: session.user.id } }), 201);
}
