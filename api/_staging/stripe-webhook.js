// api/stripe-webhook.js — QatarSpec Pro Webhook (Vercel Vanilla)

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe   = new Stripe(process.env.STRIPE_SECRET_KEY || '');
const supabase = createClient(
  process.env.SUPABASE_URL             || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// قراءة raw body يدوياً — مطلوب لـ Stripe signature verification
async function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data',  c => chunks.push(c));
    req.on('end',   () => resolve(Buffer.concat(chunks)));
    req.on('error', e  => reject(e));
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const sig     = req.headers['stripe-signature'];
  const secret  = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !secret) {
    return res.status(400).json({ error: 'Missing signature or secret' });
  }

  let event;
  try {
    const rawBody = await readRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err) {
    console.error('[Stripe Webhook] signature error:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const uid     = session.metadata?.user_id;
      if (uid) {
        const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
        const { error } = await supabase.from('subscriptions').upsert({
          user_id:                uid,
          stripe_customer_id:     session.customer,
          stripe_subscription_id: session.subscription,
          tier:                   'pro',
          status:                 'active',
          valid_until:            validUntil,
          updated_at:             new Date().toISOString(),
        }, { onConflict: 'user_id' });
        if (error) console.error('[Supabase] upsert error:', error);
      }
    }

    if (event.type === 'customer.subscription.deleted') {
      const sub = event.data.object;
      await supabase.from('subscriptions')
        .update({ tier: 'free', status: 'cancelled', valid_until: new Date().toISOString() })
        .eq('stripe_subscription_id', sub.id);
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('[Stripe Webhook] handler error:', err.message);
    return res.status(500).json({ error: 'Webhook handler failed' });
  }
}
