export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { query, apiKey, partNum } = req.body || {};
  if (!apiKey) return res.status(401).json({ error: 'Missing apiKey' });
  if (!query) return res.status(400).json({ error: 'Missing query' });
  try {
    const pdfUrl = `https://ds8ubkfeifm6jjwv.public.blob.vercel-storage.com/QCS%202024%20Full%20_Part${partNum || 1}.pdf`;
    const pdfRes = await fetch(pdfUrl);
    if (!pdfRes.ok) return res.status(404).json({ error: 'PDF not found' });
    const buffer = await pdfRes.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let bin = '';
    for (let i = 0; i < bytes.length; i += 8192) bin += String.fromCharCode(...bytes.slice(i, i + 8192));
    const b64 = btoa(bin);
    const ai = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}`, 'HTTP-Referer': 'https://qatar-standers.vercel.app', 'X-Title': 'QatarSpec Pro' },
      body: JSON.stringify({ model: 'google/gemini-2.0-flash-exp:free', messages: [{ role: 'system', content: 'أنت مهندس متخصص في QCS 2024. أجب من الـ PDF فقط بالعربية بدقة.' }, { role: 'user', content: [{ type: 'text', text: `Part ${partNum}: ${query}` }, { type: 'image_url', image_url: { url: `data:application/pdf;base64,${b64}` } }] }], max_tokens: 2000, temperature: 0.1 })
    });
    if (!ai.ok) { const e = await ai.json().catch(() => ({})); return res.status(ai.status).json({ error: e.error?.message || 'AI error' }); }
    const d = await ai.json();
    return res.status(200).json({ answer: d.choices?.[0]?.message?.content || 'لم أجد إجابة.', partNum });
  } catch (e) { return res.status(500).json({ error: e.message }); }
}
