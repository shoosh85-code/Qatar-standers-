// ملف اختبار مؤقت — احذفه بعد التأكد من عمل الـ API
module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  const GEMINI_KEY = process.env.GEMINI_KEY;

  if (!GEMINI_KEY) {
    return res.send(`<h2 style="color:red">❌ GEMINI_KEY غير موجود في Vercel Environment Variables</h2>`);
  }

  const keyPreview = GEMINI_KEY.slice(0, 6) + '...' + GEMINI_KEY.slice(-4);

  const models = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-flash-8b'];
  let html = `<h2>🔑 GEMINI_KEY موجود: <code>${keyPreview}</code></h2><hr>`;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_KEY}`;
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: 'say: WORKING' }] }],
          generationConfig: { maxOutputTokens: 20 }
        })
      });

      const data = await r.json();

      if (r.ok) {
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '(empty)';
        html += `<p>✅ <b>${model}</b>: ${text}</p>`;
      } else {
        const errMsg = data?.error?.message || JSON.stringify(data).slice(0, 200);
        html += `<p>❌ <b>${model}</b> HTTP ${r.status}: ${errMsg}</p>`;
      }
    } catch (err) {
      html += `<p>❌ <b>${model}</b> Network error: ${err.message}</p>`;
    }
  }

  res.send(`<!DOCTYPE html><html><body style="font-family:sans-serif;padding:30px;direction:rtl">${html}<hr><p style="color:gray;font-size:12px">احذف هذا الملف بعد الانتهاء من الاختبار</p></body></html>`);
};
