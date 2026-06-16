// api/blueprint.js — QatarSpec Pro Blueprint QTO Analyzer
// Edge Runtime: 30s timeout (vs 10s for serverless)
export const config = { runtime: 'edge' };

const CORS = {
  'Access-Control-Allow-Origin': 'https://qatar-standers.vercel.app',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

export default async function handler(req) {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405);

  const GEMINI_KEY = process.env.GEMINI_API_KEY;
  // debug version: v3
  if (!GEMINI_KEY) return json({ error: 'GEMINI_API_KEY غير مُعيَّن' }, 500);

  let body;
  try { body = await req.json(); } catch { return json({ error: 'JSON غير صالح' }, 400); }

  const { fileBase64, mimeType, drawingType, filename } = body;
  if (!fileBase64 || !mimeType) return json({ error: 'fileBase64 و mimeType مطلوبان' }, 400);

  const ALLOWED = ['image/jpeg','image/png','image/webp','image/tiff','application/pdf'];
  if (!ALLOWED.includes(mimeType)) return json({ error: 'نوع غير مدعوم — PDF, JPG, PNG, WEBP' }, 400);

  if (fileBase64.length > 14 * 1024 * 1024) return json({ error: 'الملف كبير — الحد 10MB' }, 400);

  const typeHints = {
    architectural: 'معماري — احسب: مساحات الغرف، محيط المبنى، فتحات النوافذ والأبواب، التشطيبات (بلاط، بلاستر، دهان)',
    structural:    'إنشائي — احسب: مقاطع الأعمدة والجسور والبلاطات، كميات الخرسانة والحديد، الأساسات',
    plumbing:      'صحي — احسب: أطوال المواسير لكل قطر، وصلات ومحابس وأدوات صحية',
    mechanical:    'ميكانيكي HVAC — احسب: مجاري الهواء، وحدات التكييف، الفوهات',
    electrical:    'كهربائي — احسب: أطوال الكابلات، لوحات التوزيع، المقابس والإنارة',
    civil:         'مدني — احسب: الحفر والردم، الخرسانة، الرصف',
    auto:          'اكتشف نوع المخطط تلقائياً ثم احسب جميع الكميات',
  };
  const hint = typeHints[drawingType] || typeHints.auto;

  const prompt = `أنت خبير هندسي متخصص في حساب الكميات (QTO) وفق QCS 2024 وأشغال قطر.
نوع المخطط: ${hint}

تعليمات صارمة:
1. اقرأ المقياس من المخطط وأذكره صراحةً
2. احسب الكميات بالوحدات الصحيحة (م، م²، م³، عدد، طن)
3. إذا لم تستطع قراءة قيمة اكتب "غير واضح" ولا تخترع أرقاماً
4. اذكر مرجع QCS 2024 لكل بند
5. رتب في جدول: البند | الوصف | الكمية | الوحدة | مرجع QCS
6. أضف في النهاية تحذير: "⚠️ كميات تقديرية — يجب مراجعة مهندس مختص"

حلل المخطط الآن:`;

  const models = ['gemini-3.5-flash', 'gemini-2.0-flash', 'gemini-2.0-flash-lite'];


  // ── Retry helper للـ 429 ──────────────────────────────────────────
  async function callGemini(model, body, retries=2) {
    for (let i=0; i<=retries; i++) {
      try {
        const r = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_KEY}`,
          { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) }
        );
        if (r.status === 429 && i < retries) {
          await new Promise(res => setTimeout(res, (i+1) * 2000));
          continue;
        }
        return r;
      } catch(e) { if (i === retries) throw e; }
    }
  }

  const errors = [];
  for (const model of models) {
    try {
      const r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [
              { inline_data: { mime_type: mimeType, data: fileBase64 } },
              { text: prompt }
            ]}],
            generationConfig: { temperature: 0.1, maxOutputTokens: 2048 }
          })
        }
      );
      const data = await r.json();
      if (!r.ok) { errors.push(`${model}: HTTP ${r.status} — ${JSON.stringify(data).slice(0,200)}`); continue; }
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) { errors.push(`${model}: empty response`); continue; }

      return json({
        success: true,
        analysis: text,
        filename: filename || 'مخطط',
        drawingType: drawingType || 'auto',
        disclaimer: '⚠️ كميات تقديرية بناءً على تحليل AI — يجب مراجعة مهندس مختص قبل التوريد أو التسعير.',
      });
    } catch(e) { errors.push(`${model}: ${e.message}`); continue; }
  }

  return json({ error: 'فشل التحليل — حاول مرة أخرى', details: errors, v: 'v3', key_set: !!GEMINI_KEY }, 502);
}
