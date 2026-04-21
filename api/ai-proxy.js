// QatarSpec Pro — /api/ai-proxy.js
// Server-side Anthropic proxy — API key never exposed to browser
// Rate: Pro = unlimited | Free = 5 req/day (enforced client-side + JWT check)
export const config = { runtime: 'edge' };

const ALLOWED_ORIGINS = [
  'https://qatar-standers.vercel.app',
  'https://qatarspec.vercel.app',
  'https://qatar-standers-shoosh85-3851s-projects.vercel.app',
];

export default async function handler(request) {
  const origin = request.headers.get('origin') || '';
  const corsOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  const corsHeaders = {
    'Access-Control-Allow-Origin': corsOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: { message: 'Method not allowed' } }), {
      status: 405, headers: corsHeaders,
    });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: { message: 'Server configuration error' } }), {
      status: 500, headers: corsHeaders,
    });
  }

  // ── Pro JWT Verification ──
  let isPro = false;
  const authHeader = request.headers.get('Authorization') || '';
  const proToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  const jwtSecret = process.env.JWT_SECRET;

  if (proToken && jwtSecret) {
    try {
      const payload = await verifyJWT(proToken, jwtSecret);
      isPro = payload.pro === true && payload.exp > Math.floor(Date.now() / 1000);
    } catch (_) { /* invalid token — treat as free */ }
  }

  try {
    const body = await request.json();

    // Sanitize: limit tokens for free users
    const maxTokens = isPro ? (body.max_tokens || 1500) : Math.min(body.max_tokens || 800, 800);

    const QCS_SYSTEM_PROMPT = `أنت خبير متخصص في QCS 2024 (Qatar Construction Specifications) ومواصفات البناء والبنية التحتية القطرية.
قواعد الإجابة:
- استشهد بالبند والجدول الدقيق فقط إذا كنت متأكداً 100%.
- إذا لم تكن متأكداً من رقم بند أو جدول بعينه: اذكر ذلك صراحةً وقل "يُرجى مراجعة QCS مباشرة للتأكد".
- لا تخترع أرقام بنود أو جداول.
في نهاية كل إجابة أضف سطراً: [مستوى الثقة: موثوق | للمراجعة | استشر المرجع الأصلي]`;

    const anthropicBody = {
      model: body.model || 'claude-haiku-4-5-20251001',
      max_tokens: maxTokens,
      messages: body.messages,
    };
    if (body.system) {
      anthropicBody.system = body.system;
    } else {
      anthropicBody.system = QCS_SYSTEM_PROMPT;
    }

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
      headers: corsHeaders,
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: { message: err.message || 'Internal server error' } }), {
      status: 500, headers: corsHeaders,
    });
  }
}

// ── Web Crypto JWT verify (no external deps) ──
async function verifyJWT(token, secret) {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Invalid JWT format');

  const [header, payload, sig] = parts;
  const toVerify = `${header}.${payload}`;

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  // Base64url → Base64 → Uint8Array
  const sigPadded = sig.replace(/-/g, '+').replace(/_/g, '/').padEnd(
    sig.length + (4 - (sig.length % 4)) % 4, '='
  );
  const sigBytes = Uint8Array.from(atob(sigPadded), c => c.charCodeAt(0));

  const valid = await crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(toVerify));
  if (!valid) throw new Error('Invalid signature');

  const payloadPadded = payload.replace(/-/g, '+').replace(/_/g, '/').padEnd(
    payload.length + (4 - (payload.length % 4)) % 4, '='
  );
  return JSON.parse(atob(payloadPadded));
}
