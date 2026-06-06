// netlify/functions/create-checkout.js
// Intégration Stripe pour l'achat de crédits
// Pour activer : ajouter STRIPE_SECRET_KEY dans les variables d'environnement Netlify

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;

// Prix Stripe à créer dans votre dashboard stripe.com
const PRICE_IDS = {
  starter: process.env.STRIPE_PRICE_STARTER || null,
  pro: process.env.STRIPE_PRICE_PRO || null,
};

exports.handler = async (event) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  if (!STRIPE_KEY) {
    return {
      statusCode: 503,
      headers: corsHeaders,
      body: JSON.stringify({
        error: "Paiement non encore configuré. Contactez contact@gouraya-prestations.fr pour acheter des crédits.",
      }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: "Requête invalide." }) };
  }

  const { planId } = body;
  const priceId = PRICE_IDS[planId];

  if (!priceId) {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: "Plan inconnu." }) };
  }

  try {
    const stripe = require("stripe")(STRIPE_KEY);
    const baseUrl = event.headers.origin || "https://gourayaprestations.netlify.app";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${baseUrl}/outils.html?payment=success`,
      cancel_url: `${baseUrl}/outils.html?payment=cancelled`,
      locale: "fr",
    });

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ checkoutUrl: session.url }),
    };
  } catch (err) {
    console.error("Stripe error:", err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Erreur paiement. Contactez le support." }),
    };
  }
};
