-- ═══════════════════════════════════════════════════════════════
-- QatarSpec Pro — Site Tours & 3D Models Schema
-- Migration: 005_site_tours.sql
-- جداول: site_tours + tour_hotspots
-- ═══════════════════════════════════════════════════════════════

-- ── 1. الجولات الميدانية ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_tours (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('pano','model','gaussian')),
  description TEXT,
  -- البانوراما: رابط الصورة في Supabase Storage
  -- المجسم: رابط GLB/GLTF
  -- Gaussian: رابط splat file
  file_url TEXT,
  file_size INTEGER,
  -- بيانات إضافية (width, height للبانوراما)
  metadata JSONB DEFAULT '{}',
  status TEXT DEFAULT 'active' CHECK (status IN ('active','processing','archived')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ── 2. نقاط التفتيش (Hotspots) ───────────────────────────────
CREATE TABLE IF NOT EXISTS tour_hotspots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tour_id UUID REFERENCES site_tours(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  -- إحداثيات البانوراما
  pitch NUMERIC,
  yaw NUMERIC,
  -- إحداثيات المجسم (x, y, z)
  position_x NUMERIC,
  position_y NUMERIC,
  position_z NUMERIC,
  -- مرجع المعيار
  qcs_reference TEXT,
  -- نوع النقطة
  hotspot_type TEXT DEFAULT 'info' CHECK (hotspot_type IN ('info','warning','pass','fail','measurement')),
  -- صورة مرفقة (اختياري)
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── Indexes ───────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_site_tours_project ON site_tours(project_id);
CREATE INDEX IF NOT EXISTS idx_site_tours_user ON site_tours(user_id);
CREATE INDEX IF NOT EXISTS idx_tour_hotspots_tour ON tour_hotspots(tour_id);

-- ── RLS Policies ──────────────────────────────────────────────
ALTER TABLE site_tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE tour_hotspots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own tours"
  ON site_tours FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users manage own hotspots"
  ON tour_hotspots FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ── Updated_at trigger ────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_site_tours_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_site_tours_updated ON site_tours;
CREATE TRIGGER tr_site_tours_updated
  BEFORE UPDATE ON site_tours
  FOR EACH ROW EXECUTE FUNCTION update_site_tours_updated_at();
