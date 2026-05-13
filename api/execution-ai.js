// api/execution-ai.js — QatarSpec Pro
// AI Assistant للتنفيذ الميداني — Gemini API
// كل وحدة (Pour/MAR/NCR/Tests/DWR) تستشير هذا الـ endpoint
// لا تحذف محتوى — فقط إضافة

export const config = { runtime: 'edge' };

import { checkRateLimit, rateLimitResponse } from '../lib/rate-limit.js';
import { getSupabaseUrl, getSupabaseServiceKey } from '../lib/supabase.js';

// ── جلب نصوص QCS حقيقية من Supabase ────────────────────────────────────
// خريطة مصطلحات عربي → إنجليزي
const AR_TO_EN = {
  'درجة حرارة': 'maximum temperature fresh', 'الخرسانة': 'concrete',
  'الحد الأقصى': 'maximum', 'عند الصب': 'fresh placing',
  'هبوط': 'slump', 'slump': 'slump',
  'إسمنت': 'cement', 'سمنت': 'cement', 'اسمنت': 'cement',
  'تسليح': 'reinforcement', 'حديد': 'reinforcement', 'تغطية': 'cover',
  'ضغط': 'compressive', 'مقاومة': 'compressive strength',
  'تشققات': 'crack repair defect', 'تشقق': 'crack repair',
  'رفض': 'rejection non conformance', 'مخالفة': 'non conformance defect',
  'موافقة': 'material approval submittal',
  'ماء': 'water', 'رمل': 'sand', 'حصى': 'aggregate',
  'ركام': 'aggregate', 'أسفلت': 'asphalt', 'تربة': 'soil',
};

// ملفات QCS حسب الوحدة
const MODULE_FILES = {
  pour:    'Part15',
  mar:     'Part15',
  ncr:     'Part15',
  tests:   'Part15',
  dwr:     'Part1',
  general: null,
};

