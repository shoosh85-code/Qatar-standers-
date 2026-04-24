export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const body = await new Promise((resolve) => {
    let data = '';
    req.on('data', c => data += c);
    req.on('end', () => { try { resolve(JSON.parse(data)); } catch(e) { resolve({}); } });
  });

  const { section_key = 'unknown', ar_content = '' } = body;
  if (!ar_content || ar_content.length < 30) {
    return res.status(400).json({ error: 'No content' });
  }

  const stripHtml = s => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const arText = stripHtml(ar_content).slice(0, 1500);

  const prompt = `Translate this Arabic Qatar QCS 2024 engineering text to English. Keep all technical terms, numbers, QCS references exact. Return clean HTML (tables and paragraphs). Section: ${section_key}\n\n${arText}`;

  // Try Anthropic first (higher quota), fallback to Gemini
  const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
  const GEMINI_KEY = process.env.GEMINI_KEY;

  if (ANTHROPIC_KEY) {
    try {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 1500,
          messages: [{ role: 'user', content: prompt }]
        })
      });
      const d = await r.json();
      if (r.ok && d.content?.[0]?.text) {
        return res.status(200).json({ enhanced: d.content[0].text, key: section_key, via: 'anthropic' });
      }
    } catch(e) { console.log('Anthropic failed:', e.message); }
  }

  if (!GEMINI_KEY) return res.status(503).json({ error: 'No API keys configured' });

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
    if (!r.ok) return res.status(502).json({ error: d?.error?.message, status: r.status });
    const text = d?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return res.status(200).json({ enhanced: text, key: section_key, via: 'gemini' });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}
