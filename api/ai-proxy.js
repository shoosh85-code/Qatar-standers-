// /api/ai-proxy.js — QatarSpec Pro v3.0.0
// Gemini 2.5 Pro (primary) + SSE Streaming + Citations + Rate Limiting
// v3.0: +streaming, +citations, +gemini-2.5-pro [لا تحذف محتوى — فقط إضافة]

export const config = { runtime: 'edge' };

const CORS = {
  'Access-Control-Allow-Origin': process.env.APP_URL || 'https://qatar-standers.vercel.app',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Api-Key',
};

// ══════════════════════════════════════════════════════════════
// RATE LIMITING — Simple in-memory counter (Edge KV)
// Uses Vercel KV if available, fallback to in-memory map
// ══════════════════════════════════════════════════════════════
// ── JWT verify (shared secret with verify-pro.js) ──
// ── Extract token from cookie OR Authorization header ──────────
function extractToken(req) {
  // 1. Try httpOnly cookie (secure path)
  const cookieHeader = req.headers.get('cookie') || '';
  const cookieMatch = cookieHeader.match(/qs_pro=([^;]+)/);
  if (cookieMatch) return cookieMatch[1];
  // 2. Fallback: Authorization header (legacy)
  const auth = req.headers.get('authorization') || '';
  if (auth.startsWith('Bearer ')) return auth.slice(7);
  return null;
}

async function verifyProToken(token) {
  if (!token) return false;
  const secret = process.env.JWT_SECRET;
  if (!secret) return false;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    const msg = `${parts[0]}.${parts[1]}`;
    const key = await crypto.subtle.importKey(
      'raw', new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
    );
    const decodeB64 = s => Uint8Array.from(atob(s.replace(/-/g,'+').replace(/_/g,'/')), c => c.charCodeAt(0));
    const ok = await crypto.subtle.verify('HMAC', key, decodeB64(parts[2]), new TextEncoder().encode(msg));
    if (!ok) return false;
    const payload = JSON.parse(atob(parts[1].replace(/-/g,'+').replace(/_/g,'/')));
    return payload.pro === true && payload.exp > Math.floor(Date.now() / 1000);
  } catch { return false; }
}


// ── Rate Limiting — PROTOCOL 6 (per-minute, Edge-compatible) ──────────────────
// rate-limit.js لا يدعم Edge runtime (setInterval + top-level await + Node headers)
// → نبقي النسخة الداخلية مع تعديل الحدود لتتطابق مع PROTOCOL 6
const ipCounters = new Map();  // fallback: in-memory (per-instance, per-minute window)
const FREE_LIMIT   =   5;  // PROTOCOL 6: free tier   5 req/min
const PRO_LIMIT    =  60;  // PROTOCOL 6: pro tier   60 req/min
const GLOBAL_LIMIT = 100;  // PROTOCOL 6: global    100 req/min/IP
const WINDOW_MS    = 60 * 1000; // نافذة دقيقة واحدة

// مفتاح النافذة الزمنية الحالية (بالدقيقة)
function getMinuteWindow() {
  return Math.floor(Date.now() / WINDOW_MS);
}

function getRateKey(ip, window) {
  return `rl:${window}:${ip}`;
}

