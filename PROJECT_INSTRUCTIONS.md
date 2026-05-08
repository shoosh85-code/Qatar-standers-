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
   - Free tier: 5 requests/minute
   - Pro tier: 60 requests/minute
   - Global: 100 requests/minute per IP

---

## PROTOCOL 1: التحقق الإلزامي (VERIFY-BEFORE-CONFIRM)

🔴 ممنوع قول: "تم" / "ناجح" / "تم الرفع" / "يعمل" / "يجب أن يعمل"
🟢 إلزامي: "الناتج الفعلي هو: [لصق الناتج كاملاً]"

قبل كل "تم" يجب إرفاق:
- ناتج الأمر في terminal (نسخ/لصق كامل)
- git: commit hash + رابط GitHub
- API: ناتج curl/fetch كاملاً
- ملف: cat [الملف] أو ls -la

---

## PROTOCOL 2: git push صارم (8 خطوات إلزامية)

لا تقول "تم الرفع" إلا بعد:

□ 1. git status → لصق الناتج
□ 2. git add [ملفات] → لصق الناتج
□ 3. git diff --cached --stat → لصق الناتج
□ 4. git commit -m "[رسالة]" → لصق الناتج
□ 5. git log --oneline -3 → لصق الناتج
□ 6. git push → لصق الناتج كاملاً
□ 7. git ls-remote origin main → لصق hash الـ remote
□ 8. مقارنة local hash مع remote hash

إذا لم يتطابقان:
→ ❌ STOP: git push فشل — الـ commit لم يصل
→ لا تكمل. لا تكذب. لا تقول "تم".

---

## PROTOCOL 3: التعامل مع الأخطاء (ERROR = STOP)

إذا ظهر أي خطأ:

```
❌ STOP: Error [الرمز]
الأمر: [الأمر]
الخطأ: [نص الخطأ كاملاً]
السبب: [تحليلك]
الحل: [اقتراحك]
هل أحاول الحل؟ (نعم/لا)
```

ممنوع:
- تجاهل الخطأ والمتابعة
- تغيير الموضوع
- "لنحاول مرة أخرى" بدون تحليل

---

## PROTOCOL 4: صفر تضليل (ZERO HALLUCINATION)

ممنوع تماماً:
- "أعتقد"
- "ربما"
- "على الأرجح"
- "يبدو"
- "يجب أن"
- "من المفترض"

إلزامي:
- "الناتج الفعلي: [لصق]"
- "الاختبار أظهر: [لصق]"
- "الملف يحتوي: [لصق]"

---

## PROTOCOL 5: مرحلة واحدة فقط (ONE PHASE ONLY)

ممنوع:
- أكثر من مرحلة في رسالة واحدة
- الانتقال قبل التحقق
- "سأنفذ 1 و 2 معاً"

إلزامي:
- كل رسالة = مرحلة واحدة
- نهاية المرحلة = تحقق كامل + "هل أنتقل للمرحلة التالية؟"
- لا تنتقل إلا بعد موافقة صريحة

---

## PROTOCOL 6: RATE LIMITING (إلزامي)

### API Endpoints Limits:
| Endpoint | Free | Pro | Global |
|----------|------|-----|--------|
| /api/ai-proxy | 5/min | 60/min | 100/min/IP |
| /api/verify-pro | 3/min | 10/min | 30/min/IP |
| /api/qcs-search | 10/min | 100/min | 200/min/IP |
| /api/vision-proxy | 3/min | 30/min | 50/min/IP |

### Implementation:
- استخدم Vercel KV للـ rate limiting
- Fallback: in-memory Map مع cleanup
- Response: 429 Too Many Requests مع Retry-After header

---

## VERIFICATION SCRIPT

```bash
echo "=== LOCAL ===" && git log --oneline -1 && echo "=== REMOTE ===" && git ls-remote origin main | head -1 && LOCAL=$(git rev-parse HEAD) && REMOTE=$(git ls-remote origin main | awk '{print $1}') && if [ "$LOCAL" = "$REMOTE" ]; then echo "✅ MATCH"; else echo "❌ MISMATCH"; fi
```

إذا ❌ MISMATCH → STOP. لا تقول "تم".

---

## PROJECT INFO

- **Name:** QatarSpec Pro
- **Site:** qatar-standers.vercel.app
- **Stack:** Vanilla HTML/JS + Vercel Serverless + Supabase + Gemini API
- **Repo:** github.com/shoosh85-code/Qatar-standers-
- **Audience:** مهندسون قطريون وأجانب يعملون في قطر
- **References:** QCS 2024 · Ashghal RDM 2023 · KAHRAMAA 2024 · MMUP · FIDIC · BS · ASTM

---

## GIT CONFIG

```bash
git clone https://github.com/shoosh85-code/Qatar-standers-.git
cd Qatar-standers-
git config user.email "qatarspec@deploy.app"
git config user.name "QatarSpec Deploy"
```

Push:
```bash
git remote set-url origin https://TOKEN@github.com/shoosh85-code/Qatar-standers-.git
git push origin main
git remote set-url origin https://github.com/shoosh85-code/Qatar-standers-.git
```

---

## CODING RULES

- Follow QCS 2024 always — accuracy over speed
- Vanilla JS only (no frameworks)
- RTL + Arabic + English in all UI
- Every calculator: input validation + Qatari units + Pass/Fail + QCS reference
- Pro features: gentle prompt for free users
- Never invent numbers — say "غير موجود في المستند"
- window.QS namespace for all public functions
- Sanitize ALL user input before innerHTML
- const/let only (no var)
- Arabic comments for complex logic

---

## EXPORT STANDARDS

- **PDF:** QatarSpec Pro header + QCS 2024 reference + page numbers + watermark
- **Excel:** Ashghal official format + multiple sheets + summary stats
- **Word:** Professional header + editable fields + QCS clause references
- **All exports:** Project name + Engineer name + Date + QatarSpec branding

---

## SECURITY

- NO API keys in localStorage — server-side env vars only
- NO JWT in localStorage — httpOnly cookies only
- CSP headers required
- Rate limit all API endpoints (see PROTOCOL 6)
- Sanitize all user input
- XSS protection on all innerHTML injections

---

## BUSINESS RULES

- Every feature serves Free, Pro, or Enterprise tier
- Free tier genuinely useful (builds trust)
- Pro tier saves >2 hours/week (justifies 99 QAR/month)
- Enterprise reduces QC costs >20%
- Every QCS reference traceable — no invented numbers
- AI responses include disclaimer + QCS Part/Section/Clause
- Export formats match Ashghal official templates exactly

---

## DECISION FRAMEWORK

1. Which serves target user tier better?
2. Which is more accurate per QCS 2024?
3. Which converts more Free → Pro users?
4. Which reduces engineering errors on site?
5. Which is faster to implement and test?

---

## ENGINEERING STANDARDS

- Follow QCS 2024 exactly — alert user if conflict
- All calculators: input validation + Qatari units + Pass/Fail + QCS reference
- All exports: QatarSpec Pro header + project + engineer + date + QCS clause
- All AI outputs: Arabic + disclaimer + exact QCS Part/Section/Clause

---

## DEPLOYMENT

- Follow PROTOCOL 2 strictly for every git push
- Test locally before push — app must stay functional
- Never delete content — only add or modify
