-- ============================================================
-- QatarSpec Pro — Supabase Database Schema
-- MOS/ITP Generator Tables
-- QCS 2024 Compliant · Ashghal RDM 2023
-- ============================================================

-- ─────────────────────────────────────────
-- 1. جدول المشاريع — Projects table
-- ─────────────────────────────────────────
CREATE TABLE projects (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name          TEXT NOT NULL,
  name_ar       TEXT,
  contract_no   TEXT,
  client        TEXT,
  consultant    TEXT,
  contractor    TEXT,
  project_type  TEXT CHECK (project_type IN ('road', 'building', 'infrastructure', 'utilities', 'marine', 'other')),
  location      TEXT,
  qcs_version   TEXT DEFAULT 'QCS 2024',
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- RLS — كل مستخدم يرى مشاريعه فقط
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own projects" ON projects
  FOR ALL USING (auth.uid() = user_id);

-- ─────────────────────────────────────────
-- 2. جدول طرق التنفيذ — Method Statements
-- ─────────────────────────────────────────
CREATE TABLE method_statements (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id      UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  user_id         UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- Document info
  document_no     TEXT,
  rev             TEXT DEFAULT 'A',
  phase           TEXT NOT NULL CHECK (phase IN (
                    'asphalt', 'earthworks', 'drainage', 'subbase',
                    'concrete', 'utilities', 'structures', 'marking', 'landscaping'
                  )),
  execution_method TEXT, -- 'machine', 'manual', 'slipform', etc.
  title_en        TEXT NOT NULL,
  title_ar        TEXT,

  -- Sections (stored as JSONB for flexibility)
  scope_en        TEXT,
  scope_ar        TEXT,
  plant_equipment JSONB DEFAULT '[]',  -- [{item, spec, qcs}]
  materials       JSONB DEFAULT '[]',  -- [{item, spec, qcs}]
  methodology     JSONB DEFAULT '{}',  -- {steps: [{step, titleEn, titleAr, details, qcsRef}]}
  hse             JSONB DEFAULT '{}',  -- {ppe, hazards, emergency, environment}
  references      JSONB DEFAULT '[]',  -- [{ref, desc}]
  appendices      JSONB DEFAULT '[]',  -- [{title, description}]

  -- QCS compliance
  qcs_ref         TEXT,
  qcs_sections    TEXT[],              -- e.g. ['Section 6 Part 5', 'Section 1 Part 7']

  -- Workflow
  status          TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'approved', 'rejected', 'superseded')),
  issued_for      TEXT DEFAULT 'Approval',
  approved_by     TEXT,
  approved_date   DATE,
  comments        TEXT,

  -- Audit
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE method_statements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own MOS" ON method_statements
  FOR ALL USING (auth.uid() = user_id);

-- Index for fast lookup
CREATE INDEX idx_mos_project ON method_statements(project_id);
CREATE INDEX idx_mos_phase ON method_statements(phase);
CREATE INDEX idx_mos_status ON method_statements(status);

-- ─────────────────────────────────────────
-- 3. جدول خطط الفحص والاختبار — ITP Table
-- ─────────────────────────────────────────
CREATE TABLE inspection_test_plans (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id      UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  user_id         UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  mos_id          UUID REFERENCES method_statements(id) ON DELETE SET NULL, -- linked MOS

  -- Document info
  document_no     TEXT,
  itp_number      TEXT,  -- e.g. ITP-1211-010
  rev             TEXT DEFAULT 'A',
  phase           TEXT NOT NULL,
  title           TEXT NOT NULL,
  qcs_ref         TEXT,

  -- Status
  status          TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'approved', 'rejected')),
  issued_for      TEXT DEFAULT 'Approval',
  approved_by     TEXT,
  approved_date   DATE,

  -- Audit
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE inspection_test_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own ITP" ON inspection_test_plans
  FOR ALL USING (auth.uid() = user_id);

