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

import { checkRateLimit, rateLimitResponse } from '../lib/rate-limit.js';

// تم التحقق من الموديلات المتاحة — آخر تحديث 2026-05
const GEMINI_MODELS = [
  { model: 'gemini-3.5-flash',               api: 'v1beta' }, // الأحدث — حصة متبقية
  { model: 'gemini-2.5-flash',               api: 'v1beta' }, // مستقر
  { model: 'gemini-2.5-pro',                 api: 'v1beta' }, // أدق
];

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

  // Rate limit — lib/rate-limit.js (Free: 3/min | Pro: 30/min | Global: 50/min)
  const ip      = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  const isPro   = req.headers['x-user-tier'] === 'pro';
  const rl      = await checkRateLimit(ip, '/api/vision-proxy', isPro);
  if (!rl.allowed) return rateLimitResponse(rl, {
    'Access-Control-Allow-Origin': process.env.APP_URL || 'https://qatar-standers.vercel.app'
  });

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
  const maxTokens = Math.min(Number(body.maxTokens) || 4096, 32768);
  const jsonMode  = !!body.jsonMode;
  const mode      = body.mode || 'general'; // 'general' | 'wall-detect' | 'qcs-check'

  if (!image) return res.status(400).json({ error: 'image مطلوب' });

  // تحقق من صحة الـ base64 (حد أدنى معقول — 50 حرف)
  if (typeof image !== 'string' || image.length < 50) {
    return res.status(400).json({ error: 'الصورة غير صالحة' });
  }

  // ── Wall Detection Mode — prompt هندسي متخصص ─────────────
  let finalPrompt = prompt;

  if (mode === 'wall-detect') {
    finalPrompt = `You are a specialized architectural drawing analyzer. Analyze this floor plan image and extract ALL structural elements.

CRITICAL: Return ONLY a valid JSON object. No explanation. No markdown. No backticks.

Rules for coordinate extraction:
- Assume the image is W×H pixels
- Map pixel coordinates to meters: 1 pixel ≈ (real_width_m / image_width_px)
- If scale is unknown, assume the plan is ~10m × 8m
- Origin (0,0) = bottom-left corner of the plan
- X axis = horizontal (East), Z axis = depth (North), Y axis = height

Return this exact JSON structure:
{
  "plan_width_m": <estimated total width in meters>,
  "plan_depth_m": <estimated total depth in meters>,
  "floor_height_m": 3.0,
  "walls": [
    {
      "id": "W01",
      "x": <center X in meters>,
      "z": <center Z in meters>,
      "length": <wall length in meters>,
      "rotation_y": <angle in radians, 0=horizontal, 1.5708=vertical>,
      "thickness": 0.2,
      "is_external": <true/false>,
      "height": 3.0
    }
  ],
  "doors": [
    {
      "id": "D01",
      "x": <center X>,
      "z": <center Z>,
      "width": 0.9,
      "height": 2.1,
      "rotation_y": 0
    }
  ],
  "windows": [
    {
      "id": "W01",
      "x": <center X>,
      "z": <center Z>,
      "width": 1.2,
      "height": 1.4,
      "sill_height": 0.9,
      "rotation_y": 0
    }
  ],
  "rooms": [
    {
      "id": "R01",
      "name_ar": "<Arabic name>",
      "name_en": "<English name>",
      "center_x": <X>,
      "center_z": <Z>,
      "area_m2": <estimated area>,
      "width_m": <estimated width>,
      "depth_m": <estimated depth>
    }
  ],
  "qcs_notes": [
    "<any QCS 2024 compliance observation>"
  ],
  "confidence": <0.0 to 1.0>,
  "parse_source": "gemini-vision"
}

If you cannot detect specific elements, use reasonable defaults based on a typical Qatari apartment.
Extract as many walls, doors, windows, and rooms as you can identify.`;
  }

  if (mode === 'qcs-check') {
    finalPrompt = `You are a QCS 2024 (Qatar Construction Specifications) compliance expert.
Analyze this architectural drawing/site photo and identify violations.

Return ONLY a valid JSON object:
{
  "violations": [
    {
      "id": "V001",
      "severity": "critical|warning|info",
      "element": "<element name>",
      "clause": "QCS 2024 · Section X · Part Y · Clause Z",
      "required": "<required value>",
      "actual": "<observed value>",
      "description_ar": "<Arabic description>",
      "corrective_action_ar": "<Arabic corrective action>"
    }
  ],
  "compliant_items": ["<list of compliant observations>"],
  "overall_assessment": "pass|fail|warning",
  "confidence": 0.0
}`;
  }

  if (!finalPrompt && mode === 'general') {
    return res.status(400).json({ error: 'prompt أو userMessage مطلوب' });
  }

  const genConfig = { temperature: mode === 'wall-detect' ? 0.05 : 0.1, maxOutputTokens: maxTokens };

  const requestBody = {
    contents: [{
      parts: [
        { inline_data: { mime_type: mimeType, data: image } },
        { text: finalPrompt }
      ]
    }],
    generationConfig: genConfig
  };

  const errors = []; // collect ALL model errors for diagnostics
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
        const errEntry = `${api}/${model} → HTTP ${geminiRes.status}: ${lastError}`;
        errors.push(errEntry);
        console.error(`[vision-proxy] ${errEntry}`);

        // API key خاطئ — لا فائدة من تجربة موديلات أخرى
        if (geminiRes.status === 403) {
          return res.status(403).json({
            error: lastError,
            model: `${api}/${model}`,
            allErrors: errors,
            hint: 'تحقق من صلاحية GEMINI_API_KEY في Vercel Environment Variables'
          });
        }
        // حصة منتهية — نفس الحصة لكل الموديلات، لا فائدة من التجربة
        if (geminiRes.status === 429 || (lastError && lastError.includes('RESOURCE_EXHAUSTED'))) {
          return res.status(429).json({
            error: lastError,
            model: `${api}/${model}`,
            hint: 'حصة Gemini API انتهت — انتظر دقيقة أو تحقق من: https://ai.dev/rate-limit'
          });
        }
        // 400/404/other — جرّب الموديل التالي
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
      errors.push(lastError);
      console.error(`[vision-proxy] fetch error: ${lastError}`);
    }
  }

  return res.status(502).json({
    error: lastError || 'جميع موديلات Gemini فشلت',
    allErrors: errors,
    hint: 'تحقق من صلاحية GEMINI_API_KEY في Vercel Environment Variables'
  });
}
