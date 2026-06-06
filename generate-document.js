// netlify/functions/generate-document.js
// Clé API Anthropic stockée en variable d'environnement Netlify (jamais exposée au client)

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = "claude-sonnet-4-20250514";

// Coût en crédits par type de document
const COSTS = { "business-plan": 2, statuts: 1, "lettre-motivation": 1 };

// ── Prompts ──────────────────────────────────────────────────────────────────

function buildPromptBP(data) {
  return `Tu es un expert en création d'entreprise et en rédaction de business plans professionnels.

Génère un plan d'affaires COMPLET et DÉTAILLÉ en français pour :
- Entreprise : ${data.nom}
- Secteur : ${data.secteur}
- Pays / Région / Ville : ${data.pays} / ${data.province || "–"} / ${data.ville}
- Effectif prévu : ${data.employes}
- Description : ${data.description}
- Produits/Services : ${data.produits}
- Clientèle cible : ${data.cible}
- Concurrents : ${data.concurrents || "À analyser"}
- Investissement initial : ${data.investissement || "À définir"}
- Sources de financement : ${data.financement || "Fonds propres"}
- Objectifs 3 ans : ${data.objectifs || "Croissance rentable"}

STRUCTURE OBLIGATOIRE (23 sections numérotées, minimum 10 000 mots au total) :

1. PAGE DE GARDE
2. SOMMAIRE EXÉCUTIF (800 mots)
3. PRÉSENTATION DE L'ENTREPRISE
4. ANALYSE DU MARCHÉ ET DU SECTEUR
5. ANALYSE DE LA CONCURRENCE
6. ANALYSE SWOT (Forces / Faiblesses / Opportunités / Menaces)
7. STRATÉGIE MARKETING ET COMMERCIALE
8. PLAN OPÉRATIONNEL
9. RESSOURCES HUMAINES ET ORGANISATION
10. PLAN JURIDIQUE ET RÉGLEMENTAIRE
11. PLAN FINANCIER — HYPOTHÈSES ET PARAMÈTRES
12. COMPTE DE RÉSULTAT PRÉVISIONNEL ANNÉE 1 (tableau détaillé avec chiffres)
13. COMPTE DE RÉSULTAT PRÉVISIONNEL ANNÉE 2
14. COMPTE DE RÉSULTAT PRÉVISIONNEL ANNÉE 3
15. PLAN DE TRÉSORERIE MENSUEL (Année 1)
16. BILAN PRÉVISIONNEL (Actif / Passif)
17. CALCUL DU SEUIL DE RENTABILITÉ
18. PLAN DE FINANCEMENT INITIAL
19. INDICATEURS CLÉS DE PERFORMANCE (KPIs)
20. ANALYSE DES RISQUES ET PLAN DE CONTINGENCE
21. STRATÉGIE DE CROISSANCE ET DÉVELOPPEMENT
22. CALENDRIER ET ÉTAPES CLÉS (Gantt simplifié)
23. CONCLUSION ET PERSPECTIVES

IMPORTANT :
- Utilise des données chiffrées RÉALISTES et cohérentes avec le secteur et le pays
- Les tableaux financiers doivent avoir des colonnes alignées (texte)
- Adapte le contenu au contexte local (réglementation, marché, culture)
- Rédige en français professionnel, style analytique
- Minimum 10 000 mots, vise 12 000+
- NE PAS ajouter de commentaires méta ou d'explications sur la génération`;
}

function buildPromptST(data) {
  const assLines = data.associes || "À définir";
  return `Tu es un juriste expert en droit des sociétés français. Rédige des statuts juridiques COMPLETS et CONFORMES AU DROIT FRANÇAIS pour :

- Dénomination : ${data.nom}
- Forme juridique : ${data.type}
- Siège social : ${data.adresse}
- Pays / Région : ${data.pays} / ${data.province || "–"}
- Objet social : ${data.objet}
- Capital social : ${data.capital}
- Nombre d'associés : ${data.nbAssocies}
- Associés et parts :
${assLines}
- Dirigeant(s) : ${data.dirigeants}

RÉDIGE les statuts complets avec EXACTEMENT 43 articles structurés comme suit :

TITRE I — FORME, DÉNOMINATION, OBJET, SIÈGE, DURÉE (Art. 1 à 6)
TITRE II — CAPITAL SOCIAL ET PARTS SOCIALES (Art. 7 à 14)
TITRE III — GÉRANCE / DIRECTION (Art. 15 à 20)
TITRE IV — DÉCISIONS COLLECTIVES ET ASSEMBLÉES (Art. 21 à 28)
TITRE V — EXERCICE SOCIAL ET COMPTES (Art. 29 à 33)
TITRE VI — CESSION ET TRANSMISSION DES PARTS (Art. 34 à 38)
TITRE VII — DISSOLUTION, LIQUIDATION (Art. 39 à 41)
TITRE VIII — DISPOSITIONS DIVERSES (Art. 42 à 43)

Format de chaque article :
Article [N] — [TITRE EN MAJUSCULES]
[Corps de l'article avec clauses juridiques complètes]

EXIGENCES :
- Chaque article : minimum 150 mots avec clauses précises
- Utilise le vocabulaire juridique exact (code de commerce, code civil)
- Adapte les clauses à la forme juridique choisie
- Inclus les signatures finales avec lignes de date et paraphes
- Document prêt pour signature et dépôt au greffe
- NE PAS ajouter de commentaires méta`;
}

