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
      return new Response(JSON.stringify({
        service: "Payment Portal",
        status: "LIVE",
        payment_method: "Payoneer Only",
        currencies: ["USD", "EUR", "GBP"],
        instructions: "Submit a POST with amount, currency, buyer_email, description to receive payment details.",
        steps: [
          "1. POST your payment details to this endpoint",
          "2. You'll receive the Payoneer address to send funds to",
          "3. Email your receipt to payments@digitaldatalab.kdns.fr",
          "4. Verified leads delivered within 24 hours"
        ]
      }, null, 2), { headers: { ...cors, "Content-Type": "application/json" } });
    }

    if (request.method === "POST") {
      try {
        const { amount, currency, buyer_email, description } = await request.json();
        if (!amount || !buyer_email) {
          return new Response(JSON.stringify({ error: "Amount and buyer_email are required" }, null, 2), {
            status: 400,
            headers: { ...cors, "Content-Type": "application/json" }
          });
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
