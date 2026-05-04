// /api/vision-proxy.js — QatarSpec Pro
// Vision AI for Photo Inspector + Drawing Analyzer
// Uses Gemini 2.0 Flash (vision capable) + JWT Pro verification

export const config = { runtime: 'edge' };

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// ── Rate Limiting (Edge-compatible in-memory) ────────────────────────────────
// حدود PROTOCOL 6: Free=3/دقيقة، Pro=30/دقيقة لكل IP
const _rl = new Map();
function checkRateLimit(ip, isPro) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const limit = isPro ? 30 : 3;
  const key = `${ip}:${isPro ? 'pro' : 'free'}`;
  const entry = _rl.get(key);
  if (!entry || now - entry.ts > windowMs) {
    _rl.set(key, { count: 1, ts: now });
    return { allowed: true, remaining: limit - 1 };
  }
  if (entry.count >= limit) {
    const retryAfter = Math.ceil((windowMs - (now - entry.ts)) / 1000);
    return { allowed: false, retryAfter, remaining: 0 };
  }
  entry.count++;
  return { allowed: true, remaining: limit - entry.count };
}

// ── JWT verify ──────────────────────────────────────────────────────────────
async function verifyProToken(token) {
  if (!token) return false;
  const secret = process.env.JWT_SECRET;
  if (!secret) return false;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    const msg = `${parts[0]}.${parts[1]}`;
    const key = await crypto.subtle.importKey(
      'raw', new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
    );
    const d = s => Uint8Array.from(atob(s.replace(/-/g,'+').replace(/_/g,'/')), c => c.charCodeAt(0));
    const ok = await crypto.subtle.verify('HMAC', key, d(parts[2]), new TextEncoder().encode(msg));
    if (!ok) return false;
    const p = JSON.parse(atob(parts[1].replace(/-/g,'+').replace(/_/g,'/')));
    return p.pro === true && p.exp > Math.floor(Date.now() / 1000);
  } catch { return false; }
}

// ── System Prompts ──────────────────────────────────────────────────────────
const INSPECTOR_PROMPT = `أنت مهندس متخصص ومفتش ميداني خبير في مواصفات البناء القطرية.
تعمل بموجب QCS 2024 (Qatar Construction Specification)، Ashghal Standards، KAHRAMAA، وMMUP.

عند تحليل صورة من موقع البناء:
1. حدد نوع العمل (طرق / مرافق / خرسانة / تسليح / إسفلت / حفر / إلخ)
2. افحص كل جانب مرئي بدقة
3. قارن ما تراه بمتطلبات QCS 2024 المناسبة
4. اذكر رقم القسم والجزء (مثل: QCS S5 P4، QCS S8 P6)
5. أعطِ رأياً واضحاً: PASS ✅ أو FAIL ❌ أو REQUIRES ATTENTION ⚠️

الرد يكون بالعربية مع المصطلحات الإنجليزية التقنية.

هيكل ردك الإلزامي:
## 🔍 نوع العمل المُفتَّش
[وصف موجز]

## 📋 نتائج الفحص
[قائمة مفصلة بكل ملاحظة مع القيمة المرئية vs المطلوبة]

## ✅ / ❌ الحكم العام
[PASS / FAIL / REQUIRES ATTENTION + السبب]

## 🔧 التوصيات
[إجراءات فورية إن وجدت + QCS Reference]

## 📌 المراجع
[أقسام QCS 2024 المستخدمة في التقييم]`;