// Check and increment rate limit — per-minute
// Returns { allowed: bool, count: number, limit: number, retryAfter: number }
async function checkRateLimit(ip, isProUser) {
  const limit  = isProUser ? PRO_LIMIT : FREE_LIMIT;
  const window = getMinuteWindow();
  const key    = getRateKey(ip, window);
  const globalKey = getRateKey(`global:${ip}`, window);

  // Try Vercel KV (fetch-based — Edge compatible)
  if (typeof process !== 'undefined' && process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const kvBase  = process.env.KV_REST_API_URL;
      const kvToken = process.env.KV_REST_API_TOKEN;
      const headers = { Authorization: `Bearer ${kvToken}` };

      // فحص الحد العالمي أولاً
      const gRes  = await fetch(`${kvBase}/get/${encodeURIComponent(globalKey)}`, { headers });
      const gData = await gRes.json();
      const gCount = parseInt(gData.result || '0');
      if (gCount >= GLOBAL_LIMIT) {
        const retryAfter = WINDOW_MS / 1000 - (Date.now() % WINDOW_MS) / 1000 | 0;
        return { allowed: false, count: gCount, limit: GLOBAL_LIMIT, retryAfter };
      }

      // فحص حد المستخدم (free/pro)
      const uRes  = await fetch(`${kvBase}/get/${encodeURIComponent(key)}`, { headers });
      const uData = await uRes.json();
      const uCount = parseInt(uData.result || '0');
      if (uCount >= limit) {
        const retryAfter = WINDOW_MS / 1000 - (Date.now() % WINDOW_MS) / 1000 | 0;
        return { allowed: false, count: uCount, limit, retryAfter };
      }

      // INCR + TTL دقيقتان (ضمان انتهاء النافذة)
      const ttl = 120;
      await fetch(`${kvBase}/incr/${encodeURIComponent(key)}`,       { method: 'POST', headers });
      await fetch(`${kvBase}/expire/${encodeURIComponent(key)}/${ttl}`,       { headers });
      await fetch(`${kvBase}/incr/${encodeURIComponent(globalKey)}`, { method: 'POST', headers });
      await fetch(`${kvBase}/expire/${encodeURIComponent(globalKey)}/${ttl}`, { headers });

      return { allowed: true, count: uCount + 1, limit, retryAfter: 0 };
    } catch (err) {
      console.error('[rate-limit] KV error:', err.message);
      // Fall through to in-memory
    }
  }

  // Fallback: in-memory (resets on cold start — acceptable for edge)
  // فحص الحد العالمي
  const gKey   = getRateKey(`global:${ip}`, window);
  const gCount = ipCounters.get(gKey) || 0;
  if (gCount >= GLOBAL_LIMIT) {
    return { allowed: false, count: gCount, limit: GLOBAL_LIMIT, retryAfter: 60 };
  }

  // فحص حد المستخدم
  const current = ipCounters.get(key) || 0;
  if (current >= limit) {
    return { allowed: false, count: current, limit, retryAfter: 60 };
  }

  ipCounters.set(key, current + 1);
  ipCounters.set(gKey, gCount + 1);

  // تنظيف النوافذ القديمة (أقدم من دقيقتين)
  if (ipCounters.size > 5000) {
    const oldWindow = window - 2;
    for (const k of ipCounters.keys()) {
      if (k.startsWith(`rl:${oldWindow}:`) || k < `rl:${oldWindow}:`) ipCounters.delete(k);
    }
  }
  return { allowed: true, count: current + 1, limit, retryAfter: 0 };
}

// ══════════════════════════════════════════════════════════════
// GEMINI API CALL
// ══════════════════════════════════════════════════════════════
async function callGemini(messages, maxTokens = 2000) {
  const apiKey = process.env.GEMINI_KEY;
  if (!apiKey) throw new Error('GEMINI_KEY not configured');

  // Gemini 2.5 Pro as primary (v3.0), fallback to 2.0-flash
  const model = 'gemini-2.5-pro';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  // Convert messages format to Gemini format
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const body = {
    contents,
    generationConfig: {
      maxOutputTokens: maxTokens || 2000,
      temperature: 0.2,
      topP: 0.85,
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
    ],
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 28000); // 28s timeout

  let res;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!res.ok) {
    const errText = await res.text();
    // Try gemini-2.5-flash if 2.0 fails
    if (res.status === 429 || res.status === 503) {
      throw new Error(`Gemini ${model} quota: ${res.status}`);
    }
    throw new Error(`Gemini error ${res.status}: ${errText.slice(0, 200)}`);
  }

  const data = await res.json();
  const candidate = data.candidates?.[0];

  if (!candidate) {
    throw new Error('No candidates in Gemini response');
  }

  if (candidate.finishReason === 'SAFETY') {
    throw new Error('Gemini blocked by safety filters');
  }

  const text = candidate.content?.parts?.[0]?.text || '';
  if (!text) {
    throw new Error(`Empty response (finishReason: ${candidate.finishReason})`);
  }

  return {
    content: [{ type: 'text', text }],
    model,
    usage: {
      input_tokens: data.usageMetadata?.promptTokenCount || 0,
      output_tokens: data.usageMetadata?.candidatesTokenCount || 0,
    },
  };
}


// ══════════════════════════════════════════════════════════════
// CITATIONS — v3.0: التحقق من مراجع QCS (إلزامي)
// ══════════════════════════════════════════════════════════════
function validateCitations(text) {
  // تحذير في console إذا ذُكر QCS بدون رقم Section+Part
  const qcsWithoutRef = text.match(/QCS(?!\s+S\d+)/g);
  if (qcsWithoutRef) {
    console.warn('[citations] QCS mentioned without full ref:', qcsWithoutRef.length, 'times');
  }
  // إضافة [تحقق] إذا لم يكن هناك رقم part
  return text.replace(
    /QCS\s+(\d{4})?\s*(?:Section|Part)?\s*(\d+)?(?!\s+S\d+)/gi,
    (match, year, part) => {
      if (!part && !match.match(/S\d+/)) return match + ' [تحقق من المرجع]';
      return match;
    }
  );
}

