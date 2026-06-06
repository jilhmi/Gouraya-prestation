// netlify/functions/get-user-status.js
// Retourne le statut de l'utilisateur (crédits, plan)
// Version simple : crédits gérés côté client (localStorage)
// Pour une version avec base de données, intégrer Supabase ou FaunaDB

exports.handler = async (event) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-User-Credits",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  // Retourne un statut par défaut (le vrai état est géré en localStorage côté client)
  return {
    statusCode: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    body: JSON.stringify({
      credits: 3,
      plan: "free",
      userId: null,
      plans: [
        {
          id: "free",
          name: "Gratuit",
          price: 0,
          credits: 3,
          current: true,
          features: ["3 crédits offerts", "Plan d'affaires", "Statuts", "Lettre de motivation"],
        },
        {
          id: "starter",
          name: "Starter",
          price: 29,
          credits: 20,
          popular: true,
          features: ["20 crédits", "Plans complets 20+ pages", "Export PDF & Word", "Historique illimité"],
        },
        {
          id: "pro",
          name: "Pro",
          price: 79,
          credits: 100,
          features: ["100 crédits", "Génération prioritaire", "Support dédié", "Accès prioritaire"],
        },
      ],
    }),
  };
};
