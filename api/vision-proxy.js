// /api/vision-proxy.js — QatarSpec Pro
// Vision AI for Photo Inspector + Drawing Analyzer
// Uses Gemini 2.0 Flash (vision capable) + JWT Pro verification
// v3.2: +server-side Pro gate (X-Feature-Gate header)


export const config = { runtime: 'edge' };

import { checkRateLimit, rateLimitResponse } from '../lib/rate-limit.js';
import { getSupabaseUrl, getSupabaseServiceKey } from '../lib/supabase.js';

// ── جلب سياق QCS للتحليل البصري ──────────────────────────────────────────
async function fetchVisionQCSContext(mode, userMessage) {
  const url = getSupabaseUrl();
  const key = getSupabaseServiceKey();
  if (!url || !key) return '';
  const keywords = mode === 'inspector'
    ? 'inspection quality control defect workmanship'
    : 'drawing specification design requirements';
  const word = (userMessage || keywords).split(' ').slice(0, 2).join(' ');
  try {
    const res = await fetch(
      `${url}/rest/v1/qcs_chunks?content=ilike.*${encodeURIComponent(word)}*&select=content,source_file,section_name,page_num&limit=3&order=char_count.desc`,
      { headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }, signal: AbortSignal.timeout(5000) }
    );
    if (!res.ok) return '';
    const chunks = await res.json();
    if (!Array.isArray(chunks) || chunks.length === 0) return '';
    return '\n\n── مراجع QCS 2024 ذات صلة ──\n' +
      chunks.map((c, i) => `[${i+1}] ${(c.source_file||'QCS').replace(/Copy of /g,'')} | ص.${c.page_num||'?'}: ${(c.content||'').slice(0, 400)}`).join('\n') +
      '\n── استخدم المراجع أعلاه في تقريرك. ──';
  } catch { return ''; }
}
// ── Security Headers (Inline — Edge functions لا تدعم imports خارجية) ────
function applySecurityHeaders(res) {
  const headers = {
    'X-Content-Type-Options':            'nosniff',
    'X-Frame-Options':                   'DENY',
    'X-DNS-Prefetch-Control':            'off',
    'X-Download-Options':                'noopen',
    'X-Permitted-Cross-Domain-Policies': 'none',
    'Strict-Transport-Security':         'max-age=63072000; includeSubDomains; preload',
    'Referrer-Policy':                   'strict-origin-when-cross-origin',
    'Cross-Origin-Opener-Policy':        'same-origin',
    'Cross-Origin-Resource-Policy':      'same-origin',
    'Origin-Agent-Cluster':              '?1',
    'Access-Control-Allow-Origin':       'https://qatar-standers.vercel.app',
    'Access-Control-Allow-Methods':      'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers':      'Content-Type, Authorization, X-User-Tier',
    'Vary':                              'Origin',
  };
  for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);
}


const CORS = {
  'Access-Control-Allow-Origin': process.env.APP_URL || 'https://qatar-standers.vercel.app',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
  'Vary': 'Origin',
};


// ── JWT verify ──────────────────────────────────────────────────────────────
// SYNC-WITH: api/verify-pro.js verifyJWT() + api/ai-proxy.js verifyProToken()
// ملاحظة: Edge functions لا تدعم import بين بعضها في Vercel
// إذا عدّلت منطق الـ crypto هنا → عدّل verify-pro.js + ai-proxy.js أيضاً
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

══ معايير فحص متخصصة حسب نوع العمل ══

🏗️ خرسانة وتسليح (QCS S5):
- Cover: min 40mm للأساسات, 30mm للأعمدة, 25mm للسقف (QCS S5 P4 Table 4.3)
- Slump: 100±25mm عادي, 150±25mm SCC (QCS S5 P2)
- Curing: min 7 أيام wet curing (QCS S5 P4.12)
- Spacing: min 1.5db أو 25mm أيهما أكبر (QCS S5 P3)
- Lap Length: 40-50db حسب class A/B (QCS S5 P3 Table 3.5)
- Hooks: 90° = 12db, 180° = 4db min (QCS S5 P3)

🛣️ طرق وإسفلت (QCS S6):
- Wearing Course: 40-50mm min (QCS S6 P7)
- Binder Course: 50-60mm (QCS S6 P7)
- Base Course: CBR ≥80% (QCS S6 P5)
- Crossfall: 2.5% carriageway, 2% footway (QCS S6 P3)
- Compaction: ≥95% MDD (QCS S6 P7 Table 7.2)
- Level tolerance: ±10mm (QCS S6 P7)

💧 مرافق ومواسير (QCS S8):
- Bedding Class: حسب QCS S8 P6 Table 6.1
- Cover Depth: min 900mm تحت carriageway, 600mm تحت footway (QCS S8)
- Thrust Blocks: C20 min, حجم حسب الضغط والقطر (QCS S8 P12)
- Joint gap: max 3mm UPVC, max 5mm DI (QCS S8 P6)
- CCTV: إلزامي قبل التسليم (QCS S8 P15)

