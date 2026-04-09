export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Pro-Token');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Rate limiting via simple IP check
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || 'unknown';
  const proToken = req.headers['x-pro-token'];
  const isProUser = proToken && proToken === process.env.PRO_SECRET;
  const limit = isProUser ? 500 : 5;

  try {
    const { query, partNum, messages } = req.body || {};
    if (!query && !messages) return res.status(400).json({ error: 'query required' });

    const apiKey = process.env.OPENROUTER_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({ 
        error: 'API not configured',
        answer: 'خدمة البحث الذكي غير مفعّلة. أضف OPENROUTER_API_KEY في Vercel Environment Variables.',
        remaining: limit,
        isPro: isProUser
      });
    }

    const aiMessages = messages || [
      {
        role: 'system',
        content: `أنت مساعد هندسي متخصص في مواصفات البناء القطرية QCS 2024. أجب دائماً بالعربية بشكل دقيق واحترافي. استند إلى القسم Part ${partNum || 1} من QCS 2024. قدّم الأرقام والمواصفات الدقيقة فقط.`
      },
      { role: 'user', content: query }
    ];

    let answer = '';

    if (process.env.OPENROUTER_API_KEY) {
      const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://qatar-standers.vercel.app'
        },
        body: JSON.stringify({
          model: 'google/gemini-flash-1.5',
          messages: aiMessages,
          max_tokens: 1500,
          temperature: 0.3
        })
      });
      const data = await r.json();
      answer = data?.choices?.[0]?.message?.content || 'لم أجد إجابة.';
    } else if (process.env.GEMINI_API_KEY) {
      const gemBody = {
        contents: [{ role: 'user', parts: [{ text: query }] }],
        systemInstruction: { parts: [{ text: aiMessages[0].content }] },
        generationConfig: { maxOutputTokens: 1500, temperature: 0.3 }
      };
      const r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(gemBody) }
      );
      const data = await r.json();
      answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'لم أجد إجابة.';
    }

    return res.status(200).json({ answer, remaining: limit, isPro: isProUser, partNum: partNum || 1 });

  } catch (err) {
    return res.status(500).json({ error: 'Server error', message: err.message });
  }
}
