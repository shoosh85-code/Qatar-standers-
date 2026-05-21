-- المرحلة 7: إضافة عمود storage_path لجدول site_photos
-- هذا العمود يحفظ مسار الملف في Supabase Storage للحذف لاحقاً

ALTER TABLE site_photos ADD COLUMN IF NOT EXISTS storage_path TEXT;

-- Bucket setup لا يمكن عمله بـ SQL — يجب إنشاؤه من Supabase Dashboard:
-- Storage > New Bucket > Name: site-photos > Public: true > Max file size: 5242880 (5MB)
-- Allowed MIME types: image/jpeg, image/png, image/webp
