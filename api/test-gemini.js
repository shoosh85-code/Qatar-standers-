// api/test-gemini.js — اختبار سريع للـ Gemini API key
export const config = { runtime: 'edge' };

export default async function handler(req) {
  const CORS = { 'Access-Control-Allow-Origin': '*' };
  const key = process.env.GEMINI_API_KEY;
  
  if (!key) return Response.json({ error: 'GEMINI_API_KEY غير موجود في Vercel env vars' }, { headers: CORS });

  const keyPreview = key.slice(0, 6) + '...' + key.slice(-4);
  const results = {};

  const models = [
    { name: 'gemini-2.5-flash',         api: 'v1beta' },
    { name: 'gemini-2.0-flash',         api: 'v1beta' },
    { name: 'gemini-1.5-flash-latest',  api: 'v1'     },
    { name: 'gemini-1.5-flash',         api: 'v1'     },
  ];

  for (const { name: model, api: apiVer } of models) {
    try {
      const r = await fetch(
        `https://generativelanguage.googleapis.com/${apiVer}/models/${model}:generateContent?key=${key}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: 'say: OK' }] }] })
        }
      );
      const data = await r.json();
      if (!r.ok) {
        results[model] = `❌ ${r.status}: ${data?.error?.message || 'unknown'}`;
      } else {
        const parts = data?.candidates?.[0]?.content?.parts || [];
        const text = parts.filter(p => !p.thought).map(p => p.text).join('').trim() || parts[0]?.text || '';
        results[model] = text ? `✅ يعمل: "${text.slice(0, 40)}"` : `⚠️ empty — finishReason: ${data?.candidates?.[0]?.finishReason}`;
      }
    } catch (e) {
      results[model] = `💥 exception: ${e.message}`;
    }
  }

  return Response.json({ keyPreview, results }, { headers: CORS });
}
