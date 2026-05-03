// One-time setup: Enable pgvector + add embedding column + create search function
// POST /api/setup-vectors with { admin_secret }
import { checkRateLimit, applyRateLimitHeaders, getIp } from './rate-limit.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  // ── Rate Limiting (Protocol 6) — admin endpoint — 2/min ──────────────────
  const ip = getIp(req);
  const rl = checkRateLimit(ip, 'setup-vectors', false);
  applyRateLimitHeaders(res, rl);
  if (!rl.allowed) {
    return res.status(429).json({
      error: 'Too Many Requests',
      retryAfter: rl.retryAfter,
      message: `حاول مرة أخرى بعد ${rl.retryAfter} ثانية`,
    });
  }
  // ──────────────────────────────────────────────────────────────────────────

  const { admin_secret } = req.body || {};
  if (admin_secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SVC = process.env.SUPABASE_SERVICE_ROLE_KEY;
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
    
    // 4. Create search function
    `CREATE OR REPLACE FUNCTION search_qcs(
       query_embedding vector(768),
       match_count int DEFAULT 5,
       similarity_threshold float DEFAULT 0.5
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
         AND 1 - (embedding <=> query_embedding) > similarity_threshold
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
