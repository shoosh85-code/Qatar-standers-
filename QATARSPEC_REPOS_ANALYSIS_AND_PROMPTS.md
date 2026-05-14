# QatarSpec Pro — تحليل الـ 7 Repos + برومبتات التنفيذ

---

## الجزء الأول: شرح كل Repo وما سيُنفذ منه

---

### Repo 1: OpenConstructionEstimate-DDC-CWICR
**الرابط:** github.com/datadrivenconstruction/OpenConstructionEstimate-DDC-CWICR
**الوصف:** نظام تقدير تكاليف البناء باستخدام Qdrant (Vector DB) + n8n (workflow automation)

**ما نستخدمه:**
- ✅ **فكرة Vector Search** — بحث دلالي في نصوص QCS 2024 بدل keyword search
- ✅ **هيكل البيانات** — كيفية تقسيم المستندات إلى chunks مع metadata
- ✅ **أنماط الـ API** — كيف يربط frontend بـ vector database

**ما نتجاهله:**
- ❌ Qdrant → نستخدم Supabase pgvector بدلاً منه (أبسط + عندنا Supabase أصلاً)
- ❌ n8n workflows → معقد للـ MVP، نستخدم Gemini API + templates بدلاً منه
- ❌ تقدير التكاليف → خارج نطاق QatarSpec Pro حالياً

**الفائدة:**
البحث الحالي يعتمد على Gemini API (3-5 ثوان + $0.01/بحث). بعد التنفيذ: pgvector (200ms + $0/بحث). توفير ~70% من تكلفة API + سرعة 10x.

---

### Repo 2: Blueprints (Blueprints-org)
**الرابط:** github.com/Blueprints-org/blueprints
**الوصف:** مكتبة Python لحسابات Eurocode الإنشائية مع 100% test coverage

**ما نستخدمه:**
- ✅ **الصيغ الهندسية** — معادلات Beam, Column, Footing, Shear, Deflection
- ✅ **قاعدة بيانات المقاطع الفولاذية** — HEA, HEB, IPE, UPN (نحولها لـ JSON)
- ✅ **منهجية الاختبار** — test cases مع expected results لكل حاسبة
- ✅ **هيكل الحاسبات** — input validation → calculation → result + reference

**ما نتجاهله:**
- ❌ Python code → نعيد كتابة الصيغ بـ Vanilla JS
- ❌ Eurocode مباشرة → نستخدم QCS 2024 + ACI 318 (المعتمد في قطر)
- ❌ مكتبة كـ dependency → نأخذ الصيغ فقط

**الفائدة:**
إضافة 8 حاسبات تصميم إنشائي حقيقية (Beam Deflection, Column Design, Footing, Retaining Wall, Pile Capacity, Steel Connection, Pipe Flow, Road Pavement). هذي تبرر Pro tier.

---

### Repo 3: DDC_Skills_for_AI_Agents_in_Construction
**الرابط:** github.com/datadrivenconstruction/DDC_Skills_for_AI_Agents_in_Construction
**الوصف:** 221 مهارة AI جاهزة (SKILL.md) لأتمتة مهام البناء

**ما نستخدمه:**
- ✅ **10-15 skill** المتعلقة مباشرة بالمواصفات القطرية:
  - Quality Inspection Checklists
  - Method Statement Generation
  - ITP Generation
  - Material Submittal Review
  - Non-Conformance Report
  - Daily Progress Report
- ✅ **صيغة الـ SKILL.md** — نستخدمها كـ system prompts لـ Gemini API
- ✅ **ETL patterns** — كيفية استخراج بيانات من PDF إلى structured data

**ما نتجاهله:**
- ❌ 206 skill غير مرتبطة بـ QCS
- ❌ Claude Code / OpenAI API → نستخدم Gemini API الموجود
- ❌ الأنابيب المعقدة → نبني templates بسيطة

**الفائدة:**
توليد تلقائي لـ Method Statement في 2 دقيقة بدل 2 ساعة. توليد ITP كامل مع Hold Points و QCS references. هذا يبرر Enterprise tier.

---

### Repo 4: CalcForge
**الرابط:** github.com/slukiceng/CalcForge
**الوصف:** أدوات حساب هندسي تستخدم PyNite (3D FEM) + PySlope + concrete-properties

**ما نستخدمه:**
- ✅ **أنماط واجهة الحاسبات** — كيف يعرض المدخلات/المخرجات/الرسوم البيانية
- ✅ **فكرة الحاسبات المتقدمة** — multi-step calculations مع intermediate results
- ✅ **عرض خطوات الحل** — "شرح الحل" خطوة بخطوة مع مراجع

**ما نتجاهله:**
- ❌ PyNite (3D FEM) → يحتاج Python server، ثقيل جداً
- ❌ PySlope → يحتاج Python
- ❌ concrete-properties → نكتب الصيغ بـ JS مباشرة
- ❌ Docker/VPS → نبقى على Vercel serverless

**الفائدة:**
تحسين UX للحاسبات الموجودة — إضافة رسوم بيانية (Chart.js موجود) + خطوات الحل + multi-step wizard (stepper.js موجود).

---

### Repo 5: model-checker (opensource-construction)
**الرابط:** github.com/opensource-construction/model-checker
**الوصف:** فحص نماذج BIM (IFC) مقابل معايير IDS

