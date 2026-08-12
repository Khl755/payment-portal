export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), { 
        status: 405, 
        headers: { ...cors, "Content-Type": "application/json" } 
      });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), { 
        status: 400, 
        headers: { ...cors, "Content-Type": "application/json" } 
      });
    }

    const { amount, currency, description } = body;
    const payoneerEmail = env.PAYONEER_EMAIL || "khlmehsharmin@gmail.com";

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Payment Portal</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, sans-serif; }
    body { background: #f6f8fa; padding: 20px; max-width: 480px; margin: 0 auto; }
    .card { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    h1 { font-size: 20px; margin-bottom: 16px; color: #1a1a1a; }
    .info { background: #f0f4ff; padding: 12px; border-radius: 8px; margin-bottom: 16px; }
    .info p { margin: 6px 0; font-size: 15px; color: #2d3748; }
    .label { font-weight: 600; display: inline-block; width: 100px; }
    .pay-btn { width: 100%; padding: 14px; background: #2563eb; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; }
    .pay-btn:hover { background: #1d4ed8; }
    .note { margin-top: 16px; font-size: 13px; color: #6b7280; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="card">
    <h1>💳 Payment Portal</h1>
    <div class="info">
      <p><span class="label">To:</span> ${payoneerEmail}</p>
      <p><span class="label">Amount:</span> ${amount || "0.00"} ${currency || "USD"}</p>
      <p><span class="label">Note:</span> ${description || "Payment"}</p>
    </div>
    <button class="pay-btn" onclick="alert('Send payment to: ${payoneerEmail}')">Pay via Payoneer</button>
    <p class="note">💡 Send payment directly to this Payoneer email. Once paid, update your order status.</p>
  </div>
</body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: { ...cors, "Content-Type": "text/html;charset=utf-8" }
    });
  }
};
