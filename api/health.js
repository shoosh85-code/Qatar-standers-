// QatarSpec Pro — /api/health — extended status check
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const geminiKey    = process.env.GEMINI_KEY || '';
  const anthropicKey = process.env.ANTHROPIC_API_KEY || '';
  const jwtSecret    = process.env.JWT_SECRET || '';

  // List available Gemini models + test the first working one
  let geminiOk = false, geminiMsg = 'not tested', availableModels = [];
  if (geminiKey) {
    try {
      // First: get list of available models
      const listR = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${geminiKey}`,
        { signal: AbortSignal.timeout(8000) }
      );
      const listD = await listR.json();
      if (listR.ok && listD.models) {
        availableModels = listD.models
          .filter(m => m.supportedGenerationMethods?.includes('generateContent'))
          .map(m => m.name.replace('models/', ''))
          .filter(n => n.includes('gemini'));
      }
    } catch(e) {}

    // Try each available model
    const toTry = availableModels.length > 0 ? availableModels.slice(0,5) :
      ['gemini-1.5-flash', 'gemini-pro', 'gemini-1.0-pro'];

    for (const model of toTry) {
      try {
        const r = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: 'Say WORKING' }] }],
              generationConfig: { maxOutputTokens: 5 }
            }),
            signal: AbortSignal.timeout(8000)
          }
        );
        const d = await r.json();
        const txt = d?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        if (r.ok && txt) { geminiOk = true; geminiMsg = model + ': ' + txt.trim(); break; }
        geminiMsg = model + ' → ' + (d?.error?.message || 'HTTP '+r.status);
      } catch(e) { geminiMsg = model + ' error: ' + e.message; }
    }
  }

  const html = `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>QatarSpec Status</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Tajawal,Arial,sans-serif;background:#0A0A0A;color:#EDE8DC;padding:24px;direction:rtl}
h1{color:#C9A84C;font-size:20px;margin-bottom:16px}
.card{background:#181818;border-radius:10px;padding:14px 16px;margin:8px 0;font-size:14px;display:flex;align-items:center;gap:10px;border-right:4px solid #333}
.ok{border-color:#2ecc71}.fail{border-color:#e74c3c}.warn{border-color:#f39c12}
.label{color:#B0A898;min-width:160px}.val{color:#EDE8DC;font-weight:600}
a{color:#C9A84C}
</style></head>
<body>
<h1>🏗️ QatarSpec Pro — حالة النظام v2.4.1</h1>

<div class="card ${geminiKey ? 'ok':'fail'}">
  <span class="label">🔑 GEMINI_KEY</span>
  <span class="val">${geminiKey ? `✅ موجود (${geminiKey.length} حرف)` : '❌ غير موجود'}</span>
</div>

<div class="card ${anthropicKey ? 'ok':'warn'}">
  <span class="label">🔑 ANTHROPIC_API_KEY</span>
  <span class="val">${anthropicKey ? '✅ موجود' : '⚠️ غير موجود (اختياري)'}</span>
</div>

<div class="card ${jwtSecret ? 'ok':'warn'}">
  <span class="label">🔑 JWT_SECRET</span>
  <span class="val">${jwtSecret ? '✅ موجود' : '⚠️ غير موجود'}</span>
</div>

<div class="card ${geminiOk ? 'ok':'fail'}">
  <span class="label">🤖 Gemini AI اختبار</span>
  <span class="val">${geminiOk ? `✅ يعمل: ${geminiMsg}` : `❌ فشل: ${geminiMsg}`}</span>
</div>
<div class="card ok">
  <span class="label">📋 موديلات متاحة</span>
  <span class="val" style="font-size:11px">${availableModels.slice(0,8).join(', ') || 'لم يتم جلبها'}</span>
</div>

<div class="card ok">
  <span class="label">📅 وقت الفحص</span>
  <span class="val">${new Date().toLocaleString('ar-QA')}</span>
</div>

<div class="card ok" style="margin-top:16px">
  <span class="label">🌐 الموقع</span>
  <span class="val"><a href="/">qatar-standers.vercel.app</a></span>
</div>
</body></html>`;

  res.status(200).send(html);
}