function buildPromptLM(data) {
  return `Tu es un coach professionnel expert en recrutement RH. Rédige une lettre de motivation PROFESSIONNELLE et PERCUTANTE en français pour :

PROFIL DU CANDIDAT :
- Nom : ${data.nom}
- Métier actuel : ${data.metier}
- Expérience : ${data.experience || "Non précisé"}
- Niveau d'études : ${data.etudes || "Non précisé"}
- Compétences clés : ${data.competences}
- Réalisation marquante : ${data.realisation || "Non précisé"}

POSTE VISÉ :
- Intitulé : ${data.poste}
- Entreprise : ${data.entreprise}
- Secteur : ${data.secteur || "Non précisé"}
- Ville : ${data.ville || "Non précisé"}
- Description du poste : ${data.descriptionPoste || "Non précisé"}

PERSONNALISATION :
- Ton : ${data.ton || "Professionnel"}
- Type de candidature : ${data.typeCandidature || "Réponse à une offre"}
- Motivations spécifiques : ${data.motivations || "Non précisé"}

STRUCTURE DE LA LETTRE :
1. En-tête (coordonnées candidat + destinataire + date + objet)
2. Accroche percutante (2-3 phrases qui captivent)
3. Paragraphe 1 — Qui je suis et ce que j'apporte (compétences + expérience)
4. Paragraphe 2 — Pourquoi cette entreprise / ce poste (recherche sur l'entreprise simulée)
5. Paragraphe 3 — Ma valeur ajoutée concrète (chiffres, réalisation)
6. Conclusion — Appel à l'action (entretien) + formule de politesse complète
7. Signature

EXIGENCES :
- 600 à 800 mots
- Ton ${data.ton || "professionnel"}, authentique et convaincant
- Évite les formules clichées et génériques
- Personnalise avec des détails concrets
- Formule de politesse complète et professionnelle
- Prête à envoyer sans modification majeure`;
}

// ── Gestionnaire de crédits (localStorage-based via headers) ──────────────────

function getCredits(headers) {
  // En production réelle : base de données. Ici : système simple par cookie/header
  const creditsHeader = headers["x-user-credits"];
  if (creditsHeader) return parseInt(creditsHeader) || 3;
  return 3; // Crédits par défaut
}

// ── Handler principal ─────────────────────────────────────────────────────────

exports.handler = async (event) => {
  // CORS
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-User-Credits",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: "Méthode non autorisée" }) };
  }

  if (!ANTHROPIC_API_KEY) {
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: "Clé API non configurée sur le serveur." }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: "Corps de requête invalide." }) };
  }

  const { type, data } = body;
  if (!type || !data) {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: "Paramètres manquants." }) };
  }

  const cost = COSTS[type];
  if (!cost) {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: "Type de document inconnu." }) };
  }

  // Vérification des crédits
  const currentCredits = getCredits(event.headers || {});
  if (currentCredits < cost) {
    return {
      statusCode: 402,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Crédits insuffisants.", code: "INSUFFICIENT_CREDITS" }),
    };
  }

  // Construction du prompt
  let prompt;
  if (type === "business-plan") prompt = buildPromptBP(data);
  else if (type === "statuts") prompt = buildPromptST(data);
  else prompt = buildPromptLM(data);

  const startTime = Date.now();

  try {
    // Appel à l'API Anthropic
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: type === "business-plan" ? 8000 : 6000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error("Anthropic API error:", errData);
      return {
        statusCode: 502,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Erreur lors de la génération. Réessayez." }),
      };
    }

    const result = await response.json();
    const content = result.content?.[0]?.text || "";
    const durationMs = Date.now() - startTime;
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    const remainingCredits = currentCredits - cost;

    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        stats: { wordCount, durationMs },
        credits: { used: cost, remaining: remainingCredits },
      }),
    };
  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Erreur interne du serveur." }),
    };
  }
};
