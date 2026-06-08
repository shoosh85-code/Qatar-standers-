import { checkRateLimit } from './rate-limit.js';
import { verifyProTier } from './verify-pro.js';

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

const BLUEPRINT_PROMPT = `أنت مهندس متخصص في قراءة المخططات الهندسية القطرية.
استخرج من هذا المخطط المعلومات التالية بدقة تامة وأعد JSON فقط بدون أي نص آخر:

{
  "project": {
    "name": "اسم المشروع من title block",
    "scale": "المقياس مثل 1:100",
    "drawing_number": "رقم المخطط",
    "date": "التاريخ",
    "units": "mm أو m"
  },
  "dimensions": [
    { "label": "وصف البُعد", "value": 0.0, "unit": "m", "location": "وصف الموقع في المخطط" }
  ],
  "areas": [
    { "label": "اسم المنطقة أو العنصر", "length": 0.0, "width": 0.0, "height": 0.0, "area": 0.0, "volume": 0.0, "unit": "m" }
  ],
  "materials": [
    { "type": "نوع المادة مثل concrete أو steel أو tiles", "grade": "الدرجة مثل C30 أو B500B", "location": "أين تُستخدم", "quantity_note": "أي ملاحظة كمية من المخطط" }
  ],
  "structural_elements": [
    { "type": "column أو beam أو slab أو wall أو footing", "id": "رمز العنصر مثل C1", "width": 0.0, "depth": 0.0, "length": 0.0, "count": 0, "unit": "m" }
  ],
  "notes": ["أي ملاحظات هندسية مهمة من المخطط"],
  "confidence": "high أو medium أو low",
  "confidence_reason": "سبب مستوى الثقة"
}

قواعد صارمة:
- إذا لم تجد قيمة اكتب null وليس صفر
- لا تخترع أرقاماً - استخرج فقط ما هو موجود
- إذا المقياس غير واضح اكتب confidence: low
- أعد JSON نظيف فقط بدون backticks`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://qatar-standers.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { tier, userId } = await verifyProTier(req.headers['authorization']);
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

  const rl = await checkRateLimit({ endpoint: 'vision-proxy', ip, userId, tier });
  if (!rl.allowed) {
    return res.status(429).json({
      error: 'Rate limit exceeded',
      retryAfter: rl.retryAfter,
      upgrade: rl.upgrade,
      message_ar: rl.upgrade
        ? 'وصلت للحد المجاني (3/دقيقة). اشترك في Pro للحصول على 30/دقيقة.'
        : 'تجاوزت الحد. حاول بعد دقيقة.'
    });
  }

  const { imageBase64, mimeType, projectType } = req.body;

  if (!imageBase64 || !mimeType) {
    return res.status(400).json({ error: 'Missing image', message_ar: 'يرجى إرفاق صورة المخطط' });
  }

  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
  if (!ALLOWED_TYPES.includes(mimeType)) {
    return res.status(400).json({ error: 'Unsupported type', message_ar: 'الصيغ المدعومة: PDF، JPG، PNG، WebP' });
  }

  if (imageBase64.length > 5 * 1024 * 1024) {
    return res.status(400).json({ error: 'File too large', message_ar: 'الحد الأقصى للملف 4MB' });
  }

  const projectContext = projectType
    ? `\nنوع المشروع: ${projectType} — ركز على العناصر المتعلقة بهذا النوع.`
    : '';

  try {
    const geminiRes = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { inline_data: { mime_type: mimeType, data: imageBase64 } },
            { text: BLUEPRINT_PROMPT + projectContext }
          ]
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 2048,
          topP: 0.8
        }
      })
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error('[blueprint-parser] Gemini error:', errText);
      return res.status(502).json({ error: 'AI service error', message_ar: 'خطأ في خدمة التحليل' });
    }

    const data = await geminiRes.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return res.status(502).json({ error: 'Empty response', message_ar: 'لم يتمكن النظام من قراءة المخطط' });
    }

    let parsed;
    try {
      const clean = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(clean);
    } catch {
      return res.status(422).json({
        error: 'Parse error',
        message_ar: 'تعذر تحليل المخطط — حاول برفع صورة أوضح',
        raw: rawText.slice(0, 500)
      });
    }

    return res.status(200).json({
      success: true,
      blueprint: parsed,
      tier,
      remaining: rl.remaining,
      disclaimer_ar: '⚠️ النتائج استرشادية. يجب مراجعة المهندس المختص قبل التطبيق.'
    });

  } catch (err) {
    console.error('[blueprint-parser] Error:', err.message);
    return res.status(500).json({ error: 'Internal error', message_ar: 'خطأ داخلي في الخادم' });
  }
}