async function fetchQCSContext(keywords, limit, module) {
  const url = getSupabaseUrl();
  const key = getSupabaseServiceKey();
  if (!url || !key) return '';
  try {
    const lim = limit || 4;
    const headers = { 'apikey': key, 'Authorization': `Bearer ${key}` };
    const fileFilter = MODULE_FILES[module] ? `&source_file=ilike.*${MODULE_FILES[module]}*` : '';
    const words = keywords.split(' ').filter(w => w.length > 3);
    const allChunks = [];
    const seen = new Set();

    // ── استراتيجية 0: بحث مباشر بمصطلحات محددة (أدق لـ chunks المعروفة) ──
    // chunk 819 يحتوي "35" لكن يبدأ بـ "perature" — نستهدفه مباشرة
    const DIRECT_TERMS = {
      pour:  ['35', 'placing temperature', 'fresh concrete temperature'],
      ncr:   ['crack', 'cracks repair', 'non conformance', 'defect rejection'],
      tests: ['compressive strength', 'cube test', 'works cube'],
      mar:   ['cement', 'material approval', 'submittal requirement'],
    };
    if (DIRECT_TERMS[module]) {
      for (const term of DIRECT_TERMS[module]) {
        if (allChunks.length >= lim) break;
        const r = await fetch(
          `${url}/rest/v1/qcs_chunks?content=ilike.*${encodeURIComponent(term)}*${fileFilter}&select=id,content,source_file,section_name,page_num&limit=2&order=page_num.asc`,
          { headers }
        );
        if (r.ok) {
          const data = await r.json();
          for (const c of (Array.isArray(data) ? data : [])) {
            if (!seen.has(c.id)) { seen.add(c.id); allChunks.push(c); }
          }
        }
      }
    }

    // ── استراتيجية 1: Full-Text Search (fallback عام) ──
    if (words.length > 0 && allChunks.length < lim) {
      const ftsQuery = words.slice(0, 4).join(' ');
      const r = await fetch(
        `${url}/rest/v1/qcs_chunks?fts=phfts.${encodeURIComponent(ftsQuery)}${fileFilter}&select=id,content,source_file,section_name,page_num&limit=${lim}&order=page_num.asc`,
        { headers }
      );
      if (r.ok) {
        const data = await r.json();
        for (const c of (Array.isArray(data) ? data : [])) {
          if (!seen.has(c.id)) { seen.add(c.id); allChunks.push(c); }
        }
      }
      // أضف الـ chunk التالي لكل chunk (لحل النص المقطوع)
      const toFetch = allChunks.map(c => c.id + 1).filter(id => !seen.has(id)).slice(0, 2);
      for (const nextId of toFetch) {
        const rNext = await fetch(
          `${url}/rest/v1/qcs_chunks?id=eq.${nextId}&select=id,content,source_file,section_name,page_num`,
          { headers }
        );
        if (rNext.ok) {
          const nextData = await rNext.json();
          if (Array.isArray(nextData) && nextData[0]) {
            seen.add(nextId); allChunks.push(nextData[0]);
          }
        }
      }
    }

    // ── استراتيجية 2: ILIKE phrase مركبة (fallback إذا FTS لم يكفِ) ──
    if (allChunks.length < lim && words.length >= 2) {
      const phrase = words.slice(0, 2).join(' ');
      const r = await fetch(
        `${url}/rest/v1/qcs_chunks?content=ilike.*${encodeURIComponent(phrase)}*${fileFilter}&select=id,content,source_file,section_name,page_num&limit=${lim}&order=page_num.asc`,
        { headers }
      );
      if (r.ok) {
        const data = await r.json();
        for (const c of (Array.isArray(data) ? data : [])) {
          if (!seen.has(c.id)) { seen.add(c.id); allChunks.push(c); }
        }
      }
    }

    // ── استراتيجية 3: ILIKE per-word (آخر fallback) ──
    for (const word of words) {
      if (allChunks.length >= lim) break;
      const r = await fetch(
        `${url}/rest/v1/qcs_chunks?content=ilike.*${encodeURIComponent(word)}*${fileFilter}&select=id,content,source_file,section_name,page_num&limit=2&order=page_num.asc`,
        { headers }
      );
      if (!r.ok) continue;
      const data = await r.json();
      for (const c of (Array.isArray(data) ? data : [])) {
        if (!seen.has(c.id)) { seen.add(c.id); allChunks.push(c); }
      }
    }

    if (!allChunks.length) return '';
    // رتّب النتيجة النهائية حسب page_num لقراءة متسلسلة
    allChunks.sort((a, b) => (a.page_num || 0) - (b.page_num || 0));
    return '\n\n── نصوص QCS 2024 حقيقية من قاعدة البيانات ──\n' +
      allChunks.slice(0, lim + 1).map((c, i) =>
        `[مصدر ${i+1}: ${(c.source_file||'').replace(/Copy of /g,'')} | ${c.section_name||''} | ص.${c.page_num||'?'}]\n${(c.content||'').slice(0, 700)}`
      ).join('\n\n') +
      '\n── استخدم النصوص أعلاه كمرجع أساسي. إذا المعلومة غير موجودة فيها، قل "غير موجود في المصادر المتاحة — راجع QCS المختص". ──';
  } catch (e) {
    console.error('[rag] error:', e.message);
    return '';
  }
}

