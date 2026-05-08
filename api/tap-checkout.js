// /api/tap-checkout.js — QatarSpec Pro v2.0
// TAP Payments — Create checkout session for QatarSpec Pro subscription
// Docs: https://developers.tap.company/
// v2.0: input validation + shared rate limiting + idempotency key + Arabic errors

import { checkRateLimit } from '../lib/rate-limit.js';

const CORS = {
  'Access-Control-Allow-Origin':  process.env.APP_URL || 'https://qatar-standers.vercel.app',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// خطط الاشتراك — المصدر الوحيد للحقيقة
const PLANS = {
  monthly: { amount: 99,  currency: 'QAR', desc: 'QatarSpec Pro — اشتراك شهري' },
  yearly:  { amount: 799, currency: 'QAR', desc: 'QatarSpec Pro — اشتراك سنوي (وفر 33%)' },
};

// التحقق من البريد الإلكتروني
function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default async function handler(req, res) {
  // CORS headers على كل response
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST فقط' });

  // ── Rate Limiting (PROTOCOL 6 — Upstash Redis) ──────────────────────────
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
           || req.socket?.remoteAddress || '0.0.0.0';
  const rl = await checkRateLimit(ip, '/api/ai-proxy', false); // checkout = free tier limits
  if (!rl.allowed) {
    res.setHeader('Retry-After', String(rl.retryAfter));
    res.setHeader('X-RateLimit-Limit',     String(rl.limit));
    res.setHeader('X-RateLimit-Remaining', '0');
    return res.status(429).json({
      error:      'تجاوزت الحد المسموح',
      code:       'RATE_LIMIT',
      retryAfter: rl.retryAfter,
      message:    `حاول مرة أخرى بعد ${rl.retryAfter} ثانية`,
    });
  }

  // ── التحقق من TAP Secret ─────────────────────────────────────────────────
  const TAP_SECRET = process.env.TAP_SECRET_KEY;
  if (!TAP_SECRET) {
    return res.status(503).json({
      error: 'خدمة الدفع غير مهيأة',
      code:  'PAYMENT_NOT_CONFIGURED',
    });
  }

  // ── Input Validation ─────────────────────────────────────────────────────
  const body = req.body || {};
  const { plan = 'monthly' } = body;
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const name  = typeof body.name  === 'string' ? body.name.trim()  : 'Engineer';

  if (!email) {
    return res.status(400).json({ error: 'البريد الإلكتروني مطلوب', code: 'MISSING_EMAIL' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'البريد الإلكتروني غير صالح', code: 'INVALID_EMAIL' });
  }
  if (!PLANS[plan]) {
    return res.status(400).json({
      error:    `خطة غير معروفة: ${plan}`,
      code:     'INVALID_PLAN',
      valid:    Object.keys(PLANS),
    });
  }

  const p = PLANS[plan];
  const redirectBase = process.env.APP_URL || 'https://qatar-standers.vercel.app';

  // ── Idempotency Key — منع الشحن المزدوج ──────────────────────────────────
  // مبني من email + plan + نافذة 10 دقائق
  const windowId       = Math.floor(Date.now() / (10 * 60 * 1000));
  const idempotencyKey = `QS-${plan}-${Buffer.from(email).toString('base64').slice(0, 12)}-${windowId}`;

  // ── استدعاء TAP API ──────────────────────────────────────────────────────
  try {
    const tapRes = await fetch('https://api.tap.company/v2/charges', {
      method: 'POST',
      headers: {
        'Authorization':   `Bearer ${TAP_SECRET}`,
        'Content-Type':    'application/json',
        'Idempotency-Key': idempotencyKey,
      },
      body: JSON.stringify({
        amount:             p.amount,
        currency:           p.currency,
        customer_initiated: true,
        threeDSecure:       true,
        save_card:          false,
        description:        p.desc,
        metadata:           { plan, email, source: 'qatarspec-pro' },
        reference: {
          transaction: `QS-${Date.now()}`,
          order:       `PRO-${plan.toUpperCase()}-${Date.now()}`,
        },
        receipt:   { email: true, sms: false },
        customer:  {
          first_name: name || 'Engineer',
          email:      { address: email },
        },
        source:   { id: 'src_all' },
        post:     { url: `${redirectBase}/api/tap-webhook` },
        redirect: { url: `${redirectBase}/api/tap-callback?email=${encodeURIComponent(email)}&plan=${plan}` },
      }),
    });

    const data = await tapRes.json();

    if (!tapRes.ok || !data.transaction?.url) {
      console.error('[tap-checkout] TAP Error:', JSON.stringify(data));
      const tapMsg = data.errors?.[0]?.description || data.message || 'خطأ غير معروف';
      return res.status(502).json({
        error:   'خطأ في بوابة الدفع',
        code:    'PAYMENT_GATEWAY_ERROR',
        message: tapMsg,
      });
    }

    return res.status(200).json({
      checkout_url:    data.transaction.url,
      charge_id:       data.id,
      amount:          p.amount,
      currency:        p.currency,
      plan,
      idempotency_key: idempotencyKey,
    });

  } catch (e) {
    console.error('[tap-checkout] fetch error:', e.message);
    return res.status(500).json({
      error:   'خطأ داخلي في الخادم',
      code:    'INTERNAL_ERROR',
      message: e.message,
    });
  }
}