function extractCitations(text) {
  const matches = text.match(/QCS\s+S\d+(?:\s+P\d+)?(?:\s+Cl\.\d+(?:\.\d+)?)?/g) || [];
  return [...new Set(matches)];
}

// ══════════════════════════════════════════════════════════════
// SSE STREAMING — v3.0: Server-Sent Events مع Gemini 2.5 Pro
// Edge runtime: ReadableStream (لا Node.js streams)
// ══════════════════════════════════════════════════════════════
async function callGeminiStream(messages, maxTokens, apiKey) {
  const model = 'gemini-2.5-pro';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`;

  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const body = {
    contents,
    generationConfig: {
      maxOutputTokens: maxTokens || 2000,
      temperature: 0.1, // منخفض للدقة QCS
      topP: 0.85,
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
    ],
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini stream error ${res.status}: ${errText.slice(0, 200)}`);
  }

  return res.body; // ReadableStream من Gemini SSE
}

// ══════════════════════════════════════════════════════════════
// MAIN HANDLER
// ══════════════════════════════════════════════════════════════
export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }

  // ── [SEC H-02] Auth Check — رفض الطلبات بدون مصادقة ──────────────────
  // يقبل: Bearer token أو httpOnly cookie أو طلب من domain الموقع
  const origin = req.headers.get('origin') || '';
  const referer = req.headers.get('referer') || '';
  const authHeader = req.headers.get('authorization') || '';
  const cookieHeader = req.headers.get('cookie') || '';
  const allowedOrigin = process.env.APP_URL || 'https://qatar-standers.vercel.app';

  const hasToken     = authHeader.startsWith('Bearer ') || cookieHeader.includes('qs_pro=');
  const hasOrigin    = origin.includes('qatar-standers.vercel.app') || referer.includes('qatar-standers.vercel.app');
  const hasAdminHdr  = req.headers.get('X-Admin-Token') || '';

  if (!hasToken && !hasOrigin && !hasAdminHdr) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized — token or valid origin required', code: 'UNAUTHORIZED' }),
      { status: 401, headers: { ...CORS, 'Content-Type': 'application/json' } }
    );
  }
  // ── End Auth Check ───────────────────────────────────────────────────────
  const ip =
    req.headers.get('x-real-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('cf-connecting-ip') ||
    'unknown';

  // ── Parse body ──
  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }

  // ── Detect Pro user from token (basic check) ──
