// api/scan-gemini-fallback.js — QatarSpec Pro
// بديل مجاني لـ KIRI Engine: يستخدم Gemini Vision لتحليل الصور وتقدير الأبعاد
// يعيد أبعاداً تقديرية ± 15% دون الحاجة لـ Mesh ثلاثي الأبعاد

import { withRateLimit } from './rate-limit.js';

// أقصى حجم صورة مسموح (Vercel limit = 4.5MB)
const MAX_IMAGE_SIZE = 4 * 1024 * 1024;

// تحليل الصور بـ Gemini Vision وإرجاع أبعاد تقديرية
async function analyzeImages(images) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY غير موجود في البيئة');

  // بناء prompt هندسي متخصص
  const systemPrompt = `أنت مهندس مدني متخصص في مراقبة الجودة وفق QCS 2024.
حلل هذه الصور للموقع الإنشائي وأعطِ تقديراً للأبعاد.
إذا وُجد ورق A4 أو باب قياسي في الصورة، استخدمه مقياساً.
أجب بـ JSON فقط، لا تضف أي نص قبله أو بعده.`;

  const userPrompt = `حلل هذه الصور وأعطني:
1. الأبعاد التقديرية (عرض، ارتفاع، عمق) بالمتر
2. المساحة التقديرية بالمتر المربع
3. أي مخاوف تتعلق بمواصفات QCS 2024
4. تنبيهات للمهندس

أجب بهذا الـ JSON الدقيق فقط:
{
  "dimensions": {
    "width": <رقم بالمتر>,
    "height": <رقم بالمتر>,
    "depth": <رقم بالمتر>,
    "unit": "m"
  },
  "estimated_area_m2": <رقم>,
  "confidence": "low|medium|high",
  "scale_reference": "none|a4_paper|door|other",
  "notes": "<ملاحظات بالعربية>",
  "qcs_flags": ["<تنبيه 1>", "<تنبيه 2>"],
  "disclaimer": "تقدير من صور — دقة ±15% — يُوصى بالقياس الميداني للتأكيد"
}`;

  // بناء parts للـ API — كل صورة كـ base64
  const contentParts = [
    { text: userPrompt }
  ];

  // أضف الصور
  for (const img of images) {
    contentParts.push({
      inlineData: {
        mimeType: img.mimeType || 'image/jpeg',
        data: img.base64
      }
    });
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: contentParts }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 1024,
          responseMimeType: 'application/json'
        }
      })
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Gemini لم يُرجع نتيجة');

  // تنظيف الـ JSON من أي markdown
  const clean = text.replace(/```json|```/g, '').trim();
  return JSON.parse(clean);
}

// ===== Handler الرئيسي =====
async function handler(req, res) {
  // SEC v3.1: CORS محدود
  const CORS_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://qatar-standers.vercel.app';
  res.setHeader('Access-Control-Allow-Origin', CORS_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { images, jobId } = req.body;

    // تحقق من المدخلات
    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({
        error: 'يجب إرسال مصفوفة images تحتوي على صورة واحدة على الأقل'
      });
    }

    if (images.length > 10) {
      return res.status(400).json({
        error: 'الحد الأقصى 10 صور لكل طلب'
      });
    }

    // تحقق من حجم كل صورة
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      if (!img.base64 || typeof img.base64 !== 'string') {
        return res.status(400).json({
          error: `الصورة ${i + 1}: يجب أن تكون base64 string`
        });
      }
      // تقدير حجم base64
      const approxBytes = (img.base64.length * 3) / 4;
      if (approxBytes > MAX_IMAGE_SIZE) {
        return res.status(400).json({
          error: `الصورة ${i + 1} كبيرة جداً (الحد الأقصى 4MB)`
        });
      }
    }

    // تحليل الصور
    const analysis = await analyzeImages(images);

    // أضف metadata
    const result = {
      ...analysis,
      jobId: jobId || `gemini_${Date.now()}`,
      processedAt: new Date().toISOString(),
      backend: 'gemini-vision',
      imageCount: images.length
    };

    return res.status(200).json(result);

  } catch (err) {
    console.error('[scan-gemini-fallback] Error:', err.message);

    // إذا فشل JSON parsing
    if (err instanceof SyntaxError) {
      return res.status(502).json({
        error: 'Gemini أرجع تنسيقاً غير صحيح',
        details: err.message
      });
    }

    return res.status(500).json({
      error: 'فشل تحليل الصور',
      details: err.message
    });
  }
}

export default withRateLimit(handler, '/api/scan-upload');
