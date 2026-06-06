import http from 'k6/http';
import { check, group, sleep } from 'k6';

const BASE_URL = 'https://qatar-standers.vercel.app';

export const options = {
  vus: 5,
  duration: '1m',
  thresholds: {
    'http_req_duration{endpoint:ai-proxy}':     ['p95<5000'],
    'http_req_duration{endpoint:vision-proxy}': ['p95<8000'],
    'http_req_duration{endpoint:qcs-search}':   ['p95<3000'],
  },
};

export default function () {
  group('ai-proxy', () => {
    const res = http.post(
      `${BASE_URL}/api/ai-proxy`,
      JSON.stringify({ query: 'متطلبات الإسفلت في QCS 2024', type: 'general' }),
      {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: 'ai-proxy' },
        timeout: '15s',
      }
    );
    check(res, {
      'ai-proxy 200/429': (r) => [200, 429].includes(r.status),
      'ai-proxy < 5s':    (r) => r.timings.duration < 5000,
    });
  });

  sleep(1);

  group('qcs-search', () => {
    const res = http.post(
      `${BASE_URL}/api/qcs-search`,
      JSON.stringify({ query: 'concrete strength requirements' }),
      {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: 'qcs-search' },
        timeout: '10s',
      }
    );
    check(res, {
      'qcs-search not 500': (r) => r.status !== 500,
    });
  });

  sleep(1);

  group('verify-pro', () => {
    const res = http.post(
      `${BASE_URL}/api/verify-pro`,
      JSON.stringify({}),
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer invalid-token-test',
        },
        tags: { endpoint: 'verify-pro' },
        timeout: '5s',
      }
    );
    check(res, {
      'verify-pro not 500': (r) => r.status !== 500,
    });
  });

  sleep(2);
}
