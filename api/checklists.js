// api/checklists.js — QatarSpec Pro
// Activity Checklists CRUD + 8 QCS 2024 Templates — المرحلة 8 من Project Hub
// PROTOCOL 6: Rate limiting — 30/min free, 100/min pro, 200/min/IP global
// ✅ لا Anthropic API — Supabase مباشرة

import { checkRateLimit, getIp } from './rate-limit.js';

const CORS_ORIGIN = process.env.APP_URL || 'https://qatar-standers.vercel.app';

// ── Supabase helpers ──────────────────────────────────────────────────────
function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
}
function getSupabaseKey() {
  return process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;
}

async function verifyToken(authHeader) {
  if (!authHeader?.startsWith('Bearer ')) return null;
  const token = authHeader.replace('Bearer ', '').trim();
  if (!token) return null;
  const url = getSupabaseUrl();
  const key = getSupabaseKey();
  if (!url || !key) return null;
  try {
    const res = await fetch(`${url}/auth/v1/user`, {
      headers: { 'Authorization': `Bearer ${token}`, 'apikey': key }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.id ? data : null;
  } catch { return null; }
}

async function sbQuery(path, method = 'GET', body = null, userToken = null) {
  const url = getSupabaseUrl();
  const key = getSupabaseKey();
  const headers = {
    'apikey': key,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
    'Authorization': `Bearer ${userToken || key}`
  };
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);
  try {
    const res = await fetch(`${url}/rest/v1/${path}`, opts);
    const data = await res.json();
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    return { ok: false, status: 500, data: { error: err.message } };
  }
}

function corsHeaders(origin) {
  const allowed = origin === CORS_ORIGIN || origin?.endsWith('.vercel.app');
  return {
    'Access-Control-Allow-Origin': allowed ? origin : CORS_ORIGIN,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders }
  });
}

