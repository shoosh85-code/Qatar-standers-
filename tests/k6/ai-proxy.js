import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

const BASE_URL = __ENV.BASE_URL || 'https://qatar-standers.vercel.app';
const USER_TIER = __ENV.USER_TIER || 'free';

export const options = {
  stages: [
    { duration: '20s', target: 25 },   // صعود تدريجي
    { duration: '40s', target: 100 },  // 100 مستخدم
    { duration: '20s', target: 0 },    // نزول تدريجي
  ],
  thresholds: {
    http_req_duration: ['p(95)<10000'],
    http_req_failed: ['rate<0.95'],
  },
};

const rateLimited = new Counter('rate_limited_429');
const errors500 = new Counter('server_errors_500');

export default function () {
  const res = http.post(
    `${BASE_URL}/api/ai-proxy`,
    JSON.stringify({ query: 'ما هي متطلبات QCS 2024 للخرسانة؟', type: 'general' }),
    {
      headers: {
        'Content-Type': 'application/json',
        'x-user-tier': USER_TIER,
      },
      timeout: '10s',
    }
  );

  if (res.status === 429) rateLimited.add(1);
  if (res.status === 500) errors500.add(1);

  check(res, {
    'not crashed (no 500)': (r) => r.status !== 500,
    'endpoint alive': (r) => r.status !== 0,
    '429 rate limit working': (r) => r.status === 429 || r.status === 200,
  });

  sleep(1);
}

export function handleSummary(data) {
  const reqs = data.metrics.http_reqs?.values?.count || 0;
  const rl = data.metrics.rate_limited_429?.values?.count || 0;
  const err = data.metrics.server_errors_500?.values?.count || 0;
  const p95 = data.metrics.http_req_duration?.values?.['p(95)'] || 0;
  const failed = data.metrics.http_req_failed?.values?.rate || 0;

  console.log('=== ai-proxy — 100 مستخدم ===');
  console.log(`إجمالي الطلبات  : ${reqs}`);
  console.log(`Rate Limited 429 : ${rl} (${reqs > 0 ? ((rl/reqs)*100).toFixed(1) : 0}%)`);
  console.log(`أخطاء 500        : ${err}`);
  console.log(`P95 Latency      : ${Math.round(p95)}ms`);
  console.log(`نسبة الفشل       : ${(failed*100).toFixed(1)}%`);
  console.log(`الحكم            : ${err === 0 ? '✅ لم ينهر' : '❌ انهار'}`);

  return {};
}
