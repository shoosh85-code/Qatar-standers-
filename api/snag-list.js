// api/snag-list.js — QatarSpec Pro
// Snag List CRUD — المرحلة 8 من Project Hub
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
  'item_number', 'location_detail', 'description', 'category',
  'priority', 'status', 'assigned_to', 'due_date', 'close_date', 'photo_url'
];

// ── توليد رقم Snag تلقائي ────────────────────────────────────────────────
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
    for (const field of ALLOWED_FIELDS) {
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
