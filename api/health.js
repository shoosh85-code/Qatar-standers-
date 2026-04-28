// /api/health.js — QatarSpec Pro health check
export const config = { runtime: 'edge' };

export default async function handler(req) {
  const checks = {
    gemini: !!process.env.GEMINI_KEY,
    supabase: !!(process.env.NEXT_PUBLIC_SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)),
    jwt: !!process.env.JWT_SECRET,
    promoCodes: !!(process.env.PROMO_CODES || process.env.PRO_CODES),
  };

  const allOk = Object.values(checks).every(Boolean);

  return new Response(JSON.stringify({
    status: allOk ? 'ok' : 'partial',
    timestamp: new Date().toISOString(),
    version: '2.10.0',
    checks,
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
