// api/kiri-verify.js — QatarSpec Pro
// التحقق من KIRI Engine API + عرض الـ pricing والـ capabilities
// PROTOCOL 6: Rate limited | Free: 3/min | Pro: 10/min

import { withRateLimit } from './rate-limit.js';

// ⚠️ KIRI Engine API endpoint — يجب التحقق من الـ docs الرسمية
// https://kiriengine.app → Developer → API
// المستخدم يضع KIRI_API_ENDPOINT في Vercel env vars
const KIRI_BASE    = process.env.KIRI_API_ENDPOINT;  // لا قيمة افتراضية — مطلوب من المستخدم
const KIRI_API_KEY = process.env.KIRI_API_KEY;

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // ===== حالة 1: لا KIRI_API_ENDPOINT — المستخدم لم يضبطه =====
  if (!KIRI_BASE) {
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

  // ===== حالة 2: KIRI_API_KEY غير موجود =====
  if (!KIRI_API_KEY) {
    return res.status(200).json({
      configured: false,
      endpoint: KIRI_BASE,
      reason: 'KIRI_API_KEY غير مضبوط',
      fallback: 'النظام يستخدم Gemini fallback حالياً',
    });
  }

  // ===== حالة 3: اختبار الـ API فعلياً =====
  try {
    // محاولة فحص الـ account/balance أو ping
    const pingRes = await fetch(`${KIRI_BASE}/account`, {
      headers: {
        Authorization: `Bearer ${KIRI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(5000),
    });

    if (pingRes.ok) {
      const data = await pingRes.json();
      return res.status(200).json({
        configured: true,
        endpoint: KIRI_BASE,
        status: 'connected',
        account: {
          credits:  data.credits  ?? data.balance  ?? 'غير متاح',
          plan:     data.plan     ?? data.tier      ?? 'غير متاح',
          username: data.username ?? data.email     ?? 'غير متاح',
        },
      });
    }

    // API رد لكن بخطأ
    const errText = await pingRes.text();
    return res.status(200).json({
      configured: true,
      endpoint: KIRI_BASE,
      status: 'error',
      http_status: pingRes.status,
      detail: errText.substring(0, 200),
      note: 'الـ API key قد يكون خاطئاً أو الـ endpoint مختلف — تحقق من docs',
    });

  } catch (err) {
    // شبكة / timeout
    return res.status(200).json({
      configured: true,
      endpoint: KIRI_BASE,
      status: 'unreachable',
      error: err.message,
      note: 'تحقق من صحة KIRI_API_ENDPOINT في Vercel',
    });
  }
}

export default withRateLimit(handler, '/api/kiri-verify');
