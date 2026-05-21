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
    if (resource === 'boq') {
      return await handleBOQ(req, url, method, user, token, cors);
    }
    if (resource === 'payment-certificates') {
      return await handlePaymentCertificates(req, url, method, user, token, cors);
    }
    if (resource === 'stats') {
      return await handleStats(req, url, method, user, token, cors);
    }
    return json({ error: 'Unknown resource. Use: projects|daily-reports|inspection-requests|boq|payment-certificates|stats' }, 400, cors);
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

    // ── PRO GATE: Free = 2 projects max ──────────────────────────────────
    const isPro = user.user_metadata?.pro === true || user.app_metadata?.pro === true;
    if (!isPro) {
      const countR = await sbQuery(
        `projects?user_id=eq.${user.id}&status=neq.cancelled&select=id`,
        'GET', null, token
      );
      const count = Array.isArray(countR.data) ? countR.data.length : 0;
      if (count >= 2) {
        return json({
          error: 'PRO_GATE',
          message: 'وصلت للحد الأقصى للحساب المجاني (2 مشاريع). رقّي لـ Pro للحصول على 10 مشاريع وميزات متقدمة.',
          upgrade_url: 'https://qatar-standers.vercel.app/#pricing',
          current_count: count,
          free_limit: 2
        }, 403, cors);
      }
    }
    // ─────────────────────────────────────────────────────────────────────

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
      notes: body.notes?.trim() || null,   // fix: كان description (خطأ) — الجدول يحتوي notes
    };
    const r = await sbQuery('projects', 'POST', payload, token);
    if (!r.ok) {
      // تفاصيل الخطأ للـ debugging
      const detail = r.data?.message || r.data?.hint || r.data?.details || JSON.stringify(r.data);
      const isTableMissing = detail?.includes('relation') || detail?.includes('does not exist');
      const errMsg = isTableMissing
        ? 'جدول المشاريع غير موجود في قاعدة البيانات. يرجى تشغيل الإعداد من /admin-project-hub-setup.html'
        : `فشل إنشاء المشروع: ${detail}`;
      return json({ error: errMsg, detail: r.data, code: isTableMissing ? 'TABLE_MISSING' : 'DB_ERROR' }, r.status, cors);
    }
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



async function handleBOQ(req, url, method, user, token, cors) {
  const id = url.searchParams.get('id');
  const projectId = url.searchParams.get('project_id');
  if (method === 'GET') {
    if (!projectId) return json({ error: 'project_id required' }, 400, cors);
    const r = await sbQuery(`boq_items?project_id=eq.${projectId}&user_id=eq.${user.id}&select=*&order=item_number.asc`, 'GET', null, token);
    if (!r.ok) return json({ error: 'Failed' }, r.status, cors);
    const items = r.data || [];
    const summary = { total_items: items.length, total_contracted: items.reduce((s,i) => s + (Number(i.contracted_qty)*Number(i.unit_rate||0)), 0), total_executed: items.reduce((s,i) => s + (Number(i.executed_qty||0)*Number(i.unit_rate||0)), 0), total_approved: items.reduce((s,i) => s + (Number(i.approved_qty||0)*Number(i.unit_rate||0)), 0), progress_pct: 0 };
    if (summary.total_contracted > 0) summary.progress_pct = Math.round((summary.total_approved / summary.total_contracted) * 100);
    return json({ data: items, summary }, 200, cors);
  }
  if (method === 'POST') {
    const body = await req.json().catch(() => ({}));
    if (!body.project_id) return json({ error: 'project_id required' }, 400, cors);
    const items = Array.isArray(body.items) ? body.items : [body];
    const results = [];
    for (const item of items) {
      if (!item.item_number || !item.description || !item.unit) { results.push({ error: 'missing fields' }); continue; }
      const payload = { user_id: user.id, project_id: body.project_id, item_number: String(item.item_number).trim(), description: String(item.description).trim(), unit: String(item.unit).trim(), contracted_qty: Number(item.contracted_qty)||0, unit_rate: Number(item.unit_rate)||0, executed_qty: Number(item.executed_qty)||0, approved_qty: Number(item.approved_qty)||0, notes: item.notes||'' };
      const r = await sbQuery('boq_items', 'POST', payload, token);
      results.push(r.ok ? (Array.isArray(r.data)?r.data[0]:r.data) : { error: r.data });
    }
    return json({ data: results, count: results.length }, 201, cors);
  }
  if (method === 'PUT') {
    if (!id) return json({ error: 'id required' }, 400, cors);
    const body = await req.json().catch(() => ({}));
    const own = await sbQuery(`boq_items?id=eq.${id}&user_id=eq.${user.id}&select=id`, 'GET', null, token);
    if (!own.ok || !own.data?.length) return json({ error: 'Not found' }, 404, cors);
    const allowed = ['item_number','description','unit','contracted_qty','unit_rate','executed_qty','approved_qty','notes'];
    const updates = {}; allowed.forEach(k => { if (body[k] !== undefined) updates[k] = body[k]; });
    const r = await sbQuery(`boq_items?id=eq.${id}&user_id=eq.${user.id}`, 'PATCH', updates, token);
    return json({ data: Array.isArray(r.data)?r.data[0]:r.data }, r.ok?200:r.status, cors);
  }
  if (method === 'DELETE') {
    if (!id) return json({ error: 'id required' }, 400, cors);
    if (id==='all'&&projectId) { await sbQuery(`boq_items?project_id=eq.${projectId}&user_id=eq.${user.id}`,'DELETE',null,token); return json({success:true},200,cors); }
    await sbQuery(`boq_items?id=eq.${id}&user_id=eq.${user.id}`,'DELETE',null,token);
    return json({ success: true }, 200, cors);
  }
  return json({ error: 'Method not allowed' }, 405, cors);
}