⛏️ حفر وردم (QCS S7):
- Compaction: ≥95% MDD بروكتور معدّل (QCS S7 P3)
- OMC tolerance: ±2% (QCS S7 P3)
- Layer thickness: max 200mm compacted (QCS S7 P3.6)
- Side slope: 1V:1H min (QCS S7 P2)
- Dewatering: يجب إبقاء مستوى المياه 500mm تحت القعر (QCS S7 P2)

🏢 شدات ومباني (QCS S5 P4):
- Formwork alignment: ±5mm per 3m (QCS S5 P4)
- Props spacing: حسب load tables (QCS S5 P4)
- Striking time: min 24h للجوانب, 7 days للسقف (QCS S5 P4.10)
- Surface finish: Class F2 min (QCS S5 P4.8)

🦺 سلامة وحواجز:
- Barricading: إلزامي لحفر >1.2m عمق (Ashghal Safety)
- PPE: خوذة + سترة عاكسة + حذاء سلامة (Ashghal OSHA)
- Signage: لوحات تحذيرية بالعربي والإنجليزي (QCS S1)

الرد يكون بالعربية مع المصطلحات الإنجليزية التقنية.

هيكل ردك الإلزامي:
## 🔍 نوع العمل المُفتَّش
[وصف موجز]

## 📋 نتائج الفحص
[قائمة مفصلة بكل ملاحظة — القيمة المرئية vs المطلوبة + QCS Ref]

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

  // ── Pro gate — server-side (v3.2) ─────────────────────────────────────────
  // Vision هي ميزة Pro — يُرفض الطلب إذا لم يكن المستخدم Pro
  if (!isPro && req.headers.get('X-Feature-Gate') === 'pro') {
    return new Response(
      JSON.stringify({ error: 'هذه الميزة للمشتركين Pro فقط', code: 'PRO_REQUIRED' }),
      { status: 403, headers: { ...CORS, 'Content-Type': 'application/json' } }
    );
  }
  // ── End Pro gate ──────────────────────────────────────────────────────────

  // Rate limiting — PROTOCOL 6 (Upstash Redis)
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '0.0.0.0';
  const rl = await checkRateLimit(ip, '/api/vision-proxy', isPro);
  if (!rl.allowed) return rateLimitResponse(rl, CORS);

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return json({ error: 'Vision service not configured' }, 503);

  // ── RAG: جلب مراجع QCS ذات صلة بالتحليل البصري ────────────────────────
  const qcsRef = await fetchVisionQCSContext(mode, userMessage);
  const systemPrompt = (mode === 'inspector' ? INSPECTOR_PROMPT : ANALYZER_PROMPT) + qcsRef;

  // userMessage يبقى منفصلاً — لا نخلط system prompt مع user message
  const userText = userMessage ||
    (mode === 'inspector'
      ? 'افحص هذه الصورة من الموقع وأعطني تقرير تفتيش شاملاً وفق QCS 2024'
      : 'حلل هذه الوثيقة/المخطط بشكل شامل وفق المواصفات القطرية QCS 2024');

  // Build Gemini vision request — system prompt in first content part
  const geminiBody = {
    contents: [
      {
        role: 'user',
        parts: [
          { text: systemPrompt },
          {
            inline_data: {
              mime_type: mimeType || 'image/jpeg',
              data: image,
            }
          },
          { text: userText }
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

  // ── Gemini API call with retry + fallback model ──
  // ترتيب الأفضلية: الأحدث أولاً ثم الاحتياطي
  // نفس الأسماء المستخدمة في ai-proxy.js (مؤكد تعمل)
  const models = [
    'gemini-2.0-flash',   // 15 RPM free — الأعلى حصة
    'gemini-1.5-flash',   // 15 RPM free
    'gemini-2.5-flash',   // 10 RPM free
  ];

  for (let attempt = 0; attempt < models.length; attempt++) {
    const model = models[attempt];
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 55000);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(geminiBody),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      // 429 = rate limit — retry with next model
      if (res.status === 429 && attempt < models.length - 1) {
        await new Promise(r => setTimeout(r, 2000)); // انتظر 2 ثانية
        continue;
      }

      if (!res.ok) {
        const err = await res.text();
        // آخر محاولة فشلت — أرجع الخطأ
        if (attempt === models.length - 1) {
          return json({ error: `Vision API error: ${res.status}`, detail: err.slice(0, 200) }, 502);
        }
        continue;
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      if (!text) {
        return json({ error: 'No response from vision AI' }, 502);
      }

      return json({ result: text, isPro, mode, model });

    } catch (err) {
      clearTimeout(timeout);
      if (err.name === 'AbortError') {
        return json({ error: 'Vision analysis timed out — try a smaller image' }, 504);
      }
      if (attempt === models.length - 1) {
        return json({ error: err.message }, 500);
      }
    }
  }

  return json({ error: 'All models failed — حاول مرة أخرى بعد دقيقة' }, 503);
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

