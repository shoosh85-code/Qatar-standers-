// api/ai-proxy.js  v5.0 — OpenRouter primary · Gemini fallback · Anthropic-format interface
// ✅ OPENROUTER_API_KEY  (openrouter.ai — نماذج مجانية)
// ✅ GEMINI_KEY          (احتياطي)

const OR_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';
const OR_MODEL    = 'meta-llama/llama-3.3-70b-instruct:free';  // مجاني 100%

const GEMINI_MODEL    = 'gemini-2.0-flash';
const GEMINI_ENDPOINT = (key) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${key}`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Api-Key');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { messages, max_tokens = 800, system } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array required' });
    }

    const orKey     = process.env.OPENROUTER_API_KEY || '';
    const geminiKey = process.env.GEMINI_KEY         || '';
    const userKey   = (req.headers['x-api-key'] || '').trim();

    // ── OpenRouter أولاً ──
    if (orKey) {
      try {
        const result = await callOpenRouter(orKey, messages, system, max_tokens);
        return res.status(200).json(result);
      } catch (err) {
        console.warn('[ai-proxy] OpenRouter failed, trying Gemini:', err.message);
      }
    }

    // ── Gemini احتياطي ──
    const gKey = geminiKey || userKey;
    if (gKey) {
      try {
        const result = await callGemini(gKey, messages, system, max_tokens);
        return res.status(200).json(result);
      } catch (err) {
        console.error('[ai-proxy] Gemini failed:', err.message);
        return res.status(502).json({ error: { message: err.message } });
      }
    }

    return res.status(500).json({
      error: { message: 'لم يتم تهيئة مفتاح API — أضف OPENROUTER_API_KEY في Vercel' },
    });

  } catch (err) {
    console.error('[ai-proxy] error:', err.message);
    return res.status(500).json({ error: { message: err.message || 'خطأ داخلي' } });
  }
}

// ══════════════════════════════════
//  OpenRouter — OpenAI-compatible
// ══════════════════════════════════
async function callOpenRouter(apiKey, messages, system, max_tokens) {
  const builtMessages = [];

  if (system) builtMessages.push({ role: 'system', content: system });

  for (const msg of messages) {
    if (msg.role === 'system') continue;

    let content;
    if (typeof msg.content === 'string') {
      content = msg.content;
    } else if (Array.isArray(msg.content)) {
      // نموذج مجاني — نصوص فقط
      content = msg.content
        .filter(b => b.type === 'text')
        .map(b => b.text)
        .join('\n');
    } else {
      content = String(msg.content);
    }

    builtMessages.push({ role: msg.role, content });
  }

  const r = await fetch(OR_ENDPOINT, {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer':  'https://qatar-standers.vercel.app',
      'X-Title':       'Qatar Standers',
    },
    body: JSON.stringify({
      model:      OR_MODEL,
      messages:   builtMessages,
      max_tokens: Math.min(Number(max_tokens) || 800, 4096),
      temperature: 0.7,
    }),
  });

  const data = await r.json();
  if (!r.ok) throw new Error(data?.error?.message || `OpenRouter error ${r.status}`);

  const text = data.choices?.[0]?.message?.content || 'لم أتمكن من إيجاد إجابة.';

  return {
    id:          `msg_or_${Date.now()}`,
    type:        'message',
    role:        'assistant',
    model:       OR_MODEL,
    content:     [{ type: 'text', text }],
    stop_reason: 'end_turn',
    usage:       { input_tokens: 0, output_tokens: 0 },
  };
}

// ══════════════════════
//  Gemini — احتياطي
// ══════════════════════
async function callGemini(apiKey, messages, system, max_tokens) {
  const contents = messages
    .filter(m => m.role !== 'system')
    .map(msg => ({
      role:  msg.role === 'assistant' ? 'model' : 'user',
      parts: typeof msg.content === 'string'
        ? [{ text: msg.content }]
        : Array.isArray(msg.content)
          ? msg.content.map(b =>
              b.type === 'text'
                ? { text: b.text }
                : { inline_data: { mime_type: b.source?.media_type || 'image/jpeg', data: b.source?.data || '' } }
            )
          : [{ text: String(msg.content) }],
    }));

  const body = {
    contents,
    generationConfig: { maxOutputTokens: Math.min(Number(max_tokens) || 800, 2048) },
  };
  if (system) body.systemInstruction = { parts: [{ text: system }] };

  const r    = await fetch(GEMINI_ENDPOINT(apiKey), {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data?.error?.message || `Gemini error ${r.status}`);

  const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('') || 'لم أتمكن من إيجاد إجابة.';

  return {
    id:          `msg_gem_${Date.now()}`,
    type:        'message',
    role:        'assistant',
    model:       GEMINI_MODEL,
    content:     [{ type: 'text', text }],
    stop_reason: 'end_turn',
    usage:       { input_tokens: 0, output_tokens: 0 },
  };
}
