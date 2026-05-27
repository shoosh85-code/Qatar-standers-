// api/health.js — QatarSpec Pro Health Check Endpoint
// Returns JSON status for monitoring and uptime checks

export const config = { runtime: 'edge' };

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS });
  }

  const json = JSON.stringify({
    status: 'ok',
    service: 'QatarSpec Pro API',
    version: '3.2.0',
    timestamp: new Date().toISOString(),
    endpoints: [
      '/api/ai-proxy',
      '/api/verify-pro',
      '/api/qcs-search',
      '/api/vision-proxy',
    ],
  });

  return new Response(json, { status: 200, headers: CORS });
}