-- ─────────────────────────────────────────
-- 4. جدول بنود ITP — ITP Line Items
-- ─────────────────────────────────────────
CREATE TABLE itp_activities (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  itp_id          UUID REFERENCES inspection_test_plans(id) ON DELETE CASCADE NOT NULL,
  user_id         UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- Activity details
  sn              TEXT NOT NULL,        -- e.g. '1.1', '2.3'
  row_type        TEXT DEFAULT 'activity' CHECK (row_type IN ('header', 'activity')),
  title_en        TEXT NOT NULL,
  title_ar        TEXT,
  ref_documents   TEXT,                 -- QCS clause reference
  acceptance_criteria TEXT,
  test_method     TEXT,
  frequency       TEXT,
  task_owner      TEXT,                 -- QCI, Lab, SC, etc.

  -- Surveillance points
  surveillance_lab  TEXT CHECK (surveillance_lab IN ('H', 'W', 'S', 'R', '-')),
  surveillance_qc   TEXT CHECK (surveillance_qc IN ('H', 'W', 'S', 'R', '-')),
  surveillance_sc   TEXT CHECK (surveillance_sc IN ('H', 'W', 'S', 'R', '-')),

  -- Quality records
  quality_records TEXT,
  notes           TEXT,
  is_active       BOOLEAN DEFAULT true,
  sort_order      INTEGER DEFAULT 0,

  created_at      TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE itp_activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own ITP activities" ON itp_activities
  FOR ALL USING (auth.uid() = user_id);

CREATE INDEX idx_itp_activities_itp ON itp_activities(itp_id);
CREATE INDEX idx_itp_activities_order ON itp_activities(itp_id, sort_order);

-- ─────────────────────────────────────────
-- 5. قوالب افتراضية — Default Templates
--    (Shared, read-only, from QatarSpec Pro)
-- ─────────────────────────────────────────
CREATE TABLE mos_templates (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phase       TEXT NOT NULL UNIQUE,
  title_en    TEXT NOT NULL,
  title_ar    TEXT,
  qcs_ref     TEXT NOT NULL,
  plant       JSONB DEFAULT '[]',
  materials   JSONB DEFAULT '[]',
  methodology JSONB DEFAULT '{}',
  hse_base    JSONB DEFAULT '{}',
  references  JSONB DEFAULT '[]',
  version     TEXT DEFAULT 'QCS2024',
  is_active   BOOLEAN DEFAULT true,
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- قراءة فقط للمستخدمين
ALTER TABLE mos_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read templates" ON mos_templates
  FOR SELECT USING (true);

CREATE TABLE itp_templates (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phase       TEXT NOT NULL UNIQUE,
  title       TEXT NOT NULL,
  itp_number  TEXT,
  qcs_ref     TEXT NOT NULL,
  activities  JSONB DEFAULT '[]',
  version     TEXT DEFAULT 'QCS2024',
  is_active   BOOLEAN DEFAULT true,
  updated_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE itp_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read ITP templates" ON itp_templates
  FOR SELECT USING (true);

-- ─────────────────────────────────────────
-- 6. trigger: updated_at تلقائي
-- ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_projects_updated      BEFORE UPDATE ON projects            FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_mos_updated           BEFORE UPDATE ON method_statements    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_itp_updated           BEFORE UPDATE ON inspection_test_plans FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─────────────────────────────────────────
-- 7. View مفيد — جمع MOS + ITP
-- ─────────────────────────────────────────
CREATE VIEW project_documents AS
SELECT
  p.id          AS project_id,
  p.name        AS project_name,
  p.contract_no,
  p.client,
  m.id          AS mos_id,
  m.phase,
  m.title_en    AS mos_title,
  m.status      AS mos_status,
  m.rev         AS mos_rev,
  i.id          AS itp_id,
  i.title       AS itp_title,
  i.status      AS itp_status,
  i.rev         AS itp_rev
FROM projects p
LEFT JOIN method_statements m ON m.project_id = p.id
LEFT JOIN inspection_test_plans i ON i.mos_id = m.id;

-- ─────────────────────────────────────────
-- USAGE NOTES:
-- 1. Run this in Supabase SQL Editor
-- 2. Seed mos_templates and itp_templates from api/mos-generator.js templates
-- 3. RLS ensures each user only sees their own documents
-- 4. Templates table is read-only for users (admin only can update)
-- ─────────────────────────────────────────
