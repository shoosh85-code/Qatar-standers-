// اختبار Cloudflare Workers AI
module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  const CF_TOKEN      = process.env.CF_TOKEN;
  const CF_ACCOUNT_ID = process.env.CF_ACCOUNT_ID;

  if (!CF_TOKEN || !CF_ACCOUNT_ID) {
    return res.send(`<h2 style="color:red">❌ CF_TOKEN أو CF_ACCOUNT_ID غير موجود</h2>`);
  }

  const tokenPreview   = CF_TOKEN.slice(0, 6) + '...' + CF_TOKEN.slice(-4);
  const accountPreview = CF_ACCOUNT_ID.slice(0, 8) + '...';
  let html = `
    <h2>✅ CF_TOKEN: <code>${tokenPreview}</code></h2>
    <h2>✅ CF_ACCOUNT_ID: <code>${accountPreview}</code></h2><hr>`;

  const models = [
    '@cf/meta/llama-3.1-8b-instruct',
    '@cf/meta/llama-3.2-3b-instruct',
  ];

  for (const model of models) {
    try {
      const url = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/ai/run/${model}`;
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${CF_TOKEN}` },
        body: JSON.stringify({ messages: [{ role: 'user', content: 'Reply one word: WORKING' }], max_tokens: 10 }),
      });
      const data = await r.json();
      if (r.ok && data?.success) {
        const text = data?.result?.response || '(empty)';
        html += `<p>✅ <b>${model}</b>: ${text}</p>`;
      } else {
        const err = data?.errors?.[0]?.message || JSON.stringify(data).slice(0, 200);
        html += `<p>❌ <b>${model}</b> HTTP ${r.status}: ${err}</p>`;
      }
    } catch (err) {
      html += `<p>❌ <b>${model}</b>: ${err.message}</p>`;
    }
  }

  res.send(`<!DOCTYPE html><html><body style="font-family:sans-serif;padding:30px;direction:rtl">${html}</body></html>`);
};
