export const config = { runtime: 'edge' };

export default async function handler(req) {
  // 1. CORS — السماح فقط لنفس الدومين
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
        'Access-Control-Allow-Origin': isAllowed ? origin : '',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      }
    });
  }

  // 3. POST only
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // 4. Rate Limiting (بسيط — Edge KV اختياري)
  // يمكن إضافة Vercel KV لاحقاً

  // 5. Parse body وتحقق من صحته
  let body;
  try {
    body = await req.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  // 6. التحقق من الحقول المسموحة فقط
  const allowed = { model: 1, max_tokens: 1, messages: 1, system: 1, stream: 1 };
  const sanitized = Object.fromEntries(
    Object.entries(body).filter(([k]) => allowed[k])
  );

  // 7. إجبار max_tokens على حد أقصى
  sanitized.max_tokens = Math.min(sanitized.max_tokens || 1000, 2000);

  // 8. إجبار النموذج على القائمة المسموحة
  const allowedModels = [
    'claude-haiku-4-5-20251001',
    'claude-sonnet-4-20250514',
  ];
  if (!allowedModels.includes(sanitized.model)) {
    sanitized.model = 'claude-haiku-4-5-20251001';
  }

  // 9. إرسال لـ Anthropic
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response('Server configuration error', { status: 500 });
  }

  try {
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(sanitized),
    });

    const data = await anthropicRes.json();

    return new Response(JSON.stringify(data), {
      status: anthropicRes.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': isAllowed ? origin : '',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: { message: 'Proxy error: ' + err.message } }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