**ما نستخدمه:**
- ✅ **لا شيء حالياً**

**ما نتجاهله:**
- ❌ كامل الـ repo — BIM/IFC جمهور محدود جداً في قطر
- ❌ WASM parser → ثقيل + يبطئ التطبيق
- ❌ IDS/BCF → معايير متخصصة لا يحتاجها المهندس الميداني

**الفائدة:**
صفر حالياً. ممكن يُضاف في v5.0 إذا صار فيه طلب من Enterprise clients.

---

### Repo 6: structural_llama
**الرابط:** github.com/joreilly86/structural_llama
**الوصف:** Tutorial/Demo لاستخدام Llama2 في الهندسة الإنشائية

**ما نستخدمه:**
- ✅ **System prompts الهندسية** — كيف يُوجّه LLM للإجابة بمراجع هندسية
- ✅ **أنماط الأسئلة** — أمثلة لأسئلة هندسية وإجاباتها المتوقعة

**ما نتجاهله:**
- ❌ Llama2/3 محلي → يحتاج GPU server ($100+/شهر)، Gemini 2.5 Pro أدق وأرخص
- ❌ Docker setup → معقد بلا فائدة حالياً
- ❌ Offline mode → PWA + Service Worker يكفي للمحتوى الثابت

**الفائدة:**
تحسين system prompts في ai-proxy.js الموجود → إجابات أدق مع QCS references.

---

### Repo 7: Awesome-Physical-Engineering-AI
**الرابط:** github.com/010zx00x1/Awesome-Physical-Engineering-AI
**الوصف:** قائمة أدوات AI/ML للهندسة الفيزيائية

**ما نستخدمه:**
- ✅ **قائمة مراجع** — روابط لأدوات مفيدة (FreeCAD, OpenFOAM, CalculiX)
- ✅ **مكتبات Python** — NumPy, SciPy, PyVista (كمراجع تعليمية)

**ما نتجاهله:**
- ❌ لا يوجد كود قابل للدمج — هذا awesome list فقط

**الفائدة:**
صفحة "أدوات AI للمهندسين" في التطبيق — يوم عمل واحد.

---

## ملخص: ما يُنفذ فعلاً من كل Repo

| # | Repo | ما نأخذ | الأثر |
|---|------|---------|-------|
| 1 | OpenConstructionEstimate | فكرة Vector Search → pgvector | بحث أسرع 10x + أرخص 70% |
| 2 | Blueprints | الصيغ الهندسية → JS calculators | 8 حاسبات تصميم جديدة |
| 3 | DDC_Skills | 10-15 skill → Gemini system prompts | توليد تلقائي ITP/NCR/MS |
| 4 | CalcForge | أنماط UI → تحسين واجهة الحاسبات | Chart.js + خطوات الحل |
| 5 | model-checker | لا شيء | — |
| 6 | structural_llama | System prompts → ai-proxy.js | إجابات AI أدق |
| 7 | Awesome list | قائمة روابط → صفحة HTML | صفحة مراجع |

---
---

## الجزء الثاني: البرومبتات التنفيذية

> كل برومبت مستقل 100% — انسخه في جلسة Claude جديدة ونفّذ
> نفّذهم بالترتيب: A1 → A2 → B1 → B2 → C1 → C2 → D1 → D2

---

### PROMPT A1 — تقسيم inline-scripts.js (المرحلة 1: ui-utils)

```
أنت مطور Full-Stack محترف تعمل على مشروع QatarSpec Pro.

## معلومات المشروع
- Repo: https://github.com/shoosh85-code/Qatar-standers-.git
- Stack: Vanilla HTML/JS + Vercel Serverless
- Node.js 20.x
- الموقع: qatar-standers.vercel.app

## القواعد الحمراء
- لا تحذف أي محتوى — فقط أضف أو عدّل
- لا تقل "تم" بدون لصق الناتج الفعلي
- كل git push يتبع 8 خطوات (status → add → diff → commit → log → push → ls-remote → hash compare)
- التطبيق يجب أن يبقى شغالاً بعد كل تعديل

## المهمة: استخراج ui-utils.js من inline-scripts.js

### السياق
ملف inline-scripts.js = 4826 سطر. هذه أول خطوة في تقسيمه.
يوجد ملف REFACTOR_PLAN.md في الـ repo يحتوي على التحليل الكامل.

### الخطوات

#### 1. Clone + فحص
```bash
git clone https://YOUR_GITHUB_TOKEN@github.com/shoosh85-code/Qatar-standers-.git
cd Qatar-standers-
git config user.email "qatarspec@deploy.app"
git config user.name "QatarSpec Deploy"
cat REFACTOR_PLAN.md
```

#### 2. حدد الدوال المستهدفة
افحص inline-scripts.js وحدد هذه الدوال بالضبط:
- `showToast(msg, type, duration)` — سطر ~1324
- `gv(id, def)` — سطر ~2293
- `sanitizeText(str)` — سطر ~1365
- `renderMarkdownSafe(raw)` — سطر ~1380
- `safeRender(container, markdown)` — سطر ~1402
- `displayAIResponse(text, container)` — سطر ~4480
- `showSearchSkeleton()` — سطر ~4439
- `ESCAPE_MAP` — سطر ~1351

#### 3. أنشئ js/core/ui-utils.js
- أنشئ مجلد js/core/ إذا غير موجود
- انسخ الدوال المذكورة أعلاه إلى الملف الجديد
- تأكد إن كل دالة تبقى على window scope (لأن HTML يستدعيها بالاسم)
- أضف 'use strict'; في البداية

#### 4. أضف script tag في index.html
- أضف `<script src="/js/core/ui-utils.js" defer></script>` **قبل** inline-scripts.js
- هذا ضروري لأن inline-scripts.js يستدعي هذه الدوال

#### 5. اختبر
- `node --check js/core/ui-utils.js`
- `node --check inline-scripts.js`
- تأكد إن الدوال ما تتكرر (موجودة في ui-utils.js فقط)

#### 6. **مهم جداً**: لا تحذف الدوال من inline-scripts.js بعد
- أولاً: ارفع js/core/ui-utils.js + index.html المعدل
- تأكد إن الموقع يعمل
- **بعد التأكد فقط**: في commit منفصل، احذف الدوال المكررة من inline-scripts.js
- اختبر مرة ثانية

#### 7. Git Push (8 خطوات لكل commit)
```

