// api/health.js — Health check endpoint
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const hasKey = !!process.env.GEMINI_KEY;
  res.status(hasKey ? 200 : 503).json({
    status: hasKey ? 'ok' : 'error',
    model: 'gemini-1.5-pro',
    service: 'QatarSpec Pro AI Search',
    timestamp: new Date().toISOString()
  });
}
