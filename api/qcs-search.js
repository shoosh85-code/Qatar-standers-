// QatarSpec Pro — QCS 2024 Search (Vector + FTS fallback)
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { query, limit = 5 } = req.body || {};
  if (!query || query.trim().length < 2) {
    return res.status(400).json({ error: 'Query too short' });
  }

  const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPA_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const GEMINI_KEY = process.env.GEMINI_KEY;

  if (!SUPA_URL || !SUPA_KEY) return res.status(500).json({ error: 'Supabase not configured' });

  try {
    let chunks = [];
    let searchMethod = 'fts';

    // ── Try Vector Search first (if embeddings exist) ──
    if (GEMINI_KEY) {
      try {
        // Get embedding from Gemini
        const embedRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${GEMINI_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: 'models/text-embedding-004',
              content: { parts: [{ text: query }] }
            }),
            signal: AbortSignal.timeout(5000)
          }
        );

        if (embedRes.ok) {
          const embedData = await embedRes.json();
          const embedding = embedData?.embedding?.values;

          if (embedding && embedding.length > 0) {
            // Call pgvector search function
            const vecRes = await fetch(`${SUPA_URL}/rest/v1/rpc/search_qcs`, {
              method: 'POST',
              headers: { 
                'apikey': SUPA_KEY, 
                'Authorization': `Bearer ${SUPA_KEY}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                query_embedding: embedding, 
                match_count: limit,
                similarity_threshold: 0.4
              }),
              signal: AbortSignal.timeout(8000)
            });

            if (vecRes.ok) {
              const vecData = await vecRes.json();
              if (Array.isArray(vecData) && vecData.length > 0) {
                chunks = vecData;
                searchMethod = 'vector';
              }
            }
          }
        }
      } catch(e) {
        console.log('[qcs-search] Vector search failed, falling back to FTS:', e.message);
      }
    }

    // ── Fallback: Full Text Search ──
    if (chunks.length === 0) {
      const words = query.trim()
        .replace(/[\u064B-\u065F]/g, '')
        .split(/\s+/)
        .filter(w => w.length > 2)
        .slice(0, 4);

      if (words.length === 0) {
        return res.status(200).json({ results: [], query, method: 'none' });
      }

      const likeFilters = words.map(w => `content.ilike.*${w}*`).join(',');
      const ftsRes = await fetch(
        `${SUPA_URL}/rest/v1/qcs_chunks?or=(${likeFilters})&select=id,source_file,section_name,part_name,page_num,content&limit=${limit}&order=char_count.desc`,
        { 
          headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${SUPA_KEY}` },
          signal: AbortSignal.timeout(8000)
        }
      );

      if (ftsRes.ok) chunks = await ftsRes.json();
    }

    if (!chunks.length) {
      return res.status(200).json({ results: [], query, method: searchMethod });
    }

    const results = chunks.map(c => ({
      id: c.id,
      source: (c.source_file || 'QCS 2024').replace(/Copy of /g, '').trim(),
      section: c.section_name,
      part: c.part_name,
      page: c.page_num,
      content: c.content,
      similarity: c.similarity ? Math.round(c.similarity * 100) + '%' : null
    }));

    return res.status(200).json({ results, query, count: results.length, method: searchMethod });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