async function handlePaymentCertificates(req, url, method, user, token, cors) {
  const id = url.searchParams.get('id');
  const projectId = url.searchParams.get('project_id');
  if (method === 'GET') {
    if (id) { const r = await sbQuery(`payment_certificates?id=eq.${id}&user_id=eq.${user.id}&select=*`,'GET',null,token); return json({data:r.data},r.ok?200:r.status,cors); }
    if (!projectId) return json({ error: 'project_id required' }, 400, cors);
    const r = await sbQuery(`payment_certificates?project_id=eq.${projectId}&user_id=eq.${user.id}&select=*&order=ipc_number.asc`,'GET',null,token);
    const ipcs = r.data||[];
    return json({ data: ipcs, summary: { count:ipcs.length, total_gross:ipcs.reduce((s,i)=>s+Number(i.gross_amount||0),0), total_net:ipcs.reduce((s,i)=>s+Number(i.net_amount||0),0), total_retention:ipcs.reduce((s,i)=>s+Number(i.retention_amount||0),0), total_deductions:ipcs.reduce((s,i)=>s+Number(i.deductions||0),0) } }, 200, cors);
  }
  if (method === 'POST') {
    const body = await req.json().catch(() => ({}));
    if (!body.project_id||!body.period_from||!body.period_to) return json({error:'project_id, period_from, period_to required'},400,cors);
    const boqR = await sbQuery(`boq_items?project_id=eq.${body.project_id}&user_id=eq.${user.id}&select=*`,'GET',null,token);
    const gross = Number(body.gross_amount) || (boqR.data||[]).reduce((s,i)=>s+(Number(i.approved_qty||0)*Number(i.unit_rate||0)),0);
    const prevR = await sbQuery(`payment_certificates?project_id=eq.${body.project_id}&user_id=eq.${user.id}&select=net_amount,ipc_number&order=ipc_number.asc`,'GET',null,token);
    const prev = prevR.data||[];
    const prevTotal = prev.reduce((s,i)=>s+Number(i.net_amount||0),0);
    const nextNum = prev.length>0 ? Math.max(...prev.map(i=>i.ipc_number))+1 : 1;
    const retPct = Number(body.retention_pct)||10;
    const retAmt = Math.round(gross*retPct/100*100)/100;
    const ded = Number(body.deductions)||0;
    const net = gross-retAmt-ded;
    const payload = { user_id:user.id, project_id:body.project_id, ipc_number:body.ipc_number||nextNum, period_from:body.period_from, period_to:body.period_to, gross_amount:gross, retention_pct:retPct, retention_amount:retAmt, deductions:ded, net_amount:net, previous_total:prevTotal, this_certificate:Math.max(0,net-prevTotal), status:body.status||'draft', notes:body.notes||'' };
    const r = await sbQuery('payment_certificates','POST',payload,token);
    return json({ data: Array.isArray(r.data)?r.data[0]:r.data }, r.ok?201:r.status, cors);
  }
  if (method === 'PUT') {
    if (!id) return json({error:'id required'},400,cors);
    const body = await req.json().catch(() => ({}));
    const allowed = ['status','notes','gross_amount','retention_pct','deductions'];
    const updates = {}; allowed.forEach(k=>{if(body[k]!==undefined)updates[k]=body[k]});
    await sbQuery(`payment_certificates?id=eq.${id}&user_id=eq.${user.id}`,'PATCH',updates,token);
    return json({success:true},200,cors);
  }
  if (method === 'DELETE') {
    if (!id) return json({error:'id required'},400,cors);
    await sbQuery(`payment_certificates?id=eq.${id}&user_id=eq.${user.id}`,'DELETE',null,token);
    return json({success:true},200,cors);
  }
  return json({error:'Method not allowed'},405,cors);
}

