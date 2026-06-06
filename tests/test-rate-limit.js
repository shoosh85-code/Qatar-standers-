import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

const BASE_URL = 'https://qatar-standers.vercel.app';

const got429 = new Counter('rate_limit_hits');
const got200 = new Counter('success_hits');

export const options = {
  scenarios: {
    free_user_burst: {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 10,
      maxDuration: '30s',
    },
  },
  thresholds: {
    'rate_limit_hits': ['count>0'],
  },
};

export default function () {
  const res = http.post(
    `${BASE_URL}/api/ai-proxy`,
    JSON.stringify({ query: 'ما هي متطلبات الخرسانة في QCS 2024؟', type: 'general' }),
    {
      headers: {
        'Content-Type': 'application/json',
        'X-User-Tier': 'free',
      },
      timeout: '10s',
    }
  );

  if (res.status === 429) {
    got429.add(1);
    console.log(`✅ Rate limit working: 429 at iteration ${__ITER + 1}`);
  } else if (res.status === 200) {
    got200.add(1);
    console.log(`📥 Success: 200 at iteration ${__ITER + 1}`);
  } else {
    console.log(`⚠️ Unexpected status: ${res.status} — ${res.body}`);
  }

  check(res, {
    'status is 200 or 429': (r) => [200, 429].includes(r.status),
  });

  sleep(0.5);
}
