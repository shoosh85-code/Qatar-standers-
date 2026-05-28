// api/gemini-models.js — QatarSpec Pro
// Diagnostic: list available Gemini models for this API key
// Usage: GET /api/gemini-models

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).json({ error: 'GET فقط' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.length < 20) {
    return res.status(500).json({ error: 'GEMINI_API_KEY غير مُعيَّن' });
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}&pageSize=50`;
    const r = await fetch(url);
    const data = await r.json();

    if (!r.ok) {
      return res.status(r.status).json({
        error: data?.error?.message || 'Gemini API error',
        status: r.status,
        hint: r.status === 400 ? 'API key غير صالح' : 'تحقق من صلاحية المفتاح'
      });
    }

    // فلتر الموديلات التي تدعم generateContent (أي تدعم الصور/نص)
    const models = (data.models || []).map(m => ({
      name: m.name?.replace('models/', ''),
      displayName: m.displayName,
      supportedMethods: m.supportedGenerationMethods || [],
      inputTokenLimit: m.inputTokenLimit,
    }));

    const visionModels = models.filter(m =>
      m.supportedMethods.includes('generateContent')
    );

    return res.status(200).json({
      total: models.length,
      visionCapable: visionModels.length,
      visionModels: visionModels.map(m => m.name),
      allModels: models,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
