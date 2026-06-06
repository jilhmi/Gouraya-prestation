// netlify/functions/_shared/prompts.js
// Prompts optimisés pour générer des documents professionnels

export function buildBusinessPlanPrompt(data) {
  const {
    nom, secteur, description, pays, province, ville,
    employes, investissement, financement, produits,
    cible, concurrents, objectifs
  } = data;

  return `Tu es un cabinet de conseil en stratégie d'entreprise de rang mondial (équivalent McKinsey, BCG). Tu rédiges des plans d'affaires EXCEPTIONNELS, utilisés par des entrepreneurs pour obtenir des financements bancaires, des investisseurs professionnels et des subventions publiques.

Ton plan doit être IRRÉPROCHABLE : données chiffrées cohérentes, analyse approfondie, langage professionnel soutenu, et suffisamment détaillé pour convaincre un comité de crédit bancaire ou un conseil d'administration.

═══════════════════════════════════════════════════════════════════
DONNÉES DU PORTEUR DE PROJET
═══════════════════════════════════════════════════════════════════
Nom de l'entreprise    : ${nom}
Secteur d'activité     : ${secteur}
Description du projet  : ${description}
Localisation           : ${ville}${province ? ', ' + province : ''}, ${pays}
Effectif prévu         : ${employes}
Investissement initial : ${investissement || 'À estimer selon le secteur'}
Financement            : ${financement}
Offre (produits/svces) : ${produits}
Clientèle cible        : ${cible}
Concurrents            : ${concurrents || 'Principaux acteurs du secteur ' + secteur}
Objectifs 3 ans        : ${objectifs || 'Croissance rentable et conquête du marché'}
═══════════════════════════════════════════════════════════════════

RÉDIGE LE PLAN D'AFFAIRES COMPLET CI-DESSOUS.
Chaque section doit être SUBSTANTIELLE. Aucun raccourci. Minimum 10 000 mots au total.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    PAGE DE COUVERTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    PLAN D'AFFAIRES
                    
                    ${nom.toUpperCase()}
                    
Secteur d'activité : ${secteur}
Localisation       : ${ville}, ${pays}
Document préparé par : ${nom}
Date de préparation : ${new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}

DOCUMENT CONFIDENTIEL — USAGE EXCLUSIF DANS LE CADRE D'UNE DEMANDE DE FINANCEMENT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    SOMMAIRE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1.  Résumé Exécutif
2.  Présentation de l'Entreprise
3.  Mission, Vision et Valeurs
4.  Analyse du Marché
5.  Analyse de la Concurrence
6.  Analyse SWOT
7.  Description des Produits et Services
8.  Étude de la Clientèle Cible
9.  Stratégie Marketing
10. Stratégie de Vente
11. Plan Opérationnel
12. Ressources Humaines
13. Structure Organisationnelle
14. Analyse des Risques
15. Calendrier de Lancement
16. Prévisions Financières — Année 1
17. Prévisions Financières — Année 2
18. Prévisions Financières — Année 3
19. Bilan Prévisionnel 3 Ans
20. Compte de Résultat Prévisionnel
21. Tableau des Flux de Trésorerie
22. Analyse du Seuil de Rentabilité
23. Conclusion et Perspectives

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 1 — RÉSUMÉ EXÉCUTIF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Rédige un résumé exécutif puissant de 700 à 900 mots. Commence par accrocher le lecteur avec l'opportunité de marché. Présente l'entreprise, son modèle économique unique, les chiffres clés projetés, le montant de financement recherché et son utilisation précise. Termine sur la proposition de valeur différenciante.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 2 — PRÉSENTATION DE L'ENTREPRISE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[500 mots min. Contexte de création, genèse du projet, forme juridique recommandée, localisation stratégique, profil des fondateurs et leurs compétences clés, adresse du siège, dates importantes.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 3 — MISSION, VISION ET VALEURS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[350 mots min. Formule une mission inspirante (ce que l'entreprise fait aujourd'hui pour qui et pourquoi), une vision ambitieuse à 5 ans, et 5 à 7 valeurs fondatrices avec leur signification concrète pour l'entreprise.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 4 — ANALYSE DU MARCHÉ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[800 mots min. Taille du marché adressable (TAM, SAM, SOM) avec chiffres estimés, taux de croissance annuel, principales tendances de fond, facteurs réglementaires, technologiques et sociétaux. Segmentation du marché. Barrières à l'entrée. Sources citées.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 5 — ANALYSE DE LA CONCURRENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[600 mots min. Tableau comparatif détaillé de 4 à 6 concurrents (direct et indirect) : nom, taille, positionnement prix, points forts, points faibles, part de marché estimée. Positionnement différenciant de ${nom} face à chacun. Avantage concurrentiel durable.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 6 — ANALYSE SWOT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[500 mots min. Tableau SWOT complet avec au moins 6 éléments par quadrant. Pour chaque élément : une phrase explicative et l'impact stratégique. Conclure par les 3 orientations stratégiques prioritaires découlant de l'analyse.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 7 — DESCRIPTION DES PRODUITS ET SERVICES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[600 mots min. Description détaillée de chaque produit/service : fonctionnalités, bénéfices client, tarification, marge brute estimée, cycle de vie, propriété intellectuelle ou savoir-faire protégeant l'offre. Roadmap produit sur 3 ans.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 8 — ÉTUDE DE LA CLIENTÈLE CIBLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[500 mots min. Définir 2 à 3 personas précis avec : nom fictif, âge, profession, revenus, comportements d'achat, canaux préférés, problèmes que ${nom} résout, déclencheurs d'achat. Taille estimée de chaque segment. Lifetime Value client estimée.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 9 — STRATÉGIE MARKETING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[700 mots min. Marketing mix 4P complet. Stratégie digitale (SEO, réseaux sociaux, publicité payante, email marketing). Budget marketing annuel ventilé par canal. Calendrier des campagnes sur 12 mois. KPIs de suivi. Coût d'acquisition client cible.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 10 — STRATÉGIE DE VENTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[450 mots min. Processus de vente étape par étape. Force commerciale prévue. Objectifs de vente trimestriels. Politique de prix et remises. Programme de fidélisation. Partenariats commerciaux stratégiques. Taux de conversion cibles.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 11 — PLAN OPÉRATIONNEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[500 mots min. Processus de production ou de livraison du service, étape par étape. Fournisseurs clés et conditions d'achat. Logistique. Outils et technologies utilisés. Capacité de production. Contrôle qualité. Certifications nécessaires.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 12 — RESSOURCES HUMAINES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[450 mots min. Plan de recrutement sur 3 ans. Fiches de poste des profils clés. Politique de rémunération et avantages. Culture d'entreprise. Formation et développement. Charges salariales détaillées par année.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 13 — STRUCTURE ORGANISATIONNELLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[350 mots min. Organigramme textuel. Gouvernance et prise de décision. Forme juridique retenue et justification. Répartition du capital. Conseil d'administration ou de surveillance si applicable.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 14 — ANALYSE DES RISQUES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[500 mots min. Tableau des risques : au moins 8 risques identifiés (marché, financier, opérationnel, réglementaire, technologique, RH). Pour chaque risque : probabilité (F/M/E), impact (F/M/E), mesure de mitigation précise, plan B.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 15 — CALENDRIER DE LANCEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Rétro-planning détaillé mois par mois sur 18 mois. Pour chaque mois : actions clés, responsable, jalons critiques, budget mobilisé. Identifier les étapes interdépendantes et le chemin critique.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 16 — PRÉVISIONS FINANCIÈRES — ANNÉE 1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[700 mots min. Tableau mensuel du CA avec hypothèses de croissance. Détail des charges fixes (loyer, salaires, assurances, abonnements, amortissements). Charges variables (achats, commissions, marketing). Résultat mensuel. Inclure le plan de financement initial détaillé.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 17 — PRÉVISIONS FINANCIÈRES — ANNÉE 2
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[400 mots min. Évolution du CA avec justification de la croissance. Nouveaux recrutements et charges associées. Investissements supplémentaires. Résultat net et taux de marge. Comparaison avec objectifs année 1.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 18 — PRÉVISIONS FINANCIÈRES — ANNÉE 3
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[400 mots min. Objectifs de maturité. Expansion géographique ou de gamme. Valorisation de l'entreprise. EBITDA cible. Perspectives d'exit ou de levée de fonds série A si applicable.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 19 — BILAN PRÉVISIONNEL 3 ANS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Tableau bilan complet sur 3 colonnes (An1 / An2 / An3) :
ACTIF : Immobilisations nettes, Stocks, Créances clients, Disponibilités, Total Actif
PASSIF : Capital social, Réserves, Résultat, Dettes financières, Dettes fournisseurs, Total Passif]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 20 — COMPTE DE RÉSULTAT PRÉVISIONNEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Tableau complet sur 3 années :
Chiffre d'affaires HT / Achats et charges variables / Marge brute / Charges fixes / EBE / Dotations aux amortissements / Résultat d'exploitation / Charges financières / Résultat avant impôt / IS / Résultat net]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 21 — TABLEAU DES FLUX DE TRÉSORERIE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Cash-flow mensuel détaillé pour l'année 1 (colonnes = mois). Flux opérationnels, d'investissement et de financement. Trésorerie cumulée. Identifier le mois de retour à l'équilibre.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 22 — ANALYSE DU SEUIL DE RENTABILITÉ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Calcul précis : Charges fixes totales / Taux de marge sur coût variable. Seuil en euros et en unités vendues. Délai prévu pour l'atteindre. Marge de sécurité. Analyse de sensibilité (scénario pessimiste, réaliste, optimiste).]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 23 — CONCLUSION ET PERSPECTIVES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[400 mots min. Synthèse puissante de l'opportunité. Récapitulatif des points forts du dossier. Appel à l'action clair pour le lecteur (banquier/investisseur). Coordonnées et disponibilité pour suivi.]

════════════════════════════════════════════════════════
RÈGLES ABSOLUES :
- Chiffres COHÉRENTS et RÉALISTES pour le secteur "${secteur}" en "${pays}"
- JAMAIS de sections courtes ou bâclées
- Tableaux financiers parfaitement alignés
- Français professionnel et soutenu sans fautes
- Minimum 10 000 mots au total
- Chaque prévision financière doit être logiquement liée aux autres
════════════════════════════════════════════════════════`;
}

