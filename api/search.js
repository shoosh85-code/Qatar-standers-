export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let query, apiKey, partNum;

  try {
    if (typeof req.body === 'string') {
      const parsed = JSON.parse(req.body);
      query = parsed.query;
      apiKey = parsed.apiKey;
      partNum = parsed.partNum;
    } else {
      query = req.body.query;
      apiKey = req.body.apiKey;
      partNum = req.body.partNum;
    }
  } catch (e) {
    return res.status(400).json({ error: 'Invalid request body: ' + e.message });
  }

  if (!query) return res.status(400).json({ error: 'Missing query' });
  if (!apiKey) return res.status(400).json({ error: 'Missing apiKey - received: ' + JSON.stringify(req.body).slice(0, 100) });
  if (!partNum) return res.status(400).json({ error: 'Missing partNum' });

  try {
    const pdfUrl = `https://ds8ubkfeifm6jjwv.public.blob.vercel-storage.com/QCS%202024%20Full%20_Part${partNum}.pdf`;
    const pdfResponse = await fetch(pdfUrl);
    if (!pdfResponse.ok) {
      return res.status(404).json({ error: `QCS Part ${partNum} not found` });
    }

    const arrayBuffer = await pdfResponse.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    let binary = '';
    const chunkSize = 8192;
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      binary += String.fromCharCode(...uint8Array.slice(i, i + chunkSize));
    }
    const pdfBase64 = btoa(binary);

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
            content: 'أنت مهندس متخصص في المواصفات القطرية QCS 2024. أجب من محتوى الـ PDF المقدم فقط. اذكر رقم الصفحة والقسم. اذكر الأرقام والمعايير بدقة. أجب بالعربية بأسلوب مهني.'
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: `QCS 2024 Part ${partNum}. السؤال: ${query}` },
              { type: 'image_url', image_url: { url: `data:application/pdf;base64,${pdfBase64}` } }
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
