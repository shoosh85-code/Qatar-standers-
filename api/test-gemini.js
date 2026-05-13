// api/test-gemini.js — اختبار + قائمة النماذج المتاحة
export const config = { runtime: 'edge' };

export default async function handler(req) {
  const CORS = { 'Access-Control-Allow-Origin': '*' };
  const key = process.env.GEMINI_API_KEY;
  if (!key) return Response.json({ error: 'GEMINI_API_KEY غير موجود' }, { headers: CORS });

  const keyPreview = key.slice(0, 8) + '...' + key.slice(-4);

  // 1. قائمة النماذج المتاحة فعلاً لهذا الـ key
  let availableModels = [];
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await r.json();
    availableModels = (data.models || [])
      .filter(m => (m.supportedGenerationMethods || []).includes('generateContent'))
      .map(m => m.name.replace('models/', ''));
  } catch(e) {
    availableModels = [`error: ${e.message}`];
  }

  // 2. اختبر أول نموذج generateContent متاح
  let testResult = 'لا يوجد نموذج للاختبار';
  if (availableModels.length && !availableModels[0].startsWith('error')) {
    const model = availableModels[0];
    try {
      const r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: 'say: OK' }] }] }) }
      );
      const data = await r.json();
      if (!r.ok) {
        testResult = `❌ ${r.status}: ${data?.error?.message?.slice(0, 120)}`;
      } else {
        const parts = data?.candidates?.[0]?.content?.parts || [];
        const text = parts.filter(p => !p.thought).map(p => p.text).join('').trim() || parts[0]?.text || '';
        testResult = text ? `✅ ${model}: "${text.slice(0, 60)}"` : `⚠️ empty — finishReason: ${data?.candidates?.[0]?.finishReason}`;
      }
    } catch(e) { testResult = `💥 ${e.message}`; }
  }

  return Response.json({ keyPreview, availableModels, testResult }, { headers: CORS });
}
