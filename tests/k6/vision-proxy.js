import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

const rateLimited = new Counter('rate_limited_429');
const errors500   = new Counter('server_errors_500');

export const options = {
  stages: [
    { duration: '20s', target: 25 },
    { duration: '40s', target: 100 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    // 429 هو rate limiting متوقع — ليس فشلاً حقيقياً
    // الفشل الحقيقي = 500 فقط
    http_req_duration:   ['p(95)<15000'],
    server_errors_500:   ['count<5'],
  },
};

const BASE_URL  = __ENV.BASE_URL  || 'https://qatar-standers.vercel.app';
const USER_TIER = __ENV.USER_TIER || 'free';
const TINY_IMAGE = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

export default function () {
  const res = http.post(
    `${BASE_URL}/api/vision-proxy`,
    JSON.stringify({ image: TINY_IMAGE, mimeType: 'image/png', mode: 'wall-detect' }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Origin':  'https://qatar-standers.vercel.app',
        'Referer': 'https://qatar-standers.vercel.app/',
        'x-user-tier': USER_TIER,
        'X-Admin-Token': __ENV.ADMIN_SECRET || 'k6-test',
      },
      timeout: '13s',
    }
  );

  if (res.status === 429) rateLimited.add(1);
  if (res.status === 500) errors500.add(1);

  check(res, {
    'not server error': (r) => r.status !== 500,
    'responded':        (r) => r.status !== 0,
  });

  sleep(0.5);
}

export function handleSummary(data) {
  const reqs = data.metrics.http_reqs?.values?.count || 0;
  const rl   = data.metrics.rate_limited_429?.values?.count || 0;
  const err  = data.metrics.server_errors_500?.values?.count || 0;
  const p95  = data.metrics.http_req_duration?.values?.['p(95)'] || 0;

  console.log('=== vision-proxy — 100 مستخدم ===');
  console.log(`إجمالي الطلبات  : ${reqs}`);
  console.log(`Rate Limited 429 : ${rl} (${reqs > 0 ? ((rl/reqs)*100).toFixed(1) : 0}%)`);
  console.log(`أخطاء 500        : ${err}`);
  console.log(`P95 Latency      : ${Math.round(p95)}ms`);
  console.log(`الحكم            : ${err === 0 ? '✅ لم ينهر' : '❌ انهار'}`);

  return {};
}
