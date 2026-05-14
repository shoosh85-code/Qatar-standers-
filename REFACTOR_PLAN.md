# خطة تقسيم inline-scripts.js

> تاريخ التحليل: 2026-05-15
> الإصدار الحالي: inline-scripts.js v2.10.0

---

## الإحصائيات

| المقياس | القيمة |
|---------|--------|
| إجمالي الأسطر | 4,826 |
| Named Functions | 152 |
| Arrow/Anonymous | ~44 |
| إجمالي الـ Functions (تقريبي) | ~196 |
| Global Variables (top-level) | ~25 |
| DOMContentLoaded Listeners | 5 |
| addEventListener Calls | ~20 |
| Cross-file References (showToast) | 96 مرة |
| Cross-file References (gv) | 70 مرة |
| الملفات المقترحة للتقسيم | 12 |

---

## أكثر الدوال استخداماً (Hot Functions)

| الدالة | عدد المراجع | ملاحظة |
|--------|-------------|--------|
| `showToast()` | 96 | يُستدعى من كل مكان — يجب أن يكون في ملف مشترك |
| `gv()` | 70 | اختصار للـ getElementById — مستخدم في كل الـ exports |
| `openDetail()` | 21 | فتح الـ detail modal |
| `isProUser()` | 12 | فحص حالة Pro |
| `sanitizeText()` | 8 | حماية XSS |
| `renderMarkdownSafe()` | 8 | عرض Markdown |
| `safeRender()` | 8 | عرض آمن في DOM |
| `filterCards()` | 6 | تصفية البطاقات |
| `fetchGeminiAPI()` | 6 | استدعاء AI API |
| `loadXLSX()` | 6 | تحميل مكتبة Excel |
| `getProToken()` | 5 | قراءة توكن Pro |
| `dedupeSectionContent()` | 4 | إزالة المحتوى المكرر |

---

## التقسيم المقترح

| # | الملف الجديد | عدد Functions | الأسطر (تقريبي) | الوصف |
|---|---|---|---|---|
| 1 | `js/core/ui-utils.js` | 12 | ~250 | showToast, gv, sanitizeText, renderMarkdownSafe, safeRender, ESCAPE_MAP, displayAIResponse, showSearchSkeleton |
| 2 | `js/core/app-init.js` | 5 | ~120 | window.onload, qsTrack, gtag, updateKeyStatus, checkForUpdates, APP_VERSION |
| 3 | `js/core/ai-search.js` | 10 | ~350 | doSearch, quickSearch, buildQCSPrompt, getRelevantParts, filterCards, clearCardFilter, QCS_MAP, setLoadingSteps |
| 4 | `js/core/modals.js` | 8 | ~250 | openDetail, goBack, closeDetailModal, shareDetail, printCurrentDetail, detailData Proxy, navStack, dedupeSectionContent |
| 5 | `js/core/key-modal.js` | 4 | ~80 | openKeyModal, closeKeyModal, saveKey, updateKeyStatus |
| 6 | `js/core/export-pdf-word.js` | 6 | ~350 | exportToPDF, exportToWord, loadJsPDF, loadHtml2Canvas, _pdfPageHeader, _printFallback |
| 7 | `js/core/export-excel.js` | 8 | ~400 | loadXLSX, exportRFIExcel, exportNCRExcel, exportITPExcel, exportDPRExcel, copyRFIText, copyNCRText, copyDPRText |
| 8 | `js/core/forms.js` | 8 | ~180 | switchForm, autoFillRFI, autoFillNCR, prefillNCR, copyITPtoClipboard, handleSitePhoto, photoNCR, toggleITPBar |
| 9 | `js/core/calculators-ui.js` | 14 | ~400 | calcESAL, validateMixDesign, calcPipeSize, calcSoundness, calcAbsorption, calcMoisture, calcConcreteTemp, calcThickness, calcHotWeather, calcSulphateRisk, addQuickNCR, renderQuickNCRs, clearQuickNCRs, exportQuickNCRs |
| 10 | `js/core/video-system.js` | 10 | ~250 | _openIDB, _saveVideoToIDB, _loadAllVideosFromIDB, _deleteVideoFromIDB, loadLocalVideo, createVideoPlayer, _applyVideoToDOM, _restoreVideosAfterDOMRebuild, restoreAllVideoUI, restoreVideoUI, _videoFiles Map, _IDB_* |
| 11 | `js/core/doc-analysis.js` | 10 | ~500 | handleDocUpload, runDocAnalysis, getProjectAnalysis, selectDaType, handleDaUpload, getDaSystemPrompt, formatDaResult, copyDaResult, runDrawingAnalysis, generateDaFallback, docUploaded |
| 12 | `js/core/inspector.js` | 7 | ~250 | inspectorLoadImage, runInspector, generateLocalAnalysis, showInspectorResult, shareInspectorReport, inspectorToNCR, resetInspector, showExecStep |
| 13 | `js/core/pro-system.js` | 14 | ~350 | isProUser, getProExpiry, setProActive, setProToken, getProToken, getTodayKey, getSearchCount, incrementSearch, canSearch, renderProStatus, updateSearchCounterBar, openProModal, closeProModal, activatePro, showUpgradePrompt, closeUpgradeOverlay, requirePro, showPaymentContact |
| 14 | `js/core/language.js` | 3 | ~450 | setLang, applyTranslations, TR object, TRANSLATIONS object, currentLang |
| 15 | `js/core/pwa-offline.js` | 4 | ~200 | installPWA, PWA manifest (inline), offline/online listeners, keyboard shortcuts |
| 16 | `js/core/theme.js` | 3 | ~60 | toggleTheme, applyTheme, prefers-color-scheme listener |

