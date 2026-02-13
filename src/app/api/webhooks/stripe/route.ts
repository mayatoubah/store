import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';
import { sendOrderEmail } from '@/lib/email';
import { fail, ok } from '@/lib/api';

export async function POST(req: Request) {
  const sig = headers().get('stripe-signature');
  const payload = await req.text();
  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) return fail('Webhook not configured', 400);
  const event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const existing = await db.order.findFirst({ where: { stripeSessionId: session.id } });
    if (!existing) {
      const order = await db.order.create({
        data: {
          stripeSessionId: session.id,
          stripePaymentId: String(session.payment_intent ?? ''),
          status: 'PAID',
          total: session.amount_total ?? 0,
          userId: session.metadata?.userId || undefined
        }
      });
      if (session.customer_details?.email) await sendOrderEmail(session.customer_details.email, order.id);
    }
  }
  return ok({ received: true });
}
