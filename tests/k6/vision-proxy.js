import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

const rateLimited = new Counter('rate_limited');

export const options = {
  vus: 5,
  duration: '1m',
  thresholds: {
    'rate_limited': ['count>0'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'https://qatar-standers.vercel.app';
const USER_TIER = __ENV.USER_TIER || 'free';

// صورة 1x1 PNG صغيرة جداً
const TINY_IMAGE = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

export default function () {
  const res = http.post(
    `${BASE_URL}/api/vision-proxy`,
    JSON.stringify({ image: TINY_IMAGE, mimeType: 'image/png', mode: 'wall-detect' }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://qatar-standers.vercel.app',
        'x-user-tier': USER_TIER,
      },
      timeout: '12s',
    }
  );

  if (res.status === 429) rateLimited.add(1);

  // Hobby plan: 504 timeout مقبول ومتوقع
  check(res, {
    'responded (200/429/504)': (r) => [200, 429, 504].includes(r.status),
  });

  sleep(0.5);
}

export function handleSummary(data) {
  const total = data.metrics.http_reqs?.values?.count || 0;
  const rl    = data.metrics.rate_limited?.values?.count || 0;
  console.log('=== vision-proxy Rate Limit Test ===');
  console.log(`Total Requests : ${total}`);
  console.log(`Rate Limited   : ${rl} (${total ? Math.round(rl/total*100) : 0}%)`);
  console.log(`P95 Latency    : ${Math.round(data.metrics.http_req_duration?.values?.['p(95)'] || 0)}ms`);
  console.log(`Free Limit     : 3 req/min — ${rl > 0 ? '✅ يعمل' : '⚠️ لم يصل للحد بعد'}`);
  return { 'results/vision-proxy.json': JSON.stringify(data) };
}
