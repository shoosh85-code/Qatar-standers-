# QatarSpec Pro — استراتيجية الـ Repos (بدون حذف)

---

## 1. Fork Instructions — تنفذها أنت من GitHub

> افتح كل رابط واضغط "Fork" في أعلى اليمين

| # | الـ Repo | رابط Fork |
|---|---------|-----------|
| 1 | Blueprints | https://github.com/Blueprints-org/blueprints → Fork |
| 2 | DDC_Skills | https://github.com/datadrivenconstruction/DDC_Skills_for_AI_Agents_in_Construction → Fork |
| 3 | OpenConstructionEstimate | https://github.com/datadrivenconstruction/OpenConstructionEstimate-DDC-CWICR → Fork |
| 4 | CalcForge | https://github.com/slukiceng/CalcForge → Fork |
| 5 | structural_llama | https://github.com/joreilly86/structural_llama → Fork |
| 6 | Awesome-Physical-AI | https://github.com/010zx00x1/Awesome-Physical-Engineering-AI → Fork |

**لماذا Fork:**
- مرجع دائم حتى لو الأصلي يُحذف
- يظهر أنك تساهم في open source
- يمكنك إرسال Pull Requests (ترفع سمعتك)
- لا يكلف شيء

---

## 2. Value Extraction — ما لم يُستخدم بعد

### 2.1 من Blueprints → حاسبات تصميم إنشائي (Pro Tier)

| الحاسبة | المصدر في Blueprints | QCS Reference | الأولوية |
|---------|---------------------|---------------|---------|
| Steel Section Selector | Steel Profile DB (500+ مقطع) | QCS §S5-P6 | 🔴 عالي |
| Beam Deflection Check | formulas/beam_deflection.py | BS EN 1992 | 🔴 عالي |
| Column Interaction Diagram | formulas/column_design.py | ACI 318 / QCS | 🟠 متوسط |
| Punching Shear Check | formulas/punching_shear.py | BS EN 1992-1-1 | 🟠 متوسط |
| Retaining Wall Stability | formulas/retaining_wall.py | BS EN 1997 | 🟡 منخفض |
| Anchorage Length Calculator | formulas/anchorage.py | QCS §S5-P5 | 🟠 متوسط |

**طريقة التحويل:**
1. اقرأ الـ Python formula
2. أعد كتابتها بـ Vanilla JS
3. غيّر المراجع من Eurocode إلى QCS 2024
4. أضف input validation + Pass/Fail + QCS clause reference
5. أضفها في `data_calcs.js`

### 2.2 من DDC_Skills → أتمتة مستندات (Enterprise Tier)

| الـ Skill | الوصف | الاستخدام في QatarSpec | الأولوية |
|-----------|-------|----------------------|---------|
| Daily Progress Report | توليد تقرير يومي | Pro: template + AI fill | 🔴 عالي |
| Safety Audit Checklist | قائمة فحص سلامة | Pro: per section | 🔴 عالي |
| Cost Estimate Summary | ملخص تكاليف | Enterprise: per element | 🟠 متوسط |
| Risk Register | سجل المخاطر | Enterprise: per project | 🟠 متوسط |
| Variation Order | أمر تغيير | Enterprise: FIDIC format | 🟡 منخفض |
| Progress Payment | شهادة دفع | Enterprise: FIDIC IPC | 🟡 منخفض |
| Site Instruction | تعليمات موقع | Pro: quick form | 🟠 متوسط |
| Meeting Minutes | محضر اجتماع | Pro: AI summary | 🟡 منخفض |
| Material Approval | موافقة مواد | Pro: checklist + QCS ref | 🔴 عالي |
| RFI (Request for Info) | طلب معلومات | Pro: already exists ✅ | ✅ تم |

### 2.3 من OpenConstructionEstimate → RAG Pipeline (بحث أسرع 10×)

**الحالة الحالية:**
- Supabase pgvector مُفعّل جزئياً (182 chunk)
- Gemini embedding-001 model
- بحث 3-5 ثواني + $0.01/بحث

**المستهدف:**
- 2000+ QCS chunks
- بحث 200ms + $0/بحث
- Hybrid search: pgvector + keyword fallback

