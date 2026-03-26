
// api/search.js - Gemini 1.5 Pro - دقة عالية في قراءة QCS 2024
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Try Gemini first, fallback to Cloudflare
  const geminiKey = process.env.GEMINI_KEY;
  const cfAccountId = process.env.CF_ACCOUNT_ID;
  const cfToken = process.env.CF_TOKEN;

  const { query, partNum } = req.body || {};
  if (!query) return res.status(400).json({ error: 'Missing query' });

  const pdfUrl = `https://ds8ubkfeifm6jjwv.public.blob.vercel-storage.com/QCS%202024%20Full%20_Part${partNum || 1}.pdf`;

  try {
    const pdfRes = await fetch(pdfUrl);
    if (!pdfRes.ok) return res.status(404).json({ error: `QCS Part ${partNum} not found` });
    const buffer = await pdfRes.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let bin = '';
    for (let i = 0; i < bytes.length; i += 8192) {
      bin += String.fromCharCode(...bytes.slice(i, i + 8192));
    }
    const b64 = btoa(bin);

    const systemPrompt = `أنت مهندس متخصص ومراجع جودة خبير في المواصفات القطرية QCS 2024.
قواعد الإجابة:
1. استخرج المعلومات من الـ PDF المقدم فقط — لا تخمن
2. اذكر رقم القسم والصفحة والجدول بدقة
3. اذكر الأرقام والنسب والمعايير كما هي في النص بدون تعديل
4. إذا لم تجد المعلومة في هذا الـ Part قل: "المعلومة ليست في Part ${partNum}"
5. أجب بالعربية بأسلوب مهني ومختصر
6. للجداول: اذكر عنوان الجدول ورقمه`;

    // Try Gemini 1.5 Pro first (most accurate for PDF)
    if (geminiKey) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [
                  { text: `${systemPrompt}\n\nالسؤال: ${query}` },
                  { inline_data: { mime_type: 'application/pdf', data: b64 } }
                ]
              }],
              generationConfig: { maxOutputTokens: 2000, temperature: 0.1 }
            })
          }
        );
        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (answer) {
            return res.status(200).json({ answer, partNum, model: 'Gemini 1.5 Pro' });
          }
        }
      } catch (e) {
        console.log('Gemini failed, trying Cloudflare:', e.message);
      }
    }

    // Fallback: Cloudflare Workers AI
    if (cfAccountId && cfToken) {
      const aiRes = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/ai/run/@cf/meta/llama-3.1-8b-instruct`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${cfToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: `السؤال: ${query}\n\nمحتوى QCS Part ${partNum}: ${b64.slice(0, 8000)}` }
            ],
            max_tokens: 1500,
            temperature: 0.1
          })
        }
      );
      if (aiRes.ok) {
        const data = await aiRes.json();
        const answer = data.result?.response || 'لم أجد إجابة.';
        return res.status(200).json({ answer, partNum, model: 'Cloudflare Llama' });
      }
    }

    return res.status(500).json({ error: 'AI services unavailable' });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
