export default async function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');

  const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const SVC = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const useKey = SVC || KEY;

  let html = '<div style="font-family:monospace;padding:20px;direction:ltr">';
  
  // 1. Get first row of qcs_chunks to see columns
  try {
    const r = await fetch(`${URL}/rest/v1/qcs_chunks?limit=1`, {
      headers: { 'apikey': useKey, 'Authorization': `Bearer ${useKey}` }
    });
    const data = await r.json();
    if (r.ok && data.length > 0) {
      const cols = Object.keys(data[0]);
      html += `<h3>✅ qcs_chunks columns:</h3><pre>${cols.join('\n')}</pre>`;
      
      // Show first row without embedding (too long)
      const sample = {...data[0]};
      if (sample.embedding) sample.embedding = `[vector of ${JSON.parse(sample.embedding||'[]').length || '?'} dims]`;
      if (typeof sample.content === 'string') sample.content = sample.content.slice(0,200) + '...';
      html += `<h3>Sample row:</h3><pre>${JSON.stringify(sample, null, 2)}</pre>`;
    } else {
      html += `<p>❌ qcs_chunks: ${r.status} — ${JSON.stringify(data).slice(0,200)}</p>`;
    }
  } catch(e) { html += `<p>❌ ${e.message}</p>`; }

  // 2. Count chunks with embeddings
  try {
    const r = await fetch(`${URL}/rest/v1/qcs_chunks?embedding=not.is.null&select=id`, {
      headers: { 'apikey': useKey, 'Authorization': `Bearer ${useKey}`, 'Prefer': 'count=exact', 'Range': '0-0' }
    });
    const count = r.headers.get('content-range') || '?';
    html += `<h3>Chunks WITH embeddings: ${count}</h3>`;
  } catch(e) {}

  // 3. Check pgvector via SQL
  try {
    const r = await fetch(`${URL}/rest/v1/rpc/version`, {
      method: 'POST',
      headers: { 'apikey': useKey, 'Authorization': `Bearer ${useKey}`, 'Content-Type': 'application/json' },
      body: '{}'
    });
    html += `<p>Supabase RPC test: ${r.status}</p>`;
  } catch(e) {}

  html += '</div>';
  res.status(200).send(`<!DOCTYPE html><html><body>${html}</body></html>`);
}
