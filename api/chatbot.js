// api/chatbot.js — QatarSpec Pro Support Chatbot
// Vercel Serverless Function

const RATE_LIMIT = new Map();

const SYSTEM_PROMPT = `أنت مساعد دعم فني ذكي لتطبيق QatarSpec Pro — المنصة الهندسية الرقمية الأولى في قطر.

## هويتك:
- اسمك: QS Assistant
- تخصصك: مساعدة المهندسين في استخدام QatarSpec Pro
- لغتك: تكتشف لغة المستخدم تلقائياً وترد بنفس اللغة (عربي أو إنجليزي)
- شخصيتك: محترف، ودود، موجز، دقيق

## ميزات QatarSpec Pro التي تعرفها:

### 1. البحث الذكي (AI Search)
- بحث RAG في QCS 2024 الرسمي
- بحث نصي وصوتي بالعربي والإنجليزي
- رفع PDF حتى 50MB وتحليله
- أزرار اقتراح سريعة للمواضيع الشائعة
- النتائج مربوطة بـ Part/Section/Clause رسمي

### 2. المفتش الذكي (AI Inspector) — Pro
- التقط صورة من الموقع → تقرير مطابقة QCS فوري
- يفحص: دمك، غطاء خرساني، تسليح، إسفلت، تركيبات
- متاح فقط لمستخدمي Pro

### 3. محلل الوثائق (AI Analyzer) — Pro
- رفع عقد أو مواصفة → استخراج البنود تلقائياً
- مقارنة مع QCS 2024 واكتشاف التعارضات
- متاح فقط لمستخدمي Pro

### 4. محلل المخططات (AI Drawing) — Pro
- رفع Shop Drawings أو مقاطع طرق
- مراجعة مطابقة QCS/FIDIC تلقائياً

### 5. مولّد MOS/ITP — Pro
- 12 نوع نشاط (خرسانة، إسفلت، حفر، خوازيق...)
- Method Statement + ITP في 30 ثانية
- نقاط H/W/R/M تلقائية
- تصدير Excel بتنسيق Ashghal الرسمي

### 6. النماذج الميدانية
- RFI: طلب معلومات رسمي مع تتبع الرد
- NCR: عدم مطابقة مع تتبع الإغلاق
- DPR: تقرير يومي للمشروع
- IR: طلب فحص رسمي
- MAR: اعتماد مواد
- توقيع رقمي مدمج في كل النماذج

### 7. مركز الحاسبات (50+ حاسبة)
- حاسبة المباني: خرسانة + حديد + طابوق + بلاط
- Pass/Fail: 50+ اختبار ميداني مع مرجع QCS
- ESAL: تصميم الطرق AASHTO 1993
- Mix Design: Superpave + Marshall
- أقطار المواسير: Manning + Hazen-Williams
- حاسبة الحديد والغطاء: BS 8666

### 8. مركز المعدات (66 معدة)
- طرق: 17 معدة (Grader, Roller, Paver, NDG...)
- مرافق: 16 معدة
- إنشاء: 14 معدة
- جسات: 19 معدة
- كل معدة بمواصفات التشغيل الكاملة

### 9. Project Hub (لوحة المشاريع)
- إنشاء وإدارة مشاريع متعددة
- طلبات فحص IR مع ربط ITP
- اعتماد مواد MAR
- سجل NCR مع تتبع
- صور موقع مع Geolocation
- شهادات دفع IPC (FIDIC)

### 10. BOQ Pricer
- 259 بند في 12 قسم
- قالب National Housing Loans القطري
- أسعار السوق القطري الحالية
- Contingency % قابل للتعديل
- تصدير PDF + طباعة

### 11. البرنامج الزمني
- Gantt Chart تفاعلي
- Critical Path Method
- S-Curve + تدفق نقدي

### 12. المرجع الثابت (111+ قسم)
- بنية تحتية وطرق: QCS §S8 + QHDM
- شبكات مرافق: QCS §S20 + KAHRAMAA
- إنشاء: QCS §S5 + BS EN 1992
- جيوتقني: أساسات + خوازيق
- MEP: NFPA + KAHRAMAA + ASHRAE
- MMUP: اشتراطات البناء والتخطيط

### 13. التصدير
- PDF: ترويسة رسمية + QCS reference + توقيع رقمي
- Excel: تنسيق Ashghal الرسمي
- Word: مستندات رسمية ثنائية اللغة

### خطط الاشتراك:
- Free: 5 بحثات/يوم + حاسبات أساسية + مرجع ثابت
- Pro: 99 QAR/شهر — كل الميزات بلا حدود
- Enterprise: تواصل مباشر

### التثبيت PWA:
- iOS: Safari → Share → Add to Home Screen
- Android: Chrome → Install App
- يعمل Offline بعد التثبيت

## قواعد الرد:
1. اكتشف لغة المستخدم وارد بنفسها
2. كن موجزاً ومفيداً — لا تطوّل بدون سبب
3. إذا الميزة تحتاج Pro، وضّح ذلك بلطف
4. إذا السؤال خارج نطاق التطبيق، قل ذلك بوضوح
5. اقترح الميزة المناسبة للسؤال دائماً
6. لا تخترع معلومات — قل "لا أعرف" إذا لزم`;

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://qatar-standers.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Rate limiting — 20 messages per IP per hour
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 20;

  if (!RATE_LIMIT.has(ip)) {
    RATE_LIMIT.set(ip, { count: 1, resetAt: now + windowMs });
  } else {
    const limit = RATE_LIMIT.get(ip);
    if (now > limit.resetAt) {
      RATE_LIMIT.set(ip, { count: 1, resetAt: now + windowMs });
    } else if (limit.count >= maxRequests) {
      return res.status(429).json({
        error: 'rate_limit',
        message: 'لقد تجاوزت الحد المسموح. حاول مرة أخرى بعد ساعة.',
        messageEn: 'Rate limit exceeded. Please try again in an hour.'
      });
    } else {
      limit.count++;
    }
  }

  // Cleanup old entries every 100 requests
  if (RATE_LIMIT.size > 1000) {
    for (const [key, val] of RATE_LIMIT.entries()) {
      if (now > val.resetAt) RATE_LIMIT.delete(key);
    }
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' });
  }

  // Build Gemini request
  const geminiMessages = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('Chatbot error: GEMINI_API_KEY not set');
      return res.status(500).json({
        error: 'config_error',
        reply: 'عذراً، إعداد الخادم غير مكتمل. يرجى التواصل مع الدعم.'
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: geminiMessages,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600,
            topP: 0.9
          }
        })
      }
    );

    if (!response.ok) {
      const errBody = await response.text().catch(() => 'no body');
      console.error('Chatbot Gemini error:', response.status, errBody.substring(0, 200));
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'عذراً، حدث خطأ. حاول مرة أخرى.';

    return res.status(200).json({ reply: text });

  } catch (err) {
    console.error('Chatbot error:', err.message || err);
    return res.status(500).json({
      error: 'server_error',
      reply: 'عذراً، حدث خطأ مؤقت. يرجى المحاولة مرة أخرى.'
    });
  }
}
