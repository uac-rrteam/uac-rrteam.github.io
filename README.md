# Ratheil Research Team, UAC

Site de présentation de l'équipe de recherche animée par le **Dr Vinasetan Ratheil Houndji** à l'Université d'Abomey-Calavi (UAC), Bénin.

## Stack technique

- **React 19** + **TypeScript** (strict)
- **Vite** (build et serveur de développement)
- **react-router** (navigation, site bilingue FR / EN)
- **Tailwind CSS 4**
- **GSAP** + **Lenis** (animations et défilement fluide)
- **react-markdown** (contenu des articles)

Site statique, publie sur GitHub Pages.

## Lancer le projet en local

Prérequis : **Node.js 20+** et **npm**.

```bash
# 1. Installer les dependances
npm install

# 2. Lancer le serveur de développement
npm run dev
```

Le serveur affiche une adresse locale (par défaut `http://localhost:5173`).
Ouvrez-la dans un navigateur ; la page se recharge à chaque modification.

## Autres commandes

```bash
# Construire la version de production (dans le dossier dist/)
npm run build

# Previsualiser la version de production construite
npm run preview
```

## Publier un article (actualites)

Le site est pense pour etre maintenu sans toucher au code. Pour ajouter une
actualité, il suffit de **déposer un fichier Markdown** dans
[`content/blog/`](content/blog/), nomme `<slug>.<langue>.md`
(exemple : `cp4sd-2025.fr.md`).

Chaque fichier commence par un bloc d'informations (frontmatter) :

```markdown
---
title: Titre de l'article
date: 2026-01-15
summary: Une phrase de résumé.
author: Ratheil Research Team
tags: [evenement, IA]
---

Le corps de l'article, en Markdown.
```

L'article apparaît automatiquement sur la page Actualités. Aucun code a
modifier.

## Structure

```text
content/blog/     Articles en Markdown (le contenu qui évolue)
public/imgs/      Logos (LRSIA, IFRI, UAC) et portraits
src/
  sections/       Sections de la page d'accueil (hero, laboratoire, membres...)
  pages/          Pages du site
  components/     Composants réutilisables (mise en page, UI, contenu)
  i18n/           Traductions FR / EN
```

---

*Ratheil Research Team. Université d'Abomey-Calavi, Abomey-Calavi, Bénin.*
