// api/ai-proxy.js — QatarSpec Pro
// FIX W1: CORS restricted to production domain only (was: wildcard *)
// FIX W2: ANTHROPIC_API_KEY presence guard with clear error

const ALLOWED_ORIGIN = 'https://qatar-standers.vercel.app';

export default async function handler(req, res) {
  const origin = req.headers.origin || '';

  // ── CORS ──────────────────────────────────────────────────────────────
  // W1 FIX: restrict to known origin instead of '*'
  if (origin === ALLOWED_ORIGIN || origin === '') {
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  } else {
    // Reject unknown origins silently (no CORS headers = browser blocks it)
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // ── Preflight ──────────────────────────────────────────────────────────
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ── Method guard ───────────────────────────────────────────────────────
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── W2 FIX: Env var guard ──────────────────────────────────────────────
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('[ai-proxy] ANTHROPIC_API_KEY is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // ── Proxy to Anthropic ─────────────────────────────────────────────────
  try {
    const body = req.body;

    // Basic request validation
    if (!body || !body.messages || !Array.isArray(body.messages)) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    const data = await anthropicRes.json();

    if (!anthropicRes.ok) {
      console.error('[ai-proxy] Anthropic error:', anthropicRes.status, data);
      return res.status(anthropicRes.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('[ai-proxy] Unexpected error:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
