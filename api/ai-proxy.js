export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Api-Key');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages, prompt, query, system, max_tokens } = req.body || {};

  const chatMessages = messages || [{ role: 'user', content: prompt || query || '' }];
  const systemMsg = system || 'أنت مساعد ذكي متخصص في معايير قطر. أجب باللغة العربية.';
  const key = process.env.OPENROUTER_API_KEY;

  if (!key) {
    return res.status(500).json({ success: false, error: 'OPENROUTER_API_KEY غير موجود' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + key,
        'HTTP-Referer': 'https://qatar-standers.vercel.app',
        'X-Title': 'Qatar Standards',
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct:free',
        messages: [{ role: 'system', content: systemMsg }, ...chatMessages],
        max_tokens: max_tokens || 1024,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[ai-proxy] OpenRouter error:', JSON.stringify(data));
      return res.status(502).json({ success: false, error: data?.error?.message || 'OpenRouter فشل' });
    }

    const text = data.choices?.[0]?.message?.content || '';
    console.log('[ai-proxy] ✅ نجح provider=openrouter');
    return res.status(200).json({ success: true, result: text, text, provider: 'openrouter' });

  } catch (err) {
    console.error('[ai-proxy] exception:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
}
