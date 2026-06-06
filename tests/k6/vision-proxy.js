import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

const BASE_URL = __ENV.BASE_URL || 'https://qatar-standers.vercel.app';
const USER_TIER = __ENV.USER_TIER || 'free';

export const options = {
  vus: 5,
  duration: '60s',
  thresholds: {
    http_req_duration: ['p(95)<10000'],
  },
};

const rateLimited = new Counter('rate_limited_429');

export default function () {
  // اختبار بسيط — نتحقق فقط من الـ rate limit بدون إرسال صورة حقيقية
  const res = http.post(
    `${BASE_URL}/api/vision-proxy`,
    JSON.stringify({
      question: 'test',
      mimeType: 'image/jpeg',
      imageBase64: 'dGVzdA==', // "test" in base64 — صغير جداً يرجع خطأ سريع
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        'x-user-tier': USER_TIER,
      },
      timeout: '8s',
    }
  );

  if (res.status === 429) rateLimited.add(1);

  check(res, {
    'endpoint is alive': (r) => r.status !== 0,
    'not 500 error': (r) => r.status !== 500,
    '429 has Retry-After': (r) =>
      r.status !== 429 || r.headers['Retry-After'] !== undefined,
  });

  sleep(1);
}

export function handleSummary(data) {
  const reqs = data.metrics.http_reqs?.values?.count || 0;
  const rl = data.metrics.rate_limited_429?.values?.count || 0;
  const p95 = data.metrics.http_req_duration?.values?.['p(95)'] || 0;

  console.log('=== vision-proxy Rate Limit Test ===');
  console.log(`Total Requests : ${reqs}`);
  console.log(`Rate Limited   : ${rl} (${reqs > 0 ? ((rl / reqs) * 100).toFixed(1) : 0}%)`);
  console.log(`P95 Latency    : ${Math.round(p95)}ms`);
  console.log(`Free Limit     : 3 req/min — ${rl > 0 ? '✅ يعمل' : '⚠️ لم يصل للحد بعد'}`);

  return {};
}
