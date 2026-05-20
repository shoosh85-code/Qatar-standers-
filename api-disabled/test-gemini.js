// api/test-gemini.js — اختبار النماذج بترتيب الأولوية
export const config = { runtime: 'edge' };

export default async function handler(req) {
  // ── حماية: test endpoints للـ dev فقط ──────────────────────────
  const testSecret = process.env.TEST_SECRET;
  const providedSecret = new URL(req.url).searchParams.get('secret');
  if (!testSecret || providedSecret !== testSecret) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), 
      { status: 403, headers: { 'Content-Type': 'application/json' } });
  }

  const CORS = { 'Access-Control-Allow-Origin': '*' };
  const key = process.env.GEMINI_API_KEY;
  if (!key) return Response.json({ error: 'GEMINI_API_KEY غير موجود' }, { headers: CORS });

  const keyPreview = key.slice(0, 8) + '...' + key.slice(-4);

  // نماذج بالترتيب — lite أولاً لأن quota أعلى
  const MODELS = [
    'gemini-2.0-flash-lite',
    'gemini-2.5-flash-lite',
    'gemini-flash-lite-latest',
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-flash-latest',
  ];

  const results = {};
  for (const model of MODELS) {
    try {
      const r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: 'say: OK' }] }] }) }
      );
      const data = await r.json();
      if (!r.ok) {
        const msg = data?.error?.message || '';
        const short = msg.includes('quota') ? `❌ 429 quota` : `❌ ${r.status}: ${msg.slice(0,80)}`;
        results[model] = short;
      } else {
        const parts = data?.candidates?.[0]?.content?.parts || [];
        const text = parts.filter(p => !p.thought).map(p => p.text).join('').trim() || parts[0]?.text || '';
        results[model] = text ? `✅ "${text.slice(0,50)}"` : `⚠️ empty (${data?.candidates?.[0]?.finishReason})`;
      }
    } catch(e) { results[model] = `💥 ${e.message}`; }
  }

  return Response.json({ keyPreview, results }, { headers: CORS });
}
