// api/mos-generator.js — QatarSpec Pro
// MOS/ITP Generator endpoint with Rate Limiting
// PROTOCOL 6: Free: 5/min | Pro: 60/min | Global: 100/min/IP

import { checkRateLimit } from './rate-limit.js';

export default async function handler(req, res) {
  // ═══ CORS ═══
  res.setHeader('Access-Control-Allow-Origin', 'https://qatar-standers.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // ═══ RATE LIMIT ═══
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  const token = req.headers.authorization?.replace('Bearer ', '') || null;

  // Global IP limit
  const globalLimit = await checkRateLimit(`mos:global:${ip}`, 100, 60);
  if (!globalLimit.allowed) {
    return res.status(429).json({
      error: 'Rate limit exceeded',
      message: 'تجاوزت الحد العالمي: 100 طلب/دقيقة لكل IP',
      retryAfter: globalLimit.retryAfter
    }).setHeader('Retry-After', globalLimit.retryAfter);
  }

  // User tier limit (Pro vs Free)
  const isPro = token && await verifyProToken(token);
  const userLimit = isPro ? 60 : 5;
  const userKey = token ? `mos:user:${token.slice(-8)}` : `mos:free:${ip}`;
  const userRateLimit = await checkRateLimit(userKey, userLimit, 60);

  if (!userRateLimit.allowed) {
    return res.status(429)
      .setHeader('Retry-After', userRateLimit.retryAfter)
      .json({
        error: 'Rate limit exceeded',
        message: isPro
          ? `تجاوزت الحد المسموح لـ Pro: ${userLimit} طلب/دقيقة`
          : `تجاوزت الحد المسموح للـ Free tier: ${userLimit} طلبات/دقيقة. قم بالترقية إلى Pro للحصول على 60 طلب/دقيقة.`,
        tier: isPro ? 'pro' : 'free',
        limit: userLimit,
        retryAfter: userRateLimit.retryAfter
      });
  }

  // ═══ INPUT VALIDATION ═══
  const { workType, projectName, reference, extraInfo } = req.body;

  if (!workType || typeof workType !== 'string' || workType.length > 100) {
    return res.status(400).json({ error: 'Invalid workType parameter' });
  }

  // Sanitize inputs
  const sanitize = (str) => (str || '').replace(/<[^>]*>/g, '').slice(0, 500);
  const safeProject = sanitize(projectName);
  const safeRef = sanitize(reference) || 'QCS 2024';
  const safeExtra = sanitize(extraInfo);

  // ═══ GEMINI API CALL ═══
  const GEMINI_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const prompt = buildMOSPrompt(workType, safeProject, safeRef, safeExtra);

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
      return res.status(502).json({ error: 'Gemini API error', details: errData.error?.message || 'Unknown' });
    }

    const data = await geminiRes.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return res.status(502).json({ error: 'No response from AI model' });
    }

    return res.status(200).json({
      result: text,
      reference: safeRef,
      disclaimer: `هذا المحتوى مولّد بالذكاء الاصطناعي. يجب مراجعته من مهندس مختص قبل الاستخدام الرسمي. المرجع: ${safeRef}.`,
      tier: isPro ? 'pro' : 'free',
      remainingRequests: userRateLimit.remaining
    });

  } catch (err) {
    console.error('[mos-generator] Error:', err.message);
    return res.status(500).json({ error: 'Internal server error', message: err.message });
  }
}

// ═══ PROMPT BUILDER ═══
function buildMOSPrompt(workType, project, ref, extra) {
  return `أنت مهندس متخصص في مواصفات قطر QCS 2024. أنشئ طريقة عمل (Method of Statement) احترافية.

بيانات المشروع:
- نوع العمل: ${workType}
- اسم المشروع: ${project || 'غير محدد'}
- المرجع: ${ref}
- تفاصيل إضافية: ${extra || 'لا يوجد'}

المطلوب: MOS منظم يتضمن:
1. نطاق العمل
2. المراجع والمواصفات (مع أقسام ${ref} المحددة)
3. المواد والمعدات
4. خطوات التنفيذ (9 مراحل)
5. ضوابط الجودة ونقاط الفحص
6. متطلبات السلامة
7. التوثيق المطلوب

تنبيه: لا تخترع أرقاماً — إذا لم تكن المواصفة محددة قل "راجع ${ref}".`;
}

// ═══ PRO TOKEN VERIFICATION ═══
async function verifyProToken(token) {
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
    if (!SUPABASE_URL || !SUPABASE_KEY) return false;

    const res = await fetch(`${SUPABASE_URL}/rest/v1/users?select=tier&api_key=eq.${token}&limit=1`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    const data = await res.json();
    return data?.[0]?.tier === 'pro' || data?.[0]?.tier === 'enterprise';
  } catch {
    return false;
  }
}
