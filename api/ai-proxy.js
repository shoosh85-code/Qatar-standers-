// /api/ai-proxy.js — QatarSpec Pro v3.2.0
// Gemini 2.5 Pro (primary) + SSE Streaming + Citations + Rate Limiting
// v3.0: +streaming, +citations, +gemini-2.5-pro [لا تحذف محتوى — فقط إضافة]
// v3.1: +retryGemini exponential backoff from api/lib/retry.js
// v3.2: +server-side Pro gate (X-Feature-Gate header)

import { retryGemini }                          from '../lib/retry.js';
import { checkRateLimit, rateLimitResponse }    from '../lib/rate-limit.js';
import { getSupabaseUrl, getSupabaseServiceKey } from '../lib/supabase.js';

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

// SYNC-WITH: api/verify-pro.js verifyJWT() — يجب تحديثهما معاً
// ملاحظة: Edge functions لا تدعم import بين بعضها في Vercel
// الفرق المقصود: verifyProToken تُعيد boolean مباشرة (تتحقق من .pro داخلياً)
//               verifyJWT   تُعيد payload كاملاً (يتحقق الـ caller من .pro)
// إذا عدّلت منطق الـ crypto هنا → عدّل verify-pro.js + vision-proxy.js أيضاً
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


// ── Rate Limiting — PROTOCOL 6 (Upstash Redis shared — lib/rate-limit.js) ────
// تم نقل checkRateLimit إلى lib/rate-limit.js — Edge-compatible + Upstash SDK
// لا local Map، لا fetch يدوي — موحّد مع كل endpoints

// ══════════════════════════════════════════════════════════════
// GEMINI API CALL
// ══════════════════════════════════════════════════════════════
async function callGemini(messages, maxTokens = 2000) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not configured');

  // ترتيب حسب الحصة المجانية: الأعلى أولاً
  const MODELS = ['gemini-2.5-flash-preview-05-20', 'gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-2.0-flash', 'gemini-1.5-flash'];

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

  let lastErr = '';
  for (const model of MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 28000);

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
        if (res.status === 429 || res.status === 503) {
          lastErr = `${model}: ${res.status} rate limit`;
          continue; // جرب النموذج التالي
        }
        const errText = await res.text();
        lastErr = `${model}: ${res.status} ${errText.slice(0, 100)}`;
        continue;
      }

      const data = await res.json();
      const candidate = data.candidates?.[0];
      if (!candidate) { lastErr = `${model}: no candidates`; continue; }
      if (candidate.finishReason === 'SAFETY') { lastErr = `${model}: safety block`; continue; }

      const text = candidate.content?.parts?.[0]?.text || '';
      if (!text) { lastErr = `${model}: empty response`; continue; }

      return {
        content: [{ type: 'text', text }],
        model,
        usage: {
          input_tokens: data.usageMetadata?.promptTokenCount || 0,
          output_tokens: data.usageMetadata?.candidatesTokenCount || 0,
        },
      };
    } catch (e) {
      lastErr = `${model}: ${e.message}`;
    }
  }

  throw new Error(`All models failed. Last: ${lastErr}`);
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
// Retry chain: gemini-2.0-flash (15 RPM free) → 1.5-flash → 2.5-flash
// ══════════════════════════════════════════════════════════════
async function callGeminiStream(messages, maxTokens, apiKey) {
  // ترتيب حسب الحصة المجانية: الأعلى أولاً
  const MODELS = ['gemini-2.5-flash-preview-05-20', 'gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-2.0-flash', 'gemini-1.5-flash'];

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

  let lastErr = '';
  for (const model of MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) return res.body; // ReadableStream من Gemini SSE

      // 429 = rate limit → جرب النموذج التالي
      if (res.status === 429) {
        lastErr = `${model}: 429 rate limit`;
        continue;
      }

      const errText = await res.text();
      lastErr = `${model}: ${res.status} ${errText.slice(0, 100)}`;
      // أي خطأ غير 429 → جرب النموذج التالي أيضاً
    } catch (e) {
      lastErr = `${model}: ${e.message}`;
    }
  }

  throw new Error(`All models failed. Last: ${lastErr}`);
}

