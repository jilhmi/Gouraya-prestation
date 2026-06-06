// netlify/functions/generate-document.js
// Point d'entrée principal pour toutes les générations IA
// La clé API est stockée côté serveur — jamais exposée au client

import Anthropic from '@anthropic-ai/sdk';
import {
  getOrCreateUser,
  hasEnoughCredits,
  consumeCredits,
  checkRateLimit,
  logGeneration,
  getFingerprint,
  verifyToken,
  CREDIT_COSTS,
} from './_shared/store.js';
import { buildBusinessPlanPrompt, buildStatutsPrompt, buildLettreMotivationPrompt } from './_shared/prompts.js';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.SITE_URL || '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

export const handler = async (event) => {
  // ── CORS preflight ────────────────────────────────────────────────────────
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Méthode non autorisée' }) };
  }

  // ── Parse body ────────────────────────────────────────────────────────────
  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Corps de requête invalide' }) };
  }

  const { type, data } = body;

  if (!['business-plan', 'statuts', 'lettre-motivation'].includes(type)) {
    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Type de document invalide' }) };
  }

  // ── Identifier l'utilisateur ──────────────────────────────────────────────
  let userId;
  const authHeader = event.headers['authorization'] || '';
  
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    const payload = verifyToken(token);
    userId = payload?.userId || getFingerprint(event);
  } else {
    // Utilisateur anonyme identifié par empreinte IP+UA
    userId = getFingerprint(event);
  }

  const user = getOrCreateUser(userId);

  // ── Rate limiting ─────────────────────────────────────────────────────────
  const maxPerHour = parseInt(process.env.MAX_REQUESTS_PER_HOUR || '10');
  const rateCheck = checkRateLimit(userId, 3600000, maxPerHour);
  
  if (!rateCheck.allowed) {
    return {
      statusCode: 429,
      headers: {
        ...CORS_HEADERS,
        'Retry-After': String(rateCheck.retryAfter),
        'X-RateLimit-Reset': String(rateCheck.resetAt),
      },
      body: JSON.stringify({
        error: 'Trop de requêtes. Veuillez patienter.',
        retryAfter: rateCheck.retryAfter,
        resetAt: rateCheck.resetAt,
      }),
    };
  }

  // ── Vérification des crédits ──────────────────────────────────────────────
  if (!hasEnoughCredits(userId, type)) {
    const cost = CREDIT_COSTS[type];
    return {
      statusCode: 402,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error: 'Crédits insuffisants',
        creditsRequired: cost,
        creditsAvailable: user.credits,
        upgradeUrl: `${process.env.SITE_URL || ''}/tarifs`,
        code: 'INSUFFICIENT_CREDITS',
      }),
    };
  }

  // ── Validation des données ────────────────────────────────────────────────
  const validation = validateData(type, data);
  if (!validation.valid) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: validation.message }),
    };
  }

  // ── Vérifier la clé API côté serveur ─────────────────────────────────────
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY manquante dans les variables d\'environnement');
    return {
      statusCode: 503,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Service temporairement indisponible. Contactez le support.' }),
    };
  }

  // ── Construction du prompt ────────────────────────────────────────────────
  let prompt;
  let documentName;
  
  if (type === 'business-plan') {
    prompt = buildBusinessPlanPrompt(data);
    documentName = `Plan d'affaires — ${data.nom}`;
  } else if (type === 'statuts') {
    prompt = buildStatutsPrompt(data);
    documentName = `Statuts — ${data.nom} (${data.type})`;
  } else {
    prompt = buildLettreMotivationPrompt(data);
    documentName = `Lettre de motivation — ${data.nom} → ${data.poste} chez ${data.entreprise}`;
  }

  // ── Appel à l'API Anthropic (côté serveur) ────────────────────────────────
  const startTime = Date.now();
  let generatedContent;
  let tokensUsed = 0;

  try {
    const anthropic = new Anthropic({ apiKey });

    const maxTokens = type === 'business-plan' ? 8000 : type === 'statuts' ? 5000 : 2000;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: maxTokens,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    generatedContent = message.content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n');

    tokensUsed = (message.usage?.input_tokens || 0) + (message.usage?.output_tokens || 0);

  } catch (err) {
    console.error('Erreur API Anthropic:', err.message);
    
    // Ne pas exposer les détails de l'erreur API au client
    const userMessage = err.status === 529 
      ? 'Le service IA est temporairement surchargé. Réessayez dans quelques secondes.'
      : 'Erreur lors de la génération. Veuillez réessayer.';

    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: userMessage }),
    };
  }

  // ── Consommer les crédits APRÈS succès ────────────────────────────────────
  const updatedUser = consumeCredits(userId, type);
  const creditsUsed = CREDIT_COSTS[type];

  // ── Journalisation ────────────────────────────────────────────────────────
  const logEntry = logGeneration({
    userId,
    type,
    documentName,
    creditsUsed,
    tokensUsed,
    durationMs: Date.now() - startTime,
    wordCount: generatedContent.split(/\s+/).filter(Boolean).length,
    userPlan: user.plan,
    success: true,
    metadata: {
      secteur: data.secteur || data.type,
      pays: data.pays,
    },
  });

  // ── Réponse ───────────────────────────────────────────────────────────────
  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify({
      success: true,
      content: generatedContent,
      documentName,
      generationId: logEntry.id,
      credits: {
        used: creditsUsed,
        remaining: updatedUser.credits,
        total: updatedUser.credits + updatedUser.creditsUsed,
      },
      stats: {
        wordCount: logEntry.wordCount,
        tokensUsed,
        durationMs: logEntry.durationMs,
      },
    }),
  };
};

// ── Validation des données d'entrée ──────────────────────────────────────────
function validateData(type, data) {
  if (!data || typeof data !== 'object') {
    return { valid: false, message: 'Données manquantes' };
  }

  if (type === 'business-plan') {
    const required = ['nom', 'secteur', 'description', 'pays', 'ville', 'produits', 'cible'];
    const missing = required.filter(f => !data[f]?.trim());
    if (missing.length > 0) {
      return { valid: false, message: `Champs obligatoires manquants : ${missing.join(', ')}` };
    }
    // Sanitize
    if (data.description.length > 5000) {
      return { valid: false, message: 'Description trop longue (max 5000 caractères)' };
    }
  }

  if (type === 'statuts') {
    const required = ['nom', 'type', 'adresse', 'objet', 'capital', 'dirigeants', 'pays'];
    const missing = required.filter(f => !data[f]?.trim());
    if (missing.length > 0) {
      return { valid: false, message: `Champs obligatoires manquants : ${missing.join(', ')}` };
    }
  }

  if (type === 'lettre-motivation') {
    const required = ['nom', 'metier', 'competences', 'poste', 'entreprise'];
    const missing = required.filter(f => !data[f]?.trim());
    if (missing.length > 0) {
      return { valid: false, message: `Champs obligatoires manquants : ${missing.join(', ')}` };
    }
  }

  return { valid: true };
}
