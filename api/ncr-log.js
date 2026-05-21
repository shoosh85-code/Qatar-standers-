// api/ncr-log.js — QatarSpec Pro
// NCR Log CRUD — المرحلة 6 من Project Hub
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

// ── CORS helper ───────────────────────────────────────────────────────────
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

// ── الحقول المسموح بتحديثها ───────────────────────────────────────────────
const ALLOWED_FIELDS = [
  'title', 'description', 'location_detail', 'discipline', 'severity',
  'qcs_reference', 'corrective_action', 'status', 'close_date', 'ncr_number'
];

// ── الـ Discipline labels ─────────────────────────────────────────────────
const DISCIPLINE_LABELS = {
  structural: 'إنشائي — Structural',
  roads: 'طرق — Roads',
  utilities: 'مرافق — Utilities',
  mep: 'ميكانيكي وكهربائي — MEP',
  finishing: 'تشطيبات — Finishing',
  other: 'أخرى — Other'
};

// ── توليد رقم NCR تلقائي ─────────────────────────────────────────────────
async function getNextNcrNumber(projectId, userToken) {
  const r = await sbQuery(
    `ncr_log?project_id=eq.${projectId}&select=ncr_number&order=created_at.desc&limit=100`,
    'GET', null, userToken
  );
  if (!r.ok || !Array.isArray(r.data) || r.data.length === 0) return 'NCR-001';

  let maxNum = 0;
  for (const row of r.data) {
    const match = (row.ncr_number || '').match(/NCR-(\d+)/i);
    if (match) {
      const n = parseInt(match[1], 10);
      if (n > maxNum) maxNum = n;
    }
  }
  return `NCR-${String(maxNum + 1).padStart(3, '0')}`;
}

// ── حساب متوسط وقت الإغلاق ──────────────────────────────────────────────
function calcAvgClosingDays(ncrs) {
  const closed = ncrs.filter(n => n.status === 'closed' && n.issued_date && n.close_date);
  if (closed.length === 0) return null;
  const total = closed.reduce((sum, n) => {
    const diff = (new Date(n.close_date) - new Date(n.issued_date)) / 86400000;
    return sum + (diff > 0 ? diff : 0);
  }, 0);
  return Math.round(total / closed.length);
}

// ── أكثر 20 NCR شيوعاً في المشاريع القطرية ──────────────────────────────
const COMMON_NCRS = [
  { id: 1, title: 'تسليح غير مطابق للمخطط', discipline: 'structural', severity: 'major', qcs_reference: 'QCS 2014 Section 5 Part 2' },
  { id: 2, title: 'Cover Blocks غير كافية', discipline: 'structural', severity: 'major', qcs_reference: 'QCS 2014 Section 5 Part 2 Clause 5.2.4' },
  { id: 3, title: 'خلط خرسانة بدون موافقة', discipline: 'structural', severity: 'critical', qcs_reference: 'QCS 2014 Section 5 Part 3' },
  { id: 4, title: 'Compaction غير كافي للردم', discipline: 'roads', severity: 'major', qcs_reference: 'QCS 2014 Section 6 Part 2' },
  { id: 5, title: 'عدم إجراء اختبار ضغط المياه', discipline: 'utilities', severity: 'critical', qcs_reference: 'QCS 2014 Section 8 Part 4' },
  { id: 6, title: 'رصف الأسفلت بدون Prime Coat معتمد', discipline: 'roads', severity: 'major', qcs_reference: 'QCS 2014 Section 6 Part 5' },
  { id: 7, title: 'Lap Length غير مطابق', discipline: 'structural', severity: 'major', qcs_reference: 'QCS 2014 Section 5 Part 2 Clause 5.2.6' },
  { id: 8, title: 'مواسير بدون Bedding مناسب', discipline: 'utilities', severity: 'major', qcs_reference: 'QCS 2014 Section 8 Part 3' },
  { id: 9, title: 'صب خرسانة بدون IR معتمد', discipline: 'structural', severity: 'critical', qcs_reference: 'QCS 2014 Section 5 Part 1' },
  { id: 10, title: 'تشقق في الخرسانة بعد الصب', discipline: 'structural', severity: 'major', qcs_reference: 'QCS 2014 Section 5 Part 3 Clause 5.3.8' },
  { id: 11, title: 'Formwork تم إزالته مبكراً', discipline: 'structural', severity: 'critical', qcs_reference: 'QCS 2014 Section 5 Part 2 Clause 5.2.9' },
  { id: 12, title: 'مواد بدون اعتماد Submittal', discipline: 'structural', severity: 'minor', qcs_reference: 'QCS 2014 Section 1 Part 5' },
  { id: 13, title: 'Curing غير مناسب للخرسانة', discipline: 'structural', severity: 'major', qcs_reference: 'QCS 2014 Section 5 Part 3 Clause 5.3.7' },
  { id: 14, title: 'Grading منحنى الأسفلت خارج المواصفات', discipline: 'roads', severity: 'major', qcs_reference: 'QCS 2014 Section 6 Part 5 Clause 6.5.3' },
  { id: 15, title: 'منسوب Invert غير مطابق للمخطط', discipline: 'utilities', severity: 'major', qcs_reference: 'QCS 2014 Section 8 Part 2' },
  { id: 16, title: 'نظافة الموقع غير مقبولة', discipline: 'other', severity: 'minor', qcs_reference: 'QCS 2014 Section 1 Part 6' },
  { id: 17, title: 'Welding بدون welding procedure معتمد', discipline: 'structural', severity: 'critical', qcs_reference: 'QCS 2014 Section 5 Part 4' },
  { id: 18, title: 'عزل رطوبي غير مطابق', discipline: 'structural', severity: 'major', qcs_reference: 'QCS 2014 Section 11 Part 2' },
  { id: 19, title: 'اختبار CCTV فاشل', discipline: 'utilities', severity: 'major', qcs_reference: 'QCS 2014 Section 8 Part 6' },
  { id: 20, title: 'تشطيب سطح الخرسانة غير مقبول', discipline: 'finishing', severity: 'minor', qcs_reference: 'QCS 2014 Section 5 Part 3' }
];

