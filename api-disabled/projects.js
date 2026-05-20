// api/projects.js — QatarSpec Pro
// Vercel Serverless: CRUD للمشاريع
// PROTOCOL 6: Rate limiting — 30 req/min per IP
// المرحلة 2 من خطة Project Hub

import { rateLimit, applyRateLimitHeaders, getIp } from './rate-limit.js';

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
      headers: {
        'Authorization': `Bearer ${token}`,
        'apikey': supabaseKey,
      }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.id ? data : null;
  } catch {
    return null;
  }
}

// استعلام Supabase REST
async function supabaseQuery(path, method = 'GET', body = null, token = null) {
  const supabaseUrl = getSupabaseUrl();
  const supabaseKey = getSupabaseKey();

  const headers = {
    'apikey': supabaseKey,
    'Content-Type': 'application/json',
    'Prefer': method === 'POST' ? 'return=representation' : 'return=representation',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  } else {
    headers['Authorization'] = `Bearer ${supabaseKey}`;
  }

  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${supabaseUrl}/rest/v1/${path}`, opts);
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = text; }

  return { ok: res.ok, status: res.status, data };
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
  const rl = await rateLimit(ip, 'projects', false);
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

  // ── GET: جلب مشاريع المستخدم ──────────────────────────────────────────────
  if (req.method === 'GET') {
    const { id } = req.query;

    let path;
    if (id) {
      // جلب مشروع واحد
      path = `projects?id=eq.${id}&user_id=eq.${user.id}&select=*`;
    } else {
      // جلب كل المشاريع
      path = `projects?user_id=eq.${user.id}&order=created_at.desc&select=*`;
    }

    const result = await supabaseQuery(path, 'GET', null, authToken);

    if (!result.ok) {
      return res.status(500).json({ error: 'Database error', details: result.data });
    }

    return res.status(200).json({
      success: true,
      data: Array.isArray(result.data) ? result.data : [result.data].filter(Boolean),
      count: Array.isArray(result.data) ? result.data.length : 1
    });
  }

  // ── POST: إنشاء مشروع جديد ───────────────────────────────────────────────
  if (req.method === 'POST') {
    const {
      name, client, location, type,
      contract_value, start_date, end_date,
      status = 'active', notes
    } = req.body || {};

    // تحقق من الحقول الإلزامية
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'name required', message: 'اسم المشروع إلزامي' });
    }

    // التحقق من نوع المشروع
    const validTypes = ['villa', 'building', 'road', 'maintenance', 'infrastructure', 'other'];
    if (type && !validTypes.includes(type)) {
      return res.status(400).json({ error: 'invalid type', message: 'نوع المشروع غير صحيح' });
    }

    const projectData = {
      user_id: user.id,
      name: name.trim(),
      client: client?.trim() || null,
      location: location?.trim() || null,
      type: type || 'other',
      contract_value: contract_value ? Number(contract_value) : null,
      start_date: start_date || null,
      end_date: end_date || null,
      status,
      notes: notes?.trim() || null,
    };

    const result = await supabaseQuery('projects', 'POST', projectData, authToken);

    if (!result.ok) {
      return res.status(500).json({ error: 'Failed to create project', details: result.data });
    }

    const created = Array.isArray(result.data) ? result.data[0] : result.data;
    return res.status(201).json({ success: true, data: created });
  }

  // ── PUT: تعديل مشروع ─────────────────────────────────────────────────────
  if (req.method === 'PUT') {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: 'id required', message: 'معرّف المشروع مطلوب' });
    }

    const {
      name, client, location, type,
      contract_value, start_date, end_date,
      status, notes
    } = req.body || {};

    const updateData = { updated_at: new Date().toISOString() };
    if (name !== undefined) updateData.name = name.trim();
    if (client !== undefined) updateData.client = client?.trim() || null;
    if (location !== undefined) updateData.location = location?.trim() || null;
    if (type !== undefined) updateData.type = type;
    if (contract_value !== undefined) updateData.contract_value = contract_value ? Number(contract_value) : null;
    if (start_date !== undefined) updateData.start_date = start_date || null;
    if (end_date !== undefined) updateData.end_date = end_date || null;
    if (status !== undefined) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes?.trim() || null;

    const path = `projects?id=eq.${id}&user_id=eq.${user.id}`;
    const result = await supabaseQuery(path, 'PATCH', updateData, authToken);

    if (!result.ok) {
      return res.status(500).json({ error: 'Failed to update project', details: result.data });
    }

    const updated = Array.isArray(result.data) ? result.data[0] : result.data;
    return res.status(200).json({ success: true, data: updated });
  }

  // ── DELETE: حذف ناعم (soft delete) ───────────────────────────────────────
  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: 'id required', message: 'معرّف المشروع مطلوب' });
    }

    // Soft delete: تغيير الحالة إلى cancelled
    const path = `projects?id=eq.${id}&user_id=eq.${user.id}`;
    const result = await supabaseQuery(path, 'PATCH', {
      status: 'cancelled',
      updated_at: new Date().toISOString()
    }, authToken);

    if (!result.ok) {
      return res.status(500).json({ error: 'Failed to delete project', details: result.data });
    }

    return res.status(200).json({ success: true, message: 'تم أرشفة المشروع بنجاح' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
