// api/scanner.js — QatarSpec Pro
// ═══════════════════════════════════════════════════════════════════
// دمج جراحي لـ 6 ملفات scanner:
//   scan-upload.js       → ?action=upload
//   scan-status.js       → ?action=status
//   scan-gemini-fallback → ?action=gemini
//   backend-info.js      → ?action=backend-info
//   kiri-verify.js       → ?action=kiri-verify
//   export-scan-pdf.js   → ?action=export-pdf
// ═══════════════════════════════════════════════════════════════════
// لا تحذف أي كود — فقط routing

import { withRateLimit } from './rate-limit.js';

// ════════════════════════════════════════════════════════════════════
// ██ scan-upload — استقبال الصور + دعم backends
// ════════════════════════════════════════════════════════════════════

const SCAN_BACKEND   = process.env.SCAN_BACKEND  || 'gemini-fallback';
const KIRI_API_KEY_UPLOAD = process.env.KIRI_API_KEY;
const KIRI_BASE_UPLOAD    = process.env.KIRI_API_ENDPOINT || 'https://api.kiri.art/v1';
const BACKEND_URL    = process.env.BACKEND_URL;
const BACKEND_SECRET = process.env.BACKEND_SECRET;

const MIN_IMAGES = 20;

// SEC v3.1: CORS محدود — بدلاً من wildcard *
const CORS_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://qatar-standers.vercel.app';
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': CORS_ORIGIN,
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-user-tier',
};
const MAX_IMAGES = 60;
const MAX_FILE_MB = 5;

// تتبع jobs في الذاكرة
const jobs = new Map();

async function scanUploadHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

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

    try {
      const rawScale = fields.scale_info?.[0];
      scaleInfo = rawScale ? JSON.parse(rawScale) : { type: 'none', accuracy_estimate: '±15%' };
    } catch {
      scaleInfo = { type: 'none', accuracy_estimate: '±15%' };
    }

  } catch (err) {
    return res.status(400).json({ error: 'خطأ في قراءة الملفات: ' + err.message });
  }

  if (!files.length || files.length < MIN_IMAGES) {
    return res.status(400).json({
      error: `يجب رفع ${MIN_IMAGES} صورة على الأقل — وصل ${files.length}`,
    });
  }

  const jobId = `qs_${sessionId}_${Date.now()}`;
  jobs.set(jobId, {
    status: 'uploading',
    progress: 0,
    createdAt: Date.now(),
    backend: SCAN_BACKEND,
    scale_info: scaleInfo,
  });

  res.status(202).json({
    job_id: jobId,
    status: 'processing',
    backend: SCAN_BACKEND,
    scale_info: scaleInfo,
    eta_seconds: SCAN_BACKEND === 'colmap-gsplat' ? 600 : 120,
  });

  _processJob(jobId, files, scaleInfo).catch(err => {
    jobs.set(jobId, { status: 'failed', error: err.message });
    console.error(`[scanner/upload] Job ${jobId} failed (${SCAN_BACKEND}):`, err.message);
  });
}

async function _processJob(jobId, files, scaleInfo) {
  switch (SCAN_BACKEND) {
    case 'colmap-gsplat':
      return await _processWithColmap(jobId, files, scaleInfo);
    case 'kiri':
      return await _processWithKiri(jobId, files);
    case 'gemini-fallback':
    default:
      return await _processWithGeminiFallback(jobId, files, scaleInfo);
  }
}

