// api/hub-extended.js — QatarSpec Pro
// ═══════════════════════════════════════════════════════════════════
// دمج جراحي لـ 7 ملفات hub:
//   material-submittals.js → ?resource=material-submittals
//   ncr-log.js             → ?resource=ncr-log
//   site-photos.js         → ?resource=site-photos
//   snag-list.js           → ?resource=snag-list
//   checklists.js          → ?resource=checklists
//   execution-ai.js        → ?resource=execution-ai
//   generate-document.js   → ?resource=generate-document
// ═══════════════════════════════════════════════════════════════════

export const config = { runtime: 'edge' };

// ── Imports ─────────────────────────────────────────────────────────
import { checkRateLimit, getIp } from './rate-limit.js';
import { checkRateLimit as libCheckRateLimit, rateLimitResponse } from '../lib/rate-limit.js';
import { getSupabaseUrl as libGetSupabaseUrl, getSupabaseServiceKey } from '../lib/supabase.js';

// ═══════════════════════════════════════════════════════════════════
// ██ SHARED HELPERS (used by material-submittals, ncr-log, site-photos, snag-list, checklists)
// ═══════════════════════════════════════════════════════════════════

const CORS_ORIGIN = process.env.APP_URL || 'https://qatar-standers.vercel.app';

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


// ═══════════════════════════════════════════════════════════════════
// ██ material-submittals — اعتمادات المواد
// ═══════════════════════════════════════════════════════════════════

const MS_ALLOWED_FIELDS = [
  'submittal_number', 'material_name', 'supplier', 'specification',
  'qcs_reference', 'status', 'submit_date', 'response_date', 'comments'
];

async function getNextSubmittalNumber(projectId, userToken) {
  const r = await sbQuery(
    `material_submittals?project_id=eq.${projectId}&select=submittal_number&order=created_at.desc&limit=100`,
    'GET', null, userToken
  );
  if (!r.ok || !Array.isArray(r.data) || r.data.length === 0) return 'MS-001';
  let maxNum = 0;
  for (const row of r.data) {
    const match = (row.submittal_number || '').match(/MS-(\d+)/i);
    if (match) { const n = parseInt(match[1], 10); if (n > maxNum) maxNum = n; }
  }
  return `MS-${String(maxNum + 1).padStart(3, '0')}`;
}

async function materialSubmittalsHandler(req) {
  const origin = req.headers.get('origin') || '';
  const cors = corsHeaders(origin);
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

  const ip = getIp(req);
  const authHeader = req.headers.get('authorization') || '';
  const isPro = authHeader.includes('pro');
  const rl = await checkRateLimit(ip, '/api/material-submittals', isPro);
  if (!rl.allowed) {
    return json({ error: 'Rate limit exceeded', retry_after: rl.retryAfter }, 429, { ...cors, 'Retry-After': String(rl.retryAfter || 60) });
  }

  const user = await verifyToken(authHeader);
  if (!user) return json({ error: 'Unauthorized — يرجى تسجيل الدخول' }, 401, cors);

  const url = new URL(req.url);
  const method = req.method;
  const msId = url.searchParams.get('id');
  const projectId = url.searchParams.get('project_id');
  const statusFilter = url.searchParams.get('status');
  const search = url.searchParams.get('search');
  const userToken = authHeader.replace('Bearer ', '').trim();

  if (method === 'GET') {
    if (!projectId) return json({ error: 'project_id مطلوب' }, 400, cors);
    let path = `material_submittals?project_id=eq.${projectId}&user_id=eq.${user.id}&order=created_at.desc`;
    if (statusFilter) path += `&status=eq.${encodeURIComponent(statusFilter)}`;
    if (search) path += `&or=(material_name.ilike.*${encodeURIComponent(search)}*,supplier.ilike.*${encodeURIComponent(search)}*,submittal_number.ilike.*${encodeURIComponent(search)}*)`;
    const r = await sbQuery(path, 'GET', null, userToken);
    if (!r.ok) return json({ error: 'خطأ في جلب البيانات', detail: r.data }, 500, cors);
    const all = Array.isArray(r.data) ? r.data : [];
    const stats = {
      total: all.length, pending: all.filter(m => m.status === 'pending').length,
      approved: all.filter(m => m.status === 'approved').length,
      approved_with_comments: all.filter(m => m.status === 'approved_with_comments').length,
      rejected: all.filter(m => m.status === 'rejected').length,
      resubmit: all.filter(m => m.status === 'resubmit').length,
    };
    return json({ submittals: all, stats }, 200, cors);
  }

  if (method === 'POST') {
    let body; try { body = await req.json(); } catch { return json({ error: 'JSON غير صالح' }, 400, cors); }
    if (!body.project_id) return json({ error: 'project_id مطلوب' }, 400, cors);
    if (!body.material_name?.trim()) return json({ error: 'اسم المادة مطلوب' }, 400, cors);
    if (!body.submit_date) return json({ error: 'تاريخ التقديم مطلوب' }, 400, cors);
    let submittalNumber = body.submittal_number?.trim();
    if (!submittalNumber) submittalNumber = await getNextSubmittalNumber(body.project_id, userToken);
    const row = {
      project_id: body.project_id, user_id: user.id, submittal_number: submittalNumber,
      material_name: body.material_name.trim(), supplier: body.supplier?.trim() || null,
      specification: body.specification?.trim() || null, qcs_reference: body.qcs_reference?.trim() || null,
      status: body.status || 'pending', submit_date: body.submit_date,
      response_date: body.response_date || null, comments: body.comments?.trim() || null,
    };
    const r = await sbQuery('material_submittals', 'POST', row, userToken);
    if (!r.ok) return json({ error: 'فشل إنشاء الاعتماد', detail: r.data }, 500, cors);
    const created = Array.isArray(r.data) ? r.data[0] : r.data;
    return json({ submittal: created, message: `تم إنشاء ${submittalNumber} بنجاح` }, 201, cors);
  }

  if (method === 'PUT') {
    if (!msId) return json({ error: 'id مطلوب للتحديث' }, 400, cors);
    let body; try { body = await req.json(); } catch { return json({ error: 'JSON غير صالح' }, 400, cors); }
    const updates = {};
    for (const field of MS_ALLOWED_FIELDS) { if (body[field] !== undefined) updates[field] = body[field]; }
    if (Object.keys(updates).length === 0) return json({ error: 'لا توجد حقول صالحة للتحديث' }, 400, cors);
    const path = `material_submittals?id=eq.${msId}&user_id=eq.${user.id}`;
    const r = await sbQuery(path, 'PATCH', updates, userToken);
    if (!r.ok) return json({ error: 'فشل التحديث', detail: r.data }, 500, cors);
    const updated = Array.isArray(r.data) ? r.data[0] : r.data;
    return json({ submittal: updated, message: 'تم التحديث بنجاح' }, 200, cors);
  }

  if (method === 'DELETE') {
    if (!msId) return json({ error: 'id مطلوب للحذف' }, 400, cors);
    const path = `material_submittals?id=eq.${msId}&user_id=eq.${user.id}`;
    const r = await sbQuery(path, 'DELETE', null, userToken);
    if (!r.ok) return json({ error: 'فشل الحذف', detail: r.data }, 500, cors);
    return json({ message: 'تم حذف الاعتماد بنجاح' }, 200, cors);
  }

  return json({ error: 'Method not allowed' }, 405, cors);
}


