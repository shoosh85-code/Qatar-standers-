// api/ai-proxy.js  v3.0 — Gemini backend · Anthropic-format interface
// ✅ يستخدم GEMINI_KEY الموجود | لا يحتاج ANTHROPIC_API_KEY

const MODEL_MAP = {
  'claude-haiku-4-5-20251001': 'gemini-2.0-flash',
  'claude-sonnet-4-20250514':  'gemini-2.0-flash',
  'claude-opus-4-6':           'gemini-2.0-flash',
  'claude-haiku-3-5':          'gemini-2.0-flash',
};

export default async function handler(req, res) {
  // ── CORS ──
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Api-Key');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { model, messages, max_tokens = 800, system } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array required' });
    }

    // ── اختيار المفتاح: الـ server أولاً ثم مفتاح المستخدم ──
    const apiKey =
      process.env.GEMINI_KEY ||
      (req.headers['x-api-key'] || '').trim();

    if (!apiKey) {
      return res.status(500).json({
        error: { message: 'لم يتم تهيئة مفتاح API على السيرفر — تواصل مع المشرف' },
      });
    }

    // ── تحويل Anthropic messages → Gemini contents ──
    const geminiContents = messages
      .filter(m => m.role !== 'system')          // system يُعالَج منفصلاً
      .map(msg => {
        const role  = msg.role === 'assistant' ? 'model' : 'user';
        const parts = buildParts(msg.content);
        return { role, parts };
      });

    // ── system prompt ──
    const systemText = system || extractSystemFromMessages(messages);

    const geminiModel = MODEL_MAP[model] || 'gemini-2.0-flash';

    const geminiBody = {
      contents: geminiContents,
      generationConfig: {
        maxOutputTokens: Math.min(Number(max_tokens) || 800, 2048),
        temperature: 0.7,
      },
    };

    if (systemText) {
      geminiBody.systemInstruction = { parts: [{ text: systemText }] };
    }

    // ── استدعاء Gemini ──
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${apiKey}`;

    const geminiRes = await fetch(endpoint, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(geminiBody),
    });

    const geminiData = await geminiRes.json();

    if (!geminiRes.ok) {
      const msg = geminiData?.error?.message || `Gemini ${geminiRes.status}`;
      console.error('[ai-proxy] Gemini error:', msg);
      return res.status(502).json({ error: { message: msg } });
    }

    const text =
      geminiData?.candidates?.[0]?.content?.parts
        ?.map(p => p.text || '')
        .join('') || 'لم أتمكن من إيجاد إجابة.';

    // ── رد بـ Anthropic format ──
    return res.status(200).json({
      id:      `msg_gem_${Date.now()}`,
      type:    'message',
      role:    'assistant',
      model:   geminiModel,
      content: [{ type: 'text', text }],
      stop_reason: 'end_turn',
      usage: { input_tokens: 0, output_tokens: 0 },
    });

  } catch (err) {
    console.error('[ai-proxy] Unexpected error:', err.message);
    return res.status(500).json({ error: { message: err.message || 'خطأ داخلي' } });
  }
}

// ── دوال مساعدة ──

function buildParts(content) {
  if (typeof content === 'string') {
    return [{ text: content }];
  }
  if (Array.isArray(content)) {
    return content.map(block => {
      if (block.type === 'text') {
        return { text: block.text || '' };
      }
      if (block.type === 'image' && block.source?.type === 'base64') {
        return {
          inline_data: {
            mime_type: block.source.media_type || 'image/jpeg',
            data:      block.source.data || '',
          },
        };
      }
      return { text: '' };
    }).filter(p => p.text !== '' || p.inline_data);
  }
  return [{ text: String(content) }];
}

function extractSystemFromMessages(messages) {
  const sys = messages.find(m => m.role === 'system');
  if (!sys) return '';
  return typeof sys.content === 'string'
    ? sys.content
    : sys.content?.map(b => b.text || '').join('') || '';
}
