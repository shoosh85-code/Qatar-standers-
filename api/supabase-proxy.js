// api/supabase-proxy.js
// QatarSpec Pro — Supabase Server-Side Proxy
// المفاتيح من process.env فقط — لا شيء في client-side
// يستخدم rate-limit.js (Protocol 6)

import { rateLimit, applyRateLimitHeaders, getIp } from './rate-limit.js';
import { getSupabaseUrl, getSupabaseAnonKey, getSupabaseServiceKey } from '../lib/supabase.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://qatar-standers.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── Rate Limiting (Protocol 6) ──────────────────────────────────────────────
  const ip      = getIp(req);
  const isPro   = req.headers['x-user-tier'] === 'pro';
  const rl      = await rateLimit(ip, 'qcs-search', isPro);

  applyRateLimitHeaders(res, rl);

  if (!rl.allowed) {
    return res.status(429).json({
      error: 'Too Many Requests',
      retryAfter: rl.retryAfter,
      message: isPro
        ? `تجاوزت الحد المسموح (${rl.limit} طلب/دقيقة للـ Pro)`
        : `تجاوزت الحد المسموح (${rl.limit} طلبات/دقيقة للـ Free). ابحث في Pro للمزيد.`
    });
  }

  // ── Allowed Operations (PROTOCOL 6 — Security Allowlist) ───────────────────
  // هذا الـ endpoint مخصص فقط لبحث QCS — أي عملية أخرى ممنوعة
  const ALLOWED_OPERATIONS = ['search_qcs', 'get_user_by_token', 'upsert_subscription'];
  const { operation = 'search_qcs' } = req.body || {};

  if (!ALLOWED_OPERATIONS.includes(operation)) {
    console.warn(`[SECURITY] Blocked operation: ${String(operation).slice(0, 50)} from IP: ${ip}`);
    return res.status(403).json({
      error: 'Operation not allowed',
      allowed: ALLOWED_OPERATIONS
    });
  }

  // ── Environment Variables ───────────────────────────────────────────────────
  const SUPABASE_URL = getSupabaseUrl();
  const SUPABASE_KEY = getSupabaseAnonKey(); // Anon only

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('SUPABASE_URL أو SUPABASE_KEY غير موجودة في environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // ── Guard: Never use service_role key in this proxy ────────────────────────
  if (SUPABASE_KEY === getSupabaseServiceKey()) {
    console.error('[SECURITY CRITICAL] supabase-proxy using SERVICE_ROLE_KEY — BLOCKED');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // ── Request Body ────────────────────────────────────────────────────────────
  const { sectionNum, keyword = '', limit = 20 } = req.body || {};

  if (!sectionNum) {
    return res.status(400).json({ error: 'sectionNum مطلوب' });
  }

  // التحقق من المدخلات — منع SQL injection
  const safeSection = String(sectionNum).replace(/[^0-9]/g, '').slice(0, 2);
  const safeKeyword = String(keyword).replace(/['";<>]/g, '').slice(0, 200);
  const safeLimit   = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);

  // ── Build Supabase URL ──────────────────────────────────────────────────────
  let supaUrl =
    SUPABASE_URL +
    '/rest/v1/qcs_chunks' +
    '?select=id,section_name,part_name,page_num,content,chunk_index' +
    '&section_num=eq.' + safeSection;

  if (safeKeyword.trim()) {
    supaUrl += '&content=ilike.*' + encodeURIComponent(safeKeyword.trim()) + '*';
  }

  supaUrl += '&limit=' + safeLimit + '&order=chunk_index.asc';

  // ── Fetch from Supabase ─────────────────────────────────────────────────────
  try {
    const supaRes = await fetch(supaUrl, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: 'Bearer ' + SUPABASE_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!supaRes.ok) {
      const errText = await supaRes.text();
      console.error('Supabase error:', supaRes.status, errText);
      return res.status(502).json({ error: 'Supabase: ' + supaRes.status });
    }

    const data = await supaRes.json();
    return res.status(200).json(data);

  } catch (err) {
    console.error('supabase-proxy fetch error:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
