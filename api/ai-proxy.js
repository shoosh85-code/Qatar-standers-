export const config = { runtime: 'edge' };

// ── In-Memory Rate Limiting ──────────────────────────────────
// يُخزَّن في ذاكرة الـ Edge instance (يُصفَّر عند كل cold start)
// كافٍ للحماية الأساسية بدون Vercel KV
const rateLimitMap = new Map();
const RATE_LIMIT    = 10;   // أقصى طلبات
const WINDOW_MS     = 60_000; // كل دقيقة

function isRateLimited(ip) {
  const now  = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, start: now };

  // نافذة جديدة — صفّر العداد
  if (now - entry.start > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, start: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;

  entry.count++;
  rateLimitMap.set(ip, entry);
  return false;
}

// ── تنظيف دوري للـ Map (تجنب تراكم الذاكرة) ────────────────
function cleanMap() {
  const now = Date.now();
  for (const [key, val] of rateLimitMap) {
    if (now - val.start > WINDOW_MS * 2) rateLimitMap.delete(key);
  }
}

// ── Handler الرئيسي ──────────────────────────────────────────
export default async function handler(req) {

  // 1. CORS
  const origin = req.headers.get('origin') || '';
  const allowedOrigins = [
    process.env.ALLOWED_ORIGIN || '',
    'http://localhost:3000',
    'http://127.0.0.1:5500'
  ];
  const isAllowed = allowedOrigins.some(o => o && origin.startsWith(o));

  // 2. Preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin':  isAllowed ? origin : '',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age':       '86400',
      }
    });
  }

  // 3. POST only
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // 4. Rate Limiting
  cleanMap();
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({ error: { message: 'تجاوزت الحد المسموح — حاول بعد دقيقة' } }),
      { status: 429, headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60'
        }
      }
    );
  }

  // 5. Parse body
  let body;
  try {
    body = await req.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  // 6. الحقول المسموحة فقط
  const allowed = { model: 1, max_tokens: 1, messages: 1, system: 1, stream: 1 };
  const sanitized = Object.fromEntries(
    Object.entries(body).filter(([k]) => allowed[k])
  );

  // 7. حد max_tokens
  sanitized.max_tokens = Math.min(sanitized.max_tokens || 1000, 2000);

  // 8. نماذج مسموحة فقط
  const allowedModels = [
    'claude-haiku-4-5-20251001',
    'claude-sonnet-4-20250514',
  ];
  if (!allowedModels.includes(sanitized.model)) {
    sanitized.model = 'claude-haiku-4-5-20251001';
  }

  // 9. API Key
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response('Server configuration error', { status: 500 });
  }

  // 10. إرسال لـ Anthropic
  try {
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':         apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(sanitized),
    });

    const data = await anthropicRes.json();

    return new Response(JSON.stringify(data), {
      status: anthropicRes.status,
      headers: {
        'Content-Type':                'application/json',
        'Access-Control-Allow-Origin': isAllowed ? origin : '',
        'Cache-Control':               'no-store',
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: { message: 'Proxy error: ' + err.message } }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
