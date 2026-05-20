import { withRateLimit } from './rate-limit.js';

export default async function handler(req, res) {
  // PROTOCOL 6: rate limit
  const tier = req.headers['x-pro-token'] ? 'pro' : 'free';
  if (!(await withRateLimit(req, res, tier))) return;

  const KEY = process.env.GEMINI_API_KEY;
  if (!KEY) return res.status(500).json({ error: 'No GEMINI_API_KEY' });
  
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${KEY}`);
    const data = await r.json();
    const embeddingModels = (data.models || [])
      .filter(m => m.supportedGenerationMethods?.includes('embedContent'))
      .map(m => ({ name: m.name, displayName: m.displayName }));
    
    return res.json({ 
      total: data.models?.length || 0,
      embedding_models: embeddingModels 
    });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}