---

### PROMPT A2 — تقسيم inline-scripts.js (المرحلة 2-5)

```
أنت مطور Full-Stack محترف تعمل على مشروع QatarSpec Pro.

## معلومات المشروع
- Repo: https://github.com/shoosh85-code/Qatar-standers-.git
- Stack: Vanilla HTML/JS + Vercel Serverless
- الموقع: qatar-standers.vercel.app

## القواعد الحمراء
- لا تحذف أي محتوى — فقط أضف أو عدّل
- لا تقل "تم" بدون لصق الناتج الفعلي
- كل git push يتبع 8 خطوات
- التطبيق يجب أن يبقى شغالاً بعد كل تعديل
- **خطير جداً: inline-scripts.js هو قلب التطبيق — أي خطأ يوقف كل شيء**

## المهمة: استكمال تقسيم inline-scripts.js

### السياق
- المرحلة 1 (ui-utils.js) تم تنفيذها في PROMPT A1
- اقرأ REFACTOR_PLAN.md في الـ repo للتحليل الكامل
- اقرأ js/core/ui-utils.js لتعرف ما تم استخراجه

### الخطة (نفّذ مرحلة واحدة في كل commit):

#### المرحلة 2: الأنظمة المعزولة (مخاطر منخفضة)
أنشئ هذه الملفات:
1. `js/core/video-system.js` — كل دوال الفيديو (_openIDB, _saveVideoToIDB, loadLocalVideo, createVideoPlayer, _applyVideoToDOM, _restoreVideosAfterDOMRebuild + المتغيرات _videoFiles, _IDB_NAME, _IDB_STORE, _idb)
2. `js/core/theme.js` — toggleTheme, applyTheme, prefers-color-scheme listener
3. `js/core/key-modal.js` — openKeyModal, closeKeyModal, saveKey

#### المرحلة 3: الأنظمة المتوسطة (مخاطر متوسطة)
1. `js/core/pro-system.js` — isProUser, getProExpiry, setProToken, getProToken, canSearch, renderProStatus, updateSearchCounterBar, openProModal, closeProModal, activatePro, showUpgradePrompt, requirePro, showPaymentContact
2. `js/core/forms.js` — switchForm, autoFillRFI, autoFillNCR, prefillNCR, copyITPtoClipboard, handleSitePhoto, photoNCR, toggleITPBar

#### المرحلة 4: التصدير والحاسبات (مخاطر متوسطة-عالية)
1. `js/core/export-handlers.js` — exportToPDF, exportToWord, loadJsPDF, loadHtml2Canvas, _pdfPageHeader, _printFallback, loadXLSX, exportRFIExcel, exportNCRExcel, exportITPExcel, exportDPRExcel, copyRFIText, copyNCRText, copyDPRText

#### المرحلة 5: AI والتحليل (مخاطر عالية)
1. `js/core/ai-search.js` — doSearch, quickSearch, buildQCSPrompt, getRelevantParts, filterCards, clearCardFilter, QCS_MAP, setLoadingSteps, uploadedFiles
2. `js/core/modals.js` — openDetail, goBack, closeDetailModal, shareDetail, printCurrentDetail, detailData Proxy, navStack, dedupeSectionContent

### لكل مرحلة:
1. Clone + اقرأ inline-scripts.js لتحديد الأسطر الدقيقة
2. أنشئ الملف الجديد
3. أضف script tag في index.html (قبل inline-scripts.js)
4. `node --check` للملف الجديد
5. Git push + تأكد إن الموقع يعمل
6. **بعد التأكد فقط**: احذف الدوال المنقولة من inline-scripts.js في commit منفصل
7. اختبر مرة ثانية + git push

### قاعدة ذهبية
لا تستخرج أكثر من ملف واحد في كل commit.
إذا فشل شيء → توقف فوراً واشرح الخطأ.
```

---

### PROMPT B1 — تفعيل البحث الدلالي (pgvector)

