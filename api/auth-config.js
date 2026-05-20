// api/auth-config.js
// QatarSpec Pro — يوفر Supabase URL و Anon Key للـ client
// الـ Anon Key آمن للنشر (مصمم ليكون عام) — RLS يحمي البيانات
// لا يكشف Service Role Key أبداً

import { getSupabaseUrl, getSupabaseAnonKey } from '../lib/supabase.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://qatar-standers.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 'public, max-age=3600');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();

  if (!url || !anonKey) {
    return res.status(500).json({ error: 'Supabase not configured' });
  }

  return res.status(200).json({ url, anonKey });
}
