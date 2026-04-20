// api/ai-proxy.js
const ALLOWED_ORIGIN = 'https://qatar-standers.vercel.app';
const MODEL = 'claude-sonnet-4-6';
const MAX_TOKENS = 1024;
const BODY_LIMIT = 50 * 1024;

const SYSTEM_PROMPT = `أنت مساعد هندسي متخصص في مواصفات البناء القطرية QCS 2024.
قواعد الإجابة:
1. أجب دائماً بالعربية ما لم يسأل المستخدم بالإنجليزية.
2. اذكر دائماً رقم القسم والبند من QCS — مثال: (QCS 2024 — Section 05, Clause 4.3.1).
3. إذا كان السؤال خارج نطاق QCS أو Ashghal أو KAHRAMAA أو MMUP أو QCDD، قل ذلك صراحةً.
4. لا تخترع أرقاماً أو مراجع — إذا لم تكن متأكداً قل "يُرجى مراجعة النسخة الرسمية".
5. الإجابة القصيرة المحددة أفضل من الإطالة.`;

function setCORS(req, res) {
  if (req.headers.origin === ALLOWED_ORIGIN) {
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function send(res, status, body) {
  res.status(status).json(body);
}

export default async function handler(req, res) {
  setCORS(req, res);

  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'POST')
    return send(res, 405, { error: 'الطريقة غير مسموح بها', code: 'METHOD_NOT_ALLOWED' });

  const cl = parseInt(req.headers['content-length'] || '0', 10);
  if (cl > BODY_LIMIT)
    return send(res, 413, { error: 'الطلب كبير جداً', code: 'PAYLOAD_TOO_LARGE' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || !apiKey.startsWith('sk-ant-')) {
    console.error('[ai-proxy] ANTHROPIC_API_KEY missing');
    return send(res, 503, {
      error: 'خدمة البحث الذكي ستكون متاحة قريباً. للاستفسار تواصل معنا عبر WhatsApp.',
      code: 'SERVICE_COMING_SOON',
    });
  }

  const { query, messages, pdfContent } = req.body || {};
  const userText = query || (Array.isArray(messages) ? messages.at(-1)?.content : '') || '';

  if (!userText || typeof userText !== 'string' || userText.trim().length < 2)
    return send(res, 400, { error: 'الرجاء إدخال سؤالك قبل البحث', code: 'INVALID_INPUT' });

  let content = userText.trim();
  if (pdfContent && typeof pdfContent === 'string')
    content = `محتوى الملف:\n"""\n${pdfContent.slice(0, 8000)}\n"""\n\nالسؤال: ${content}`;

  const msgs = Array.isArray(messages) && messages.length > 1
    ? messages.map(m => ({ role: m.role, content: m.content }))
    : [{ role: 'user', content }];

  let upstream;
  try {
    upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({ model: MODEL, max_tokens: MAX_TOKENS, system: SYSTEM_PROMPT, messages: msgs }),
    });
  } catch (e) {
    console.error('[ai-proxy] network error:', e.message);
    return send(res, 502, { error: 'تعذّر الاتصال بخدمة البحث. حاول مجدداً.', code: 'UPSTREAM_UNREACHABLE' });
  }

  if (!upstream.ok) {
    const s = upstream.status;
    console.error('[ai-proxy] Anthropic status:', s);
    if (s === 401) return send(res, 503, { error: 'خدمة البحث غير متاحة مؤقتاً.', code: 'SERVICE_UNAVAILABLE' });
    if (s === 429) return send(res, 503, { error: 'الخدمة مشغولة. حاول بعد لحظة.', code: 'UPSTREAM_BUSY' });
    return send(res, 502, { error: 'حدث خطأ في معالجة البحث. حاول مجدداً.', code: 'AI_ERROR' });
  }

  let data;
  try { data = await upstream.json(); }
  catch { return send(res, 502, { error: 'خطأ في قراءة الإجابة. حاول مجدداً.', code: 'PARSE_ERROR' }); }

  const answer = data?.content?.[0]?.text;
  if (!answer)
    return send(res, 502, { error: 'لم يتمكن النظام من توليد إجابة. حاول مجدداً.', code: 'EMPTY_RESPONSE' });

  return send(res, 200, {
    answer,
    model: data.model,
    inputTokens: data.usage?.input_tokens,
    outputTokens: data.usage?.output_tokens,
  });
}