export function buildStatutsPrompt(data) {
  const { nom, type, adresse, objet, nbAssocies, capital, associes, dirigeants, pays, province } = data;

  return `Tu es un avocat d'affaires spécialisé en droit des sociétés avec 20 ans d'expérience. Tu rédiges des statuts juridiques COMPLETS, PRÉCIS et CONFORMES aux législations en vigueur.

Les statuts que tu rédiges doivent être directement utilisables par un notaire ou un greffier de tribunal de commerce, sans modification majeure.

═══════════════════════════════════════════════════════════════════
INFORMATIONS DE LA SOCIÉTÉ
═══════════════════════════════════════════════════════════════════
Dénomination sociale : ${nom}
Forme juridique      : ${type}
Siège social         : ${adresse}${province ? ', ' + province : ''}, ${pays}
Objet social         : ${objet}
Capital social       : ${capital}
Nombre d'associés    : ${nbAssocies}
Répartition capital  : ${associes}
Dirigeant(s)         : ${dirigeants}
Date de rédaction    : ${new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
═══════════════════════════════════════════════════════════════════

RÉDIGE LES STATUTS COMPLETS CI-DESSOUS. Minimum 4 500 mots. Chaque article doit être complet avec plusieurs alinéas.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              STATUTS CONSTITUTIFS
              
              ${nom.toUpperCase()}
              ${type.toUpperCase()}
              
              Siège social : ${adresse}, ${pays}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRÉAMBULE

[Rédige un préambule juridique complet présentant les associés fondateurs, leur volonté de constituer la société, et le contexte de création. Inclure les déclarations légales obligatoires selon le droit de ${pays}.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TITRE I — FORME, DÉNOMINATION, OBJET, SIÈGE ET DURÉE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Article 1 — Forme juridique
[Forme de la société, responsabilité des associés, régime juridique applicable]

Article 2 — Dénomination sociale
[Nom officiel, utilisation, protection, mention obligatoire sur les documents]

Article 3 — Siège social
[Adresse précise, possibilité de transfert, conditions et procédure]

Article 4 — Objet social
[Objet principal détaillé, activités connexes, activités accessoires, clause balai "et généralement toutes opérations..."]

Article 5 — Durée
[Durée de vie de la société, date de début, conditions de prorogation]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TITRE II — CAPITAL SOCIAL ET PARTS SOCIALES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Article 6 — Capital social
[Montant précis, composition, valeur nominale des parts, dépôt des fonds]

Article 7 — Répartition des parts sociales
[Tableau de répartition complet entre associés avec nombre de parts et valeur]

Article 8 — Nature et représentation des parts
[Forme nominative, inscription sur registre, dématérialisation]

Article 9 — Indivisibilité des parts sociales
[Régime de l'indivision, désignation d'un représentant unique]

Article 10 — Droits attachés aux parts sociales
[Droits financiers, droits politiques, droits d'information]

Article 11 — Obligations attachées aux parts
[Contribution aux dettes, obligations des associés]

Article 12 — Cession de parts sociales entre associés
[Liberté de cession interne, conditions, formalités]

Article 13 — Cession de parts sociales à des tiers
[Agrément obligatoire, procédure, délais, recours]

Article 14 — Droit de préemption
[Mécanisme de préemption, prix, délais, priorité]

Article 15 — Transmission par décès ou incapacité
[Sort des parts en cas de décès, héritiers, continuation de la société]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TITRE III — DIRECTION ET GÉRANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Article 16 — Nomination du ou des dirigeants
[Conditions de nomination, qualité requise, acte de nomination]

Article 17 — Durée et fin du mandat
[Durée du mandat, renouvellement, démission, révocation]

Article 18 — Pouvoirs du dirigeant
[Pouvoirs étendus vis-à-vis des tiers, représentation, actes de gestion courante, actes soumis à autorisation préalable]

Article 19 — Rémunération du dirigeant
[Principe, fixation, remboursement de frais, avantages en nature]

Article 20 — Révocation du dirigeant
[Conditions, procédure, indemnités éventuelles, effets]

Article 21 — Conventions réglementées
[Définition, procédure d'approbation, interdictions]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TITRE IV — DÉCISIONS COLLECTIVES DES ASSOCIÉS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Article 22 — Compétence des assemblées
[Décisions relevant de la collectivité, distinction ordinaire/extraordinaire]

Article 23 — Convocation des assemblées
[Auteur, délais, formalités, ordre du jour, documents joints]

Article 24 — Tenue des assemblées
[Lieu, présidence, feuille de présence, procuration]

Article 25 — Droit de vote et représentation
[Droits de vote par part, vote à distance, mandataire]

Article 26 — Assemblée Générale Ordinaire
[Définition, quorum, majorité, compétences]

Article 27 — Assemblée Générale Extraordinaire
[Définition, quorum renforcé, majorité qualifiée, compétences exclusives]

Article 28 — Procès-verbaux
[Tenue, signature, registre, opposabilité]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TITRE V — EXERCICE SOCIAL ET COMPTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Article 29 — Exercice social
[Dates de début et clôture, premier exercice dérogatoire]

Article 30 — Comptes annuels
[Établissement, présentation aux associés, dépôt légal]

Article 31 — Affectation des résultats
[Dotation à la réserve légale, report à nouveau, distribution de dividendes]

Article 32 — Acomptes sur dividendes
[Conditions, procédure, régularisation]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TITRE VI — CONTRÔLE ET INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Article 33 — Commissariat aux comptes
[Obligation ou dispense selon seuils, nomination, mission]

Article 34 — Droit d'information permanent des associés
[Documents accessibles, demandes, délais de réponse]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TITRE VII — MODIFICATIONS DU CAPITAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Article 35 — Augmentation de capital
[Modes d'augmentation, droit préférentiel de souscription, procédure AGE]

Article 36 — Réduction de capital
[Motifs, procédure, protection des créanciers]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TITRE VIII — DISSOLUTION, LIQUIDATION ET PARTAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Article 37 — Causes de dissolution
[Dissolution volontaire, judiciaire, de plein droit, réunion des parts en une seule main]

Article 38 — Liquidation
[Nomination du liquidateur, pouvoirs, obligations, clôture]

Article 39 — Partage de l'actif net
[Ordre de remboursement, boni de liquidation, répartition entre associés]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TITRE IX — DISPOSITIONS FINALES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Article 40 — Litiges et juridiction compétente
[Tribunal compétent, tentative de médiation préalable]

Article 41 — Élection de domicile
[Domicile des parties pour les notifications]

Article 42 — Formalités légales
[Publication, immatriculation, dépôt au greffe, responsable des formalités]

Article 43 — Frais de constitution
[Prise en charge par la société après immatriculation]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SIGNATURES ET CERTIFICATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Formule de signature complète : "Fait à _____, le _____ ${new Date().getFullYear()}, en _____ exemplaires originaux."]

[Cadres de signature pour chaque associé avec : Nom complet, qualité, "Lu et approuvé", date, signature]

LISTE DES ASSOCIÉS FONDATEURS SIGNATAIRES :
${associes}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ANNEXES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Annexe 1 — Acte de nomination du/des dirigeant(s) :
[Rédige l'acte séparé de nomination de : ${dirigeants} avec pouvoirs complets]

Annexe 2 — État des souscriptions et des versements :
[Tableau récapitulatif capital souscrit et libéré par associé]

════════════════════════════════════════════════════════
RÈGLES ABSOLUES :
- Langage juridique rigoureux et précis
- Clauses complètes avec tous les cas de figure
- Conformité au droit des sociétés applicable en ${pays}
- Minimum 4 500 mots
- Articles numérotés et titrés
- Aucune ambiguïté possible
════════════════════════════════════════════════════════`;
}

