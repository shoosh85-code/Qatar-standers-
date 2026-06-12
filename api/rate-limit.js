// api/rate-limit.js — QatarSpec Pro v2
// Inline fallback (no external deps) + enhanced tier support

const _store = new Map();
setInterval(() => { 
  const now = Date.now(); 
  for (const [k,v] of _store.entries()) { 
    if (v.resetAt < now) _store.delete(k); 
  } 
}, 60000);

// Endpoint limits per tier
const ENDPOINT_LIMITS = {
  'ai-proxy':     { free: 5,  pro: 60,  enterprise: 200, global: 100 },
  'qcs-search':   { free: 10, pro: 100, enterprise: 500, global: 200 },
  'vision-proxy': { free: 3,  pro: 30,  enterprise: 100, global: 50  },
  'blueprint':    { free: 3,  pro: 20,  enterprise: 50,  global: 30  },
  'chatbot':      { free: 10, pro: 100, enterprise: 500, global: 200 },
  'default':      { free: 20, pro: 100, enterprise: 500, global: 200 },
};

function _incr(key, windowMs) {
  const now = Date.now();
  const entry = _store.get(key) || { count: 0, resetAt: now + (windowMs || 60000) };
  entry.count++;
  _store.set(key, entry);
  return entry;
}

export function getIp(req) {
  if (req && req.headers) {
    if (typeof req.headers.get === 'function') {
      return (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
    }
    return (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
  }
  return 'unknown';
}

export async function checkRateLimit(ipOrReq, endpoint, tier) {
  const ip = typeof ipOrReq === 'string' ? ipOrReq : getIp(ipOrReq);
  const limits = ENDPOINT_LIMITS[endpoint] || ENDPOINT_LIMITS.default;
  const window = Math.floor(Date.now() / 60000);

  // Global IP limit
  const globalEntry = _incr(`rl:global:${ip}:${window}`);
  if (globalEntry.count > limits.global) {
    return { allowed: false, remaining: 0, retryAfter: 60, reason: 'global_limit' };
  }

  // Per-user/tier limit
  const userLimit = tier === 'enterprise' ? limits.enterprise : 
                    tier === 'pro' ? limits.pro : limits.free;
  const userEntry = _incr(`rl:${endpoint}:${ip}:${window}`);
  if (userEntry.count > userLimit) {
    return { 
      allowed: false, 
      remaining: 0, 
      retryAfter: 60, 
      reason: 'tier_limit',
      upgrade: tier === 'free',
      limit: userLimit
    };
  }

  return { 
    allowed: true, 
    remaining: userLimit - userEntry.count, 
    limit: userLimit,
    tier: tier || 'free'
  };
}

export async function rateLimit(req, tier, endpoint) {
  return checkRateLimit(getIp(req), endpoint || 'default', tier || 'free');
}

export function applyRateLimitHeaders(res, rl) {
  if (res && res.setHeader) {
    res.setHeader('X-RateLimit-Remaining', String(rl.remaining || 0));
    res.setHeader('X-RateLimit-Limit', String(rl.limit || 0));
    if (!rl.allowed) res.setHeader('Retry-After', String(rl.retryAfter || 60));
  }
}

export function rateLimitHeaders(rl) {
  return { 
    'X-RateLimit-Remaining': String(rl.remaining || 0),
    'X-RateLimit-Limit': String(rl.limit || 0)
  };
}

export function rateLimitResponse(rl, extraHeaders) {
  return new Response(JSON.stringify({ 
    error: 'Rate limit exceeded', 
    retryAfter: rl.retryAfter,
    upgrade: rl.upgrade,
    message_ar: rl.upgrade ? 
      'وصلت للحد المجاني — اشترك في Pro للحصول على حصة أكبر' : 
      'تجاوزت الحد — حاول بعد دقيقة'
  }), {
    status: 429,
    headers: { 
      'Content-Type': 'application/json', 
      'Retry-After': String(rl.retryAfter || 60),
      ...(extraHeaders || {}) 
    }
  });
}

export function withRateLimit(handler, endpoint, tier) {
  return async function(req, res) {
    const ip = getIp(req);
    const t = tier || req.headers?.['x-user-tier'] || 'free';
    const rl = await checkRateLimit(ip, endpoint || 'default', t);
    if (!rl.allowed) {
      if (res.setHeader) {
        res.setHeader('Retry-After', '60');
        res.setHeader('X-RateLimit-Remaining', '0');
      }
      return res.status(429).json({ 
        error: 'Rate limit exceeded', 
        retryAfter: 60,
        message_ar: 'تجاوزت الحد المسموح به'
      });
    }
    return handler(req, res);
  };
}
