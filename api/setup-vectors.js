// One-time setup: Enable pgvector + add embedding column + create search function
// POST /api/setup-vectors with { admin_secret }
import { rateLimit, applyRateLimitHeaders, getIp } from './rate-limit.js';
import { getSupabaseUrl, getSupabaseServiceKey } from '../lib/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  // ── Rate Limiting (Protocol 6) — admin endpoint — 2/min ──────────────────
  const ip    = getIp(req);
  const isPro = false; // admin endpoint — بدون JWT — حد ثابت 2/min
  const rl    = await rateLimit(req, isPro ? 'pro' : 'free', 'setup-vectors');
  applyRateLimitHeaders(res, rl);
  if (!rl.allowed) {
    return res.status(429).json({
      error: 'Too Many Requests',
      retryAfter: rl.retryAfter,
      message: `[${ip}] حاول مرة أخرى بعد ${rl.retryAfter} ثانية`,
    });
  }
  // ──────────────────────────────────────────────────────────────────────────

  const { admin_secret } = req.body || {};
  if (admin_secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const URL = getSupabaseUrl();
  const SVC = getSupabaseServiceKey();
  if (!URL || !SVC) return res.status(503).json({ error: 'Supabase not configured' });

  const results = [];

  // SQL commands to run via Supabase SQL endpoint
  const sqls = [
    // 1. Enable pgvector
    `CREATE EXTENSION IF NOT EXISTS vector;`,
    
    // 2. Add embedding column (768 dims for Gemini text-embedding-004)
    `ALTER TABLE qcs_chunks ADD COLUMN IF NOT EXISTS embedding vector(768);`,
    
    // 3. Create HNSW index for fast similarity search
    `CREATE INDEX IF NOT EXISTS qcs_chunks_embedding_idx 
     ON qcs_chunks USING hnsw (embedding vector_cosine_ops)
     WITH (m = 16, ef_construction = 64);`,
    
    // 4. Create search function — الاسم يجب أن يطابق execution-ai.js: match_qcs_chunks
    `CREATE OR REPLACE FUNCTION match_qcs_chunks(
       query_embedding vector(768),
       match_threshold float DEFAULT 0.45,
       match_count int DEFAULT 5,
       filter_file text DEFAULT NULL
     )
     RETURNS TABLE (
       id bigint,
       content text,
       source_file text,
       section_name text,
       part_name text,
       page_num int,
       similarity float
     )
     LANGUAGE sql STABLE AS $$
       SELECT id, content, source_file, section_name, part_name, page_num,
              1 - (embedding <=> query_embedding) AS similarity
       FROM qcs_chunks
       WHERE embedding IS NOT NULL
         AND 1 - (embedding <=> query_embedding) > match_threshold
         AND (filter_file IS NULL OR source_file ILIKE '%' || filter_file || '%')
       ORDER BY embedding <=> query_embedding
       LIMIT match_count;
     $$;`,
  ];

  for (const sql of sqls) {
    try {
      const r = await fetch(`${URL}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: { 
          'apikey': SVC, 
          'Authorization': `Bearer ${SVC}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: sql })
      });
      const d = await r.json();
      results.push({ sql: sql.slice(0, 50), ok: r.ok, status: r.status, result: d });
    } catch(e) {
      results.push({ sql: sql.slice(0, 50), error: e.message });
    }
  }

  return res.status(200).json({ results });
}
