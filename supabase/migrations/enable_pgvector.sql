-- QatarSpec Pro — pgvector Migration
-- Run this in Supabase SQL Editor

-- 1. Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Add embedding column (768 dims = Gemini text-embedding-004)
ALTER TABLE qcs_chunks ADD COLUMN IF NOT EXISTS embedding vector(768);

-- 3. HNSW index for fast cosine similarity search
CREATE INDEX IF NOT EXISTS qcs_chunks_embedding_idx
  ON qcs_chunks USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

-- 4. RPC function called by execution-ai.js
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
    id, content, source_file, section_name, part_name, page_num,
    1 - (embedding <=> query_embedding) AS similarity
  FROM qcs_chunks
  WHERE embedding IS NOT NULL
    AND 1 - (embedding <=> query_embedding) > match_threshold
    AND (filter_file IS NULL OR source_file ILIKE '%' || filter_file || '%')
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;

-- Verify:
-- SELECT COUNT(*) FROM qcs_chunks WHERE embedding IS NOT NULL;
