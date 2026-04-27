// /api/auth/clear-cookie.js — QatarSpec Pro
// Clears the httpOnly Pro cookie on logout
export const config = { runtime: 'edge' };

const CORS = {
  'Access-Control-Allow-Origin': 'https://qatar-standers.vercel.app',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS });
  }

  // Expire the cookie immediately
  const clearCookie = [
    'qs_pro_token=',
    'Max-Age=0',
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Strict',
  ].join('; ');

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      ...CORS,
      'Content-Type': 'application/json',
      'Set-Cookie': clearCookie,
    },
  });
}
