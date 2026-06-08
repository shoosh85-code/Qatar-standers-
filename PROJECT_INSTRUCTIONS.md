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

```
□ 1. git status → لصق الناتج
□ 2. git add [ملفات] → لصق الناتج
□ 3. git diff --cached --stat → لصق الناتج
□ 4. git commit -m "[رسالة]" → لصق الناتج
□ 5. git log --oneline -3 → لصق الناتج
□ 6. git push → لصق الناتج كاملاً
□ 7. git ls-remote origin main → لصق hash الـ remote
□ 8. مقارنة local hash مع remote hash
```

إذا لم يتطابقا:
```
❌ STOP: git push فشل — الـ commit لم يصل
```

### VERIFICATION SCRIPT (إلزامي بعد كل push):
```bash
LOCAL=$(git rev-parse HEAD) && REMOTE=$(git ls-remote origin main | awk '{print $1}') && [ "$LOCAL" = "$REMOTE" ] && echo "✅ MATCH: $LOCAL" || echo "❌ MISMATCH"
```

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
- "أعتقد" / "ربما" / "على الأرجح" / "يبدو" / "يجب أن" / "من المفترض"

إلزامي:
- "الناتج الفعلي: [لصق]"
- "الاختبار أظهر: [لصق]"
- "الملف يحتوي: [لصق]"

---

## PROTOCOL 5: مرحلة واحدة فقط (ONE PHASE ONLY)

ممنوع: أكثر من مرحلة في رسالة واحدة | الانتقال قبل التحقق

إلزامي:
- كل رسالة = مرحلة واحدة
- نهاية المرحلة = تحقق كامل + "هل أنتقل للمرحلة التالية؟"

---

## PROTOCOL 6: RATE LIMITING (إلزامي)

| Endpoint | Free | Pro | Global |
|----------|------|-----|--------|
| /api/ai-proxy | 5/min | 60/min | 100/min/IP |
| /api/vision-proxy | 3/min | 30/min | 50/min/IP |
| /api/qcs-search | 10/min | 100/min | 200/min/IP |
| /api/hub-extended | 5/min | 30/min | 60/min/IP |

Implementation: Upstash Redis (lib/rate-limit.js) + in-memory fallback

---

## DEPLOYMENT PROTOCOL (محدّث)

### طريقة النشر الوحيدة الموثوقة:

```bash
# 1. في GitHub Codespaces:
git pull
git add .
git commit -m "وصف التعديل"
git push
vercel --prod
```

### لماذا Codespace وليس GitHub Actions؟
- GitHub Actions Deploy Hook = يبني من snapshot قديم
- Vercel CLI مباشرة = يبني من الكود الفعلي
- الـ webhook لا يعمل بشكل موثوق على Hobby plan

### التحقق بعد النشر:
```bash
# في Codespace terminal — تحقق أن الموقع تحدّث
curl -s -I "https://qatar-standers.vercel.app/js/luxury-animations.js" | grep "last-modified"
```

---

## PROJECT INFO

- **Name:** QatarSpec Pro
- **Site:** qatar-standers.vercel.app
- **Stack:** Vanilla HTML/JS + Vercel Serverless/Edge + Supabase + Gemini API
- **Repo:** github.com/shoosh85-code/Qatar-standers-
- **Audience:** مهندسون قطريون وأجانب يعملون في قطر
- **References:** QCS 2024 · Ashghal RDM 2023 · KAHRAMAA 2024 · MMUP · FIDIC · BS · ASTM
- **Three.js:** r162 ES modules (importmap) — لا تستخدم r128
- **Gemini Embedding:** gemini-embedding-001 (لا تستخدم text-embedding-004)

---

## VERCEL CONSTRAINTS (Hobby Plan)

- **Max Serverless Functions:** 12 — كل endpoint جديد يمر عبر api/project-hub.js?resource=
- **Cron Jobs:** مرة واحدة يومياً فقط (schedule: "0 2 * * *")
- **Function Timeout:** 30s (Edge) / 60s (Serverless)
- **File Size:** max 50MB per deployment

---

## KEY LEARNINGS (درس بالكد)

| المشكلة | الحل |
|---------|------|
| Gemini model NOT_FOUND | استخدم gemini-2.0-flash أو gemini-1.5-pro |
| responseMimeType INVALID_ARGUMENT | احذف هذا الحقل مع preview models |
| DOMParser يحذف scripts | استخدم dedupeSectionContent() pattern |
| cursor:none في luxury-animations.js | استخدم cursor:auto!important في main.css |
| Splash screen عند refresh | sessionStorage.setItem('qs_entered','1') |
| Vercel Deploy Hook = snapshot قديم | استخدم vercel --prod من Codespace |
| Three.js r128 examples/js مكسورة | استخدم r162 + importmap + examples/jsm |

