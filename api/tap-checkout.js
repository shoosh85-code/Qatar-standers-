// Tap Payments — Create checkout session for QatarSpec Pro subscription
// Docs: https://developers.tap.company/
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const TAP_SECRET = process.env.TAP_SECRET_KEY;
  if (!TAP_SECRET) {
    return res.status(503).json({ error: 'Payment not configured' });
  }

  const { email, name, plan = 'monthly' } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Email required' });

  const PLANS = {
    monthly: { amount: 99,  currency: 'QAR', desc: 'QatarSpec Pro — شهري' },
    yearly:  { amount: 799, currency: 'QAR', desc: 'QatarSpec Pro — سنوي (وفر 33%)' },
  };

  const p = PLANS[plan] || PLANS.monthly;
  const redirectBase = process.env.APP_URL || 'https://qatar-standers.vercel.app';

  try {
    const r = await fetch('https://api.tap.company/v2/charges', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TAP_SECRET}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: p.amount,
        currency: p.currency,
        customer_initiated: true,
        threeDSecure: true,
        save_card: false,
        description: p.desc,
        metadata: { plan, email },
        reference: { transaction: `QS-${Date.now()}`, order: `PRO-${plan.toUpperCase()}` },
        receipt: { email: true, sms: false },
        customer: {
          first_name: name || 'Engineer',
          email: { address: email },
        },
        source: { id: 'src_all' },
        post: { url: `${redirectBase}/api/tap-webhook` },
        redirect: { url: `${redirectBase}/api/tap-callback?email=${encodeURIComponent(email)}&plan=${plan}` },
      }),
    });

    const data = await r.json();

    if (!r.ok || !data.transaction?.url) {
      console.error('[Tap] Error:', JSON.stringify(data));
      return res.status(502).json({ error: 'Payment gateway error', details: data.errors?.[0]?.description });
    }

    return res.status(200).json({ 
      checkout_url: data.transaction.url,
      charge_id: data.id 
    });

  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}
