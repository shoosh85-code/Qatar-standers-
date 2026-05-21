// api/auth.js — QatarSpec Pro
// Vercel Serverless Function: تسجيل / دخول / تحقق / خروج
// SECURITY: لا يُعرّض Supabase URL أو keys للـ client
// PROTOCOL 6: Rate limiting مفعّل

import { checkRateLimit, getIp } from './rate-limit.js';

const CORS = {
  'Access-Control-Allow-Origin': process.env.APP_URL || 'https://qatar-standers.vercel.app',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
}
function getSupabaseKey() {
  return process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

// ── Supabase Auth helper ───────────────────────────────────────────────────
async function sbAuth(endpoint, body) {
  const url  = getSupabaseUrl();
  const key  = getSupabaseKey();
  if (!url || !key) throw new Error('Supabase غير مهيأ');

  const res = await fetch(`${url}/auth/v1/${endpoint}`, {
    method: 'POST',
    headers: { 'apikey': key, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
}

// ── Main Handler ───────────────────────────────────────────────────────────
export default async function handler(req) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS });
  }

  const ip = getIp(req);

  // Rate limit: 10/min لكل IP
  const rl = await checkRateLimit(ip, '/api/auth', false);
  if (!rl.allowed) {
    return json({
      error: 'Rate limit exceeded',
      retryAfter: rl.retryAfter,
    }, 429);
  }

  const url    = new URL(req.url);
  const action = url.searchParams.get('action') || 'login';

  try {
    // ── POST /api/auth?action=signup ───────────────────────────────────
    if (req.method === 'POST' && action === 'signup') {
      const body  = await req.json().catch(() => ({}));
      const email = body.email?.trim().toLowerCase();
      const pass  = body.password;
      const name  = body.name?.trim() || '';

      if (!email || !pass) return json({ error: 'البريد وكلمة المرور مطلوبان' }, 400);
      if (pass.length < 8)  return json({ error: 'كلمة المرور 8 أحرف على الأقل' }, 400);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'بريد إلكتروني غير صحيح' }, 400);

      const r = await sbAuth('signup', {
        email,
        password: pass,
        data: { full_name: name },
      });

      if (!r.ok) {
        const msg = r.data?.msg || r.data?.error_description || 'فشل إنشاء الحساب';
        return json({ error: msg }, r.status);
      }

      return json({
        message: 'تم إنشاء الحساب. تحقق من بريدك الإلكتروني للتفعيل.',
        user: { email, name },
      }, 201);
    }

    // ── POST /api/auth?action=login ────────────────────────────────────
    if (req.method === 'POST' && action === 'login') {
      const body  = await req.json().catch(() => ({}));
      const email = body.email?.trim().toLowerCase();
      const pass  = body.password;

      if (!email || !pass) return json({ error: 'البريد وكلمة المرور مطلوبان' }, 400);

      const r = await sbAuth('token?grant_type=password', {
        email,
        password: pass,
      });

      if (!r.ok) {
        const msg = r.data?.error_description || r.data?.msg || 'بيانات الدخول غير صحيحة';
        return json({ error: msg }, 401);
      }

      const { access_token, refresh_token, expires_in, user } = r.data;
      const isPro = user?.user_metadata?.pro === true || user?.app_metadata?.pro === true;

      return json({
        access_token,
        refresh_token,
        expires_in,
        user: {
          id:    user.id,
          email: user.email,
          name:  user.user_metadata?.full_name || user.email,
          pro:   isPro,
        },
      }, 200);
    }

    // ── POST /api/auth?action=logout ───────────────────────────────────
    if (req.method === 'POST' && action === 'logout') {
      const authHeader = req.headers.get('Authorization') || '';
      const token = authHeader.replace('Bearer ', '').trim();
      if (!token) return json({ message: 'تم تسجيل الخروج' }, 200);

      const url2 = getSupabaseUrl();
      const key  = getSupabaseKey();
      await fetch(`${url2}/auth/v1/logout`, {
        method: 'POST',
        headers: { 'apikey': key, 'Authorization': `Bearer ${token}` },
      }).catch(() => null); // لا نوقف التنفيذ لو فشل

      return json({ message: 'تم تسجيل الخروج بنجاح' }, 200);
    }

    // ── GET /api/auth?action=me ────────────────────────────────────────
    if (req.method === 'GET' && action === 'me') {
      const authHeader = req.headers.get('Authorization') || '';
      const token = authHeader.replace('Bearer ', '').trim();
      if (!token) return json({ error: 'غير مسجل الدخول' }, 401);

      const sbUrl = getSupabaseUrl();
      const key   = getSupabaseKey();
      const res   = await fetch(`${sbUrl}/auth/v1/user`, {
        headers: { 'Authorization': `Bearer ${token}`, 'apikey': key },
      });

      if (!res.ok) return json({ error: 'جلسة منتهية الصلاحية' }, 401);
      const user  = await res.json();
      const isPro = user?.user_metadata?.pro === true || user?.app_metadata?.pro === true;

      return json({
        user: {
          id:    user.id,
          email: user.email,
          name:  user.user_metadata?.full_name || user.email,
          pro:   isPro,
        },
      }, 200);
    }

    // ── POST /api/auth?action=refresh ──────────────────────────────────
    if (req.method === 'POST' && action === 'refresh') {
      const body = await req.json().catch(() => ({}));
      if (!body.refresh_token) return json({ error: 'refresh_token مطلوب' }, 400);

      const r = await sbAuth('token?grant_type=refresh_token', {
        refresh_token: body.refresh_token,
      });

      if (!r.ok) return json({ error: 'فشل تجديد الجلسة' }, 401);

      const { access_token, refresh_token: newRT, expires_in } = r.data;
      return json({ access_token, refresh_token: newRT, expires_in }, 200);
    }

    return json({ error: `action غير معروف: ${action}` }, 400);

  } catch (err) {
    console.error('[api/auth]', err.message);
    return json({ error: 'خطأ في الخادم: ' + err.message }, 500);
  }
}

export const config = { runtime: 'edge' };
