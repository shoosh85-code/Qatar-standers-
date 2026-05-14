# QatarSpec Pro — خطة التطوير التفصيلية v1.0

> تاريخ: 2026-05-15
> الإصدار الحالي: v2.11.0
> الهدف: من مرجع رقمي إلى منصة هندسية متكاملة

---

## الوضع الحالي (ما عندك فعلاً)

### الأرقام الحقيقية
| المقياس | القيمة |
|---------|--------|
| ملفات JS | 107 |
| إجمالي الأسطر | 63,809 |
| حجم JS الكلي | 4.7 MB |
| ملفات البيانات | 11 ملف (1,508 KB) |
| API Endpoints | 20 endpoint |
| الحاسبات | 51 دالة في data_calcs.js |
| index.html | 1,712 سطر |

### البنية التحتية الموجودة (لا تحتاج بناء من صفر)
- ✅ **Supabase** — مربوط وشغال (auth-proxy, qcs-search, supabase-proxy)
- ✅ **pgvector** — generate-embeddings.js + setup-vectors.js + qcs-search.js موجودين
- ✅ **Rate Limiting** — Upstash Redis (rate-limit.js)
- ✅ **Payment** — Tap payment gateway (tap.js + tap-webhook.js)
- ✅ **AI Proxy** — Gemini 2.5 Pro + SSE streaming (ai-proxy.js — 31,700 bytes)
- ✅ **Vision** — vision-proxy.js لتحليل المخططات
- ✅ **Export** — PDF + Word + Excel (api/export-pdf.js + js/export/)
- ✅ **Tests** — content-integrity + integration + e2e
- ✅ **PWA** — Service Worker v3.7.0 + manifest + offline support

### ما ينقص فعلاً
- ❌ البحث الدلالي **مش مفعّل** — embeddings لم تُولّد بعد
- ❌ الحاسبات **أساسية** — Pass/Fail فقط، لا يوجد تحليل إنشائي
- ❌ توليد المستندات **يدوي** — لا أتمتة لـ ITP/NCR/Method Statement
- ❌ الأداء **بطيء** — 4.7MB JS، inline-scripts.js = 4826 سطر
- ❌ لا يوجد **testing حقيقي** للحاسبات (unit tests)

---

## المراحل الأربعة

---

## المرحلة A: الأداء (أسبوع 1-2)

### لماذا أولاً؟
مستخدم ينتظر 5+ ثوان لتحميل الصفحة ما راح يشوف أي ميزة جديدة. الأداء هو الأساس.

### المهام

#### A1: تقسيم inline-scripts.js
- REFACTOR_PLAN.md جاهز (196 دالة محللة، 16 module مقترح)
- **المرحلة 1**: استخراج ui-utils.js (showToast, gv, sanitizeText) — صفر مخاطر
- **المرحلة 2**: استخراج video-system.js, theme.js, key-modal.js — مخاطر منخفضة
- **المرحلة 3**: استخراج language.js, pro-system.js, forms.js
- **المرحلة 4**: استخراج export-pdf-word.js, export-excel.js, calculators-ui.js
- **المرحلة 5**: استخراج ai-search.js, modals.js, doc-analysis.js
- **الهدف**: inline-scripts.js من 4826 سطر إلى ~500 سطر (bootstrap فقط)
- **المخاطر**: عالية — هذا قلب التطبيق. كل خطوة تحتاج اختبار كامل

#### A2: Code Splitting للبيانات
- data_content_roads.js (356KB) + data_content_utilities.js (288KB) = أكبر ملفين
- loader.js يدعم lazy loading بالفعل — تأكد إن كل الملفات تُحمّل on-demand فقط
- أضف `loading="lazy"` للصور إذا وُجدت

