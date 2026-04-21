// QatarSpec Pro — /api/ai-proxy.js
// Priority: 1) ANTHROPIC_API_KEY → 2) GEMINI_KEY (free) → 3) User X-Api-Key header
export const config = { runtime: 'edge' };

const ALLOWED_ORIGINS = [
  'https://qatar-standers.vercel.app',
  'https://qatarspec.vercel.app',
  'https://qatar-standers-shoosh85-3851s-projects.vercel.app',
];

const cors = (origin) => ({
  'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Api-Key',
  'Content-Type': 'application/json',
});

const QCS_SYSTEM = `أنت خبير متخصص في QCS 2024 (Qatar Construction Specifications) ومواصفات البناء والبنية التحتية القطرية.
قواعد الإجابة:
- استشهد بالبند والجدول الدقيق فقط إذا كنت متأكداً 100%.
- إذا لم تكن متأكداً: قل "يُرجى مراجعة QCS مباشرة للتأكد".
- لا تخترع أرقام بنود أو جداول.
في نهاية كل إجابة أضف: [مستوى الثقة: موثوق | للمراجعة | استشر المرجع الأصلي]`;

export default async function handler(request) {
  const origin = request.headers.get('origin') || '';
  const headers = cors(origin);

  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: { message: 'Method not allowed' } }), { status: 405, headers });
  }

  // ── Pro JWT (optional) ──
  let isPro = false;
  const proToken = (request.headers.get('Authorization') || '').replace('Bearer ', '');
  const jwtSecret = process.env.JWT_SECRET;
  if (proToken && jwtSecret) {
    try { const p = await verifyJWT(proToken, jwtSecret); isPro = p.pro && p.exp > Date.now()/1000; } catch(_) {}
  }

  const body = await request.json().catch(() => null);
  if (!body) return new Response(JSON.stringify({ error: { message: 'Invalid JSON' } }), { status: 400, headers });

  const maxTokens = isPro ? (body.max_tokens || 1500) : Math.min(body.max_tokens || 800, 800);
  const messages  = body.messages || [];
  const systemPrompt = body.system || QCS_SYSTEM;

  // ── Option 1: Anthropic (server key) ──
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (anthropicKey) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': anthropicKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: body.model || 'claude-haiku-4-5-20251001', max_tokens: maxTokens, system: systemPrompt, messages }),
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: res.status, headers });
  }

  // ── Option 2: Gemini (free server key) ──
  const geminiKey = process.env.GEMINI_KEY;
  if (geminiKey) {
    const userMsg = messages.map(m => {
      const c = m.content;
      return Array.isArray(c) ? c.map(x => x.text || '').join('') : (c || '');
    }).join('\n');

    const fullPrompt = systemPrompt + '\n\nالسؤال: ' + userMsg;

    // Try gemini-1.5-flash first, fallback to gemini-pro
    const models = ['gemini-1.5-flash', 'gemini-1.5-flash-latest', 'gemini-pro'];
    let geminiText = null;
    let geminiError = null;

    for (const model of models) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: fullPrompt }] }],
              generationConfig: { maxOutputTokens: maxTokens, temperature: 0.3 },
            }),
          }
        );
        const data = await res.json();
        console.log('Gemini', model, res.status, JSON.stringify(data).slice(0, 200));
        if (res.ok && data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          geminiText = data.candidates[0].content.parts[0].text;
          break;
        }
        geminiError = (data?.error?.message || `HTTP ${res.status}`) + ' [' + model + ']';
      } catch(e) {
        geminiError = e.message + ' [' + model + ']';
      }
    }

    if (geminiText) {
      return new Response(JSON.stringify({
        content: [{ type: 'text', text: geminiText }],
        model: 'gemini-1.5-flash',
        stop_reason: 'end_turn',
      }), { headers });
    }
    // Gemini failed — return the actual error, don't hide it
    return new Response(JSON.stringify({
      error: { message: 'خطأ في Gemini API: ' + (geminiError || 'unknown') }
    }), { status: 502, headers });
  }

  // ── Option 3: User key from header (Anthropic) ──
  const userKey = request.headers.get('X-Api-Key') || '';
  if (userKey && userKey.length > 20) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': userKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: body.model || 'claude-haiku-4-5-20251001', max_tokens: maxTokens, system: systemPrompt, messages }),
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: res.status, headers });
  }

  // ── No key available ──
  return new Response(JSON.stringify({
    error: { message: 'لا يوجد مفتاح API — تواصل مع مدير التطبيق' }
  }), { status: 401, headers });
}

async function verifyJWT(token, secret) {
  const [h, p, s] = token.split('.');
  if (!s) throw new Error('bad jwt');
  const pad = x => x.replace(/-/g,'+').replace(/_/g,'/').padEnd(x.length+(4-x.length%4)%4,'=');
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), {name:'HMAC',hash:'SHA-256'}, false, ['verify']);
  const sig = Uint8Array.from(atob(pad(s)), c => c.charCodeAt(0));
  const ok  = await crypto.subtle.verify('HMAC', key, sig, new TextEncoder().encode(`${h}.${p}`));
  if (!ok) throw new Error('bad sig');
  return JSON.parse(atob(pad(p)));
}
