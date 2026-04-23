// api/rate-limit.js — QatarSpec Pro
// Shared Supabase-based rate limiting module
// Replaces the old in-memory Map which resets on every cold start

import { createClient } from '@supabase/supabase-js';

// ── Constants ────────────────────────────────────────────────────────────────
const PLANS = {
  free:       5,    // 5 AI queries/month
  pro:        200,  // 200 AI queries/month
  enterprise: 2000, // 2000 AI queries/month
};

// ── Supabase client (lazy singleton) ─────────────────────────────────────────
let _supabase = null;

function getSupabase() {
  if (_supabase) return _supabase;

  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  _supabase = createClient(url, key, {
    auth: { persistSession: false },
  });

  return _supabase;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function getCurrentMonth() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function getClientIP(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return (
    req.headers['x-real-ip'] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    '0.0.0.0'
  );
}

// ── Main rate-limit check ─────────────────────────────────────────────────────
/**
 * Check if the request is within rate limits.
 * Uses Supabase upsert_rate_limit RPC for atomic increment.
 *
 * @param {object} req - Vercel/Node request object
 * @param {string} plan - 'free' | 'pro' | 'enterprise'
 * @returns {{ allowed: boolean, count: number, limit: number, remaining: number }}
 */
async function checkRateLimit(req, plan = 'free') {
  const supabase = getSupabase();
  const ip = getClientIP(req);
  const month = getCurrentMonth();
  const limit = PLANS[plan] ?? PLANS.free;

  // Graceful degradation: if Supabase is unavailable, allow the request
  if (!supabase) {
    console.warn('[RateLimit] Supabase not configured — allowing request');
    return { allowed: true, count: 0, limit, remaining: limit, ip, month };
  }

  try {
    const { data, error } = await supabase.rpc('upsert_rate_limit', {
      p_ip: ip,
      p_month: month,
    });

    if (error) {
      console.error('[RateLimit] RPC error:', error.message);
      // Fail open — don't block users when DB has issues
      return { allowed: true, count: 0, limit, remaining: limit, ip, month };
    }

    const count = typeof data === 'number' ? data : 1;
    const allowed = count <= limit;
    const remaining = Math.max(0, limit - count);

    return { allowed, count, limit, remaining, ip, month };
  } catch (err) {
    console.error('[RateLimit] Unexpected error:', err.message);
    return { allowed: true, count: 0, limit, remaining: limit, ip, month };
  }
}

/**
 * Get current usage for an IP without incrementing
 */
async function getUsage(ip, plan = 'free') {
  const supabase = getSupabase();
  if (!supabase) return { count: 0, limit: PLANS[plan] ?? PLANS.free };

  const month = getCurrentMonth();
  const limit = PLANS[plan] ?? PLANS.free;

  try {
    const { data } = await supabase
      .from('rate_limits')
      .select('count')
      .eq('ip', ip)
      .eq('month', month)
      .single();

    return { count: data?.count ?? 0, limit, remaining: Math.max(0, limit - (data?.count ?? 0)) };
  } catch {
    return { count: 0, limit, remaining: limit };
  }
}

/**
 * Reset rate limit for an IP (admin use)
 */
async function resetLimit(ip, month = getCurrentMonth()) {
  const supabase = getSupabase();
  if (!supabase) return false;

  const { error } = await supabase
    .from('rate_limits')
    .delete()
    .eq('ip', ip)
    .eq('month', month);

  return !error;
}

export default {
  checkRateLimit,
  getUsage,
  resetLimit,
  getClientIP,
  getCurrentMonth,
  PLANS,
};
