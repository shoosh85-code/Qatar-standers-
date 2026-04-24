// Enhance English content in data_content.js sections using Gemini
// POST /api/enhance-en { section_key }
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { section_key, ar_content } = req.body || {};
  const GEMINI_KEY = process.env.GEMINI_KEY;
  
  if (!GEMINI_KEY || !ar_content) {
    return res.status(400).json({ error: 'Missing params' });
  }

  const prompt = `You are a Qatar construction engineering expert. 
Convert this Arabic engineering content to English with the SAME structure, level of detail, HTML formatting, and interactive cards.
Keep all HTML tags, QCS references, technical values, and clickable elements (onclick="QS.openDetail(...)").
The English must match the Arabic in completeness and formatting quality.
Return ONLY the HTML content between the lang-content-en div tags.

Arabic content:
${ar_content.slice(0, 3000)}`;

  try {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 2000, temperature: 0.2 }
        })
      }
    );
    
    const d = await r.json();
    const text = d?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return res.status(200).json({ enhanced: text, key: section_key });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}
