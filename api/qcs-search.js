// /api/qcs-search.js — QatarSpec Pro v2.3.0
// Vector + FTS Search in QCS 2024 Supabase database
// Edge Runtime — consistent with ai-proxy.js
// v2.3.0: +Rate Limiting per PROTOCOL 6 (Free=10/min, Pro=100/min, Global=200/min/IP)

export const config = { runtime: 'edge' };

import { checkRateLimit, rateLimitResponse } from '../lib/rate-limit.js';


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

  // ── Rate Limit Check (PROTOCOL 6 — Upstash Redis) ──────────────
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || '0.0.0.0';
  const authHeader = req.headers.get('authorization') || '';
  const cookieHeader = req.headers.get('cookie') || '';
  const hasProToken = authHeader.startsWith('Bearer ') || cookieHeader.includes('qs_pro=');
  const rl = await checkRateLimit(ip, '/api/qcs-search', hasProToken);
  if (!rl.allowed) return rateLimitResponse(rl, makeCors());

  let body;
  try { body = await req.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }

  const { query, limit = 6 } = body;
  if (!query || String(query).trim().length < 2) return json({ error: 'Query too short' }, 400);

  const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPA_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!SUPA_URL || !SUPA_KEY) {
    return json({ results: [], query, count: 0, method: 'none', note: 'DB not configured' });
  }

  try {
    let chunks = [];
    let searchMethod = 'fts';

    // 1. Try vector search (Gemini embeddings)
    if (GEMINI_API_KEY) {
      try {
        const embedRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${GEMINI_API_KEY}`,
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