---

## CODING RULES

- Vanilla JS only (no frameworks)
- RTL + Arabic + English في كل UI
- كل حاسبة: input validation + Qatari units + Pass/Fail + QCS reference
- window.QS namespace لكل الـ public functions
- Sanitize ALL user input قبل innerHTML
- const/let فقط (no var)
- تعليقات عربية للـ complex logic

---

## CONTENT ARCHITECTURE

```
data_content_*.js → مسجّل في data_content_manifest.js → lazy-loaded عبر QS.openDetail(key) → rendered في modal
```

**قانون:** أي كارت جديد لازم يُسجَّل في data_content_manifest.js أو يفشل بصمت.

---

## NEW HTML PAGES

لازم تُضاف لـ vercel.json rewrite exclusion regex:
```json
"source": "/((?!api/|...|new-page\\.html).*)"
```

---

## SECURITY RULES

- NO API keys في localStorage — server-side env vars only
- NO JWT في localStorage — httpOnly cookies only
- CSP headers في vercel.json
- Rate limit كل API endpoints (PROTOCOL 6)
- Sanitize كل user input
- XSS protection على كل innerHTML injections
- GitHub tokens = revoke بعد كل session فوراً

---

## EXPORT STANDARDS

- **PDF:** QatarSpec Pro header + QCS 2024 reference + page numbers
- **DXF:** LWPOLYLINE حقيقي + LAYER table + dimensions (R12 format)
- **IFC:** IFC4 حقيقي — IfcWall + IfcDoor + IfcWindow + Pset_QCS2024
- **Excel/CSV:** Ashghal official format + UTF-8 BOM

---

## BUSINESS RULES

- Free tier: 5 AI requests/day (builds trust)
- Pro tier: يوفر 2+ ساعة أسبوعياً (justifies 99 QAR/month)
- كل مخرج AI يحتوي disclaimer + QCS Part/Section/Clause
- لا تخترع أرقاماً — قل "غير موجود في المصادر المتاحة"

---

*آخر تحديث: يونيو 2026 — v3.0*

---

## GIT CONFIG

```bash
git clone https://github.com/shoosh85-code/Qatar-standers-.git
cd Qatar-standers-
git config user.email "qatarspec@deploy.app"
git config user.name "QatarSpec Deploy"
```

Push (استخدم TOKEN مؤقتاً ثم أزله فوراً):
```bash
git remote set-url origin https://TOKEN@github.com/shoosh85-code/Qatar-standers-.git
git push origin main
git remote set-url origin https://github.com/shoosh85-code/Qatar-standers-.git
```

---

## DECISION FRAMEWORK

1. أيهما يخدم تير المستخدم المستهدف أفضل؟
2. أيهما أدق وفق QCS 2024؟
3. أيهما يحول Free → Pro أكثر؟
4. أيهما يقلل أخطاء الهندسة في الموقع؟
5. أيهما أسرع في التنفيذ والاختبار؟

---

## ENGINEERING STANDARDS

- اتبع QCS 2024 بدقة — نبّه المستخدم عند أي تعارض
- كل الحاسبات: input validation + وحدات قطرية + Pass/Fail + مرجع QCS
- كل المخرجات: QatarSpec Pro header + project + engineer + date + QCS clause
- كل مخرجات AI: بالعربية + disclaimer + QCS Part/Section/Clause بالضبط

---

## CUSTOM SKILLS

### SKILL 1: vercel-serverless
> استخدم عند: إنشاء/تعديل ملفات api/، rate limiting، env vars، Vercel KV، "أضف API"، "rate limit"

**Pattern إلزامي لكل API Handler:**
```js
import { withRateLimit } from './rate-limit.js';
const LIMITS = { free: 5, pro: 60, global: 100, windowMs: 60_000 };
export default withRateLimit(async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://qatar-standers.vercel.app');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { input } = req.body;
  if (!input || typeof input !== 'string') return res.status(400).json({ error: 'Invalid input' });
  const sanitized = input.replace(/<[^>]*>/g, '').trim().slice(0, 5000);
  try {
    const result = await doWork(sanitized);
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error('[handler] Error:', err.message);
    return res.status(500).json({ error: 'Internal server error', message_ar: 'خطأ في الخادم' });
  }
}, '/api/endpoint-name');
```

