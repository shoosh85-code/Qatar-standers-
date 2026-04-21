export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Api-Key');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { messages, prompt, query, model, max_tokens, system } = req.body || {};
    let chatMessages = [];
    if (messages && Array.isArray(messages)) {
      chatMessages = messages;
    } else if (prompt || query) {
      chatMessages = [{ role: 'user', content: prompt || query }];
    } else {
      return res.status(400).json({ error: 'يجب توفير messages أو prompt' });
    }

    const systemMessage = system || 'أنت مساعد ذكي متخصص في معايير قطر والجودة والمواصفات القياسية. أجب باللغة العربية.';

    // ✅ OpenRouter أولاً
    const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
    if (OPENROUTER_KEY) {
      try {
        const orRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENROUTER_KEY}`,
            'HTTP-Referer': 'https://qatar-standers.vercel.app',
            'X-Title': 'Qatar Standards',
          },
          body: JSON.stringify({
            model: 'meta-llama/llama-3.1-8b-instruct:free',
            messages: [{ role: 'system', content: systemMessage }, ...chatMessages],
            max_tokens: max_tokens || 1024,
          }),
        });
        if (orRes.ok) {
          const data = await orRes.json();
          const text = data.choices?.[0]?.message?.content || '';
          console.log('[ai-proxy] ✅ OpenRouter نجح');
          return res.status(200).json({ success: true, result: text, text, provider: 'openrouter' });
        }
        const errText = await orRes.text();
        console.error('[ai-proxy] OpenRouter فشل:', errText);
      } catch (e) {
        console.error('[ai-proxy] OpenRouter خطأ:', e.message);
      }
    }

    // ⚠️ Gemini احتياطي
    const GEMINI_KEY = process.env.GEMINI_KEY || process.env.GEMINI_API_KEY;
    if (GEMINI_KEY) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: systemMessage }] },
              contents: chatMessages.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
              generationConfig: { maxOutputTokens: max_tokens || 1024 },
            }),
          }
        );
