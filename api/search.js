export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const geminiKey = process.env.GEMINI_KEY;
  if (!geminiKey) return res.status(500).json({ error: 'Server key not configured' });

  const { query, partNum } = req.body || {};
  if (!query) return res.status(400).json({ error: 'Missing query' });

  try {
    const pdfUrl = `https://ds8ubkfeifm6jjwv.public.blob.vercel-storage.com/QCS%202024%20Full%20_Part${partNum || 1}.pdf`;
    const pdfRes = await fetch(pdfUrl);
    if (!pdfRes.ok) return res.status(404).json({ error: `QCS Part ${partNum} not found` });

    const buffer = await pdfRes.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let bin = '';
    for (let i = 0; i < bytes.length; i += 8192) {
      bin += String.fromCharCode(...bytes.slice(i, i + 8192));
    }
    const b64 = btoa(bin);

    const aiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: `أنت مهندس متخصص في المواصفات القطرية QCS 2024. أجب من محتوى الـ PDF المقدم فقط. اذكر رقم الصفحة والقسم. اذكر الأرقام والمعايير بدقة. أجب بالعربية بأسلوب مهني. السؤال: ${query}` },
              { inline_data: { mime_type: 'application/pdf', data: b64 } }
            ]
          }],
          generationConfig: { maxOutputTokens: 2000, temperature: 0.1 }
        })
      }
    );

    if (!aiRes.ok) {
      const e = await aiRes.json().catch(() => ({}));
      return res.status(aiRes.status).json({ error: e.error?.message || 'Gemini error' });
    }

    const data = await aiRes.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || 'لم أجد إجابة.';
    return res.status(200).json({ answer, partNum });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
