// ═══════════════════════════════════════════════════════════════
//  QatarSpec Pro — ai-proxy.js  (Fixed v3.0 — April 2026)
//  Author fix: Claude Sonnet 4.6
//  Chain: Anthropic → OpenRouter (llama-3.3-70b free) → Gemini
//  Response format: always Anthropic-compatible {content:[{text}]}
// ═══════════════════════════════════════════════════════════════

const TIMEOUT_MS = 9000; // 9s — Vercel free plan Edge limit

// ── Working free models on OpenRouter (April 2026) ──────────────
const OR_FREE_MODELS = [
  'meta-llama/llama-3.3-70b-instruct:free',
  'google/gemma-3-27b-it:free',
  'deepseek/deepseek-chat-v3-0324:free',
];

// ── Map Claude model → equivalent capability tier ───────────────
function getOrModel(claudeModel = '') {
  if (claudeModel.includes('opus'))   return OR_FREE_MODELS[0];
  if (claudeModel.includes('haiku'))  return OR_FREE_MODELS[2];   // fast
  return OR_FREE_MODELS[0];                                        // sonnet → llama 70b
}

// ── Anthropic response shape ─────────────────────────────────────
function makeAnthropicResp(text) {
  return {
    id: 'proxy-' + Date.now(),
    type: 'message',
    role: 'assistant',
    content: [{ type: 'text', text }],
    model: 'proxy',
    stop_reason: 'end_turn',
    usage: { input_tokens: 0, output_tokens: 0 }
  };
}

// ── Fetch with timeout ───────────────────────────────────────────
async function fetchWithTimeout(url, options, ms = TIMEOUT_MS) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { ...options, signal: ctrl.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

// ── Provider 1: Anthropic ────────────────────────────────────────
async function tryAnthropic(body, anthropicKey) {
  if (!anthropicKey) throw new Error('no ANTHROPIC_API_KEY');

  const res = await fetchWithTimeout('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type':      'application/json',
      'x-api-key':         anthropicKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model:      body.model      || 'claude-haiku-4-5-20251001',
      max_tokens: body.max_tokens || 1024,
      messages:   body.messages,
      ...(body.system ? { system: body.system } : {}),
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`Anthropic ${res.status}: ${data?.error?.message || JSON.stringify(data)}`);
  }
  return data; // already Anthropic format
}

// ── Provider 2: OpenRouter ───────────────────────────────────────
async function tryOpenRouter(body, orKey) {
  if (!orKey) throw new Error('no OPENROUTER_API_KEY');

  const model = getOrModel(body.model);

  const res = await fetchWithTimeout('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${orKey}`,
      'HTTP-Referer':  'https://qatar-standers.vercel.app',
      'X-Title':       'QatarSpec Pro',
    },
    body: JSON.stringify({
      model,
      max_tokens: body.max_tokens || 1024,
      messages: body.messages.map(m => ({
        role: m.role,
        content: Array.isArray(m.content)
          ? m.content.map(c => c.text || '').join('\n')
          : m.content,
      })),
    }),
  });

  const data = await res.json();

  if (!res.ok || data.error) {
    const msg = data?.error?.message || JSON.stringify(data);
    throw new Error(`OpenRouter ${res.status} [${model}]: ${msg}`);
  }

  const text = data?.choices?.[0]?.message?.content || '';
  if (!text) throw new Error('OpenRouter returned empty content');

  return makeAnthropicResp(text);
}

// ── Provider 3: Gemini ───────────────────────────────────────────
async function tryGemini(body, geminiKey) {
  if (!geminiKey) throw new Error('no GEMINI_KEY');

  // Try models in order — gemini-2.0-flash is the current free default
  // Models confirmed working (April 2026)
  const MODELS = [
    'gemini-2.0-flash',       // fastest — less timeout risk
    'gemini-2.0-flash-lite',  // fallback fast
    'gemini-2.5-flash',       // slowest — last resort
  ];

  const systemText = body.system || 'أنت خبير في QCS 2024 والمواصفات القطرية. أجب بدقة مع ذكر المرجع.';

  const contents = body.messages
    .filter(m => m.role !== 'system')
    .map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: Array.isArray(m.content) ? m.content.map(c => c.text||'').join('') : (m.content||'') }]
    }));

  let lastError = '';
  for (const model of MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;
      const res = await fetchWithTimeout(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: systemText }] },
          generationConfig: { maxOutputTokens: 600, temperature: 0.3 },
        }),
      });

      const data = await res.json();
      console.log('[Gemini]', model, res.status, JSON.stringify(data).slice(0,200));
      if (!res.ok || data.error) {
        lastError = `Gemini ${model} ${res.status}: ${data?.error?.message || JSON.stringify(data).slice(0,100)}`;
        continue;
      }

      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      if (!text) { lastError = `Gemini ${model}: empty response`; continue; }

      return makeAnthropicResp(text);
    } catch(e) {
      lastError = `Gemini ${model}: ${e.message}`;
    }
  }
  throw new Error(lastError || 'Gemini: all models failed');
}

// ════════════════════════════════════════════════════════════════
//  Main Handler
// ════════════════════════════════════════════════════════════════
export default async function handler(req, res) {
  // ── CORS ──
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Api-Key');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = req.body || {};

    if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    // ── Keys from env ──
    const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY  || '';
    const OR_KEY        = process.env.OPENROUTER_API_KEY || '';
    const GEMINI_KEY    = process.env.GEMINI_API_KEY || process.env.GEMINI_KEY || process.env.GOOGLE_API_KEY || '';

    // ── User-supplied key fallback (from X-Api-Key header) ──
    const userKey = req.headers['x-api-key'] || '';
    const effectiveAnthropicKey = ANTHROPIC_KEY || (userKey.startsWith('sk-ant-') ? userKey : '');
    const effectiveOrKey        = OR_KEY        || (userKey.startsWith('sk-or-')  ? userKey : '');

    const errors = [];

    // ── 1. Try Anthropic ──
    if (effectiveAnthropicKey) {
      try {
        const result = await tryAnthropic(body, effectiveAnthropicKey);
        return res.status(200).json(result);
      } catch (e) {
        console.error('[ai-proxy] Anthropic failed:', e.message);
        errors.push('Anthropic: ' + e.message);
        // Only continue if it's not an auth error
        if (e.message.includes('401') || e.message.includes('invalid') || e.message.includes('Invalid')) {
          return res.status(401).json({ error: 'Invalid Anthropic API key', detail: e.message });
        }
      }
    } else {
      errors.push('Anthropic: no key configured');
    }

    // ── 2. Try OpenRouter ──
    if (effectiveOrKey) {
      try {
        const result = await tryOpenRouter(body, effectiveOrKey);
        return res.status(200).json(result);
      } catch (e) {
        console.error('[ai-proxy] OpenRouter failed:', e.message);
        errors.push('OpenRouter: ' + e.message);
      }
    } else {
      errors.push('OpenRouter: no key configured');
    }

    // ── 3. Try Gemini ──
    if (GEMINI_KEY) {
      try {
        const result = await tryGemini(body, GEMINI_KEY);
        return res.status(200).json(result);
      } catch (e) {
        console.error('[ai-proxy] Gemini failed:', e.message);
        errors.push('Gemini: ' + e.message);
      }
    } else {
      errors.push('Gemini: no key configured');
    }

    // ── All failed ──
    console.error('[ai-proxy] All providers failed:', errors);
    return res.status(502).json({
      error: 'جميع مزودي الذكاء الاصطناعي فشلوا',
      detail: errors.join(' | '),
    });

  } catch (err) {
    console.error('[ai-proxy] Fatal error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