```
أنت مطور Full-Stack محترف تعمل على مشروع QatarSpec Pro.

## معلومات المشروع
- Repo: https://github.com/shoosh85-code/Qatar-standers-.git
- Stack: Vanilla HTML/JS + Vercel Serverless + Supabase
- الموقع: qatar-standers.vercel.app
- Supabase: مربوط (lib/supabase.js يقرأ env vars)

## القواعد الحمراء
- لا تحذف أي محتوى — فقط أضف أو عدّل
- لا تقل "تم" بدون لصق الناتج الفعلي
- كل git push يتبع 8 خطوات

## المهمة: تجهيز بيانات QCS 2024 للبحث الدلالي

### السياق
الملفات التالية موجودة بالفعل:
- `api/setup-vectors.js` — تفعيل pgvector + إنشاء function
- `api/generate-embeddings.js` — توليد embeddings
- `api/qcs-search.js` — البحث في الـ vectors
- `lib/supabase.js` — اتصال Supabase

### المطلوب

#### 1. Clone + فحص البنية الموجودة
```bash
git clone https://YOUR_GITHUB_TOKEN@github.com/shoosh85-code/Qatar-standers-.git
cd Qatar-standers-
cat api/setup-vectors.js
cat api/generate-embeddings.js
cat api/qcs-search.js
```

#### 2. أنشئ سكربت استخراج البيانات
أنشئ `scripts/extract-qcs-chunks.js`:
- اقرأ كل ملفات data_content_*.js (11 ملف)
- استخرج كل section كـ chunk منفصل
- لكل chunk أضف metadata:
  - `part`: رقم الجزء من QCS (مثل "Part 5 — Structural")
  - `section`: اسم القسم
  - `language`: ar أو en
  - `source_file`: اسم الملف المصدر
  - `content`: النص الكامل (500-1000 كلمة max)
- احفظ الناتج في `data/qcs-chunks.json`

ملفات البيانات المصدرية:
- data_content_roads.js (356KB) — Part 8: Roads
- data_content_utilities.js (288KB) — Part 9: Utilities
- data_content_extra.js (256KB) — Equipment + mixed
- data_content_structural.js (204KB) — Part 5: Structural
- data_content_phase4.js (92KB) — Phase 4 additions
- data_content_geotech.js (60KB) — Part 4: Geotechnical
- data_content_tools.js (48KB) — Tools/forms
- data/utilities-data.js, data/roads-data.js, data/structural-data.js

كل ملف يستخدم نمط: `window.QS_CONTENT['key'] = { title, content_ar, content_en, ... }`
أو نمط: `window.QS_CONTENT_EXTRA = { key: { title, content, ... } }`
افحص الملفات الفعلية لتحديد النمط الدقيق.

#### 3. أنشئ سكربت رفع البيانات
أنشئ `scripts/upload-chunks.js`:
- اقرأ `data/qcs-chunks.json`
- ارفعها إلى Supabase جدول `qcs_chunks`
- Schema: id, content, metadata (jsonb), embedding (vector 1536)

#### 4. عدّل generate-embeddings.js
- تأكد إنه يقرأ من جدول `qcs_chunks`
- يولّد embeddings باستخدام Gemini embedding API
- يحدّث عمود `embedding` لكل chunk

#### 5. عدّل qcs-search.js
- تأكد إنه يستخدم cosine similarity للبحث
- يرجع أفضل 5 نتائج مع metadata
- يدعم البحث بالعربي والإنجليزي

#### 6. Git Push
- ارفع `scripts/` + أي تعديلات على `api/`

### المرجع: فكرة من OpenConstructionEstimate
هذا الـ repo يستخدم Qdrant للبحث الدلالي. نحن نطبق نفس الفكرة لكن بـ Supabase pgvector (أبسط + أرخص).
الفكرة: text → embedding → vector DB → cosine similarity search → relevant chunks → AI enrichment
```

---

### PROMPT B2 — ربط البحث الدلالي بالواجهة

```
أنت مطور Full-Stack محترف تعمل على مشروع QatarSpec Pro.

## معلومات المشروع
- Repo: https://github.com/shoosh85-code/Qatar-standers-.git
- Stack: Vanilla HTML/JS + Vercel Serverless + Supabase pgvector
- الموقع: qatar-standers.vercel.app

## القواعد الحمراء
- لا تحذف أي محتوى — فقط أضف أو عدّل
- لا تقل "تم" بدون لصق الناتج الفعلي
- كل git push يتبع 8 خطوات

## السياق
- PROMPT B1 أنشأ الـ chunks وولّد الـ embeddings
- `api/qcs-search.js` يعمل ويرجع نتائج vector search
- `api/ai-proxy.js` هو الـ Gemini API proxy الحالي (31,700 bytes)

## المهمة: ربط البحث الدلالي بالواجهة + Hybrid Search

### المطلوب

#### 1. Clone + فحص
```bash
git clone https://YOUR_GITHUB_TOKEN@github.com/shoosh85-code/Qatar-standers-.git
cd Qatar-standers-
```
- اقرأ `api/ai-proxy.js` — افهم كيف يعمل البحث الحالي
- اقرأ `api/qcs-search.js` — افهم كيف يعمل vector search
- اقرأ inline-scripts.js — ابحث عن function doSearch()

#### 2. عدّل doSearch() لاستخدام Hybrid Search
المنطق الجديد:
```
1. المستخدم يكتب سؤال
2. أرسل السؤال إلى /api/qcs-search (vector search) — سريع 200ms
3. إذا وُجدت نتائج (score > 0.7):
   → اعرضها مباشرة كـ "نتائج فورية"
   → أرسل النتائج + السؤال إلى /api/ai-proxy لإثراء الإجابة
