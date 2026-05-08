// api/execution-ai.js — QatarSpec Pro
// AI Assistant للتنفيذ الميداني — Gemini API
// كل وحدة (Pour/MAR/NCR/Tests/DWR) تستشير هذا الـ endpoint
// لا تحذف محتوى — فقط إضافة

export const config = { runtime: 'edge' };

const CORS = {
  'Access-Control-Allow-Origin': process.env.APP_URL || 'https://qatar-standers.vercel.app',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Rate limiting — in-memory
const rl = new Map();
function checkRL(ip) {
  const now = Date.now(), key = `${ip}:${Math.floor(now/60000)}`;
  const c = (rl.get(key) || 0) + 1;
  rl.set(key, c);
  setTimeout(() => rl.delete(key), 60000);
  return c <= 8; // 8 req/min free
}

// System prompt مخصص لكل وحدة
const PROMPTS = {
  pour: `أنت مهندس خبير في QCS 2024 Part 8 (الخرسانة). 
المهندس يعطيك بيانات صب خرسانة أو مشكلة، أنت تُجيب بـ:
1. تقييم فوري: هل البيانات مطابقة QCS أم لا؟
2. البند الدقيق من QCS 2024 (مثال: Part 8 Cl.8.5.1)
3. الإجراء التصحيحي إن وجدت مشكلة
4. تحذير فوري إن كان الصب يجب أن يتوقف
الإجابة بالعربية، مختصرة، عملية. لا تخترع أرقاماً.`,

  mar: `أنت مهندس خبير في مواصفات المواد QCS 2024.
المهندس يسألك عن موافقة مادة (MAR). أجب بـ:
1. المتطلبات الدقيقة لهذه المادة من QCS 2024
2. الاختبارات المطلوبة والمعايير (Pass/Fail)
3. الوثائق الإلزامية لـ Ashghal
4. تحذيرات إن وجدت
الإجابة بالعربية، مختصرة، مع ذكر البند الدقيق.`,

  ncr: `أنت مهندس خبير في إجراءات الجودة QCS 2024 + FIDIC.
المهندس يصف لك مخالفة موقعية. أجب بـ:
1. تحديد البند المخالف من QCS 2024 بدقة
2. تصنيف الخطورة (Minor/Major/Critical) مع السبب
3. الإجراء التصحيحي الإلزامي
4. هل يجب إيقاف العمل؟ نعم/لا مع السبب
الإجابة بالعربية، حازمة، دقيقة.`,

  tests: `أنت مهندس خبير في اختبارات المواد QCS 2024 + Ashghal RDM 2023.
المهندس يعطيك نتيجة اختبار أو مشكلة. أجب بـ:
1. هل النتيجة Pass أم Fail؟ مع المعيار الدقيق
2. البند من QCS 2024 أو Ashghal RDM 2023
3. ماذا يفعل إذا كانت Fail؟ (إعادة اختبار / رفض / إصلاح)
4. عدد العينات المطلوبة وتوقيت الاختبار
الإجابة بالعربية، فورية، عملية.`,

  dwr: `أنت مهندس خبير في توثيق مشاريع Ashghal.
المهندس يسألك عن توثيق يومي أو مشكلة تنفيذية. أجب بـ:
1. الإجراء الصحيح حسب متطلبات Ashghal
2. التوثيق المطلوب (نماذج، تقارير)
3. مَن يجب إبلاغه؟
4. المدة الزمنية للاستجابة
الإجابة بالعربية، عملية، مباشرة.`,

  mos: `أنت مهندس خبير في إعداد طرق التنفيذ (Method Statements) لمشاريع قطر.
مراجعك: QCS 2024 · Ashghal RDM 2023 · FIDIC.
عند الطلب، أنشئ Method Statement كاملاً يشمل:
1. النطاق (Scope) — جملتان
2. المراجع (References) — QCS + Ashghal بالأرقام الدقيقة
3. المعدات المطلوبة (Plant & Equipment) — قائمة مع المواصفات
4. المواد (Materials) — مع متطلبات QCS
5. خطوات التنفيذ (Sequence of Works) — خطوات مرقمة بالتفصيل
6. نقاط التفتيش (Inspection Points) — Hold/Witness/Review
7. معايير القبول (Acceptance Criteria) — أرقام دقيقة من QCS
8. السلامة (HSE) — متطلبات خاصة بالنشاط
الإجابة بالعربية والإنجليزية معاً. لا تخترع أرقاماً.`,

  mos: `أنت مهندس خبير في إعداد Method Statements لمشاريع Ashghal قطر.
المراجع: QCS 2024 · Ashghal RDM 2023 · KAHRAMAA 2024 · FIDIC.
المهندس يعطيك نوع النشاط وتفاصيله. أنت تُنتج Method Statement كامل يشمل:
1. SCOPE — نطاق العمل (عربي + إنجليزي)
2. REFERENCES — المراجع الدقيقة (QCS Part/Section/Clause)
3. PLANT & EQUIPMENT — المعدات المطلوبة مع المواصفات
4. MATERIALS — المواد مع معايير QCS
5. MANPOWER — الكوادر البشرية
6. SEQUENCE OF WORKS — تسلسل التنفيذ (خطوات مرقّمة)
7. QUALITY CONTROL — نقاط الجودة (H/W/R) مع البنود
8. SAFETY — متطلبات السلامة
9. ENVIRONMENTAL — الاشتراطات البيئية
الإجابة منظمة بعناوين واضحة، بالعربية والإنجليزي، مع ذكر كل بند QCS.
لا تخترع أرقاماً — إذا لم تجد قل "راجع QCS المختص".`,

  general: `أنت مهندس خبير في مشاريع البنية التحتية في قطر.
مراجعك: QCS 2024 · Ashghal RDM 2023 · KAHRAMAA 2024 · MMUP · FIDIC.
أجب بالعربية بشكل مختصر وعملي مع ذكر المرجع الدقيق.
لا تخترع أرقاماً — إذا لم تجد المعلومة قل "غير موجود في المستند".`
};

export default async function handler(req) {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  // Rate limit
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  if (!checkRL(ip)) {
    return new Response(JSON.stringify({
      error: 'Rate limit exceeded',
      message: 'تجاوزت الحد المسموح (8 طلبات/دقيقة). حاول بعد قليل.'
    }), { status: 429, headers: { ...CORS, 'Content-Type': 'application/json', 'Retry-After': '60' }});
  }

  let body;
  try { body = await req.json(); } 
  catch { return new Response('Invalid JSON', { status: 400 }); }

  const { question, module = 'general', context = '' } = body;
  if (!question?.trim()) return new Response('Missing question', { status: 400 });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return new Response('API key not configured', { status: 500 });

  const systemPrompt = PROMPTS[module] || PROMPTS.general;
  const fullPrompt = context
    ? `السياق:\n${context}\n\nالسؤال: ${question}`
    : question;

  // SYNC-WITH: api/vision-proxy.js model chain — نفس النماذج المؤكدة
  const MODELS = ['gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-1.5-flash'];
  // Method Statements تحتاج توكنز أكثر من الأسئلة القصيرة
  const maxTokens = (module === 'mos') ? 4096 : 1500;

  try {
    let lastErr = '';
    let text = '';

    for (const model of MODELS) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: systemPrompt }] },
              contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
              generationConfig: { temperature: 0.2, maxOutputTokens: maxTokens }
            })
          }
        );

        if (!geminiRes.ok) {
          lastErr = await geminiRes.text();
          console.error(`[execution-ai] ${model} failed:`, lastErr);
          continue; // حاول النموذج التالي
        }

        const data = await geminiRes.json();
        text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        if (text) break; // نجح — لا تحاول نموذج آخر
      } catch (modelErr) {
        lastErr = modelErr.message;
        console.error(`[execution-ai] ${model} exception:`, modelErr.message);
        continue;
      }
    }

    if (!text) {
      return new Response(JSON.stringify({ error: 'جميع النماذج فشلت', detail: lastErr }),
        { status: 502, headers: { ...CORS, 'Content-Type': 'application/json' }});
    }

    return new Response(JSON.stringify({ answer: text, module, timestamp: new Date().toISOString() }), {
      headers: { ...CORS, 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error('[execution-ai] Error:', err);
    return new Response(JSON.stringify({ error: 'Internal error', message: err.message }),
      { status: 500, headers: { ...CORS, 'Content-Type': 'application/json' }});
  }
}
