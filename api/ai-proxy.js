// /api/ai-proxy.js — QatarSpec Pro v2.5.2
// Gemini 2.5 Flash + IP Rate Limiting + Full Responses

export const config = { runtime: 'edge' };

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Api-Key',
};

// ══════════════════════════════════════════════════════════════
// RATE LIMITING — Simple in-memory counter (Edge KV)
// Uses Vercel KV if available, fallback to in-memory map
// ══════════════════════════════════════════════════════════════
const ipCounters = new Map();  // fallback: in-memory (per-instance)
const FREE_LIMIT = 5;
const PRO_LIMIT  = 500;

function getTodayStr() {
  return new Date().toISOString().slice(0, 10); // "2026-04-23"
}

function getRateKey(ip) {
  return `rl:${getTodayStr()}:${ip}`;
}

// Check and increment rate limit
// Returns { allowed: bool, count: number, limit: number }
async function checkRateLimit(ip, isProUser) {
  const limit = isProUser ? PRO_LIMIT : FREE_LIMIT;
  const key = getRateKey(ip);

  // Try Vercel KV
  if (typeof process !== 'undefined' && process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const kvBase = process.env.KV_REST_API_URL;
      const kvToken = process.env.KV_REST_API_TOKEN;

      // GET current count
      const getRes = await fetch(`${kvBase}/get/${encodeURIComponent(key)}`, {
        headers: { Authorization: `Bearer ${kvToken}` },
      });
      const getData = await getRes.json();
      const current = parseInt(getData.result || '0');

      if (current >= limit) {
        return { allowed: false, count: current, limit };
      }

      // INCR and set TTL 24h
      await fetch(`${kvBase}/incr/${encodeURIComponent(key)}`, {
        headers: { Authorization: `Bearer ${kvToken}` },
      });
      await fetch(`${kvBase}/expire/${encodeURIComponent(key)}/86400`, {
        headers: { Authorization: `Bearer ${kvToken}` },
      });
      return { allowed: true, count: current + 1, limit };
    } catch (err) {
      console.error('[rate-limit] KV error:', err.message);
      // Fall through to in-memory
    }
  }

  // Fallback: in-memory (resets on cold start — acceptable for edge)
  const current = ipCounters.get(key) || 0;
  if (current >= limit) {
    return { allowed: false, count: current, limit };
  }
  ipCounters.set(key, current + 1);
  // Cleanup old keys periodically
  if (ipCounters.size > 5000) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    for (const k of ipCounters.keys()) {
      if (k.includes(yesterday)) ipCounters.delete(k);
    }
  }
  return { allowed: true, count: current + 1, limit };
}

// ══════════════════════════════════════════════════════════════
// GEMINI API CALL
// ══════════════════════════════════════════════════════════════
async function callGemini(messages, maxTokens = 2000) {
  const apiKey = process.env.GEMINI_KEY;
  if (!apiKey) throw new Error('GEMINI_KEY not configured');

  // Use gemini-2.0-flash as primary (fast + stable)
  const model = 'gemini-2.0-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  // Convert messages format to Gemini format
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const body = {
    contents,
    generationConfig: {
      maxOutputTokens: maxTokens || 2000,
      temperature: 0.2,
      topP: 0.85,
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
    ],
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 28000); // 28s timeout

  let res;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!res.ok) {
    const errText = await res.text();
    // Try gemini-2.5-flash if 2.0 fails
    if (res.status === 429 || res.status === 503) {
      throw new Error(`Gemini ${model} quota: ${res.status}`);
    }
    throw new Error(`Gemini error ${res.status}: ${errText.slice(0, 200)}`);
  }

  const data = await res.json();
  const candidate = data.candidates?.[0];

  if (!candidate) {
    throw new Error('No candidates in Gemini response');
  }

  if (candidate.finishReason === 'SAFETY') {
    throw new Error('Gemini blocked by safety filters');
  }

  const text = candidate.content?.parts?.[0]?.text || '';
  if (!text) {
    throw new Error(`Empty response (finishReason: ${candidate.finishReason})`);
  }

  return {
    content: [{ type: 'text', text }],
    model,
    usage: {
      input_tokens: data.usageMetadata?.promptTokenCount || 0,
      output_tokens: data.usageMetadata?.candidatesTokenCount || 0,
    },
  };
}

