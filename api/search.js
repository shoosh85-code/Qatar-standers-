انسخ كل النص اللي جوا هذا الملف وحطه في GitHub في ملف اسمه: api/search.js
=====================================================================

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { query, apiKey, partNum } = req.body;

  if (!query || !apiKey || !partNum) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    const pdfUrl = `https://ds8ubkfeifm6jjwv.public.blob.vercel-storage.com/QCS%202024%20Full%20_Part${partNum}.pdf`;
    const pdfResponse = await fetch(pdfUrl);

    if (!pdfResponse.ok) {
      return res.status(404).json({ error: `QCS Part ${partNum} not found` });
    }

    const pdfBuffer = await pdfResponse.arrayBuffer();
    const pdfBase64 = Buffer.from(pdfBuffer).toString('base64');

    const aiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://qatar-standers.vercel.app',
        'X-Title': 'QatarSpec Pro'
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-exp:free',
        messages: [
          {
            role: 'system',
            content: `أنت مهندس متخصص في المواصفات القطرية QCS 2024.
أمامك ملف PDF من الكود القطري الرسمي.
قواعد الإجابة:
1. أجب من محتوى الـ PDF فقط
2. اذكر رقم الصفحة والقسم
3. اذكر الأرقام والمعايير بدقة تامة
4. استخدم ** للنقاط المهمة
5. إذا لم تجد الإجابة قل ذلك صراحة
6. أجب بالعربية دائماً بأسلوب مهني`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `هذا ملف QCS 2024 Part ${partNum}. السؤال: ${query}`
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:application/pdf;base64,${pdfBase64}`
                }
              }
            ]
          }
        ],
        max_tokens: 2000,
        temperature: 0.1
      })
    });

    if (!aiResponse.ok) {
      const err = await aiResponse.json().catch(() => ({}));
      return res.status(aiResponse.status).json({ error: err.error?.message || 'AI error' });
    }

    const data = await aiResponse.json();
    const answer = data.choices?.[0]?.message?.content || 'لم أجد إجابة.';

    return res.status(200).json({ answer, partNum });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