const token = extractToken(req);
  const isProUser = token ? await verifyProToken(token) : false;

  // ── Rate Limit — Admin token from sessionStorage (not URL param) ──
  const adminToken = req.headers.get('X-Admin-Token') || '';
  // Validate: token must be base64 starting with "admin:" (set by /api/admin-session)
  let isAdmin = false;
  if (adminToken) {
    try {
      const decoded = atob(adminToken);
      const ts = parseInt(decoded.split(':')[1] || '0');
      isAdmin = decoded.startsWith('admin:') && (Date.now() - ts) < 86400000;
    } catch(e) { isAdmin = false; }
  }

  const rl = isAdmin ? { allowed: true, count: 0, limit: 999 } : await checkRateLimit(ip, isProUser);
  if (!rl.allowed) {
    return new Response(
      JSON.stringify({
        error: `تجاوزت الحد المسموح (${rl.limit} طلب/دقيقة). حاول مجدداً خلال ${rl.retryAfter || 60} ثانية.`,
        code: 'RATE_LIMIT',
        count: rl.count,
        limit: rl.limit,
        retryAfter: rl.retryAfter || 60,
      }),
      {
        status: 429,
        headers: {
          ...CORS,
          'Content-Type': 'application/json',
          'Retry-After': String(rl.retryAfter || 60),
          'X-RateLimit-Limit': String(rl.limit),
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }


  // ── SSE Streaming Path (v3.0) ──
  const acceptHeader = req.headers.get('accept') || '';
  if (acceptHeader.includes('text/event-stream')) {
    const { messages: sseMessages, max_tokens: sseMT, system: sseSys } = body;
    if (!sseMessages || !Array.isArray(sseMessages) || sseMessages.length === 0) {
      return new Response(JSON.stringify({ error: 'messages required' }), {
        status: 400, headers: { ...CORS, 'Content-Type': 'application/json' }
      });
    }
    const apiKey = process.env.GEMINI_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'GEMINI_KEY not configured' }), {
        status: 500, headers: { ...CORS, 'Content-Type': 'application/json' }
      });
    }
    const finalSSEMessages = sseSys
      ? [{ role: 'user', content: `[SYSTEM: ${sseSys}]\n\n${sseMessages[0]?.content || ''}` }, ...sseMessages.slice(1)]
      : sseMessages;

    try {
      const geminiStream = await callGeminiStream(finalSSEMessages, sseMT || 2000, apiKey);
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();

      const readable = new ReadableStream({
        async start(controller) {
          const reader = geminiStream.getReader();
          let buffer = '';
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              buffer += decoder.decode(value, { stream: true });
              // Gemini SSE: "data: {...}\n\n"
              const lines = buffer.split('\n');
              buffer = lines.pop() || '';
              for (const line of lines) {
                if (!line.startsWith('data:')) continue;
                const jsonStr = line.slice(5).trim();
                if (!jsonStr || jsonStr === '[DONE]') continue;
                try {
                  const parsed = JSON.parse(jsonStr);
                  const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text || '';
                  if (text) {
                    // Citation check
                    if (text.includes('QCS') && !text.match(/QCS\s+S\d+/)) {
                      console.warn('[sse-citations] missing ref in chunk');
                    }
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
                  }
                } catch (_) { /* تجاهل chunks غير صالحة */ }
              }
            }
          } finally {
            reader.releaseLock();
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        }
      });

      return new Response(readable, {
        status: 200,
        headers: {
          ...CORS,
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'X-RateLimit-Limit': String(rl.limit),
          'X-RateLimit-Remaining': String(rl.limit - rl.count),
        }
      });
    } catch (sseErr) {
      console.error('[ai-proxy] SSE error:', sseErr.message);
      return new Response(JSON.stringify({ error: sseErr.message }), {
        status: 502, headers: { ...CORS, 'Content-Type': 'application/json' }
      });
    }
  }

  // ── Call AI (non-streaming) ──
  const { messages, max_tokens, system } = body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: 'messages array required' }), {
      status: 400,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }

  // Inject system prompt into first message if provided
  const finalMessages = system
    ? [{ role: 'user', content: `[SYSTEM: ${system}]\n\n${messages[0]?.content || ''}` }, ...messages.slice(1)]
    : messages;

  const tokenLimit = Math.min(max_tokens || 2500, 3000); // max 3000 tokens

  // Retry once on 429
  async function callWithRetry(msgs, tokens, retries = 1) {
    try {
      return await callGemini(msgs, tokens);
    } catch (err) {
      if (retries > 0 && (err.message?.includes('429') || err.message?.includes('quota'))) {
        await new Promise(r => setTimeout(r, 3000)); // wait 3s
        return callWithRetry(msgs, tokens, retries - 1);
      }
      throw err;
    }
  }

  try {
    const result = await callWithRetry(finalMessages, tokenLimit);

    // إضافة citations للـ response (v3.0)
    const resultText = result.content?.[0]?.text || '';
    const citations = extractCitations(resultText);
    if (citations.length > 0) result.citations = citations;

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        ...CORS,
        'Content-Type': 'application/json',
        'X-RateLimit-Limit': String(rl.limit),
        'X-RateLimit-Remaining': String(rl.limit - rl.count),
      },
    });
  } catch (err) {
    console.error('[ai-proxy] Gemini error:', err.message);

    // Try gemini-2.5-flash as fallback
    if (err.message.includes('quota') || err.message.includes('2.0')) {
      try {
        const apiKey = process.env.GEMINI_KEY;
        const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        const fallbackBody = {
          contents: finalMessages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
          })),
          generationConfig: { maxOutputTokens: tokenLimit, temperature: 0.2 },
        };
        const fb = await fetch(fallbackUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fallbackBody),
        });
        if (fb.ok) {
          const fbData = await fb.json();
          const text = fbData.candidates?.[0]?.content?.parts?.[0]?.text || '';
          if (text) {
            return new Response(
              JSON.stringify({ content: [{ type: 'text', text }], model: 'gemini-2.5-flash' }),
              { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } }
            );
          }
        }
      } catch (fbErr) {
        console.error('[ai-proxy] Fallback also failed:', fbErr.message);
      }
    }

    const status = err.message.includes('abort') || err.message.includes('timeout') ? 504 : 502;
    return new Response(
      JSON.stringify({
        error: err.message.includes('abort')
          ? 'انتهت مهلة الاتصال — حاول مرة أخرى'
          : `خطأ في خدمة AI: ${err.message.slice(0, 100)}`,
        code: 'AI_ERROR',
      }),
      { status, headers: { ...CORS, 'Content-Type': 'application/json' } }
    );
  }
}
