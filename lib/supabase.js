// lib/supabase.js — Unified Supabase Environment Resolver
// بدل ما كل API file يحل env vars بطريقة مختلفة — هذا المصدر الوحيد
// يدعم: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_KEY, SUPABASE_SERVICE_ROLE_KEY

/**
 * الحصول على URL الـ Supabase
 * يبحث في: NEXT_PUBLIC_SUPABASE_URL → SUPABASE_URL
 * @returns {string|null}
 */
export function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL
      || process.env.SUPABASE_URL
      || null;
}

/**
 * الحصول على Anon Key (للعمليات العامة — لا يكشف بيانات حساسة)
 * يبحث في: SUPABASE_ANON_KEY → NEXT_PUBLIC_SUPABASE_ANON_KEY → SUPABASE_KEY
 * @returns {string|null}
 */
export function getSupabaseAnonKey() {
  return process.env.SUPABASE_ANON_KEY
      || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      || process.env.SUPABASE_KEY
      || null;
}

/**
 * الحصول على Service Role Key (للعمليات الـ admin — خطير!)
 * ⚠️ لا تستخدم هذا إلا في server-side endpoints فقط
 * @returns {string|null}
 */
export function getSupabaseServiceKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || null;
}

/**
 * التحقق من أن env vars موجودة — يطبع تحذير واضح إذا لا
 * @param {'anon'|'service'} level — مستوى الوصول المطلوب
 * @returns {{url: string, key: string}|null}
 */
export function requireSupabase(level = 'anon') {
  const url = getSupabaseUrl();
  const key = level === 'service' ? getSupabaseServiceKey() : getSupabaseAnonKey();

  if (!url || !key) {
    const missing = [];
    if (!url) missing.push('SUPABASE_URL');
    if (!key) missing.push(level === 'service' ? 'SUPABASE_SERVICE_ROLE_KEY' : 'SUPABASE_ANON_KEY');
    console.error(`[Supabase] Missing env vars: ${missing.join(', ')}`);
    return null;
  }

  return { url, key };
}