// ══════════════════════════════════════════════════════════════
// MAIN HANDLER
// ══════════════════════════════════════════════════════════════
export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }

  // ── Get client IP ──
  const ip =
    req.headers.get('x-real-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('cf-connecting-ip') ||
    'unknown';

  // ── Parse body ──
  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }

  // ── Detect Pro user from token (basic check) ──
  const authHeader = req.headers.get('Authorization') || '';
  const isProUser = authHeader.startsWith('Bearer pro-') || body.pro === true;

  // ── Rate Limit ──
  const rl = await checkRateLimit(ip, isProUser);
  if (!rl.allowed) {
    return new Response(
      JSON.stringify({
        error: `تجاوزت الحد اليومي (${rl.limit} بحث). اشترك في Pro للبحث غير المحدود.`,
        code: 'RATE_LIMIT',
        count: rl.count,
        limit: rl.limit,
      }),
      {
        status: 429,
        headers: {
          ...CORS,
          'Content-Type': 'application/json',
          'Retry-After': '86400',
          'X-RateLimit-Limit': String(rl.limit),
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  // ── Call AI ──
  const { messages, max_tokens, system } = body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: 'messages array required' }), {
      status: 400,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }

  // Inject system prompt into first message if provided
  const finalMessages = system
    ? [{ role: 'user', content: `[SYSTEM: ${system}]\n\n${messages[0]?.content || ''}` }, ...messages.slice(1)]
    : messages;

  const tokenLimit = Math.min(max_tokens || 2500, 3000); // max 3000 tokens

  // Retry once on 429
  async function callWithRetry(msgs, tokens, retries = 1) {
    try {
      return await callGemini(msgs, tokens);
    } catch (err) {
      if (retries > 0 && (err.message?.includes('429') || err.message?.includes('quota'))) {
        await new Promise(r => setTimeout(r, 3000)); // wait 3s
        return callWithRetry(msgs, tokens, retries - 1);
      }
      throw err;
    }
  }

  try {
    const result = await callWithRetry(finalMessages, tokenLimit);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        ...CORS,
        'Content-Type': 'application/json',
        'X-RateLimit-Limit': String(rl.limit),
        'X-RateLimit-Remaining': String(rl.limit - rl.count),
      },
    });
  } catch (err) {
    console.error('[ai-proxy] Gemini error:', err.message);

    // Try gemini-2.5-flash as fallback
    if (err.message.includes('quota') || err.message.includes('2.0')) {
      try {
        const apiKey = process.env.GEMINI_KEY;
        const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        const fallbackBody = {
          contents: finalMessages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
          })),
          generationConfig: { maxOutputTokens: tokenLimit, temperature: 0.2 },
        };
        const fb = await fetch(fallbackUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fallbackBody),
        });
        if (fb.ok) {
          const fbData = await fb.json();
          const text = fbData.candidates?.[0]?.content?.parts?.[0]?.text || '';
          if (text) {
            return new Response(
              JSON.stringify({ content: [{ type: 'text', text }], model: 'gemini-2.5-flash' }),
              { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } }
            );
          }
        }
      } catch (fbErr) {
        console.error('[ai-proxy] Fallback also failed:', fbErr.message);
      }
    }

    const status = err.message.includes('abort') || err.message.includes('timeout') ? 504 : 502;
    return new Response(
      JSON.stringify({
        error: err.message.includes('abort')
          ? 'انتهت مهلة الاتصال — حاول مرة أخرى'
          : `خطأ في خدمة AI: ${err.message.slice(0, 100)}`,
        code: 'AI_ERROR',
      }),
      { status, headers: { ...CORS, 'Content-Type': 'application/json' } }
    );
  }
}
