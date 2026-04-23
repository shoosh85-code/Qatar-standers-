export default async function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');

  const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const SVC = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!URL || !KEY) return res.status(500).send('<h2>❌ Supabase env vars missing</h2>');

  let html = `<div style="font-family:Arial;padding:20px;direction:rtl;max-width:800px">
<h2>🔌 Supabase: <code style="font-size:12px">${URL}</code></h2>
<p>ANON_KEY: ${KEY ? '✅ موجود' : '❌'} | SERVICE_KEY: ${SVC ? '✅ موجود' : '⚠️ غير موجود'}</p><hr>`;

  // Test connection
  try {
    const r = await fetch(`${URL}/rest/v1/`, {
      headers: { 'apikey': KEY, 'Authorization': `Bearer ${KEY}` }
    });
    html += `<p>✅ اتصال Supabase: HTTP ${r.status}</p>`;
  } catch(e) {
    html += `<p>❌ خطأ في الاتصال: ${e.message}</p>`;
  }

  // Check tables
  html += '<h3>الجداول الموجودة:</h3>';
  const tables = ['users', 'rate_limits', 'qcs_chunks', 'documents', 'chunks', 'embeddings'];
  for (const t of tables) {
    try {
      const r = await fetch(`${URL}/rest/v1/${t}?select=count`, {
        headers: { 'apikey': KEY, 'Authorization': `Bearer ${KEY}`, 'Prefer': 'count=exact', 'Range': '0-0' }
      });
      const count = r.headers.get('content-range') || '?';
      html += r.ok ? `<p>✅ <b>${t}</b>: ${count} صفوف</p>` : `<p style="color:gray">— <b>${t}</b>: غير موجود (${r.status})</p>`;
    } catch(e) { html += `<p>❌ ${t}: ${e.message}</p>`; }
  }

  // Check pgvector extension
  html += '<h3>pgvector:</h3>';
  try {
    const r = await fetch(`${URL}/rest/v1/rpc/search_qcs`, {
      method: 'POST',
      headers: { 'apikey': KEY, 'Authorization': `Bearer ${KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query_embedding: Array(768).fill(0), match_count: 1 })
    });
    const d = await r.json();
    html += r.ok ? `<p>✅ search_qcs function موجودة</p>` : `<p>❌ search_qcs: ${r.status} — ${JSON.stringify(d).slice(0,100)}</p>`;
  } catch(e) { html += `<p>❌ search_qcs: ${e.message}</p>`; }

  html += '</div>';
  res.status(200).send(`<!DOCTYPE html><html><body>${html}</body></html>`);
}
