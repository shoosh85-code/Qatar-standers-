// api/scan-status.js — QatarSpec Pro
// استعلام عن حالة معالجة النموذج ثلاثي الأبعاد

import { withRateLimit } from './rate-limit.js';
import { jobs } from './scan-upload.js';

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // تنظيف input
  const raw   = req.query?.jobId || '';
  const jobId = String(raw).replace(/[^a-zA-Z0-9_\-]/g, '').slice(0, 80);

  if (!jobId) {
    return res.status(400).json({ error: 'jobId مطلوب' });
  }

  const job = jobs.get(jobId);

  if (!job) {
    return res.status(404).json({ error: 'Job غير موجود أو انتهت صلاحيته' });
  }

  // إذا كان job مكتملاً ومر عليه 2 ساعة → احذفه
  const TWO_HOURS = 2 * 60 * 60 * 1000;
  if (job.status === 'completed' && job.completedAt && Date.now() - job.completedAt > TWO_HOURS) {
    jobs.delete(jobId);
    return res.status(410).json({ error: 'Job expired — please re-upload' });
  }

  // إضافة CORS headers
  res.setHeader('Cache-Control', 'no-store');

  return res.status(200).json({
    job_id:       jobId,
    status:       job.status,       // uploading | processing | completed | failed
    progress:     job.progress || 0,
    backend:      job.backend || 'gemini-fallback',
    glb_url:      job.glb_url      || null,
    download_url: job.download_url || job.glb_url || null,  // colmap-gsplat → SPZ
    spz_url:      job.download_url || null,
    file_size_mb: job.file_size_mb || null,
    eta_seconds:  job.eta_seconds  || null,
    error:        job.error        || null,
  });
}

export default withRateLimit(handler, '/api/scan-status');
