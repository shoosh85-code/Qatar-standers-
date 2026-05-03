// /api/validate-code.js — QatarSpec Pro
// Server-side promo code validation
// PRO_CODES stored ONLY here — never in client HTML

export const config = { runtime: 'edge' };

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ valid: false, error: 'Invalid JSON' }), {
      status: 400,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }

  const code = (body.code || '').trim().toUpperCase();

  if (!code) {
    return new Response(JSON.stringify({ valid: false, error: 'No code provided' }), {
      status: 400,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }

  // ✅ Codes stored ONLY in env vars — never hardcoded in source
  const VALID_CODES = (process.env.PROMO_CODES || '')
    .split(',')
    .map(c => c.trim().toUpperCase())
    .filter(Boolean);

  // إذا لم تُضبط PROMO_CODES في env → أعد خطأ واضح
  if (!VALID_CODES.length) {
    return new Response(
      JSON.stringify({ error: 'Promo codes not configured — contact support' }),
      { status: 503, headers: { ...CORS, 'Content-Type': 'application/json' } }
    );
  }

  const isValid = VALID_CODES.includes(code);

  if (isValid) {
    // Expiry: 1 year from now
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 1);

    return new Response(
      JSON.stringify({
        valid: true,
        tier: 'pro',
        expiry: expiry.toISOString(),
        message: '🎉 تم تفعيل Pro بنجاح! صالح لسنة كاملة.',
      }),
      { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } }
    );
  } else {
    return new Response(
      JSON.stringify({
        valid: false,
        error: 'الكود غير صحيح — تحقق من الكود وأعد المحاولة',
      }),
      { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } }
    );
  }
}
