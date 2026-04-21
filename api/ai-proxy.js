// QatarSpec Pro — /api/ai-proxy.js
// Supports two modes:
// 1. Server key: ANTHROPIC_API_KEY in Vercel env (secure, no user key needed)
// 2. User key: sent via X-Api-Key header from localStorage (fallback)
export const config = { runtime: 'edge' };

const ALLOWED_ORIGINS = [
  'https://qatar-standers.vercel.app',
  'https://qatarspec.vercel.app',
  'https://qatar-standers-shoosh85-3851s-projects.vercel.app',
];

const CORS_HEADERS = (origin) => ({
  'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Api-Key',
  'Content-Type': 'application/json',
});

export default async function handler(request) {
  const origin = request.headers.get('origin') || '';
  const cors = CORS_HEADERS(origin);

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: cors });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: { message: 'Method not allowed' } }), {
      status: 405, headers: cors,
    });
  }

  // ── API Key: server env first, then user-provided header ──
  const serverKey = process.env.ANTHROPIC_API_KEY;
  const userKey   = request.headers.get('X-Api-Key') || '';
  const apiKey    = serverKey || userKey;

  if (!apiKey || apiKey.length < 20) {
    return new Response(JSON.stringify({
      error: { message: 'لا يوجد مفتاح API — أضف مفتاحك عبر زر "إعداد AI" أعلى الصفحة' }
    }), { status: 401, headers: cors });
  }

  // ── Pro JWT Verification (optional) ──
  let isPro = false;
  const authHeader = request.headers.get('Authorization') || '';
  const proToken   = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  const jwtSecret  = process.env.JWT_SECRET;

  if (proToken && jwtSecret) {
    try {
      const payload = await verifyJWT(proToken, jwtSecret);
      isPro = payload.pro === true && payload.exp > Math.floor(Date.now() / 1000);
    } catch (_) {}
  }

  try {
    const body = await request.json();

    const maxTokens = isPro
      ? (body.max_tokens || 1500)
      : Math.min(body.max_tokens || 800, 800);

    const QCS_PROMPT = `أنت خبير متخصص في QCS 2024 (Qatar Construction Specifications).
قواعد:
- استشهد بالبند والجدول الدقيق فقط إذا كنت متأكداً 100%.
- إذا لم تكن متأكداً: قل "يُرجى مراجعة QCS مباشرة للتأكد".
- لا تخترع أرقام بنود.
في نهاية الإجابة: [مستوى الثقة: موثوق | للمراجعة | استشر المرجع الأصلي]`;

    const anthropicBody = {
      model: body.model || 'claude-haiku-4-5-20251001',
      max_tokens: maxTokens,
      system: body.system || QCS_PROMPT,
      messages: body.messages,
    };

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(anthropicBody),
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: cors,
    });

  } catch (err) {
    return new Response(JSON.stringify({
      error: { message: err.message || 'خطأ في الخادم' }
    }), { status: 500, headers: cors });
  }
}

// ── JWT verify (Web Crypto, no deps) ──
async function verifyJWT(token, secret) {
  const [header, payload, sig] = token.split('.');
  if (!sig) throw new Error('Invalid JWT');
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
  );
  const pad = s => s.replace(/-/g,'+').replace(/_/g,'/').padEnd(s.length + (4 - s.length%4)%4,'=');
  const sigBytes = Uint8Array.from(atob(pad(sig)), c => c.charCodeAt(0));
  const valid = await crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(`${header}.${payload}`));
  if (!valid) throw new Error('Bad signature');
  return JSON.parse(atob(pad(payload)));
}
