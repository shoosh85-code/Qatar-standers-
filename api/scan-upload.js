// api/scan-upload.js — QatarSpec Pro
// استقبال الصور + دعم SCAN_BACKEND: gemini-fallback | kiri | colmap-gsplat
// PROTOCOL 6: Rate limited via withRateLimit wrapper

import { withRateLimit } from './rate-limit.js';

// SCAN_BACKEND يحدد المحرك المستخدم — server-side env var فقط
const SCAN_BACKEND  = process.env.SCAN_BACKEND  || 'gemini-fallback';
const KIRI_API_KEY  = process.env.KIRI_API_KEY;
const KIRI_BASE     = process.env.KIRI_API_ENDPOINT || 'https://api.kiri.art/v1';
const BACKEND_URL   = process.env.BACKEND_URL;       // colmap-gsplat backend
const BACKEND_SECRET = process.env.BACKEND_SECRET;

const MIN_IMAGES  = 20;
const MAX_IMAGES  = 60;
const MAX_FILE_MB = 5;

// تتبع jobs في الذاكرة (في الإنتاج: استخدم Vercel KV أو Supabase)
export const jobs = new Map();

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // ===== استخراج الـ FormData =====
  let files, sessionId, scaleInfo;
  try {
    const contentType = req.headers['content-type'] || '';
    if (!contentType.includes('multipart/form-data')) {
      return res.status(400).json({ error: 'يجب إرسال multipart/form-data' });
    }

    const { IncomingForm } = await import('formidable');
    const form = new IncomingForm({
      maxFileSize: MAX_FILE_MB * 1024 * 1024,
      maxFiles: MAX_IMAGES,
      filter: (part) => part.mimetype?.startsWith('image/'),
    });

    const [fields, formFiles] = await form.parse(req);
    files     = formFiles.images || [];
    sessionId = fields.sessionId?.[0] || `sess_${Date.now()}`;

    // معلومات معايرة المقياس (اختياري)
    try {
      const rawScale = fields.scale_info?.[0];
      scaleInfo = rawScale ? JSON.parse(rawScale) : { type: 'none', accuracy_estimate: '±15%' };
    } catch {
      scaleInfo = { type: 'none', accuracy_estimate: '±15%' };
    }

  } catch (err) {
    return res.status(400).json({ error: 'خطأ في قراءة الملفات: ' + err.message });
  }

  // ===== التحقق من عدد الصور =====
  if (!files.length || files.length < MIN_IMAGES) {
    return res.status(400).json({
      error: `يجب رفع ${MIN_IMAGES} صورة على الأقل — وصل ${files.length}`,
    });
  }

  // ===== إنشاء Job ID =====
  const jobId = `qs_${sessionId}_${Date.now()}`;
  jobs.set(jobId, {
    status: 'uploading',
    progress: 0,
    createdAt: Date.now(),
    backend: SCAN_BACKEND,
    scale_info: scaleInfo,
  });

  // ===== رد فوري + معالجة في الخلفية =====
  res.status(202).json({
    job_id: jobId,
    status: 'processing',
    backend: SCAN_BACKEND,
    scale_info: scaleInfo,
    eta_seconds: SCAN_BACKEND === 'colmap-gsplat' ? 600 : 120,
  });

  // معالجة غير متزامنة حسب الـ backend المحدد
  _processJob(jobId, files, scaleInfo).catch(err => {
    jobs.set(jobId, { status: 'failed', error: err.message });
    console.error(`[scan-upload] Job ${jobId} failed (${SCAN_BACKEND}):`, err.message);
  });
}

// ===== توجيه المعالجة حسب SCAN_BACKEND =====
async function _processJob(jobId, files, scaleInfo) {
  switch (SCAN_BACKEND) {
    case 'colmap-gsplat':
      return await _processWithColmap(jobId, files, scaleInfo);
    case 'kiri':
      return await _processWithKiri(jobId, files);
    case 'gemini-fallback':
    default:
      // Gemini Fallback يعالج في scan-gemini-fallback.js بشكل منفصل
      return await _processWithGeminiFallback(jobId, files, scaleInfo);
  }
}

