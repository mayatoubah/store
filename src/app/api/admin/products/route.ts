import { db } from '@/lib/db';
import { fail, ok } from '@/lib/api';
import { productInput } from '@/lib/validators';

export async function GET() { return ok(await db.product.findMany({ include: { category: true }, orderBy: { createdAt: 'desc' } })); }

export async function POST(req: Request) {
  const parse = productInput.safeParse(await req.json());
  if (!parse.success) return fail(parse.error.message, 422);
  return ok(await db.product.create({ data: parse.data }), 201);
}