async function _processWithColmap(jobId, files, scaleInfo) {
  if (!BACKEND_URL) {
    throw new Error('BACKEND_URL غير محدد في env — أضفه في Vercel Environment Variables');
  }

  jobs.set(jobId, { status: 'processing', progress: 5, backend: 'colmap-gsplat' });

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

  const MAX_POLL   = 120;
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
      step:     data.step || null,
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

async function _processWithKiri(jobId, files) {
  if (!KIRI_API_KEY_UPLOAD) {
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

  const uploadRes = await fetch(`${KIRI_BASE_UPLOAD}/reconstruct`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KIRI_API_KEY_UPLOAD}` },
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

    const statusRes = await fetch(`${KIRI_BASE_UPLOAD}/task/${kiriTaskId}`, {
      headers: { Authorization: `Bearer ${KIRI_API_KEY_UPLOAD}` },
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

async function _processWithGeminiFallback(jobId, files, scaleInfo) {
  jobs.set(jobId, { status: 'processing', progress: 20, backend: 'gemini-fallback' });

  // ── تحديث URL بعد الدمج ──
  const GEMINI_FALLBACK_URL = '/api/scanner?action=gemini';

  const imageBase64List = [];
  for (const file of files.slice(0, 5)) {
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


// ════════════════════════════════════════════════════════════════════
// ██ scan-status — استعلام حالة المعالجة
// ════════════════════════════════════════════════════════════════════

async function scanStatusHandler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const raw   = req.query?.jobId || '';
  const jobId = String(raw).replace(/[^a-zA-Z0-9_\-]/g, '').slice(0, 80);

  if (!jobId) {
    return res.status(400).json({ error: 'jobId مطلوب' });
  }

  const job = jobs.get(jobId);

  if (!job) {
    return res.status(404).json({ error: 'Job غير موجود أو انتهت صلاحيته' });
  }

  const TWO_HOURS = 2 * 60 * 60 * 1000;
  if (job.status === 'completed' && job.completedAt && Date.now() - job.completedAt > TWO_HOURS) {
    jobs.delete(jobId);
    return res.status(410).json({ error: 'Job expired — please re-upload' });
  }

  res.setHeader('Cache-Control', 'no-store');

  return res.status(200).json({
    job_id:       jobId,
    status:       job.status,
    progress:     job.progress || 0,
    backend:      job.backend || 'gemini-fallback',
    glb_url:      job.glb_url      || null,
    download_url: job.download_url || job.glb_url || null,
    spz_url:      job.download_url || null,
    file_size_mb: job.file_size_mb || null,
    eta_seconds:  job.eta_seconds  || null,
    error:        job.error        || null,
  });
}


// ════════════════════════════════════════════════════════════════════
// ██ scan-gemini-fallback — تحليل صور بـ Gemini Vision
// ════════════════════════════════════════════════════════════════════

const MAX_IMAGE_SIZE = 4 * 1024 * 1024;

async function analyzeImages(images) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY غير موجود في البيئة');

  const systemPrompt = `أنت مهندس مدني متخصص في مراقبة الجودة وفق QCS 2024.
حلل هذه الصور للموقع الإنشائي وأعطِ تقديراً للأبعاد.
إذا وُجد ورق A4 أو باب قياسي في الصورة، استخدمه مقياساً.
أجب بـ JSON فقط، لا تضف أي نص قبله أو بعده.`;

  const userPrompt = `حلل هذه الصور وأعطني:
1. الأبعاد التقديرية (عرض، ارتفاع، عمق) بالمتر
2. المساحة التقديرية بالمتر المربع
3. أي مخاوف تتعلق بمواصفات QCS 2024
4. تنبيهات للمهندس

أجب بهذا الـ JSON الدقيق فقط:
{
  "dimensions": {
    "width": <رقم بالمتر>,
    "height": <رقم بالمتر>,
    "depth": <رقم بالمتر>,
    "unit": "m"
  },
  "estimated_area_m2": <رقم>,
  "confidence": "low|medium|high",
  "scale_reference": "none|a4_paper|door|other",
  "notes": "<ملاحظات بالعربية>",
  "qcs_flags": ["<تنبيه 1>", "<تنبيه 2>"],
  "disclaimer": "تقدير من صور — دقة ±15% — يُوصى بالقياس الميداني للتأكيد"
}`;

  const contentParts = [{ text: userPrompt }];

  for (const img of images) {
    contentParts.push({
      inlineData: {
        mimeType: img.mimeType || 'image/jpeg',
        data: img.base64
      }
    });
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: contentParts }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 1024,
          responseMimeType: 'application/json'
        }
      })
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Gemini لم يُرجع نتيجة');

  const clean = text.replace(/```json|```/g, '').trim();
  return JSON.parse(clean);
}

async function scanGeminiFallbackHandler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', CORS_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { images, jobId } = req.body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({
        error: 'يجب إرسال مصفوفة images تحتوي على صورة واحدة على الأقل'
      });
    }

    if (images.length > 10) {
      return res.status(400).json({
        error: 'الحد الأقصى 10 صور لكل طلب'
      });
    }

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      if (!img.base64 || typeof img.base64 !== 'string') {
        return res.status(400).json({
          error: `الصورة ${i + 1}: يجب أن تكون base64 string`
        });
      }
      const approxBytes = (img.base64.length * 3) / 4;
      if (approxBytes > MAX_IMAGE_SIZE) {
        return res.status(400).json({
          error: `الصورة ${i + 1} كبيرة جداً (الحد الأقصى 4MB)`
        });
      }
    }

    const analysis = await analyzeImages(images);

    const result = {
      ...analysis,
      jobId: jobId || `gemini_${Date.now()}`,
      processedAt: new Date().toISOString(),
      backend: 'gemini-vision',
      imageCount: images.length
    };

    return res.status(200).json(result);

  } catch (err) {
    console.error('[scanner/gemini] Error:', err.message);

    if (err instanceof SyntaxError) {
      return res.status(502).json({
        error: 'Gemini أرجع تنسيقاً غير صحيح',
        details: err.message
      });
    }

    return res.status(500).json({
      error: 'فشل تحليل الصور',
      details: err.message
    });
  }
}


// ════════════════════════════════════════════════════════════════════
// ██ backend-info — أي SCAN_BACKEND مفعّل
// ════════════════════════════════════════════════════════════════════

async function backendInfoHandler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const backend    = process.env.SCAN_BACKEND || 'gemini-fallback';
  const backendUrl = process.env.BACKEND_URL;

  const labels = {
    'gemini-fallback': { name: 'Gemini AI',               accuracy: '±15%',  eta_min: 2  },
    'kiri':            { name: 'KIRI Engine',              accuracy: '±3%',   eta_min: 5  },
    'colmap-gsplat':   { name: 'COLMAP + Gaussian Splat',  accuracy: '±1cm',  eta_min: 10 },
  };

  const info = {
    backend,
    labels: labels[backend] || { name: backend, accuracy: 'غير معروف', eta_min: 5 },
    backend_url_configured: !!backendUrl,
    kiri_configured: !!process.env.KIRI_API_KEY && !!process.env.KIRI_API_ENDPOINT,
  };

  return res.status(200).json(info);
}


// ════════════════════════════════════════════════════════════════════
// ██ kiri-verify — التحقق من KIRI Engine API
// ════════════════════════════════════════════════════════════════════

const KIRI_BASE_VERIFY    = process.env.KIRI_API_ENDPOINT;
const KIRI_API_KEY_VERIFY = process.env.KIRI_API_KEY;

async function kiriVerifyHandler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!KIRI_BASE_VERIFY) {
    return res.status(200).json({
      configured: false,
      reason: 'KIRI_API_ENDPOINT غير مضبوط في Vercel Environment Variables',
      instructions: [
        '1. اذهب إلى kiriengine.app → Developer → API Docs',
        '2. احصل على API Key و Base URL',
        '3. أضف في Vercel: KIRI_API_ENDPOINT=https://api.kiriengine.app/v1',
        '4. أضف في Vercel: KIRI_API_KEY=your_key_here',
        '5. أضف في Vercel: SCAN_BACKEND=kiri',
      ],
      fallback: 'النظام يستخدم Gemini fallback حالياً (دقة ±15%)',
    });
  }

  if (!KIRI_API_KEY_VERIFY) {
    return res.status(200).json({
      configured: false,
      endpoint: KIRI_BASE_VERIFY,
      reason: 'KIRI_API_KEY غير مضبوط',
      fallback: 'النظام يستخدم Gemini fallback حالياً',
    });
  }

  try {
    const pingRes = await fetch(`${KIRI_BASE_VERIFY}/account`, {
      headers: {
        Authorization: `Bearer ${KIRI_API_KEY_VERIFY}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(5000),
    });

    if (pingRes.ok) {
      const data = await pingRes.json();
      return res.status(200).json({
        configured: true,
        endpoint: KIRI_BASE_VERIFY,
        status: 'connected',
        account: {
          credits:  data.credits  ?? data.balance  ?? 'غير متاح',
          plan:     data.plan     ?? data.tier      ?? 'غير متاح',
          username: data.username ?? data.email     ?? 'غير متاح',
        },
      });
    }

    const errText = await pingRes.text();
    return res.status(200).json({
      configured: true,
      endpoint: KIRI_BASE_VERIFY,
      status: 'error',
      http_status: pingRes.status,
      detail: errText.substring(0, 200),
      note: 'الـ API key قد يكون خاطئاً أو الـ endpoint مختلف — تحقق من docs',
    });

  } catch (err) {
    return res.status(200).json({
      configured: true,
      endpoint: KIRI_BASE_VERIFY,
      status: 'unreachable',
      error: err.message,
      note: 'تحقق من صحة KIRI_API_ENDPOINT في Vercel',
    });
  }
}


