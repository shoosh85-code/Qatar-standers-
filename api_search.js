// api/search.js — QatarSpec Pro Backend
// GEMINI_KEY stored in Vercel Environment Variables ONLY — never in frontend

const GEMINI_KEY = process.env.GEMINI_KEY;
const MODEL = 'gemini-1.5-pro';

// Simple in-memory cache (resets on cold start)
const cache = new Map();
const CACHE_TTL = 30 * 60 * 1000; // 30 min

// Rate limiting per IP
const ipCounts = new Map();
const RATE_LIMIT = 10; // per hour
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function getRateKey(ip) {
  return `${ip}_${Math.floor(Date.now() / RATE_WINDOW)}`;
}

function isRateLimited(ip) {
  const key = getRateKey(ip);
  const count = ipCounts.get(key) || 0;
  if (count >= RATE_LIMIT) return true;
  ipCounts.set(key, count + 1);
  // Cleanup old keys
  if (ipCounts.size > 1000) {
    const now = Math.floor(Date.now() / RATE_WINDOW);
    for (const [k] of ipCounts) {
      if (!k.endsWith(`_${now}`)) ipCounts.delete(k);
    }
  }
  return false;
}

const QCS_SYSTEM_PROMPT = `أنت مساعد متخصص في مواصفات البناء والإنشاء القطرية (QCS 2024).
مهمتك: الإجابة على أسئلة المهندسين بدقة تامة استناداً إلى QCS 2024.

قواعد الإجابة:
1. استشهد دائماً بالقسم والجزء والصفحة من QCS 2024
2. أعطِ الأرقام الدقيقة: النسب المئوية، الكثافات، درجات الحرارة، التكرارات
3. اذكر طريقة الاختبار (ASTM/BS) والتردد المطلوب
4. إذا لم تجد في QCS، وضّح ذلك صراحةً
5. الإجابة باللغة التي يكتب بها المستخدم (عربي/إنجليزي)
6. إجاباتك للمهندسين الميدانيين — كن دقيقاً ومختصراً`;

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Rate limiting
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'تجاوزت الحد المسموح — 10 بحثات في الساعة. حاول بعد قليل.' });
  }

  // Validate key
  if (!GEMINI_KEY) {
    return res.status(503).json({ error: 'خدمة البحث غير مهيأة — تواصل مع الدعم' });
  }

  const { query, partNum } = req.body || {};
  if (!query || typeof query !== 'string' || query.trim().length < 2) {
    return res.status(400).json({ error: 'الاستعلام فارغ أو غير صحيح' });
  }

  const cleanQuery = query.trim().slice(0, 500); // Max 500 chars

  // Cache check
  const cacheKey = `${cleanQuery}_${partNum || ''}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return res.status(200).json({ ...cached.data, cached: true });
  }

  // Build context from partNum
  const partContext = partNum ? `السياق: القسم ${partNum} من QCS 2024.\n` : '';

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: QCS_SYSTEM_PROMPT }] },
          contents: [{
            role: 'user',
            parts: [{ text: partContext + cleanQuery }]
          }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1024,
            topP: 0.8,
          }
        })
      }
    );

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const status = response.status;
      
      if (status === 429) return res.status(429).json({ error: 'تجاوز حد Gemini API — حاول بعد دقيقة' });
      if (status === 403) return res.status(503).json({ error: 'مشكلة في تهيئة الخدمة' });
      
      console.error('Gemini error:', status, errData);
      return res.status(502).json({ error: `خطأ في خدمة Gemini: ${status}` });
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      return res.status(502).json({ error: 'لم تُعَد إجابة من Gemini' });
    }

    const result = {
      answer: text,
      source: `QCS 2024 — بحث ذكي بـ Gemini ${MODEL}`,
      query: cleanQuery
    };

    // Cache it
    cache.set(cacheKey, { data: result, ts: Date.now() });
    if (cache.size > 100) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    return res.status(200).json(result);

  } catch (err) {
    console.error('Search error:', err);
    return res.status(500).json({ error: 'خطأ داخلي في الخادم — حاول مجدداً' });
  }
}