4. إذا لم تُوجد نتائج:
   → Fallback إلى /api/ai-proxy مباشرة (النظام الحالي)
```

#### 3. أضف UI للنتائج الفورية
- أضف div جديد فوق منطقة الإجابة: "نتائج من QCS 2024"
- اعرض الـ chunks المطابقة مع: عنوان القسم + مقتطف + رقم البند
- كل نتيجة قابلة للنقر → تفتح القسم الكامل (openDetail)

#### 4. عدّل ai-proxy.js ليستقبل QCS context
- أضف parameter جديد: `qcs_context` (النتائج من vector search)
- أدرج الـ context في system prompt لـ Gemini:
  "بناءً على النصوص التالية من QCS 2024: [context] ... أجب عن السؤال التالي: [query]"
- هذا يجعل إجابات Gemini أدق لأنها مبنية على نصوص حقيقية

#### 5. قياس الأداء
- اطبع في Console: زمن vector search + زمن AI response
- الهدف: النتائج الفورية تظهر في < 500ms

#### 6. Git Push
```

---

### PROMPT C1 — حاسبات إنشائية جديدة (4 حاسبات)

```
أنت مهندس إنشائي ومطور محترف تعمل على مشروع QatarSpec Pro.

## معلومات المشروع
- Repo: https://github.com/shoosh85-code/Qatar-standers-.git
- Stack: Vanilla HTML/JS + Vercel Serverless
- الموقع: qatar-standers.vercel.app
- الحاسبات الحالية: 51 حاسبة في data_calcs.js (1637 سطر)
- هيكل الحاسبات: js/calcs/ (core.js, structural.js, geotech.js, materials.js, roads.js, utilities.js)

## القواعد الحمراء
- لا تحذف أي محتوى — فقط أضف أو عدّل
- كل حاسبة يجب أن تحتوي: input validation + QCS reference + Pass/Fail أو نتيجة رقمية
- كل الوحدات قطرية (kN, MPa, mm, m, °C)
- لا تقل "تم" بدون لصق الناتج الفعلي
- كل git push يتبع 8 خطوات

## المهمة: إضافة 4 حاسبات تصميم إنشائي

### المرجع: Blueprints (github.com/Blueprints-org/blueprints)
استخدم الصيغ من هذا الـ repo (Eurocode) لكن عدّلها حسب QCS 2024 + ACI 318.

### الحاسبة 1: Beam Deflection (انحراف العارضة)
ملف: `js/calcs/structural.js` (أضف في نهايته)
```javascript
// المدخلات: span (m), load type (uniform/point), load (kN/m or kN), b (mm), h (mm), fc (MPa)
// الصيغ:
//   I = b*h³/12
//   Ec = 4700 * sqrt(fc) (ACI 318)
//   δ_uniform = 5*w*L⁴ / (384*Ec*I)
//   δ_point = P*L³ / (48*Ec*I)
//   الحد الأقصى: L/250 (QCS 2024 Section 5.3)
// المخرجات: δ (mm), δ_max (mm), Pass/Fail, utilization ratio
// المرجع: QCS 2024 Part 5, Section 5.3 + ACI 318-19 Ch.24
```

### الحاسبة 2: Isolated Footing Design (تصميم قاعدة منفردة)
```javascript
// المدخلات: P (kN), Mx (kN.m), My (kN.m), qa (kPa), fc (MPa), fy (MPa), cover (mm)
// الصيغ:
//   A_required = P / qa
//   B = L = sqrt(A_required) (مربعة)
//   q_max = P/(B*L) + 6*Mx/(B*L²) + 6*My/(B²*L)
//   Check: q_max ≤ qa
//   d_punching = sqrt(P / (0.33*sqrt(fc)*bo)) - حيث bo = 4*(col+d)
//   d_beam_shear = check one-way shear
//   As = Mu / (0.9*fy*(d-a/2))
// المخرجات: أبعاد القاعدة, سماكة, تسليح, Pass/Fail
// المرجع: QCS 2024 Part 5 + ACI 318-19 Ch.13
```

### الحاسبة 3: Retaining Wall Stability (استقرار جدار استنادي)
```javascript
// المدخلات: H (m), base_width (m), toe (m), heel (m), γ_soil (kN/m³), φ (°), γ_concrete (kN/m³), surcharge (kPa)
// الصيغ:
//   Ka = tan²(45 - φ/2) — Rankine
//   Pa = 0.5 * Ka * γ_soil * H²
//   Check overturning: FS_OT = ΣMr / ΣMo ≥ 2.0
//   Check sliding: FS_SL = μ*ΣV / ΣH ≥ 1.5
//   Check bearing: q_max ≤ qa
// المخرجات: FS_overturning, FS_sliding, q_max, Pass/Fail لكل فحص
// المرجع: QCS 2024 Part 5, Section 5.5 + QCS Part 4
```

### الحاسبة 4: Manning Pipe Flow (تدفق أنابيب المجاري)
```javascript
// المدخلات: D (mm), slope (%), n (Manning coefficient), depth_ratio (0-1)
// الصيغ:
//   θ = 2*arccos(1 - 2*depth_ratio)
//   A = (θ - sin(θ)) * D²/8
//   P = θ * D/2
//   R = A/P
//   V = (1/n) * R^(2/3) * S^(1/2)
//   Q = V * A
// المخرجات: velocity (m/s), flow rate (L/s), self-cleaning check (V ≥ 0.6 m/s)
// المرجع: QCS 2024 Part 9, KAHRAMAA sewerage standards
```

### لكل حاسبة:
1. أضف الدالة في js/calcs/structural.js (أو utilities.js لـ Manning)
2. أضف HTML الواجهة في القسم المناسب
3. أضف unit tests في tests/calculators/
4. `node --check` للملف
5. Git push

### واجهة كل حاسبة (HTML pattern):
- عنوان + وصف + QCS reference
- مدخلات مع labels عربي/إنجليزي + وحدات + validation
- زر "احسب"
- نتيجة: رقم + Pass/Fail + bar (utilization ratio)
- زر "شرح الحل" — يعرض خطوات الحساب
- زر "تصدير PDF"
```

