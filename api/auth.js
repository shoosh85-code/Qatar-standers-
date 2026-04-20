// api/auth.js
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SERVICE_KEY   = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_SECRET  = process.env.ADMIN_SECRET;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://qatar-standers.vercel.app';

function setCORS(req, res) {
  const origin = req.headers.origin;
  if (origin === ALLOWED_ORIGIN) {
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function send(res, status, body) {
  res.status(status).json(body);
}

async function supabase(path, body, useService = false) {
  const key = useService ? SERVICE_KEY : SUPABASE_ANON;
  const res = await fetch(`${SUPABASE_URL}/auth/v1${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': key,
      'Authorization': `Bearer ${key}`,
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

async function getProfile(userId) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/profiles?id=eq.${userId}&select=*`,
    {
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
      },
    }
  );
  const rows = await res.json();
  return rows?.[0] || null;
}

async function activatePro(userId) {
  const expires = new Date();
  expires.setMonth(expires.getMonth() + 1);
  await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify({
      is_pro: true,
      pro_activated_at: new Date().toISOString(),
      pro_expires_at: expires.toISOString(),
    }),
  });
}

export default async function handler(req, res) {
  setCORS(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST')
    return send(res, 405, { error: 'Method not allowed' });

  const { action, email, password, adminSecret } = req.body || {};

  if (!SUPABASE_URL || !SUPABASE_ANON)
    return send(res, 503, { error: 'خدمة المصادقة غير مهيأة', code: 'AUTH_NOT_CONFIGURED' });

  // ── SIGNUP ──────────────────────────────────────────────────────────────────
  if (action === 'signup') {
    if (!email || !password)
      return send(res, 400, { error: 'البريد الإلكتروني وكلمة المرور مطلوبان', code: 'MISSING_FIELDS' });
    if (password.length < 8)
      return send(res, 400, { error: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل', code: 'WEAK_PASSWORD' });

    const data = await supabase('/signup', { email, password });
    if (data.error)
      return send(res, 400, { error: 'فشل إنشاء الحساب. تحقق من البريد الإلكتروني.', code: 'SIGNUP_FAILED' });

    return send(res, 200, { message: 'تم إنشاء الحساب. تحقق من بريدك لتفعيله.', userId: data.user?.id });
  }

  // ── LOGIN ────────────────────────────────────────────────────────────────────
  if (action === 'login') {
    if (!email || !password)
      return send(res, 400, { error: 'البريد الإلكتروني وكلمة المرور مطلوبان', code: 'MISSING_FIELDS' });

    const data = await supabase('/token?grant_type=password', { email, password });
    if (data.error || !data.access_token)
      return send(res, 401, { error: 'بيانات الدخول غير صحيحة', code: 'INVALID_CREDENTIALS' });

    const profile = await getProfile(data.user.id);
    return send(res, 200, {
      accessToken: data.access_token,
      userId: data.user.id,
      email: data.user.email,
      isPro: profile?.is_pro || false,
      proExpiresAt: profile?.pro_expires_at || null,
    });
  }

  // ── ACTIVATE PRO (Admin) ─────────────────────────────────────────────────────
  if (action === 'activate-pro') {
    if (!adminSecret || adminSecret !== ADMIN_SECRET)
      return send(res, 403, { error: 'غير مصرح', code: 'FORBIDDEN' });
    if (!email)
      return send(res, 400, { error: 'البريد الإلكتروني مطلوب', code: 'MISSING_EMAIL' });

    const userRes = await fetch(
      `${SUPABASE_URL}/rest/v1/profiles?email=eq.${encodeURIComponent(email)}&select=id`,
      {
        headers: {
          'apikey': SERVICE_KEY,
          'Authorization': `Bearer ${SERVICE_KEY}`,
        },
      }
    );
    const users = await userRes.json();
    if (!users?.length)
      return send(res, 404, { error: 'المستخدم غير موجود', code: 'USER_NOT_FOUND' });

    await activatePro(users[0].id);
    return send(res, 200, { message: `تم تفعيل Pro للمستخدم ${email}` });
  }

  return send(res, 400, { error: 'الإجراء غير معروف', code: 'UNKNOWN_ACTION' });
}
