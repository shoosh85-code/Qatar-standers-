// Tap Payments — Handle redirect after payment
// [SEC v4.1] استبدال base64 البسيط بـ JWT حقيقي موقّع بـ HMAC-SHA256
import { rateLimit, applyRateLimitHeaders, getIp } from './rate-limit.js';

// ── signJWT — منسوخة من verify-pro.js (Edge) — متوافقة مع Node 20+ crypto.subtle ──
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
  // ── Rate Limiting (Protocol 6) — حماية من spam نتائج الدفع ──────────────
  const ip    = getIp(req);
  const isPro = false; // الدفع لم يُتحقق منه بعد — لا JWT متاح
  const rl    = await rateLimit(req, isPro ? 'pro' : 'free', 'tap-callback');
  applyRateLimitHeaders(res, rl);
  if (!rl.allowed) {
    return res.redirect(302, `/?payment=error&reason=rate_limit&retry=${rl.retryAfter}&ip=${ip}`);
  }
  // ──────────────────────────────────────────────────────────────────────────

  const { email, plan, tap_id } = req.query;

  const TAP_SECRET = process.env.TAP_SECRET_KEY;

  if (!tap_id || !TAP_SECRET) {
    return res.redirect(302, '/?payment=error');
  }

  try {
    // Verify payment with Tap API
    const r = await fetch(`https://api.tap.company/v2/charges/${tap_id}`, {
      headers: { 'Authorization': `Bearer ${TAP_SECRET}` }
    });
    const charge = await r.json();

    if (charge.status !== 'CAPTURED') {
      return res.redirect(302, '/?payment=failed');
    }

    // [SEC v4.1] Issue Pro JWT — HMAC-SHA256 موقّع — يستحيل تزويره بدون JWT_SECRET
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error('[tap-callback] JWT_SECRET missing — cannot issue token');
      return res.redirect(302, '/?payment=error&reason=config');
    }

    const expiry = new Date();
    expiry.setDate(expiry.getDate() + (plan === 'yearly' ? 365 : 30));

    // payload متوافق مع verify-pro.js: pro=true، exp بـ SECONDS (ليس milliseconds)
    const payload = {
      pro: true,
      exp: Math.floor(expiry.getTime() / 1000), // Unix timestamp بالثواني — معيار JWT
      source: 'tap',
      tap_id,
      email,
      plan,
    };
    const token = await signJWT(payload, JWT_SECRET);

    // Redirect — الـ client يرسل الـ token لـ /api/verify-pro لإصدار httpOnly cookie
    return res.redirect(302, `/?payment=success#pro_token=${token}&expiry=${expiry.getTime()}`);

  } catch(e) {
    return res.redirect(302, '/?payment=error');
  }
}
