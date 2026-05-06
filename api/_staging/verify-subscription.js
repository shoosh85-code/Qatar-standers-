// api/verify-subscription.js — QatarSpec Pro Tier Verification

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL             || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

const FEATURES = {
  free: ['5 بحث AI/يوم', '3 حاسبات', 'نتائج أساسية QCS'],
  pro:  ['بحث غير محدود', 'كل الحاسبات 50+', 'Export PDF/Excel/Word', 'AI محسّن', 'دعم أولوي'],
};

const _lim = new Map();
function allowed(ip, max = 10) {
  const now = Date.now();
  const d   = _lim.get(ip) || { n: 0, r: now + 60000 };
  if (now > d.r) { d.n = 0; d.r = now + 60000; }
  d.n++;
  _lim.set(ip, d);
  return d.n <= max;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin',  'https://qatar-standers.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') return res.status(204).end();

  const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for']?.split(',')[0] || 'x';
  if (!allowed(ip)) return res.status(429).json({ error: 'Too Many Requests' });

  const user_id = req.body?.user_id || req.query?.user_id;
  if (!user_id) {
    return res.status(200).json({ tier: 'free', features: FEATURES.free });
  }

  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('tier, status, valid_until')
      .eq('user_id', String(user_id).slice(0, 128))
      .single();

    if (error || !data) {
      return res.status(200).json({ tier: 'free', features: FEATURES.free });
    }

    const valid = data.status === 'active' && new Date(data.valid_until) > new Date();
    const tier  = valid ? (data.tier || 'free') : 'free';

    return res.status(200).json({
      tier,
      valid_until: data.valid_until,
      features:    FEATURES[tier] || FEATURES.free,
    });
  } catch (err) {
    console.error('[verify-subscription]', err.message);
    return res.status(200).json({ tier: 'free', features: FEATURES.free });
  }
}
