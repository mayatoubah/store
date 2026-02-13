import { db } from '@/lib/db';
import { fail, ok } from '@/lib/api';
import { couponInput } from '@/lib/validators';

export async function GET() { return ok(await db.coupon.findMany({ orderBy: { createdAt: 'desc' } })); }
export async function POST(req: Request) {
  const parse = couponInput.safeParse(await req.json());
  if (!parse.success) return fail(parse.error.message, 422);
  return ok(await db.coupon.create({ data: parse.data }), 201);
}
