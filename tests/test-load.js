import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';

const BASE_URL = 'https://qatar-standers.vercel.app';

const aiDuration  = new Trend('ai_proxy_duration');
const aiErrorRate = new Rate('ai_error_rate');

export const options = {
  stages: [
    { duration: '30s', target: 5  },
    { duration: '1m',  target: 20 },
    { duration: '30s', target: 0  },
  ],
  thresholds: {
    'http_req_duration': ['p95<5000'],
    'http_req_failed':   ['rate<0.05'],
    'ai_proxy_duration': ['p90<4000'],
  },
};

export default function () {
  const aiRes = http.post(
    `${BASE_URL}/api/ai-proxy`,
    JSON.stringify({ query: 'ما هو الحد الأدنى لتغطية الحديد في QCS 2024؟', type: 'qcs-search' }),
    { headers: { 'Content-Type': 'application/json' }, timeout: '15s' }
  );

  aiDuration.add(aiRes.timings.duration);
  aiErrorRate.add(aiRes.status >= 500);

  check(aiRes, {
    'ai-proxy: status ok': (r) => [200, 429].includes(r.status),
    'ai-proxy: not 500':   (r) => r.status !== 500,
    'ai-proxy: has body':  (r) => r.body && r.body.length > 0,
  });

  sleep(2);
}