---

### PROMPT C2 — حاسبات إنشائية إضافية (4 حاسبات)

```
أنت مهندس إنشائي ومطور محترف تعمل على مشروع QatarSpec Pro.

## معلومات المشروع
- Repo: https://github.com/shoosh85-code/Qatar-standers-.git
- Stack: Vanilla HTML/JS
- الحاسبات: 51 + 4 جديدة من PROMPT C1

## القواعد الحمراء
- لا تحذف أي محتوى — فقط أضف أو عدّل
- كل حاسبة: input validation + QCS reference + نتيجة
- كل git push يتبع 8 خطوات

## المهمة: إضافة 4 حاسبات إنشائية إضافية

### الحاسبة 5: Column Design (تصميم عمود خرساني)
```javascript
// المدخلات: Pu (kN), Mu (kN.m), b (mm), h (mm), fc (MPa), fy (MPa), cover (mm)
// الفحوصات:
//   Ag = b * h
//   Ast_min = 0.01 * Ag (ACI 318 — 1% minimum)
//   Ast_max = 0.08 * Ag (ACI 318 — 8% maximum)
//   φPn = 0.65 * (0.85*fc*(Ag-Ast) + fy*Ast) — for tied columns
//   Check: Pu ≤ φPn
//   Slenderness check: kLu/r
// المخرجات: Ast required, reinforcement ratio, φPn, Pass/Fail
// المرجع: QCS 2024 Part 5 + ACI 318-19 Ch.22
```

### الحاسبة 6: Pile Capacity (قدرة تحمل الخازوق)
```javascript
// المدخلات: D (mm), L (m), soil_type, SPT_N, fc (MPa)
// الصيغ:
//   End bearing: Qb = Ab * Nc * cu (cohesive) or Ab * Nq * σ'v (granular)
//   Skin friction: Qs = Σ(α * cu * As) (cohesive) or Σ(K * σ'v * tan(δ) * As) (granular)
//   Qu = Qb + Qs
//   Qa = Qu / FS (FS = 2.5 for static, 2.0 for dynamic)
//   Structural: φPn = 0.65 * (0.85*fc*Ag)
// المخرجات: Qb, Qs, Qu, Qa, structural capacity, governing capacity
// المرجع: QCS 2024 Part 5, Section 5.5
```

### الحاسبة 7: AASHTO Road Pavement Design (تصميم سماكة الرصف)
```javascript
// المدخلات: ESAL (from existing calcESAL), Mr (MPa), reliability (%), So, ΔPSI, drainage
// الصيغة: AASHTO 93
//   log(ESAL) = ZR*So + 9.36*log(SN+1) - 0.20 + log(ΔPSI/(4.2-1.5)) / (0.40+1094/(SN+1)^5.19) + 2.32*log(Mr) - 8.07
//   حل SN بالتكرار (Newton-Raphson)
//   Layer thicknesses: a1*D1 + a2*D2*m2 + a3*D3*m3 ≥ SN
// المخرجات: SN required, suggested layer thicknesses, comparison with QCS minimums
// المرجع: QCS 2024 Part 8 + AASHTO 93 Guide
```

### الحاسبة 8: Steel Connection (وصلة فولاذية بسيطة)
```javascript
// المدخلات: bolt_dia (mm), bolt_grade (4.6/8.8/10.9), n_bolts, plate_thickness (mm), Fu_plate (MPa), load_type (shear/tension/combined)
// الفحوصات:
//   Bolt shear: φRn = φ * Fnv * Ab * n_bolts
//   Bolt bearing: φRn = φ * 2.4*d*t*Fu
//   Plate tear-out: φRn = φ * 0.6*Fu*Anv
//   Block shear check
// المخرجات: capacity per check, governing failure mode, Pass/Fail
// المرجع: QCS 2024 Part 6 + AISC 360
```

### لكل حاسبة:
نفس نمط PROMPT C1:
1. أضف الدالة
2. أضف HTML
3. أضف unit tests
4. `node --check`
5. Git push
```

