module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!URL || !KEY) {
    return res.send(`<h2 style="color:red">❌ Supabase env vars missing</h2>`);
  }

  let html = `<h2>🔌 Supabase: <code>${URL}</code></h2><hr>`;

  // 1. List all tables
  try {
    const r = await fetch(`${URL}/rest/v1/`, {
      headers: { 'apikey': KEY, 'Authorization': `Bearer ${KEY}` }
    });
    html += `<p>Connection: HTTP ${r.status} ${r.ok ? '✅' : '❌'}</p>`;
  } catch(e) {
    html += `<p>❌ Connection error: ${e.message}</p>`;
  }

  // 2. Try common table names and count rows
  const tables = ['documents', 'chunks', 'embeddings', 'qcs_chunks', 'specs', 'content'];
  html += `<h3>جداول البيانات:</h3>`;

  for (const table of tables) {
    try {
      const r = await fetch(`${URL}/rest/v1/${table}?select=count`, {
        headers: {
          'apikey': KEY,
          'Authorization': `Bearer ${KEY}`,
          'Prefer': 'count=exact',
          'Range': '0-0'
        }
      });
      if (r.status === 200 || r.status === 206) {
        const count = r.headers.get('content-range') || '?';
        html += `<p>✅ <b>${table}</b>: ${count} صفوف</p>`;
      } else if (r.status === 404 || r.status === 400) {
        html += `<p style="color:gray">— <b>${table}</b>: غير موجود</p>`;
      } else {
        html += `<p>⚠️ <b>${table}</b>: HTTP ${r.status}</p>`;
      }
    } catch(e) {
      html += `<p>❌ <b>${table}</b>: ${e.message}</p>`;
    }
  }

  // 3. Test search_qcs function
  html += `<h3>دالة البحث search_qcs:</h3>`;
  try {
    const r = await fetch(`${URL}/rest/v1/rpc/search_qcs`, {
      method: 'POST',
      headers: {
        'apikey': KEY,
        'Authorization': `Bearer ${KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query_text: 'concrete', max_results: 3 })
    });
    const data = await r.json();
    if (r.ok && Array.isArray(data)) {
      html += `<p>✅ search_qcs تعمل — رجعت <b>${data.length}</b> نتيجة لكلمة "concrete"</p>`;
      if (data.length > 0) {
        html += `<p style="background:#f0f0f0;padding:10px;font-size:12px">
          مثال: ${JSON.stringify(data[0]).slice(0, 300)}
        </p>`;
      }
    } else {
      html += `<p>❌ search_qcs: HTTP ${r.status} — ${JSON.stringify(data).slice(0, 300)}</p>`;
    }
  } catch(e) {
    html += `<p>❌ search_qcs error: ${e.message}</p>`;
  }

  res.send(`<!DOCTYPE html><html><body style="font-family:sans-serif;padding:30px;direction:rtl;max-width:800px">${html}
  <hr><p style="color:gray;font-size:11px">احذف هذا الملف بعد الاختبار</p></body></html>`);
};
