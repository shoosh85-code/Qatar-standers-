# QatarSpec Pro 🏗️
[![Live App](https://img.shields.io/badge/Live-qatar--standers.vercel.app-7A1515?style=flat-square&logo=vercel)](https://qatar-standers.vercel.app)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-blue?style=flat-square)](https://qatar-standers.vercel.app)
[![Rate Limited](https://img.shields.io/badge/Rate_Limit-Protected-orange?style=flat-square)](https://qatar-standers.vercel.app)
[![Arabic RTL](https://img.shields.io/badge/Arabic-RTL_Support-brightgreen?style=flat-square)](https://qatar-standers.vercel.app)
[![QCS 2024](https://img.shields.io/badge/QCS-2024_Official-7A1515?style=flat-square)](https://qatar-standers.vercel.app)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)](legal/terms.html)



> **مرجع المواصفات القطرية — Qatar Construction Specifications Reference**  
> منصة هندسية متخصصة مدعومة بالذكاء الاصطناعي | AI-Powered Engineering SaaS for Qatar

[![Live Site](https://img.shields.io/badge/Live%20Site-qatar--standers.vercel.app-gold?style=flat-square)](https://qatar-standers.vercel.app)
[![QCS 2024](https://img.shields.io/badge/QCS-2024%20Compliant-green?style=flat-square)](#)
[![Ashghal](https://img.shields.io/badge/Ashghal-RDM%202023-blue?style=flat-square)](#)
[![Version](https://img.shields.io/badge/Version-2.4.6-purple?style=flat-square)](#)

---

## 🎯 المهمة — Mission

تحويل QCS 2024 (18,000 صفحة) إلى إجابات هندسية فورية عبر:
- بحث ذكي بالذكاء الاصطناعي (Gemini)
- 38+ حاسبة Pass/Fail فورية
- تصدير نماذج Ashghal الرسمية (RFI, NCR, ITP, DPR)

*Turn QCS 2024 (18,000 pages) into instant engineering answers via AI search, 38+ Pass/Fail calculators, and official Ashghal form exports.*

---

## ✨ المميزات — Features

| الميزة | الخطة | الوصف |
|--------|-------|-------|
| 🔍 بحث ذكي QCS | Free (5/يوم) / Pro (∞) | بحث دلالي في QCS 2024 بالعربية والإنجليزية |
| 🧮 38+ حاسبة هندسية | Free | طرق، خرسانة، كهرباء، جيوتقني — Pass/Fail |
| 📄 تصدير PDF/Word/Excel | Pro | نماذج Ashghal الرسمية مع ترويسة المشروع |
| 🤖 AI Document Inspector | Pro | تحليل الرسومات والوثائق بالذكاء الاصطناعي |
| 📱 PWA Offline | Free | يعمل بدون إنترنت في المواقع |
| 🌐 ثنائي اللغة | Free | عربي + إنجليزي + Dark/Light Mode |

---

## 🏗️ التقنيات — Tech Stack

```
Frontend:    Vanilla HTML/CSS/JS (no frameworks) + PWA
Backend:     Vercel Serverless Functions (Node.js)
AI:          Google Gemini API (server-side only)
Database:    Supabase (PostgreSQL + pgvector)
Hosting:     Vercel (qatar-standers.vercel.app)
Standards:   QCS 2024 | Ashghal RDM 2023 | KAHRAMAA 2024 | MMUP | FIDIC
```

---

## 📁 هيكل المشروع — Project Structure

```
Qatar-standers-/
├── index.html                    ← الواجهة الرئيسية (SPA)
├── api/                          ← Vercel Serverless APIs
│   ├── ai-proxy.js               ← Gemini AI proxy (rate-limited)
│   ├── qcs-search.js             ← QCS semantic search
│   ├── verify-pro.js             ← Pro subscription verification
│   └── ...
├── js/
│   ├── calculators/              ← 38+ حاسبة هندسية
│   │   ├── roads.js              ← طرق وإسفلت (12 حاسبة)
│   │   ├── structural.js         ← إنشاءات وخرسانة (11 حاسبة)
│   │   ├── utilities.js          ← كهرباء وصرف (5 حاسبات)
│   │   ├── geotech.js            ← جيوتقني وتربة (6 حاسبات)
│   │   └── general.js            ← عامة (4 حاسبات)
│   └── export/                   ← نظام التصدير
│       ├── pdf.js                ← PDF مع ترويسة QatarSpec
│       ├── word.js               ← Word مع مراجع QCS
│       └── excel.js              ← Excel بتنسيق Ashghal
├── data_content*.js              ← محتوى QCS (موزّع على ملفات)
├── public/legal/                 ← الصفحات القانونية
│   ├── terms.html                ← الشروط والأحكام
│   └── privacy.html              ← سياسة الخصوصية
├── tests/                        ← 138+ اختبار تلقائي
│   ├── integration/              ← 31 اختبار API
│   └── e2e/                      ← 49 اختبار E2E
├── sw.js                         ← Service Worker (PWA)
├── manifest.json                 ← PWA Manifest
├── robots.txt                    ← SEO
└── sitemap.xml                   ← SEO
```

---

## 🚀 التشغيل المحلي — Local Development

```bash
# 1. Clone
git clone https://github.com/shoosh85-code/Qatar-standers-.git
cd Qatar-standers-

# 2. Install Vercel CLI
npm i -g vercel

# 3. Set environment variables (create .env.local)
cp .env.example .env.local
# Fill in: GEMINI_API_KEY, SUPABASE_URL, SUPABASE_KEY

# 4. Run locally
vercel dev

# 5. Open
open http://localhost:3000
```

---

## 🧪 الاختبارات — Testing

```bash
npm test                          # كل الاختبارات
npm run test:integration          # 31 اختبار API
npm run test:e2e                  # 49 اختبار E2E
npm run test:content              # فحص سلامة المحتوى
```

---

## 🔐 الأمان — Security

- ✅ CSP headers (Vercel + meta tag)
- ✅ Rate limiting on all API endpoints (100 req/15min)
- ✅ Server-side API keys only (no localStorage)
- ✅ Input sanitization (sanitizeText() on all innerHTML)
- ✅ httpOnly session cookies for Pro auth
- ✅ XSS protection on all user inputs

---

## 💰 خطط الاشتراك — Pricing

| الخطة | السعر | المميزات |
|-------|-------|----------|
| Free | مجاناً | 5 بحثات/يوم + 38 حاسبة + محتوى QCS |
| Pro | 99 QAR/شهر | بحث غير محدود + تصدير PDF/Word/Excel + AI Inspector |
| Enterprise | تسعير مخصص | فريق كامل + API + SLA + تكامل مخصص |

**كود ترحيبي:** `QATAR2026PRO` (شهر Pro مجاناً)

---

## 📞 التواصل — Contact

- 🌐 الموقع: [qatar-standers.vercel.app](https://qatar-standers.vercel.app)
- 📧 الدعم: support@qatarspec.app
- 💼 Enterprise: enterprise@qatarspec.app
- ⚖️ قانوني: legal@qatarspec.app
- 💬 WhatsApp: للاشتراك Pro — راجع الموقع

---

## ⚠️ إخلاء المسؤولية — Disclaimer

> **AI-Generated Content Warning:** جميع مخرجات الذكاء الاصطناعي للاستخدام المرجعي فقط.  
> يجب التحقق من كل رقم مقابل QCS 2024 الرسمي قبل استخدامه في أي تصميم أو وثيقة رسمية.  
> *All AI outputs are for reference only. Verify against official QCS 2024 before use in design or official documents.*

---

## 📜 الرخصة — License

Proprietary — © 2026 QatarSpec Pro. All Rights Reserved.  
See [LICENSE](./LICENSE) for details.

---

*QatarSpec Pro — Engineering SaaS for Qatar | مرجع المواصفات القطرية*