// ════════════════════════════════════════════════════════════════════
// ██ export-scan-pdf — تصدير تقرير فحص الموقع كـ HTML/PDF
// ════════════════════════════════════════════════════════════════════

async function exportScanPdfHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const {
    projectName   = 'موقع قطري',
    engineer      = 'مهندس',
    scanDate      = new Date().toLocaleDateString('ar-QA'),
    dimensions    = {},
    measurements  = [],
    hotspots      = [],
    screenshotB64 = null,
    scale_info    = null,
  } = body || {};

  let distances = [], areas = [], volumes = [], angles = [];

  if (Array.isArray(measurements)) {
    for (const m of measurements) {
      if (!m.type || m.type === 'distance') distances.push(m);
      else if (m.type === 'area')   areas.push(m);
      else if (m.type === 'volume') volumes.push(m);
      else if (m.type === 'angle')  angles.push(m);
    }
  } else if (measurements && typeof measurements === 'object') {
    distances = measurements.distances || [];
    areas     = measurements.areas     || [];
    volumes   = measurements.volumes   || [];
    angles    = measurements.angles    || [];
  }

  const passCount = hotspots.filter(h => h.status === 'pass').length;
  const failCount = hotspots.filter(h => h.status === 'fail').length;
  const warnCount = hotspots.filter(h => h.status === 'warning').length;

  const hotspotsRows = hotspots.map(h => `
    <tr class="${h.status}">
      <td>${h.title || '—'}</td>
      <td>${h.part || '—'} / ${h.clause || '—'}</td>
      <td>${h.measured ?? '—'} ${h.unit || ''}</td>
      <td>${h.limit ?? '—'} ${h.unit || ''}</td>
      <td class="status-cell">
        ${h.status === 'pass' ? '✅ مطابق' : h.status === 'fail' ? '❌ غير مطابق' : '⚠️ تحذير'}
      </td>
    </tr>
  `).join('');

  const measureRows = distances.map((m, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${m.label || 'مسافة ' + (i + 1)}</td>
      <td>${m.distanceCm ?? (m.distanceM ? +(m.distanceM * 100).toFixed(1) : '—')} سم</td>
      <td>${m.distanceMm ?? (m.distanceM ? +(m.distanceM * 1000).toFixed(0) : '—')} مم</td>
    </tr>
  `).join('');

  const areaRows = areas.map((m, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${m.label || 'مساحة ' + (i + 1)}</td>
      <td>${m.area_m2 ?? '—'} م²</td>
      <td>${m.area_cm2 ?? '—'} سم²</td>
      <td>${m.perimeter_m ?? '—'} م</td>
    </tr>
  `).join('');

  const volumeRows = volumes.map((m, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${m.label || 'حجم ' + (i + 1)}</td>
      <td>${m.volume_m3 ?? '—'} م³</td>
      <td>${m.volume_liters ?? '—'} لتر</td>
      <td>${m.dimensions ? m.dimensions.width_mm + '×' + m.dimensions.height_mm + '×' + m.dimensions.depth_mm + ' مم' : '—'}</td>
    </tr>
  `).join('');

  const angleRows = angles.map((m, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${m.label || 'زاوية ' + (i + 1)}</td>
      <td>${m.degrees ?? '—'}°</td>
      <td>${m.supplement ?? '—'}°</td>
    </tr>
  `).join('');

  const scaleInfoHtml = scale_info ? (() => {
    const methodLabels = {
      'a4_paper': '📄 ورقة A4 (210×297mm)',
      'manual':   '📐 مسافة يدوية: ' + (scale_info.distance_mm ?? '—') + 'mm' + (scale_info.label ? ' (' + scale_info.label + ')' : ''),
      'gps':      '📍 GPS ±' + (scale_info.coordinates?.accuracy_m?.toFixed?.(0) ?? '?') + 'م',
      'none':     '⚠️ بدون معايرة — تقديري فقط',
    };
    return `
      <div class="info-card" style="grid-column:span 3;">
        <label>طريقة المعايرة</label>
        <span style="font-size:13px;">${methodLabels[scale_info.type] || scale_info.type}</span>
        <div style="font-size:11px;color:#64748b;margin-top:4px;">دقة تقديرية: ${scale_info.accuracy_estimate || '—'}</div>
      </div>
    `;
  })() : '';

  const screenshotHtml = screenshotB64
    ? '<img src="' + screenshotB64 + '" style="width:100%;max-height:300px;object-fit:contain;border:1px solid #ddd;border-radius:8px;" />'
    : '<div style="height:200px;background:#f0f4f8;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#94a3b8;">لا توجد صورة للموقع</div>';

  const html = `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Arial', sans-serif; direction: rtl; color: #1e293b; font-size: 13px; }
  .header { background: #1a1a2e; color: white; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; }
  .header h1 { font-size: 20px; }
  .header .meta { font-size: 11px; opacity: 0.8; text-align: left; }
  .qcs-badge { background: #c8961a; color: white; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: bold; }
  .content { padding: 20px 24px; }
  .section { margin-bottom: 20px; }
  .section-title { font-size: 14px; font-weight: bold; color: #1a1a2e; border-bottom: 2px solid #c8961a; padding-bottom: 6px; margin-bottom: 12px; }
  .info-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
  .info-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; }
  .info-card label { font-size: 10px; color: #64748b; display: block; margin-bottom: 4px; }
  .info-card span { font-size: 16px; font-weight: bold; color: #1a1a2e; }
  .summary-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
  .summary-card { border-radius: 8px; padding: 14px; text-align: center; }
  .summary-card.pass { background: #f0fdf4; border: 2px solid #22c55e; }
  .summary-card.fail { background: #fef2f2; border: 2px solid #ef4444; }
  .summary-card.warn { background: #fffbeb; border: 2px solid #f59e0b; }
  .summary-card .num { font-size: 28px; font-weight: bold; }
  .summary-card.pass .num { color: #16a34a; }
  .summary-card.fail .num { color: #dc2626; }
  .summary-card.warn .num { color: #d97706; }
  .summary-card label { font-size: 11px; color: #64748b; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; }
  th { background: #1a1a2e; color: white; padding: 8px 10px; text-align: right; }
  td { padding: 8px 10px; border-bottom: 1px solid #e2e8f0; }
  tr.pass td { background: #f0fdf4; }
  tr.fail td { background: #fef2f2; }
  tr.warning td { background: #fffbeb; }
  .status-cell { font-weight: bold; }
  .footer { margin-top: 24px; padding: 14px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 10px; color: #94a3b8; display: flex; justify-content: space-between; }
  .disclaimer { background: #fffbeb; border: 1px solid #f59e0b; border-radius: 6px; padding: 10px 14px; font-size: 11px; color: #92400e; margin-top: 16px; }
</style>
</head>
<body>
<div class="header">
  <div>
    <h1>🏗️ QatarSpec Pro — تقرير فحص الموقع</h1>
    <div style="margin-top:6px;font-size:12px;">المشروع: ${projectName} | المهندس: ${engineer}</div>
  </div>
  <div class="meta">
    <div class="qcs-badge">QCS 2024</div>
    <div style="margin-top:6px;">تاريخ الفحص: ${scanDate}</div>
    <div>رقم التقرير: QSP-${Date.now().toString(36).toUpperCase()}</div>
  </div>
</div>

<div class="content">

  <div class="section">
    <div class="section-title">📷 النموذج ثلاثي الأبعاد</div>
    ${screenshotHtml}
  </div>

  <div class="section">
    <div class="section-title">📐 أبعاد الموقع (متر)</div>
    <div class="info-grid">
      <div class="info-card">
        <label>العرض</label>
        <span>${dimensions.width ?? '—'} م</span>
      </div>
      <div class="info-card">
        <label>الطول</label>
        <span>${dimensions.depth ?? '—'} م</span>
      </div>
      <div class="info-card">
        <label>الارتفاع</label>
        <span>${dimensions.height ?? '—'} م</span>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">📊 ملخص مطابقة QCS 2024</div>
    <div class="summary-grid">
      <div class="summary-card pass">
        <div class="num">${passCount}</div>
        <label>✅ بنود مطابقة</label>
      </div>
      <div class="summary-card fail">
        <div class="num">${failCount}</div>
        <label>❌ بنود غير مطابقة</label>
      </div>
      <div class="summary-card warn">
        <div class="num">${warnCount}</div>
        <label>⚠️ بنود تحتاج مراجعة</label>
      </div>
    </div>
  </div>

  ${hotspots.length > 0 ? '<div class="section"><div class="section-title">🔍 تفاصيل بنود الفحص</div><table><thead><tr><th>البند</th><th>مرجع QCS</th><th>القيمة المقاسة</th><th>الحد المسموح</th><th>النتيجة</th></tr></thead><tbody>' + hotspotsRows + '</tbody></table></div>' : ''}

  ${scale_info ? '<div class="section"><div class="section-title">📏 معايرة المقياس</div><div class="info-grid">' + scaleInfoHtml + '</div></div>' : ''}

  ${distances.length > 0 ? '<div class="section"><div class="section-title">📏 قياسات المسافة</div><table><thead><tr><th>#</th><th>الوصف</th><th>المسافة (سم)</th><th>المسافة (مم)</th></tr></thead><tbody>' + measureRows + '</tbody></table></div>' : ''}

  ${areas.length > 0 ? '<div class="section"><div class="section-title">📐 قياسات المساحة</div><table><thead><tr><th>#</th><th>الوصف</th><th>المساحة (م²)</th><th>المساحة (سم²)</th><th>المحيط (م)</th></tr></thead><tbody>' + areaRows + '</tbody></table></div>' : ''}

  ${volumes.length > 0 ? '<div class="section"><div class="section-title">📦 قياسات الحجم</div><table><thead><tr><th>#</th><th>الوصف</th><th>الحجم (م³)</th><th>الحجم (لتر)</th><th>الأبعاد (مم)</th></tr></thead><tbody>' + volumeRows + '</tbody></table></div>' : ''}

  ${angles.length > 0 ? '<div class="section"><div class="section-title">📐 قياسات الزاوية</div><table><thead><tr><th>#</th><th>الوصف</th><th>الزاوية</th><th>الزاوية المكملة</th></tr></thead><tbody>' + angleRows + '</tbody></table></div>' : ''}

  <div class="disclaimer">
    ⚠️ <strong>إخلاء مسؤولية:</strong> هذا التقرير مبني على مسح رقمي بالهاتف. للقرارات الهندسية الرسمية يجب الاستعانة بمساح معتمد وفق متطلبات Ashghal / MMUP القطرية.
    دقة القياس: ${scale_info?.accuracy_estimate || '±2-5 سم'}.
    <br>مرجع: QCS 2024 · Ashghal RDM 2023 · KAHRAMAA 2024 · MMUP
  </div>

</div>

<div class="footer">
  <span>QatarSpec Pro — qatar-standers.vercel.app</span>
  <span>تم الإنشاء بواسطة QatarSpec Pro v3.2 | جميع الحقوق محفوظة</span>
</div>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('X-Report-Type', 'scan-inspection');
  return res.status(200).send(html);
}


// ════════════════════════════════════════════════════════════════════
// ██ ROUTER — نقطة الدخول الوحيدة
// ════════════════════════════════════════════════════════════════════

// تغليف كل handler بـ rate limit (نفس المفاتيح الأصلية)
const wrappedUpload       = withRateLimit(scanUploadHandler,       '/api/scan-upload');
const wrappedStatus       = withRateLimit(scanStatusHandler,       '/api/scan-status');
const wrappedGemini       = withRateLimit(scanGeminiFallbackHandler, '/api/scan-upload');
const wrappedBackendInfo  = withRateLimit(backendInfoHandler,      '/api/backend-info');
const wrappedKiriVerify   = withRateLimit(kiriVerifyHandler,       '/api/kiri-verify');
const wrappedExportPdf    = withRateLimit(exportScanPdfHandler,    '/api/export-scan-pdf');

export default async function handler(req, res) {
  // SEC v3.1: CORS محدود — بدلاً من wildcard *
  res.setHeader('Access-Control-Allow-Origin', CORS_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-user-tier');

  if (req.method === 'OPTIONS') return res.status(204).end();

  const action = req.query?.action;

  if (action === 'upload')       return wrappedUpload(req, res);
  if (action === 'status')       return wrappedStatus(req, res);
  if (action === 'gemini')       return wrappedGemini(req, res);
  if (action === 'backend-info') return wrappedBackendInfo(req, res);
  if (action === 'kiri-verify')  return wrappedKiriVerify(req, res);
  if (action === 'export-pdf')   return wrappedExportPdf(req, res);

  return res.status(400).json({
    error: 'action مطلوب',
    valid_actions: ['upload', 'status', 'gemini', 'backend-info', 'kiri-verify', 'export-pdf'],
  });
}
