// ============================================================
// QatarSpec Pro — api/search.js  v2.0
// Fixes applied:
//   FIX 2: PDF slice (400KB instead of full 3-5MB)
//   FIX 3: In-memory cache (30min TTL, 50 entries max)
//   FIX 8: Graceful fallback message if all AI fails
//   FIX 10: console.log/error logging throughout
// ============================================================

export const config = { api: { bodyParser: true } };

const BLOB_BASE = 'https://ds8ubkfeifm6jjwv.public.blob.vercel-storage.com';

// ===== FIX 3: Cache =====
const cache = new Map();
const CACHE_TTL = 1000 * 60 * 30;

function getCached(key) {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() - item.timestamp > CACHE_TTL) { cache.delete(key); return null; }
  return item.data;
}

function setCache(key, data) {
  if (cache.size >= 50) cache.delete(cache.keys().next().value);
  cache.set(key, { data, timestamp: Date.now() });
}

// ===== QCS Map =====
const QCS_MAP = [
  { keywords: ['subgrade','تربة طبيعية','ردم','حفر','دمك','proctor','cbr','atterberg','compaction'], parts: [6,7] },
  { keywords: ['subbase','sub-base','grading'], parts: [7,8] },
  { keywords: ['base course','طبقة اساس','crushed','مكسر'], parts: [7,8] },
  { keywords: ['prime coat','tack coat','بريم','تاك','cutback'], parts: [8,9] },
  { keywords: ['binder','wearing','asphalt','اسفلت','marshall','bitumen','خلطة','core'], parts: [8,9,10] },
  { keywords: ['طرق','road','pavement','رصف','crossfall','straightedge','skid','psv'], parts: [6,7,8,9] },
  { keywords: ['مياه الشرب','water supply','kahramaa','hdpe','pressure test','chlorination','كلور'], parts: [20,21,22] },
  { keywords: ['صرف صحي','foul sewer','air test','cctv','manhole','انحدار'], parts: [22,23,24] },
  { keywords: ['صرف سطحي','storm water','gully','بالوعة'], parts: [24,25] },
  { keywords: ['مياه معالجة','treated water','reclaimed','بنفسجي','ري'], parts: [25,26] },
  { keywords: ['خرسانة','concrete','mix design','slump','cube','curing','صب'], parts: [40,41,42] },
  { keywords: ['حديد','rebar','reinforcement','تسليح','tensile','lap','cover'], parts: [40,41] },
  { keywords: ['اساسات','foundation','خوازيق','piles','raft','pit','bearing'], parts: [42,43,44] },
  { keywords: ['شدات','formwork','striking','قالب'], parts: [40,41] },
  { keywords: ['حريق','fire','qcdd','اطفاء','sprinkler','alarm','انذار'], parts: [60,61,62] },
  { keywords: ['جسات','soil investigation','spt','geotechnical','sulphate','borehole','كبريتات'], parts: [2,3,4] },
  { keywords: ['sabkha','سبخة','ملوحة'], parts: [2,3,4,6] },
  { keywords: ['مياه جوفية','groundwater','dewatering'], parts: [2,3,4] },
];

function getRelevantParts(query) {
  const q = query.toLowerCase();
  for (const entry of QCS_MAP) {
    if (entry.keywords.some(k => q.includes(k.toLowerCase()))) return entry.parts.slice(0, 2);
  }
  return [1];
}

// ===== FIX 2: PDF with slice =====
async function fetchPdfBase64(partNum) {
  const url = `${BLOB_BASE}/QCS%202024%20Full%20_Part${partNum}.pdf`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`PDF Part ${partNum} not found (${res.status})`);

  const buffer = await res.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 8192) {
    binary += String.fromCharCode(...bytes.slice(i, i + 8192));
  }
  const fullB64 = btoa(binary);

  // FIX 2: Only send first ~300KB — enough for Gemini to extract text
  const SLICE = 400000;
  const sliced = fullB64.length > SLICE ? fullB64.slice(0, SLICE) : fullB64;
  console.log(`[QatarSpec] PDF Part${partNum}: ${fullB64.length} → ${sliced.length} chars (${Math.round(sliced.length/fullB64.length*100)}%)`);
  return sliced;
}

