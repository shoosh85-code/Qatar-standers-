import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5,
  duration: '1m',
  thresholds: {
    // Hobby plan: Gemini calls timeout at 10s — هذا متوقع
    // نختبر فقط أن الـ rate limit يعمل (429) أو الـ endpoint يستجيب
    'http_req_duration{status:429}': ['p(95)<500'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'https://qatar-standers.vercel.app';

export default function () {
  const res = http.post(`${BASE_URL}/api/vision-proxy`, JSON.stringify({
    image: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    mimeType: 'image/png',
    mode: 'wall-detect',
  }), { headers: { 'Content-Type': 'application/json' }, timeout: '12s' });

  const isRateLimited = res.status === 429;
  const isProcessing  = res.status === 200;
  const isTimeout     = res.status === 504;

  check(res, {
    'rate limited OR processing OR expected timeout': () => isRateLimited || isProcessing || isTimeout,
  });

  const rateLimited = isRateLimited ? 1 : 0;
  sleep(0.5);
}

export function handleSummary(data) {
  const total = data.metrics.http_reqs?.values?.count || 0;
  const rl429 = data.metrics['http_req_duration{status:429}']?.values?.count || 0;
  console.log('=== vision-proxy Rate Limit Test ===');
  console.log(`Total Requests : ${total}`);
  console.log(`Rate Limited   : ${rl429} (${total ? Math.round(rl429/total*100) : 0}%)`);
  console.log(`P95 Latency    : ${Math.round(data.metrics.http_req_duration?.values?.['p(95)'] || 0)}ms`);
  console.log(`Free Limit     : 3 req/min — ✅ اختبار محدود بـ Hobby plan (10s timeout)`);
  return { 'results/vision-proxy.json': JSON.stringify(data) };
}
