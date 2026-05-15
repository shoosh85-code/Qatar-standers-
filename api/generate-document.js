// api/generate-document.js — QatarSpec Pro
// توليد المستندات الهندسية — Method Statement / ITP / NCR / DPR
// مستوحى من DDC_Skills_for_AI_Agents_in_Construction
// Gemini API فقط — لا Anthropic
// لا تحذف محتوى — فقط إضافة

export const config = { runtime: 'edge' };

import { checkRateLimit, rateLimitResponse } from '../lib/rate-limit.js';

// ── System Prompts مستوحاة من DDC_Skills ──────────────────────────────────
const SYSTEM_PROMPTS = {

  method_statement: (workType, workLabel, qcsRef) => `
أنت مهندس مدني استشاري خبير في تنفيذ مشاريع البنية التحتية بقطر.
متخصص في إعداد Method Statements وفق متطلبات Ashghal وQCS 2024.

## قواعدك الصارمة:
1. استند فقط على QCS 2024 — اذكر رقم الجزء والقسم والبند
2. اذكر المرجع الدقيق: [QCS 2024 Part X, Section Y, Clause Z]
3. استخدم وحدات قطرية: kN, MPa, mm, m, °C, kPa
4. أضف Hold Points و Witness Points حسب متطلبات Ashghal
5. إذا لم تجد نصاً محدداً في QCS → قل "حسب أفضل الممارسات الهندسية"
6. اللغة: عربي أساسي + مصطلحات إنجليزية فنية

## المرجع المحدد للنشاط:
- النشاط: ${workLabel}
- المواصفة: ${qcsRef}
- الإطار العام: QCS 2024 | Ashghal RDM 2023 | KAHRAMAA 2024 | FIDIC

## تنسيق الإجابة لكل قسم:
- نقاط مرقمة تفصيلية
- شروط البداية والنهاية لكل خطوة
- المرجع في نهاية كل نقطة: [QCS Ref]
- جداول عند الحاجة
`.trim(),

  ncr: (ncrDesc, ncrClass, qcsClause) => `
أنت مهندس QA/QC خبير متخصص في تطبيق متطلبات الجودة في مشاريع قطر.
متخصص في تحليل عدم المطابقات وفق ISO 9001:2015 وQCS 2024 وAshghal QA/QC.

## قواعدك:
1. حلل السبب الجذري وفق منهجية 5-Why أو Fishbone
2. استند على QCS 2024 في الإجراءات التصحيحية
3. اذكر المرجع الدقيق لكل اشتراط
4. الإجراءات يجب أن تكون SMART (محددة، قابلة للقياس، محددة بوقت)

## تفاصيل المخالفة:
- الوصف: ${ncrDesc}
- التصنيف: ${ncrClass}
- البند المخالف: ${qcsClause || 'يُحدد من المستخدم'}

أجب بعربي واضح مع مصطلحات إنجليزية فنية.
`.trim(),

  itp: (workType, workLabel, qcsRef) => `
أنت مهندس QA/QC متخصص في إعداد خطط الفحص والاختبار (ITP) لمشاريع البنية التحتية في قطر.

## قواعدك:
1. كل صف يحتوي: النشاط | المرجع | معيار القبول | طريقة الفحص | التردد | H/W/R/I
2. Hold Points (H) = توقف إلزامي — موافقة الاستشاري قبل المتابعة
3. Witness Points (W) = إخطار مسبق 24 ساعة
4. Review (R) = مراجعة السجلات
5. استند على QCS 2024 في معايير القبول
6. اذكر رقم البند: [QCS 2024 Part X §Y.Z]

## النشاط المطلوب:
- النشاط: ${workLabel}
- المواصفة: ${qcsRef}

أنشئ جدول ITP كامل بصيغة: رقم | النشاط | المرجع | معيار القبول | التردد | مقاول | استشاري | أشغال | السجل
`.trim(),

  dpr: (project, date, activities) => `
أنت مهندس موقع متخصص في إعداد تقارير التقدم اليومية لمشاريع البنية التحتية في قطر.

## قواعدك:
1. التقرير وفق نموذج Ashghal الرسمي
2. اربط كل نشاط بـ QCS 2024 clause ذي الصلة
3. المشاكل تُذكر بوضوح مع المسؤول والجدول الزمني للحل
4. خطة اليوم التالي: محددة، قابلة للقياس، مرتبطة بالبرنامج الزمني

## بيانات اليوم:
- المشروع: ${project}
- التاريخ: ${date}
- الأعمال المنجزة: ${activities}
`.trim()
};

