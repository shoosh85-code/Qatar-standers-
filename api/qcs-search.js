// /api/qcs-search.js — QatarSpec Pro v2.3.0
// Vector + FTS Search in QCS 2024 Supabase database
// Edge Runtime — consistent with ai-proxy.js
// v2.3.0: +Rate Limiting per PROTOCOL 6 (Free=10/min, Pro=100/min, Global=200/min/IP)

export const config = { runtime: 'edge' };

// ── Rate Limiting (Edge-compatible in-memory) ────────────────────────────────
// SYNC-WITH: api/rate-limit.js LIMITS.free['qcs-search']=10, LIMITS.pro['qcs-search']=100
// حدود PROTOCOL 6: Free=10/دقيقة، Pro=100/دقيقة، Global=200/دقيقة لكل IP
const _rl = new Map();
function checkRateLimit(ip, isPro) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const limit = isPro ? 100 : 10;
  const globalLimit = 200;

  // Global check
  const gKey = `global:${ip}`;
  const gEntry = _rl.get(gKey);
  if (!gEntry || now - gEntry.ts > windowMs) {
    _rl.set(gKey, { count: 1, ts: now });
  } else if (gEntry.count >= globalLimit) {
    const retryAfter = Math.ceil((windowMs - (now - gEntry.ts)) / 1000);
    return { allowed: false, retryAfter, remaining: 0, reason: 'global' };
  } else {
    gEntry.count++;
  }

  // Tier check
  const key = `${ip}:${isPro ? 'pro' : 'free'}`;
  const entry = _rl.get(key);
  if (!entry || now - entry.ts > windowMs) {
    _rl.set(key, { count: 1, ts: now });
    return { allowed: true, remaining: limit - 1 };
  }
  if (entry.count >= limit) {
    const retryAfter = Math.ceil((windowMs - (now - entry.ts)) / 1000);
    return { allowed: false, retryAfter, remaining: 0 };
  }
  entry.count++;
  return { allowed: true, remaining: limit - entry.count };
}

const CORS_ORIGIN = process.env.APP_URL || 'https://qatar-standers.vercel.app';

function makeCors() {
  return {
    'Access-Control-Allow-Origin': CORS_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
    'Vary': 'Origin',
  };
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...makeCors(), 'Content-Type': 'application/json' },
  });
}

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: makeCors() });
  }
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405);

  // ── Rate Limit Check (PROTOCOL 6) ──────────────────────────────
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || '0.0.0.0';
  const authHeader = req.headers.get('authorization') || '';
  const cookieHeader = req.headers.get('cookie') || '';
  const hasProToken = authHeader.startsWith('Bearer ') || cookieHeader.includes('qs_pro=');
  const rl = checkRateLimit(ip, hasProToken);
  if (!rl.allowed) {
    return new Response(JSON.stringify({
      error: 'Too Many Requests',
      retryAfter: rl.retryAfter,
      message: `حد الطلبات: ${hasProToken ? '100' : '10'} طلب/دقيقة. انتظر ${rl.retryAfter} ثانية.`
    }), {
      status: 429,
      headers: {
        ...makeCors(),
        'Content-Type': 'application/json',
        'Retry-After': String(rl.retryAfter),
        'X-RateLimit-Remaining': '0'
      }
    });
  }

  let body;
  try { body = await req.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }

  const { query, limit = 6 } = body;
  if (!query || String(query).trim().length < 2) return json({ error: 'Query too short' }, 400);

  const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPA_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const GEMINI_KEY = process.env.GEMINI_KEY;

  if (!SUPA_URL || !SUPA_KEY) {
    return json({ results: [], query, count: 0, method: 'none', note: 'DB not configured' });
  }

  try {
    let chunks = [];
    let searchMethod = 'fts';

    // 1. Try vector search (Gemini embeddings)
    if (GEMINI_KEY) {
      try {
        const embedRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${GEMINI_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: 'models/text-embedding-004', content: { parts: [{ text: String(query) }] } }),
            signal: AbortSignal.timeout(5000),
          }
        );
        if (embedRes.ok) {
          const emb = (await embedRes.json())?.embedding?.values;
          if (emb?.length) {
            const vecRes = await fetch(`${SUPA_URL}/rest/v1/rpc/search_qcs`, {
              method: 'POST',
              headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${SUPA_KEY}`, 'Content-Type': 'application/json' },
              body: JSON.stringify({ query_embedding: emb, match_count: limit, similarity_threshold: 0.4 }),
              signal: AbortSignal.timeout(8000),
            });
            if (vecRes.ok) {
              const vd = await vecRes.json();
              if (Array.isArray(vd) && vd.length > 0) { chunks = vd; searchMethod = 'vector'; }
            }
          }
        }
      } catch(e) { if (process.env.NODE_ENV !== 'production') console.log('[qcs-search] vector fail:', e.message); }
    }

    // 2. Fallback: FTS (ILIKE)
    if (!chunks.length) {
      const words = String(query).trim().replace(/[\u064B-\u065F]/g, '').split(/\s+/).filter(w => w.length > 2).slice(0, 6);
      if (!words.length) return json({ results: [], query, count: 0, method: 'none' });
      const filters = words.map(w => `content.ilike.*${w}*`).join(',');
      const ftsRes = await fetch(
        `${SUPA_URL}/rest/v1/qcs_chunks?or=(${filters})&select=id,source_file,section_name,part_name,page_num,content&limit=${limit}&order=char_count.desc`,
        { headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${SUPA_KEY}` }, signal: AbortSignal.timeout(8000) }
      );
      if (ftsRes.ok) { const fd = await ftsRes.json(); if (Array.isArray(fd)) chunks = fd; }
    }

    if (!chunks.length) return json({ results: [], query, count: 0, method: searchMethod });

    const results = chunks.slice(0, limit).map(c => ({
      id: c.id,
      source: (c.source_file || 'QCS 2024').replace(/Copy of /g, '').trim(),
      section: c.section_name || '',
      part: c.part_name || '',
      page: c.page_num || '',
      content: c.content || '',
      similarity: c.similarity ? Math.round(c.similarity * 100) + '%' : null,
    }));

    return json({ results, query, count: results.length, method: searchMethod });

  } catch(err) {
    console.error('[qcs-search] Error:', err.message);
    return json({ error: err.message, results: [], count: 0 }, 500);
  }
}