export function buildLettreMotivationPrompt(data) {
  const {
    nom, metier, experience, etudes, competences,
    poste, entreprise, secteur, ville,
    descriptionPoste, ton, typeCandidature,
    motivations, realisation,
  } = data;

  const tonDescriptions = {
    professionnel: 'Professionnel et formel, vocabulaire soutenu, structure classique',
    dynamique: 'Dynamique et enthousiaste, phrases percutantes, énergie positive',
    sobre: 'Sobre et factuel, concis, centré sur les faits et résultats',
    creatif: 'Créatif et personnel, accroche originale, ton authentique et humain',
  };

  const typeDescriptions = {
    annonce: 'en réponse à une offre d\'emploi',
    spontanee: 'en candidature spontanée',
    stage: 'pour une demande de stage',
    alternance: 'pour une demande d\'alternance',
    reconversion: 'dans le cadre d\'une reconversion professionnelle',
  };

  return `Tu es un expert en recrutement et rédaction de lettres de motivation avec 20 ans d'expérience en ressources humaines. Tu rédiges des lettres de motivation EXCEPTIONNELLES qui décrochent des entretiens. Chaque lettre que tu écris est personnalisée, percutante et mémorable.

════════════════════════════════════════════════════════
PROFIL DU CANDIDAT
════════════════════════════════════════════════════════
Nom complet            : ${nom}
Métier / Profession    : ${metier}
Expérience             : ${experience || 'Non précisée'}
Niveau d'études        : ${etudes || 'Non précisé'}
Compétences clés       : ${competences}
${realisation ? `Réalisation marquante  : ${realisation}` : ''}

════════════════════════════════════════════════════════
LE POSTE VISÉ
════════════════════════════════════════════════════════
Poste convoité         : ${poste}
Entreprise             : ${entreprise}
Secteur                : ${secteur || 'Non précisé'}
Localisation           : ${ville || 'Non précisée'}
Type de candidature    : ${typeDescriptions[typeCandidature] || typeCandidature}
${descriptionPoste ? `\nDescription du poste :\n${descriptionPoste}` : ''}
${motivations ? `\nMotivations spécifiques :\n${motivations}` : ''}

════════════════════════════════════════════════════════
STYLE & TON
════════════════════════════════════════════════════════
Ton souhaité : ${tonDescriptions[ton] || ton}

════════════════════════════════════════════════════════
INSTRUCTIONS DE RÉDACTION
════════════════════════════════════════════════════════

Rédige une lettre de motivation COMPLÈTE et PROFESSIONNELLE avec les éléments suivants :

**EN-TÊTE :**
[Nom Prénom]
[Coordonnées fictives adaptées si non fournies]
[Date du jour : ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}]

[Destinataire : Service Recrutement / DRH]
${entreprise}
${ville || '[Ville]'}

**OBJET :** Candidature au poste de ${poste} ${typeDescriptions[typeCandidature] || ''}

**CORPS DE LA LETTRE en 4 paragraphes :**

1. **ACCROCHE PERCUTANTE** (3-4 phrases) : Commence par une phrase d'accroche forte qui capte immédiatement l'attention. Mentionne le poste et l'entreprise de manière valorisante. Évite absolument les formules banales comme "Suite à votre annonce...".

2. **MOI & MES ATOUTS** (5-6 phrases) : Présente ton profil de manière convaincante. Met en valeur tes compétences clés (${competences}), ton expérience (${experience || 'ton parcours'}), et ta formation (${etudes || 'ton parcours'}). ${realisation ? `Inclus impérativement cette réalisation concrète avec chiffres : ${realisation}.` : 'Cite au moins une réalisation chiffrée ou un succès concret.'}

3. **POURQUOI CETTE ENTREPRISE** (4-5 phrases) : Démontre ta connaissance et ton intérêt sincère pour ${entreprise}. ${motivations ? `Développe ces motivations : ${motivations}.` : `Met en avant ce qui attire particulièrement dans cette entreprise du secteur ${secteur || 'de son secteur'}.`} Montre que tu n'as pas envoyé une lettre générique.

4. **VALEUR AJOUTÉE & APPEL À L'ACTION** (3-4 phrases) : Explique concrètement ce que tu apportes à ${entreprise} pour le poste de ${poste}. Termine par une formule d'appel à l'action positive pour obtenir un entretien. Formule de politesse professionnelle.

**RÈGLES ABSOLUES :**
- Longueur : 350 à 450 mots (corps de lettre uniquement)
- Aucune phrase générique ou bateau
- Données cohérentes et crédibles
- Ton ${ton} tout au long
- Adapté au secteur ${secteur || 'professionnel'}
- Pas de fautes d'orthographe ni de grammaire
- Utilise le vouvoiement dans la lettre

Rédige la lettre complète maintenant, du début à la fin, sans commentaires ni annotations.`;
}