async function handleStats(req, url, method, user, token, cors) {
  if (method !== 'GET') return json({error:'GET only'},405,cors);
  const projectId = url.searchParams.get('project_id');
  if (projectId) {
    const [proj,dwr,ir,boq,ipc,ncr,snag] = await Promise.all([
      sbQuery(`projects?id=eq.${projectId}&user_id=eq.${user.id}&select=*`,'GET',null,token),
      sbQuery(`daily_reports?project_id=eq.${projectId}&user_id=eq.${user.id}&select=id`,'GET',null,token),
      sbQuery(`inspection_requests?project_id=eq.${projectId}&user_id=eq.${user.id}&select=id,status`,'GET',null,token),
      sbQuery(`boq_items?project_id=eq.${projectId}&user_id=eq.${user.id}&select=contracted_qty,unit_rate,approved_qty`,'GET',null,token),
      sbQuery(`payment_certificates?project_id=eq.${projectId}&user_id=eq.${user.id}&select=ipc_number,net_amount,period_to,status`,'GET',null,token),
      sbQuery(`ncr_log?project_id=eq.${projectId}&user_id=eq.${user.id}&select=id,status,severity`,'GET',null,token),
      sbQuery(`snag_list?project_id=eq.${projectId}&user_id=eq.${user.id}&select=id,status`,'GET',null,token),
    ]);
    const iD=ir.data||[],bD=boq.data||[],pD=ipc.data||[],nD=ncr.data||[],sD=snag.data||[];
    const tC=bD.reduce((s,i)=>s+(Number(i.contracted_qty)*Number(i.unit_rate||0)),0);
    const tA=bD.reduce((s,i)=>s+(Number(i.approved_qty||0)*Number(i.unit_rate||0)),0);
    return json({project:proj.data?.[0],stats:{dwr_count:(dwr.data||[]).length,ir:{total:iD.length,pending:iD.filter(i=>i.status==='pending').length},boq:{items:bD.length,contract_value:tC,approved_value:tA,progress_pct:tC>0?Math.round(tA/tC*100):0},ipc:{count:pD.length,total_certified:pD.reduce((s,i)=>s+Number(i.net_amount||0),0)},ncr:{total:nD.length,open:nD.filter(i=>i.status==='open').length,critical:nD.filter(i=>i.severity==='critical').length},snag:{total:sD.length,open:sD.filter(i=>i.status==='open').length},scurve:pD.map((it,idx)=>({ipc:it.ipc_number,date:it.period_to,cumulative_pct:tC>0?Math.round(pD.slice(0,idx+1).reduce((s,i)=>s+Number(i.net_amount||0),0)/tC*100):0}))}},200,cors);
  }
  const [projects,allNcr,allIr,allSnag] = await Promise.all([
    sbQuery(`projects?user_id=eq.${user.id}&select=id,name,status,type,contract_value`,'GET',null,token),
    sbQuery(`ncr_log?user_id=eq.${user.id}&select=id,status,severity`,'GET',null,token),
    sbQuery(`inspection_requests?user_id=eq.${user.id}&select=id,status`,'GET',null,token),
    sbQuery(`snag_list?user_id=eq.${user.id}&select=id,status`,'GET',null,token),
  ]);
  const pD=projects.data||[],nA=allNcr.data||[],iA=allIr.data||[],sA=allSnag.data||[];
  return json({overview:{total_projects:pD.length,active:pD.filter(p=>p.status==='active').length,completed:pD.filter(p=>p.status==='completed').length,total_contract_value:pD.reduce((s,p)=>s+Number(p.contract_value||0),0),by_type:{villa:pD.filter(p=>p.type==='villa').length,building:pD.filter(p=>p.type==='building').length,road:pD.filter(p=>p.type==='road').length,maintenance:pD.filter(p=>p.type==='maintenance').length}},alerts:{open_ncr:nA.filter(n=>n.status==='open').length,critical_ncr:nA.filter(n=>n.severity==='critical'&&n.status==='open').length,pending_ir:iA.filter(i=>i.status==='pending').length,open_snags:sA.filter(s=>s.status==='open').length},projects:pD},200,cors);
}

export const config = { runtime: 'edge' };
