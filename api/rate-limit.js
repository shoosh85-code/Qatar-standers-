// api/rate-limit.js
// QatarSpec Pro — Rate Limiting Module v2.0
// يستخدم Vercel KV مع fallback إلى in-memory Map
// ESM format — متوافق مع "type": "module" في package.json

// ── Vercel KV (اختياري) ──────────────────────────────────────────────────────
let kv = null;
try {
  const kvMod = await import('@vercel/kv');
  kv = kvMod.kv ?? null;
} catch {
  kv = null;
}

// ── In-memory fallback ────────────────────────────────────────────────────────
const memoryStore = new Map();
const WINDOW_MS               = 60 * 1000;
const MEMORY_CLEANUP_INTERVAL = 5 * 60 * 1000;

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of memoryStore.entries()) {
    if (now - entry.timestamp > MEMORY_CLEANUP_INTERVAL) memoryStore.delete(key);
  }
}, MEMORY_CLEANUP_INTERVAL);

// ── حدود الطلبات (Protocol 6) ────────────────────────────────────────────────
export const LIMITS = {
  free: {
    'ai-proxy':     5,
    'verify-pro':   3,
    'qcs-search':  10,
    'vision-proxy': 3,
    'enhance-en':   5,
    'export-pdf':   3,
  },
  pro: {
    'ai-proxy':     60,
    'verify-pro':   10,
    'qcs-search':  100,
    'vision-proxy': 30,
    'enhance-en':   60,
    'export-pdf':   30,
  },
  global: { perIp: 100 },
};

// ── Helpers ───────────────────────────────────────────────────────────────────
export function getIp(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    '0.0.0.0'
  );
}

async function checkWithKv(key, limit) {
  const count = parseInt(await kv.get(key) || '0', 10);
  if (count >= limit) {
    const ttl = await kv.pttl(key);
    return { allowed: false, retryAfter: Math.ceil((ttl > 0 ? ttl : WINDOW_MS) / 1000), remaining: 0 };
  }
  await kv.set(key, count + 1, { px: WINDOW_MS });
  return { allowed: true, remaining: limit - count - 1 };
}

function checkWithMemory(key, limit) {
  const now   = Date.now();
  const entry = memoryStore.get(key);
  if (!entry || now - entry.timestamp > WINDOW_MS) {
    memoryStore.set(key, { count: 1, timestamp: now });
    return { allowed: true, remaining: limit - 1 };
  }
  if (entry.count >= limit) {
    return { allowed: false, retryAfter: Math.ceil((WINDOW_MS - (now - entry.timestamp)) / 1000), remaining: 0 };
  }
  entry.count++;
  return { allowed: true, remaining: limit - entry.count };
}

// ── الدوال المُصدَّرة ─────────────────────────────────────────────────────────

/**
 * rateLimit — async، يستخدم KV أو in-memory
 * @param {object} req       - كائن الطلب
 * @param {string} tier      - 'free' | 'pro'
 * @param {string} endpoint  - اسم الـ endpoint بدون /api/
 */
export async function rateLimit(req, tier = 'free', endpoint = 'ai-proxy') {
  const ip          = getIp(req);
  const tierLimit   = LIMITS[tier]?.[endpoint] ?? LIMITS.free[endpoint] ?? 5;
  const globalLimit = LIMITS.global.perIp;
  const tierKey     = `rate:${tier}:${endpoint}:${ip}`;
  const globalKey   = `rate:global:${ip}`;

  try {
    if (kv) {
      const g = await checkWithKv(globalKey, globalLimit);
      if (!g.allowed) return { allowed: false, retryAfter: g.retryAfter, reason: 'global' };
      return await checkWithKv(tierKey, tierLimit);
    }
    throw new Error('no kv');
  } catch {
    const g = checkWithMemory(globalKey, globalLimit);
    if (!g.allowed) return { allowed: false, retryAfter: g.retryAfter, reason: 'global' };
    return checkWithMemory(tierKey, tierLimit);
  }
}

/**
 * checkRateLimit — sync (in-memory فقط)
 * للتوافق مع ai-proxy / vision-proxy / qcs-search / verify-pro
 * @param {string}  ip
 * @param {string}  endpoint
 * @param {boolean} isPro
 */
export function checkRateLimit(ip, endpoint = 'ai-proxy', isPro = false) {
  const tier      = isPro ? 'pro' : 'free';
  const tierLimit = LIMITS[tier]?.[endpoint] ?? (isPro ? 60 : 5);
  const result    = checkWithMemory(`rate:${tier}:${endpoint}:${ip}`, tierLimit);
  return {
    allowed:    result.allowed,
    limit:      tierLimit,
    count:      tierLimit - (result.remaining ?? 0),
    retryAfter: result.retryAfter ?? 0,
  };
}

/**
 * applyRateLimitHeaders — يضيف headers للـ response
 */
export function applyRateLimitHeaders(res, result) {
  res.setHeader('X-RateLimit-Remaining', result.remaining ?? 0);
  if (!result.allowed) {
    res.setHeader('Retry-After', result.retryAfter ?? 60);
    res.setHeader('X-RateLimit-Remaining', 0);
  }
}