#### A3: تحسين Service Worker
- sw.js v3.7.0 موجود — تحقق إن precache list محدثة
- أضف ملفات js/core/*.js الجديدة للـ cache

### النتيجة المتوقعة
- First Load: من ~5s إلى ~2.5s
- JS المحمّل مبدئياً: من 4.7MB إلى ~1.5MB

### الأدوات المطلوبة
- لا شيء جديد — كل شيء بـ Vanilla JS

---

## المرحلة B: البحث الدلالي (أسبوع 3-4)

### لماذا ثانياً؟
البحث هو أول شيء يستخدمه الزائر. حالياً يعتمد على Gemini API (بطيء + مكلف + يحتاج إنترنت). البحث الدلالي المحلي أسرع 10x وأرخص.

### البنية الموجودة (لا تحتاج بناء)
```
api/setup-vectors.js    → تفعيل pgvector في Supabase ✅
api/generate-embeddings.js → توليد embeddings ✅
api/qcs-search.js       → البحث في الـ vectors ✅
lib/supabase.js          → اتصال Supabase ✅
```

### المهام

#### B1: تفعيل pgvector في Supabase
- شغّل `api/setup-vectors.js` لتفعيل pgvector extension
- أنشئ جدول `qcs_chunks` مع عمود `embedding` (vector 1536)
- أنشئ function `match_chunks` للبحث بالتشابه

#### B2: تجهيز البيانات
- استخرج محتوى QCS 2024 من ملفات data_content_*.js
- قسّم كل قسم إلى chunks (500-1000 كلمة)
- أضف metadata: part_number, section, clause, language
- **المصدر المقترح من الـ repos**: DDC_Skills يحتوي على templates لاستخراج البيانات من PDFs

#### B3: توليد Embeddings
- استخدم OpenAI text-embedding-3-small (أرخص وأدق من ada-002)
- أو استخدم Gemini embedding-001 (عندك API key بالفعل)
- شغّل `api/generate-embeddings.js` على دفعات (batch_size=50)
- الهدف: ~2000-5000 chunk مع embeddings

#### B4: ربط البحث الجديد بالواجهة
- عدّل doSearch() في inline-scripts.js ليستخدم `/api/qcs-search` أولاً
- Fallback: إذا pgvector ما لقى نتائج → استخدم Gemini API
- هذا يخفض تكلفة Gemini API بنسبة ~70%

### النتيجة المتوقعة
- سرعة البحث: من 3-5s (Gemini) إلى 200-500ms (pgvector)
- تكلفة: انخفاض ~70% في Gemini API calls
- دقة: أعلى لأن النتائج من نصوص QCS الفعلية

### الأدوات المطلوبة
- Supabase (موجود) + pgvector extension (مجاني)
- OpenAI API key أو Gemini embedding API (موجود)

### الـ Repos المفيدة هنا
| Repo | ما نستخدم منه | ما نتجاهله |
|------|-------------|-----------|
| OpenConstructionEstimate-DDC-CWICR | فكرة Qdrant → نطبقها على pgvector | Qdrant نفسه (Supabase أبسط) |
| DDC_Skills | Templates لاستخراج PDF data | الـ 221 skill كلها (نأخذ 10-15 فقط) |

---

## المرحلة C: الحاسبات المتقدمة (أسبوع 5-6)

### لماذا ثالثاً؟
الحاسبات هي اللي تحوّل Free → Pro. حالياً عندك 51 حاسبة Pass/Fail — الهدف إضافة حاسبات تحليل إنشائي حقيقية.

### المهام

#### C1: حاسبات إنشائية جديدة (Vanilla JS)
هذي الحاسبات تُكتب بـ JS مباشرة — ما نحتاج Python:

| الحاسبة | الوصف | المرجع | الصعوبة |
|---------|-------|--------|---------|
| Beam Deflection | حساب الانحراف لعارضة بسيطة/مستمرة | ACI 318 + QCS S5 | متوسطة |
| Column Design | تصميم عمود خرساني (Pn, Mn) | ACI 318 Ch.22 | عالية |
| Footing Design | تصميم قاعدة منفردة | QCS S5 + ACI 318 | متوسطة |
| Retaining Wall | تحقق من استقرار جدار استنادي | QCS S5 | عالية |
| Pile Capacity | حساب قدرة تحمل الخازوق | QCS S5.5 | متوسطة |
| Steel Connection | تحقق من وصلات فولاذية | AISC + QCS S6 | عالية |
| Pipe Flow (Manning) | حساب تدفق المجاري | QCS S8 | سهلة |
| Road Pavement (AASHTO) | تصميم سماكة الرصف | AASHTO 93 + QCS S8 | متوسطة |

#### C2: Unit Tests للحاسبات
- أنشئ `tests/calculators/` مع test cases لكل حاسبة
- كل test case يتحقق من: input validation, formula accuracy, QCS compliance
- الهدف: 100% coverage للحاسبات الجديدة + 80% للموجودة

#### C3: تحسين واجهة الحاسبات
- Stepper موجود (stepper.js) — استخدمه للحاسبات المعقدة (multi-step)
- أضف رسوم بيانية (Chart.js موجود) لعرض النتائج
- أضف "شرح الحل" — خطوات الحساب بالتفصيل مع QCS reference

### الـ Repos المفيدة هنا
| Repo | ما نستخدم منه | ما نتجاهله |
|------|-------------|-----------|
| Blueprints | الصيغ الهندسية + قاعدة بيانات المقاطع الفولاذية | Python code (نعيد كتابته بـ JS) |
| CalcForge | فكرة الحاسبات المتقدمة + UI patterns | PyNite/PySlope (Python فقط) |

### النتيجة المتوقعة
- من 51 حاسبة إلى 59+ حاسبة
- حاسبات تصميم حقيقية (مش Pass/Fail فقط)
- هذا يبرر Pro tier (99 QAR/شهر)

---

## المرحلة D: الأتمتة والتوليد (أسبوع 7-8)

### لماذا رابعاً؟
هذي الميزة للـ Enterprise — توليد تلقائي للمستندات الهندسية.

### المهام

#### D1: قوالب المستندات
- أنشئ `templates/` مع قوالب جاهزة:
  - Method Statement (JSON template → PDF/Word)
  - ITP — Inspection Test Plan
  - NCR — Non-Conformance Report
  - DPR — Daily Progress Report
  - RFI — Request for Information
- كل قالب يتبع تنسيق Ashghal الرسمي

#### D2: توليد ذكي بالـ AI
- استخدم Gemini API (الموجود) لملء القوالب تلقائياً
- المستخدم يختار نوع المستند + يدخل بيانات المشروع الأساسية
- AI يولّد المحتوى بناءً على QCS 2024 + بيانات المشروع
- Export إلى Word/PDF بتنسيق Ashghal

#### D3: DDC Skills Integration
- من الـ 221 skill، اختر 10-15 المتعلقة بـ:
  - Quality Control (QC inspection checklists)
  - Method Statement generation
  - ITP generation
  - Material submittal review
- استخدمها كـ system prompts لـ Gemini API

### الـ Repos المفيدة هنا
| Repo | ما نستخدم منه | ما نتجاهله |
|------|-------------|-----------|
| DDC_Skills | 10-15 skill كـ AI prompts | الباقي (ما يخص QCS) |
| OpenConstructionEstimate | فكرة n8n workflows | n8n نفسه (معقد للـ MVP) |

### النتيجة المتوقعة
- توليد Method Statement في 2 دقيقة بدل 2 ساعة
- هذا يبرر Enterprise tier (999 QAR/شهر)

---

## ما لا يُنفذ الآن (ولماذا)

| الفكرة | السبب | متى؟ |
|--------|-------|------|
| BIM model-checker (IFC) | جمهور محدود جداً + WASM ثقيل | ربما v4.0 |
| Local LLM (structural_llama) | يحتاج GPU server + مكلف + Gemini كافي حالياً | لا يُنفذ |
| Qdrant (بدل pgvector) | Supabase pgvector أبسط وأرخص ويكفي | لا يُنفذ |
| React/Vue migration | 63,000+ سطر JS — إعادة كتابة = 6 أشهر | لا يُنفذ |
| n8n workflows | معقد للـ MVP — Gemini API + templates أبسط | ربما v4.0 |
| FEM analysis (PyNite) | Python فقط — يحتاج VPS + Docker | ربما v5.0 |
| Awesome list page | قيمة منخفضة — صفحة HTML بسيطة | يوم واحد متى ما تبي |

---

## الجدول الزمني

```
أسبوع 1-2:  [████████████████████] المرحلة A — الأداء
أسبوع 3-4:  [████████████████████] المرحلة B — البحث الدلالي
أسبوع 5-6:  [████████████████████] المرحلة C — الحاسبات
أسبوع 7-8:  [████████████████████] المرحلة D — الأتمتة

الإصدار المستهدف: v3.5.0 (بعد 8 أسابيع)
```

---

## التكلفة التقديرية

| البند | الشهري | ملاحظة |
|-------|--------|--------|
| Vercel Pro | $20 | موجود |
| Supabase Pro | $25 | يدعم pgvector |
| Gemini API | $10-30 | ينخفض 70% بعد المرحلة B |
| OpenAI Embeddings | $5 (مرة واحدة) | لتوليد الـ embeddings |
| Upstash Redis | $0 (free tier) | موجود |
| **المجموع** | **$55-75/شهر** | |

---

## قواعد التنفيذ

1. **مرحلة واحدة في كل مرة** — لا تبدأ B قبل اكتمال A
2. **اختبار بعد كل خطوة** — الموقع يجب أن يبقى شغال
3. **لا تحذف شيء** — أضف أو عدّل فقط
4. **Git protocol 8 خطوات** — لكل push
5. **Fallback دائماً** — كل ميزة جديدة لها fallback للنظام القديم

---

## الخطوة التالية

ابدأ بـ **المرحلة A1** — استخراج ui-utils.js من inline-scripts.js.
هذي أسهل وأأمن خطوة، وتفتح الباب لكل شيء بعدها.