**الخطوات:**
1. إكمال تقسيم QCS 2024 PDF إلى chunks (جزئياً تم)
2. توليد embeddings لكل chunk عبر admin-embeddings.html
3. تفعيل api/qcs-search.js كبديل أساسي لـ Gemini
4. Gemini يصبح fallback فقط

### 2.4 من CalcForge → تحسين UX الحاسبات

| التحسين | الوصف | الأولوية |
|---------|-------|---------|
| Step-by-step Solution | عرض خطوات الحل مع مراجع | 🔴 عالي |
| Chart.js Integration | رسم بياني لنتائج الحاسبة | 🟠 متوسط |
| Multi-step Wizard | حاسبة متعددة الخطوات | 🟡 منخفض |
| PDF Export per Calc | تصدير نتيجة حاسبة كـ PDF | 🟠 متوسط |

---

## 3. تحويل الـ Repos إلى Revenue (نموذج العمل)

```
FREE TIER (الحالي):
├── 951 جدول مرجعي (QCS 2024)
├── 6 حاسبات Pass/Fail أساسية
├── بحث AI بسيط (5/دقيقة)
└── استعراض المحتوى ثنائي اللغة

PRO TIER — 99 QAR/شهر (من الـ Repos):
├── من Blueprints → 8 حاسبات تصميم إنشائي
├── من DDC_Skills → توليد ITP/NCR/DPR تلقائي
├── من CalcForge → عرض خطوات الحل + charts
├── من pgvector → بحث سريع (60/دقيقة)
├── تصدير PDF/Word/Excel بشعار المشروع
└── مساعد AI متخصص (بحث + generate)

ENTERPRISE — 499 QAR/شهر (مستقبلي):
├── من DDC_Skills → 15 skill إضافي
├──   (Daily Report, Safety Audit, Cost Estimate)
├── من model-checker → فحص BIM models (مستقبلي)
├── من structural_llama → مساعد AI إنشائي
├── API access + white-label + multi-project
└── SLA + priority support
```

---

## 4. Content Marketing من الـ Repos

### مقالات مقترحة (LinkedIn / Blog):

| # | العنوان | الـ Repo | الهدف |
|---|---------|---------|-------|
| 1 | "كيف حوّلنا 7 مكتبات مفتوحة المصدر إلى أداة هندسية لسوق قطر" | الكل | Awareness |
| 2 | "من Python إلى JavaScript: إعادة كتابة صيغ Eurocode لـ QCS 2024" | Blueprints | Technical credibility |
| 3 | "221 مهارة AI للبناء: كيف اخترنا 15 فقط لمهندس قطر" | DDC_Skills | Decision-making |
| 4 | "pgvector vs Gemini: كيف خفّضنا تكلفة البحث 70% وسرعته 10×" | OpenConstructionEstimate | Technical depth |
| 5 | "Open Source in Construction: لماذا المستقبل مفتوح" | الكل | Thought leadership |

### فوائد Content Marketing:
- بناء سمعة كمطور يستخدم open source بذكاء
- جذب مهندسين مطورين
- SEO traffic مجاني
- شفافية = ثقة
- تواصل مع أصحاب الـ Repos (networking)

---

## 5. الجدول الزمني

| الأسبوع | المهمة | الـ Repo | التأثير |
|---------|--------|---------|---------|
| 1 | ✅ ATTRIBUTIONS.md | الكل | حماية قانونية |
| 1 | Fork all repos | الكل | حماية مراجع |
| 2-3 | Steel Section Selector | Blueprints | Pro feature جديد |
| 2-3 | Daily Progress Report | DDC_Skills | Pro feature جديد |
| 4-6 | pgvector full activation | OpenConstructionEstimate | بحث أسرع 10× |
| 4-6 | Step-by-step solution display | CalcForge | UX أفضل |
| 7-8 | Material Approval workflow | DDC_Skills | Pro feature |
| 8+ | مقالات LinkedIn (1/أسبوع) | الكل | Marketing |

---

*هذا المستند جزء من QatarSpec Pro — لا يُوزّع خارج فريق التطوير*
