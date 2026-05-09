// /api/tap.js — QatarSpec Pro v1.0
// Merged: tap-checkout.js + tap-callback.js → ONE endpoint
// Route: ?action=checkout (POST) | ?action=callback (GET, TAP redirect)
// Auto-detect: presence of tap_id in query → callback; POST without tap_id → checkout
// [لا تحذف محتوى — فقط إضافة]

import { rateLimit, applyRateLimitHeaders, getIp } from './rate-limit.js';
import { checkRateLimit } from '../lib/rate-limit.js';

const CORS = {
  'Access-Control-Allow-Origin':  process.env.APP_URL || 'https://qatar-standers.vercel.app',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// خطط الاشتراك — المصدر الوحيد للحقيقة
const PLANS = {
  monthly: { amount: 99,  currency: 'QAR', desc: 'QatarSpec Pro — اشتراك شهري' },
  yearly:  { amount: 799, currency: 'QAR', desc: 'QatarSpec Pro — اشتراك سنوي (وفر 33%)' },
};

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// ── signJWT — Edge-compatible HMAC-SHA256 ──────────────────────────────────
// SYNC-WITH: api/verify-pro.js signJWT() — يجب تحديثهما معاً عند أي تغيير
async function signJWT(payload, secret) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    .replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_');
  const body = btoa(JSON.stringify(payload))
    .replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_');
  const msg = `${header}.${body}`;
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(msg));
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_');
  return `${msg}.${sigB64}`;
}

export default async function handler(req, res) {
  // CORS headers على كل response
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(200).end();

  // ── تحديد الـ action ──────────────────────────────────────────────────────
  // POST بدون tap_id → checkout
  // GET مع tap_id   → callback (TAP redirect)
  const action = req.query.action ||
    (req.method === 'GET' && req.query.tap_id ? 'callback' : 'checkout');

  // ════════════════════════════════════════════════════════════════════════
  // ACTION: checkout — إنشاء جلسة دفع TAP
  // ════════════════════════════════════════════════════════════════════════
  if (action === 'checkout') {
    if (req.method !== 'POST') return res.status(405).json({ error: 'POST فقط للـ checkout' });

    // ── Rate Limiting (PROTOCOL 6) ──────────────────────────────────────
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
             || req.socket?.remoteAddress || '0.0.0.0';
    const rl = await checkRateLimit(ip, '/api/ai-proxy', false); // free tier limits
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

    // ── التحقق من TAP Secret ───────────────────────────────────────────
    const TAP_SECRET = process.env.TAP_SECRET_KEY;
    if (!TAP_SECRET) {
      return res.status(503).json({ error: 'خدمة الدفع غير مهيأة', code: 'PAYMENT_NOT_CONFIGURED' });
    }

    // ── Input Validation ──────────────────────────────────────────────
    const body = req.body || {};
    const { plan = 'monthly' } = body;
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const name  = typeof body.name  === 'string' ? body.name.trim()  : 'Engineer';

    if (!email)              return res.status(400).json({ error: 'البريد الإلكتروني مطلوب', code: 'MISSING_EMAIL' });
    if (!isValidEmail(email)) return res.status(400).json({ error: 'البريد الإلكتروني غير صالح', code: 'INVALID_EMAIL' });
    if (!PLANS[plan])         return res.status(400).json({ error: `خطة غير معروفة: ${plan}`, code: 'INVALID_PLAN', valid: Object.keys(PLANS) });

    const p = PLANS[plan];
    const redirectBase = process.env.APP_URL || 'https://qatar-standers.vercel.app';

    // ── Idempotency Key — منع الشحن المزدوج ──────────────────────────
    const windowId       = Math.floor(Date.now() / (10 * 60 * 1000));
    const idempotencyKey = `QS-${plan}-${Buffer.from(email).toString('base64').slice(0, 12)}-${windowId}`;

    // ── استدعاء TAP API ──────────────────────────────────────────────
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
          customer:  { first_name: name || 'Engineer', email: { address: email } },
          source:    { id: 'src_all' },
          post:      { url: `${redirectBase}/api/tap-webhook` },
          redirect:  { url: `${redirectBase}/api/tap?action=callback&email=${encodeURIComponent(email)}&plan=${plan}` },
        }),
      });

      const data = await tapRes.json();

      if (!tapRes.ok || !data.transaction?.url) {
        console.error('[tap/checkout] TAP Error:', JSON.stringify(data));
        const tapMsg = data.errors?.[0]?.description || data.message || 'خطأ غير معروف';
        return res.status(502).json({ error: 'خطأ في بوابة الدفع', code: 'PAYMENT_GATEWAY_ERROR', message: tapMsg });
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
      console.error('[tap/checkout] fetch error:', e.message);
      return res.status(500).json({ error: 'خطأ داخلي في الخادم', code: 'INTERNAL_ERROR', message: e.message });
    }
  }

  // ════════════════════════════════════════════════════════════════════════
  // ACTION: callback — معالجة redirect من TAP بعد الدفع
  // ════════════════════════════════════════════════════════════════════════
  if (action === 'callback') {
    // ── Rate Limiting (Protocol 6) — حماية من spam نتائج الدفع ──────
    const ip = getIp(req);
    const rl = await rateLimit(req, 'free', 'tap-callback');
    applyRateLimitHeaders(res, rl);
    if (!rl.allowed) {
      return res.redirect(302, `/?payment=error&reason=rate_limit&retry=${rl.retryAfter}`);
    }

    const { email, plan, tap_id } = req.query;
    const TAP_SECRET = process.env.TAP_SECRET_KEY;

    if (!tap_id || !TAP_SECRET) {
      return res.redirect(302, '/?payment=error');
    }

    try {
      // التحقق من الدفع مع TAP API
      const r = await fetch(`https://api.tap.company/v2/charges/${tap_id}`, {
        headers: { 'Authorization': `Bearer ${TAP_SECRET}` }
      });
      const charge = await r.json();

      if (charge.status !== 'CAPTURED') {
        return res.redirect(302, '/?payment=failed');
      }

      // إصدار Pro JWT — HMAC-SHA256 موقّع
      const JWT_SECRET = process.env.JWT_SECRET;
      if (!JWT_SECRET) {
        console.error('[tap/callback] JWT_SECRET missing — cannot issue token');
        return res.redirect(302, '/?payment=error&reason=config');
      }

      const expiry = new Date();
      expiry.setDate(expiry.getDate() + (plan === 'yearly' ? 365 : 30));

      // payload متوافق مع verify-pro.js: pro=true، exp بـ SECONDS
      const payload = {
        pro: true,
        exp: Math.floor(expiry.getTime() / 1000), // Unix timestamp بالثواني
        source: 'tap',
        tap_id,
        email,
        plan,
      };
      const token = await signJWT(payload, JWT_SECRET);

      // Redirect — الـ client يرسل الـ token لـ /api/verify-pro لإصدار httpOnly cookie
      return res.redirect(302, `/?payment=success#pro_token=${token}&expiry=${expiry.getTime()}`);

    } catch (e) {
      console.error('[tap/callback] error:', e.message);
      return res.redirect(302, '/?payment=error');
    }
  }

  // ── action غير معروف ──────────────────────────────────────────────────
  return res.status(400).json({ error: 'action غير معروف', valid: ['checkout', 'callback'] });
}
