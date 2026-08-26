export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: "SAAS" | "WEBSITE" | "ECOMMERCE" | "FULLSTACK";
  categoryLabel: string;
  client?: string;
  role: string;
  year: string;
  imageUrl: string;
  gallery?: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  challenge: string;
  solution: string;
  results: string[];
  metrics: { label: string; value: string }[];
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "proj_solera",
    slug: "solera-platform",
    title: "Solera Platform",
    tagline: "Architecture SaaS multitenant & portail de pilotage technique des données",
    description:
      "Conception et développement de la plateforme Solera : architecture SaaS moderne, gestion multitenant sécurisée, dashboards de métriques en temps réel et performances extrêmes.",
    category: "SAAS",
    categoryLabel: "SaaS & Web App",
    client: "Solera Inc.",
    role: "Lead Architect & Dév Full-Stack",
    year: "2025",
    imageUrl:
      "https://hkjqevinuoraripkoyhf.supabase.co/storage/v1/object/public/portfolio-uploads/d037a58d-48e1-4f2a-90f8-931312bfc66f.png",
    techStack: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "Framer Motion",
    ],
    liveUrl: "https://solera-platform.vercel.app",
    featured: true,
    order: 1,
    challenge:
      "Concevoir une interface de gestion de données volumineuses capable de charger en moins de 400ms tout en offrant une expérience utilisateur fluide et une sécurité multitenant stricte.",
    solution:
      "Mise en place d'une architecture modulaire sous Next.js avec Server Components, modélisation relationnelle optimisée sous PostgreSQL et interface soignée avec design system sombre sur-mesure.",
    results: [
      "-75% de temps de chargement des tableaux de bord",
      "Architecture prête pour l'échelle multitenant",
      "Score Lighthouse 100/100 sur l'ensemble des écrans clés",
    ],
    metrics: [
      { label: "Temps de chargement", value: "< 0.4s" },
      { label: "Disponibilité SaaS", value: "99.9%" },
      { label: "Score Lighthouse", value: "100/100" },
    ],
  },
  {
    id: "proj_rentabook",
    slug: "rent-a-book",
    title: "Rent a Book / Scolaris",
    tagline:
      "Migration critique PrestaShop 1.6 vers v9 & optimisation SQL pour 90 000+ commandes / an",
    description:
      "Pilotage de la refonte et de la migration e-commerce de la plateforme de location de livres scolaires Rent a Book. Modernisation du socle technique PrestaShop 1.6 vers PrestaShop 9 avec modules personnalisés pour absorber un flux saisonnier massif de plus de 90 000 commandes annuelles.",
    category: "ECOMMERCE",
    categoryLabel: "E-Commerce",
    client: "Rent a Book SA",
    role: "Lead Développeur PrestaShop & Backend",
    year: "2025",
    imageUrl:
      "https://hkjqevinuoraripkoyhf.supabase.co/storage/v1/object/public/portfolio-uploads/13840742-df75-4089-a9a3-5c8e31241162.png",
    techStack: [
      "PrestaShop 9",
      "PHP 8",
      "Symfony",
      "MySQL",
      "Doctrine",
      "Docker",
    ],
    liveUrl: "https://www.rentabook.be",
    featured: true,
    order: 2,
    challenge:
      "Gérer la transition d'un socle PrestaShop 1.6 très personnalisé sans aucune perte de données historiques (commandes, stocks, utilisateurs) tout en garantissant une tenue de charge sans faille durant le pic de rentrée scolaire (plus de 90 000 commandes traitées par an).",
    solution:
      "Développement de scripts d'indexation et d'export de données sur-mesure, réécriture complète des modules personnalisés en PHP 8 / Symfony et optimisation des index SQL pour réduire le temps de réponse serveur.",
    results: [
      "Zéro perte de données sur l'historique de plus de 10 ans",
      "Division par 3 du temps de validation des paniers",
      "Capacité de charge validée pour plus de 90 000 commandes annuelles avec pic saisonnier intensif",
    ],
    metrics: [
      { label: "Volume annuel", value: "90k+ cmdes" },
      { label: "Gain de vitesse", value: "-65%" },
      { label: "Fiabilité flux", value: "99.99%" },
    ],
  },
  {
    id: "proj_vbenghien",
    slug: "vb-enghien",
    title: "VB Enghien",
    tagline:
      "Plateforme officielle du club de volley : inscriptions dématérialisées & gestion automatisée",
    description:
      "Refonte complète du portail du club de Volley-Ball d'Enghien. Intégration d'un tunnel d'affiliation 100% digital avec suivi des statuts, génération automatique des attestations de mutuelle et console d'administration sur-mesure.",
    category: "FULLSTACK",
    categoryLabel: "Outils & Full-Stack",
    client: "Volley-Ball Club Enghien",
    role: "Direction Technique & Architecture Full-Stack",
    year: "2026",
    imageUrl:
      "https://tta2h2fnwjc08siv.public.blob.vercel-storage.com/projects/1787732824167-volley-BDjdOVgo9j2S3PaImteWiIEOuqJfBe.svg",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "Resend",
    ],
    liveUrl: "https://www.volley-ballenghien.be/",
    featured: true,
    order: 3,
    challenge:
      "Moderniser la présence digitale du club et remplacer la lourdeur des inscriptions papier/PDF par un processus fluide de recrutement d'adhérents, de suivi des cotisations et de délivrance d'attestations.",
    solution:
      "Conception d'une application Next.js & PostgreSQL avec formulaires multi-étapes dynamiques, notifications automatiques par email, génération d'attestations officielles et back-office sécurisé pour les dirigeants du club.",
    results: [
      "Processus d'affiliation 100% digitalisé et sans friction",
      "Génération et envoi instantanés des attestations de mutuelle",
      "Score de performance Google 100/100 (< 0.3s de chargement)",
      "Gain de temps majeur pour les administrateurs du club",
    ],
    metrics: [
      { label: "Membres actifs", value: "100+" },
      { label: "Temps de chargement", value: "< 0.3s" },
      { label: "Processus dématérialisé", value: "100% digital" },
    ],
  },
  {
    id: "proj_villadolce",
    slug: "villa-dolce",
    title: "Villa Dolce Hôtel",
    tagline:
      "Portail hôtelier haut de gamme avec moteur de réservation en temps réel par Webhooks",
    description:
      "Conception d'un site vitrine d'exception pour l'ouverture de l'établissement hôtelier Villa Dolce. Intégration d'un système de réservation synchronisé en direct via Webhooks avec une plateforme hôtelière tierce et gestion autonome des contenus.",
    category: "FULLSTACK",
    categoryLabel: "Outils & Full-Stack",
    client: "Hôtel Villa Dolce",
    role: "Direction Technique & Développement Full-Stack",
    year: "2026",
    imageUrl:
      "https://tta2h2fnwjc08siv.public.blob.vercel-storage.com/projects/1787732338691-villa-dolce-cCfwVpD66Bhn6nMLysz2WyqRNJfDDn.png",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "Webhooks API",
    ],
    liveUrl: "https://www.villadolce-hotel.com/fr",
    featured: true,
    order: 4,
    challenge:
      "Maximiser l'acquisition et les réservations directes pour le lancement de l'hôtel tout en synchronisant les disponibilités de chambres en temps réel avec le logiciel de gestion hôtelière externe sans alourdir le site.",
    solution:
      "Architecture Next.js haute performance connectée à des Webhooks sécurisés pour la transmission instantanée des réservations. Espace d'administration personnalisé permettant la gestion des galeries de suites, des tarifs et des offres spéciales.",
    results: [
      "Tunnel de réservation fluide et direct sans intermédiaire",
      "Synchronisation temps réel fiable via Webhooks",
      "Design responsive immersif valorisant les suites et services",
      "Temps de chargement ultra-rapide < 0.3s",
    ],
    metrics: [
      { label: "Réservations directes", value: "100% connectées" },
      { label: "Vitesse d'affichage", value: "< 0.3s" },
      { label: "Expérience mobile", value: "100/100" },
    ],
  },
  {
    id: "proj_marionnettes",
    slug: "marionnettes-saintes-en-fete",
    title: "Marionnettes & Saintes en Fête",
    tagline:
      "Plateforme culturelle & événementielle 2-en-1 avec gestion d'inscriptions pour ASBL",
    description:
      "Refonte unifiée regroupant les représentations artistiques de la troupe de marionnettes et le grand festival annuel Saintes en Fête. Système de gestion d'événements, programmes et inscriptions en ligne administrables.",
    category: "FULLSTACK",
    categoryLabel: "Outils & Full-Stack",
    client: "ASBL On tire les fils",
    role: "Direction Technique & Conception Web",
    year: "2026",
    imageUrl:
      "https://tta2h2fnwjc08siv.public.blob.vercel-storage.com/projects/1787732527785-logo-saintes-8GWijY3AgaObsG587g0IgegDG9kBDi.png",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
    ],
    liveUrl: "https://www.marionnettes.be/",
    featured: true,
    order: 5,
    challenge:
      "Moderniser un site associatif obsolète pour fusionner deux activités distinctes (spectacles de marionnettes tout au long de l'année et festival du village Saintes en Fête) avec un outil de publication accessible aux bénévoles.",
    solution:
      "Création d'une structure modulaire 2-en-1 avec calendrier interactif des événements, formulaires d'inscriptions dynamiques et back-office intuitif permettant de publier de nouvelles dates et actualités en toute autonomie.",
    results: [
      "Centralisation réussie des deux pôles de l'association sur une seule plateforme",
      "Plus de 500 inscriptions traitées pour le festival annuel",
      "Gestion éditoriale 100% autonome par les bénévoles",
      "Navigation fluide et accessible pour tous les publics",
    ],
    metrics: [
      { label: "Événements gérés", value: "40+" },
      { label: "Inscriptions festival", value: "500+" },
      { label: "Temps de chargement", value: "< 0.3s" },
    ],
  },
  {
    id: "proj_jac26",
    slug: "jac-26",
    title: "JAC 2026 — Journée des Confréries",
    tagline:
      "Portail événementiel officiel & annuaire interactif des confréries de Wallonie-Bruxelles",
    description:
      "Site officiel du rassemblement annuel des confréries gastronomiques et artisanales de la Fédération Wallonie-Bruxelles. Annuaire complet de 100+ confréries répertoriées et module d'inscription grand public.",
    category: "WEBSITE",
    categoryLabel: "Site Entreprise & PME",
    client: "Fédération des Confréries",
    role: "Conception & Développement Web",
    year: "2026",
    imageUrl:
      "https://tta2h2fnwjc08siv.public.blob.vercel-storage.com/projects/1787731516669-jac26-logo-soGvJ8gLZJyIP7qcuoYaqnh62ZMXbz.png",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
    ],
    liveUrl: "https://jac26.be/",
    featured: true,
    order: 6,
    challenge:
      "Créer une plateforme événementielle accueillante, hautement accessible pour un public non initié aux outils numériques et capable de répertorier exhaustivement les confréries participantes.",
    solution:
      "Interface épurée et contrastée développée en Next.js, respectant les normes d'accessibilité avec un annuaire filtrable et un formulaire d'inscription clair et rassurant.",
    results: [
      "Succès retentissant de l'événement avec plus de 100 confréries inscrites",
      "Clarté saluée par les organisateurs et les visiteurs de tous âges",
      "Temps de chargement instantané < 0.3s et score d'accessibilité parfait",
    ],
    metrics: [
      { label: "Confréries répertoriées", value: "100+" },
      { label: "Accessibilité", value: "100/100" },
      { label: "Vitesse de chargement", value: "< 0.3s" },
    ],
  },
  {
    id: "proj_amarea",
    slug: "amarea",
    title: "Amarea Wedding",
    tagline: "Plateforme SaaS sur-mesure pour wedding planner haut de gamme",
    description:
      "Conception d'une plateforme web moderne et responsive pour une agence de wedding planning événementiel haut de gamme en Belgique et en France.",
    category: "WEBSITE",
    categoryLabel: "Site Entreprise & PME",
    client: "Amarea Agency",
    role: "Développeur Front-End & Designer",
    year: "2025",
    imageUrl:
      "https://hkjqevinuoraripkoyhf.supabase.co/storage/v1/object/public/portfolio-uploads/a76f6b55-d143-4dc9-9804-03c0ca6fbfe4.png",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://www.amarea-wedding.com",
    featured: false,
    order: 7,
    challenge:
      "Refléter l'élégance et le raffinement des mariages haut de gamme tout en assurant une vitesse de chargement instantanée et une conversion fluide des prospects.",
    solution:
      "Design épuré hautement contrasté avec animations douces et micro-interactions au scroll, formulaires de contact qualifiés et optimisation des médias.",
    results: [
      "+45% de demandes de devis qualifiées dès le premier mois",
      "Temps de chargement divisé par 2 sur smartphone",
      "Identité visuelle premium saluée par les futurs mariés",
    ],
    metrics: [
      { label: "Conversion mobile", value: "+45%" },
      { label: "Score Performance", value: "98/100" },
      { label: "Temps chargement", value: "0.4s" },
    ],
  },
  {
    id: "proj_mgevents",
    slug: "mgevents",
    title: "MgEvents",
    tagline: "Site vitrine et catalogue interactif de mobilier & matériel événementiel",
    description:
      "Création d'un site vitrine avec catalogue dynamique pour une société de location de mobilier, sonorisation et structures événementielles.",
    category: "WEBSITE",
    categoryLabel: "Site Entreprise & PME",
    client: "MgEvents SPRL",
    role: "Concepteur & Développeur Web",
    year: "2025",
    imageUrl:
      "https://hkjqevinuoraripkoyhf.supabase.co/storage/v1/object/public/portfolio-uploads/5f58c425-ce5a-4cb7-a5ec-3c0f4f9db21c.png",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://mgevents.be",
    featured: false,
    order: 8,
    challenge:
      "Permettre aux organisateurs d'événements de composer facilement un devis estimatif parmi des centaines de références de matériel.",
    solution:
      "Filtrage dynamique instantané par catégorie d'événement (mariage, soirée d'entreprise, festival) et formulaire de devis pré-rempli.",
    results: [
      "Augmentation des réservations directes sans passage par téléphone",
      "Affichage fluide du catalogue riche en images",
    ],
    metrics: [
      { label: "Catalogue références", value: "250+" },
      { label: "Délai de devis", value: "< 24h" },
      { label: "Navigation mobile", value: "100/100" },
    ],
  },
  {
    id: "proj_focale28",
    slug: "focale-28",
    title: "Focale 2.8",
    tagline: "Site vitrine sombre et immersif pour photographe professionnel",
    description:
      "Un site vitrine minimaliste conçu pour un photographe d'art privilégiant les thèmes sombres et les contrastes forts pour sublimer ses clichés.",
    category: "WEBSITE",
    categoryLabel: "Site Entreprise & PME",
    client: "Focale 2.8",
    role: "Développeur Front-End & UI",
    year: "2025",
    imageUrl:
      "https://hkjqevinuoraripkoyhf.supabase.co/storage/v1/object/public/portfolio-uploads/b759597f-d2ca-4619-bff4-b513302ca7b9.png",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://www.focale28.be",
    featured: false,
    order: 9,
    challenge:
      "Afficher des photographies haute résolution sans ralentir la navigation et en garantissant un rendu fidèle des ombres et lumières.",
    solution:
      "Optimisation automatique des images Next/Image avec WebP progressif et palette sombre respectant la dynamique des couleurs de l'artiste.",
    results: [
      "Affichage instantané des galeries de portraits et paysages",
      "Navigation fluide au scroll et sur mobile",
      "Score SEO et performance parfait",
    ],
    metrics: [
      { label: "Poids moyen images", value: "-70%" },
      { label: "Score Performance", value: "100/100" },
      { label: "Rendu Retina", value: "4K Support" },
    ],
  },
  {
    id: "proj_jlp",
    slug: "jlp-podologue",
    title: "JLP Podologue",
    tagline: "Site professionnel de cabinet de podologie médicale & prise de rendez-vous",
    description:
      "Site pour un praticien podologue du sport et posturologue en Belgique, orienté réassurance patient et prise de rendez-vous en ligne.",
    category: "WEBSITE",
    categoryLabel: "Site Entreprise & PME",
    client: "Cabinet JLP Podologie",
    role: "Développeur Full-Stack",
    year: "2024",
    imageUrl:
      "https://hkjqevinuoraripkoyhf.supabase.co/storage/v1/object/public/portfolio-uploads/276e053a-c323-4554-94c6-be7f3e82531d.png",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://jlp-podologue.be",
    featured: false,
    order: 10,
    challenge:
      "Expliquer clairement des pathologies complexes aux patients tout en proposant une interface rassurante et une redirection directe vers la plateforme de rendez-vous.",
    solution:
      "Pages d'informations claires sur la posturologie et les semelles orthopédiques, intégration fluide du module Doctena / Progenda et SEO local renforcé.",
    results: [
      "Positionnement n°1 sur les requêtes podologue de la région",
      "Gain de temps sur la prise de rendez-vous par téléphone",
    ],
    metrics: [
      { label: "Prise de RDV en ligne", value: "+80%" },
      { label: "SEO Local", value: "Top 3 Google" },
      { label: "Vitesse", value: "0.3s" },
    ],
  },
  {
    id: "proj_bruxelles_proprete",
    slug: "bruxelles-proprete",
    title: "Bruxelles Propreté",
    tagline: "Portail institutionnel Drupal 10 pour l'agence publique de gestion des déchets",
    description:
      "Contribution au développement du portail public de l'agence Bruxelles-Propreté. Développement de modules personnalisés Drupal 10, formulaires citoyens et conformité stricte aux normes d'accessibilité RGAA.",
    category: "FULLSTACK",
    categoryLabel: "Outils & Full-Stack",
    client: "Région de Bruxelles-Capitale",
    role: "Développeur Drupal & PHP",
    year: "2023",
    imageUrl:
      "https://hkjqevinuoraripkoyhf.supabase.co/storage/v1/object/public/portfolio-uploads/4890b9b3-1fcf-49b0-bc42-990a42398555.png",
    techStack: ["Drupal 10", "PHP", "Twig", "MySQL", "Docker", "Sass"],
    liveUrl: "https://arp-gan.be",
    featured: false,
    order: 11,
    challenge:
      "Rendre accessible l'ensemble des démarches de collecte de déchets pour plus d'un million de citoyens bruxellois dans le respect des normes d'accessibilité numérique de l'État.",
    solution:
      "Développement de templates Twig sémantiques conformes RGAA niveau AA et intégration de formulaires de demandes d'encombrants et signalements.",
    results: [
      "Mise en ligne d'un portail citoyen clair et structuré",
      "Gestion multilingue fluide",
      "Validation de mon diplôme avec mention",
    ],
    metrics: [
      { label: "Audience ciblée", value: "1M+ citoyens" },
      { label: "CMS", value: "Drupal 10" },
      { label: "Accessibilité", value: "Normes RGAA" },
    ],
  },
  {
    id: "proj_garage_bosmans",
    slug: "garage-bosmans",
    title: "Garage Bosmans",
    tagline: "Site vitrine professionnel pour garage automobile & pneumaticien",
    description:
      "Site vitrine développé en Next.js pour un garage automobile de pneumatiques, optimisé pour la recherche locale Google et les demandes de devis.",
    category: "WEBSITE",
    categoryLabel: "Site Entreprise & PME",
    client: "Garage Bosmans",
    role: "Développeur Web",
    year: "2024",
    imageUrl:
      "https://hkjqevinuoraripkoyhf.supabase.co/storage/v1/object/public/portfolio-uploads/54a9f1b3-f071-472a-a21d-0fb4c8eca8f2.png",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://bosmansbandenpneus.com",
    featured: false,
    order: 12,
    challenge:
      "Offrir aux clients automobilistes un moyen rapide de trouver les tarifs de montage et de contacter l'atelier.",
    solution:
      "Interface simple, click-to-call immédiat et géolocalisation claire.",
    results: [
      "Amélioration de la visibilité locale",
      "Affichage instantané sur mobile",
    ],
    metrics: [
      { label: "Score Mobile", value: "100/100" },
      { label: "Temps chargement", value: "0.3s" },
      { label: "Précision tarifs", value: "100%" },
    ],
  },
  {
    id: "proj_fiftyone",
    slug: "fifty-one-enghien",
    title: "Fifty-One Enghien",
    tagline: "Plateforme associative & blog pour club service caritatif",
    description:
      "Projet Symfony réalisé comme travail de fin d'études permettant au club service Fifty-One d'Enghien de communiquer sur ses événements, actions caritatives et actualités.",
    category: "FULLSTACK",
    categoryLabel: "Outils & Full-Stack",
    client: "Fifty-One Club Enghien",
    role: "Concepteur & Développeur",
    year: "2023",
    imageUrl:
      "https://hkjqevinuoraripkoyhf.supabase.co/storage/v1/object/public/portfolio-uploads/4cd3e12b-6b46-4320-a824-ba64db0f7923.png",
    techStack: ["Symfony", "PHP", "MySQL", "Twig", "JavaScript"],
    liveUrl: "https://fiftyone-enghien.com",
    featured: false,
    order: 13,
    challenge:
      "Créer une gestion d'articles et d'événements caritatifs simple pour les membres non techniques de l'association.",
    solution:
      "Développement d'un back-office personnalisé sous Symfony avec système d'authentification et gestion de galerie photos.",
    results: [
      "Valorisation des actions philanthropiques du club",
      "Gestion autonome des publications d'événements",
    ],
    metrics: [
      { label: "Framework", value: "Symfony" },
      { label: "Base de données", value: "MySQL" },
      { label: "Disponibilité", value: "99.9%" },
    ],
  },
];
