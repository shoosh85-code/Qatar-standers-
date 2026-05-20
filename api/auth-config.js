// /api/auth-config.js — QatarSpec Pro
// يُرجع Supabase public config (anon key — آمن للكشف في المتصفح)
// v2.0: +Rate Limiting per PROTOCOL 6 (Free=10/min, Global=100/min/IP)
// ملاحظة: SUPABASE_ANON_KEY مصمم ليكون عاماً — RLS يحمي البيانات

import { withRateLimit } from './rate-limit.js';

const CORS_ORIGIN = process.env.APP_URL || 'https://qatar-standers.vercel.app';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', CORS_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'GET only' });

  // PROTOCOL 6: Rate limiting — public endpoint
  if (!(await withRateLimit(req, res, 'free'))) return;

  const SUPABASE_URL      = process.env.NEXT_PUBLIC_SUPABASE_URL  || process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return res.status(500).json({ error: 'Missing Supabase configuration' });
  }

  // Cache: 5 دقائق (القيم ثابتة — لا تتغير)
  res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');

  return res.status(200).json({ url: SUPABASE_URL, key: SUPABASE_ANON_KEY });
}
