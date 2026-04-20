// api/ai-proxy.js — QatarSpec Pro
// Anthropic API proxy with Supabase-based rate limiting
// Sections referenced: QCS-01, QCS-05, QCS-06, QCS-08, QCS-09, QCS-15

const { createClient } = require('@supabase/supabase-js');

// ── CORS helpers ────────────────────────────────────────────────────────────
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json; charset=utf-8',
};

function respond(res, status, body) {
  return res.status(status).set(CORS_HEADERS).json(body);
}

// ── Supabase rate-limit helpers ─────────────────────────────────────────────
function getMonth() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function getClientIP(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.connection?.remoteAddress || req.socket?.remoteAddress || '0.0.0.0';
}

async function checkAndIncrementRate(supabase, ip, isPro) {
  const month = getMonth();
  const limit = isPro ? 200 : 5; // Free = 5/month, Pro = 200/month

  // Upsert: insert row if not exists, else increment count
  const { data, error } = await supabase.rpc('upsert_rate_limit', {
    p_ip: ip,
    p_month: month,
  });

  if (error) {
    // Fallback: allow request if Supabase is unavailable (don't block users)
    console.error('Rate limit DB error:', error.message);
    return { allowed: true, count: 0, limit };
  }

  const count = data ?? 1;
  return { allowed: count <= limit, count, limit };
}

// ── Main system prompt ───────────────────────────────────────────────────────
const SYSTEM_PROMPT = `أنت مساعد متخصص في مواصفات البناء والإنشاء في قطر (QCS - Qatar Construction Specification).

قواعد مهمة جداً:
1. دائماً اذكر رقم القسم (Section) والبند الدقيق من QCS في إجابتك
2. أجب باللغة العربية دائماً
3. إذا لم تعرف الإجابة، قل ذلك بوضوح ولا تخترع معلومات
4. ركّز على الأرقام والمعايير الدقيقة المذكورة في المواصفات

الأقسام الرئيسية التي تعرفها:
- QCS Section 01: متطلبات عامة وإدارة المشروع
- QCS Section 05: الخرسانة والأعمال الإنشائية
- QCS Section 06: الطرق والأسفلت
- QCS Section 08: المرافق والخدمات تحت الأرض
- QCS Section 09: الصرف الصحي وأنظمة الصرف
- QCS Section 15: الأعمال الميكانيكية

أمثلة على ردود صحيحة:
- "وفقاً لـ QCS Section 05, البند 5.3.2، الغطاء الخرساني للأساسات لا يقل عن 75 مم"
- "وفقاً لـ QCS Section 06, البند 6.4.1، نسبة الدمك للـ Subbase لا تقل عن 98% من الكثافة الجافة القصوى"`;

// ── Handler ──────────────────────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).set(CORS_HEADERS).end();
  }

  if (req.method !== 'POST') {
    return respond(res, 405, {
      error: 'الطريقة غير مسموح بها',
      code: 'METHOD_NOT_ALLOWED',
    });
  }

  // ── Environment checks ───────────────────────────────────────────────────
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) {
    return respond(res, 503, {
      error: 'خدمة الذكاء الاصطناعي غير متاحة حالياً',
      code: 'AI_UNAVAILABLE',
    });
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

  // ── Parse request ────────────────────────────────────────────────────────
  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return respond(res, 400, { error: 'طلب غير صالح', code: 'INVALID_JSON' });
  }

  const { question, userToken } = body || {};
  if (!question || typeof question !== 'string' || question.trim().length < 3) {
    return respond(res, 400, {
      error: 'يرجى إدخال سؤال صحيح',
      code: 'INVALID_QUESTION',
    });
  }

  // ── Check user tier (Pro vs Free) ────────────────────────────────────────
  let isPro = false;
  if (userToken && supabase) {
    const { data: user } = await supabase
      .from('users')
      .select('is_pro, is_active')
      .eq('token', userToken)
      .single();
    isPro = user?.is_pro === true && user?.is_active === true;
  }

  // ── Rate limiting ────────────────────────────────────────────────────────
  const ip = getClientIP(req);
  if (supabase) {
    const { allowed, count, limit } = await checkAndIncrementRate(supabase, ip, isPro);
    if (!allowed) {
      return respond(res, 429, {
        error: `لقد تجاوزت الحد الشهري (${limit} سؤال). يرجى الترقية للحساب المميز`,
        code: 'RATE_LIMIT_EXCEEDED',
        count,
        limit,
        isPro,
      });
    }
  }

  // ── Call Anthropic API ───────────────────────────────────────────────────
  try {
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: question.trim(),
          },
        ],
      }),
    });

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text();
      console.error('Anthropic API error:', anthropicRes.status, errText);
      return respond(res, 502, {
        error: 'خطأ في الاتصال بخدمة الذكاء الاصطناعي',
        code: 'AI_API_ERROR',
      });
    }

    const data = await anthropicRes.json();
    const answer = data.content?.[0]?.text || '';

    if (!answer) {
      return respond(res, 502, {
        error: 'لم يتم الحصول على إجابة من الذكاء الاصطناعي',
        code: 'EMPTY_RESPONSE',
      });
    }

    return respond(res, 200, {
      success: true,
      answer,
      model: data.model,
      tokens: {
        input: data.usage?.input_tokens,
        output: data.usage?.output_tokens,
      },
    });
  } catch (err) {
    console.error('Handler error:', err.message);
    return respond(res, 500, {
      error: 'خطأ داخلي في الخادم',
      code: 'INTERNAL_ERROR',
    });
  }
};
