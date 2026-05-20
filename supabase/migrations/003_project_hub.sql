-- ═══════════════════════════════════════════════════════════════
-- QatarSpec Pro — Project Hub Database Schema
-- Migration: 003_project_hub.sql
-- 10 جداول لنظام إدارة المشاريع
-- ═══════════════════════════════════════════════════════════════

-- ── 1. المشاريع ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  client TEXT,
  location TEXT,
  type TEXT CHECK (type IN ('villa','building','road','maintenance','infrastructure','other')),
  contract_value NUMERIC,
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active','on_hold','completed','cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ── 2. التقارير اليومية ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS daily_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  report_date DATE NOT NULL,
  weather TEXT,
  temperature NUMERIC,
  workers_count INTEGER,
  equipment_used TEXT,
  activities TEXT NOT NULL,
  materials_received TEXT,
  visitors TEXT,
  safety_notes TEXT,
  problems TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── 3. طلبات الفحص ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS inspection_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ir_number TEXT NOT NULL,
  activity TEXT NOT NULL,
  location_detail TEXT,
  inspection_date DATE NOT NULL,
  discipline TEXT CHECK (discipline IN ('structural','roads','utilities','mep','finishing','other')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','on_hold')),
  consultant_comment TEXT,
  qcs_reference TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ── 4. اعتماد المواد ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS material_submittals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  submittal_number TEXT NOT NULL,
  material_name TEXT NOT NULL,
  supplier TEXT,
  specification TEXT,
  qcs_reference TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','approved_with_comments','rejected','resubmit')),
  submit_date DATE NOT NULL,
  response_date DATE,
  comments TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── 5. سجل المخالفات NCR ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS ncr_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ncr_number TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location_detail TEXT,
  discipline TEXT,
  severity TEXT CHECK (severity IN ('minor','major','critical')),
  qcs_reference TEXT,
  corrective_action TEXT,
  status TEXT DEFAULT 'open' CHECK (status IN ('open','in_progress','closed','void')),
  issued_date DATE NOT NULL,
  close_date DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── 6. صور الموقع ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  caption TEXT,
  activity TEXT,
  photo_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── 7. Snag List ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS snag_list (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  item_number TEXT NOT NULL,
  location_detail TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT CHECK (category IN ('structural','architectural','mep','roads','utilities','landscaping','other')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low','medium','high','critical')),
  status TEXT DEFAULT 'open' CHECK (status IN ('open','in_progress','closed')),
  assigned_to TEXT,
  due_date DATE,
  close_date DATE,
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── 8. بنود الكميات BOQ ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS boq_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  item_number TEXT NOT NULL,
  description TEXT NOT NULL,
  unit TEXT NOT NULL,
  contracted_qty NUMERIC NOT NULL,
  unit_rate NUMERIC,
  executed_qty NUMERIC DEFAULT 0,
  approved_qty NUMERIC DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── 9. شهادات الدفع IPC ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS payment_certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ipc_number INTEGER NOT NULL,
  period_from DATE NOT NULL,
  period_to DATE NOT NULL,
  gross_amount NUMERIC,
  retention_pct NUMERIC DEFAULT 10,
  deductions NUMERIC DEFAULT 0,
  net_amount NUMERIC,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft','submitted','approved','paid')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── 10. قوائم الفحص Checklists ────────────────────────────────
CREATE TABLE IF NOT EXISTS activity_checklists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  checklist_items JSONB NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','passed','failed')),
  inspector TEXT,
  check_date DATE,
  qcs_reference TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════════════════════
-- Row Level Security — كل مستخدم يرى بياناته فقط
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "projects_user_policy" ON projects FOR ALL USING (auth.uid() = user_id);

ALTER TABLE daily_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "daily_reports_user_policy" ON daily_reports FOR ALL USING (auth.uid() = user_id);

ALTER TABLE inspection_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "inspection_requests_user_policy" ON inspection_requests FOR ALL USING (auth.uid() = user_id);

ALTER TABLE material_submittals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "material_submittals_user_policy" ON material_submittals FOR ALL USING (auth.uid() = user_id);

ALTER TABLE ncr_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ncr_log_user_policy" ON ncr_log FOR ALL USING (auth.uid() = user_id);

ALTER TABLE site_photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "site_photos_user_policy" ON site_photos FOR ALL USING (auth.uid() = user_id);

ALTER TABLE snag_list ENABLE ROW LEVEL SECURITY;
CREATE POLICY "snag_list_user_policy" ON snag_list FOR ALL USING (auth.uid() = user_id);

ALTER TABLE boq_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "boq_items_user_policy" ON boq_items FOR ALL USING (auth.uid() = user_id);

ALTER TABLE payment_certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "payment_certificates_user_policy" ON payment_certificates FOR ALL USING (auth.uid() = user_id);

ALTER TABLE activity_checklists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "activity_checklists_user_policy" ON activity_checklists FOR ALL USING (auth.uid() = user_id);

-- ═══════════════════════════════════════════════════════════════
-- Indexes للأداء
-- ═══════════════════════════════════════════════════════════════

CREATE INDEX IF NOT EXISTS idx_projects_user ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_daily_reports_project ON daily_reports(project_id, report_date DESC);
CREATE INDEX IF NOT EXISTS idx_ir_project ON inspection_requests(project_id, status);
CREATE INDEX IF NOT EXISTS idx_ms_project ON material_submittals(project_id, status);
CREATE INDEX IF NOT EXISTS idx_ncr_project ON ncr_log(project_id, status);
CREATE INDEX IF NOT EXISTS idx_photos_project ON site_photos(project_id, photo_date DESC);
CREATE INDEX IF NOT EXISTS idx_snag_project ON snag_list(project_id, status);
CREATE INDEX IF NOT EXISTS idx_boq_project ON boq_items(project_id);
CREATE INDEX IF NOT EXISTS idx_ipc_project ON payment_certificates(project_id);
CREATE INDEX IF NOT EXISTS idx_checklist_project ON activity_checklists(project_id);

-- ═══════════════════════════════════════════════════════════════
-- Storage Bucket للصور
-- ═══════════════════════════════════════════════════════════════
-- ⚠️ نفّذ هذا يدوياً في Supabase Dashboard → Storage:
-- 1. أنشئ Bucket اسمه "site-photos"
-- 2. اجعله Public
-- 3. Allowed MIME types: image/jpeg, image/png, image/webp
-- 4. Max file size: 5MB
