export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const cfAccountId = process.env.CF_ACCOUNT_ID;
  const cfToken = process.env.CF_TOKEN;

  if (!cfAccountId || !cfToken) {
    return res.status(500).json({ error: 'Server keys not configured' });
  }

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
      `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/ai/run/@cf/meta/llama-3.1-8b-instruct`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${cfToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `أنت مهندس متخصص في المواصفات القطرية QCS 2024. 
لديك محتوى من ملف QCS 2024 Part ${partNum}.
أجب على الأسئلة بدقة تامة بالعربية.
اذكر الأرقام والمعايير والنسب المئوية بوضوح.
اذكر رقم القسم والمرجع إذا أمكن.`
            },
            {
              role: 'user',
              content: `السؤال: ${query}\n\nمحتوى QCS 2024 Part ${partNum} (base64): ${b64.slice(0, 10000)}`
            }
          ],
          max_tokens: 1500,
          temperature: 0.1
        })
      }
    );

    if (!aiRes.ok) {
      const e = await aiRes.json().catch(() => ({}));
      return res.status(aiRes.status).json({ error: JSON.stringify(e) });
    }

    const data = await aiRes.json();
    const answer = data.result?.response || 'لم أجد إجابة.';
    return res.status(200).json({ answer, partNum });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
