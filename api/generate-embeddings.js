// QatarSpec Pro — Generate embeddings for QCS chunks
// POST /api/generate-embeddings { admin_secret, batch_size, offset }
// Run multiple times with increasing offset to process all chunks
import { rateLimit, applyRateLimitHeaders, getIp } from './rate-limit.js';
import { getSupabaseUrl, getSupabaseServiceKey } from '../lib/supabase.js';

export default async function handler(req, res) {
  // ── Rate Limiting (Protocol 6) — 2/min free | 20/min pro ─────────────────
  const ip    = getIp(req);
  const isPro = false; // endpoint معطّل — admin فقط — بدون JWT
  const rl    = await rateLimit(req, isPro ? 'pro' : 'free', 'generate-embeddings');
  applyRateLimitHeaders(res, rl);
  if (!rl.allowed) {
    return res.status(429).json({
      error: 'Too Many Requests',
      retryAfter: rl.retryAfter,
      message: `[${ip}] حاول مرة أخرى بعد ${rl.retryAfter} ثانية`,
    });
  }
  // ──────────────────────────────────────────────────────────────────────────

  // Admin secret protection — يجب تمرير ADMIN_SECRET في الـ body
  if (req.method !== 'POST') return res.status(405).end();
  const bodyData = req.body || {};
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret || bodyData.admin_secret !== adminSecret) {
    return res.status(403).json({ error: 'Forbidden — admin_secret required' });
  }
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  // List available models action
  if (bodyData.action === 'list_models') {
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`);
      const data = await r.json();
      const embModels = (data.models || [])
        .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('embedContent'))
        .map(m => m.name);
      return res.json({ embedding_models: embModels, total_models: data.models?.length || 0 });
    } catch(e) { return res.status(500).json({ error: e.message }); }
  }

  const batch_size = parseInt(bodyData.batch_size || 50);
  const offset = parseInt(bodyData.offset || 0);

  const SUPA_URL = getSupabaseUrl();
  const SUPA_KEY = getSupabaseServiceKey();

  if (!SUPA_URL || !SUPA_KEY || !GEMINI_API_KEY) {
    return res.status(503).json({ error: 'Missing env vars' });
  }

  // Get chunks without embeddings
  const chunksRes = await fetch(
    `${SUPA_URL}/rest/v1/qcs_chunks?embedding=is.null&select=id,content&limit=${batch_size}&offset=${offset}&order=id.asc`,
    { headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${SUPA_KEY}` } }
  );

  if (!chunksRes.ok) {
    return res.status(500).json({ error: 'Failed to fetch chunks' });
  }

  const chunks = await chunksRes.json();
  if (!chunks.length) {
    return res.status(200).json({ message: 'All chunks already have embeddings!', processed: 0 });
  }

  let processed = 0, failed = 0, firstError = null;

  for (const chunk of chunks) {
    try {
      // Get embedding from Gemini
      const embedRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'models/gemini-embedding-001',
            content: { parts: [{ text: chunk.content.slice(0, 2000) }] }
          }),
          signal: AbortSignal.timeout(10000)
        }
      );

      if (!embedRes.ok) { 
        if (!firstError) firstError = `Gemini ${embedRes.status}: ${(await embedRes.text()).slice(0,200)}`;
        failed++; continue; 
      }
      const embedData = await embedRes.json();
      const embedding = embedData?.embedding?.values;
      if (!embedding?.length) { 
        if (!firstError) firstError = 'No embedding in response: ' + JSON.stringify(embedData).slice(0,200);
        failed++; continue; 
      }

      // Save to Supabase
      const updateRes = await fetch(
        `${SUPA_URL}/rest/v1/qcs_chunks?id=eq.${chunk.id}`,
        {
          method: 'PATCH',
          headers: {
            'apikey': SUPA_KEY,
            'Authorization': `Bearer ${SUPA_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({ embedding: `[${embedding.join(',')}]` })
        }
      );

      if (updateRes.ok) processed++;
      else failed++;

      // Small delay to avoid rate limits
      await new Promise(r => setTimeout(r, 100));

    } catch(e) {
      failed++;
    }
  }

  // Count remaining
  const countRes = await fetch(
    `${SUPA_URL}/rest/v1/qcs_chunks?embedding=is.null&select=id`,
    { headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${SUPA_KEY}`, 'Prefer': 'count=exact', 'Range': '0-0' } }
  );
  const remaining = countRes.headers.get('content-range')?.split('/')[1] || '?';

  return res.status(200).json({
    processed,
    failed,
    firstError: firstError || null,
    remaining: parseInt(remaining),
    next_offset: offset + batch_size,
    message: `Done. ${remaining} chunks still need embeddings.`
  });
}
