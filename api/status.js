// QatarSpec Pro — /api/status (read-only health check)
export default async function handler(req, res) {
  const geminiKey = process.env.GEMINI_KEY || '';
  const anthropicKey = process.env.ANTHROPIC_API_KEY || '';
  const jwtSecret = process.env.JWT_SECRET || '';

  // Quick Gemini test
  let geminiStatus = '❌ غير متاح';
  if (geminiKey) {
    try {
      const r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'Reply with the single word: WORKING' }] }],
            generationConfig: { maxOutputTokens: 10 }
          })
        }
      );
      const d = await r.json();
      const txt = d?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      geminiStatus = r.ok && txt ? `✅ يعمل (${txt.trim().slice(0,20)})` : `❌ HTTP ${r.status}: ${d?.error?.message||''}`;
    } catch(e) {
      geminiStatus = `❌ ${e.message}`;
    }
  }

  const html = `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head><meta charset="UTF-8"><title>QatarSpec Status</title>
<style>
body{font-family:Arial,sans-serif;background:#111;color:#eee;padding:30px;direction:rtl}
h1{color:#C9A84C}
.item{background:#222;border-radius:8px;padding:12px 16px;margin:8px 0;font-size:15px}
.ok{border-right:4px solid #2ecc71}
.fail{border-right:4px solid #e74c3c}
.warn{border-right:4px solid #f39c12}
a{color:#C9A84C;text-decoration:none}
</style></head>
<body>
<h1>🏗️ QatarSpec Pro — حالة النظام</h1>
<div class="item ${geminiKey ? 'ok' : 'fail'}">🔑 GEMINI_KEY: ${geminiKey ? `✅ موجود (${geminiKey.length} حرف)` : '❌ غير موجود'}</div>
<div class="item ${anthropicKey ? 'ok' : 'warn'}">🔑 ANTHROPIC_API_KEY: ${anthropicKey ? '✅ موجود' : '⚠️ غير موجود (اختياري)'}</div>
<div class="item ${jwtSecret ? 'ok' : 'warn'}">🔑 JWT_SECRET: ${jwtSecret ? '✅ موجود' : '⚠️ غير موجود'}</div>
<div class="item ${geminiStatus.startsWith('✅') ? 'ok' : 'fail'}">🤖 اختبار Gemini AI: ${geminiStatus}</div>
<div class="item ok">🌐 الموقع: <a href="/">qatar-standers.vercel.app</a></div>
<div class="item ok">📅 وقت الفحص: ${new Date().toISOString()}</div>
</body></html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).send(html);
}
