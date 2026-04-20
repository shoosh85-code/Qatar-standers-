// middleware/rateLimit.js — In-memory rate limiting (no KV needed)
const store = new Map();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 20;      // 20 requests per minute per IP

export function rateLimit(req, res) {
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || 
             req.headers['x-real-ip'] || 'unknown';
  const now = Date.now();
  const key = `${ip}`;

  if (!store.has(key)) {
    store.set(key, { count: 1, start: now });
    return true; // allowed
  }

  const entry = store.get(key);

  if (now - entry.start > WINDOW_MS) {
    store.set(key, { count: 1, start: now });
    return true; // window reset
  }

  if (entry.count >= MAX_REQUESTS) {
    res.status(429).json({
      error: 'تجاوزت الحد المسموح. حاول بعد دقيقة.',
      code: 'RATE_LIMITED',
      retryAfter: Math.ceil((entry.start + WINDOW_MS - now) / 1000)
    });
    return false; // blocked
  }

  entry.count++;
  return true; // allowed
}
