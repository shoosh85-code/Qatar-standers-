// Secure admin endpoint - issues a session token for testing
// Access: POST /api/admin-session with { secret: process.env.ADMIN_SECRET }
// Returns: { token } stored in client sessionStorage (not URL)
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { secret } = req.body || {};
  const ADMIN_SECRET = process.env.ADMIN_SECRET;

  if (!ADMIN_SECRET) return res.status(503).json({ error: 'Not configured' });
  if (!secret || secret !== ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Issue a short-lived session token (24h)
  const token = Buffer.from(`admin:${Date.now()}:${Math.random()}`).toString('base64');
  
  res.status(200).json({ 
    token,
    expires: Date.now() + 86400000,
    message: 'Store this token in sessionStorage key: qs_admin_token'
  });
}
