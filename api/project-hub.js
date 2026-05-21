// api/project-hub.js — QatarSpec Pro
// Unified API: projects + daily-reports + inspection-requests
// PROTOCOL 6: Rate limiting — 30/min free, 120/min pro
// يستبدل: api/projects.js + api/daily-reports.js + inspection-requests
// المراحل 2 + 3 + 4 من خطة Project Hub

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

async function sbQuery(path, method = 'GET', body = null, token = null) {
  const url = getSupabaseUrl();
  const key = getSupabaseKey();
  const headers = {
    'apikey': key,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
    'Authorization': `Bearer ${token || key}`
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

// ── Main Handler ──────────────────────────────────────────────────────────
export default async function handler(req) {
  const origin = req.headers.get('origin') || '';
  const cors = corsHeaders(origin);

  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: cors });
  }

  // Rate limit
  const ip = getIp(req);
  const rl = await checkRateLimit(ip, 'project-hub', false);
  if (!rl.allowed) {
    return json({ error: 'Rate limit exceeded', retryAfter: rl.retryAfter }, 429, {
      ...cors, 'Retry-After': String(rl.retryAfter || 60)
    });
  }

  // Auth
  const authHeader = req.headers.get('authorization') || '';
  const user = await verifyToken(authHeader);
  if (!user) {
    return json({ error: 'Unauthorized' }, 401, cors);
  }
  const token = authHeader.replace('Bearer ', '').trim();

  // Route by ?resource=
  const url = new URL(req.url);
  const resource = url.searchParams.get('resource') || 'projects';
  const method = req.method;

  try {
    if (resource === 'projects') {
      return await handleProjects(req, url, method, user, token, cors);
    }
    if (resource === 'daily-reports') {
      return await handleDailyReports(req, url, method, user, token, cors);
    }
    if (resource === 'inspection-requests') {
      return await handleInspectionRequests(req, url, method, user, token, cors);
    }
    return json({ error: 'Unknown resource. Use: projects | daily-reports | inspection-requests' }, 400, cors);
  } catch (err) {
    console.error('[project-hub]', resource, err);
    return json({ error: 'Internal server error', detail: err.message }, 500, cors);
  }
}

// ════════════════════════════════════════════════════════════════════════
// RESOURCE: projects
// ════════════════════════════════════════════════════════════════════════
async function handleProjects(req, url, method, user, token, cors) {
  const id = url.searchParams.get('id');

  if (method === 'GET') {
    if (id) {
      // GET /api/project-hub?resource=projects&id=X
      const r = await sbQuery(
        `projects?id=eq.${id}&user_id=eq.${user.id}&select=*`,
        'GET', null, token
      );
      if (!r.ok) return json({ error: 'Failed to load project' }, r.status, cors);
      return json({ data: r.data }, 200, cors);
    }
    // GET all projects for user
    const status = url.searchParams.get('status');
    let path = `projects?user_id=eq.${user.id}&select=*&order=created_at.desc`;
    if (status) path += `&status=eq.${status}`;
    const r = await sbQuery(path, 'GET', null, token);
    if (!r.ok) return json({ error: 'Failed to load projects' }, r.status, cors);
    return json({ data: r.data }, 200, cors);
  }

  if (method === 'POST') {
    const body = await req.json().catch(() => ({}));
    if (!body.name?.trim()) return json({ error: 'اسم المشروع مطلوب' }, 400, cors);
    const payload = {
      user_id: user.id,
      name: body.name.trim(),
      client: body.client?.trim() || null,
      location: body.location?.trim() || null,
      type: body.type || 'building',
      status: body.status || 'active',
      start_date: body.start_date || null,
      end_date: body.end_date || null,
      contract_value: body.contract_value ? Number(body.contract_value) : null,
      description: body.description?.trim() || null,
      qcs_version: '2024',
    };
    const r = await sbQuery('projects', 'POST', payload, token);
    if (!r.ok) return json({ error: 'Failed to create project', detail: r.data }, r.status, cors);
    return json({ data: Array.isArray(r.data) ? r.data[0] : r.data }, 201, cors);
  }

  if (method === 'PUT') {
    if (!id) return json({ error: 'id مطلوب' }, 400, cors);
    const body = await req.json().catch(() => ({}));
    // التحقق من الملكية
    const own = await sbQuery(`projects?id=eq.${id}&user_id=eq.${user.id}&select=id`, 'GET', null, token);
    if (!own.ok || !own.data?.length) return json({ error: 'Not found or unauthorized' }, 404, cors);
    const allowed = ['name','client','location','type','status','start_date','end_date','contract_value','description'];
    const updates = {};
    allowed.forEach(k => { if (body[k] !== undefined) updates[k] = body[k]; });
    updates.updated_at = new Date().toISOString();
    const r = await sbQuery(`projects?id=eq.${id}&user_id=eq.${user.id}`, 'PATCH', updates, token);
    if (!r.ok) return json({ error: 'Failed to update project' }, r.status, cors);
    return json({ data: Array.isArray(r.data) ? r.data[0] : r.data }, 200, cors);
  }

  if (method === 'DELETE') {
    if (!id) return json({ error: 'id مطلوب' }, 400, cors);
    const own = await sbQuery(`projects?id=eq.${id}&user_id=eq.${user.id}&select=id`, 'GET', null, token);
    if (!own.ok || !own.data?.length) return json({ error: 'Not found or unauthorized' }, 404, cors);
    const r = await sbQuery(`projects?id=eq.${id}&user_id=eq.${user.id}`, 'DELETE', null, token);
    if (!r.ok) return json({ error: 'Failed to delete project' }, r.status, cors);
    return json({ success: true }, 200, cors);
  }

  return json({ error: 'Method not allowed' }, 405, cors);
}

