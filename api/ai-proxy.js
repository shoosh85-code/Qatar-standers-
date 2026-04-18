export const config = { runtime: 'edge' };

// ── Rate limiting (in-memory, resets on cold start) ───────────────────────────
const rateLimitMap = new Map();
const RATE_LIMIT   = 15;          // max requests
const WINDOW_MS    = 60_000;      // per 60 seconds

function checkRateLimit(ip) {
  const now   = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, start: now };
  if (now - entry.start > WINDOW_MS) { entry.count = 0; entry.start = now; }
  entry.count++;
  rateLimitMap.set(ip, entry);
  if (rateLimitMap.size > 5000) {
    for (const [k, v] of rateLimitMap)
      if (now - v.start > WINDOW_MS * 2) rateLimitMap.delete(k);
  }
  return entry.count <= RATE_LIMIT;
}

// ── CORS helper ───────────────────────────────────────────────────────────────
function corsHeaders(origin) {
  const allowed = process.env.ALLOWED_ORIGIN || '';
  const ok      = !allowed || origin === allowed || origin?.endsWith('.vercel.app');
  return {
    'Access-Control-Allow-Origin' : ok ? (origin || '*') : allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function json(body, status = 200, origin = '') {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  });
}

// ── Main handler ──────────────────────────────────────────────────────────────
export default async function handler(req) {
  const origin = req.headers.get('origin') || '';

  // Preflight
  if (req.method === 'OPTIONS')
    return new Response(null, { status: 204, headers: corsHeaders(origin) });

  if (req.method !== 'POST')
    return json({ error: 'Method not allowed' }, 405, origin);

  // Rate limit
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!checkRateLimit(ip))
    return json({ error: 'تجاوزت حد الطلبات — انتظر دقيقة ثم أعد المحاولة' }, 429, origin);

  // Parse body (Anthropic format)
  let body;
  try { body = await req.json(); }
  catch { return json({ error: 'Invalid JSON body' }, 400, origin); }

  const GEMINI_KEY = process.env.GEMINI_KEY;
  if (!GEMINI_KEY)
    return json({ error: 'Server configuration error: missing GEMINI_KEY' }, 500, origin);

  // ── Convert Anthropic → Gemini format ────────────────────────────────────
  const contents = [];

  // System message → system_instruction
  const systemText = body.system || null;

  // Messages array
  for (const m of (body.messages || [])) {
    const role = m.role === 'assistant' ? 'model' : 'user';
    const text = typeof m.content === 'string' ? m.content
                 : Array.isArray(m.content) ? m.content.map(p => p.text || '').join('') : '';
    contents.push({ role, parts: [{ text }] });
  }

  const geminiBody = {
    contents,
    generationConfig: {
      maxOutputTokens: body.max_tokens || 800,
      temperature    : 0.3,
    },
  };
  if (systemText) {
    geminiBody.system_instruction = { parts: [{ text: systemText }] };
  }

  // ── Call Gemini ───────────────────────────────────────────────────────────
  const model   = 'gemini-2.0-flash';
  const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_KEY}`;

  let geminiRes;
  try {
    geminiRes = await fetch(geminiURL, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify(geminiBody),
    });
  } catch (err) {
    return json({ error: `Network error calling Gemini: ${err.message}` }, 502, origin);
  }

  if (!geminiRes.ok) {
    const errText = await geminiRes.text().catch(() => '');
    return json({ error: `Gemini API error ${geminiRes.status}: ${errText}` }, geminiRes.status, origin);
  }

  const geminiData = await geminiRes.json();

  // ── Convert Gemini → Anthropic format ────────────────────────────────────
  const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text
            || geminiData?.candidates?.[0]?.content?.parts?.map(p => p.text).join('')
            || '';

  if (!text) {
    const reason = geminiData?.candidates?.[0]?.finishReason || 'unknown';
    return json({ error: `Gemini returned empty response. Reason: ${reason}` }, 502, origin);
  }

  // Return in Anthropic-compatible format (what index.html expects)
  return json({
    id      : `gemini-${Date.now()}`,
    type    : 'message',
    role    : 'assistant',
    model   : model,
    content : [{ type: 'text', text }],
    stop_reason : 'end_turn',
    usage   : { input_tokens: 0, output_tokens: 0 },
  }, 200, origin);
}
