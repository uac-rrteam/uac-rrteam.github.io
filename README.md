# Ratheil Research Team, LRSIA

Site de presentation de la **Ratheil Research Team**, equipe de recherche
animee par le **Dr Vinasetan Ratheil Houndji** au sein du **LRSIA**
(Laboratoire de Recherche en Sciences Informatiques et Applications), a
l'**IFRI**, Universite d'Abomey-Calavi (UAC), Benin.

Fil conducteur : *l'intelligence artificielle au service de l'impact
societal*, sur quatre axes : agriculture, sante, education et optimisation
pour le bien commun.

## Stack technique

- **React 19** + **TypeScript** (strict)
- **Vite** (build et serveur de developpement)
- **react-router** (navigation, site bilingue FR / EN)
- **Tailwind CSS 4**
- **GSAP** + **Lenis** (animations et defilement fluide)
- **react-markdown** (contenu des articles)

Site statique, publie sur GitHub Pages.

## Lancer le projet en local

Pre-requis : **Node.js 20+** et **npm**.

```bash
# 1. Installer les dependances
npm install

# 2. Lancer le serveur de developpement
npm run dev
```

Le serveur affiche une adresse locale (par defaut `http://localhost:5173`).
Ouvrez-la dans un navigateur ; la page se recharge a chaque modification.

## Autres commandes

```bash
# Construire la version de production (dans le dossier dist/)
npm run build

# Previsualiser la version de production construite
npm run preview
```

## Publier un article (actualites)

Le site est pense pour etre maintenu sans toucher au code. Pour ajouter une
actualite, il suffit de **deposer un fichier Markdown** dans
[`content/blog/`](content/blog/), nomme `<slug>.<langue>.md`
(exemple : `cp4sd-2025.fr.md`).

Chaque fichier commence par un bloc d'informations (frontmatter) :

```markdown
---
title: Titre de l'article
date: 2026-01-15
summary: Une phrase de resume.
author: Ratheil Research Team
tags: [evenement, IA]
---

Le corps de l'article, en Markdown.
```

L'article apparait automatiquement dans la page Actualites. Aucun code a
modifier.

## Structure

```text
content/blog/     Articles en Markdown (le contenu qui evolue)
public/imgs/      Logos (LRSIA, IFRI, UAC) et portraits
src/
  sections/       Sections de la page d'accueil (hero, laboratoire, membres...)
  pages/          Pages du site
  components/     Composants reutilisables (mise en page, UI, contenu)
  i18n/           Traductions FR / EN
```

---

*LRSIA, Ratheil Research Team. IFRI, Universite d'Abomey-Calavi, Cotonou, Benin.*