// ══════════════════════════════════════════════════════════════
// GEMINI FALLBACK — chain: 2.5-flash → 1.5-flash → 1.5-pro
// SYNC-WITH: api/execution-ai.js MODELS chain
// ══════════════════════════════════════════════════════════════
async function callGeminiFallback(messages, maxTokens = 2000) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not configured');

  // نجرب الموديلات بالترتيب — الأول المتاح يُعيد النتيجة
  const FALLBACK_MODELS = ['gemini-2.5-flash-preview-05-20', 'gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-2.0-flash', 'gemini-1.5-flash'];

  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  let lastErr;
  for (const model of FALLBACK_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          generationConfig: { maxOutputTokens: maxTokens, temperature: 0.2 },
        }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => '');
        lastErr = new Error(`${model} ${res.status}: ${errText.slice(0, 100)}`);
        lastErr.status = res.status;
        console.warn(`[fallback] ${model} failed ${res.status} — trying next`);
        continue; // جرّب الموديل التالي
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      if (!text) {
        lastErr = new Error(`${model} empty response`);
        continue;
      }

      console.log(`[fallback] نجح: ${model}`);
      return { content: [{ type: 'text', text }], model, usage: {} };

    } catch (e) {
      lastErr = e;
      console.warn(`[fallback] ${model} exception: ${e.message}`);
    }
  }

  throw lastErr || new Error('All fallback models failed');
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

  // ── Pro gate — server-side (v3.2) ─────────────────────────────────────────
  // يرفض الطلب إذا كان X-Feature-Gate: pro موجود والمستخدم ليس Pro
  // المستخدمون الـ free بدون هذا الـ header يصلون للخدمة بحد 5 طلبات
  if (!isProUser && req.headers.get('X-Feature-Gate') === 'pro') {
    return new Response(
      JSON.stringify({ error: 'هذه الميزة للمشتركين Pro فقط', code: 'PRO_REQUIRED' }),
      { status: 403, headers: { ...CORS, 'Content-Type': 'application/json' } }
    );
  }
  // ── End Pro gate ──────────────────────────────────────────────────────────

  // ── Rate Limit — Admin HMAC token from sessionStorage (not URL param) ──
  const adminToken = req.headers.get('X-Admin-Token') || '';
  // Validate: HMAC-SHA256 signed token from /api/admin-session
  let isAdmin = false;
  if (adminToken) {
    try {
      const ADMIN_SECRET = (typeof process !== 'undefined' && process.env?.ADMIN_SECRET) || '';
      if (ADMIN_SECRET && adminToken.includes('.')) {
        const [payloadB64, signature] = adminToken.split('.');
        // Web Crypto HMAC verification (Edge runtime compatible)
        const key = await crypto.subtle.importKey(
          'raw',
          new TextEncoder().encode(ADMIN_SECRET),
          { name: 'HMAC', hash: 'SHA-256' },
          false,
          ['sign']
        );
        const expectedSigBuf = await crypto.subtle.sign(
          'HMAC',
          key,
          new TextEncoder().encode(payloadB64)
        );
        // base64url encode the expected signature
        const expectedSig = btoa(String.fromCharCode(...new Uint8Array(expectedSigBuf)))
          .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        // Constant-length comparison
        if (signature === expectedSig && signature.length === expectedSig.length) {
          const payload = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')));
          isAdmin = payload.role === 'admin' && Date.now() < payload.exp;
        }
      }
    } catch(e) { isAdmin = false; }
  }

  const rl = isAdmin ? { allowed: true, count: 0, limit: 999 } : await checkRateLimit(ip, '/api/ai-proxy', isProUser);
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


  // ── Enhance Action (v3.3) — merged from enhance-en.js ─────────────────────
  // [لا تحذف محتوى — فقط إضافة — v3.3]
  // مُدمج من api/enhance-en.js: يجلب نص QCS الحقيقي من Supabase ثم يُنسّقه بـ Gemini
  // الاستخدام: POST /api/ai-proxy { action: 'enhance', section_key: '...', ar_content: '...' }
  if (body.action === 'enhance') {
    const { section_key = 'unknown', ar_content = '' } = body;
    if (!ar_content || ar_content.length < 30) {
      return new Response(JSON.stringify({ error: 'No content — ar_content مطلوب (30 حرف+)' }), {
        status: 400, headers: { ...CORS, 'Content-Type': 'application/json' }
      });
    }

    const SUPA_URL  = getSupabaseUrl();
    const SUPA_KEY  = getSupabaseServiceKey();
    const GEMINI_KEY = process.env.GEMINI_API_KEY;

    if (!SUPA_URL || !SUPA_KEY || !GEMINI_KEY) {
      return new Response(JSON.stringify({ error: 'Missing env vars (SUPABASE or GEMINI)' }), {
        status: 503, headers: { ...CORS, 'Content-Type': 'application/json' }
      });
    }

    // خريطة section_key → مصطلحات بحث QCS بالإنجليزية
    const searchTerms = {
      roads:                'road construction pavement asphalt subgrade compaction',
      subgrade:             'subgrade formation compaction CBR density',
      subbase:              'subbase granular Type B CBR compaction',
      base:                 'road base course aggregate compaction',
      binder:               'binder course asphalt AC20 temperature density',
      wearing:              'wearing course AC14 asphalt IRI smoothness temperature',
      prime:                'prime coat tack coat bitumen application rate',
      finishing:            'road finishing road markings kerb reinstatement',
      handover:             'project handover as-built documentation defects',
      utilities:            'utilities networks water supply sewer drainage',
      water_supply_stages:  'water supply pipe laying pressure test chlorination',
      sewer_stages:         'foul sewer pipe laying air test CCTV inspection',
      structural:           'reinforced concrete structural works construction',
      concrete_full:        'concrete mix design placing curing testing',
      rebar_full:           'reinforcement steel bar fixing cover lap length',
      geotech:              'geotechnical investigation borehole SPT soil testing',
      itp_concrete:         'concrete inspection test plan ITP hold witness',
      itp_structural:       'structural concrete ITP inspection plan',
      marshall_mix:         'Marshall mix design stability flow air voids asphalt',
    };

    const query   = searchTerms[section_key] || section_key.replace(/_/g, ' ') + ' QCS Qatar specifications';
    const keyword = query.split(' ').slice(0, 2).join(' ');

    try {
      // البحث في Supabase عن مقاطع QCS ذات صلة (FTS)
      let qcsChunks = [];
      const ftsRes = await fetch(
        `${SUPA_URL}/rest/v1/qcs_chunks?content=ilike.*${encodeURIComponent(keyword)}*&select=content,source_file,section_name,page_num&limit=6&order=char_count.desc`,
        {
          headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${SUPA_KEY}` },
          signal: AbortSignal.timeout(8000)
        }
      );
      if (ftsRes.ok) qcsChunks = await ftsRes.json();

      // بناء السياق من نص QCS الحقيقي
      const qcsContext = qcsChunks.length > 0
        ? qcsChunks.map((c, i) =>
            `[QCS Source ${i+1}: ${(c.source_file||'').replace(/Copy of /g,'')} | ${c.section_name||''} | p.${c.page_num||'?'}]\n${(c.content||'').slice(0,600)}`
          ).join('\n\n')
        : '';

      // توجيه Gemini لتنسيق محتوى QCS
      const enhancePrompt = `You are formatting Qatar QCS 2024 content for an engineering reference app.

Section: "${section_key}"

Real QCS 2024 source text (English, from official PDFs):
${qcsContext || '⚠️ لم يتم العثور على نصوص QCS مباشرة لهذا القسم في قاعدة البيانات. أجب فقط بما هو موجود أدناه. لا تخترع مواصفات أو أرقام بنود.'}

Task: Create a well-structured HTML section in English that:
1. Uses the real QCS 2024 text above as primary source
2. Formats it as tables, numbered lists, and clear paragraphs
3. Highlights key values (Pass/Fail criteria, limits, tolerances)
4. References exact QCS Part/Section/Clause numbers
5. Adds Hold Points (HP) and Witness Points (WP) where applicable

Return ONLY the HTML content (no outer div wrapper). Use dm-table CSS class for tables.`;

      const genRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: enhancePrompt }] }],
            generationConfig: { maxOutputTokens: 2000, temperature: 0.1 }
          }),
          signal: AbortSignal.timeout(25000)
        }
      );

      const genData = await genRes.json();
      if (!genRes.ok) {
        return new Response(JSON.stringify({ error: genData?.error?.message, status: genRes.status }), {
          status: 502, headers: { ...CORS, 'Content-Type': 'application/json' }
        });
      }

      const enhancedText = genData?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      return new Response(JSON.stringify({
        enhanced:        enhancedText,
        key:             section_key,
        qcs_chunks_used: qcsChunks.length,
        sources:         qcsChunks.map(c => c.source_file).filter(Boolean).slice(0, 3),
      }), {
        status: 200, headers: { ...CORS, 'Content-Type': 'application/json' }
      });

    } catch (e) {
      console.error('[ai-proxy/enhance]', e.message);
      return new Response(JSON.stringify({ error: e.message }), {
        status: 500, headers: { ...CORS, 'Content-Type': 'application/json' }
      });
    }
  }
  // ── End Enhance Action ────────────────────────────────────────────────────

  // ── SSE Streaming Path (v3.0) ──
  const acceptHeader = req.headers.get('accept') || '';
  if (acceptHeader.includes('text/event-stream')) {
    const { messages: sseMessages, max_tokens: sseMT, system: sseSys, qcs_context: sseCtx } = body;
    if (!sseMessages || !Array.isArray(sseMessages) || sseMessages.length === 0) {
      return new Response(JSON.stringify({ error: 'messages required' }), {
        status: 400, headers: { ...CORS, 'Content-Type': 'application/json' }
      });
    }
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'GEMINI_API_KEY not configured' }), {
        status: 500, headers: { ...CORS, 'Content-Type': 'application/json' }
      });
    }

    // بناء الـ system prompt مع QCS context إذا متوفر (B2)
    let sseSystem = sseSys || '';
    if (sseCtx && Array.isArray(sseCtx) && sseCtx.length > 0) {
      const ctxText = sseCtx.slice(0, 4)
        .map((c, i) => `[مصدر ${i + 1}: ${c.section || c.part || 'QCS 2024'}]\n${c.content}`)
        .join('\n\n---\n\n');
      sseSystem = (sseSystem ? sseSystem + '\n\n' : '')
        + `## نصوص QCS 2024 ذات الصلة:\n${ctxText}\n\nأجب بناءً على هذه النصوص واذكر المرجع الدقيق.`;
    }

    const finalSSEMessages = sseSystem
      ? [{ role: 'user', content: `[SYSTEM: ${sseSystem}]\n\n${sseMessages[0]?.content || ''}` }, ...sseMessages.slice(1)]
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
  const { messages, max_tokens, system, qcs_context } = body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: 'messages array required' }), {
      status: 400,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }

  // بناء الـ system prompt مع QCS context إذا متوفر (Hybrid Search B2)
  let finalSystem = system || '';
  if (qcs_context && Array.isArray(qcs_context) && qcs_context.length > 0) {
    const ctxText = qcs_context
      .slice(0, 4) // أقصى 4 chunks
      .map((c, i) => `[مصدر ${i + 1}: ${c.section || c.part || 'QCS 2024'}]\n${c.content}`)
      .join('\n\n---\n\n');
    finalSystem = (finalSystem ? finalSystem + '\n\n' : '')
      + `## نصوص QCS 2024 ذات الصلة (من البحث الدلالي):\n${ctxText}\n\nأجب على السؤال بناءً على هذه النصوص بالدرجة الأولى، واذكر المرجع الدقيق.`;
  }

  // Inject system prompt into first message if provided
  const finalMessages = finalSystem
    ? [{ role: 'user', content: `[SYSTEM: ${finalSystem}]\n\n${messages[0]?.content || ''}` }, ...messages.slice(1)]
    : messages;

  const tokenLimit = Math.min(max_tokens || 2500, 3000); // max 3000 tokens

  // v3.1: retryGemini — exponential backoff (2s→5s→12.5s) + flash fallback
  try {
    const result = await retryGemini(
      () => callGemini(finalMessages, tokenLimit),           // primary: gemini-2.5-pro
      () => callGeminiFallback(finalMessages, tokenLimit),   // fallback: gemini-2.5-flash
    );

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
        const apiKey = process.env.GEMINI_API_KEY;
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

    // تحديد نوع الخطأ لإعطاء رسالة واضحة
    const isQuota   = err.message.includes('quota') || err.message.includes('429');
    const isTimeout = err.message.includes('abort') || err.message.includes('timeout');
    const status    = isQuota ? 429 : isTimeout ? 504 : 502;

    const errorMsg = isQuota
      ? 'حصة Gemini API مستنفدة مؤقتاً — انتظر 60 ثانية وأعد المحاولة (جميع النماذج: 2.5-pro / 2.5-flash / 1.5-flash / 1.5-pro وصلت للحد)'
      : isTimeout
        ? 'انتهت مهلة الاتصال — حاول مرة أخرى'
        : `خطأ في خدمة AI: ${err.message.slice(0, 100)}`;

    console.error(`[ai-proxy] final error (status=${status}): ${err.message.slice(0,120)}`);

    return new Response(
      JSON.stringify({
        error: errorMsg,
        code: isQuota ? 'QUOTA_EXHAUSTED' : 'AI_ERROR',
        retryAfter: isQuota ? 60 : 0,
      }),
      {
        status,
        headers: {
          ...CORS,
          'Content-Type': 'application/json',
          ...(isQuota ? { 'Retry-After': '60' } : {}),
        },
      }
    );
  }
}
