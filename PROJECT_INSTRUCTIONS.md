# QATARSPEC PRO — PROJECT INSTRUCTIONS v3.1 (ZERO TOLERANCE)

## ⚠️ قوانين حمراء — خرق واحد = إيقاف فوري

1. لا تحذف محتوى أبداً — فقط أضف أو عدّل
2. لا تُخمّن ولا تتفاءل — إذا لم تكن متأكداً 100% قُل "لا أعرف"
3. لا تقول "تم" أو "ناجح" أو "تم الرفع" بدون دليل مادي
4. لا تُكمل إذا فشل git push — قُل "فشل" بوضوح وتوقف
5. التطبيق يجب أن يبقى شغالاً بعد كل تعديل
6. لا تستخدم Anthropic API — Gemini API فقط
7. لا تُخزّن API keys في localStorage أبداً
8. **لا تضف <meta CSP> أبداً — vercel.json فقط للـ CSP**
9. **RATE LIMITING: كل API endpoint يجب أن يحتوي على rate limit**
   - Free tier: 5 requests/minute
   - Pro tier: 60 requests/minute
   - Global: 100 requests/minute per IP

---

## PROTOCOL 1: التحقق الإلزامي (VERIFY-BEFORE-CONFIRM)

🔴 ممنوع قول: "تم" / "ناجح" / "تم الرفع" / "يعمل" / "يجب أن يعمل"
🟢 إلزامي: "الناتج الفعلي هو: [لصق الناتج كاملاً]"

---

## PROTOCOL 2: git push صارم (8 خطوات إلزامية)

□ 1. git status → لصق الناتج
□ 2. git add [ملفات] → لصق الناتج
□ 3. git diff --cached --stat → لصق الناتج
□ 4. git commit -m "[رسالة]" → لصق الناتج
□ 5. git log --oneline -3 → لصق الناتج
□ 6. git push → لصق الناتج كاملاً
□ 7. git ls-remote origin main → لصق hash الـ remote
□ 8. مقارنة local hash مع remote hash

---

## PROTOCOL 3: التعامل مع الأخطاء (ERROR = STOP)

❌ STOP + السبب + الحل + "هل أحاول الحل؟"

---

## PROTOCOL 4: صفر تضليل (ZERO HALLUCINATION)

ممنوع: "أعتقد" / "ربما" / "يبدو" / "يجب أن"
إلزامي: "الناتج الفعلي: [لصق]"

---

## PROTOCOL 5: مرحلة واحدة فقط (ONE PHASE ONLY)

كل رسالة = مرحلة واحدة + تحقق كامل + "هل أنتقل للمرحلة التالية؟"

---

## PROTOCOL 6: RATE LIMITING (إلزامي)

| Endpoint | Free | Pro | Global |
|----------|------|-----|--------|
| /api/ai-proxy | 5/min | 60/min | 100/min/IP |
| /api/verify-pro | 3/min | 10/min | 30/min/IP |
| /api/qcs-search | 10/min | 100/min | 200/min/IP |
| /api/vision-proxy | 3/min | 30/min | 50/min/IP |

Fallback: in-memory Map | Response: 429 + Retry-After header

---

## VERIFICATION SCRIPT

```bash
LOCAL=$(git rev-parse HEAD) && REMOTE=$(git ls-remote origin main | awk '{print $1}') && [ "$LOCAL" = "$REMOTE" ] && echo "✅ MATCH" || echo "❌ MISMATCH — STOP"
```

---

## PROJECT INFO

- **Name:** QatarSpec Pro | **Site:** qatar-standers.vercel.app
- **Stack:** Vanilla HTML/JS + Vercel Serverless + Supabase + Gemini API
- **Repo:** github.com/shoosh85-code/Qatar-standers-
- **References:** QCS 2024 · Ashghal RDM 2023 · KAHRAMAA 2024 · MMUP · FIDIC

---

## SECURITY RULES

- NO API keys in localStorage — server-side env vars only
- NO JWT in localStorage — httpOnly cookies only
- ❌ لا تضف `<meta http-equiv="Content-Security-Policy">` في index.html أبداً
- ✅ CSP فقط عبر vercel.json headers
- Rate limit all API endpoints (PROTOCOL 6)

---

## ✅ BUGS FIXED (v3.1)

| المشكلة | السبب الجذري | الحل |
|---------|-------------|------|
| "حدث خطأ" عند التحميل | `<meta CSP>` مع nonce تحجب scripts بدون nonce | حُذف meta CSP |
| window.onload مزدوج | inline-scripts.js محمّل مرتين | حُذفت النسخة المكررة |
