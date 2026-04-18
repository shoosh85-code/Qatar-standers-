// CommonJS — لا يحتاج تحويل، يعمل مباشرة على Vercel nodejs
const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now   = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, start: now };
  if (now - entry.start > 60_000) { entry.count = 0; entry.start = now; }
  entry.count++;
  rateLimitMap.set(ip, entry);
  return entry.count <= 15;
}

function setCORS(res, origin) {
  const allowed = process.env.ALLOWED_ORIGIN || '';
  const ok = !allowed || !origin || origin === allowed || origin.endsWith('.vercel.app');
  res.setHeader('Access-Control-Allow-Origin',  ok ? (origin || '*') : allowed);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

async function callGemini(key, geminiBody, model) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
  return fetch(url, {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify(geminiBody),
  });
}

module.exports = async function handler(req, res) {
  const origin = req.headers['origin'] || '';
  setCORS(res, origin);

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  // Rate limit
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (!checkRateLimit(ip))
    return res.status(429).json({ error: 'تجاوزت حد الطلبات — انتظر دقيقة' });

  // Parse body — Vercel nodejs يوفرها جاهزة لكن نتحقق
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: 'Invalid JSON' }); }
  }
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Empty body' });
  }

  const GEMINI_KEY = process.env.GEMINI_KEY;
  if (!GEMINI_KEY) {
    console.error('[ai-proxy] GEMINI_KEY is not set in environment variables');
    return res.status(500).json({ error: 'GEMINI_KEY missing — add it in Vercel Environment Variables' });
  }

  // Build Gemini contents
  const contents = [];
  for (const m of (body.messages || [])) {
    const role = m.role === 'assistant' ? 'model' : 'user';
    const text = typeof m.content === 'string' ? m.content
               : Array.isArray(m.content) ? m.content.map(p => p.text || '').join('') : '';
    if (text.trim()) contents.push({ role, parts: [{ text }] });
  }
  if (!contents.length)
    return res.status(400).json({ error: 'No messages provided' });

  const geminiBody = {
    contents,
    generationConfig: { maxOutputTokens: body.max_tokens || 800, temperature: 0.3 },
  };
  if (body.system) {
    geminiBody.system_instruction = { parts: [{ text: body.system }] };
  }

  // Try 3 models in order
  const MODELS = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-flash-8b'];
  let lastError = '';

  for (const model of MODELS) {
    try {
      const r = await callGemini(GEMINI_KEY, geminiBody, model);

      if (r.ok) {
        const data = await r.json();
        const text = (data?.candidates?.[0]?.content?.parts || [])
          .map(p => p.text || '').join('').trim();

        if (text) {
          console.log(`[ai-proxy] Success with ${model}`);
          return res.status(200).json({
            id         : `gemini-${Date.now()}`,
            type       : 'message',
            role       : 'assistant',
            model,
            content    : [{ type: 'text', text }],
            stop_reason: 'end_turn',
            usage      : { input_tokens: 0, output_tokens: 0 },
          });
        }

        const reason = data?.candidates?.[0]?.finishReason || 'unknown';
        lastError = `${model}: empty response, finishReason=${reason}`;
        console.error('[ai-proxy]', lastError);

      } else {
        const errText = await r.text().catch(() => '');
        lastError = `${model}: HTTP ${r.status} — ${errText.slice(0, 400)}`;
        console.error('[ai-proxy]', lastError);
        if (r.status === 400 || r.status === 401) break; // لا فائدة من تجربة نموذج آخر
      }
    } catch (err) {
      lastError = `${model}: ${err.message}`;
      console.error('[ai-proxy] fetch error:', lastError);
    }
  }

  return res.status(502).json({ error: lastError });
};
