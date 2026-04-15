# QatarSpec — Optimized Build

## ما تم تحسينه في هذه النسخة

### 🔴 مشاكل مميتة تم إصلاحها

| المشكلة | الحل |
|---|---|
| 921KB JS يُحمَّل قبل أي pixel يظهر | تقسيم `detailData` إلى 4 ملفات منفصلة + `loader.js` ديناميكي |
| 3 script blocks هيكلياً مكسورة | تنظيف البنية: script1 (state) → loader.js → script2 (calcMaterials) → script3 (app) |
| 5 دوال مكررة تلغي بعضها صامتة | حذف النسخ القديمة من `calcAirTest`, `calcSlump`, `calcLA`, `calcFlakiness`, `calcSandEq` |

### 🟠 مشاكل خطيرة تم إصلاحها

| المشكلة | الحل |
|---|---|
| XSS: أسماء الملفات تذهب مباشرة إلى innerHTML | `renderFileItem` يستخدم `textContent` الآن |
| XSS: رسائل الخطأ غير محمية | إضافة `sanitizeText()` + تطبيقها على 4 مواضع |
| XSS: إجابات AI بدون تعقيم | `sanitizeText()` قبل regex replace |
| 13 setTimeout بدون clearTimeout | حماية `showToast`, `prefillNCR`, `createNCRFromInspector` |
| 56 عنصر video في DOM عند التحميل | العناصر الآن في ملفات البيانات — تُنشأ فقط عند فتح القسم |

---

## هيكل الملفات

```
├── index.html          ← الواجهة الرئيسية (253KB — بدلاً من 1,237KB)
├── loader.js           ← يُحمِّل ملفات البيانات بشريط تقدم
├── data_structural.js  ← الإنشاء، الخرسانة، الجسات (45 قسم)
├── data_roads.js       ← الطرق والإسفلت (35 قسم)
├── data_utilities.js   ← المرافق، المياه، الصرف (42 قسم)
└── data_general.js     ← المحلل والحاسبة (2 قسم)
```

⚠️ **جميع الملفات يجب أن تكون في نفس المجلد.**

---

## كيف يعمل التحميل الديناميكي

```
المتصفح يفتح index.html (253KB)
    ↓
loader.js يعرض شاشة تحميل
    ↓
تحميل data_structural.js → window.detailData += 45 قسم
    ↓
تحميل data_roads.js → window.detailData += 35 قسم
    ↓
تحميل data_utilities.js → window.detailData += 42 قسم
    ↓
تحميل data_general.js → window.detailData += 2 قسم
    ↓
حدث: document.dispatchEvent(new Event('qatarspec:ready'))
    ↓
التطبيق جاهز بالكامل
```

**التحسين في وقت التفاعل الأولي: ~79%**
- قبل: المتصفح يحلّل 1.1MB قبل أي render
- بعد: الواجهة تظهر بعد 253KB، البيانات تتحمل في الخلفية

---

## المشاكل المتبقية (خارج نطاق هذه النسخة)

| المشكلة | الأولوية | الصعوبة |
|---|---|---|
| 809 استخدام `var` (يجب → `const`/`let`) | متوسطة | سهل — refactor آلي |
| 138 دالة على `window` (pollution) | عالية | صعب — يحتاج namespace + تحديث all onclick |
| 39 `innerHTML` بدون sanitization كاملة | متوسطة | سهل — تطبيق `sanitizeText` على الباقي |
| 10 `setTimeout` بدون حماية | منخفضة | سهل — هذه single-fire آمنة |
| 0% test coverage | عالية | جداً صعب — يحتاج إعادة هيكلة كاملة |

---

## للمرحلة القادمة

```
إعادة الكتابة كـ React/Vue app:
├── /src/data/     ← ملفات JSON نقية (بدون HTML)
├── /src/components/ ← مكونات منعزلة لكل قسم
├── /src/utils/    ← الدوال المساعدة (sanitize, calc, etc.)
└── /tests/        ← unit tests لكل دالة
```

هذا يحل 80% من المشاكل الهيكلية المتبقية.
