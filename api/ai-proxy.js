// ── nodejs runtime (أكثر استقراراً من edge لقراءة process.env) ──────────────
export const config = { runtime: 'nodejs', maxDuration: 30 };

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

async function callGemini(key, geminiBody, modelName) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${key}`;
  return fetch(url, {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify(geminiBody),
  });
}

export default async function handler(req, res) {
  const origin = req.headers['origin'] || '';
  setCORS(res, origin);

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (!checkRateLimit(ip))
    return res.status(429).json({ error: 'تجاوزت حد الطلبات — انتظر دقيقة' });

  let body = req.body;
  if (!body || typeof body === 'string') {
    try { body = JSON.parse(body || '{}'); } catch { body = {}; }
  }

  const GEMINI_KEY = process.env.GEMINI_KEY;
  if (!GEMINI_KEY) {
    console.error('[ai-proxy] GEMINI_KEY missing');
    return res.status(500).json({ error: 'Server config error: GEMINI_KEY missing' });
  }

  const systemText = body.system || null;
  const contents   = [];
  for (const m of (body.messages || [])) {
    const role = m.role === 'assistant' ? 'model' : 'user';
    const text = typeof m.content === 'string' ? m.content
               : Array.isArray(m.content) ? m.content.map(p => p.text || '').join('') : '';
    if (text) contents.push({ role, parts: [{ text }] });
  }
  if (!contents.length)
    return res.status(400).json({ error: 'No messages provided' });

  const geminiBody = {
    contents,
    generationConfig: { maxOutputTokens: body.max_tokens || 800, temperature: 0.3 },
  };
  if (systemText) geminiBody.system_instruction = { parts: [{ text: systemText }] };

  const MODELS = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-flash-8b'];
  let lastError;

  for (const model of MODELS) {
    try {
      const geminiRes = await callGemini(GEMINI_KEY, geminiBody, model);
      if (geminiRes.ok) {
        const data = await geminiRes.json();
        const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('') || '';
        if (text) {
          return res.status(200).json({
            id: `gemini-${Date.now()}`, type: 'message', role: 'assistant', model,
            content: [{ type: 'text', text }],
            stop_reason: 'end_turn', usage: { input_tokens: 0, output_tokens: 0 },
          });
        }
        lastError = `${model}: empty (${data?.candidates?.[0]?.finishReason})`;
      } else {
        const errText = await geminiRes.text().catch(() => '');
        lastError = `${model}: HTTP ${geminiRes.status} — ${errText.slice(0, 300)}`;
        console.error('[ai-proxy]', lastError);
        if (geminiRes.status === 400) break;
      }
    } catch (err) {
      lastError = `${model}: ${err.message}`;
    }
  }

  return res.status(502).json({ error: lastError || 'All Gemini models failed' });
}
