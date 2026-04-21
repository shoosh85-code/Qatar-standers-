// TEMP diagnostic — delete after fixing
export const config = { runtime: 'edge' };

export default function handler(request) {
  const keys = {
    GEMINI_KEY: process.env.GEMINI_KEY ? `✅ موجود (${process.env.GEMINI_KEY.length} حرف)` : '❌ غير موجود',
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY ? '✅ موجود' : '❌ غير موجود',
    JWT_SECRET: process.env.JWT_SECRET ? '✅ موجود' : '❌ غير موجود',
    NODE_ENV: process.env.NODE_ENV || 'undefined',
  };
  return new Response(JSON.stringify(keys, null, 2), {
    headers: { 'Content-Type': 'application/json' }
  });
}
