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

  // Build messages for Cloudflare AI
  const messages = [];

  // System prompt — enhanced for QCS technical answers
  const systemPrompt = body.system ||
    `You are a senior engineer specialized in Qatar Construction Specifications QCS 2024.
Your job: answer the user's question using ONLY the retrieved QCS text provided.
Rules:
- Extract specific values, tables, grades, dimensions from the text
- Cite reference numbers [1] [2] when using a source
- Answer in the same language as the question (Arabic question → Arabic answer)
- Be concise and technical — give actual numbers, not generic statements
- If the answer is not in the provided text, say so clearly`;

  messages.push({ role: 'system', content: systemPrompt });

  for (const m of body.messages) {
    const content = typeof m.content === 'string' ? m.content
      : Array.isArray(m.content) ? m.content.map(p => p.text || '').join('') : '';
    if (content.trim()) messages.push({ role: m.role, content });
  }

  const MODELS = [
    '@cf/meta/llama-3.1-8b-instruct',
    '@cf/meta/llama-3.2-3b-instruct',
  ];

  let lastError = '';

  for (const model of MODELS) {
    try {
      const url = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/ai/run/${model}`;
      const r = await fetch(url, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${CF_TOKEN}` },
        body   : JSON.stringify({ messages, max_tokens: body.max_tokens || 800 }),
      });

      const data = await r.json();

      if (r.ok && data?.success) {
        const text = data?.result?.response?.trim() || '';
        if (text) {
          return res.status(200).json({
            id         : `cf-${Date.now()}`,
            type       : 'message',
            role       : 'assistant',
            model,
            content    : [{ type: 'text', text }],
            stop_reason: 'end_turn',
            usage      : { input_tokens: 0, output_tokens: 0 },
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
