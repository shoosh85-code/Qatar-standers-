// api/material-submittals.js — QatarSpec Pro
// Material Submittals CRUD — المرحلة 5 من Project Hub
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
  'submittal_number', 'material_name', 'supplier', 'specification',
  'qcs_reference', 'status', 'submit_date', 'response_date', 'comments'
];

// ── توليد رقم اعتماد تلقائي ─────────────────────────────────────────────
async function getNextSubmittalNumber(projectId, userToken) {
  const r = await sbQuery(
    `material_submittals?project_id=eq.${projectId}&select=submittal_number&order=created_at.desc&limit=100`,
    'GET', null, userToken
  );
  if (!r.ok || !Array.isArray(r.data) || r.data.length === 0) return 'MS-001';

  let maxNum = 0;
  for (const row of r.data) {
    const match = (row.submittal_number || '').match(/MS-(\d+)/i);
    if (match) {
      const n = parseInt(match[1], 10);
      if (n > maxNum) maxNum = n;
    }
  }
  return `MS-${String(maxNum + 1).padStart(3, '0')}`;
}

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
  const isPro = authHeader.includes('pro'); // سيُحسَّن بعد ربط verify-pro

  const rl = await checkRateLimit(ip, '/api/material-submittals', isPro);
  if (!rl.allowed) {
    return json(
      { error: 'Rate limit exceeded', retry_after: rl.retryAfter },
      429,
      { ...cors, 'Retry-After': String(rl.retryAfter || 60) }
    );
  }

  // Auth check
  const user = await verifyToken(authHeader);
  if (!user) {
    return json({ error: 'Unauthorized — يرجى تسجيل الدخول' }, 401, cors);
  }

  const url = new URL(req.url);
  const method = req.method;
  const msId = url.searchParams.get('id');
  const projectId = url.searchParams.get('project_id');
  const statusFilter = url.searchParams.get('status');
  const search = url.searchParams.get('search');
  const userToken = authHeader.replace('Bearer ', '').trim();

  // ──────────────────────────────────────────────────────────────────────
  // GET — جلب اعتمادات المواد
  // ──────────────────────────────────────────────────────────────────────
  if (method === 'GET') {
    if (!projectId) {
      return json({ error: 'project_id مطلوب' }, 400, cors);
    }

    let path = `material_submittals?project_id=eq.${projectId}&user_id=eq.${user.id}&order=created_at.desc`;

    if (statusFilter) {
      path += `&status=eq.${encodeURIComponent(statusFilter)}`;
    }
    if (search) {
      path += `&or=(material_name.ilike.*${encodeURIComponent(search)}*,supplier.ilike.*${encodeURIComponent(search)}*,submittal_number.ilike.*${encodeURIComponent(search)}*)`;
    }

    const r = await sbQuery(path, 'GET', null, userToken);
    if (!r.ok) return json({ error: 'خطأ في جلب البيانات', detail: r.data }, 500, cors);

    // حساب إحصائيات سريعة
    const all = Array.isArray(r.data) ? r.data : [];
    const stats = {
      total: all.length,
      pending: all.filter(m => m.status === 'pending').length,
      approved: all.filter(m => m.status === 'approved').length,
      approved_with_comments: all.filter(m => m.status === 'approved_with_comments').length,
      rejected: all.filter(m => m.status === 'rejected').length,
      resubmit: all.filter(m => m.status === 'resubmit').length,
    };

    return json({ submittals: all, stats }, 200, cors);
  }

  // ──────────────────────────────────────────────────────────────────────
  // POST — إنشاء اعتماد مادة جديد
  // ──────────────────────────────────────────────────────────────────────
  if (method === 'POST') {
    let body;
    try { body = await req.json(); } catch { return json({ error: 'JSON غير صالح' }, 400, cors); }

    if (!body.project_id) return json({ error: 'project_id مطلوب' }, 400, cors);
    if (!body.material_name?.trim()) return json({ error: 'اسم المادة مطلوب' }, 400, cors);
    if (!body.submit_date) return json({ error: 'تاريخ التقديم مطلوب' }, 400, cors);

    // ترقيم تلقائي إذا لم يُدخَل
    let submittalNumber = body.submittal_number?.trim();
    if (!submittalNumber) {
      submittalNumber = await getNextSubmittalNumber(body.project_id, userToken);
    }

    const row = {
      project_id: body.project_id,
      user_id: user.id,
      submittal_number: submittalNumber,
      material_name: body.material_name.trim(),
      supplier: body.supplier?.trim() || null,
      specification: body.specification?.trim() || null,
      qcs_reference: body.qcs_reference?.trim() || null,
      status: body.status || 'pending',
      submit_date: body.submit_date,
      response_date: body.response_date || null,
      comments: body.comments?.trim() || null,
    };

    const r = await sbQuery('material_submittals', 'POST', row, userToken);
    if (!r.ok) return json({ error: 'فشل إنشاء الاعتماد', detail: r.data }, 500, cors);

    const created = Array.isArray(r.data) ? r.data[0] : r.data;
    return json({ submittal: created, message: `تم إنشاء ${submittalNumber} بنجاح` }, 201, cors);
  }

  // ──────────────────────────────────────────────────────────────────────
  // PUT — تحديث اعتماد مادة
  // ──────────────────────────────────────────────────────────────────────
  if (method === 'PUT') {
    if (!msId) return json({ error: 'id مطلوب للتحديث' }, 400, cors);

    let body;
    try { body = await req.json(); } catch { return json({ error: 'JSON غير صالح' }, 400, cors); }

    // فلترة الحقول المسموح بها فقط
    const updates = {};
    for (const field of ALLOWED_FIELDS) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return json({ error: 'لا توجد حقول صالحة للتحديث' }, 400, cors);
    }

    const path = `material_submittals?id=eq.${msId}&user_id=eq.${user.id}`;
    const r = await sbQuery(path, 'PATCH', updates, userToken);
    if (!r.ok) return json({ error: 'فشل التحديث', detail: r.data }, 500, cors);

    const updated = Array.isArray(r.data) ? r.data[0] : r.data;
    return json({ submittal: updated, message: 'تم التحديث بنجاح' }, 200, cors);
  }

  // ──────────────────────────────────────────────────────────────────────
  // DELETE — حذف اعتماد مادة
  // ──────────────────────────────────────────────────────────────────────
  if (method === 'DELETE') {
    if (!msId) return json({ error: 'id مطلوب للحذف' }, 400, cors);

    const path = `material_submittals?id=eq.${msId}&user_id=eq.${user.id}`;
    const r = await sbQuery(path, 'DELETE', null, userToken);
    if (!r.ok) return json({ error: 'فشل الحذف', detail: r.data }, 500, cors);

    return json({ message: 'تم حذف الاعتماد بنجاح' }, 200, cors);
  }

  return json({ error: 'Method not allowed' }, 405, cors);
}
