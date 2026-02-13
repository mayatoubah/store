import { stripe } from '@/lib/stripe';
import { fail, ok } from '@/lib/api';

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY) return fail('Stripe not configured', 500);
  const body = await req.json();
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: body.items,
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
    metadata: { userId: body.userId || '' }
  });
  return ok({ url: session.url });
}