// ════════════════════════════════════════════════════════════════════════
// RESOURCE: daily-reports
// ════════════════════════════════════════════════════════════════════════
async function handleDailyReports(req, url, method, user, token, cors) {
  const id = url.searchParams.get('id');
  const projectId = url.searchParams.get('project_id');

  if (method === 'GET') {
    if (id) {
      const r = await sbQuery(
        `daily_reports?id=eq.${id}&user_id=eq.${user.id}&select=*`,
        'GET', null, token
      );
      if (!r.ok) return json({ error: 'Failed to load report' }, r.status, cors);
      return json({ data: r.data }, 200, cors);
    }
    if (!projectId) return json({ error: 'project_id مطلوب' }, 400, cors);
    const r = await sbQuery(
      `daily_reports?project_id=eq.${projectId}&user_id=eq.${user.id}&select=*&order=report_date.desc`,
      'GET', null, token
    );
    if (!r.ok) return json({ error: 'Failed to load reports' }, r.status, cors);
    return json({ data: r.data }, 200, cors);
  }

  if (method === 'POST') {
    const body = await req.json().catch(() => ({}));
    if (!body.project_id) return json({ error: 'project_id مطلوب' }, 400, cors);
    if (!body.report_date) return json({ error: 'report_date مطلوب' }, 400, cors);
    const payload = {
      user_id: user.id,
      project_id: body.project_id,
      report_date: body.report_date,
      weather: body.weather || 'sunny',
      temperature: body.temperature ? Number(body.temperature) : null,
      manpower: body.manpower ? Number(body.manpower) : null,
      activities: body.activities?.trim() || '',
      materials_used: body.materials_used?.trim() || '',
      equipment: body.equipment?.trim() || '',
      issues: body.issues?.trim() || '',
      visitors: body.visitors?.trim() || '',
      remarks: body.remarks?.trim() || '',
    };
    const r = await sbQuery('daily_reports', 'POST', payload, token);
    if (!r.ok) return json({ error: 'Failed to create report', detail: r.data }, r.status, cors);
    return json({ data: Array.isArray(r.data) ? r.data[0] : r.data }, 201, cors);
  }

  if (method === 'PUT') {
    if (!id) return json({ error: 'id مطلوب' }, 400, cors);
    const body = await req.json().catch(() => ({}));
    const own = await sbQuery(`daily_reports?id=eq.${id}&user_id=eq.${user.id}&select=id`, 'GET', null, token);
    if (!own.ok || !own.data?.length) return json({ error: 'Not found or unauthorized' }, 404, cors);
    const allowed = ['report_date','weather','temperature','manpower','activities','materials_used','equipment','issues','visitors','remarks'];
    const updates = {};
    allowed.forEach(k => { if (body[k] !== undefined) updates[k] = body[k]; });
    updates.updated_at = new Date().toISOString();
    const r = await sbQuery(`daily_reports?id=eq.${id}&user_id=eq.${user.id}`, 'PATCH', updates, token);
    if (!r.ok) return json({ error: 'Failed to update report' }, r.status, cors);
    return json({ data: Array.isArray(r.data) ? r.data[0] : r.data }, 200, cors);
  }

  if (method === 'DELETE') {
    if (!id) return json({ error: 'id مطلوب' }, 400, cors);
    const own = await sbQuery(`daily_reports?id=eq.${id}&user_id=eq.${user.id}&select=id`, 'GET', null, token);
    if (!own.ok || !own.data?.length) return json({ error: 'Not found or unauthorized' }, 404, cors);
    const r = await sbQuery(`daily_reports?id=eq.${id}&user_id=eq.${user.id}`, 'DELETE', null, token);
    if (!r.ok) return json({ error: 'Failed to delete report' }, r.status, cors);
    return json({ success: true }, 200, cors);
  }

  return json({ error: 'Method not allowed' }, 405, cors);
}

