// api/scan-upload.js — QatarSpec Pro
// استقبال الصور + إرسال لـ KIRI Engine API
// PROTOCOL 6: Rate limited via withRateLimit wrapper

import { withRateLimit } from './rate-limit.js';

const KIRI_API_KEY = process.env.KIRI_API_KEY; // server-side only — NO localStorage
const KIRI_BASE    = 'https://api.kiri.art/v1'; // استبدل بـ endpoint الفعلي

const MIN_IMAGES = 20;
const MAX_IMAGES = 60;
const MAX_FILE_MB = 5;

// تتبع jobs في الذاكرة (في الإنتاج: استخدم Vercel KV أو Supabase)
export const jobs = new Map();

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // ===== استخراج الـ FormData =====
  let files, sessionId;
  try {
    // Vercel يدعم req.body كـ FormData مع formidable أو built-in
    // نستخدم نهج مبسط مع content-type check
    const contentType = req.headers['content-type'] || '';
    if (!contentType.includes('multipart/form-data')) {
      return res.status(400).json({ error: 'يجب إرسال multipart/form-data' });
    }

    // في Vercel: استخدم formidable لمعالجة الملفات
    const { IncomingForm } = await import('formidable');
    const form = new IncomingForm({
      maxFileSize: MAX_FILE_MB * 1024 * 1024,
      maxFiles: MAX_IMAGES,
      filter: (part) => part.mimetype?.startsWith('image/'),
    });

    const [fields, formFiles] = await form.parse(req);
    files     = formFiles.images || [];
    sessionId = fields.sessionId?.[0] || `sess_${Date.now()}`;

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
  jobs.set(jobId, { status: 'uploading', progress: 0, createdAt: Date.now() });

  // ===== رد فوري + معالجة في الخلفية =====
  res.status(202).json({ job_id: jobId, status: 'processing', eta_seconds: 120 });

  // معالجة غير متزامنة
  processWithKiri(jobId, files).catch(err => {
    jobs.set(jobId, { status: 'failed', error: err.message });
    console.error(`[scan-upload] Job ${jobId} failed:`, err.message);
  });
}

// ===== إرسال لـ KIRI Engine =====
async function processWithKiri(jobId, files) {
  const MAX_POLL = 60;
  const POLL_MS  = 5000;

  jobs.set(jobId, { status: 'processing', progress: 5 });

  // بناء FormData للـ KIRI API
  const formData = new FormData();
  for (const file of files) {
    const buffer = await import('fs').then(fs => fs.promises.readFile(file.filepath));
    const blob   = new Blob([buffer], { type: file.mimetype });
    formData.append('images', blob, file.originalFilename || 'scan.jpg');
  }
  formData.append('output_format', 'glb');
  formData.append('quality', 'standard'); // standard | high

  // رفع للـ KIRI
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

  // Polling
  for (let i = 0; i < MAX_POLL; i++) {
    await new Promise(r => setTimeout(r, POLL_MS));

    const statusRes = await fetch(`${KIRI_BASE}/task/${kiriTaskId}`, {
      headers: { Authorization: `Bearer ${KIRI_API_KEY}` },
    });

    if (!statusRes.ok) continue;

    const statusData = await statusRes.json();
    const progress   = Math.min(95, 15 + (statusData.progress || 0) * 0.8);

    jobs.set(jobId, {
      status:     statusData.status === 'succeeded' ? 'completed' : 'processing',
      progress:   Math.round(progress),
      kiriTaskId,
    });

    if (statusData.status === 'succeeded') {
      jobs.set(jobId, {
        status:      'completed',
        progress:    100,
        glb_url:     statusData.output_url,
        file_size_mb: statusData.file_size_mb || null,
        completedAt:  Date.now(),
      });
      return;
    }

    if (statusData.status === 'failed') {
      throw new Error(statusData.error || 'KIRI processing failed');
    }
  }

  throw new Error('انتهت مهلة الانتظار (5 دقائق)');
}

export default withRateLimit(handler, '/api/scan-upload');
