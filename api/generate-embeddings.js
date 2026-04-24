// QatarSpec Pro — Generate embeddings for QCS chunks
// POST /api/generate-embeddings { admin_secret, batch_size, offset }
// Run multiple times with increasing offset to process all chunks

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  // Auth via URL query param: ?key=YOUR_ADMIN_SECRET
  const urlKey = new URL(req.url, 'https://x').searchParams.get('key');
  const bodyData = req.body || {};
  const batch_size = parseInt(bodyData.batch_size || 50);
  const offset = parseInt(bodyData.offset || 0);
  
  // Accept either URL key or env var match
  const ADMIN = process.env.ADMIN_SECRET || '';
  if (!urlKey || (ADMIN && urlKey !== ADMIN)) {
    // Allow if ADMIN_SECRET not set (setup mode)
    if (ADMIN) return res.status(401).json({ error: 'Unauthorized — pass ?key=ADMIN_SECRET in URL' });
  }

  const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPA_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const GEMINI_KEY = process.env.GEMINI_KEY;

  if (!SUPA_URL || !SUPA_KEY || !GEMINI_KEY) {
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

  let processed = 0, failed = 0;

  for (const chunk of chunks) {
    try {
      // Get embedding from Gemini
      const embedRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${GEMINI_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'models/text-embedding-004',
            content: { parts: [{ text: chunk.content.slice(0, 2000) }] }
          }),
          signal: AbortSignal.timeout(10000)
        }
      );

      if (!embedRes.ok) { failed++; continue; }
      const embedData = await embedRes.json();
      const embedding = embedData?.embedding?.values;
      if (!embedding?.length) { failed++; continue; }

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
    remaining: parseInt(remaining),
    next_offset: offset + batch_size,
    message: `Done. ${remaining} chunks still need embeddings.`
  });
}
