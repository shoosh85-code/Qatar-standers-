import https from 'https';
import { withRateLimit } from './rate-limit.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // PROTOCOL 6: rate limit — git-sync حساس جداً (free: 2/min, pro: 10/min)
  const tier = req.headers['x-pro-token'] ? 'pro' : 'free';
  if (!(await withRateLimit(req, res, tier))) return;

  try {
    const { filename, content, message } = req.body;
    if (!filename || !content) return res.status(400).json({ error: 'filename and content required' });

    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER;
    const repo  = process.env.GITHUB_REPO;
    const branch = process.env.GITHUB_BRANCH || 'main';

    if (!token || !owner || !repo) return res.status(500).json({ error: 'GitHub env vars missing' });

    const path = `api/uploads/${filename}`;
    const b64  = Buffer.from(content).toString('base64');

    let sha;
    try {
      const existing = await githubRequest('GET', `/repos/${owner}/${repo}/contents/${path}?ref=${branch}`, null, token);
      sha = existing.sha;
    } catch (e) { sha = undefined; }

    const body = { message: message || `Upload: ${filename}`, content: b64, branch };
    if (sha) body.sha = sha;

    await githubRequest('PUT', `/repos/${owner}/${repo}/contents/${path}`, body, token);
    return res.status(200).json({ success: true, path });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

function githubRequest(method, path, body, token) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path, method,
      headers: { 'Authorization': `token ${token}`, 'User-Agent': 'qatarspec-sync', 'Content-Type': 'application/json' }
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const json = JSON.parse(data);
        if (res.statusCode >= 400) reject(new Error(json.message || 'GitHub API error'));
        else resolve(json);
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}