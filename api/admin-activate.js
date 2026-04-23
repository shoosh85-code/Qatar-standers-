// api/admin-activate.js — QatarSpec Pro
// Manual user activation endpoint (WhatsApp payment flow)
// Protected by ADMIN_SECRET env variable

import { createClient } from '@supabase/supabase-js';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Secret',
  'Content-Type': 'application/json; charset=utf-8',
};

function respond(res, status, body) {
  return res.status(status).set(CORS_HEADERS).json(body);
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(204).set(CORS_HEADERS).end();
  }

  // ── Auth: check admin secret ─────────────────────────────────────────────
  const adminSecret =
    req.headers['x-admin-secret'] ||
    req.headers['authorization']?.replace('Bearer ', '');

  if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
    return respond(res, 401, {
      error: 'غير مصرح',
      code: 'UNAUTHORIZED',
    });
  }

  // ── Supabase client ──────────────────────────────────────────────────────
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return respond(res, 503, {
      error: 'إعداد قاعدة البيانات غير مكتمل',
      code: 'DB_CONFIG_MISSING',
    });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // ── GET: list pending / all users ────────────────────────────────────────
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, token, is_pro, is_active, plan, activated_at, expires_at, created_at, notes')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      return respond(res, 500, { error: error.message });
    }

    return respond(res, 200, { success: true, count: data.length, users: data });
  }

  // ── POST: activate / deactivate user ────────────────────────────────────
  if (req.method !== 'POST') {
    return respond(res, 405, { error: 'Method not allowed' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return respond(res, 400, { error: 'Invalid JSON' });
  }

  const { action, email, token, plan = 'pro', duration_days = 365, notes = '' } = body || {};

  if (!action) {
    return respond(res, 400, {
      error: 'يرجى تحديد الإجراء: activate | deactivate | create | delete',
    });
  }

  // ── Action: create new user ──────────────────────────────────────────────
  if (action === 'create') {
    if (!email) {
      return respond(res, 400, { error: 'البريد الإلكتروني مطلوب' });
    }

    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return respond(res, 409, { error: 'المستخدم موجود بالفعل', code: 'USER_EXISTS' });
    }

    const newToken = generateToken();
    const expiresAt = new Date(Date.now() + duration_days * 86400 * 1000).toISOString();

    const { data, error } = await supabase
      .from('users')
      .insert({
        email,
        token: newToken,
        is_pro: plan !== 'free',
        is_active: true,
        plan,
        activated_at: new Date().toISOString(),
        expires_at: expiresAt,
        notes,
      })
      .select()
      .single();

    if (error) return respond(res, 500, { error: error.message });

    return respond(res, 201, {
      success: true,
      message: `✅ تم إنشاء مستخدم جديد`,
      user: data,
      whatsapp_message: buildWhatsAppMessage(email, newToken, plan, duration_days),
    });
  }

  // ── Action: activate existing user ──────────────────────────────────────
  if (action === 'activate') {
    if (!email && !token) {
      return respond(res, 400, { error: 'يرجى توفير البريد الإلكتروني أو التوكن' });
    }

    const query = supabase.from('users').update({
      is_pro: true,
      is_active: true,
      plan,
      activated_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + duration_days * 86400 * 1000).toISOString(),
      notes: notes || 'تم التفعيل يدوياً',
    });

    const { data, error } = await (email
      ? query.eq('email', email).select().single()
      : query.eq('token', token).select().single());

    if (error) return respond(res, 500, { error: error.message });
    if (!data) return respond(res, 404, { error: 'المستخدم غير موجود' });

    return respond(res, 200, {
      success: true,
      message: `✅ تم تفعيل الحساب المميز`,
      user: data,
      whatsapp_message: buildWhatsAppMessage(data.email, data.token, plan, duration_days),
    });
  }

  // ── Action: deactivate user ──────────────────────────────────────────────
  if (action === 'deactivate') {
    if (!email && !token) {
      return respond(res, 400, { error: 'يرجى توفير البريد الإلكتروني أو التوكن' });
    }

    const query = supabase.from('users').update({
      is_pro: false,
      is_active: false,
      plan: 'free',
    });

    const { data, error } = await (email
      ? query.eq('email', email).select().single()
      : query.eq('token', token).select().single());

    if (error) return respond(res, 500, { error: error.message });
    if (!data) return respond(res, 404, { error: 'المستخدم غير موجود' });

    return respond(res, 200, {
      success: true,
      message: `✅ تم إلغاء تفعيل الحساب`,
      user: data,
    });
  }

  // ── Action: delete user ──────────────────────────────────────────────────
  if (action === 'delete') {
    if (!email) {
      return respond(res, 400, { error: 'البريد الإلكتروني مطلوب للحذف' });
    }

    const { error } = await supabase.from('users').delete().eq('email', email);
    if (error) return respond(res, 500, { error: error.message });

    return respond(res, 200, { success: true, message: `✅ تم حذف المستخدم ${email}` });
  }

  return respond(res, 400, {
    error: 'إجراء غير معروف',
    valid_actions: ['create', 'activate', 'deactivate', 'delete'],
  });
};

// ── Helpers ──────────────────────────────────────────────────────────────────
function generateToken() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = 'QSP-';
  for (let i = 0; i < 24; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

function buildWhatsAppMessage(email, token, plan, days) {
  const planAr = plan === 'enterprise' ? 'المؤسسي' : 'المميز';
  const msg = `مرحباً 👋\n\nتم تفعيل اشتراكك في QatarSpec Pro!\n\n✅ الخطة: ${planAr}\n⏳ المدة: ${days} يوم\n\n🔑 رمز التفعيل الخاص بك:\n${token}\n\nادخل الرمز في الموقع: https://qatar-standers.vercel.app\n\nشكراً لاشتراكك 🇶🇦`;
  const encoded = encodeURIComponent(msg);
  return `https://wa.me/?text=${encoded}`;
}