// ── 8 Checklist Templates — مبنية على QCS 2024 ──────────────────────────
const CHECKLIST_TEMPLATES = [
  {
    id: 'concrete-pour',
    name_ar: 'قبل صب الخرسانة',
    name_en: 'Pre-Concrete Pour',
    icon: '🏗️',
    qcs_reference: 'QCS 2024 Section 5 Part 3',
    items: [
      { id: 'cp1', text_ar: 'Formwork مستوٍ ونظيف ومحكم', text_en: 'Formwork level, clean and tight', required: true },
      { id: 'cp2', text_ar: 'التسليح مطابق للمخطط (الأقطار والمسافات)', text_en: 'Rebar matches drawings (diameters & spacing)', required: true },
      { id: 'cp3', text_ar: 'Cover Blocks موجودة وبالسماكة الصحيحة', text_en: 'Cover blocks present with correct thickness', required: true },
      { id: 'cp4', text_ar: 'Cube Moulds جاهزة (عدد 6 على الأقل)', text_en: 'Cube moulds ready (min 6)', required: true },
      { id: 'cp5', text_ar: 'الحرارة ضمن المسموح (< 35°C أو إجراءات الحر)', text_en: 'Temperature within limits (<35°C or hot weather measures)', required: true },
      { id: 'cp6', text_ar: 'IR معتمد من الاستشاري', text_en: 'IR approved by consultant', required: true },
      { id: 'cp7', text_ar: 'خلاطة الخرسانة وصلت ولديها Delivery Note', text_en: 'Ready-mix arrived with delivery note', required: true },
      { id: 'cp8', text_ar: 'اختبار Slump داخل المدى المطلوب', text_en: 'Slump test within required range', required: true },
      { id: 'cp9', text_ar: 'منسوب الصب محدد ومعلّم', text_en: 'Pour level marked clearly', required: false },
      { id: 'cp10', text_ar: 'Vibrators جاهزة وتعمل', text_en: 'Vibrators ready and operational', required: false },
      { id: 'cp11', text_ar: 'ماء للـ Curing جاهز', text_en: 'Water for curing available', required: false },
      { id: 'cp12', text_ar: 'مشرف موجود طوال فترة الصب', text_en: 'Supervisor present throughout pour', required: true }
    ]
  },
  {
    id: 'backfill',
    name_ar: 'قبل الردم',
    name_en: 'Pre-Backfill',
    icon: '⛏️',
    qcs_reference: 'QCS 2024 Section 6 Part 2',
    items: [
      { id: 'bf1', text_ar: 'المواسير مركّبة ومختبرة ومعتمدة', text_en: 'Pipes installed, tested and approved', required: true },
      { id: 'bf2', text_ar: 'Bedding بالمواد الصحيحة وبالسماكة المطلوبة', text_en: 'Bedding with correct material and thickness', required: true },
      { id: 'bf3', text_ar: 'صور تم التقاطها قبل الردم', text_en: 'Photos taken before backfilling', required: true },
      { id: 'bf4', text_ar: 'معدات الدك (Compactor) جاهزة', text_en: 'Compaction equipment ready', required: true },
      { id: 'bf5', text_ar: 'مواد الردم مختبرة (Proctor Test)', text_en: 'Backfill material tested (Proctor Test)', required: true },
      { id: 'bf6', text_ar: 'IR معتمد من الاستشاري', text_en: 'IR approved by consultant', required: true },
      { id: 'bf7', text_ar: 'سماكة كل طبقة لا تتجاوز 200mm', text_en: 'Layer thickness not exceeding 200mm', required: true },
      { id: 'bf8', text_ar: 'اختبار الدك (Field Density) بعد كل 3 طبقات', text_en: 'Compaction test (Field Density) every 3 layers', required: false }
    ]
  },
  {
    id: 'asphalt-paving',
    name_ar: 'قبل رصف الأسفلت',
    name_en: 'Pre-Asphalt Paving',
    icon: '🛣️',
    qcs_reference: 'QCS 2024 Section 6 Part 5',
    items: [
      { id: 'ap1', text_ar: 'Base Course مختبر (CBR ≥ 80%) ومعتمد', text_en: 'Base Course tested (CBR ≥ 80%) and approved', required: true },
      { id: 'ap2', text_ar: 'Prime Coat جاف تماماً (لا توجد مناطق رطبة)', text_en: 'Prime Coat fully dry (no wet areas)', required: true },
      { id: 'ap3', text_ar: 'Mix Design معتمد من المستشار', text_en: 'Mix design approved by consultant', required: true },
      { id: 'ap4', text_ar: 'Paver معاير ومضبوط على المنسوب الصحيح', text_en: 'Paver calibrated and set to correct level', required: true },
      { id: 'ap5', text_ar: 'درجة حرارة الخلطة ≥ 140°C عند الرصف', text_en: 'Mix temperature ≥ 140°C at paving', required: true },
      { id: 'ap6', text_ar: 'معدات الحدلة (Rollers) جاهزة ومعاملة', text_en: 'Rollers ready and calibrated', required: true },
      { id: 'ap7', text_ar: 'IR معتمد من الاستشاري', text_en: 'IR approved by consultant', required: true },
      { id: 'ap8', text_ar: 'معدل الرصف ثابت (لا يوجد انتظار طويل)', text_en: 'Paving rate consistent (no long waits)', required: false },
      { id: 'ap9', text_ar: 'Delivery Notes للخلطة لديها البيانات الكاملة', text_en: 'Mix delivery notes have complete data', required: false }
    ]
  },
  {
    id: 'pressure-test',
    name_ar: 'قبل اختبار الضغط (مياه)',
    name_en: 'Pre-Pressure Test (Water)',
    icon: '💧',
    qcs_reference: 'QCS 2024 Section 8 Part 4',
    items: [
      { id: 'pt1', text_ar: 'جميع المواسير موصّلة والوصلات محكمة', text_en: 'All pipes connected and joints tight', required: true },
      { id: 'pt2', text_ar: 'الأطراف مسدودة (End Caps أو Blank Flanges)', text_en: 'Ends sealed (End Caps or Blank Flanges)', required: true },
      { id: 'pt3', text_ar: 'مضخة الاختبار (Hydro-test Pump) جاهزة', text_en: 'Hydro-test pump ready', required: true },
      { id: 'pt4', text_ar: 'Pressure Gauge معاير ومشهود عليه', text_en: 'Pressure gauge calibrated and certified', required: true },
      { id: 'pt5', text_ar: 'ضغط الاختبار محدد (1.5× الضغط التشغيلي)', text_en: 'Test pressure defined (1.5× operating pressure)', required: true },
      { id: 'pt6', text_ar: 'مدة الاختبار محددة (≥ 2 ساعة)', text_en: 'Test duration defined (≥ 2 hours)', required: true },
      { id: 'pt7', text_ar: 'مهندس الاستشاري حاضر أو ممثله', text_en: 'Consultant engineer present or representative', required: true },
      { id: 'pt8', text_ar: 'خط التصريف (Drain Line) جاهز بعد الاختبار', text_en: 'Drain line ready after test', required: false }
    ]
  },
  {
    id: 'cctv-inspection',
    name_ar: 'قبل CCTV (صرف صحي)',
    name_en: 'Pre-CCTV Inspection',
    icon: '📹',
    qcs_reference: 'QCS 2024 Section 8 Part 6',
    items: [
      { id: 'cc1', text_ar: 'المواسير نظيفة تماماً (جاهزة للمسح)', text_en: 'Pipes completely clean (ready for survey)', required: true },
      { id: 'cc2', text_ar: 'جميع المنهولات (Manholes) مكتملة ومعرّفة', text_en: 'All manholes complete and identified', required: true },
      { id: 'cc3', text_ar: 'كاميرا CCTV معاير ومختبرة', text_en: 'CCTV camera calibrated and tested', required: true },
      { id: 'cc4', text_ar: 'تدفق المياه لا يتجاوز 75% من قطر الأنبوب', text_en: 'Water flow not exceeding 75% of pipe diameter', required: true },
      { id: 'cc5', text_ar: 'رقم كل منهول وخط محدد في المخطط', text_en: 'Manhole and line numbers identified on drawing', required: true },
      { id: 'cc6', text_ar: 'نظام التسجيل والتقرير جاهز', text_en: 'Recording and reporting system ready', required: true },
      { id: 'cc7', text_ar: 'التصاريح الأمنية (إن لزم) جاهزة', text_en: 'Security permits (if required) ready', required: false }
    ]
  },
  {
    id: 'formwork',
    name_ar: 'Formwork Checklist',
    name_en: 'Formwork Inspection',
    icon: '🔩',
    qcs_reference: 'QCS 2024 Section 5 Part 2',
    items: [
      { id: 'fw1', text_ar: 'أبعاد الـ Formwork مطابقة للمخطط (± 5mm)', text_en: 'Formwork dimensions match drawings (±5mm)', required: true },
      { id: 'fw2', text_ar: 'الـ Props ثابتة ومتباعدة بشكل صحيح', text_en: 'Props stable and correctly spaced', required: true },
      { id: 'fw3', text_ar: 'Release Agent مطبّق بالتساوي', text_en: 'Release agent applied evenly', required: true },
      { id: 'fw4', text_ar: 'المناسيب والمحاور (Levels & Alignment) صحيحة', text_en: 'Levels and alignment correct', required: true },
      { id: 'fw5', text_ar: 'الفجوات والشقوق مسدودة (No Gaps)', text_en: 'Gaps and cracks sealed (No Gaps)', required: true },
      { id: 'fw6', text_ar: 'الدعامات الجانبية (Bracing) كافية', text_en: 'Lateral bracing (Bracing) adequate', required: true },
      { id: 'fw7', text_ar: 'الخشب/الصفيح نظيف وخالٍ من الأوساخ', text_en: 'Plywood/steel clean and free of debris', required: false },
      { id: 'fw8', text_ar: 'Kickers للجدران موجودة وبالارتفاع الصحيح', text_en: 'Kickers for walls present at correct height', required: false }
    ]
  },
  {
    id: 'rebar',
    name_ar: 'Rebar Checklist',
    name_en: 'Reinforcement Inspection',
    icon: '⚙️',
    qcs_reference: 'QCS 2024 Section 5 Part 2 Clause 5.2.4',
    items: [
      { id: 'rb1', text_ar: 'أقطار التسليح مطابقة للمخطط', text_en: 'Rebar diameters match drawings', required: true },
      { id: 'rb2', text_ar: 'مسافات التسليح صحيحة (Spacing)', text_en: 'Rebar spacing correct', required: true },
      { id: 'rb3', text_ar: 'Lap Length مطابق للمواصفات (40d)', text_en: 'Lap length meets specs (40d)', required: true },
      { id: 'rb4', text_ar: 'Cover Spacers موجودة بالكثافة المطلوبة', text_en: 'Cover spacers present at required density', required: true },
      { id: 'rb5', text_ar: 'Chair Bars (للبلاطات) موجودة وبالارتفاع الصحيح', text_en: 'Chair bars (for slabs) present and correct height', required: true },
      { id: 'rb6', text_ar: 'التسليح نظيف (لا صدأ مؤثر، لا شحوم)', text_en: 'Rebar clean (no harmful rust, no grease)', required: true },
      { id: 'rb7', text_ar: 'Stirrups وLinks صحيحة الشكل والقطر', text_en: 'Stirrups and links correct shape and diameter', required: true },
      { id: 'rb8', text_ar: 'الربط (Tying) محكم وكافٍ', text_en: 'Tying secure and adequate', required: false },
      { id: 'rb9', text_ar: 'شهادات مواد التسليح معتمدة ومقدمة للمستشار', text_en: 'Steel mill certificates approved and submitted', required: true }
    ]
  },
  {
    id: 'handover',
    name_ar: 'Handover Checklist',
    name_en: 'Project Handover',
    icon: '🤝',
    qcs_reference: 'QCS 2024 Section 1 Part 7',
    items: [
      { id: 'ho1', text_ar: 'As-Built Drawings معتمدة ومسلّمة (ورق + ديجيتال)', text_en: 'As-Built Drawings approved and submitted (paper & digital)', required: true },
      { id: 'ho2', text_ar: 'O&M Manuals للمعدات كاملة', text_en: 'O&M Manuals for all equipment complete', required: true },
      { id: 'ho3', text_ar: 'شهادات المواد (Material Certificates) مرتّبة', text_en: 'Material certificates organized and submitted', required: true },
      { id: 'ho4', text_ar: 'تقارير الاختبارات (Test Reports) كاملة', text_en: 'Test reports complete and filed', required: true },
      { id: 'ho5', text_ar: 'ضمانات المعدات والمواد (Warranties) مسلّمة', text_en: 'Equipment and material warranties submitted', required: true },
      { id: 'ho6', text_ar: 'وثائق التدريب (Training Documents) جاهزة', text_en: 'Training documents ready', required: false },
      { id: 'ho7', text_ar: 'Snag List مغلقة بالكامل', text_en: 'Snag List fully closed', required: true },
      { id: 'ho8', text_ar: 'NCR Log — جميع الـ NCRs مغلقة', text_en: 'NCR Log — all NCRs closed', required: true },
      { id: 'ho9', text_ar: 'شهادة الإنجاز (Completion Certificate) جاهزة', text_en: 'Completion Certificate ready', required: true },
      { id: 'ho10', text_ar: 'مسح نهائي للموقع ومطابقة As-Built', text_en: 'Final site survey and As-Built verification', required: true },
      { id: 'ho11', text_ar: 'مفاتيح وبطاقات الدخول مسلّمة', text_en: 'Keys and access cards handed over', required: false },
      { id: 'ho12', text_ar: 'صور نهائية للمشروع (Before/After)', text_en: 'Final project photos (Before/After)', required: false }
    ]
  }
];

