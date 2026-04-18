export const config = { runtime: 'edge' };

// ── Rate Limiting (In-Memory) ─────────────────────────────────────────────────
const rateLimitMap = new Map();
const RATE_LIMIT   = 10;
const WINDOW_MS    = 60_000;

function isRateLimited(ip) {
  const now   = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, start: now };
  if (now - entry.start > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, start: now });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  rateLimitMap.set(ip, entry);
  return false;
}

function cleanMap() {
  const now = Date.now();
  for (const [k, v] of rateLimitMap) {
    if (now - v.start > WINDOW_MS * 2) rateLimitMap.delete(k);
  }
}

// ── Model mapping: Anthropic → Gemini ────────────────────────────────────────
function getGeminiModel(anthropicModel) {
  if (anthropicModel && anthropicModel.includes('sonnet')) {
    return 'gemini-2.0-flash';
  }
  return 'gemini-2.0-flash';
}

// ── Convert Anthropic messages → Gemini contents ─────────────────────────────
function toGeminiContents(messages) {
  return messages.map(m => ({
    role:  m.role === 'assistant' ? 'model' : 'user',
    parts: [{
      text: typeof m.content === 'string'
        ? m.content
        : (m.content?.[0]?.text || '')
    }]
  }));
}

// ── Main Handler ─────────────────────────────────────────────────────────────
export default async function handler(req) {

  // 1. CORS
  const origin = req.headers.get('origin') || '';
  const allowedOrigins = [
    process.env.ALLOWED_ORIGIN || '',
    'http://localhost:3000',
    'http://127.0.0.1:5500'
  ];
  const isAllowed = allowedOrigins.some(o => o && origin.startsWith(o));

  const corsHeaders = {
    'Access-Control-Allow-Origin':  isAllowed ? origin : '',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // 2. Preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: { ...corsHeaders, 'Access-Control-Max-Age': '86400' }
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
      { status: 429, headers: { 'Content-Type': 'application/json', 'Retry-After': '60' } }
    );
  }

  // 5. Parse body (صيغة Anthropic الواردة من index.html)
  let body;
  try {
    body = await req.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  // 6. Gemini API Key
  const geminiKey = process.env.GEMINI_KEY;
  if (!geminiKey) {
    return new Response(
      JSON.stringify({ error: { message: 'Server configuration error: GEMINI_KEY missing' } }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 7. بناء طلب Gemini من صيغة Anthropic
  const model    = getGeminiModel(body.model);
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const maxTok   = Math.min(body.max_tokens || 800, 2000);

  const geminiBody = {
    contents:         toGeminiContents(messages),
    generationConfig: {
      maxOutputTokens: maxTok,
      temperature:     0.3,
    },
  };

  // system prompt → systemInstruction
  if (body.system) {
    geminiBody.systemInstruction = {
      parts: [{ text: body.system }]
    };
  }

  // 8. استدعاء Gemini API
  const geminiUrl =
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;

  try {
    const geminiRes  = await fetch(geminiUrl, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(geminiBody),
    });

    const geminiData = await geminiRes.json();

    if (!geminiRes.ok) {
      const errMsg = geminiData?.error?.message || 'Gemini API error';
      return new Response(
        JSON.stringify({ error: { message: errMsg } }),
        { status: geminiRes.status, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // 9. تحويل رد Gemini → صيغة Anthropic التي يتوقعها index.html
    const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    const anthropicShape = {
      id:      'gemini-proxy',
      type:    'message',
      role:    'assistant',
      model:   body.model || model,
      content: [{ type: 'text', text }],
      usage:   { input_tokens: 0, output_tokens: 0 },
    };

    return new Response(JSON.stringify(anthropicShape), {
      status:  200,
      headers: {
        'Content-Type':  'application/json',
        'Cache-Control': 'no-store',
        ...corsHeaders,
      },
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: { message: 'Proxy error: ' + err.message } }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
