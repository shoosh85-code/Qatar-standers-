# QatarSpec GPU Backend — Railway Deploy Guide

## Prerequisites
- Railway account (railway.app)
- Cloudflare R2 bucket created
- NVIDIA T4 GPU plan (~$0.40/hr)
- Docker installed locally (للاختبار المحلي)

---

## Steps

### 1. تسجيل الدخول وتهيئة المشروع
```bash
npm install -g @railway/cli
railway login
cd backend
railway init
```

### 2. إنشاء الـ Service
```bash
railway add --service qs-gpu-backend
```

### 3. إعداد المتغيرات البيئية
```bash
railway vars set BACKEND_SECRET=your_strong_secret_here
railway vars set R2_ENDPOINT=https://your-account.r2.cloudflarestorage.com
railway vars set R2_BUCKET=qatarspec-models
railway vars set R2_ACCESS_KEY_ID=your_r2_access_key
railway vars set R2_SECRET_ACCESS_KEY=your_r2_secret_key
railway vars set R2_PUBLIC_URL=https://pub-your-bucket.r2.dev
railway vars set UPLOAD_DIR=/tmp/qs-uploads
```

### 4. النشر باستخدام Dockerfile
```bash
railway up --dockerfile Dockerfile
```

### 5. الحصول على الـ URL
```bash
railway domain
```
احفظ الـ URL → أضفه في Vercel كـ `BACKEND_URL`

---

## Health Check
```bash
curl https://your-backend.railway.app/health
```

### Expected Response
```json
{
  "status": "ok",
  "gpu_available": true,
  "gpu_info": "Tesla T4",
  "jobs_active": 0,
  "jobs_total": 0
}
```

---

## ربط Vercel بالـ Backend
في Vercel Dashboard → Settings → Environment Variables:
```
SCAN_BACKEND=colmap-gsplat
BACKEND_URL=https://your-backend.railway.app
BACKEND_SECRET=your_strong_secret_here
```

---

## اختبار end-to-end بعد النشر
```bash
# 1. Health check
curl https://qatar-standers.vercel.app/api/health

# 2. Backend info
curl https://qatar-standers.vercel.app/api/backend-info

# 3. رفع صورة تجريبية
curl -X POST https://qatar-standers.vercel.app/api/scan-upload \
  -F "images=@test.jpg" \
  -F "session_id=test_$(date +%s)" \
  -F "scale_info={\"type\":\"none\"}"

# 4. تتبع الحالة (استبدل JOB_ID)
curl "https://qatar-standers.vercel.app/api/scan-status?job_id=JOB_ID"
```

---

## تنظيف يدوي للـ Jobs
```bash
curl -X DELETE https://your-backend.railway.app/job/JOB_ID \
  -H "x-backend-secret: your_strong_secret_here"
```

---

## ملاحظات
- الـ NVIDIA T4 GPU متوفر في Railway على خطة Hobby أو أعلى
- وقت المعالجة: ~5-10 دقائق للمشهد العادي (20-60 صورة)
- التكلفة التقديرية: $0.40/hr × GPU time فقط (لا تُحسب وقت idle)
- السجلات: `railway logs --tail` للمتابعة الحية