// ── توليد قسم واحد من المستند ─────────────────────────────────────────────
async function generateSection(apiKey, systemPrompt, sectionTitle, sectionHint, context) {
  const userMsg = `اكتب قسم "${sectionTitle}" بالتفصيل الكامل للمستند.
${sectionHint ? `تلميح: ${sectionHint}` : ''}
${context ? `السياق: ${context}` : ''}

اكتب بعربي + إنجليزي فني. كل نقطة تنتهي بمرجع QCS 2024 بين قوسين مربعين.`;

  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text: userMsg }] }],
        generationConfig: { maxOutputTokens: 800, temperature: 0.3 }
      }),
      signal: AbortSignal.timeout(25000)
    }
  );
  if (!r.ok) {
    const e = await r.text();
    throw new Error(`Gemini error ${r.status}: ${e.slice(0, 200)}`);
  }
  const d = await r.json();
  return d?.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

// ── Handler الرئيسي ────────────────────────────────────────────────────────
export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }});
  }
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  // Rate limiting
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const authHeader = req.headers.get('authorization') || '';
  const isPro = authHeader.startsWith('Bearer qs_pro_') || authHeader.startsWith('Bearer pro_');
  const rl = await checkRateLimit('/api/generate-document', ip, isPro);
  if (!rl.allowed) return rateLimitResponse(rl);

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return new Response(JSON.stringify({ error: 'GEMINI_API_KEY مفقود' }), {
    status: 500, headers: { 'Content-Type': 'application/json' }
  });

  let body;
  try { body = await req.json(); }
  catch { return new Response(JSON.stringify({ error: 'JSON غير صالح' }), { status: 400, headers: { 'Content-Type': 'application/json' } }); }

  const { template_type, work_type, project_name, engineer_name, inputs = {} } = body;

  if (!template_type) return new Response(JSON.stringify({ error: 'template_type مطلوب' }), {
    status: 400, headers: { 'Content-Type': 'application/json' }
  });

  const CORS = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };

  try {
    // ── Method Statement ──────────────────────────────────────────────────
    if (template_type === 'method_statement') {
      const tmpl = await fetch(new URL('/data/templates/method-statement.json', req.url));
      const schema = tmpl.ok ? await tmpl.json() : { sections: [], work_types: {} };
      const wt = schema.work_types?.[work_type] || { label_ar: work_type, label_en: work_type, qcs: 'QCS 2024' };
      const sysPrompt = SYSTEM_PROMPTS.method_statement(work_type, wt.label_ar, wt.qcs);
      const context = `المشروع: ${project_name || 'غير محدد'} | المهندس: ${engineer_name || 'غير محدد'} | ${inputs.extra || ''}`;

      const generatedSections = {};
      const sections = schema.sections?.filter(s => s.ai_generate) || [];

      for (const sec of sections) {
        generatedSections[sec.id] = await generateSection(apiKey, sysPrompt, sec.title_ar, inputs[sec.id] || '', context);
      }

      // القسم الأخير (رسومات) — ثابت
      generatedSections.drawings = `يُكمله المهندس المسؤول بأرقام الرسومات المعتمدة والمحددة للمشروع.
Engineer to complete with approved drawing numbers and project-specific references.`;

      return new Response(JSON.stringify({
        ok: true,
        template_type,
        work_type,
        work_label_ar: wt.label_ar,
        work_label_en: wt.label_en,
        qcs_reference: wt.qcs,
        project_name: project_name || '',
        engineer_name: engineer_name || '',
        generated_at: new Date().toISOString(),
        sections: generatedSections,
        schema_sections: schema.sections || []
      }), { status: 200, headers: CORS });
    }

    // ── NCR ───────────────────────────────────────────────────────────────
    if (template_type === 'ncr') {
      const { ncr_desc = '', ncr_class = 'minor', ncr_clause = '', ncr_loc = '' } = inputs;
      const sysPrompt = SYSTEM_PROMPTS.ncr(ncr_desc, ncr_class, ncr_clause);
      const context = `الموقع: ${ncr_loc} | البند المخالف: ${ncr_clause}`;

      const aiSections = {
        root_cause:  await generateSection(apiKey, sysPrompt, 'تحليل السبب الجذري', '', context),
        corrective:  await generateSection(apiKey, sysPrompt, 'الإجراء التصحيحي المقترح', '', context),
        preventive:  await generateSection(apiKey, sysPrompt, 'الإجراء الوقائي المقترح', '', context),
        qcs_ref:     await generateSection(apiKey, sysPrompt, 'بنود QCS 2024 ذات الصلة بالمخالفة', '', ncr_desc)
      };

      return new Response(JSON.stringify({
        ok: true, template_type,
        project_name, engineer_name,
        ncr_class, ncr_desc, ncr_clause, ncr_loc,
        generated_at: new Date().toISOString(),
        ai_sections: aiSections
      }), { status: 200, headers: CORS });
    }

    // ── ITP ───────────────────────────────────────────────────────────────
    if (template_type === 'itp') {
      const wt = { concrete:'الخرسانة', earthworks:'الحفر والردم', asphalt:'الأسفلت', piling:'الأوتاد', drainage:'الصرف الصحي', utilities:'المرافق' };
      const qcsMap = { concrete:'QCS 2024 Part 8', earthworks:'QCS 2024 Part 6', asphalt:'Ashghal RDM 2023 Ch.5', piling:'QCS 2024 Part 5 §5.5', drainage:'QCS 2024 Part 10', utilities:'KAHRAMAA 2024' };
      const label = wt[work_type] || work_type;
      const qcs = qcsMap[work_type] || 'QCS 2024';
      const sysPrompt = SYSTEM_PROMPTS.itp(work_type, label, qcs);
      const itpTable = await generateSection(apiKey, sysPrompt, 'جدول ITP الكامل', '', `المشروع: ${project_name}`);

      return new Response(JSON.stringify({
        ok: true, template_type, work_type,
        work_label_ar: label, qcs_reference: qcs,
        project_name, engineer_name,
        generated_at: new Date().toISOString(),
        itp_table: itpTable
      }), { status: 200, headers: CORS });
    }

    // ── DPR ───────────────────────────────────────────────────────────────
    if (template_type === 'dpr') {
      const { report_date = new Date().toISOString().split('T')[0], activities_summary = '' } = inputs;
      const sysPrompt = SYSTEM_PROMPTS.dpr(project_name, report_date, activities_summary);

      const dprSections = {
        activities_narrative: await generateSection(apiKey, sysPrompt, 'سرد الأعمال المنجزة بالتفصيل', '', ''),
        issues_analysis:      await generateSection(apiKey, sysPrompt, 'تحليل المشاكل والعقبات مع الحلول المقترحة', '', ''),
        next_day_plan:        await generateSection(apiKey, sysPrompt, 'خطة عمل اليوم التالي المفصلة', '', '')
      };

      return new Response(JSON.stringify({
        ok: true, template_type,
        project_name, engineer_name, report_date,
        generated_at: new Date().toISOString(),
        dpr_sections: dprSections
      }), { status: 200, headers: CORS });
    }

    return new Response(JSON.stringify({ error: `template_type غير معروف: ${template_type}` }), {
      status: 400, headers: CORS
    });

  } catch (err) {
    console.error('[generate-document]', err);
    return new Response(JSON.stringify({ error: err.message || 'خطأ داخلي' }), {
      status: 500, headers: CORS
    });
  }
}