---

## خريطة التبعيات (Dependencies Map)

```
ui-utils.js ← لا يعتمد على شيء (مستقل 100%)
   ↑
   ├── ai-search.js        → يعتمد على: ui-utils (showToast, filterCards)
   ├── modals.js            → يعتمد على: ui-utils (safeRender, showToast, dedupeSectionContent)
   ├── export-pdf-word.js   → يعتمد على: ui-utils (gv, showToast)
   ├── export-excel.js      → يعتمد على: ui-utils (gv, showToast)
   ├── forms.js             → يعتمد على: ui-utils (gv, showToast)
   ├── calculators-ui.js    → يعتمد على: ui-utils (gv, showToast), data_calcs.js
   ├── doc-analysis.js      → يعتمد على: ui-utils (showToast, safeRender), pro-system
   ├── inspector.js         → يعتمد على: ui-utils (showToast), pro-system
   └── pro-system.js        → يعتمد على: ui-utils (showToast)

video-system.js ← مستقل (IndexedDB فقط)
language.js     ← مستقل (يستدعي applyTranslations فقط)
pwa-offline.js  ← مستقل
theme.js        ← مستقل
key-modal.js    ← يعتمد على: ui-utils (showToast)
app-init.js     ← يعتمد على: ui-utils, pro-system, language
```

---

## Global State المشترك (الخطر الأكبر)

| المتغير | النوع | مستخدم في |
|---------|-------|-----------|
| `uploadedFiles` | Array | ai-search, file upload |
| `QCS_MAP` | Array (const) | ai-search |
| `detailData` | Proxy | modals, content system |
| `_videoFiles` | Map | video-system |
| `_idb` | IDB handle | video-system |
| `docUploaded` | Object | doc-analysis |
| `currentLang` | String | language, UI rendering |
| `TR` | Object (const) | language |
| `TRANSLATIONS` | Object (const) | language |
| `navStack` | Array | modals |
| `APP_VERSION` | String (const) | app-init |
| `ESCAPE_MAP` | Object (const) | ui-utils |

---

## خطة التنفيذ (5 مراحل آمنة)

### المرحلة 1: استخراج ui-utils.js (صفر مخاطر)
- استخرج: `showToast`, `gv`, `sanitizeText`, `renderMarkdownSafe`, `safeRender`, `displayAIResponse`, `showSearchSkeleton`, `ESCAPE_MAP`
- هذه دوال **مستقلة** لا تعتمد على شيء
- أضف `<script src="/js/core/ui-utils.js" defer>` **قبل** inline-scripts.js
- اختبر: تأكد إن `showToast()` يعمل من console

