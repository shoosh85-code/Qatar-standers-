// /api/qcs-upload.js — QatarSpec Pro v1.0
// Admin endpoint: إنشاء جدول qcs_chunks + رفع كل الـ chunks
// POST /api/qcs-upload { action: 'status'|'setup'|'upload'|'clear', admin_secret, batch_size?, offset? }
// NodeJS runtime (لا Edge) — يحتاج وصول ملفات + وقت أطول

import { getSupabaseUrl, getSupabaseServiceKey } from '../lib/supabase.js';

const CORS_ORIGIN = process.env.APP_URL || 'https://qatar-standers.vercel.app';

function cors() {
  return {
    'Access-Control-Allow-Origin': CORS_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, x-admin-secret',
    'Content-Type': 'application/json',
  };
}

// ── SQL: إنشاء جدول qcs_chunks الكامل ────────────────────────────────────
const CREATE_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS qcs_chunks (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  chunk_id     TEXT UNIQUE,
  content      TEXT NOT NULL,
  source_file  TEXT,
  section_name TEXT,
  part_name    TEXT,
  part_num     INTEGER,
  chunk_index  INTEGER DEFAULT 0,
  word_count   INTEGER DEFAULT 0,
  char_count   INTEGER GENERATED ALWAYS AS (length(content)) STORED,
  embedding    vector(768),
  created_at   TIMESTAMPTZ DEFAULT now()
);
`;

const ENABLE_VECTOR_SQL = `CREATE EXTENSION IF NOT EXISTS vector;`;

const CREATE_INDEX_SQL = `
CREATE INDEX IF NOT EXISTS qcs_chunks_embedding_idx
  ON qcs_chunks USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);
`;

const CREATE_FTS_INDEX_SQL = `
CREATE INDEX IF NOT EXISTS qcs_chunks_content_idx
  ON qcs_chunks USING gin(to_tsvector('english', content));
