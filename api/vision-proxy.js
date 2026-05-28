// api/vision-proxy.js — QatarSpec Pro v3.1
// FIX: 1) returns {result} not {text}  2) error is always string  3) reads userMessage|prompt

const GEMINI_MODELS = [
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-1.5-flash-8b',
];

// In-memory rate limiter
const rateLimitStore = new Map();

function checkRateLimit(ip, tier) {
  const limits = { free: 5, pro: 60 };
  const limit = limits[tier] || limits.free;
  const key = `${ip}:${tier}:${Math.floor(Date.now() / 60000)}`;
  const count = (rateLimitStore.get(key) || 0) + 1;

  if (rateLimitStore.size > 1000) {
    const now = Math.floor(Date.now() / 60000);
    for (const [k] of rateLimitStore) {
      if (!k.endsWith(':' + now) && !k.endsWith(':' + (now - 1))) {
        rateLimitStore.delete(k);
      }
    }
  }

  rateLimitStore.set(key, count);
  return { allowed: count <= limit, remaining: Math.max(0, limit - count), limit };
}

// استخراج نص الخطأ من أي شكل
function extractErrorText(err) {
  if (typeof err === 'string') return err;
  if (err && err.message) return String(err.message);
  if (err && err.error && typeof err.error === 'string') return err.error;
  if (err && err.error && err.error.message) return String(err.error.message);
  if (err && err.errors && err.errors[0] && err.errors[0].message) return String(err.errors[0].message);
  try { return JSON.stringify(err).slice(0, 200); } catch { return 'خطأ غير معروف'; }
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', process.env.APP_URL || 'https://qatar-standers.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST فقط' });

  const ip   = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown';
  const tier = req.headers['x-user-tier'] || 'free';
  const rl   = checkRateLimit(ip, tier);

  res.setHeader('X-RateLimit-Limit',     rl.limit);
  res.setHeader('X-RateLimit-Remaining', rl.remaining);
  res.setHeader('X-RateLimit-Reset',     Math.ceil(Date.now() / 60000) * 60);

  if (!rl.allowed) {
    res.setHeader('Retry-After', '60');
    return res.status(429).json({ error: 'تجاوزت الحد — حاول بعد دقيقة', retry_after: 60 });
  }

  const body = req.body || {};

  // [FIX 3] يقبل prompt أو userMessage (كلا الاستخدامين موجودان في الكود)
  const image      = body.image;
  const prompt     = body.prompt || body.userMessage;
  const mimeType   = body.mimeType || 'image/jpeg';
  const maxTokens  = Math.min(body.maxTokens || 2048, 8192);
  const jsonMode   = body.jsonMode || false;

  if (!image || !prompt) {
    return res.status(400).json({ error: 'image و prompt (أو userMessage) مطلوبان' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY غير موجود في env' });
  }

  const genConfig = { temperature: 0.1, maxOutputTokens: maxTokens };
  if (jsonMode) genConfig.responseMimeType = 'application/json';

  const requestBody = {
    contents: [{
      parts: [
        { inline_data: { mime_type: mimeType, data: image } },
        { text: prompt }
      ]
    }],
    generationConfig: genConfig
  };

  // محاولة مع كل موديل حتى ينجح واحد
  let lastError = '';
  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const geminiRes = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const data = await geminiRes.json();

      if (!geminiRes.ok) {
        // [FIX 2] نستخرج نص الخطأ وليس الكائن كاملاً
        lastError = extractErrorText(data);
        console.error(`[vision-proxy] ${model} error ${geminiRes.status}:`, lastError);
        continue; // جرّب الموديل التالي
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      if (!text) {
        lastError = 'الموديل لم يرجع نصاً';
        continue;
      }

      // [FIX 1] يرجع {result} وليس {text} — لأن كل الكود يقرأ data.result
      return res.status(200).json({ result: text, model });

    } catch (err) {
      lastError = extractErrorText(err);
      console.error(`[vision-proxy] ${model} fetch error:`, lastError);
    }
  }

  // كل الموديلات فشلت
  return res.status(502).json({ error: lastError || 'خطأ في Gemini API' });
}
