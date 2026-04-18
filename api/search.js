export const config = { runtime: 'nodejs20.x' };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { query, limit = 8 } = req.body || {};
  if (!query || query.trim().length < 2)
    return res.status(400).json({ error: 'Query too short' });

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;
  const OPENAI_KEY  = process.env.OPENAI_API_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY)
    return res.status(500).json({ error: 'Missing Supabase env vars' });

  try {
    let results = [];

    if (OPENAI_KEY) {
      const embRes = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${OPENAI_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'text-embedding-3-small', input: query.trim() }),
      });
      if (embRes.ok) {
        const emb = await embRes.json();
        const rpc = await fetch(`${SUPABASE_URL}/rest/v1/rpc/match_qcs_chunks`, {
          method: 'POST',
          headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ query_embedding: emb.data[0].embedding, match_threshold: 0.3, match_count: limit }),
        });
        if (rpc.ok) results = await rpc.json();
      }
    }

    if (!results.length) {
      const ft = await fetch(
        `${SUPABASE_URL}/rest/v1/qcs_chunks?select=id,content,metadata&limit=${limit}`,
        { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
      );
      if (ft.ok) results = (await ft.json()).map(r => ({ ...r, similarity: null }));
    }

    return res.status(200).json({
      results: results.map(r => ({
        id: r.id,
        content: r.content,
        source: r.metadata?.source || r.metadata?.file_name || 'QCS 2024',
        page: r.metadata?.page || null,
        similarity: r.similarity ? Math.round(r.similarity * 100) : null,
      })),
      count: results.length,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
