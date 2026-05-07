// api/mos-generator.js — QatarSpec Pro
// MOS/ITP Generator endpoint
// PROTOCOL 6: Free: 5/min | Pro: 60/min | Global: 100/min/IP
// يستخدم withRateLimit من rate-limit.js بالـ signature الصحيحة

import { withRateLimit } from './rate-limit.js';

export default async function handler(req, res) {
  // ═══ CORS ═══
  res.setHeader('Access-Control-Allow-Origin', 'https://qatar-standers.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // ═══ RATE LIMIT (Protocol 6) ═══
  const allowed = await withRateLimit(req, res, 'mos-generator');
  if (!allowed) return; // 429 أُرسل من withRateLimit

  // ═══ INPUT VALIDATION ═══
  const { workType, projectName, reference, contractorName, engineerName, extraInfo } = req.body || {};

  if (!workType || typeof workType !== 'string' || workType.length > 200) {
    return res.status(400).json({ error: 'Invalid workType parameter' });
  }

  // تنظيف المدخلات — لا innerHTML injection
  const sanitize = (str) => (str || '').replace(/<[^>]*>/g, '').replace(/[<>"'`]/g, '').slice(0, 500);
  const safeProject    = sanitize(projectName);
  const safeRef        = sanitize(reference) || 'QCS 2024';
  const safeContractor = sanitize(contractorName);
  const safeEngineer   = sanitize(engineerName);
  const safeExtra      = sanitize(extraInfo);
  const safeWorkType   = sanitize(workType);

  // ═══ GEMINI API ═══
  const GEMINI_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_KEY) {
    return res.status(500).json({ error: 'API key not configured on server' });
  }

  const prompt = buildMOSPrompt(safeWorkType, safeProject, safeRef, safeContractor, safeEngineer, safeExtra);

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            maxOutputTokens: 2048,
            temperature: 0.3,
            topP: 0.8
          },
          safetySettings: [
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
          ]
        })
      }
    );

    if (!geminiRes.ok) {
      const errData = await geminiRes.json().catch(() => ({}));
      console.error('[mos-generator] Gemini error:', errData);
      return res.status(502).json({
        error: 'AI model error',
        details: errData.error?.message || `HTTP ${geminiRes.status}`
      });
    }

    const data = await geminiRes.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return res.status(502).json({ error: 'No response from AI model' });
    }

    return res.status(200).json({
      result: text,
      reference: safeRef,
      disclaimer: `هذا المحتوى مولّد بالذكاء الاصطناعي. يجب مراجعته من مهندس مختص قبل الاستخدام الرسمي. المرجع: ${safeRef}.`
    });

  } catch (err) {
    console.error('[mos-generator] Fetch error:', err.message);
    return res.status(500).json({ error: 'Internal server error', message: err.message });
  }
}

function buildMOSPrompt(workType, project, ref, contractor, engineer, extra) {
  return `أنت مهندس متخصص في مواصفات قطر QCS 2024 وأشغال. أنشئ طريقة عمل (Method of Statement) احترافية.

بيانات المشروع:
- نوع العمل: ${workType}
- اسم المشروع: ${project || 'غير محدد'}
- المرجع: ${ref}
- المقاول: ${contractor || 'غير محدد'}
- المهندس: ${engineer || 'غير محدد'}
- تفاصيل إضافية: ${extra || 'لا يوجد'}

المطلوب: MOS منظم يتضمن:
1. نطاق العمل
2. المراجع والمواصفات (مع أقسام ${ref} المحددة)
3. المواد والمعدات
4. خطوات التنفيذ (9 مراحل)
5. ضوابط الجودة (Hold Point / Witness Point)
6. متطلبات السلامة
7. التوثيق المطلوب

تنبيه: لا تخترع أرقاماً — إذا لم تكن المواصفة محددة قل "راجع ${ref}".`;
}
