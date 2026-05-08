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

```
□ 1. git status               → لصق الناتج
□ 2. git add [ملفات]          → لصق الناتج
□ 3. git diff --cached --stat → لصق الناتج
□ 4. git commit -m "[رسالة]"  → لصق الناتج
□ 5. git log --oneline -3     → لصق الناتج
□ 6. git push                 → لصق الناتج كاملاً
□ 7. git ls-remote origin main → لصق hash الـ remote
□ 8. مقارنة local hash مع remote hash
```

إذا لم يتطابقان → ❌ STOP. لا تقول "تم".

---

## PROTOCOL 3: التعامل مع الأخطاء (ERROR = STOP)

```
❌ STOP: Error [الرمز]
الأمر:  [الأمر]
الخطأ:  [نص الخطأ كاملاً]
السبب:  [تحليلك]
الحل:   [اقتراحك]
هل أحاول الحل؟ (نعم/لا)
```

---

## PROTOCOL 4: صفر تضليل (ZERO HALLUCINATION)

ممنوع: "أعتقد" / "ربما" / "على الأرجح" / "يبدو" / "يجب أن" / "من المفترض"
إلزامي: "الناتج الفعلي: [لصق]" / "الاختبار أظهر: [لصق]"

---

## PROTOCOL 5: مرحلة واحدة فقط (ONE PHASE ONLY)

- كل رسالة = مرحلة واحدة
- نهاية المرحلة = تحقق كامل + "هل أنتقل للمرحلة التالية؟"
- لا تنتقل إلا بعد موافقة صريحة

---

## PROTOCOL 6: RATE LIMITING (إلزامي)

| Endpoint | Free | Pro | Global |
|----------|------|-----|--------|
| /api/ai-proxy | 5/min | 60/min | 100/min/IP |
| /api/verify-pro | 3/min | 10/min | 30/min/IP |
| /api/qcs-search | 10/min | 100/min | 200/min/IP |
| /api/vision-proxy | 3/min | 30/min | 50/min/IP |
| /api/execution-hub | 5/min | 60/min | 100/min/IP |

Implementation:
- Vercel KV للـ rate limiting (primary)
- in-memory Map مع cleanup كل 60s (fallback)
- Response: 429 + Retry-After header
- Headers: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset

---

## PROTOCOL 7: EXECUTION HUB

وحدات إلزامية:
1. Concrete Pour Card — بطاقة صب الخرسانة
2. MAR — Material Approval Request
3. NCR — Non-Conformance Report
4. Field Test Tracker — متابعة الاختبارات (Pass/Fail فوري)
5. DWR — Daily Work Record

قواعد:
- كل Pass/Fail مرتبط ببند QCS محدد
- كل تقرير: timestamp + اسم المهندس
- تصدير PDF بتنسيق Ashghal
- "غير موجود في المستند" إذا لم تجد الرقم

---

## VERIFICATION SCRIPT

```bash
echo "=== LOCAL ===" && git log --oneline -1 && \
echo "=== REMOTE ===" && git ls-remote origin main | head -1 && \
LOCAL=$(git rev-parse HEAD) && \
REMOTE=$(git ls-remote origin main | awk '{print $1}') && \
if [ "$LOCAL" = "$REMOTE" ]; then echo "✅ MATCH"; else echo "❌ MISMATCH"; fi
```

---

## PROJECT INFO

```
Name:     QatarSpec Pro
Site:     qatar-standers.vercel.app
Stack:    Vanilla HTML/JS + Vercel Serverless + Supabase + Gemini API
Repo:     github.com/shoosh85-code/Qatar-standers-
Audience: مهندسون قطريون وأجانب يعملون في قطر
Refs:     QCS 2024 · Ashghal RDM 2023 · KAHRAMAA 2024 · MMUP · FIDIC · BS · ASTM
```

---

## CODING RULES

- QCS 2024 أولاً — الدقة قبل السرعة
- Vanilla JS فقط (لا frameworks)
- RTL + Arabic + English في كل UI
- كل آلة حاسبة: validation + وحدات قطرية + Pass/Fail + مرجع QCS
- window.QS namespace لجميع الدوال العامة
- Sanitize كل مدخلات المستخدم قبل innerHTML
- const/let فقط (لا var)
- تعليقات عربية للمنطق المعقد

---

## EXPORT STANDARDS

- PDF: QatarSpec Pro header + QCS 2024 ref + أرقام صفحات + watermark
- Excel: تنسيق Ashghal الرسمي + أوراق متعددة + إحصاءات
- جميع التصديرات: اسم المشروع + المهندس + التاريخ + QatarSpec branding

---

## SECURITY

- لا API keys في localStorage — متغيرات server-side فقط
- لا JWT في localStorage — httpOnly cookies فقط
- CSP headers إلزامية
- Rate limit على كل API endpoints (PROTOCOL 6)
- Sanitize كل مدخلات المستخدم
- XSS protection على كل innerHTML

---

## BUSINESS RULES

- Free tier: مفيد حقاً (يبني الثقة)
- Pro tier: يوفر >2 ساعة/أسبوع (يبرر 99 QAR/شهر)
- Enterprise: يقلل تكاليف QC >20%
- كل مرجع QCS قابل للتتبع — لا أرقام مخترعة
- AI responses: تحذير + QCS Part/Section/Clause

---

## DEPLOYMENT

- اتبع PROTOCOL 2 لكل git push
- اختبر locally قبل الرفع
- لا تحذف محتوى — أضف أو عدّل فقط