// ── Main Handler ──────────────────────────────────────────────────────────
export default async function handler(req) {
  const origin = req.headers.get('origin') || '';
  const cors = corsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: cors });
  }

  // Rate limiting — PROTOCOL 6
  const ip = getIp(req);
  const authHeader = req.headers.get('authorization') || '';
  const isPro = authHeader.includes('pro');

  const rl = await checkRateLimit(ip, '/api/checklists', isPro);
  if (!rl.allowed) {
    return json(
      { error: 'Rate limit exceeded', retry_after: rl.retryAfter },
      429,
      { ...cors, 'Retry-After': String(rl.retryAfter || 60) }
    );
  }

  const url = new URL(req.url);
  const method = req.method;

  // ── GET Templates — لا يحتاج auth ────────────────────────────────────
  if (method === 'GET' && url.searchParams.get('templates') === 'true') {
    return json({ templates: CHECKLIST_TEMPLATES }, 200, cors);
  }

  // Auth check لباقي العمليات
  const user = await verifyToken(authHeader);
  if (!user) {
    return json({ error: 'Unauthorized — يرجى تسجيل الدخول' }, 401, cors);
  }

  const userToken = authHeader.replace('Bearer ', '').trim();
  const checklistId = url.searchParams.get('id');
  const projectId = url.searchParams.get('project_id');

  // ──────────────────────────────────────────────────────────────────────
  // GET — جلب Checklists المحفوظة للمشروع
  // ──────────────────────────────────────────────────────────────────────
  if (method === 'GET') {
    if (!projectId) {
      return json({ error: 'project_id مطلوب' }, 400, cors);
    }

    const r = await sbQuery(
      `activity_checklists?project_id=eq.${projectId}&user_id=eq.${user.id}&order=created_at.desc`,
      'GET', null, userToken
    );
    if (!r.ok) {
      return json({ error: 'فشل جلب Checklists', details: r.data }, r.status, cors);
    }

    return json({ checklists: Array.isArray(r.data) ? r.data : [] }, 200, cors);
  }

  // ──────────────────────────────────────────────────────────────────────
  // POST — حفظ Checklist
  // ──────────────────────────────────────────────────────────────────────
  if (method === 'POST') {
    let body;
    try { body = await req.json(); } catch {
      return json({ error: 'JSON غير صالح' }, 400, cors);
    }

    if (!body.project_id) return json({ error: 'project_id مطلوب' }, 400, cors);
    if (!body.activity_type) return json({ error: 'activity_type مطلوب' }, 400, cors);
    if (!body.checklist_items || typeof body.checklist_items !== 'object') {
      return json({ error: 'checklist_items مطلوبة' }, 400, cors);
    }

    // احسب الحالة (Pass/Fail) من الـ items
    const items = body.checklist_items;
    const required = items.filter(i => i.required);
    const allRequiredPassed = required.every(i => i.checked);
    const status = allRequiredPassed ? 'passed' : 'failed';

    const record = {
      project_id:       body.project_id,
      user_id:          user.id,
      activity_type:    body.activity_type,
      checklist_items:  body.checklist_items,
      status,
      inspector:        body.inspector?.trim() || null,
      check_date:       body.check_date || new Date().toISOString().split('T')[0],
      qcs_reference:    body.qcs_reference?.trim() || null,
      notes:            body.notes?.trim() || null,
    };

    const r = await sbQuery('activity_checklists', 'POST', record, userToken);
    if (!r.ok) {
      return json({ error: 'فشل حفظ Checklist', details: r.data }, r.status, cors);
    }

    const created = Array.isArray(r.data) ? r.data[0] : r.data;
    return json({
      checklist: created,
      status,
      message: status === 'passed' ? '✅ Checklist: PASS' : '❌ Checklist: FAIL — بنود إلزامية لم تُكتمل'
    }, 201, cors);
  }

  // ──────────────────────────────────────────────────────────────────────
  // PUT — تحديث Checklist
  // ──────────────────────────────────────────────────────────────────────
  if (method === 'PUT') {
    if (!checklistId) return json({ error: 'id مطلوب للتحديث' }, 400, cors);

    let body;
    try { body = await req.json(); } catch {
      return json({ error: 'JSON غير صالح' }, 400, cors);
    }

    const check = await sbQuery(
      `activity_checklists?id=eq.${checklistId}&user_id=eq.${user.id}&select=id`,
      'GET', null, userToken
    );
    if (!check.ok || !Array.isArray(check.data) || check.data.length === 0) {
      return json({ error: 'Checklist غير موجودة' }, 404, cors);
    }

    const updates = {};
    if (body.checklist_items) {
      const items = body.checklist_items;
      const required = items.filter(i => i.required);
      const allRequiredPassed = required.every(i => i.checked);
      updates.checklist_items = items;
      updates.status = allRequiredPassed ? 'passed' : 'failed';
    }
    if (body.inspector !== undefined) updates.inspector = body.inspector;
    if (body.check_date !== undefined) updates.check_date = body.check_date;
    if (body.notes !== undefined) updates.notes = body.notes;

    const r = await sbQuery(
      `activity_checklists?id=eq.${checklistId}&user_id=eq.${user.id}`,
      'PATCH', updates, userToken
    );
    if (!r.ok) {
      return json({ error: 'فشل التحديث', details: r.data }, r.status, cors);
    }

    const updated = Array.isArray(r.data) ? r.data[0] : r.data;
    return json({ checklist: updated, message: 'تم تحديث Checklist' }, 200, cors);
  }

  // ──────────────────────────────────────────────────────────────────────
  // DELETE — حذف Checklist
  // ──────────────────────────────────────────────────────────────────────
  if (method === 'DELETE') {
    if (!checklistId) return json({ error: 'id مطلوب للحذف' }, 400, cors);

    const check = await sbQuery(
      `activity_checklists?id=eq.${checklistId}&user_id=eq.${user.id}&select=id`,
      'GET', null, userToken
    );
    if (!check.ok || !Array.isArray(check.data) || check.data.length === 0) {
      return json({ error: 'Checklist غير موجودة' }, 404, cors);
    }

    const r = await sbQuery(
      `activity_checklists?id=eq.${checklistId}&user_id=eq.${user.id}`,
      'DELETE', null, userToken
    );
    if (!r.ok) {
      return json({ error: 'فشل الحذف', details: r.data }, r.status, cors);
    }

    return json({ message: 'تم حذف Checklist' }, 200, cors);
  }

  return json({ error: `Method ${method} غير مدعوم` }, 405, cors);
}
