// api/vision-proxy.js
// Rate limiting: Free=5/min, Pro=60/min, Global=100/min/IP

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// In-memory rate limiter (fallback بدون Vercel KV)
const rateLimitStore = new Map();

function checkRateLimit(ip, tier) {
  const limits = { free: 5, pro: 60 };
  const limit = limits[tier] || limits.free;
  const key = `${ip}:${tier}:${Math.floor(Date.now() / 60000)}`;
  const count = (rateLimitStore.get(key) || 0) + 1;

  // تنظيف القديم
  if (rateLimitStore.size > 1000) {
    const now = Math.floor(Date.now() / 60000);
    for (const [k] of rateLimitStore) {
      if (!k.endsWith(':' + now) && !k.endsWith(':' + (now-1))) {
        rateLimitStore.delete(k);
      }
    }
  }

  rateLimitStore.set(key, count);
  return { allowed: count <= limit, remaining: Math.max(0, limit - count), limit };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip   = req.headers['x-forwarded-for']?.split(',')[0] || 'unknown';
  const tier = req.headers['x-user-tier'] || 'free';
  const rl   = checkRateLimit(ip, tier);

  res.setHeader('X-RateLimit-Limit',     rl.limit);
  res.setHeader('X-RateLimit-Remaining', rl.remaining);
  res.setHeader('X-RateLimit-Reset',     Math.ceil(Date.now() / 60000) * 60);

  if (!rl.allowed) {
    res.setHeader('Retry-After', '60');
    return res.status(429).json({ error: 'Rate limit exceeded', retry_after: 60 });
  }

  const { image, prompt } = req.body;
  if (!image || !prompt) {
    return res.status(400).json({ error: 'image و prompt مطلوبان' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY غير موجود في env' });
  }

  try {
    const geminiRes = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { inline_data: { mime_type: 'image/jpeg', data: image } },
            { text: prompt }
          ]
        }],
        generationConfig: { temperature: 0.1, maxOutputTokens: 512 }
      })
    });

    if (!geminiRes.ok) {
      const err = await geminiRes.json();
      return res.status(geminiRes.status).json({ error: err });
    }

    const data = await geminiRes.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return res.status(200).json({ text });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