**Env Vars مطلوبة في Vercel Dashboard:**
```
GEMINI_API_KEY=        # Google AI Studio
SUPABASE_URL=          # https://xxx.supabase.co
SUPABASE_SERVICE_KEY=  # service_role (server only!)
KV_REST_API_URL=       # Vercel KV dashboard
KV_REST_API_TOKEN=     # Vercel KV dashboard
```

---

### SKILL 2: supabase-integration
> استخدم عند: auth، Pro tier check، Supabase queries، RLS، "تحقق من Pro"، "اشتراك"، "tier check"

**Server-Side Tier Verification:**
```js
import { createClient } from '@supabase/supabase-js';
const supabaseAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

export async function verifyProTier(authHeader) {
  if (!authHeader?.startsWith('Bearer ')) return { tier: 'free', userId: null };
  const token = authHeader.slice(7);
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !user) return { tier: 'free', userId: null };
  const { data: profile } = await supabaseAdmin.from('users_profiles').select('tier, tier_expires_at').eq('id', user.id).single();
  if (!profile) return { tier: 'free', userId: user.id };
  const tierActive = !profile.tier_expires_at || new Date(profile.tier_expires_at) > new Date();
  return { tier: tierActive ? profile.tier : 'free', userId: user.id };
}
```

**Pro Feature Gate:**
```js
function requirePro(featureName_ar, featureName_en) {
  if (window.QS.userTier === 'pro' || window.QS.userTier === 'enterprise') return true;
  showProPrompt({ feature_ar: featureName_ar, feature_en: featureName_en, price: '99 ريال/شهر' });
  return false;
}
```

---

### SKILL 3: qcs-calculator
> استخدم عند: أي حاسبة أو أداة هندسية. "حاسبة"، "QCS"، "Pass/Fail"، "concrete"، "compaction"

**قواعد أساسية:**
- لا تخترع أرقام QCS — قل فقط "غير موجود في المستند"
- كل حاسبة: input validation + وحدات قطرية + Pass/Fail + مرجع QCS
- كل الدوال في `window.QS` namespace

**مراجع QCS 2024 موثقة:**
| الموضوع | المرجع |
|---------|---------|
| خلطة الخرسانة | Part 5, Section 7 |
| مقاومة الخرسانة | Part 5, Section 7, Clause 7.3 |
| الدمك | Part 6, Section 3 |
| رصف الطرق | Part 6, Section 4 |
| أنابيب الصرف | Part 8, Section 2 |
| تغطية الحديد | Part 5, Section 7, Clause 7.8 |

**Disclaimer إلزامي على كل نتيجة AI:**
```js
const AI_DISCLAIMER = {
  ar: '⚠️ هذه النتيجة استرشادية فقط. يجب التحقق من QCS 2024 الأصلي قبل التطبيق في المشروع.',
  en: '⚠️ For guidance only. Always verify against QCS 2024 before applying on site.'
};
```

---

### SKILL 4: gemini-ai-proxy
> استخدم عند: أي ميزة AI. "Gemini"، "AI"، "تحليل مستند"، "بحث QCS"، "vision"، "PDF"

**قواعد حرجة:**
- Gemini API فقط — ممنوع Anthropic أو OpenAI
- API key في `process.env.GEMINI_API_KEY` — server-side فقط
- كل الاستدعاءات تمر عبر `api/ai-proxy.js` — لا تستدعِ Gemini من frontend مطلقاً
- كل رد AI يحتوي disclaimer بالعربية + مرجع QCS

**النماذج:**
| الاستخدام | النموذج |
|-----------|---------|
| نصوص / استفسارات QCS | `gemini-2.0-flash` (افتراضي) |
| Vision / PDF | `gemini-2.0-flash` |
| تحليل معقد | `gemini-1.5-pro` (عند الحاجة فقط) |

**Frontend — استدعاء الـ Proxy:**
```js
window.QS.askAI = async function({ query, context = '', type = 'general' }) {
  const session = await window.QS.getSession();
  const res = await fetch('/api/ai-proxy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(session?.access_token && { 'Authorization': `Bearer ${session.access_token}` })
    },
    body: JSON.stringify({ query, context, type })
  });
  const data = await res.json();
  if (res.status === 429) {
    if (data.upgradeAvailable) window.QS.showProPrompt('الذكاء الاصطناعي', 'AI Assistant');
    else showToast(data.message, 'warning');
    return null;
  }
  if (!res.ok) { showToast(data.message_ar || 'حدث خطأ', 'error'); return null; }
  return data;
};
```

---

*تم إضافة هذه الأقسام في يونيو 2026 — v3.1*
