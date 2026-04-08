// QatarSpec Pro — Cloudflare Worker v2.0
// API key stays in env.OPENROUTER_API_KEY — NEVER sent to browser

export default {
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,X-Pro-Token',
      'Content-Type': 'application/json'
    };

    if (request.method === 'OPTIONS')
      return new Response(null, { status: 204, headers: cors });

    const url = new URL(request.url);

    // Health check
    if (url.pathname === '/api/health') {
      return new Response(JSON.stringify({ status: 'ok', version: '2.0' }), { headers: cors });
    }

    // AI Search endpoint
    if (url.pathname === '/api/search' && request.method === 'POST') {
      return handleSearch(request, env, cors);
    }

    // Pro token validation
    if (url.pathname === '/api/validate-token' && request.method === 'POST') {
      return handleValidateToken(request, env, cors);
    }

    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: cors });
  }
};

async function handleSearch(request, env, cors) {
  try {
    // Rate limiting
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const today = new Date().toDateString();
    const rateKey = `rate:${ip}:${today}`;
    const proToken = request.headers.get('X-Pro-Token');

    let isProUser = false;
    if (proToken && env.KV) {
      const valid = await env.KV.get(`pro:${proToken}`);
      isProUser = valid !== null;
    }

    const limit = isProUser ? 500 : 5;

    if (env.KV) {
      const current = parseInt(await env.KV.get(rateKey) || '0');
      if (current >= limit) {
        return new Response(JSON.stringify({
          error: 'rate_limit',
          message: isProUser ? 'Daily Pro limit reached' : 'Free limit: 5 searches/day',
          remaining: 0,
          isPro: isProUser
        }), { status: 429, headers: cors });
      }
      await env.KV.put(rateKey, String(current + 1), { expirationTtl: 86400 });
    }

    // Parse request
    const body = await request.json();
    const { query, partNum, messages } = body;

    if (!query && !messages) {
      return new Response(JSON.stringify({ error: 'query required' }), { status: 400, headers: cors });
    }

    // Build messages for AI
    const aiMessages = messages || [{
      role: 'system',
      content: `أنت مساعد هندسي متخصص في مواصفات البناء القطرية QCS 2024. 
أجب دائماً بالعربية بشكل دقيق واحترافي. 
استند إلى القسم المحدد من QCS 2024 Part ${partNum || 1}.
قدّم الأرقام والمواصفات الدقيقة فقط. 
اذكر رقم الصفحة والقسم عند الإمكان.`
    }, {
      role: 'user',
      content: query
    }];

    // Call AI — key never leaves server
    const apiKey = env.OPENROUTER_API_KEY || env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API not configured' }), { status: 503, headers: cors });
    }

    let aiResponse, data;

    // Try OpenRouter first, fallback to Gemini
    if (env.OPENROUTER_API_KEY) {
      aiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
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
      data = await aiResponse.json();
    } else if (env.GEMINI_API_KEY) {
      // Fallback: Gemini direct
      const geminiBody = {
        contents: aiMessages.filter(m => m.role !== 'system').map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
        systemInstruction: { parts: [{ text: aiMessages.find(m => m.role === 'system')?.content || '' }] },
        generationConfig: { maxOutputTokens: 1500, temperature: 0.3 }
      };
      aiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(geminiBody) }
      );
      const gData = await aiResponse.json();
      // Normalize to OpenAI format
      data = {
        choices: [{
          message: {
            content: gData.candidates?.[0]?.content?.parts?.[0]?.text || 'لا توجد إجابة'
          }
        }]
      };
    }

    const answer = data?.choices?.[0]?.message?.content || 'لم أجد إجابة مناسبة.';

    // Get remaining count
    let remaining = limit;
    if (env.KV) {
      const used = parseInt(await env.KV.get(rateKey) || '0');
      remaining = Math.max(0, limit - used);
    }

    return new Response(JSON.stringify({
      answer,
      remaining,
      isPro: isProUser,
      partNum: partNum || 1,
      model: env.OPENROUTER_API_KEY ? 'gemini-flash-1.5' : 'gemini-direct'
    }), { headers: cors });

  } catch (err) {
    return new Response(JSON.stringify({
      error: 'Server error',
      message: err.message
    }), { status: 500, headers: cors });
  }
}

async function handleValidateToken(request, env, cors) {
  try {
    const { token } = await request.json();
    if (!token || !env.KV) {
      return new Response(JSON.stringify({ valid: false }), { headers: cors });
    }
    const data = await env.KV.get(`pro:${token}`);
    return new Response(JSON.stringify({
      valid: data !== null,
      tier: data ? JSON.parse(data).tier || 'pro' : null,
      expires: data ? JSON.parse(data).expires || null : null
    }), { headers: cors });
  } catch {
    return new Response(JSON.stringify({ valid: false }), { headers: cors });
  }
}
