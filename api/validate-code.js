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

  // ✅ Codes stored ONLY on server — never exposed to client
  const VALID_CODES = (process.env.PRO_CODES || '')
    .split(',')
    .map(c => c.trim().toUpperCase())
    .filter(Boolean);

  // Fallback default codes if env not set (for existing users)
  const DEFAULT_CODES = ['QATAR2026PRO', 'QATARSPEC-PRO', 'QS-ENGINEER-2026', 'PRO-BETA-QCS'];
  const ALL_CODES = [...new Set([...VALID_CODES, ...DEFAULT_CODES])];

  const isValid = ALL_CODES.includes(code);

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