const CORS = {
  'Access-Control-Allow-Origin': process.env.APP_URL || 'https://qatar-standers.vercel.app',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

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

  // ── Rate Limit (PROTOCOL 6 — Upstash Redis shared) ──────────────────────
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '0.0.0.0';
  const rl = await checkRateLimit(ip, '/api/ai-proxy', false); // execution-ai = AI endpoint limits
  if (!rl.allowed) return rateLimitResponse(rl, CORS);

  let body;
  try { body = await req.json(); } 
  catch { return new Response('Invalid JSON', { status: 400 }); }

  const { question, module = 'general', context = '' } = body;
  if (!question?.trim()) return new Response('Missing question', { status: 400 });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return new Response('API key not configured', { status: 500 });

  // ── RAG: جلب نصوص QCS حقيقية قبل إرسال لـ Gemini ──────────────────────
  const moduleKeywords = {
    pour: 'temperature concrete placing fresh maximum 35',
    mar:  'material approval testing submittal',
    ncr:  'non conformance defect quality reject',
    tests:'testing laboratory results frequency',
    dwr:  'daily work report documentation record',
    mos:  question.slice(0, 60),
    general: question.slice(0, 60)
  };
  // استخرج كلمات إنجليزية من سؤال المستخدم العربي
  // استخرج كلمات إنجليزية — فلتر substring overlap + deduplicate
  const _arMatches = Object.entries(AR_TO_EN)
    .filter(([ar]) => question.includes(ar))
    // احذف المصطلح إذا كان مصطلح أطول يغطيه (مثال: سمنت داخل إسمنت)
    .filter(([ar], _, arr) => !arr.some(([b]) => b !== ar && b.includes(ar) && question.includes(b)))
    .map(([, en]) => en);
  const questionKeywords = [...new Set(_arMatches)].join(' ');

  // ادمج كلمات السؤال + كلمات الـ module للحصول على أدق نتيجة
  const baseKeywords = moduleKeywords[module] || '';
  const searchKeywords = questionKeywords
    ? (questionKeywords + ' ' + baseKeywords).trim()
    : (baseKeywords || question.slice(0, 60));
  const qcsContext = await fetchQCSContext(searchKeywords, module === 'mos' ? 6 : 4, module);

  const systemPrompt = (PROMPTS[module] || PROMPTS.general) + qcsContext;
  // للـ debugging — يظهر في Vercel logs
  console.log(`[execution-ai] module=${module} keywords="${searchKeywords}" chunks=${qcsContext.length > 50 ? 'found' : 'empty'}`);
  const fullPrompt = context
    ? `السياق:\n${context}\n\nالسؤال: ${question}`
    : question;

  // SYNC-WITH: api/vision-proxy.js model chain — نفس النماذج المؤكدة
  // ترتيب النماذج: lite أولاً (quota أعلى) ثم full models
  // المصدر: ListModels API — نماذج مؤكدة لهذا الـ key
  const MODELS = [
    { name: 'gemini-2.0-flash-lite',          api: 'v1beta' },
    { name: 'gemini-2.5-flash-lite',          api: 'v1beta' },
    { name: 'gemini-flash-lite-latest',       api: 'v1beta' },
    { name: 'gemini-2.5-flash',               api: 'v1beta' },
    { name: 'gemini-2.0-flash',               api: 'v1beta' },
    { name: 'gemini-flash-latest',            api: 'v1beta' },
  ];
  // Method Statements تحتاج توكنز أكثر من الأسئلة القصيرة
  const maxTokens = (module === 'mos') ? 4096 : 1500;

  try {
    let lastErr = '';
    let text = '';

    for (const { name: model, api: apiVer } of MODELS) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/${apiVer}/models/${model}:generateContent?key=${apiKey}`,
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
        // gemini-2.5-flash يُعيد thinking parts أولاً ثم الجواب الحقيقي
        // نفلتر: أي part حيث thought=true هو تفكير داخلي، ليس الجواب
        const allParts = data?.candidates?.[0]?.content?.parts || [];
        const answerParts = allParts.filter(p => !p.thought);
        text = answerParts.map(p => p.text || '').join('').trim()
             || allParts.map(p => p.text || '').join('').trim();
        if (text) break; // نجح — لا تحاول نموذج آخر
        // لم يرجع نص — سجّل السبب
        const finishReason = data?.candidates?.[0]?.finishReason || 'unknown';
        const promptFeedback = data?.promptFeedback?.blockReason || '';
        console.error(`[execution-ai] ${model} empty text — finishReason=${finishReason} block=${promptFeedback} parts=${allParts.length}`);
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

    return new Response(JSON.stringify({ answer: text, module, timestamp: new Date().toISOString(), _debug: { keywords: searchKeywords, chunksFound: qcsContext.length > 100, strategy: 'FTS-first+continuation', contextPreview: qcsContext.slice(0, 400) } }), {
      headers: { ...CORS, 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error('[execution-ai] Error:', err);
    return new Response(JSON.stringify({ error: 'Internal error', message: err.message }),
      { status: 500, headers: { ...CORS, 'Content-Type': 'application/json' }});
  }
}
