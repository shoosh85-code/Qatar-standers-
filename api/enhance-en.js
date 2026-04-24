// Enhance English content using Gemini
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  // Parse body
  let body = req.body || {};
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch(e) { body = {}; }
  }
  // Handle raw body stream
  if (!body.ar_content && req.readable) {
    body = await new Promise((resolve) => {
      let data = '';
      req.on('data', chunk => data += chunk);
      req.on('end', () => {
        try { resolve(JSON.parse(data)); } catch(e) { resolve({}); }
      });
    });
  }

  const { section_key, ar_content } = body;
  const GEMINI_KEY = process.env.GEMINI_KEY;

  if (!GEMINI_KEY) return res.status(503).json({ error: 'No Gemini key' });
  if (!ar_content || ar_content.length < 50) {
    return res.status(400).json({ error: 'ar_content missing or too short', received: typeof ar_content, len: (ar_content||'').length });
  }

  // Clean AR HTML for translation — remove video players, keep structure
  const cleanAR = ar_content
    .replace(/<input[^>]*>/g, '')
    .replace(/<div id="vid-[^"]*"[^>]*>[\s\S]*?<\/div>/g, '')
    .replace(/data-player="[^"]*"/g, '')
    .slice(0, 2500);

  const prompt = `You are a Qatar QCS 2024 engineering expert.
Translate this Arabic HTML to English. Rules:
1. Keep EXACT same HTML structure (tables, divs, styling)
2. Keep all onclick="QS.openDetail(...)" unchanged
3. Keep all QCS references, numbers, and Pass/Fail values
4. Match same level of detail as Arabic
5. Return ONLY the inner HTML content (no outer wrapper div)

Arabic:
${cleanAR}`;

  try {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 2048, temperature: 0.1 }
        }),
        signal: AbortSignal.timeout(25000)
      }
    );

    const d = await r.json();
    if (!r.ok) return res.status(502).json({ error: d?.error?.message || 'Gemini error', status: r.status });

    const text = d?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    console.log(`[enhance-en] ${section_key}: ${text.length} chars returned`);

    return res.status(200).json({ enhanced: text, key: section_key, len: text.length });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}
