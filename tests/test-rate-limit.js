import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

const BASE_URL = 'https://qatar-standers.vercel.app';

const got429 = new Counter('rate_limit_hits');
const got200 = new Counter('success_hits');
const gotOther = new Counter('other_hits');

export const options = {
  scenarios: {
    free_user_burst: {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 10,
      maxDuration: '60s',
    },
  },
  // لا يوجد threshold — فقط تقرير
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
      timeout: '15s',
    }
  );

  if (res.status === 429) {
    got429.add(1);
    console.log(`✅ 429 at iteration ${__ITER + 1} — rate limiting works`);
  } else if (res.status === 200) {
    got200.add(1);
    console.log(`📥 200 at iteration ${__ITER + 1}`);
  } else {
    gotOther.add(1);
    console.log(`⚠️ Status ${res.status} at iteration ${__ITER + 1} — body: ${res.body?.substring(0,100)}`);
  }

  check(res, {
    'response received': (r) => r.status > 0,
  });

  sleep(0.5);
}