// ════════════════════════════════════════════════════════════════════════
// RESOURCE: inspection-requests (IR) — المرحلة 4
// ════════════════════════════════════════════════════════════════════════
async function handleInspectionRequests(req, url, method, user, token, cors) {
  const id = url.searchParams.get('id');
  const projectId = url.searchParams.get('project_id');

  if (method === 'GET') {
    if (id) {
      const r = await sbQuery(
        `inspection_requests?id=eq.${id}&user_id=eq.${user.id}&select=*`,
        'GET', null, token
      );
      if (!r.ok) return json({ error: 'Failed to load IR' }, r.status, cors);
      return json({ data: r.data }, 200, cors);
    }
    if (!projectId) return json({ error: 'project_id مطلوب' }, 400, cors);
    const status = url.searchParams.get('status');
    let path = `inspection_requests?project_id=eq.${projectId}&user_id=eq.${user.id}&select=*&order=requested_date.desc`;
    if (status) path += `&status=eq.${status}`;
    const r = await sbQuery(path, 'GET', null, token);
    if (!r.ok) return json({ error: 'Failed to load IRs' }, r.status, cors);
    return json({ data: r.data }, 200, cors);
  }

  if (method === 'POST') {
    const body = await req.json().catch(() => ({}));
    if (!body.project_id) return json({ error: 'project_id مطلوب' }, 400, cors);
    if (!body.inspection_type?.trim()) return json({ error: 'نوع الفحص مطلوب' }, 400, cors);
    if (!body.requested_date) return json({ error: 'تاريخ الطلب مطلوب' }, 400, cors);
    const payload = {
      user_id: user.id,
      project_id: body.project_id,
      ir_number: body.ir_number?.trim() || null,
      inspection_type: body.inspection_type.trim(),
      location: body.location?.trim() || '',
      element: body.element?.trim() || '',
      requested_date: body.requested_date,
      requested_time: body.requested_time || null,
      status: body.status || 'pending',
      priority: body.priority || 'normal',
      qcs_reference: body.qcs_reference?.trim() || '',
      description: body.description?.trim() || '',
      inspector_name: body.inspector_name?.trim() || '',
      result: body.result || null,
      result_date: body.result_date || null,
      remarks: body.remarks?.trim() || '',
    };
    const r = await sbQuery('inspection_requests', 'POST', payload, token);
    if (!r.ok) return json({ error: 'Failed to create IR', detail: r.data }, r.status, cors);
    return json({ data: Array.isArray(r.data) ? r.data[0] : r.data }, 201, cors);
  }

  if (method === 'PUT') {
    if (!id) return json({ error: 'id مطلوب' }, 400, cors);
    const body = await req.json().catch(() => ({}));
    const own = await sbQuery(`inspection_requests?id=eq.${id}&user_id=eq.${user.id}&select=id`, 'GET', null, token);
    if (!own.ok || !own.data?.length) return json({ error: 'Not found or unauthorized' }, 404, cors);
    const allowed = ['ir_number','inspection_type','location','element','requested_date','requested_time','status','priority','qcs_reference','description','inspector_name','result','result_date','remarks'];
    const updates = {};
    allowed.forEach(k => { if (body[k] !== undefined) updates[k] = body[k]; });
    updates.updated_at = new Date().toISOString();
    const r = await sbQuery(`inspection_requests?id=eq.${id}&user_id=eq.${user.id}`, 'PATCH', updates, token);
    if (!r.ok) return json({ error: 'Failed to update IR' }, r.status, cors);
    return json({ data: Array.isArray(r.data) ? r.data[0] : r.data }, 200, cors);
  }

  if (method === 'DELETE') {
    if (!id) return json({ error: 'id مطلوب' }, 400, cors);
    const own = await sbQuery(`inspection_requests?id=eq.${id}&user_id=eq.${user.id}&select=id`, 'GET', null, token);
    if (!own.ok || !own.data?.length) return json({ error: 'Not found or unauthorized' }, 404, cors);
    const r = await sbQuery(`inspection_requests?id=eq.${id}&user_id=eq.${user.id}`, 'DELETE', null, token);
    if (!r.ok) return json({ error: 'Failed to delete IR' }, r.status, cors);
    return json({ success: true }, 200, cors);
  }

  return json({ error: 'Method not allowed' }, 405, cors);
}

export const config = { runtime: 'edge' };
