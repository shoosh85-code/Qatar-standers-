# تفعيل البحث الدلالي — دليل خطوة بخطوة

> وقت التنفيذ: 15-20 دقيقة
> لا يحتاج كود — فقط إعدادات ونسخ/لصق

---

## المتطلبات قبل البدء

تأكد إن عندك:
- [ ] حساب Supabase (supabase.com) مع مشروع قائم
- [ ] Vercel Dashboard فيه المشروع
- [ ] GEMINI_API_KEY شغال (نفس اللي تستخدمه للبحث الحالي)

---

## الخطوة 1: إعداد Environment Variables في Vercel

### 1.1 افتح Vercel Dashboard
1. اذهب إلى: https://vercel.com/dashboard
2. اضغط على مشروع **Qatar-standers-**
3. اضغط **Settings** (في الأعلى)
4. اضغط **Environment Variables** (في القائمة اليسرى)

### 1.2 تحقق من المتغيرات التالية
تأكد إن كل هذه المتغيرات موجودة. إذا أي واحد مفقود — أضفه:

| المتغير | من وين تجيبه | مثال |
|---------|-------------|------|
| `SUPABASE_URL` | Supabase Dashboard → Settings → API → URL | `https://abcdefg.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API → service_role (السري) | `eyJhbGciOiJIUzI1NiIs...` (طويل جداً) |
| `GEMINI_API_KEY` | Google AI Studio → API Keys | `AIzaSy...` |
| `ADMIN_SECRET` | أنت تختاره — كلمة سر قوية | مثال: `QSadmin2026!secure` |

### 1.3 كيف تضيف متغير جديد
1. في صفحة Environment Variables اضغط **Add New**
2. في **Key** اكتب اسم المتغير (مثل `ADMIN_SECRET`)
3. في **Value** الصق القيمة
4. تأكد إن ✅ **Production** و ✅ **Preview** مفعلة
5. اضغط **Save**

### 1.4 بعد إضافة/تعديل أي متغير
**مهم!** اضغط **Deployments** → اختر آخر deployment → **Redeploy**
(المتغيرات الجديدة ما تشتغل إلا بعد redeploy)

### كيف تتحقق؟
افتح: `https://qatar-standers.vercel.app/api/health`
يجب أن يظهر JSON فيه حالة Supabase. إذا ظهر خطأ → المتغيرات ناقصة.

---

## الخطوة 2: إنشاء جدول qcs_chunks في Supabase

### لماذا هذه الخطوة؟
البيانات تحتاج جدول في قاعدة البيانات. الجدول يخزن نصوص QCS 2024 مقسمة إلى أجزاء صغيرة (chunks) مع مكان للـ embeddings.

### 2.1 افتح Supabase SQL Editor
1. اذهب إلى: https://supabase.com/dashboard
2. اختر مشروعك
3. في القائمة اليسرى اضغط **SQL Editor** (أيقونة الكود)
4. اضغط **+ New query**

### 2.2 انسخ والصق هذا الكود كاملاً

```sql
-- الخطوة 1: تفعيل pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- الخطوة 2: إنشاء جدول qcs_chunks
CREATE TABLE IF NOT EXISTS qcs_chunks (
  id            bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  content       text NOT NULL,
  source_file   text,
  section_name  text,
  part_name     text,
  part_num      int,
  topics        text[] DEFAULT '{}',
  chunk_index   int DEFAULT 0,
  word_count    int,
  embedding     vector(768),
  created_at    timestamptz DEFAULT now()
);

-- الخطوة 3: إنشاء index للبحث السريع
CREATE INDEX IF NOT EXISTS qcs_chunks_embedding_idx
  ON qcs_chunks USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

-- الخطوة 4: إنشاء index للبحث النصي
CREATE INDEX IF NOT EXISTS qcs_chunks_content_fts_idx
  ON qcs_chunks USING gin (to_tsvector('english', content));

-- الخطوة 5: دالة البحث بالتشابه
CREATE OR REPLACE FUNCTION match_qcs_chunks(
  query_embedding vector(768),
  match_threshold float DEFAULT 0.45,
  match_count int DEFAULT 5,
  filter_file text DEFAULT NULL
)
RETURNS TABLE (
  id bigint,
  content text,
  source_file text,
  section_name text,
  part_name text,
  page_num int,
  similarity float
)
LANGUAGE sql STABLE AS $$
  SELECT id, content, source_file, section_name, part_name, 
         COALESCE(chunk_index, 0) AS page_num,
         1 - (embedding <=> query_embedding) AS similarity
  FROM qcs_chunks
  WHERE embedding IS NOT NULL
    AND 1 - (embedding <=> query_embedding) > match_threshold
    AND (filter_file IS NULL OR source_file ILIKE '%' || filter_file || '%')
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;
```

