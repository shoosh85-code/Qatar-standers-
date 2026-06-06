import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

const BASE_URL = __ENV.BASE_URL || 'https://qatar-standers.vercel.app';
const USER_TIER = __ENV.USER_TIER || 'free';

export const options = {
  vus: 8,
  duration: '90s',
  thresholds: {
    http_req_duration: ['p(95)<8000'],
  },
};

const rateLimited = new Counter('rate_limited_429');

export default function () {
  const res = http.post(
    `${BASE_URL}/api/vision-proxy`,
    JSON.stringify({
      question: 'حلل هذا المستند',
      mimeType: 'image/jpeg',
      imageBase64: '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8U',
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        'x-user-tier': USER_TIER,
      },
      timeout: '15s',
    }
  );

  if (res.status === 429) rateLimited.add(1);

  check(res, {
    'status is 200 or 429': (r) => r.status === 200 || r.status === 429,
    '429 has Retry-After': (r) => r.status !== 429 || r.headers['Retry-After'] !== undefined,
  });

  sleep(1);
}

export function handleSummary(data) {
  const reqs = data.metrics.http_reqs?.values?.count || 0;
  const rl = data.metrics.rate_limited_429?.values?.count || 0;
  const p95 = data.metrics.http_req_duration?.values?.['p(95)'] || 0;

  console.log('=== vision-proxy Rate Limit Test ===');
  console.log(`Total Requests : ${reqs}`);
  console.log(`Rate Limited   : ${rl} (${((rl/reqs)*100).toFixed(1)}%)`);
  console.log(`P95 Latency    : ${Math.round(p95)}ms`);
  console.log(`Free Limit     : 3 req/min — ${rl > 0 ? '✅ يعمل' : '❌ لا يعمل'}`);

  return { 'results/vision-proxy.json': JSON.stringify(data) };
}