// ═══════════════════════════════════════════════════════════════════
// ██ ncr-log — سجل عدم المطابقة
// ═══════════════════════════════════════════════════════════════════

const NCR_ALLOWED_FIELDS = [
  'title', 'description', 'location_detail', 'discipline', 'severity',
  'qcs_reference', 'corrective_action', 'status', 'close_date', 'ncr_number'
];

const DISCIPLINE_LABELS = {
  structural: 'إنشائي — Structural', roads: 'طرق — Roads', utilities: 'مرافق — Utilities',
  mep: 'ميكانيكي وكهربائي — MEP', finishing: 'تشطيبات — Finishing', other: 'أخرى — Other'
};

async function getNextNcrNumber(projectId, userToken) {
  const r = await sbQuery(`ncr_log?project_id=eq.${projectId}&select=ncr_number&order=created_at.desc&limit=100`, 'GET', null, userToken);
  if (!r.ok || !Array.isArray(r.data) || r.data.length === 0) return 'NCR-001';
  let maxNum = 0;
  for (const row of r.data) { const match = (row.ncr_number || '').match(/NCR-(\d+)/i); if (match) { const n = parseInt(match[1], 10); if (n > maxNum) maxNum = n; } }
  return `NCR-${String(maxNum + 1).padStart(3, '0')}`;
}

function calcAvgClosingDays(ncrs) {
  const closed = ncrs.filter(n => n.status === 'closed' && n.issued_date && n.close_date);
  if (closed.length === 0) return null;
  const total = closed.reduce((sum, n) => { const diff = (new Date(n.close_date) - new Date(n.issued_date)) / 86400000; return sum + (diff > 0 ? diff : 0); }, 0);
  return Math.round(total / closed.length);
}

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