// ===== Gemini =====
async function askGemini(query, pdfBase64, partNum, key) {
  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [
          { inline_data: { mime_type: 'application/pdf', data: pdfBase64 } },
          { text: `أنت مهندس QCS 2024. أجب بالعربية بدقة من هذا الـ PDF مع ذكر رقم القسم والصفحة.\n\nالسؤال: ${query}` }
        ]}],
        generationConfig: { temperature: 0.1, maxOutputTokens: 2048 }
      })
    }
  );
  if (!r.ok) { const e = await r.json().catch(()=>{}); throw new Error(`Gemini ${r.status}: ${e?.error?.message||''}`); }
  const d = await r.json();
  return d.candidates?.[0]?.content?.parts?.[0]?.text || 'لم أجد إجابة.';
}

// ===== Cloudflare fallback =====
async function askCloudflare(query, partNum, token, accountId) {
  const r = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3.1-70b-instruct`,
    {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: 'أنت مهندس متخصص في QCS 2024. أجب بدقة بالعربية مع ذكر رقم القسم.' },
          { role: 'user', content: `QCS 2024 Part ${partNum}:\n${query}` }
        ],
        max_tokens: 1500, temperature: 0.1
      })
    }
  );
  if (!r.ok) { const e = await r.json().catch(()=>{}); throw new Error(`CF ${r.status}: ${e?.errors?.[0]?.message||''}`); }
  const d = await r.json();
  return d.result?.response || 'لم أجد إجابة.';
}

// ===== Main Handler =====
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
  const { query, partNum: reqPart } = body;

  if (!query?.trim()) return res.status(400).json({ error: 'السؤال مطلوب' });

  // FIX 10: Logging
  console.log(`[QatarSpec] ▶ "${query.slice(0,60)}" | Part: ${reqPart||'auto'}`);

  // FIX 3: Cache check
  const cacheKey = `${query.trim().toLowerCase()}_${reqPart||'auto'}`;
  const cached = getCached(cacheKey);
  if (cached) {
    console.log(`[QatarSpec] ✓ Cache HIT`);
    return res.status(200).json({ ...cached, cached: true });
  }

  const parts = reqPart ? [reqPart] : getRelevantParts(query);
  const targetPart = parts[0];
  const GEMINI_KEY = process.env.GEMINI_KEY;
  const CF_TOKEN = process.env.CF_TOKEN;
  const CF_ACCOUNT_ID = process.env.CF_ACCOUNT_ID;

  let answer = null;
  let model = null;

  // Strategy 1: Gemini + PDF
  if (GEMINI_KEY) {
    try {
      console.log(`[QatarSpec] → Gemini Part ${targetPart}...`);
      const pdf = await fetchPdfBase64(targetPart);
      answer = await askGemini(query, pdf, targetPart, GEMINI_KEY);
      model = 'Gemini 1.5 Pro + QCS PDF';
      console.log(`[QatarSpec] ✓ Gemini OK`);
    } catch(e) {
      console.error(`[QatarSpec] ✗ Gemini: ${e.message}`);
    }
  }

  // Strategy 2: Cloudflare fallback
  if (!answer && CF_TOKEN && CF_ACCOUNT_ID) {
    try {
      console.log(`[QatarSpec] → Cloudflare fallback...`);
      answer = await askCloudflare(query, targetPart, CF_TOKEN, CF_ACCOUNT_ID);
      model = 'Cloudflare Llama';
      console.log(`[QatarSpec] ✓ Cloudflare OK`);
    } catch(e) {
      console.error(`[QatarSpec] ✗ Cloudflare: ${e.message}`);
    }
  }

  // FIX 8: Graceful fallback
  if (!answer) {
    console.error(`[QatarSpec] ✗ ALL strategies failed`);
    return res.status(200).json({
      answer: '⚠️ الخدمة مش متاحة حالياً، حاول مرة تانية بعد قليل.\n\nللمساعدة الفورية، ابحث في الأقسام المناسبة من التطبيق أو راجع QCS 2024 مباشرة.',
      partNum: targetPart, model: 'fallback', source: `QCS 2024 Part ${targetPart}`
    });
  }

  const result = { answer, partNum: targetPart, model, source: `QCS 2024 Part ${targetPart}` };
  setCache(cacheKey, result);
  return res.status(200).json(result);
}
