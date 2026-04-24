export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const GEMINI_KEY = process.env.GEMINI_KEY;
  if (!GEMINI_KEY) return res.status(503).json({ error: 'No key' });

  // Read body
  const body = await new Promise((resolve) => {
    let data = '';
    req.on('data', c => data += c);
    req.on('end', () => { try { resolve(JSON.parse(data)); } catch(e) { resolve({}); } });
  });

  const { section_key = 'unknown', ar_content = '' } = body;
  if (!ar_content || ar_content.length < 30) {
    return res.status(400).json({ error: 'No content', len: ar_content.length });
  }

  // Strip HTML tags for cleaner translation prompt
  const stripHtml = s => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const arText = stripHtml(ar_content).slice(0, 2000);

  const prompt = `Translate this Arabic Qatar engineering text to English. Keep all technical terms, QCS references, and numerical values exact. Return only the English translation as clean HTML paragraphs and tables (no Arabic). Section: ${section_key}\n\nArabic text:\n${arText}`;

  try {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 1500, temperature: 0.1 }
        })
      }
    );

    const d = await r.json();
    if (!r.ok) {
      console.error('[enhance-en]', r.status, JSON.stringify(d).slice(0,200));
      return res.status(502).json({ error: d?.error?.message || 'Gemini error', status: r.status });
    }

    const text = d?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    console.log(`[enhance-en] ${section_key}: ${text.length} chars`);
    return res.status(200).json({ enhanced: text, key: section_key });

  } catch(e) {
    console.error('[enhance-en] catch:', e.message);
    return res.status(500).json({ error: e.message });
  }
}