async function ncrLogHandler(req) {
  const origin = req.headers.get('origin') || '';
  const cors = corsHeaders(origin);
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

  const ip = getIp(req);
  const authHeader = req.headers.get('authorization') || '';
  const isPro = authHeader.includes('pro');
  const rl = await checkRateLimit(ip, '/api/ncr-log', isPro);
  if (!rl.allowed) return json({ error: 'Rate limit exceeded', retry_after: rl.retryAfter }, 429, { ...cors, 'Retry-After': String(rl.retryAfter || 60) });

  const url = new URL(req.url);
  const method = req.method;

  if (method === 'GET' && url.searchParams.get('common') === 'true') {
    return json({ common_ncrs: COMMON_NCRS }, 200, cors);
  }

  const user = await verifyToken(authHeader);
  if (!user) return json({ error: 'Unauthorized — يرجى تسجيل الدخول' }, 401, cors);

  const ncrId = url.searchParams.get('id');
  const projectId = url.searchParams.get('project_id');
  const statusFilter = url.searchParams.get('status');
  const severityFilter = url.searchParams.get('severity');
  const disciplineFilter = url.searchParams.get('discipline');
  const userToken = authHeader.replace('Bearer ', '').trim();

  if (method === 'GET') {
    if (!projectId) return json({ error: 'project_id مطلوب' }, 400, cors);
    let path = `ncr_log?project_id=eq.${projectId}&user_id=eq.${user.id}&order=issued_date.desc`;
    if (statusFilter) path += `&status=eq.${encodeURIComponent(statusFilter)}`;
    if (severityFilter) path += `&severity=eq.${encodeURIComponent(severityFilter)}`;
    if (disciplineFilter) path += `&discipline=eq.${encodeURIComponent(disciplineFilter)}`;
    const r = await sbQuery(path, 'GET', null, userToken);
    if (!r.ok) return json({ error: 'خطأ في جلب البيانات', detail: r.data }, 500, cors);
    const all = Array.isArray(r.data) ? r.data : [];
    const stats = {
      total: all.length, open: all.filter(n => n.status === 'open').length,
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

  if (method === 'POST') {
    let body; try { body = await req.json(); } catch { return json({ error: 'JSON غير صالح' }, 400, cors); }
    if (!body.project_id) return json({ error: 'project_id مطلوب' }, 400, cors);
    if (!body.title?.trim()) return json({ error: 'عنوان NCR مطلوب' }, 400, cors);
    if (!body.description?.trim()) return json({ error: 'وصف NCR مطلوب' }, 400, cors);
    if (!body.issued_date) return json({ error: 'تاريخ الإصدار مطلوب' }, 400, cors);
    const validSeverities = ['minor', 'major', 'critical'];
    const validDisciplines = ['structural', 'roads', 'utilities', 'mep', 'finishing', 'other'];
    if (body.severity && !validSeverities.includes(body.severity)) return json({ error: 'قيمة severity غير صالحة' }, 400, cors);
    if (body.discipline && !validDisciplines.includes(body.discipline)) return json({ error: 'قيمة discipline غير صالحة' }, 400, cors);
    let ncrNumber = body.ncr_number?.trim();
    if (!ncrNumber) ncrNumber = await getNextNcrNumber(body.project_id, userToken);
    const row = {
      project_id: body.project_id, user_id: user.id, ncr_number: ncrNumber,
      title: body.title.trim(), description: body.description.trim(),
      location_detail: body.location_detail?.trim() || null, discipline: body.discipline || 'other',
      severity: body.severity || 'minor', qcs_reference: body.qcs_reference?.trim() || null,
      corrective_action: body.corrective_action?.trim() || null, status: 'open',
      issued_date: body.issued_date, close_date: null,
    };
    const r = await sbQuery('ncr_log', 'POST', row, userToken);
    if (!r.ok) return json({ error: 'فشل إنشاء NCR', detail: r.data }, 500, cors);
    const created = Array.isArray(r.data) ? r.data[0] : r.data;
    return json({ ncr: created, message: `تم إنشاء ${ncrNumber} بنجاح` }, 201, cors);
  }

  if (method === 'PUT') {
    if (!ncrId) return json({ error: 'id مطلوب للتحديث' }, 400, cors);
    let body; try { body = await req.json(); } catch { return json({ error: 'JSON غير صالح' }, 400, cors); }
    const updates = {};
    for (const field of NCR_ALLOWED_FIELDS) { if (body[field] !== undefined) updates[field] = body[field]; }
    if (updates.status === 'closed' && !updates.close_date) updates.close_date = new Date().toISOString().split('T')[0];
    if (updates.status === 'open' || updates.status === 'in_progress') updates.close_date = null;
    if (Object.keys(updates).length === 0) return json({ error: 'لا توجد حقول صالحة للتحديث' }, 400, cors);
    const path = `ncr_log?id=eq.${ncrId}&user_id=eq.${user.id}`;
    const r = await sbQuery(path, 'PATCH', updates, userToken);
    if (!r.ok) return json({ error: 'فشل التحديث', detail: r.data }, 500, cors);
    const updated = Array.isArray(r.data) ? r.data[0] : r.data;
    return json({ ncr: updated, message: 'تم تحديث NCR بنجاح' }, 200, cors);
  }

  if (method === 'DELETE') {
    if (!ncrId) return json({ error: 'id مطلوب للحذف' }, 400, cors);
    const path = `ncr_log?id=eq.${ncrId}&user_id=eq.${user.id}`;
    const r = await sbQuery(path, 'PATCH', { status: 'void' }, userToken);
    if (!r.ok) return json({ error: 'فشل الحذف', detail: r.data }, 500, cors);
    return json({ message: 'تم إلغاء NCR بنجاح (Void)' }, 200, cors);
  }

  return json({ error: 'Method not allowed' }, 405, cors);
}


// ═══════════════════════════════════════════════════════════════════
// ██ site-photos — صور الموقع + Supabase Storage
// ═══════════════════════════════════════════════════════════════════

const STORAGE_BUCKET = 'site-photos';

async function uploadToStorage(fileBuffer, fileName, contentType, userToken) {
  const url = getSupabaseUrl();
  const key = getSupabaseKey();
  const storageToken = process.env.SUPABASE_SERVICE_KEY || key;
  const storageUrl = `${url}/storage/v1/object/${STORAGE_BUCKET}/${fileName}`;
  try {
    const res = await fetch(storageUrl, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${storageToken}`, 'apikey': key, 'Content-Type': contentType, 'x-upsert': 'true' },
      body: fileBuffer
    });
    if (!res.ok) { const err = await res.text(); return { ok: false, error: err }; }
    const data = await res.json();
    const publicUrl = `${url}/storage/v1/object/public/${STORAGE_BUCKET}/${fileName}`;
    return { ok: true, publicUrl, key: data.Key };
  } catch (err) { return { ok: false, error: err.message }; }
}

async function deleteFromStorage(fileName) {
  const url = getSupabaseUrl();
  const key = getSupabaseKey();
  const storageToken = process.env.SUPABASE_SERVICE_KEY || key;
  try {
    const res = await fetch(`${url}/storage/v1/object/${STORAGE_BUCKET}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${storageToken}`, 'apikey': key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ prefixes: [fileName] })
    });
    return { ok: res.ok };
  } catch (err) { return { ok: false, error: err.message }; }
}

async function sitePhotosHandler(req) {
  const origin = req.headers.get('origin') || '';
  const cors = corsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: cors });
  }

  // Rate limiting
  const ip = getIp(req);
  const authHeader = req.headers.get('authorization') || '';
  const rl = await checkRateLimit(ip, authHeader, {
    freeLimit: 10, proLimit: 60, globalLimit: 100, windowSecs: 60
  });
  if (!rl.ok) {
    return json(
      { error: 'Rate limit exceeded', retryAfter: rl.retryAfter },
      429,
      { ...cors, 'Retry-After': String(rl.retryAfter) }
    );
  }

  // Auth
  const user = await verifyToken(authHeader);
  if (!user) {
    return json({ error: 'Unauthorized' }, 401, cors);
  }

  const urlObj = new URL(req.url, 'https://x');
  const params = urlObj.searchParams;
  const method = req.method;

  // ── GET: جلب صور المشروع ──────────────────────────────────────────────
  if (method === 'GET') {
    const projectId = params.get('project_id');
    if (!projectId) return json({ error: 'project_id مطلوب' }, 400, cors);

    const dateFilter = params.get('date');
    const activityFilter = params.get('activity');

    let query = `site_photos?project_id=eq.${encodeURIComponent(projectId)}&user_id=eq.${encodeURIComponent(user.id)}&order=photo_date.desc,created_at.desc&select=*`;
    if (dateFilter) query += `&photo_date=eq.${encodeURIComponent(dateFilter)}`;
    if (activityFilter) query += `&activity=eq.${encodeURIComponent(activityFilter)}`;

    const result = await sbQuery(query, 'GET', null, authHeader.replace('Bearer ', ''));
    if (!result.ok) return json({ error: 'فشل جلب الصور' }, 500, cors);
    return json({ data: result.data || [] }, 200, cors);
  }

  // ── POST: رفع صورة جديدة ─────────────────────────────────────────────
  if (method === 'POST') {
    let body;
    try {
      body = await req.json();
    } catch {
      return json({ error: 'Invalid JSON' }, 400, cors);
    }

    const { project_id, photo_base64, content_type, file_name, caption, activity, photo_date } = body;

    if (!project_id || !photo_base64 || !content_type) {
      return json({ error: 'project_id و photo_base64 و content_type مطلوبة' }, 400, cors);
    }

    // التحقق من نوع الملف
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(content_type.toLowerCase())) {
      return json({ error: 'نوع الملف غير مسموح — jpg/png/webp فقط' }, 400, cors);
    }

    // التحقق من الحجم (base64 → bytes: length * 0.75)
    const estimatedBytes = photo_base64.length * 0.75;
    if (estimatedBytes > 5 * 1024 * 1024) {
      return json({ error: 'حجم الصورة يتجاوز 5MB' }, 400, cors);
    }

    // رفع إلى Storage
    const ext = content_type.includes('png') ? 'png' : content_type.includes('webp') ? 'webp' : 'jpg';
    const timestamp = Date.now();
    const safeFileName = file_name
      ? file_name.replace(/[^a-zA-Z0-9._-]/g, '_').substring(0, 80)
      : `photo_${timestamp}.${ext}`;
    const storagePath = `${user.id}/${project_id}/${timestamp}_${safeFileName}`;

    // تحويل base64 إلى binary
    const binaryStr = atob(photo_base64);
    const bytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }

    const uploadResult = await uploadToStorage(bytes.buffer, storagePath, content_type, authHeader.replace('Bearer ', ''));
    if (!uploadResult.ok) {
      return json({ error: 'فشل رفع الصورة: ' + uploadResult.error }, 500, cors);
    }

    // حفظ metadata في قاعدة البيانات
    const record = {
      project_id,
      user_id: user.id,
      photo_url: uploadResult.publicUrl,
      storage_path: storagePath,
      caption: caption || null,
      activity: activity || null,
      photo_date: photo_date || new Date().toISOString().split('T')[0]
    };

    const saveResult = await sbQuery('site_photos', 'POST', record, authHeader.replace('Bearer ', ''));
    if (!saveResult.ok) {
      // محاولة حذف الصورة المرفوعة عند فشل الحفظ
      await deleteFromStorage(storagePath);
      return json({ error: 'فشل حفظ بيانات الصورة' }, 500, cors);
    }

    return json({ data: saveResult.data?.[0] || saveResult.data, message: 'تم رفع الصورة بنجاح' }, 201, cors);
  }

  // ── DELETE: حذف صورة ─────────────────────────────────────────────────
  if (method === 'DELETE') {
    const photoId = params.get('id');
    if (!photoId) return json({ error: 'id مطلوب' }, 400, cors);

    // جلب بيانات الصورة أولاً للتحقق من الملكية
    const fetchResult = await sbQuery(
      `site_photos?id=eq.${encodeURIComponent(photoId)}&user_id=eq.${encodeURIComponent(user.id)}&select=*`,
      'GET', null, authHeader.replace('Bearer ', '')
    );
    if (!fetchResult.ok || !fetchResult.data?.length) {
      return json({ error: 'الصورة غير موجودة أو ليست ملكك' }, 404, cors);
    }

    const photo = fetchResult.data[0];

    // حذف من قاعدة البيانات
    const delResult = await sbQuery(
      `site_photos?id=eq.${encodeURIComponent(photoId)}&user_id=eq.${encodeURIComponent(user.id)}`,
      'DELETE', null, authHeader.replace('Bearer ', '')
    );
    if (!delResult.ok) return json({ error: 'فشل الحذف من قاعدة البيانات' }, 500, cors);

    // حذف من Storage (لا نوقف العملية إذا فشل)
    if (photo.storage_path) {
      await deleteFromStorage(photo.storage_path);
    }

    return json({ message: 'تم حذف الصورة بنجاح' }, 200, cors);
  }

  return json({ error: 'Method Not Allowed' }, 405, cors);
}


// ═══════════════════════════════════════════════════════════════════
// ██ snag-list — قائمة الملاحظات
// ═══════════════════════════════════════════════════════════════════

const SNAG_ALLOWED_FIELDS = [
  'item_number', 'location_detail', 'description', 'category',
  'priority', 'status', 'assigned_to', 'due_date', 'close_date', 'photo_url'
];

async function getNextSnagNumber(projectId, userToken) {
  const r = await sbQuery(
    `snag_list?project_id=eq.${projectId}&select=item_number&order=created_at.desc&limit=100`,
    'GET', null, userToken
  );
  if (!r.ok || !Array.isArray(r.data) || r.data.length === 0) return 'SN-001';

  let maxNum = 0;
  for (const row of r.data) {
    const match = (row.item_number || '').match(/SN-(\d+)/i);
    if (match) {
      const n = parseInt(match[1], 10);
      if (n > maxNum) maxNum = n;
    }
  }
  return `SN-${String(maxNum + 1).padStart(3, '0')}`;
}

// ── حساب إحصائيات Snag List ──────────────────────────────────────────────
function calcSnagStats(items) {
  const total = items.length;
  const open = items.filter(i => i.status === 'open').length;
  const in_progress = items.filter(i => i.status === 'in_progress').length;
  const closed = items.filter(i => i.status === 'closed').length;
  const critical = items.filter(i => i.priority === 'critical' && i.status !== 'closed').length;
  const high = items.filter(i => i.priority === 'high' && i.status !== 'closed').length;
  const completion_pct = total > 0 ? Math.round((closed / total) * 100) : 0;

  return { total, open, in_progress, closed, critical, high, completion_pct };
}

// ── Main Handler ──────────────────────────────────────────────────────────
async function snagListHandler(req) {
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

  const rl = await checkRateLimit(ip, '/api/snag-list', isPro);
  if (!rl.allowed) {
    return json(
      { error: 'Rate limit exceeded', retry_after: rl.retryAfter },
      429,
      { ...cors, 'Retry-After': String(rl.retryAfter || 60) }
    );
  }

  const url = new URL(req.url);
  const method = req.method;

  // Auth check
  const user = await verifyToken(authHeader);
  if (!user) {
    return json({ error: 'Unauthorized — يرجى تسجيل الدخول' }, 401, cors);
  }

  const snagId = url.searchParams.get('id');
  const projectId = url.searchParams.get('project_id');
  const statusFilter = url.searchParams.get('status');
  const priorityFilter = url.searchParams.get('priority');
  const categoryFilter = url.searchParams.get('category');
  const userToken = authHeader.replace('Bearer ', '').trim();

  // ──────────────────────────────────────────────────────────────────────
  // GET — جلب Snag List
  // ──────────────────────────────────────────────────────────────────────
  if (method === 'GET') {
    if (!projectId) {
      return json({ error: 'project_id مطلوب' }, 400, cors);
    }

    let path = `snag_list?project_id=eq.${projectId}&user_id=eq.${user.id}&order=created_at.desc`;

    if (statusFilter)   path += `&status=eq.${encodeURIComponent(statusFilter)}`;
    if (priorityFilter) path += `&priority=eq.${encodeURIComponent(priorityFilter)}`;
    if (categoryFilter) path += `&category=eq.${encodeURIComponent(categoryFilter)}`;

    const r = await sbQuery(path, 'GET', null, userToken);
    if (!r.ok) {
      return json({ error: 'فشل جلب Snag List', details: r.data }, r.status, cors);
    }

    const items = Array.isArray(r.data) ? r.data : [];
    const stats = calcSnagStats(items);

    return json({ snags: items, stats }, 200, cors);
  }

  // ──────────────────────────────────────────────────────────────────────
  // POST — إنشاء Snag جديد
  // ──────────────────────────────────────────────────────────────────────
  if (method === 'POST') {
    let body;
    try { body = await req.json(); } catch {
      return json({ error: 'JSON غير صالح' }, 400, cors);
    }

    if (!body.project_id) return json({ error: 'project_id مطلوب' }, 400, cors);
    if (!body.location_detail?.trim()) return json({ error: 'الموقع مطلوب' }, 400, cors);
    if (!body.description?.trim()) return json({ error: 'الوصف مطلوب' }, 400, cors);

    const VALID_CATEGORIES = ['structural','architectural','mep','roads','utilities','landscaping','other'];
    const VALID_PRIORITIES = ['low','medium','high','critical'];

    const item_number = body.item_number?.trim() || await getNextSnagNumber(body.project_id, userToken);

    const record = {
      project_id:      body.project_id,
      user_id:         user.id,
      item_number,
      location_detail: body.location_detail.trim(),
      description:     body.description.trim(),
      category:        VALID_CATEGORIES.includes(body.category) ? body.category : 'other',
      priority:        VALID_PRIORITIES.includes(body.priority) ? body.priority : 'medium',
      status:          'open',
      assigned_to:     body.assigned_to?.trim() || null,
      due_date:        body.due_date || null,
      photo_url:       body.photo_url?.trim() || null,
    };

    const r = await sbQuery('snag_list', 'POST', record, userToken);
    if (!r.ok) {
      return json({ error: 'فشل إنشاء Snag', details: r.data }, r.status, cors);
    }

    const created = Array.isArray(r.data) ? r.data[0] : r.data;
    return json({ snag: created, message: `تم إنشاء ${item_number}` }, 201, cors);
  }

  // ──────────────────────────────────────────────────────────────────────
  // PUT — تحديث Snag
  // ──────────────────────────────────────────────────────────────────────
  if (method === 'PUT') {
    if (!snagId) return json({ error: 'id مطلوب للتحديث' }, 400, cors);

    let body;
    try { body = await req.json(); } catch {
      return json({ error: 'JSON غير صالح' }, 400, cors);
    }

    // تحقق من الملكية
    const check = await sbQuery(
      `snag_list?id=eq.${snagId}&user_id=eq.${user.id}&select=id,status`,
      'GET', null, userToken
    );
    if (!check.ok || !Array.isArray(check.data) || check.data.length === 0) {
      return json({ error: 'Snag غير موجود أو لا تملك الصلاحية' }, 404, cors);
    }

    const updates = {};
    for (const field of SNAG_ALLOWED_FIELDS) {
      if (body[field] !== undefined) updates[field] = body[field];
    }

    // إذا تم الإغلاق، أضف تاريخ الإغلاق
    if (updates.status === 'closed' && !updates.close_date) {
      updates.close_date = new Date().toISOString().split('T')[0];
    }
    // إذا أُعيد فتح، احذف تاريخ الإغلاق
    if (updates.status === 'open' || updates.status === 'in_progress') {
      updates.close_date = null;
    }

    if (Object.keys(updates).length === 0) {
      return json({ error: 'لا توجد حقول للتحديث' }, 400, cors);
    }

    const r = await sbQuery(
      `snag_list?id=eq.${snagId}&user_id=eq.${user.id}`,
      'PATCH', updates, userToken
    );
    if (!r.ok) {
      return json({ error: 'فشل التحديث', details: r.data }, r.status, cors);
    }

    const updated = Array.isArray(r.data) ? r.data[0] : r.data;
    return json({ snag: updated, message: 'تم تحديث Snag بنجاح' }, 200, cors);
  }

  // ──────────────────────────────────────────────────────────────────────
  // DELETE — حذف Snag
  // ──────────────────────────────────────────────────────────────────────
  if (method === 'DELETE') {
    if (!snagId) return json({ error: 'id مطلوب للحذف' }, 400, cors);

    const check = await sbQuery(
      `snag_list?id=eq.${snagId}&user_id=eq.${user.id}&select=id,item_number`,
      'GET', null, userToken
    );
    if (!check.ok || !Array.isArray(check.data) || check.data.length === 0) {
      return json({ error: 'Snag غير موجود' }, 404, cors);
    }

    const itemNum = check.data[0].item_number;
    const r = await sbQuery(
      `snag_list?id=eq.${snagId}&user_id=eq.${user.id}`,
      'DELETE', null, userToken
    );
    if (!r.ok) {
      return json({ error: 'فشل الحذف', details: r.data }, r.status, cors);
    }

    return json({ message: `تم حذف ${itemNum}` }, 200, cors);
  }

  return json({ error: `Method ${method} غير مدعوم` }, 405, cors);
}


// ═══════════════════════════════════════════════════════════════════
// ██ checklists — قوائم التحقق QCS 2024
// ═══════════════════════════════════════════════════════════════════

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
async function checklistsHandler(req) {
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


// ═══════════════════════════════════════════════════════════════════
// ██ execution-ai — AI Assistant للتنفيذ الميداني
// ═══════════════════════════════════════════════════════════════════

// api/execution-ai.js — QatarSpec Pro
// AI Assistant للتنفيذ الميداني — Gemini API
// كل وحدة (Pour/MAR/NCR/Tests/DWR) تستشير هذا الـ endpoint
// لا تحذف محتوى — فقط إضافة



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

// ملفات QCS حسب الوحدة — محدّث بناءً على ListFiles 2026-05-13
// أسماء الملفات sequential upload numbers وليس QCS Part numbers
const MODULE_FILES = {
  pour:    'Part15',  // ✅ Concrete Section — يعمل (35°C confirmed)
  mar:     'Part10',  // Section 02: QA/QC — cement/material approval
  ncr:     'Part18',  // Section 05: Concrete Miscellaneous — crack/defect/repair
  tests:   'Part15',  // Concrete testing — نفس قسم pour
  dwr:     'Part1',   // unchanged
  mos:     null,      // general search — Method Statements
  general: null,
};

async function embedText(text, apiKey) {
  // text-embedding-004: free tier 1,500 RPM — كافي للإنتاج
  try {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${apiKey}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'models/text-embedding-004', content: { parts: [{ text: text.slice(0, 1000) }] } }),
        signal: AbortSignal.timeout(5000) }
    );
    if (!r.ok) return null;
    const d = await r.json();
    return d?.embedding?.values || null;
  } catch { return null; }
}

async function fetchQCSContext(keywords, limit, module) {
  const url = getSupabaseUrl();
  const key = getSupabaseServiceKey();
  if (!url || !key) return '';
  try {
    const lim = limit || 4;
    const headers = { 'apikey': key, 'Authorization': `Bearer ${key}` };
    const fileFilter = MODULE_FILES[module] ? MODULE_FILES[module] : null;
    const allChunks = [];
    const seen = new Set();

    // ── استراتيجية 0: Vector Search (أدق — semantic similarity) ──────────
    const apiKey = process.env.GEMINI_API_KEY;
    const queryEmbedding = apiKey ? await embedText(keywords, apiKey) : null;
    if (queryEmbedding) {
      const body = JSON.stringify({
        query_embedding: queryEmbedding,
        match_threshold:  0.45,
        match_count:      lim,
        filter_file:      fileFilter
      });
      const r = await fetch(`${url}/rest/v1/rpc/match_qcs_chunks`,
        { method: 'POST', headers: { ...headers, 'Content-Type': 'application/json' }, body }
      );
      if (r.ok) {
        const data = await r.json();
        for (const c of (Array.isArray(data) ? data : [])) {
          if (!seen.has(c.id)) { seen.add(c.id); allChunks.push(c); }
        }
        console.log(`[rag] vector search: ${allChunks.length} chunks (threshold 0.45)`);
      }
    }

    // ── استراتيجية 1: DIRECT_TERMS (للـ chunks المعروفة) ─────────────────
    const DIRECT_TERMS = {
      pour:  ['35', 'placing temperature', 'fresh concrete temperature'],
      ncr:   ['crack', 'cracks repair', 'non conformance', 'defect rejection'],
      tests: ['compressive strength', 'cube test', 'works cube'],
      mar:   ['cement', 'material approval', 'submittal requirement'],
    };
    const fileQ = fileFilter ? `&source_file=ilike.*${fileFilter}*` : '';
    if (DIRECT_TERMS[module] && allChunks.length < lim) {
      for (const term of DIRECT_TERMS[module]) {
        if (allChunks.length >= lim) break;
        const r = await fetch(
          `${url}/rest/v1/qcs_chunks?content=ilike.*${encodeURIComponent(term)}*${fileQ}&select=id,content,source_file,section_name,page_num&limit=2&order=page_num.asc`,
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

    // ── استراتيجية 2: FTS fallback ────────────────────────────────────────
    const words = keywords.split(' ').filter(w => w.length > 3);
    if (words.length > 0 && allChunks.length < lim) {
      const ftsQuery = words.slice(0, 4).join(' ');
      const r = await fetch(
        `${url}/rest/v1/qcs_chunks?fts=phfts.${encodeURIComponent(ftsQuery)}${fileQ}&select=id,content,source_file,section_name,page_num&limit=${lim}&order=page_num.asc`,
        { headers }
      );
      if (r.ok) {
        const data = await r.json();
        for (const c of (Array.isArray(data) ? data : [])) {
          if (!seen.has(c.id)) { seen.add(c.id); allChunks.push(c); }
        }
      }
    }

    // ── استراتيجية 3: ILIKE per-word (آخر fallback) ──────────────────────
    for (const word of words) {
      if (allChunks.length >= lim) break;
      const r = await fetch(
        `${url}/rest/v1/qcs_chunks?content=ilike.*${encodeURIComponent(word)}*${fileQ}&select=id,content,source_file,section_name,page_num&limit=2&order=page_num.asc`,
        { headers }
      );
      if (!r.ok) continue;
      const data = await r.json();
      for (const c of (Array.isArray(data) ? data : [])) {
        if (!seen.has(c.id)) { seen.add(c.id); allChunks.push(c); }
      }
    }

    if (!allChunks.length) return '';
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

async function executionAiHandler(req) {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  // ── Rate Limit (PROTOCOL 6 — Upstash Redis shared) ──────────────────────
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '0.0.0.0';
  const rl = await libCheckRateLimit(ip, '/api/ai-proxy', false); // execution-ai = AI endpoint limits
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
  // ✅ نماذج مؤكدة تعمل — مرتبة بالأفضل أولاً (اختُبرت 2026-05-13)
  const MODELS = [
    { name: 'gemini-2.5-flash-lite',   api: 'v1beta' },
    { name: 'gemini-flash-lite-latest', api: 'v1beta' },
    { name: 'gemini-flash-latest',      api: 'v1beta' },
    { name: 'gemini-2.0-flash-lite',    api: 'v1beta' },
    { name: 'gemini-2.5-flash',         api: 'v1beta' },
    { name: 'gemini-2.0-flash',         api: 'v1beta' },
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


// ═══════════════════════════════════════════════════════════════════
// ██ generate-document — توليد المستندات الهندسية
// ═══════════════════════════════════════════════════════════════════

// api/generate-document.js — QatarSpec Pro
// توليد المستندات الهندسية — Method Statement / ITP / NCR / DPR
// مستوحى من DDC_Skills_for_AI_Agents_in_Construction
// Gemini API فقط — لا Anthropic
// لا تحذف محتوى — فقط إضافة



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
async function generateDocumentHandler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: {
      'Access-Control-Allow-Origin': CORS_ORIGIN,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }});
  }
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  // Rate limiting
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const authHeader = req.headers.get('authorization') || '';
  const isPro = authHeader.startsWith('Bearer qs_pro_') || authHeader.startsWith('Bearer pro_');
  const rl = await libCheckRateLimit(ip, '/api/generate-document', isPro); // FIX: ip أولاً
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

  const CORS = { 'Access-Control-Allow-Origin': CORS_ORIGIN, 'Content-Type': 'application/json' };

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


// ═══════════════════════════════════════════════════════════════════
// ██ ROUTER — نقطة الدخول الوحيدة
// ═══════════════════════════════════════════════════════════════════

export default async function handler(req) {
  const url = new URL(req.url, 'https://x');
  const resource = url.searchParams.get('resource');

  if (resource === 'material-submittals') return materialSubmittalsHandler(req);
  if (resource === 'ncr-log')             return ncrLogHandler(req);
  if (resource === 'site-photos')         return sitePhotosHandler(req);
  if (resource === 'snag-list')           return snagListHandler(req);
  if (resource === 'checklists')          return checklistsHandler(req);
  if (resource === 'execution-ai')        return executionAiHandler(req);
  if (resource === 'generate-document')   return generateDocumentHandler(req);
  if (resource === 'embed-cron')          return embedCronHandler(req);
  if (resource === 'send-report')         return sendReportHandler(req);

  return new Response(JSON.stringify({
    error: 'resource مطلوب',
    valid_resources: ['material-submittals', 'ncr-log', 'site-photos', 'snag-list', 'checklists', 'execution-ai', 'generate-document', 'embed-cron', 'send-report']
  }), { status: 400, headers: { 'Content-Type': 'application/json' } });
}

// ══════════════════════════════════════════════════════════════════════
// ██ EMBED CRON — توليد embeddings تلقائي (100 chunk/run)
// Vercel Cron يستدعيه كل 6 ساعات — يكمل الـ 1,986 chunk المتبقية
// ══════════════════════════════════════════════════════════════════════
async function embedCronHandler(req) {
  const origin = req.headers?.get?.('origin') || '';
  const cors   = corsHeaders(origin);

  // السماح فقط لـ Vercel Cron أو Admin Secret
  const cronSig    = req.headers?.get?.('x-vercel-cron-signature') || '';
  const adminSec   = req.headers?.get?.('x-admin-secret') || '';
  const cronSecret = process.env.CRON_SECRET || '';
  const adminSecret = process.env.ADMIN_SECRET || '';

  const isVercelCron = cronSig && cronSecret && cronSig === cronSecret;
  const isAdmin      = adminSec && adminSecret && adminSec === adminSecret;

  if (!isVercelCron && !isAdmin) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: cors });
  }

  const GEMINI_KEY = process.env.GEMINI_API_KEY;
  const SUPA_URL   = getSupabaseUrl();
  const SUPA_KEY   = getSupabaseServiceKey();

  if (!GEMINI_KEY || !SUPA_URL || !SUPA_KEY) {
    return new Response(JSON.stringify({ error: 'Missing env vars: GEMINI_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY' }), { status: 503, headers: cors });
  }

  // جلب chunks بدون embeddings (100 في كل مرة ضمن free tier)
  const batchSize = 50; // 50 × 1.5s delay = ~75s — ضمن Vercel 60s limit على free
  const chunksRes = await fetch(
    `${SUPA_URL}/rest/v1/qcs_chunks?embedding=is.null&select=id,content&limit=${batchSize}&order=id.asc`,
    { headers: { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}` } }
  );

  if (!chunksRes.ok) {
    const err = await chunksRes.text();
    return new Response(JSON.stringify({ error: 'Supabase fetch failed', detail: err.slice(0,200) }), { status: 500, headers: cors });
  }

  const chunks = await chunksRes.json();
  if (!chunks.length) {
    return new Response(JSON.stringify({ message: '✅ كل الـ chunks عندها embeddings!', processed: 0, remaining: 0 }), { headers: cors });
  }

  let processed = 0, failed = 0, firstError = null;

  for (const chunk of chunks) {
    try {
      await new Promise(r => setTimeout(r, 1200)); // 1.2s delay — يتجنب 429

      const embedRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${GEMINI_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'models/gemini-embedding-001',
            content: { parts: [{ text: chunk.content.slice(0, 2000) }] }
          }),
          signal: AbortSignal.timeout(12000)
        }
      );

      if (embedRes.status === 429) {
        if (!firstError) firstError = 'Gemini rate limited (429)';
        failed++; continue;
      }
      if (!embedRes.ok) {
        if (!firstError) firstError = `Gemini ${embedRes.status}`;
        failed++; continue;
      }

      const embedData  = await embedRes.json();
      const embedding  = embedData?.embedding?.values;
      if (!embedding?.length) { failed++; continue; }

      const updateRes = await fetch(
        `${SUPA_URL}/rest/v1/qcs_chunks?id=eq.${chunk.id}`,
        {
          method: 'PATCH',
          headers: {
            apikey: SUPA_KEY,
            Authorization: `Bearer ${SUPA_KEY}`,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal'
          },
          body: JSON.stringify({ embedding: `[${embedding.join(',')}]` })
        }
      );

      if (updateRes.ok) processed++;
      else failed++;

    } catch (e) {
      failed++;
      if (!firstError) firstError = e.message;
    }
  }

  // حساب المتبقي
  const remainingRes = await fetch(
    `${SUPA_URL}/rest/v1/qcs_chunks?embedding=is.null&select=id&limit=1`,
    { headers: { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}`, Prefer: 'count=exact' } }
  );
  const remaining = parseInt(remainingRes.headers.get('content-range')?.split('/')?.[1] || '?');

  return new Response(JSON.stringify({
    processed,
    failed,
    remaining: isNaN(remaining) ? 'unknown' : remaining,
    firstError: firstError || null,
    message: processed > 0
      ? `✅ أُضيف ${processed} embedding${failed ? ` (${failed} فشل)` : ''} — متبقي ~${remaining}`
      : `⚠️ لم يُضَف شيء — ${firstError || 'unknown error'}`
  }), { headers: { ...cors, 'Content-Type': 'application/json' } });
}

// ══════════════════════════════════════════════════════════════════════
// ██ SEND REPORT — إرسال التقارير بالإيميل عبر Resend
// POST ?resource=send-report { type, reportData, recipientEmail, projectName }
// type: 'dwr' | 'ir' | 'ncr' | 'submittal'
// ══════════════════════════════════════════════════════════════════════
async function sendReportHandler(req) {
  const origin = req.headers?.get?.('origin') || '';
  const cors   = corsHeaders(origin);

  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  if (req.method !== 'POST') return new Response(JSON.stringify({ error: 'POST فقط' }), { status: 405, headers: cors });

  const RESEND_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_KEY) {
    return new Response(JSON.stringify({ error: 'RESEND_API_KEY غير مُعيَّن في Vercel' }), { status: 503, headers: cors });
  }

  let body;
  try { body = await req.json(); } catch { return new Response(JSON.stringify({ error: 'JSON غير صحيح' }), { status: 400, headers: cors }); }

  const { type = 'dwr', reportData = {}, recipientEmail, projectName = 'مشروع QatarSpec' } = body;

  if (!recipientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
    return new Response(JSON.stringify({ error: 'البريد الإلكتروني غير صحيح' }), { status: 400, headers: cors });
  }

  // بناء HTML الإيميل
  const typeLabels = { dwr: 'تقرير العمل اليومي DWR', ir: 'طلب الفحص IR', ncr: 'تقرير عدم المطابقة NCR', submittal: 'تقديم مواد Material Submittal' };
  const typeLabel  = typeLabels[type] || type.toUpperCase();
  const today      = new Date().toLocaleDateString('ar-QA', { year:'numeric', month:'long', day:'numeric' });

  const fieldsHtml = Object.entries(reportData)
    .filter(([k]) => !['id','project_id','created_at','updated_at'].includes(k))
    .map(([k, v]) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;color:#666;font-size:13px;width:140px">${k}</td><td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;font-size:13px">${String(v || '—').slice(0,300)}</td></tr>`)
    .join('');

  const htmlBody = `
<!DOCTYPE html><html dir="rtl" lang="ar">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:24px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
  <tr><td style="background:linear-gradient(135deg,#7A1515,#C9952A);padding:24px 32px">
    <div style="color:#F5C842;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px">QatarSpec Pro</div>
    <div style="color:#fff;font-size:20px;font-weight:700">${typeLabel}</div>
    <div style="color:rgba(255,255,255,0.7);font-size:13px;margin-top:4px">${projectName} — ${today}</div>
  </td></tr>
  <tr><td style="padding:24px 32px">
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-radius:8px;overflow:hidden">
      ${fieldsHtml || '<tr><td style="padding:16px;color:#999;font-size:13px">لا توجد بيانات</td></tr>'}
    </table>
  </td></tr>
  <tr><td style="padding:16px 32px 24px;border-top:1px solid #f0f0f0">
    <div style="font-size:11px;color:#999;line-height:1.6">
      ⚠️ هذا التقرير للاستخدام المرجعي فقط — Not for Design Purposes<br>
      أُرسل من <a href="https://qatar-standers.vercel.app" style="color:#C9952A">QatarSpec Pro</a> · QCS 2024 · Ashghal · KAHRAMAA
    </div>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;

  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'QatarSpec Pro <reports@qatarspec.com>',
      to: [recipientEmail],
      subject: `${typeLabel} — ${projectName}`,
      html: htmlBody
    })
  });

  const emailData = await emailRes.json();

  if (!emailRes.ok) {
    return new Response(JSON.stringify({ error: 'Resend فشل', detail: emailData }), { status: emailRes.status, headers: cors });
  }

  return new Response(JSON.stringify({
    success: true,
    message: `✅ أُرسل ${typeLabel} إلى ${recipientEmail}`,
    emailId: emailData.id
  }), { headers: { ...cors, 'Content-Type': 'application/json' } });
}