---

### PROMPT D1 — توليد المستندات التلقائي (Templates)

```
أنت مطور محترف ومهندس مدني تعمل على مشروع QatarSpec Pro.

## معلومات المشروع
- Repo: https://github.com/shoosh85-code/Qatar-standers-.git
- Stack: Vanilla HTML/JS + Vercel Serverless + Gemini API
- الموقع: qatar-standers.vercel.app
- نظام التصدير الحالي: js/export/ (pdf.js, word.js, word-pro.js, excel.js)
- AI Proxy: api/ai-proxy.js (Gemini 2.5 Pro + SSE streaming)
- Execution AI: api/execution-ai.js (متخصص في المهام الميدانية)

## القواعد الحمراء
- لا تحذف أي محتوى — فقط أضف أو عدّل
- كل مستند يتبع تنسيق Ashghal الرسمي
- لا تقل "تم" بدون لصق الناتج الفعلي
- كل git push يتبع 8 خطوات

## المرجع: DDC_Skills
من repo: github.com/datadrivenconstruction/DDC_Skills_for_AI_Agents_in_Construction
نستخدم 10-15 skill كـ system prompts لـ Gemini API.

## المهمة: إنشاء نظام توليد مستندات هندسية تلقائي

### 1. Clone + فحص
```bash
git clone https://YOUR_GITHUB_TOKEN@github.com/shoosh85-code/Qatar-standers-.git
cd Qatar-standers-
ls js/export/
cat api/execution-ai.js | head -50
```

### 2. أنشئ قوالب المستندات
أنشئ `data/templates/`:

#### method-statement.json
```json
{
  "type": "method_statement",
  "title_ar": "خطة تنفيذ أعمال",
  "title_en": "Method Statement",
  "sections": [
    { "id": "scope", "title_ar": "نطاق العمل", "title_en": "Scope of Work", "required": true },
    { "id": "references", "title_ar": "المراجع", "title_en": "References", "auto_fill": "QCS 2024 references based on work_type" },
    { "id": "materials", "title_ar": "المواد", "title_en": "Materials", "required": true },
    { "id": "equipment", "title_ar": "المعدات", "title_en": "Equipment", "required": true },
    { "id": "procedure", "title_ar": "إجراءات التنفيذ", "title_en": "Procedure", "required": true, "ai_generate": true },
    { "id": "safety", "title_ar": "السلامة", "title_en": "Safety", "auto_fill": "standard safety measures" },
    { "id": "quality", "title_ar": "ضبط الجودة", "title_en": "Quality Control", "ai_generate": true },
    { "id": "testing", "title_ar": "الاختبارات", "title_en": "Testing", "ai_generate": true },
    { "id": "hold_points", "title_ar": "نقاط التوقف", "title_en": "Hold Points", "ai_generate": true }
  ],
  "work_types": ["concrete_pour", "asphalt_paving", "pipe_laying", "excavation", "backfill", "waterproofing"]
}
```

#### itp-template.json, ncr-template.json, dpr-template.json (بنفس النمط)

### 3. أنشئ API endpoint
أنشئ `api/generate-document.js`:
- يستقبل: { template_type, work_type, project_name, engineer_name, inputs }
- يقرأ القالب من `data/templates/`
- يرسل الأقسام المعلّمة بـ `ai_generate: true` إلى Gemini API مع system prompt هندسي
- يملأ الأقسام الثابتة تلقائياً
- يرجع JSON كامل للمستند

System prompt لـ Gemini (مستوحى من DDC_Skills):
```
أنت مهندس مدني خبير في المواصفات القطرية QCS 2024.
اكتب [section_name] لـ [work_type] بناءً على:
- QCS 2024 Part [X], Section [Y]
- Ashghal RDM 2023
- اللغة: عربي + إنجليزي
- التنسيق: نقاط مرقمة مع مراجع دقيقة
```

### 4. أنشئ واجهة التوليد
أنشئ `js/doc-generator.js`:
- Wizard (multi-step) باستخدام stepper.js الموجود
- الخطوة 1: اختر نوع المستند
- الخطوة 2: اختر نوع العمل
- الخطوة 3: أدخل بيانات المشروع (اسم، مهندس، تاريخ)
- الخطوة 4: AI يولّد المحتوى (loading animation)
- الخطوة 5: راجع وعدّل
- الخطوة 6: صدّر PDF/Word

### 5. ربط مع التصدير الموجود
- استخدم js/export/word-pro.js لتصدير Word
- استخدم api/export-pdf.js لتصدير PDF
- أضف header + footer بتنسيق Ashghal الرسمي

### 6. Git Push
```

---

### PROMPT D2 — تحسين AI Prompts + أدوات المهندسين

