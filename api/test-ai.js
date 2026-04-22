// Quick AI test endpoint — returns raw response for debugging
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  const geminiKey = process.env.GEMINI_KEY || '';
  if (!geminiKey) return res.status(500).json({ error: 'no GEMINI_KEY' });

  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'ما هو الغطاء الخرساني للأساسات في QCS 2024؟ أجب في جملتين.' }] }],
        generationConfig: { maxOutputTokens: 200 }
      }),
      signal: AbortSignal.timeout(15000)
    }
  );

  const d = await r.json();
  const text = d?.candidates?.[0]?.content?.parts?.[0]?.text || '';

  // Return in Anthropic format — exactly what ai-proxy returns
  const anthropicFormat = {
    content: [{ type: 'text', text }],
    model: 'gemini-2.5-flash',
    stop_reason: 'end_turn'
  };

  res.status(200).json({
    raw_gemini_ok: r.ok,
    raw_text_length: text.length,
    raw_text_preview: text.slice(0, 100),
    anthropic_format: anthropicFormat,
    answer_extracted: anthropicFormat.content[0].text.slice(0, 100)
  });
}
