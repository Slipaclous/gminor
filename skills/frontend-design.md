---
name: frontend-design
description: Directives pour créer des interfaces utilisateur soignées, distinctives et sans esthétique générique d'IA.
trigger: "@design"
---

# Skill: Modern & Distinctive Frontend Design

## Objectif & Vision
Ce skill s'active dès que du code UI, des composants graphiques ou des pages web complètes doivent être créés ou modifiés. L'agent doit agir comme un **Lead Product & UI Designer**.

## 1. Principes Anti-Génériques (Anti-AI Slop)
* **Typographie délibérée** : Éviter les polices par défaut surutilisées (Inter, Roboto, Arial). Associer une typographie d'affichage (Display/Header) ayant du caractère avec une typographie de corps propre et lisible (ex: Syne + DM Sans, Plus Jakarta Sans, Instrument Serif).
* **Palette de couleurs restreinte** : Définir 1 couleur dominante, 1 teinte d'accentuation forte et des nuances neutres profondes (Dark mode riche ou Light mode chaleureux). Pas de gradients multicolores aléatoires.
* **Mise en page asymétrique & Bento Grid** : Varier la taille et la hiérarchie visuelle des conteneurs. Ne pas empiler 6 cartes identiques de même taille.

## 2. Règles d'Exécution UI & UX
* **Micro-interactions & États** : Chaque élément interactif (bouton, carte, champ) doit posséder ses états : `hover`, `active`, `focus-visible`, `disabled` et `loading`.
* **Transitions fluides** : Utiliser des durées courtes (150ms à 300ms) avec des courbes douces (`cubic-bezier(0.16, 1, 0.3, 1)`).
* **Gestion du vide (Whitespace)** : Augmenter l'espace négatif (`gap`, `padding`) pour aérer l'information.
* **Accessibilité (A11y)** : Respecter un ratio de contraste minimal de 4.5:1 pour le texte normal (WCAG AA).

## 3. Structure de Design Tokens (Tailwind / CSS Variables)
Lors de la création de composants, intégrer ou respecter ces tokens :
* **Border Radius** : Choisir une direction claire (angles vifs `rounded-none`, modernisme discret `rounded-lg`, ou ultra-arrondi `rounded-2xl` / `rounded-full`).
* **Shadows & Bordures** : Préférer des bordures subtiles (`border border-white/10` ou `border-slate-200/80`) plutôt que des ombres portées floues et lourdes.