// QatarSpec Pro — AI Proxy (Gemini → Anthropic format)
// api/ai-proxy.js
// لتبديل لـ Anthropic لاحقاً: غيّر السطور 8-9 فقط

export default async function handler(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // ═══ المفاتيح ═══
  const GEMINI_KEY = process.env.GEMINI_KEY;
  const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

  // ═══ لو عندك Anthropic Key يستخدمه مباشرة ═══
  if (ANTHROPIC_KEY) {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify(req.body)
      });
      const data = await response.json();
      return res.status(response.status).json(data);
    } catch (err) {
      return res.status(500).json({ error: { message: err.message } });
    }
  }

  // ═══ Gemini fallback ═══
  if (!GEMINI_KEY) {
    return res.status(500).json({
      error: { message: 'لا يوجد API Key — أضف GEMINI_KEY أو ANTHROPIC_API_KEY في Vercel' }
    });
  }

  try {
    // ترجمة الطلب من Anthropic format إلى Gemini format
    const { messages = [], max_tokens = 800, system } = req.body;

    // دمج system prompt مع أول رسالة لو موجود
    let geminiContents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: typeof m.content === 'string' ? m.content : m.content.map(c => c.text || '').join('') }]
    }));

    if (system && geminiContents.length > 0) {
      geminiContents[0].parts[0].text = `${system}\n\n${geminiContents[0].parts[0].text}`;
    }

    const geminiBody = {
      contents: geminiContents,
      generationConfig: {
        maxOutputTokens: max_tokens,
        temperature: 0.3
      }
    };

    const model = 'gemini-2.0-flash-lite';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_KEY}`;

    const geminiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiBody)
    });

    const geminiData = await geminiRes.json();

    if (!geminiRes.ok) {
      return res.status(geminiRes.status).json({
        error: { message: geminiData.error?.message || 'Gemini API error' }
      });
    }

    // ترجمة الرد من Gemini format إلى Anthropic format
    const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || 'لم أجد إجابة.';

    return res.status(200).json({
      content: [{ type: 'text', text }],
      model: model,
      role: 'assistant'
    });

  } catch (err) {
    return res.status(500).json({ error: { message: err.message || 'Server error' } });
  }
}
