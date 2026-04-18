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

module.exports = async function handler(req, res) {
  const origin = req.headers['origin'] || '';
  setCORS(res, origin);

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (!checkRateLimit(ip))
    return res.status(429).json({ error: 'تجاوزت حد الطلبات — انتظر دقيقة' });

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: 'Invalid JSON' }); }
  }
  if (!body || !Array.isArray(body.messages))
    return res.status(400).json({ error: 'messages array required' });

  const CF_TOKEN      = process.env.CF_TOKEN;
  const CF_ACCOUNT_ID = process.env.CF_ACCOUNT_ID;
  if (!CF_TOKEN || !CF_ACCOUNT_ID)
    return res.status(500).json({ error: 'CF_TOKEN or CF_ACCOUNT_ID missing' });

  // ── Enhanced system prompt (always override for QCS quality) ─────────────
  const SYSTEM = `You are a senior QCS 2024 engineer assistant. 
Given retrieved QCS text chunks, answer the user's question directly and technically.

STRICT RULES:
1. Synthesize the chunks into ONE clear answer — do NOT just list the chunks
2. Extract any specific numbers, grades, dimensions, or table values mentioned
3. If chunks reference a table (e.g. "Table 6.1"), mention the table name and what it covers
4. Cite sources as [1], [2] only when quoting specific text
5. If the exact numeric values are not in the chunks, say: "QCS 2024 Table X covers this — refer to the original specification for exact values"
6. Answer in Arabic if the question is in Arabic, English if in English
7. Be concise — maximum 150 words`;

  const messages = [{ role: 'system', content: SYSTEM }];

  for (const m of body.messages) {
    const content = typeof m.content === 'string' ? m.content
      : Array.isArray(m.content) ? m.content.map(p => p.text || '').join('') : '';
    if (content.trim()) messages.push({ role: m.role, content });
  }

  const MODELS = ['@cf/meta/llama-3.1-8b-instruct', '@cf/meta/llama-3.2-3b-instruct'];
  let lastError = '';

  for (const model of MODELS) {
    try {
      const url = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/ai/run/${model}`;
      const r = await fetch(url, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${CF_TOKEN}` },
        body   : JSON.stringify({ messages, max_tokens: body.max_tokens || 600 }),
      });

      const data = await r.json();

      if (r.ok && data?.success) {
        const text = data?.result?.response?.trim() || '';
        if (text) {
          return res.status(200).json({
            id: `cf-${Date.now()}`, type: 'message', role: 'assistant', model,
            content: [{ type: 'text', text }],
            stop_reason: 'end_turn', usage: { input_tokens: 0, output_tokens: 0 },
          });
        }
        lastError = `${model}: empty response`;
      } else {
        const errMsg = data?.errors?.[0]?.message || JSON.stringify(data).slice(0, 200);
        lastError = `${model}: HTTP ${r.status} — ${errMsg}`;
        if (r.status === 401 || r.status === 403) break;
      }
    } catch (err) {
      lastError = `${model}: ${err.message}`;
    }
  }

  return res.status(502).json({ error: lastError });
};
