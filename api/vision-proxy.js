// api/vision-proxy.js — QatarSpec Pro v3.2
// FIX: body size limit + clear error messages + runtime config

// زيادة حجم الـ body المسموح (Vercel serverless default = 4.5MB)
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

const GEMINI_MODELS = [
  { model: 'gemini-2.0-flash',     api: 'v1beta' },
  { model: 'gemini-1.5-flash',     api: 'v1beta' },
  { model: 'gemini-2.0-flash',     api: 'v1'     },
  { model: 'gemini-1.5-flash',     api: 'v1'     },
  { model: 'gemini-pro-vision',    api: 'v1beta' },
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
      if (!k.endsWith(':' + now) && !k.endsWith(':' + (now - 1)))
        rateLimitStore.delete(k);
    }
  }
  rateLimitStore.set(key, count);
  return { allowed: count <= limit, remaining: Math.max(0, limit - count), limit };
}

// استخراج نص الخطأ من أي شكل
function extractErrorText(err) {
  if (!err) return 'خطأ غير معروف';
  if (typeof err === 'string') return err.slice(0, 300);
  if (err.message) return String(err.message).slice(0, 300);
  // Gemini error format: { error: { code, message, status } }
  if (err.error) {
    if (typeof err.error === 'string') return err.error.slice(0, 300);
    if (err.error.message) return `${err.error.status || ''}: ${err.error.message}`.trim().slice(0, 300);
  }
  try { return JSON.stringify(err).slice(0, 300); } catch { return 'خطأ غير معروف'; }
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', process.env.APP_URL || 'https://qatar-standers.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST فقط' });

  // Rate limit
  const ip   = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  const tier = req.headers['x-user-tier'] || 'free';
  const rl   = checkRateLimit(ip, tier);
  res.setHeader('X-RateLimit-Limit',     rl.limit);
  res.setHeader('X-RateLimit-Remaining', rl.remaining);
  res.setHeader('X-RateLimit-Reset',     Math.ceil(Date.now() / 60000) * 60);
  if (!rl.allowed) {
    res.setHeader('Retry-After', '60');
    return res.status(429).json({ error: 'تجاوزت الحد — حاول بعد دقيقة' });
  }

  // تحقق من GEMINI_API_KEY أولاً
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_key_here' || apiKey.length < 20) {
    console.error('[vision-proxy] GEMINI_API_KEY missing or invalid in env');
    return res.status(500).json({
      error: 'GEMINI_API_KEY غير مُعيَّن في Vercel Environment Variables',
      hint: 'اذهب إلى Vercel Dashboard → Settings → Environment Variables → أضف GEMINI_API_KEY'
    });
  }

  const body = req.body || {};

  // [FIX] يقبل prompt أو userMessage
  const image     = body.image;
  const prompt    = body.prompt || body.userMessage || '';
  const mimeType  = body.mimeType || 'image/jpeg';
  const maxTokens = Math.min(Number(body.maxTokens) || 2048, 8192);
  const jsonMode  = !!body.jsonMode;

  if (!image) return res.status(400).json({ error: 'image مطلوب' });
  if (!prompt) return res.status(400).json({ error: 'prompt أو userMessage مطلوب' });

  // تحقق من صحة الـ base64 (حد أدنى معقول — 50 حرف)
  if (typeof image !== 'string' || image.length < 50) {
    return res.status(400).json({ error: 'الصورة غير صالحة' });
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

  let lastError = '';

  for (const { model, api } of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/${api}/models/${model}:generateContent?key=${apiKey}`;

      const geminiRes = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const data = await geminiRes.json();

      if (!geminiRes.ok) {
        lastError = extractErrorText(data);
        console.error(`[vision-proxy] ${api}/${model} HTTP ${geminiRes.status}: ${lastError}`);

        // API key خاطئ — لا فائدة من تجربة موديلات أخرى
        if (geminiRes.status === 400 || geminiRes.status === 403) {
          return res.status(geminiRes.status).json({
            error: lastError,
            model: `${api}/${model}`,
            hint: geminiRes.status === 403
              ? 'تحقق من صلاحية GEMINI_API_KEY في Vercel Environment Variables'
              : `طلب غير صالح (${api}/${model}) — تحقق من حجم الصورة ونوعها`
          });
        }
        continue;
      }

      // فحص safety blocks
      const candidate = data.candidates?.[0];
      if (!candidate) {
        lastError = `${api}/${model}: لا يوجد candidates في الرد`;
        continue;
      }
      if (candidate.finishReason === 'SAFETY') {
        lastError = `${api}/${model}: محتوى محجوب بسبب فلتر الأمان`;
        continue;
      }

      const text = candidate.content?.parts?.[0]?.text || '';
      if (!text) {
        lastError = `${api}/${model}: رد فارغ من Gemini`;
        continue;
      }

      // [FIX] يرجع {result} لأن كل الكود يقرأ data.result
      return res.status(200).json({ result: text, model: `${api}/${model}` });

    } catch (err) {
      lastError = `${api}/${model}: ${extractErrorText(err)}`;
      console.error(`[vision-proxy] fetch error: ${lastError}`);
    }
  }

  return res.status(502).json({
    error: lastError || 'جميع موديلات Gemini فشلت',
    hint: 'تحقق من صلاحية GEMINI_API_KEY في Vercel Environment Variables'
  });
}