### 2.3 اضغط Run (أو Ctrl+Enter)

### ماذا تتوقع؟
- يجب أن تظهر رسالة: **Success. No rows returned**
- هذا طبيعي — الأوامر أنشأت الجدول والـ function بنجاح

### إذا ظهر خطأ:
- **"extension vector does not exist"** → خطتك في Supabase لا تدعم pgvector. تحتاج Supabase Pro ($25/شهر) أو تفعيل الـ extension من Dashboard → Database → Extensions → ابحث عن "vector" → Enable
- **"relation qcs_chunks already exists"** → طبيعي — الجدول موجود من قبل. تجاهل.

### كيف تتحقق؟
1. في Supabase اضغط **Table Editor** (في القائمة اليسرى)
2. يجب أن تظهر جدول اسمه **qcs_chunks**
3. الأعمدة: id, content, source_file, section_name, part_name, part_num, topics, embedding, created_at

---

## الخطوة 3: رفع الـ Chunks إلى Supabase

### لماذا هذه الخطوة؟
الجدول فاضي حالياً. لازم نرفع الـ 182 chunk المستخرجة من ملفات QCS.

### 3.1 افتح Terminal على جهازك

```bash
# انسخ الريبو (إذا ما عندك نسخة محلية)
git clone https://github.com/shoosh85-code/Qatar-standers-.git
cd Qatar-standers-
git pull origin main
```

### 3.2 أنشئ ملف .env.local في مجلد المشروع

```bash
# أنشئ الملف (استبدل القيم بقيمك الفعلية)
cat > .env.local << 'EOF'
SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR_KEY_HERE
EOF
```

**⚠️ مهم:**
- استبدل `YOUR_PROJECT_ID` بـ ID مشروعك في Supabase
- استبدل `YOUR_KEY_HERE` بـ service_role key (من Supabase → Settings → API)
- **لا ترفع .env.local إلى GitHub أبداً** (هو في .gitignore بالفعل)

### 3.3 شغّل سكربت الرفع

```bash
node scripts/upload-chunks.js
```

### ماذا تتوقع؟
```
🚀 بدء رفع QCS chunks إلى Supabase...

   URL: https://xxx.supabase.co

📦 182 chunk للرفع (من 12 ملف)

✅ جدول qcs_chunks موجود
🗑️  حذف البيانات القديمة...
   ✅ تم الحذف
   Batch 1/4 (50 chunks) ... ✅
   Batch 2/4 (50 chunks) ... ✅
   Batch 3/4 (50 chunks) ... ✅
   Batch 4/4 (32 chunks) ... ✅

═══════════════════════════════════════════
✅ رُفع: 182 chunk
═══════════════════════════════════════════
```

### إذا ظهر خطأ:
- **"env vars مفقودة"** → .env.local غير موجود أو القيم غلط. تحقق بـ: `cat .env.local`
- **"جدول qcs_chunks غير موجود"** → ارجع للخطوة 2 وشغّل الـ SQL
- **"Supabase error 401"** → الـ service_role key غلط — تأكد منه من Dashboard

### كيف تتحقق؟
- افتح Supabase → Table Editor → qcs_chunks
- يجب أن تشوف 182 صف
- عمود content فيه نصوص QCS
- عمود embedding فاضي (null) — هذا طبيعي، الخطوة التالية تملأه

---

## الخطوة 4: توليد الـ Embeddings

### لماذا هذه الخطوة؟
الـ embeddings تحوّل النص إلى أرقام (vector) يفهمها الكمبيوتر للبحث بالتشابه. بدونها البحث الدلالي ما يشتغل.

### 4.1 تأكد إن Vercel عمل Redeploy بعد إضافة ADMIN_SECRET

### 4.2 شغّل أول دفعة

افتح Terminal وشغّل (استبدل YOUR_ADMIN_SECRET بالقيمة اللي وضعتها في Vercel):

```bash
curl -X POST https://qatar-standers.vercel.app/api/generate-embeddings \
  -H "Content-Type: application/json" \
  -d '{"admin_secret":"YOUR_ADMIN_SECRET","batch_size":50,"offset":0}'
```