`;

const CREATE_MATCH_FN_SQL = `
CREATE OR REPLACE FUNCTION match_qcs_chunks(
  query_embedding vector(768),
  match_threshold float DEFAULT 0.45,
  match_count     int   DEFAULT 5,
  filter_file     text  DEFAULT NULL
)
RETURNS TABLE (
  id           bigint,
  content      text,
  source_file  text,
  section_name text,
  part_name    text,
  page_num     int,
  similarity   float
)
LANGUAGE sql STABLE AS $$
  SELECT
    id, content, source_file, section_name, part_name,
    0 AS page_num,
    1 - (embedding <=> query_embedding) AS similarity
  FROM qcs_chunks
  WHERE embedding IS NOT NULL
    AND 1 - (embedding <=> query_embedding) > match_threshold
    AND (filter_file IS NULL OR source_file ILIKE '%' || filter_file || '%')
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;
`;

const DISABLE_RLS_SQL = `
ALTER TABLE qcs_chunks DISABLE ROW LEVEL SECURITY;
`;

// ── تنفيذ SQL عبر Supabase REST API ──────────────────────────────────────
async function runSQL(supaUrl, supaKey, sql) {
  const r = await fetch(`${supaUrl}/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers: {
      'apikey': supaKey,
      'Authorization': `Bearer ${supaKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql }),
    signal: AbortSignal.timeout(15000),
  });
  if (!r.ok) {
    // بعض الـ SQL تنجح حتى مع error (مثل CREATE IF NOT EXISTS)
    const text = await r.text();
    return { ok: false, error: text.slice(0, 300) };
  }
  return { ok: true };
}

// ── جلب إحصائيات الجدول ──────────────────────────────────────────────────
async function getStats(supaUrl, supaKey) {
  try {
    // عدد الـ chunks الكلي
    const totalRes = await fetch(
      `${supaUrl}/rest/v1/qcs_chunks?select=id&limit=1`,
      {
        headers: {
          'apikey': supaKey,
          'Authorization': `Bearer ${supaKey}`,
          'Prefer': 'count=exact',
        },
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!totalRes.ok) {
      const err = await totalRes.text();
      // جدول غير موجود
      if (totalRes.status === 404 || err.includes('does not exist') || err.includes('relation')) {
        return { table_exists: false, total: 0, with_embedding: 0, without_embedding: 0 };
      }
      return { table_exists: false, error: err.slice(0, 200) };
    }

    const totalHeader = totalRes.headers.get('content-range');
    const total = parseInt(totalHeader?.split('/')?.[1] || '0');

    // عدد الـ chunks بدون embedding
    const noEmbedRes = await fetch(
      `${supaUrl}/rest/v1/qcs_chunks?embedding=is.null&select=id&limit=1`,
      {
        headers: {
          'apikey': supaKey,
          'Authorization': `Bearer ${supaKey}`,
          'Prefer': 'count=exact',
        },
        signal: AbortSignal.timeout(10000),
      }
    );
    const noEmbedHeader = noEmbedRes.headers.get('content-range');
    const without_embedding = parseInt(noEmbedHeader?.split('/')?.[1] || '0');

    return {
      table_exists: true,
      total,
      with_embedding: total - without_embedding,
      without_embedding,
      upload_complete: total >= 3485,
      embed_complete: without_embedding === 0 && total > 0,
    };
  } catch (e) {
    return { table_exists: false, error: e.message };
  }
}

// ── رفع batch من الـ chunks ───────────────────────────────────────────────
async function uploadBatch(supaUrl, supaKey, rows) {
  const r = await fetch(`${supaUrl}/rest/v1/qcs_chunks`, {
    method: 'POST',
    headers: {
      'apikey':        supaKey,
      'Authorization': `Bearer ${supaKey}`,
      'Content-Type':  'application/json',
      'Prefer':        'return=minimal,resolution=ignore-duplicates',
    },
    body: JSON.stringify(rows),
    signal: AbortSignal.timeout(20000),
  });

  if (!r.ok) {
    const err = await r.text();
    throw new Error(`Supabase ${r.status}: ${err.slice(0, 300)}`);
  }
  return rows.length;
}

// ── ALL CHUNKS DATA (مُدمج في الكود — 3485 chunk من QCS_2024_Full_.pdf) ──
// يُحمَّل من الملف الخارجي عبر dynamic import
async function loadChunks() {
  // في Edge Runtime لا يوجد fs — نستخدم fetch للـ data file
  // لكن في Node.js runtime نستخدم fs
  try {
    const { createRequire } = await import('module');
    const require = createRequire(import.meta.url);
    const path = require('path');
    const fs = require('fs');

    const filePath = path.join(process.cwd(), 'data', 'qcs-chunks-full.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);
    return data.chunks || [];
  } catch (e) {
    throw new Error(`Failed to load chunks: ${e.message}`);
  }
}

// ── Main Handler ──────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(204, cors());
    return res.end();
  }
  if (req.method !== 'POST') {
    res.writeHead(405, cors());
    return res.end(JSON.stringify({ error: 'POST only' }));
  }

  // Auth
  const body = req.body || {};
  const adminSecret = process.env.ADMIN_SECRET;
  const providedSecret = body.admin_secret || req.headers['x-admin-secret'];

  if (!adminSecret || providedSecret !== adminSecret) {
    res.writeHead(401, cors());
    return res.end(JSON.stringify({ error: 'Unauthorized — admin_secret required' }));
  }

  const SUPA_URL = getSupabaseUrl();
  const SUPA_KEY = getSupabaseServiceKey();

  if (!SUPA_URL || !SUPA_KEY) {
    res.writeHead(503, cors());
    return res.end(JSON.stringify({
      error: 'Supabase not configured',
      missing: [!SUPA_URL && 'SUPABASE_URL', !SUPA_KEY && 'SUPABASE_SERVICE_ROLE_KEY'].filter(Boolean),
    }));
  }

  const action = body.action || 'status';

  // ── ACTION: status ────────────────────────────────────────────────────
  if (action === 'status') {
    const stats = await getStats(SUPA_URL, SUPA_KEY);
    res.writeHead(200, cors());
    return res.end(JSON.stringify({ action: 'status', supabase_url: SUPA_URL.slice(0, 40) + '...', ...stats }));
  }

  // ── ACTION: setup (إنشاء الجدول + extensions + functions) ────────────
  if (action === 'setup') {
    const results = [];

    for (const [name, sql] of [
      ['enable_vector', ENABLE_VECTOR_SQL],
      ['create_table', CREATE_TABLE_SQL],
      ['disable_rls', DISABLE_RLS_SQL],
      ['create_hnsw_index', CREATE_INDEX_SQL],
      ['create_fts_index', CREATE_FTS_INDEX_SQL],
      ['create_match_fn', CREATE_MATCH_FN_SQL],
    ]) {
      const r = await runSQL(SUPA_URL, SUPA_KEY, sql);
      results.push({ step: name, ...r });
    }

    const stats = await getStats(SUPA_URL, SUPA_KEY);
    res.writeHead(200, cors());
    return res.end(JSON.stringify({ action: 'setup', results, stats }));
  }

  // ── ACTION: clear (حذف كل البيانات) ──────────────────────────────────
  if (action === 'clear') {
    const r = await fetch(`${SUPA_URL}/rest/v1/qcs_chunks?id=gte.0`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPA_KEY,
        'Authorization': `Bearer ${SUPA_KEY}`,
        'Prefer': 'return=minimal',
      },
      signal: AbortSignal.timeout(15000),
    });
    const ok = r.ok;
    const stats = await getStats(SUPA_URL, SUPA_KEY);
    res.writeHead(200, cors());
    return res.end(JSON.stringify({ action: 'clear', ok, stats }));
  }

  // ── ACTION: upload ────────────────────────────────────────────────────
  if (action === 'upload') {
    const batchSize = Math.min(parseInt(body.batch_size || 100), 200);
    const offset    = parseInt(body.offset || 0);

    let chunks;
    try {
      chunks = await loadChunks();
    } catch (e) {
      res.writeHead(500, cors());
      return res.end(JSON.stringify({ error: e.message }));
    }

    const totalChunks = chunks.length;
    const slice = chunks.slice(offset, offset + batchSize);

    if (!slice.length) {
      const stats = await getStats(SUPA_URL, SUPA_KEY);
      res.writeHead(200, cors());
      return res.end(JSON.stringify({
        action: 'upload',
        message: '✅ كل الـ chunks رُفعت!',
        processed: 0,
        offset,
        total_source: totalChunks,
        done: true,
        stats,
      }));
    }

    // تحويل للصيغة المطلوبة
    const rows = slice.map(c => ({
      chunk_id:     c.id,
      content:      c.content,
      source_file:  c.source_file || 'QCS_2024_Full_.pdf',
      section_name: c.section_name || '',
      part_name:    c.part_name || '',
      part_num:     c.part_num || null,
      chunk_index:  c.chunk_index || 0,
      word_count:   c.word_count || 0,
    }));

    let processed = 0;
    let error = null;

    try {
      processed = await uploadBatch(SUPA_URL, SUPA_KEY, rows);
    } catch (e) {
      error = e.message;
    }

    const nextOffset = offset + slice.length;
    const done = nextOffset >= totalChunks;
    const stats = await getStats(SUPA_URL, SUPA_KEY);

    res.writeHead(200, cors());
    return res.end(JSON.stringify({
      action: 'upload',
      processed,
      offset,
      next_offset: nextOffset,
      total_source: totalChunks,
      done,
      error: error || null,
      progress_pct: Math.round((nextOffset / totalChunks) * 100),
      stats,
    }));
  }

  res.writeHead(400, cors());
  return res.end(JSON.stringify({
    error: 'Unknown action',
    valid_actions: ['status', 'setup', 'upload', 'clear'],
  }));
}
