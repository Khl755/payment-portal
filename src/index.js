export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method === "GET") {
      const payoneerEmail = env.PAYONEER_EMAIL || "khlmehsharmin@gmail.com";

      return new Response(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Portal | Digital Data Lab</title>
  <style>
    * {box-sizing:border-box;margin:0;padding:0}
    body{font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;color:#1e293b;line-height:1.6;padding:20px}
    .container{max-width:640px;margin:0 auto;background:white;border-radius:16px;padding:36px;box-shadow:0 4px 20px rgba(0,0,0,0.07)}
    .badge{display:inline-block;background:#dcfce7;color:#166534;padding:4px 12px;border-radius:20px;font-size:13px;font-weight:600;margin-bottom:16px}
    h1{color:#0f172a;font-size:26px;margin-bottom:8px}
    .sub{color:#64748b;margin-bottom:28px;font-size:15px}
    .pay-box{background:#f0f9ff;border:1px solid #bae6fd;border-radius:12px;padding:24px;margin-bottom:24px}
    .pay-box strong{display:block;font-size:15px;color:#0f172a;margin-bottom:6px}
    .pay-email{font-size:20px;font-weight:700;color:#2563eb;word-break:break-all}
    .pay-note{font-size:13px;color:#64748b;margin-top:8px}
    .steps{margin-bottom:28px}
    .steps h2{font-size:18px;margin-bottom:12px;color:#0f172a}
    .steps ol{padding-left:20px}
    .steps li{margin:8px 0;font-size:15px}
    .currencies{display:flex;gap:8px;margin-top:12px}
    .currency{background:#f1f5f9;border:1px solid #e2e8f0;padding:6px 14px;border-radius:8px;font-size:14px;font-weight:600}
    form{display:grid;gap:14px;margin-top:24px}
    label{font-weight:500;font-size:14px}
    input,textarea{width:100%;padding:12px;border:1px solid #cbd5e1;border-radius:8px;font-size:15px}
    button{background:#2563eb;color:white;border:none;padding:14px;font-size:16px;font-weight:600;border-radius:8px;cursor:pointer}
    .footer{margin-top:28px;padding-top:20px;border-top:1px solid #e2e8f0;font-size:13px;color:#94a3b8;text-align:center}
    #result{margin-top:16px;padding:16px;border-radius:8px;display:none;white-space:pre-wrap;font-size:14px}
    .success{background:#f0fdf4;color:#166534;border:1px solid #bbf7d0}
    .error{background:#fef2f2;color:#991b1b;border:1px solid #fecaca}
  </style>
</head>
<body>
  <div class="container">
    <span class="badge">✅ LIVE</span>
    <h1>Payment Portal</h1>
    <p class="sub">Pay securely via Payoneer — withdraw directly to your bank anytime.</p>
    <div class="pay-box">
      <strong>Send Payment To (Payoneer)</strong>
      <div class="pay-email">${payoneerEmail}</div>
      <div class="pay-note">Funds arrive in our Payoneer account — withdraw from Payoneer to your bank.</div>
      <div class="currencies">
        <span class="currency">USD</span>
        <span class="currency">EUR</span>
        <span class="currency">GBP</span>
      </div>
    </div>
    <div class="steps">
      <h2>How It Works</h2>
      <ol>
        <li><strong>Send payment</strong> to the Payoneer email shown above</li>
        <li><strong>Save your receipt</strong> — screenshot or PDF</li>
        <li><strong>Email receipt</strong> to payments@digitaldatalab.kdns.fr</li>
        <li><strong>Receive leads</strong> within 24 hours ✅</li>
      </ol>
    </div>
    <form id="payForm">
      <h2 style="font-size:18px;color:#0f172a;margin-bottom:4px">Request Payment Instructions</h2>
      <div><label>Amount</label><input type="number" name="amount" placeholder="e.g. 99" required></div>
      <div><label>Currency</label><input type="text" name="currency" value="USD"></div>
      <div><label>Your Email</label><input type="email" name="buyer_email" placeholder="you@example.com" required></div>
      <div><label>Description</label><textarea name="description" rows="2" placeholder="e.g. 500 verified leads"></textarea></div>
      <button type="submit">Get Instructions</button>
    </form>
    <pre id="result"></pre>
    <div class="footer">Digital Data Lab — Verified Leads<br>Only Payoneer accepted.</div>
  </div>
  <script>
    const form = document.getElementById("payForm");
    const result = document.getElementById("result");
    form.addEventListener("submit", async e => {
      e.preventDefault();
      result.style.display = "none";
      const fd = new FormData(form);
      const data = Object.fromEntries(fd);
      try {
        const res = await fetch("/", {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(data)
        });
        const json = await res.json();
        result.textContent = JSON.stringify(json, null, 2);
        result.className = res.ok ? "success" : "error";
      } catch {
        result.textContent = "❌ Network error — try again.";
        result.className = "error";
      }
      result.style.display = "block";
    });
  </script>
</body>
</html>`, { headers: { ...cors, "Content-Type": "text/html;charset=UTF-8" } });
    }

    if (request.method === "POST") {
      try {
        const { amount, currency, buyer_email, description } = await request.json();
        if (!amount || !buyer_email) {
          return new Response(JSON.stringify({error:"Amount and buyer_email are required"}), {status:400, headers:cors});
        }
        const payoneerEmail = env.PAYONEER_EMAIL || "khlmehsharmin@gmail.com";
        return new Response(JSON.stringify({
          success: true,
          amount: amount,
          currency: currency || "USD",
          send_payment_to: payoneerEmail,
          note: `From: ${buyer_email} — ${description || "Lead List"}`,
          info: "✅ Funds in Payoneer → withdraw to your bank anytime"
        }, null, 2), {headers: {...cors, "Content-Type":"application/json"}});
      } catch {
        return new Response(JSON.stringify({error:"Invalid JSON"}), {status:400, headers:cors});
      }
    }
    return new Response("Use GET or POST only", {status:405, headers:cors});
  }
};
        }
        return new Response(JSON.stringify({
          success: true,
          amount: amount,
          currency: currency || "USD",
          send_to: env.PAYONEER_EMAIL || "not configured",
          note: `From: ${buyer_email} — ${description || "Lead List Purchase"}`,
          withdraw: "Funds in Payoneer, withdraw to your bank anytime"
        }, null, 2), { headers: { ...cors, "Content-Type": "application/json" } });
      } catch {
        return new Response(JSON.stringify({ error: "Invalid JSON" }, null, 2), {
          status: 400,
          headers: { ...cors, "Content-Type": "application/json" }
        });
      }
    }

    return new Response("Use GET or POST only", { status: 405, headers: cors });
  }
};
        if (!amount || !buyer_email) {
          return new Response(JSON.stringify({
            error: "Amount and buyer_email are required"
          }, null, 2), { status: 400, headers: { ...cors, "Content-Type": "application/json" } });
        }

        return new Response(JSON.stringify({
          success: true,
          amount: amount,
          currency: currency || "USD",
          send_payment_to: env.PAYONEER_EMAIL || "your-payoneer@email.com",
          payment_note: `From: ${buyer_email} — ${description || "Verified Lead List"}`,
          withdraw_info: "✅ Funds received in Payoneer — withdraw anytime to your bank directly from Payoneer",
          next_steps: [
            `Send ${amount} ${currency || "USD"} to Payoneer email above`,
            "Save your transaction receipt",
            "Email receipt to payments@digitaldatalab.kdns.fr",
            "Leads delivered within 24 hours"
          ]
        }, null, 2), { headers: { ...cors, "Content-Type": "application/json" } });

      } catch (err) {
        return new Response(JSON.stringify({ error: "Invalid JSON" }, null, 2), { status: 400, headers: { ...cors, "Content-Type": "application/json" } });
      }
    }

    return new Response("Use GET or POST only", { status: 405, headers: cors });
  }
};
