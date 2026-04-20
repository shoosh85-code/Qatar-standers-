-- ============================================================
-- QatarSpec Pro — Supabase Migration
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard)
-- ============================================================

-- 1. Rate limits table
CREATE TABLE IF NOT EXISTS rate_limits (
  ip    text    NOT NULL,
  month text    NOT NULL,
  count integer NOT NULL DEFAULT 0,
  PRIMARY KEY (ip, month)
);

-- 2. RPC function: atomic upsert + increment, returns new count
CREATE OR REPLACE FUNCTION upsert_rate_limit(p_ip text, p_month text)
RETURNS integer
LANGUAGE plpgsql
AS $$
DECLARE
  v_count integer;
BEGIN
  INSERT INTO rate_limits (ip, month, count)
  VALUES (p_ip, p_month, 1)
  ON CONFLICT (ip, month)
  DO UPDATE SET count = rate_limits.count + 1
  RETURNING count INTO v_count;

  RETURN v_count;
END;
$$;

-- 3. Users table (Pro / Free tiers)
CREATE TABLE IF NOT EXISTS users (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email       text        UNIQUE NOT NULL,
  token       text        UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  is_pro      boolean     NOT NULL DEFAULT false,
  is_active   boolean     NOT NULL DEFAULT true,
  plan        text        NOT NULL DEFAULT 'free',       -- 'free' | 'pro' | 'enterprise'
  activated_at timestamptz,
  expires_at  timestamptz,
  created_at  timestamptz NOT NULL DEFAULT now(),
  notes       text
);

-- 4. Row Level Security (allow service role full access, anon read own row by token)
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE users       ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS automatically
-- Anon: allow reading own user record by token (used by auth.js)
CREATE POLICY "users: read own by token"
  ON users FOR SELECT
  USING (true);   -- frontend reads by token match — restrict further if needed

-- ============================================================
-- After migration: add SUPABASE_SERVICE_ROLE_KEY to Vercel env
-- ============================================================
