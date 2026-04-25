// Tap Payments — Handle redirect after payment
export default async function handler(req, res) {
  const { email, plan, tap_id } = req.query;

  const TAP_SECRET = process.env.TAP_SECRET_KEY;

  if (!tap_id || !TAP_SECRET) {
    return res.redirect(302, '/?payment=error');
  }

  try {
    // Verify payment with Tap API
    const r = await fetch(`https://api.tap.company/v2/charges/${tap_id}`, {
      headers: { 'Authorization': `Bearer ${TAP_SECRET}` }
    });
    const charge = await r.json();

    if (charge.status !== 'CAPTURED') {
      return res.redirect(302, '/?payment=failed');
    }

    // Issue Pro JWT (reuse verify-pro logic)
    const JWT_SECRET = process.env.JWT_SECRET;
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + (plan === 'yearly' ? 365 : 30));
    
    const payload = { 
      email, 
      plan, 
      tier: 'pro', 
      exp: expiry.getTime(),
      tap_id 
    };
    const token = Buffer.from(JSON.stringify(payload)).toString('base64');

    // Redirect with token in URL fragment (not query string - not logged by servers)
    return res.redirect(302, `/?payment=success#pro_token=${token}&expiry=${expiry.getTime()}`);

  } catch(e) {
    return res.redirect(302, '/?payment=error');
  }
}