### ماذا تتوقع؟
```json
{
  "processed": 50,
  "failed": 0,
  "remaining": 132,
  "next_offset": 50,
  "message": "Done. 132 chunks still need embeddings."
}
```

### 4.3 كرر حتى remaining = 0

```bash
# الدفعة 2
curl -X POST https://qatar-standers.vercel.app/api/generate-embeddings \
  -H "Content-Type: application/json" \
  -d '{"admin_secret":"YOUR_ADMIN_SECRET","batch_size":50,"offset":0}'

# الدفعة 3
curl -X POST https://qatar-standers.vercel.app/api/generate-embeddings \
  -H "Content-Type: application/json" \
  -d '{"admin_secret":"YOUR_ADMIN_SECRET","batch_size":50,"offset":0}'

# الدفعة 4
curl -X POST https://qatar-standers.vercel.app/api/generate-embeddings \
  -H "Content-Type: application/json" \
  -d '{"admin_secret":"YOUR_ADMIN_SECRET","batch_size":50,"offset":0}'
```

**ملاحظة:** offset يبقى 0 في كل مرة — لأن الـ query يجلب chunks بدون embeddings فقط. كل مرة يعالج 50 chunk جديدة.

### 4.4 كرر حتى تحصل على:
```json
{
  "message": "All chunks already have embeddings!",
  "processed": 0
}
```

### إذا ظهر خطأ:
- **"Forbidden — admin_secret required"** → الـ ADMIN_SECRET في الـ request غلط أو Vercel ما عمل redeploy
- **"Missing env vars"** → GEMINI_API_KEY أو SUPABASE vars مفقودة في Vercel
- **"429 Too Many Requests"** → انتظر دقيقة وحاول مرة ثانية
- **failed > 0** → عادي إذا عدد قليل — Gemini API أحياناً يرفض طلبات. كرر الأمر نفسه وسيعالج الفاشلة

### كيف تتحقق؟
- افتح Supabase → Table Editor → qcs_chunks
- عمود embedding يجب أن يكون **ممتلئ** (أرقام طويلة بين أقواس مربعة)
- إذا كل الصفوف فيها embedding = البحث الدلالي جاهز!

---

## الخطوة 5: اختبر البحث الدلالي

### 5.1 افتح الموقع
اذهب إلى: https://qatar-standers.vercel.app

### 5.2 ابحث عن سؤال هندسي
اكتب في صندوق البحث:
```
ما هو الحد الأقصى لدرجة حرارة الخرسانة عند الصب
```

### ماذا تتوقع؟
1. **أولاً** (خلال 200-500ms): تظهر "نتائج فورية من QCS 2024" مع badge أخضر **🧠 Vector**
2. **ثانياً** (خلال 2-3 ثوان): تظهر إجابة AI مفصلة مبنية على النصوص الحقيقية

### إذا ظهر badge أزرق **🔤 FTS** بدل أخضر:
- يعني البحث يستخدم Full Text Search (نصي) بدل Vector (دلالي)
- هذا يحصل إذا الـ embeddings لم تُولّد بالكامل
- ارجع للخطوة 4 وتأكد إن كل الـ chunks فيها embeddings

### إذا لم تظهر "نتائج فورية" أبداً:
- افتح Developer Console (F12 → Console)
- ابحث عن: `QCS search:` — إذا فيه خطأ سيظهر هنا
- الأسباب المحتملة:
  - Supabase env vars غلط
  - جدول qcs_chunks فاضي
  - match_qcs_chunks function غير موجودة → ارجع للخطوة 2

---

## ملخص الخطوات

```
الخطوة 1: إعداد env vars في Vercel (5 دقائق)
    ↓
الخطوة 2: إنشاء جدول في Supabase SQL Editor (2 دقيقة)
    ↓
الخطوة 3: رفع 182 chunk بـ node scripts/upload-chunks.js (2 دقيقة)
    ↓
الخطوة 4: توليد embeddings بـ 4 curl commands (5-10 دقائق)
    ↓
الخطوة 5: اختبر البحث على الموقع (1 دقيقة)
```

**المجموع: ~15-20 دقيقة**

بعد الانتهاء → البحث يتحول من:
- ❌ Gemini فقط (3-5 ثوان + $0.01/بحث)
- ✅ Hybrid: pgvector (200ms مجاناً) + Gemini enrichment
