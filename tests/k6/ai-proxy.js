import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

const BASE_URL = __ENV.BASE_URL || 'https://qatar-standers.vercel.app';
const USER_TIER = __ENV.USER_TIER || 'free';

export const options = {
  stages: [
    { duration: '20s', target: 25 },
    { duration: '40s', target: 100 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<10000'],
    // http_req_failed مُزال: 429 = rate limiting متوقع، ليس فشلاً
    server_errors_500: ['count<5'],
  },
};

const rateLimited = new Counter('rate_limited_429');
const errors500   = new Counter('server_errors_500');

export default function () {
  // الكود يتوقع messages array — ليس query string
  const payload = JSON.stringify({
    messages: [{ role: 'user', content: 'ما هي متطلبات QCS 2024 للخرسانة؟' }],
    max_tokens: 100,
  });

  const res = http.post(
    `${BASE_URL}/api/ai-proxy`,
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
        // Origin مضمون — الكود يتحقق منه
        'Origin':  'https://qatar-standers.vercel.app',
        'Referer': 'https://qatar-standers.vercel.app/',
        'x-user-tier': USER_TIER,
      },
      timeout: '12s',
    }
  );

  if (res.status === 429) rateLimited.add(1);
  if (res.status === 500) errors500.add(1);

  check(res, {
    'not 401 unauthorized': (r) => r.status !== 401,
    'not crashed (no 500)': (r) => r.status !== 500,
    'endpoint alive':       (r) => r.status !== 0,
    '200 or 429':           (r) => r.status === 200 || r.status === 429,
  });

  sleep(1);
}

export function handleSummary(data) {
  const reqs   = data.metrics.http_reqs?.values?.count || 0;
  const rl     = data.metrics.rate_limited_429?.values?.count || 0;
  const err    = data.metrics.server_errors_500?.values?.count || 0;
  const p95    = data.metrics.http_req_duration?.values?.['p(95)'] || 0;
  const failed = data.metrics.http_req_failed?.values?.rate || 0;

  console.log('=== ai-proxy — 100 مستخدم ===');
  console.log(`إجمالي الطلبات  : ${reqs}`);
  console.log(`Rate Limited 429 : ${rl} (${reqs > 0 ? ((rl/reqs)*100).toFixed(1) : 0}%)`);
  console.log(`أخطاء 500        : ${err}`);
  console.log(`P95 Latency      : ${Math.round(p95)}ms`);
  console.log(`نسبة الفشل       : ${(failed*100).toFixed(1)}%`);
  console.log(`الحكم            : ${err <= 2 ? '✅ لم ينهر' : '❌ انهار'} (${err} خطأ 500)`);

  return {};
}
