// api/daily-reports.js — QatarSpec Pro
// Vercel Serverless: CRUD للتقارير اليومية DWR
// PROTOCOL 6: Rate limiting — 20/min free, 60/min pro
// المرحلة 3 من خطة Project Hub

import { checkRateLimit, applyRateLimitHeaders, getIp } from './rate-limit.js';

const CORS_ORIGIN = process.env.APP_URL || 'https://qatar-standers.vercel.app';

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
}
function getSupabaseKey() {
  return process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;
}

// التحقق من token المستخدم
async function verifyToken(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.replace('Bearer ', '').trim();
  if (!token) return null;
  const supabaseUrl = getSupabaseUrl();
  const supabaseKey = getSupabaseKey();
  if (!supabaseUrl || !supabaseKey) return null;
  try {
    const res = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { 'Authorization': `Bearer ${token}`, 'apikey': supabaseKey }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.id ? data : null;
  } catch { return null; }
}

// استعلام Supabase REST
async function supabaseQuery(path, method = 'GET', body = null, token = null) {
  const supabaseUrl = getSupabaseUrl();
  const supabaseKey = getSupabaseKey();
  const headers = {
    'apikey': supabaseKey,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
    'Authorization': `Bearer ${token || supabaseKey}`
  };
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/${path}`, opts);
    const data = await res.json();
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    return { ok: false, status: 500, data: { error: err.message } };
  }
}

// التحقق من ملكية المشروع
async function verifyProjectOwnership(projectId, userId, authToken) {
  const result = await supabaseQuery(
    `projects?id=eq.${projectId}&user_id=eq.${userId}&select=id`,
    'GET', null, authToken
  );
  return result.ok && Array.isArray(result.data) && result.data.length > 0;
}

export default async function handler(req, res) {
  // ── CORS ──────────────────────────────────────────────────────────────────
  res.setHeader('Access-Control-Allow-Origin', CORS_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Vary', 'Origin');

  if (req.method === 'OPTIONS') return res.status(204).end();

  // ── Rate Limiting ─────────────────────────────────────────────────────────
  const ip = getIp(req);
  const rl = await checkRateLimit(ip, 'daily-reports', false);
  applyRateLimitHeaders(res, rl);
  if (!rl.allowed) {
    return res.status(429).json({
      error: 'Too Many Requests',
      message: 'يرجى الانتظار قبل إرسال طلب جديد',
      retryAfter: rl.retryAfter
    });
  }

  // ── التحقق من المستخدم ────────────────────────────────────────────────────
  const user = await verifyToken(req.headers['authorization']);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized', message: 'يجب تسجيل الدخول' });
  }

  const authToken = req.headers['authorization'].replace('Bearer ', '').trim();

  // ── GET: جلب التقارير ─────────────────────────────────────────────────────
  if (req.method === 'GET') {
    const { project_id, id } = req.query;

    if (!project_id) {
      return res.status(400).json({ error: 'project_id required', message: 'يجب تحديد المشروع' });
    }

    // التحقق من ملكية المشروع
    const owns = await verifyProjectOwnership(project_id, user.id, authToken);
    if (!owns) {
      return res.status(403).json({ error: 'Forbidden', message: 'ليس لديك صلاحية' });
    }

    let path;
    if (id) {
      path = `daily_reports?id=eq.${id}&project_id=eq.${project_id}&select=*`;
    } else {
      path = `daily_reports?project_id=eq.${project_id}&order=report_date.desc&select=*`;
    }

    const result = await supabaseQuery(path, 'GET', null, authToken);
    if (!result.ok) {
      return res.status(500).json({ error: 'Database error', details: result.data });
    }

    return res.status(200).json({
      success: true,
      data: Array.isArray(result.data) ? result.data : [],
      count: Array.isArray(result.data) ? result.data.length : 0
    });
  }

  // ── POST: إنشاء تقرير يومي ────────────────────────────────────────────────
  if (req.method === 'POST') {
    const {
      project_id, report_date, weather, temperature,
      workers_count, equipment_used, activities,
      materials_received, visitors, safety_notes,
      problems, notes
    } = req.body || {};

    if (!project_id || !activities?.trim()) {
      return res.status(400).json({ error: 'Missing required fields', message: 'المشروع والأعمال المنفذة إلزامية' });
    }

    // التحقق من ملكية المشروع
    const owns = await verifyProjectOwnership(project_id, user.id, authToken);
    if (!owns) {
      return res.status(403).json({ error: 'Forbidden', message: 'ليس لديك صلاحية' });
    }

    // التحقق من عدم وجود تقرير لنفس اليوم
    const today = report_date || new Date().toISOString().split('T')[0];
    const existCheck = await supabaseQuery(
      `daily_reports?project_id=eq.${project_id}&report_date=eq.${today}&select=id`,
      'GET', null, authToken
    );
    if (existCheck.ok && Array.isArray(existCheck.data) && existCheck.data.length > 0) {
      return res.status(409).json({ error: 'Conflict', message: 'يوجد تقرير لهذا اليوم مسبقاً' });
    }

    const reportData = {
      project_id,
      user_id: user.id,
      report_date: today,
      weather: weather || null,
      temperature: temperature ? Number(temperature) : null,
      workers_count: workers_count ? Number(workers_count) : null,
      equipment_used: equipment_used?.trim() || null,
      activities: activities.trim(),
      materials_received: materials_received?.trim() || null,
      visitors: visitors?.trim() || null,
      safety_notes: safety_notes?.trim() || null,
      problems: problems?.trim() || null,
      notes: notes?.trim() || null
    };

    const result = await supabaseQuery('daily_reports', 'POST', reportData, authToken);
    if (!result.ok) {
      return res.status(500).json({ error: 'Database error', details: result.data });
    }

    const created = Array.isArray(result.data) ? result.data[0] : result.data;
    return res.status(201).json({ success: true, data: created });
  }

  // ── PUT: تعديل تقرير ──────────────────────────────────────────────────────
  if (req.method === 'PUT') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'id required' });

    // التحقق من ملكية التقرير
    const checkResult = await supabaseQuery(
      `daily_reports?id=eq.${id}&user_id=eq.${user.id}&select=id,project_id`,
      'GET', null, authToken
    );
    if (!checkResult.ok || !checkResult.data?.length) {
      return res.status(403).json({ error: 'Forbidden', message: 'ليس لديك صلاحية' });
    }

    const allowed = ['weather', 'temperature', 'workers_count', 'equipment_used',
      'activities', 'materials_received', 'visitors', 'safety_notes', 'problems', 'notes'];

    const updates = {};
    for (const key of allowed) {
      if (req.body?.[key] !== undefined) updates[key] = req.body[key];
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    const result = await supabaseQuery(
      `daily_reports?id=eq.${id}&user_id=eq.${user.id}`,
      'PATCH', updates, authToken
    );
    if (!result.ok) {
      return res.status(500).json({ error: 'Database error', details: result.data });
    }

    const updated = Array.isArray(result.data) ? result.data[0] : result.data;
    return res.status(200).json({ success: true, data: updated });
  }

  // ── DELETE: حذف تقرير ────────────────────────────────────────────────────
  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'id required' });

    // التحقق من ملكية التقرير
    const checkResult = await supabaseQuery(
      `daily_reports?id=eq.${id}&user_id=eq.${user.id}&select=id`,
      'GET', null, authToken
    );
    if (!checkResult.ok || !checkResult.data?.length) {
      return res.status(403).json({ error: 'Forbidden', message: 'ليس لديك صلاحية' });
    }

    const result = await supabaseQuery(
      `daily_reports?id=eq.${id}&user_id=eq.${user.id}`,
      'DELETE', null, authToken
    );
    if (!result.ok && result.status !== 204) {
      return res.status(500).json({ error: 'Database error', details: result.data });
    }

    return res.status(200).json({ success: true, message: 'تم حذف التقرير' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
