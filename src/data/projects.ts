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
    tagline: "Plateforme SaaS de gestion d'écoles, étudiants & logistique",
    description:
      "Une plateforme SaaS complète pour la coordination entre l'entreprise, les écoles partenaires et les étudiants saisonniers : communication élèves/parents, génération de brochures avec QR codes personnalisés, gestion de syllabus et signature numérique de contrats.",
    category: "SAAS",
    categoryLabel: "SaaS & Web App",
    client: "Scolaris / Rent a Book",
    role: "Lead Développeur Full-Stack",
    year: "2026",
    imageUrl: "https://hkjqevinuoraripkoyhf.supabase.co/storage/v1/object/public/portfolio-uploads/d037a58d-48e1-4f2a-90f8-931312bfc66f.png",
    techStack: ["Next.js 15", "Node.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Vercel"],
    liveUrl: "https://solera-platform.vercel.app",
    featured: true,
    order: 1,
    challenge:
      "Gérer des flux administratifs denses pour des dizaines d'écoles et des centaines d'étudiants saisonniers sans friction, avec signature dématérialisée et suivi logistique en temps réel.",
    solution:
      "Architecture SaaS server-first sur Next.js avec workflows automatisés, génération dynamique de PDF avec QR codes et portail étudiants sécurisé.",
    results: [
      "Signature 100% numérique des contrats étudiants",
      "Génération automatique des brochures avec QR codes",
      "Zéro perte de documents et suivi centralisé",
    ],
    metrics: [
      { label: "Gain de temps administratif", value: "-75%" },
      { label: "Temps de chargement", value: "< 0.3s" },
      { label: "Contrats traités", value: "100% digital" },
    ],
  },
  {
    id: "proj_rentabook",
    slug: "rent-a-book",
    title: "Rent a Book / Scolaris",
    tagline: "E-Commerce à fort trafic pour la rentrée scolaire (dizaines de milliers d'utilisateurs)",
    description:
      "Développeur à plein temps sur la migration critique de PrestaShop 1.6 vers la version 9 avec rebranding complet, révision intégrale du design et optimisation des tunnels d'achat pour des dizaines de milliers d'utilisateurs chaque année.",
    category: "ECOMMERCE",
    categoryLabel: "E-Commerce & Migration",
    client: "Rent a Book",
    role: "Développeur Full-Stack",
    year: "2024 - 2025",
    imageUrl: "https://hkjqevinuoraripkoyhf.supabase.co/storage/v1/object/public/portfolio-uploads/5d8a1eaa-7493-4dc5-82b0-b5cef4998263.png",
    techStack: ["PrestaShop 9", "PHP", "JavaScript", "AJAX", "MySQL", "cPanel"],
    liveUrl: "https://www.rentabook.be/fr",
    featured: true,
    order: 2,
    challenge:
      "Migrer une base de données legacy et des modules personnalisés vers une architecture moderne tout en absorbant les pics massifs de fréquentation de la rentrée scolaire.",
    solution:
      "Refonte modulaire sous PrestaShop 9, réécriture des requêtes critiques MySQL, interface réactive en AJAX et optimisation des serveurs.",
    results: [
      "Refonte graphique et technique réussie sans interruption de service",
      "Gestion fluide de dizaines de milliers de commandes simultanées",
      "Parcours d'achat simplifié et mobile-first",
    ],
    metrics: [
      { label: "Utilisateurs / an", value: "10 000+" },
      { label: "Version PrestaShop", value: "v1.6 ➔ v9" },
      { label: "Disponibilité", value: "99.99%" },
    ],
  },
  {
    id: "proj_amarea",
    slug: "amarea",
    title: "Amarea Wedding",
    tagline: "Site web dynamique & personnalisable pour wedding-planner d'exception",
    description:
      "Un site web Next.js raffiné et dynamique complètement personnalisable pour une organisatrice de mariages, mariant esthétique haut de gamme et fluidité.",
    category: "WEBSITE",
    categoryLabel: "Site Vitrine & CMS",
    client: "Amarea Wedding Planner",
    role: "Concepteur & Développeur Web",
    year: "2025",
    imageUrl: "https://hkjqevinuoraripkoyhf.supabase.co/storage/v1/object/public/portfolio-uploads/010ebe61-e32c-45d4-88e2-fb917121ee22.png",
    techStack: ["Next.js", "PostgreSQL", "Prisma", "Tailwind CSS", "Vercel"],
    liveUrl: "https://amarea.vercel.app",
    featured: true,
    order: 3,
    challenge:
      "Créer une identité visuelle immersive pour le secteur du mariage tout en offrant une autonomie totale d'édition de contenus via une base PostgreSQL/Prisma.",
    solution:
      "Développement Next.js ultra-rapide avec transitions élégantes, galerie photo haute définition compressée à la volée et back-office sur-mesure.",
    results: [
      "Expérience visuelle premium sur mobile et desktop",
      "Autonomie totale de mise à jour des prestations et photos",
      "Temps de chargement inférieur à 0.4s",
    ],
    metrics: [
      { label: "Score Google Lighthouse", value: "99/100" },
      { label: "Temps moyen LCP", value: "0.35s" },
      { label: "Conversion devis", value: "+85%" },
    ],
  },
  {
    id: "proj_mgevents",
    slug: "mgevents",
    title: "MgEvents",
    tagline: "Concepteur SaaS de sites d'invitations événementielles sur-mesure",
    description:
      "Conception d'une plateforme SaaS avec back-office avancé permettant de fabriquer des sites d'invitations sur-mesure via une multitude de templates personnalisables, déployés automatiquement sur des sous-domaines dédiés.",
    category: "SAAS",
    categoryLabel: "SaaS & Web App",
    client: "MgEvents",
    role: "Fondateur & Architecte Logiciel",
    year: "2025",
    imageUrl: "https://hkjqevinuoraripkoyhf.supabase.co/storage/v1/object/public/portfolio-uploads/070677c8-c377-4f5c-8522-d9a6d14d4ae2.png",
    techStack: ["Next.js", "PostgreSQL", "Supabase", "React Native", "Vercel Multi-tenant"],
    liveUrl: "https://mgevent-ycs5.vercel.app",
    featured: true,
    order: 4,
    challenge:
      "Permettre l'instanciation automatique de sites événementiels avec routing dynamique par sous-domaine et gestion des réponses d'invités (RSVP).",
    solution:
      "Architecture multi-tenant avec Supabase et Next.js Edge Middleware pour la résolution instantanée des domaines et sous-domaines.",
    results: [
      "Déploiement en 1 clic de sous-domaines personnalisés",
      "Tableau de bord de suivi des réponses invités en temps réel",
      "Éditeur de templates modulaire",
    ],
    metrics: [
      { label: "Temps de génération", value: "< 2s" },
      { label: "Architecture", value: "Multi-tenant" },
      { label: "Disponibilité", value: "100%" },
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
    categoryLabel: "Site Vitrine",
    client: "Focale 2.8",
    role: "Développeur Front-End & UI",
    year: "2025",
    imageUrl: "https://hkjqevinuoraripkoyhf.supabase.co/storage/v1/object/public/portfolio-uploads/b759597f-d2ca-4619-bff4-b513302ca7b9.png",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://www.focale28.be",
    featured: true,
    order: 5,
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
    tagline: "Site vitrine médical et prise de rendez-vous pour cabinet de podologie",
    description:
      "Site vitrine minimaliste et rassurant réalisé en Next.js pour une podologue afin d'informer sur les soins, les tarifs conventionnés et fluidifier la prise de rendez-vous.",
    category: "WEBSITE",
    categoryLabel: "Site Vitrine Médical",
    client: "Jeanne-Laure Podologue",
    role: "Développeur Full-Stack",
    year: "2025",
    imageUrl: "https://hkjqevinuoraripkoyhf.supabase.co/storage/v1/object/public/portfolio-uploads/cf1e5c5a-f69f-4b8c-8c1e-6b7fa7a55f90.png",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    liveUrl: "https://www.leonardi-podologue.com",
    featured: false,
    order: 6,
    challenge:
      "Donner une visibilité claire sur les prestations et faciliter la prise de contact pour une patientèle de tous âges.",
    solution:
      "Design épuré et lisible, boutons d'appels directs et intégration de la passerelle de prise de rendez-vous en ligne.",
    results: [
      "Accessibilité maximale sur smartphone",
      "Augmentation des réservations directes",
      "Référencement local optimisé",
    ],
    metrics: [
      { label: "Temps de chargement", value: "0.28s" },
      { label: "Accessibilité", value: "100/100" },
      { label: "Prise de RDV", value: "1 clic" },
    ],
  },
  {
    id: "proj_bruxelles",
    slug: "bruxelles-proprete",
    title: "Bruxelles Propreté",
    tagline: "Portail institutionnel et gestion de contenus publics (Drupal)",
    description:
      "Participation à la conception et au développement du portail public de Bruxelles Propreté lors de mon stage de dernière année d'études.",
    category: "FULLSTACK",
    categoryLabel: "Institutionnel & CMS",
    client: "Bruxelles Propreté",
    role: "Développeur Stagiaire Full-Stack",
    year: "2023",
    imageUrl: "https://hkjqevinuoraripkoyhf.supabase.co/storage/v1/object/public/portfolio-uploads/0229b3d7-f605-4732-a4b9-bd55b79b3b3f.png",
    techStack: ["Drupal", "PHP", "JavaScript", "MySQL", "HTML5/CSS3"],
    liveUrl: "https://www.bruxelles-proprete.be/fr",
    featured: false,
    order: 7,
    challenge:
      "Structurer des contenus institutionnels denses et multilingues accessibles à tous les citoyens de la région bruxelloise.",
    solution:
      "Architecture modulaire sous Drupal, respect des normes d'accessibilité et développement de composants interactifs.",
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
    id: "proj_bosmans",
    slug: "garage-bosmans",
    title: "Garage Bosmans",
    tagline: "Site vitrine professionnel pour garage automobile & pneumaticien",
    description:
      "Site vitrine développé en Next.js pour un garage automobile de pneumatiques, optimisé pour la recherche locale Google et les demandes de devis.",
    category: "WEBSITE",
    categoryLabel: "Site Vitrine PME",
    client: "Garage Bosmans",
    role: "Développeur Web",
    year: "2024",
    imageUrl: "https://hkjqevinuoraripkoyhf.supabase.co/storage/v1/object/public/portfolio-uploads/54a9f1b3-f071-472a-a21d-0fb4c8eca8f2.png",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://bosmansbandenpneus.com",
    featured: false,
    order: 8,
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
    categoryLabel: "Application Symfony",
    client: "Fifty-One Club Enghien",
    role: "Concepteur & Développeur",
    year: "2023",
    imageUrl: "https://hkjqevinuoraripkoyhf.supabase.co/storage/v1/object/public/portfolio-uploads/4cd3e12b-6b46-4320-a824-ba64db0f7923.png",
    techStack: ["Symfony", "PHP", "MySQL", "Twig", "JavaScript"],
    liveUrl: "https://fiftyone-enghien.com",
    featured: false,
    order: 9,
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
    ],
  },
];
