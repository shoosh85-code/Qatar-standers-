// api/site-photos.js — QatarSpec Pro
// Site Photos CRUD + Supabase Storage Upload — المرحلة 7 من Project Hub
// PROTOCOL 6: Rate limiting — 10/min free, 60/min pro, 100/min/IP global
// ✅ لا Anthropic API — Supabase Storage + REST مباشرة

import { checkRateLimit, getIp } from './rate-limit.js';

const CORS_ORIGIN = process.env.APP_URL || 'https://qatar-standers.vercel.app';
const STORAGE_BUCKET = 'site-photos';

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
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
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

// ── رفع الصورة إلى Supabase Storage ──────────────────────────────────────
async function uploadToStorage(fileBuffer, fileName, contentType, userToken) {
  const url = getSupabaseUrl();
  const key = getSupabaseKey();
  // استخدام service key للرفع لأن RLS على Storage
  const storageToken = process.env.SUPABASE_SERVICE_KEY || key;

  const storageUrl = `${url}/storage/v1/object/${STORAGE_BUCKET}/${fileName}`;
  try {
    const res = await fetch(storageUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${storageToken}`,
        'apikey': key,
        'Content-Type': contentType,
        'x-upsert': 'true'
      },
      body: fileBuffer
    });
    if (!res.ok) {
      const err = await res.text();
      return { ok: false, error: err };
    }
    const data = await res.json();
    // بناء Public URL
    const publicUrl = `${url}/storage/v1/object/public/${STORAGE_BUCKET}/${fileName}`;
    return { ok: true, publicUrl, key: data.Key };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

// ── حذف الصورة من Supabase Storage ───────────────────────────────────────
async function deleteFromStorage(fileName) {
  const url = getSupabaseUrl();
  const key = getSupabaseKey();
  const storageToken = process.env.SUPABASE_SERVICE_KEY || key;
  try {
    const res = await fetch(`${url}/storage/v1/object/${STORAGE_BUCKET}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${storageToken}`,
        'apikey': key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prefixes: [fileName] })
    });
    return { ok: res.ok };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

// ── Main Handler ──────────────────────────────────────────────────────────
export default async function handler(req) {
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
