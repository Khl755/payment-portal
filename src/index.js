export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") return new Response(null, { headers: cors });

    const email = env.PAYONEER_EMAIL || "khlmehsharmin@gmail.com";
    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Payment Portal</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,sans-serif}
body{background:#f6f8fa;padding:20px;max-width:480px;margin:0 auto}
.box{background:#fff;padding:24px;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.08)}
h1{font-size:20px;margin-bottom:16px}
.info{background:#f0f4ff;padding:12px;border-radius:8px;margin-bottom:16px}
.btn{width:100%;padding:14px;background:#2563eb;color:#fff;border:none;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer}
.btn:hover{background:#1d4ed8}
.note{margin-top:16px;font-size:13px;color:#6b7280;line-height:1.5}
</style>
</head>
<body>
<div class="box">
<h1>💳 Payment Portal</h1>
<div class="info"><p><strong>Payoneer:</strong> ${email}</p></div>
<button class="btn" onclick="navigator.clipboard.writeText('${email}').then(()=>alert('✅ Copied!'))">📋 Copy Payoneer Email</button>
<p class="note">💡 Send payment to this email. Update status after payment.</p>
</div>
</body>
</html>`;

    return new Response(html, { status: 200, headers: { ...cors, "Content-Type": "text/html;charset=utf-8" } });
  }
};