### المرحلة 2: استخراج الأنظمة المعزولة (مخاطر منخفضة)
- `video-system.js` — معزول تماماً (IndexedDB + Map)
- `theme.js` — 3 دوال بسيطة
- `key-modal.js` — 4 دوال بسيطة
- اختبر: الفيديو + الثيم + مودال المفتاح

### المرحلة 3: استخراج الأنظمة المتوسطة (مخاطر متوسطة)
- `language.js` — يحتوي على كائنات ترجمة كبيرة
- `pro-system.js` — يعتمد على ui-utils فقط
- `forms.js` — يعتمد على gv + showToast
- اختبر: تبديل اللغة + Pro + النماذج

### المرحلة 4: استخراج التصدير والحاسبات (مخاطر متوسطة-عالية)
- `export-pdf-word.js` — يعتمد على gv + loadJsPDF/html2canvas
- `export-excel.js` — يعتمد على gv + loadXLSX
- `calculators-ui.js` — يعتمد على gv + data_calcs.js
- اختبر: تصدير PDF/Word/Excel + كل الحاسبات

### المرحلة 5: استخراج AI والتحليل (مخاطر عالية)
- `ai-search.js` — يعتمد على QCS_MAP + fetchGeminiAPI + filterCards
- `modals.js` — يعتمد على detailData Proxy + navStack + dedupeSectionContent
- `doc-analysis.js` — يعتمد على fetchGeminiAPI + pro-system
- `inspector.js` — يعتمد على pro-system
- اختبر: البحث الذكي + فتح الأقسام + تحليل الوثائق + المفتش

---

## المخاطر وكيفية التعامل معها

### 🔴 خطر عالي: Closures والـ Scope المشترك
- **المشكلة:** بعض الدوال تستخدم متغيرات معرّفة في scope أعلى (مثل `uploadedFiles` داخل `doSearch`)
- **الحل:** نقل المتغير مع الدوال التي تستخدمه، أو وضعه في `window.QS._state`

### 🔴 خطر عالي: ترتيب التحميل
- **المشكلة:** الدوال يجب أن تكون متاحة قبل استدعائها
- **الحل:** كل ملف مستخرج يُحمّل بـ `defer` ويُضاف **قبل** inline-scripts.js في index.html

### 🟡 خطر متوسط: Event Listeners في DOMContentLoaded
- **المشكلة:** 5 بلوكات DOMContentLoaded مبعثرة — بعضها يرتبط بدوال في أماكن مختلفة
- **الحل:** كل listener يرافق الدوال التي يربطها

### 🟡 خطر متوسط: inline HTML onclick/onchange
- **المشكلة:** HTML في index.html يستدعي دوال بالاسم (`onclick="calcESAL()"`)
- **الحل:** الدوال يجب أن تبقى على `window` scope حتى بعد النقل

### 🟢 خطر منخفض: الـ Proxy في detailData
- **المشكلة:** `detailData` هو Proxy مع getter يقرأ من `window.QS_CONTENT`
- **الحل:** يبقى في modals.js مع getter كما هو

---

## قاعدة ذهبية للتنفيذ

```
1. استخرج دالة واحدة أو مجموعة صغيرة
2. أضف الملف الجديد في index.html (قبل inline-scripts.js)
3. اختبر التطبيق كاملاً
4. إذا كل شيء يعمل → أزل الدالة من inline-scripts.js
5. اختبر مرة ثانية
6. Git push
7. كرر
```

**لا تستخرج أكثر من 3-5 دوال في المرة الواحدة.**

**لا تحذف من inline-scripts.js إلا بعد التأكد 100% إن الملف الجديد يعمل.**

---

## ملاحظات إضافية

- `inline-scripts.js` الأصلي يجب أن **يبقى كـ fallback** حتى اكتمال كل المراحل
- الملفات في `data_calcs.js` (الحاسبات الفعلية) **لا تُمس** — هذه الخطة فقط لـ inline-scripts.js
- بعد اكتمال التقسيم، يمكن تحويل inline-scripts.js إلى ملف "bootstrap" صغير يحمّل الباقي
- الهدف النهائي: خفض حجم الملف المحمّل مبدئياً من 4826 سطر إلى ~500 سطر (app-init + ui-utils)