```
أنت مطور محترف تعمل على مشروع QatarSpec Pro.

## معلومات المشروع
- Repo: https://github.com/shoosh85-code/Qatar-standers-.git
- Stack: Vanilla HTML/JS + Vercel Serverless
- الموقع: qatar-standers.vercel.app

## القواعد الحمراء
- لا تحذف أي محتوى — فقط أضف أو عدّل
- لا تقل "تم" بدون لصق الناتج الفعلي
- كل git push يتبع 8 خطوات

## المهمة الأولى: تحسين AI system prompts

### المرجع: structural_llama
من repo: github.com/joreilly86/structural_llama
نستخدم أنماط الـ system prompts الهندسية لتحسين ai-proxy.js.

### المطلوب:

#### 1. Clone + فحص
```bash
git clone https://YOUR_GITHUB_TOKEN@github.com/shoosh85-code/Qatar-standers-.git
cd Qatar-standers-
cat api/ai-proxy.js | head -100
```

#### 2. عدّل system prompt في ai-proxy.js
ابحث عن الـ system prompt الحالي وحسّنه:

```
أنت مهندس استشاري متخصص في المواصفات القطرية QCS 2024.

## قواعدك:
1. أجب **فقط** من نصوص QCS 2024 الرسمية — لا تخترع أرقام
2. اذكر المرجع الدقيق: Part → Section → Clause → الفقرة
3. إذا لم تجد الإجابة في QCS → قل "غير موجود في QCS 2024" واقترح: ACI/ASTM/BS
4. استخدم الوحدات القطرية: kN, MPa, mm, m, °C, kPa
5. قارن مع المعايير الدولية إذا طُلب: ACI 318, AISC 360, Eurocode 2/3
6. أضف تحذيرات السلامة عند اللزوم
7. اذكر Hold Points و Inspection requirements

## المواصفات المعتمدة في قطر:
- QCS 2024 (Qatar Construction Specifications) — 18 جزء
- Ashghal RDM 2023 (Road Design Manual)
- KAHRAMAA Regulations 2024
- MMUP Building Regulations
- FIDIC Conditions of Contract

## تنسيق الإجابة:
- عنوان واضح
- نقاط مرقمة مع مراجع
- جدول إذا لزم (حدود، نطاقات، مواصفات)
- QCS Clause في نهاية كل نقطة
```

#### 3. أضف domain-specific prompts
في `api/ai-proxy.js`، أضف prompts متخصصة حسب نوع السؤال:
- concrete questions → Part 5 context
- road questions → Part 8 context
- utilities questions → Part 9 context
- geotechnical questions → Part 4 context

---

## المهمة الثانية: صفحة أدوات AI للمهندسين

### المرجع: Awesome-Physical-Engineering-AI
من repo: github.com/010zx00x1/Awesome-Physical-Engineering-AI

### المطلوب:
أنشئ `tools.html` — صفحة مراجع بسيطة تحتوي:

#### الأقسام:
1. **أدوات التصميم المجانية**: FreeCAD, OpenSCAD, LibreCAD
2. **أدوات التحليل**: CalculiX (FEM), OpenFOAM (CFD), Code_Aster
3. **مكتبات Python**: NumPy, SciPy, PyVista, matplotlib
4. **أدوات AI/ML**: TensorFlow, PyTorch, scikit-learn
5. **أدوات BIM**: BlenderBIM, IfcOpenShell
6. **مراجع قطرية**: روابط QCS 2024, Ashghal, KAHRAMAA, MMUP

#### التنسيق:
- نفس تصميم index.html (header, footer, theme)
- RTL + عربي/إنجليزي
- كل أداة: اسم + وصف مختصر + رابط + free/paid badge
- أضف رابط في index.html يشير إلى tools.html

### Git Push
```

---

## ملخص البرومبتات

| # | البرومبت | المرحلة | المدة | يعتمد على |
|---|---------|---------|-------|-----------|
| A1 | تقسيم inline-scripts (ui-utils) | الأداء | 1 جلسة | لا شيء |
| A2 | تقسيم inline-scripts (باقي) | الأداء | 2-3 جلسات | A1 |
| B1 | تجهيز بيانات pgvector | البحث | 1 جلسة | لا شيء |
| B2 | ربط البحث بالواجهة | البحث | 1 جلسة | B1 |
| C1 | 4 حاسبات (Beam, Footing, Wall, Manning) | الحاسبات | 1-2 جلسات | لا شيء |
| C2 | 4 حاسبات (Column, Pile, AASHTO, Steel) | الحاسبات | 1-2 جلسات | C1 |
| D1 | نظام توليد المستندات | الأتمتة | 2 جلسات | لا شيء |
| D2 | تحسين AI + أدوات المهندسين | الأتمتة | 1 جلسة | لا شيء |

### ترتيب التنفيذ المقترح:
```
الأسبوع 1:  A1 → A2 (الأداء — أساسي)
الأسبوع 2:  A2 (تكملة) → B1 (بيانات)
الأسبوع 3:  B2 (ربط البحث) → C1 (حاسبات)
الأسبوع 4:  C2 (حاسبات) → D1 (مستندات)
الأسبوع 5:  D1 (تكملة) → D2 (AI + أدوات)
```

### ملاحظات مهمة:
1. **استبدل `YOUR_GITHUB_TOKEN`** بتوكن جديد في كل برومبت (وألغِ القديم فوراً)
2. **C1 و C2 مستقلان** عن A و B — يمكن تنفيذهما بالتوازي
3. **D1 يعمل مع Gemini API الموجود** — لا يحتاج pgvector
4. كل برومبت **مستقل** — يمكن نسخه في جلسة Claude منفصلة
