import { db } from '@/lib/db';
import { fail, ok } from '@/lib/api';
import { categoryInput } from '@/lib/validators';

export async function GET() { return ok(await db.category.findMany()); }
export async function POST(req: Request) {
  const parse = categoryInput.safeParse(await req.json());
  if (!parse.success) return fail(parse.error.message, 422);
  return ok(await db.category.create({ data: parse.data }), 201);
}
