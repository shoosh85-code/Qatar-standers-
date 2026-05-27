// api/backend-info.js — QatarSpec Pro
// يُخبر الـ Frontend بأي SCAN_BACKEND مُفعَّل
// PROTOCOL 6: 30 req/min/IP

import { withRateLimit } from './rate-limit.js';

async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const backend    = process.env.SCAN_BACKEND || 'gemini-fallback';
  const backendUrl = process.env.BACKEND_URL;

  const labels = {
    'gemini-fallback': { name: 'Gemini AI',               accuracy: '±15%',  eta_min: 2  },
    'kiri':            { name: 'KIRI Engine',              accuracy: '±3%',   eta_min: 5  },
    'colmap-gsplat':   { name: 'COLMAP + Gaussian Splat',  accuracy: '±1cm',  eta_min: 10 },
  };

  const info = {
    backend,
    labels: labels[backend] || { name: backend, accuracy: 'غير معروف', eta_min: 5 },
    backend_url_configured: !!backendUrl,
    kiri_configured: !!process.env.KIRI_API_KEY && !!process.env.KIRI_API_ENDPOINT,
  };

  return res.status(200).json(info);
}

export default withRateLimit(handler, '/api/backend-info', { free: 30, pro: 60, global: 100 });