const ANALYZER_PROMPT = `أنت مهندس استشاري خبير في تحليل المخططات الهندسية ووثائق المشاريع في قطر.
متخصص في: QCS 2024، Ashghal RDM 2023، KAHRAMAA Standards، MMUP Building Regulations، BS/ASTM/AASHTO.

عند تحليل المخططات أو الوثائق المرفقة:
1. حدد نوع الوثيقة (مخطط إنشائي / مواسير / طرق / كميات / مواصفات / إلخ)
2. حلل المحتوى بشكل شامل ودقيق
3. طابق مع المواصفات القطرية المناسبة
4. اكتشف أي أخطاء أو تعارضات أو نقاط مفقودة
5. اقترح طريقة التنفيذ المثلى

الرد بالعربية مع المصطلحات التقنية الإنجليزية.

هيكل ردك الإلزامي:
## 📄 نوع الوثيقة
[تحديد دقيق لما تم رفعه]

## 🔍 التحليل التفصيلي
[تحليل شامل للمحتوى]

## ⚠️ الملاحظات والأخطاء
[قائمة بكل ما يحتاج تصحيح أو انتباه]

## ✅ المطابقة مع المواصفات
[مدى توافق الوثيقة مع QCS/Ashghal/KAHRAMAA]

## 🏗️ طريقة التنفيذ المقترحة
[خطوات التنفيذ المثلى حسب نوع المشروع]

## 📌 المراجع
[المواصفات المستخدمة في التحليل]`;

// ── Main Handler ────────────────────────────────────────────────────────────
export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS });
  }
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  // Parse body
  let body;
  try { body = await req.json(); }
  catch { return json({ error: 'Invalid JSON' }, 400); }

  const { mode, image, mimeType, userMessage } = body;
  // mode: 'inspector' | 'analyzer'

  if (!image) return json({ error: 'No image/file provided' }, 400);
  if (!mode) return json({ error: 'Mode required: inspector or analyzer' }, 400);

  // [SEC v4.2] Pro check — Authorization header أو httpOnly cookie
  const authHeader = req.headers.get('authorization') || '';
  const cookieHeader = req.headers.get('cookie') || '';
  const cookieToken = cookieHeader.match(/qs_pro=([^;]+)/)?.[1] || null;
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : cookieToken;
  const isPro = token ? await verifyProToken(token) : false;

  // Rate limiting — PROTOCOL 6
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '0.0.0.0';
  const rl = checkRateLimit(ip, isPro);
  if (!rl.allowed) {
    return new Response(JSON.stringify({
      error: isPro
        ? `تجاوزت الحد (30 طلب/دقيقة للـ Pro). حاول بعد ${rl.retryAfter} ثانية.`
        : `تجاوزت الحد (3 طلبات/دقيقة). اشترك في Pro للرفع إلى 30/دقيقة.`,
      retryAfter: rl.retryAfter,
    }), {
      status: 429,
      headers: { ...CORS, 'Content-Type': 'application/json', 'Retry-After': String(rl.retryAfter) },
    });
  }

  const apiKey = process.env.GEMINI_KEY;
  if (!apiKey) return json({ error: 'Vision service not configured' }, 503);

  const systemPrompt = mode === 'inspector' ? INSPECTOR_PROMPT : ANALYZER_PROMPT;
  const userPrompt = userMessage ||
    (mode === 'inspector'
      ? 'افحص هذه الصورة من الموقع وأعطني تقرير تفتيش شاملاً وفق QCS 2024'
      : 'حلل هذه الوثيقة/المخطط بشكل شامل وفق المواصفات القطرية QCS 2024');

  // Build Gemini vision request
  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const geminiBody = {
    contents: [
      {
        role: 'user',
        parts: [
          {
            inline_data: {
              mime_type: mimeType || 'image/jpeg',
              data: image,   // base64 string
            }
          },
          { text: systemPrompt + '\n\n' + userPrompt }
        ]
      }
    ],
    generationConfig: {
      maxOutputTokens: isPro ? 3000 : 1500,
      temperature: 0.15,
      topP: 0.9,
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
    ],
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 55000);

  try {
    const res = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiBody),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const err = await res.text();
      return json({ error: `Vision API error: ${res.status}`, detail: err.slice(0, 200) }, 502);
    }

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!text) {
      return json({ error: 'No response from vision AI' }, 502);
    }

    return json({ result: text, isPro, mode });

  } catch (err) {
    clearTimeout(timeout);
    if (err.name === 'AbortError') {
      return json({ error: 'Vision analysis timed out — try a smaller image' }, 504);
    }
    return json({ error: err.message }, 500);
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}