// ── Main Handler ──────────────────────────────────────────────────────────
export default async function handler(req) {
  const origin = req.headers.get('origin') || '';
  const cors = corsHeaders(origin);

  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: cors });
  }

  // Rate limiting — PROTOCOL 6
  const ip = getIp(req);
  const authHeader = req.headers.get('authorization') || '';
  const isPro = authHeader.includes('pro');

  const rl = await checkRateLimit(ip, '/api/ncr-log', isPro);
  if (!rl.allowed) {
    return json(
      { error: 'Rate limit exceeded', retry_after: rl.retryAfter },
      429,
      { ...cors, 'Retry-After': String(rl.retryAfter || 60) }
    );
  }

  const url = new URL(req.url);
  const method = req.method;

  // ── Endpoint خاص: جلب قائمة NCR الشائعة (لا يحتاج auth) ──────────────
  if (method === 'GET' && url.searchParams.get('common') === 'true') {
    return json({ common_ncrs: COMMON_NCRS }, 200, cors);
  }

  // Auth check
  const user = await verifyToken(authHeader);
  if (!user) {
    return json({ error: 'Unauthorized — يرجى تسجيل الدخول' }, 401, cors);
  }

  const ncrId = url.searchParams.get('id');
  const projectId = url.searchParams.get('project_id');
  const statusFilter = url.searchParams.get('status');
  const severityFilter = url.searchParams.get('severity');
  const disciplineFilter = url.searchParams.get('discipline');
  const userToken = authHeader.replace('Bearer ', '').trim();

  // ──────────────────────────────────────────────────────────────────────
  // GET — جلب سجل NCR
  // ──────────────────────────────────────────────────────────────────────
  if (method === 'GET') {
    if (!projectId) {
      return json({ error: 'project_id مطلوب' }, 400, cors);
    }

    // ترتيب حسب الخطورة أولاً ثم التاريخ
    let path = `ncr_log?project_id=eq.${projectId}&user_id=eq.${user.id}&order=issued_date.desc`;

    if (statusFilter) {
      path += `&status=eq.${encodeURIComponent(statusFilter)}`;
    }
    if (severityFilter) {
      path += `&severity=eq.${encodeURIComponent(severityFilter)}`;
    }
    if (disciplineFilter) {
      path += `&discipline=eq.${encodeURIComponent(disciplineFilter)}`;
    }

    const r = await sbQuery(path, 'GET', null, userToken);
    if (!r.ok) return json({ error: 'خطأ في جلب البيانات', detail: r.data }, 500, cors);

    const all = Array.isArray(r.data) ? r.data : [];

    // إحصائيات
    const stats = {
      total: all.length,
      open: all.filter(n => n.status === 'open').length,
      in_progress: all.filter(n => n.status === 'in_progress').length,
      closed: all.filter(n => n.status === 'closed').length,
      void: all.filter(n => n.status === 'void').length,
      minor: all.filter(n => n.severity === 'minor').length,
      major: all.filter(n => n.severity === 'major').length,
      critical: all.filter(n => n.severity === 'critical').length,
      avg_closing_days: calcAvgClosingDays(all),
      by_discipline: {
        structural: all.filter(n => n.discipline === 'structural').length,
        roads: all.filter(n => n.discipline === 'roads').length,
        utilities: all.filter(n => n.discipline === 'utilities').length,
        mep: all.filter(n => n.discipline === 'mep').length,
        finishing: all.filter(n => n.discipline === 'finishing').length,
        other: all.filter(n => n.discipline === 'other').length,
      }
    };

    return json({ ncrs: all, stats }, 200, cors);
  }

  // ──────────────────────────────────────────────────────────────────────
  // POST — إنشاء NCR جديد
  // ──────────────────────────────────────────────────────────────────────
  if (method === 'POST') {
    let body;
    try { body = await req.json(); } catch { return json({ error: 'JSON غير صالح' }, 400, cors); }

    // تحقق من الحقول الإلزامية
    if (!body.project_id) return json({ error: 'project_id مطلوب' }, 400, cors);
    if (!body.title?.trim()) return json({ error: 'عنوان NCR مطلوب' }, 400, cors);
    if (!body.description?.trim()) return json({ error: 'وصف NCR مطلوب' }, 400, cors);
    if (!body.issued_date) return json({ error: 'تاريخ الإصدار مطلوب' }, 400, cors);

    // التحقق من القيم المسموحة
    const validSeverities = ['minor', 'major', 'critical'];
    const validDisciplines = ['structural', 'roads', 'utilities', 'mep', 'finishing', 'other'];
    if (body.severity && !validSeverities.includes(body.severity)) {
      return json({ error: 'قيمة severity غير صالحة' }, 400, cors);
    }
    if (body.discipline && !validDisciplines.includes(body.discipline)) {
      return json({ error: 'قيمة discipline غير صالحة' }, 400, cors);
    }

    // ترقيم تلقائي
    let ncrNumber = body.ncr_number?.trim();
    if (!ncrNumber) {
      ncrNumber = await getNextNcrNumber(body.project_id, userToken);
    }

    const row = {
      project_id: body.project_id,
      user_id: user.id,
      ncr_number: ncrNumber,
      title: body.title.trim(),
      description: body.description.trim(),
      location_detail: body.location_detail?.trim() || null,
      discipline: body.discipline || 'other',
      severity: body.severity || 'minor',
      qcs_reference: body.qcs_reference?.trim() || null,
      corrective_action: body.corrective_action?.trim() || null,
      status: 'open', // دائماً يبدأ مفتوحاً
      issued_date: body.issued_date,
      close_date: null,
    };

    const r = await sbQuery('ncr_log', 'POST', row, userToken);
    if (!r.ok) return json({ error: 'فشل إنشاء NCR', detail: r.data }, 500, cors);

    const created = Array.isArray(r.data) ? r.data[0] : r.data;
    return json({ ncr: created, message: `تم إنشاء ${ncrNumber} بنجاح` }, 201, cors);
  }

  // ──────────────────────────────────────────────────────────────────────
  // PUT — تحديث NCR (حالة + تصحيح)
  // ──────────────────────────────────────────────────────────────────────
  if (method === 'PUT') {
    if (!ncrId) return json({ error: 'id مطلوب للتحديث' }, 400, cors);

    let body;
    try { body = await req.json(); } catch { return json({ error: 'JSON غير صالح' }, 400, cors); }

    const updates = {};
    for (const field of ALLOWED_FIELDS) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }

    // إذا تم إغلاق NCR، سجّل تاريخ الإغلاق
    if (updates.status === 'closed' && !updates.close_date) {
      updates.close_date = new Date().toISOString().split('T')[0];
    }
    // إذا أُعيد فتحه، امسح تاريخ الإغلاق
    if (updates.status === 'open' || updates.status === 'in_progress') {
      updates.close_date = null;
    }

    if (Object.keys(updates).length === 0) {
      return json({ error: 'لا توجد حقول صالحة للتحديث' }, 400, cors);
    }

    const path = `ncr_log?id=eq.${ncrId}&user_id=eq.${user.id}`;
    const r = await sbQuery(path, 'PATCH', updates, userToken);
    if (!r.ok) return json({ error: 'فشل التحديث', detail: r.data }, 500, cors);

    const updated = Array.isArray(r.data) ? r.data[0] : r.data;
    return json({ ncr: updated, message: 'تم تحديث NCR بنجاح' }, 200, cors);
  }

  // ──────────────────────────────────────────────────────────────────────
  // DELETE — حذف NCR (void بدلاً من حذف كامل)
  // ──────────────────────────────────────────────────────────────────────
  if (method === 'DELETE') {
    if (!ncrId) return json({ error: 'id مطلوب للحذف' }, 400, cors);

    // Soft delete — تغيير الحالة إلى void بدلاً من الحذف الكامل
    const path = `ncr_log?id=eq.${ncrId}&user_id=eq.${user.id}`;
    const r = await sbQuery(path, 'PATCH', { status: 'void' }, userToken);
    if (!r.ok) return json({ error: 'فشل الحذف', detail: r.data }, 500, cors);

    return json({ message: 'تم إلغاء NCR بنجاح (Void)' }, 200, cors);
  }

  return json({ error: 'Method not allowed' }, 405, cors);
}
