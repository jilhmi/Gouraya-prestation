// netlify/functions/_shared/store.js
// Stockage en mémoire (production : remplacer par Supabase/Redis/FaunaDB)
// Architecture prête pour migration vers une vraie base de données

/**
 * ═══════════════════════════════════════════════════
 * STORE — Gestion des utilisateurs, crédits, logs
 * ═══════════════════════════════════════════════════
 * 
 * En production Netlify, les fonctions sont stateless.
 * Ce store in-memory fonctionne pour le dev et les tests.
 * 
 * Pour la production, remplacez par :
 *   - Supabase (recommandé, gratuit jusqu'à 500MB)
 *   - PlanetScale (MySQL serverless)
 *   - Upstash Redis (pour rate limiting)
 *   - FaunaDB
 * 
 * L'interface est identique — seules les fonctions 
 * internes changent.
 * ═══════════════════════════════════════════════════
 */

// Simulation d'un store persistant via variables globales
// En production Netlify, utiliser Supabase comme indiqué ci-dessous
const _users = new Map();
const _logs = [];
const _rateLimits = new Map();

// ── PLANS ────────────────────────────────────────────────────────────────────
export const PLANS = {
  free: {
    name: 'Gratuit',
    credits: 3,
    maxPerDay: 2,
    features: ['Plan d\'affaires (version courte)', 'Statuts basiques'],
  },
  starter: {
    name: 'Starter',
    price: 29,
    credits: 20,
    maxPerDay: 10,
    features: ['Plan d\'affaires complet 20+ pages', 'Statuts professionnels', 'Export PDF & Word', 'Historique illimité'],
  },
  pro: {
    name: 'Pro',
    price: 79,
    credits: 100,
    maxPerDay: 50,
    features: ['Tout Starter', 'Génération prioritaire', 'Support prioritaire', 'API access'],
  },
};

// ── USER MANAGEMENT ───────────────────────────────────────────────────────────
export function getOrCreateUser(userId, email = null) {
  if (!_users.has(userId)) {
    _users.set(userId, {
      id: userId,
      email,
      plan: 'free',
      credits: parseInt(process.env.FREE_CREDITS_ON_SIGNUP || '3'),
      creditsUsed: 0,
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
      generations: [],
    });
  }
  const user = _users.get(userId);
  user.lastActiveAt = new Date().toISOString();
  return user;
}

export function getUser(userId) {
  return _users.get(userId) || null;
}

export function updateUserCredits(userId, delta) {
  const user = getOrCreateUser(userId);
  user.credits = Math.max(0, user.credits + delta);
  if (delta < 0) user.creditsUsed += Math.abs(delta);
  return user;
}

export function addCredits(userId, amount, plan = null) {
  const user = getOrCreateUser(userId);
  user.credits += amount;
  if (plan) user.plan = plan;
  return user;
}

// ── CREDIT COSTS ─────────────────────────────────────────────────────────────
export const CREDIT_COSTS = {
  'business-plan': 2,    // 2 crédits par plan d'affaires
  'statuts': 1,          // 1 crédit par statuts
  'lettre-motivation': 1, // 1 crédit par lettre de motivation
};

export function hasEnoughCredits(userId, type) {
  const user = getOrCreateUser(userId);
  const cost = CREDIT_COSTS[type] || 1;
  return user.credits >= cost;
}

export function consumeCredits(userId, type) {
  const cost = CREDIT_COSTS[type] || 1;
  return updateUserCredits(userId, -cost);
}

// ── RATE LIMITING ─────────────────────────────────────────────────────────────
export function checkRateLimit(userId, windowMs = 3600000, maxRequests = 10) {
  const now = Date.now();
  const key = `${userId}:${Math.floor(now / windowMs)}`;
  
  if (!_rateLimits.has(key)) {
    _rateLimits.set(key, { count: 0, resetAt: now + windowMs });
  }
  
  const limit = _rateLimits.get(key);
  
  if (limit.count >= maxRequests) {
    return { 
      allowed: false, 
      remaining: 0,
      resetAt: limit.resetAt,
      retryAfter: Math.ceil((limit.resetAt - now) / 1000),
    };
  }
  
  limit.count++;
  return { 
    allowed: true, 
    remaining: maxRequests - limit.count,
    resetAt: limit.resetAt,
  };
}

// ── LOGGING ───────────────────────────────────────────────────────────────────
export function logGeneration(entry) {
  const log = {
    id: `gen_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,
    timestamp: new Date().toISOString(),
    ...entry,
  };
  _logs.unshift(log);
  if (_logs.length > 1000) _logs.pop(); // Keep last 1000 logs
  
  // Attach to user's history
  if (entry.userId) {
    const user = getOrCreateUser(entry.userId);
    user.generations.unshift({
      id: log.id,
      type: entry.type,
      name: entry.documentName,
      timestamp: log.timestamp,
      creditsUsed: entry.creditsUsed,
    });
    if (user.generations.length > 50) user.generations.pop();
  }
  
  return log;
}

export function getLogs(limit = 100) {
  return _logs.slice(0, limit);
}

export function getUserGenerations(userId) {
  const user = getUser(userId);
  return user ? user.generations : [];
}

// ── SIMPLE JWT-LIKE TOKEN (sans lib externe) ──────────────────────────────────
export function generateToken(payload) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify({ ...payload, iat: Date.now() }));
  const secret = process.env.JWT_SECRET || 'gouraya_secret_2025';
  // Simple signature (production: use proper crypto)
  const sig = btoa(`${header}.${body}.${secret}`).slice(0, 32);
  return `${header}.${body}.${sig}`;
}

export function verifyToken(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    // Token expires after 30 days
    if (Date.now() - payload.iat > 30 * 24 * 3600 * 1000) return null;
    return payload;
  } catch {
    return null;
  }
}

// ── FINGERPRINT (anonymous user ID from IP + UA) ─────────────────────────────
export function getFingerprint(event) {
  const ip = event.headers['x-forwarded-for']?.split(',')[0]?.trim() 
    || event.headers['client-ip'] 
    || 'unknown';
  const ua = event.headers['user-agent'] || '';
  // Simple hash
  let hash = 0;
  const str = ip + ua.slice(0, 50);
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return `anon_${Math.abs(hash).toString(36)}`;
}