// ===== COLMAP + Gaussian Splat Backend =====
async function _processWithColmap(jobId, files, scaleInfo) {
  if (!BACKEND_URL) {
    throw new Error('BACKEND_URL غير محدد في env — أضفه في Vercel Environment Variables');
  }

  jobs.set(jobId, { status: 'processing', progress: 5, backend: 'colmap-gsplat' });

  // بناء FormData للـ Backend
  const formData = new FormData();
  for (const file of files) {
    const buffer = await import('fs').then(fs => fs.promises.readFile(file.filepath));
    const blob   = new Blob([buffer], { type: file.mimetype });
    formData.append('images', blob, file.originalFilename || 'scan.jpg');
  }
  formData.append('job_id', jobId);
  formData.append('scale_info', JSON.stringify(scaleInfo));

  const headers = {};
  if (BACKEND_SECRET) headers['X-Backend-Secret'] = BACKEND_SECRET;

  const uploadRes = await fetch(`${BACKEND_URL}/process`, {
    method: 'POST',
    headers,
    body: formData,
  });

  if (!uploadRes.ok) {
    const errText = await uploadRes.text();
    throw new Error(`COLMAP backend failed [${uploadRes.status}]: ${errText}`);
  }

  const uploadData = await uploadRes.json();
  const backendJobId = uploadData.job_id || jobId;
  jobs.set(jobId, { status: 'processing', progress: 10, backendJobId });

  // Polling حالة المعالجة
  const MAX_POLL   = 120; // 10 دقائق
  const POLL_MS    = 5000;

  for (let i = 0; i < MAX_POLL; i++) {
    await new Promise(r => setTimeout(r, POLL_MS));

    const statusRes = await fetch(`${BACKEND_URL}/status/${backendJobId}`, { headers });
    if (!statusRes.ok) continue;

    const data = await statusRes.json();
    const progress = Math.min(95, 10 + (data.progress || 0) * 0.85);

    jobs.set(jobId, {
      status:   data.status === 'completed' ? 'completed' : 'processing',
      progress: Math.round(progress),
      step:     data.step || null, // 'colmap' | 'gsplat' | 'compress'
    });

    if (data.status === 'completed') {
      jobs.set(jobId, {
        status:       'completed',
        progress:     100,
        glb_url:      data.download_url,
        splat_url:    data.splat_url || null,
        file_size_mb: data.file_size_mb || null,
        scale_info:   scaleInfo,
        completedAt:  Date.now(),
      });
      return;
    }

    if (data.status === 'failed') {
      throw new Error(data.error || 'COLMAP processing failed');
    }
  }

  throw new Error('انتهت مهلة الانتظار (10 دقائق) للـ COLMAP Backend');
}

// ===== KIRI Engine =====
async function _processWithKiri(jobId, files) {
  if (!KIRI_API_KEY) {
    throw new Error('KIRI_API_KEY غير محدد — أضفه في Vercel Environment Variables');
  }

  const MAX_POLL = 60;
  const POLL_MS  = 5000;

  jobs.set(jobId, { status: 'processing', progress: 5, backend: 'kiri' });

  const formData = new FormData();
  for (const file of files) {
    const buffer = await import('fs').then(fs => fs.promises.readFile(file.filepath));
    const blob   = new Blob([buffer], { type: file.mimetype });
    formData.append('images', blob, file.originalFilename || 'scan.jpg');
  }
  formData.append('output_format', 'glb');
  formData.append('quality', 'standard');

  const uploadRes = await fetch(`${KIRI_BASE}/reconstruct`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KIRI_API_KEY}` },
    body: formData,
  });

  if (!uploadRes.ok) {
    const errText = await uploadRes.text();
    throw new Error(`KIRI upload failed [${uploadRes.status}]: ${errText}`);
  }

  const uploadData = await uploadRes.json();
  const kiriTaskId = uploadData.task_id;
  jobs.set(jobId, { status: 'processing', progress: 15, kiriTaskId });

  for (let i = 0; i < MAX_POLL; i++) {
    await new Promise(r => setTimeout(r, POLL_MS));

    const statusRes = await fetch(`${KIRI_BASE}/task/${kiriTaskId}`, {
      headers: { Authorization: `Bearer ${KIRI_API_KEY}` },
    });

    if (!statusRes.ok) continue;

    const statusData = await statusRes.json();
    const progress   = Math.min(95, 15 + (statusData.progress || 0) * 0.8);

    jobs.set(jobId, {
      status:   statusData.status === 'succeeded' ? 'completed' : 'processing',
      progress: Math.round(progress),
      kiriTaskId,
    });

    if (statusData.status === 'succeeded') {
      jobs.set(jobId, {
        status:       'completed',
        progress:     100,
        glb_url:      statusData.output_url,
        file_size_mb: statusData.file_size_mb || null,
        completedAt:  Date.now(),
      });
      return;
    }

    if (statusData.status === 'failed') {
      throw new Error(statusData.error || 'KIRI processing failed');
    }
  }

  throw new Error('انتهت مهلة الانتظار (5 دقائق) للـ KIRI Engine');
}

// ===== Gemini Fallback =====
async function _processWithGeminiFallback(jobId, files, scaleInfo) {
  jobs.set(jobId, { status: 'processing', progress: 20, backend: 'gemini-fallback' });

  // استدعاء Gemini Vision endpoint
  const GEMINI_FALLBACK_URL = '/api/scan-gemini-fallback';

  // بناء payload للـ Gemini
  const imageBase64List = [];
  for (const file of files.slice(0, 5)) { // نرسل أول 5 صور للتحليل
    const buffer = await import('fs').then(fs => fs.promises.readFile(file.filepath));
    imageBase64List.push({
      data: buffer.toString('base64'),
      mimeType: file.mimetype || 'image/jpeg',
    });
  }

  jobs.set(jobId, { status: 'processing', progress: 40 });

  const geminiRes = await fetch(
    `${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'}${GEMINI_FALLBACK_URL}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ images: imageBase64List, scale_info: scaleInfo, jobId }),
    }
  );

  if (!geminiRes.ok) {
    const errText = await geminiRes.text();
    throw new Error(`Gemini fallback failed [${geminiRes.status}]: ${errText}`);
  }

  const geminiData = await geminiRes.json();

  jobs.set(jobId, {
    status:          'completed',
    progress:        100,
    glb_url:         geminiData.glb_url || null,
    dimensions:      geminiData.dimensions,
    analysis:        geminiData.analysis,
    accuracy:        scaleInfo.accuracy_estimate || '±15%',
    scale_info:      scaleInfo,
    completedAt:     Date.now(),
  });
}

export default withRateLimit(handler, '/api/scan-upload');
