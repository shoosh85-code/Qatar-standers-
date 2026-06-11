# QATARSPEC PRO — PROJECT INSTRUCTIONS v3.0 (ZERO TOLERANCE)

## ⚠️ قوانين حمراء — خرق واحد = إيقاف فوري

1. لا تحذف محتوى أبداً — فقط أضف أو عدّل
2. لا تُخمّن ولا تتفاءل — إذا لم تكن متأكداً 100% قُل "لا أعرف"
3. لا تقول "تم" أو "ناجح" أو "تم الرفع" بدون دليل مادي
4. لا تُكمل إذا فشل git push — قُل "فشل" بوضوح وتوقف
5. التطبيق يجب أن يبقى شغالاً بعد كل تعديل
6. لا تستخدم Anthropic API — Gemini API فقط
7. لا تُخزّن API keys في localStorage أبداً
8. **RATE LIMITING: كل API endpoint يجب أن يحتوي على rate limit**

---

## PROTOCOL 1: التحقق الإلزامي

🔴 ممنوع: "تم" / "ناجح" / "تم الرفع" / "يعمل"
🟢 إلزامي: "الناتج الفعلي هو: [لصق الناتج كاملاً]"

---

## PROTOCOL 2: git push صارم (8 خطوات)

```bash
git status → git add → git diff --cached → git commit → git log → git push → git ls-remote → مقارنة hash
```

---

## PROTOCOL 3: ERROR = STOP

```
❌ STOP: Error [الرمز]
الأمر: [الأمر]
الخطأ: [نص الخطأ]
السبب: [تحليلك]
الحل: [اقتراحك]
```

---

## PROTOCOL 4: ZERO HALLUCINATION

ممنوع: "أعتقد" / "ربما" / "على الأرجح" / "يبدو"
إلزامي: "الناتج الفعلي: [لصق]"

---

## PROTOCOL 5: مرحلة واحدة فقط

- كل رسالة = مرحلة واحدة
- نهاية المرحلة = تحقق + "هل أنتقل للمرحلة التالية؟"

---

## PROTOCOL 6: RATE LIMITING

| Endpoint | Free | Pro | Global/IP |
|----------|------|-----|-----------|
| ai-proxy | 5/min | 60/min | 100/min |
| qcs-search | 10/min | 100/min | 200/min |
| vision-proxy | 3/min | 30/min | 50/min |
| blueprint | 3/min | 20/min | 30/min |

---

## PROJECT INFO

- **Name:** QatarSpec Pro
- **Site:** qatar-standers.vercel.app
- **Stack:** Vanilla HTML/JS + Vercel Serverless + Supabase + Gemini API
- **Repo:** github.com/shoosh85-code/Qatar-standers-

---

## GIT CONFIG

```bash
git config user.email "qatarspec@deploy.app"
git config user.name "QatarSpec Deploy"
```

**Push pattern:**
```bash
git remote set-url origin https://TOKEN@github.com/shoosh85-code/Qatar-standers-.git
git push origin main
git remote set-url origin https://github.com/shoosh85-code/Qatar-standers-.git
```

---

## VERCEL CONSTRAINTS

- **Hobby plan: MAX 12 Serverless Functions**
- Current functions (12): ai-proxy, auth, blueprint, chatbot, export-pdf, hub-extended, ncr-log, project-hub, qcs-search, scanner, tap, vision-proxy
- rate-limit.js = helper only (not counted)
- **New APIs → must go into scanner.js (?action=) or hub-extended (?resource=)**
- **Hobby timeout: 10s serverless / 30s edge**
- scanner.js: maxDuration 60s
- blueprint.js: Edge Runtime (30s)

---

## ARCHITECTURE

```
index.html (SPA)
├── partials/ (group-calc.html, etc.)
├── data_content_*.js (lazy-loaded content)
├── js/
│   ├── calcs/ (structural, roads, geotech, utilities)
│   ├── core/ (detail-modal, calculators-ui, export-pdf, etc.)
│   ├── scanner/ (capture, upload-queue, qcs-hotspots)
│   ├── viewer/ (scene.js — Three.js r128)
│   └── libs-init.js (D3, Plotly, math.js, etc.)
└── api/ (12 functions)
```

---

## KEY FILES

| الملف | الوظيفة |
|-------|---------|
| `api/scanner.js` | scan-upload, kiri-verify, export-pdf, blueprint-analyze, create-checkout, generate-document |
| `api/hub-extended.js` | material-submittals, ncr-log, site-photos, snag-list, checklists, execution-ai, generate-document |
| `api/project-hub.js` | Edge Runtime — projects CRUD + Supabase |
| `data_content_manifest.js` | lookup index للـ lazy-loading |
| `partials/group-calc.html` | كروت قسم الحاسبات |
| `js/libs-init.js` | تهيئة المكتبات الجديدة |
| `vercel.json` | rewrites + functions config |

---

## KNOWN ISSUES

1. **vercel.json rewrite** — الصفحات الجديدة تُعاد لـ index.html (قيد الحل)
2. **Gemini Free Tier** — 15 req/day — quota تتجدد يومياً
3. **partials-loader.js** — يستبدل innerHTML لـ group-calc من partials/
4. **inline-scripts.min.js** — VirtualScroll + animations تخفي بعض الكروت

---

## CODING RULES

- Vanilla JS only — no frameworks
- RTL + Arabic + English في كل UI
- `window.QS` namespace للدوال العامة
- `const`/`let` فقط — لا `var`
- Sanitize ALL user input
- Arabic comments للمنطق المعقد
- NEVER invent QCS numbers — "غير موجود في المستند"

---

## VERIFICATION SCRIPT

```bash
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git ls-remote origin main | awk '{print $1}')
[ "$LOCAL" = "$REMOTE" ] && echo "✅ MATCH" || echo "❌ MISMATCH"
```
