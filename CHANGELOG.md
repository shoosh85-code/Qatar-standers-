# Changelog — QatarSpec Pro

كل التغييرات الهامة موثقة هنا.

## [3.2.0] - 2026-05-01
### Added
- Rate limiting على كل API endpoints (Free: 5/min, Pro: 60/min) — Upstash Redis + in-memory fallback
- نظام BOQ Pricer — 259 item للفيلا السكنية القطرية
- 1500+ NCR database موزعة على 9 disciplines
- صفحات Terms & Privacy مستقلتان (legal/terms.html, legal/privacy.html)
- CSS extraction → css/main.css (تحسين أداء التحميل)
- HTML partials system (6 partials + loader)
- GitHub Actions CI/CD pipeline
- Schema.org structured data

### Changed
- رفع سرعة البحث الذكي بتحسين Supabase queries
- تحديث KAHRAMAA references لـ 2024
- تنظيم بنية الملفات (css/, partials/, legal/, lib/)

### Fixed
- إصلاح /legal/terms.html و /legal/privacy.html (كانت تعيد index.html)
- تصحيح vercel.json catch-all rewrite

## [3.1.0] - 2026-02-15
### Added
- محلل المخططات الذكي (Pro)
- BOQ Export بتنسيق Ashghal الرسمي
- 66 معدة هندسية مع مواصفات QCS كاملة

## [3.0.0] - 2026-01-01
### Added
- إعادة بناء كاملة بـ Vanilla JS
- Supabase pgvector للـ RAG search
- Gemini API server-side proxy
- PWA + Offline Mode
- 111+ قسم مرجعي من QCS 2024
