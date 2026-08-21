# Ratheil Research Team, UAC


> **Pour publier une actualité**, il suffit de créer son dossier dans
> `content/actualites/` et de l'envoyer : la marche à suivre tient dans
> [PUBLIER.md](PUBLIER.md), et rien d'autre n'est à installer.

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

## Modifier le contenu

Le site est pensé pour être maintenu sans toucher au code. Les biographies,
projets, événements, pages institutionnelles et actualités vivent dans
[`content/`](content/). La convention commune est `<slug>/index.<langue>.md`,
par exemple `maryse-gahou/index.fr.md` et `maryse-gahou/index.en.md`.

La structure complète et les champs disponibles sont expliqués dans
[CONTENU.md](CONTENU.md). Pour publier uniquement une actualité, suivez
[PUBLIER.md](PUBLIER.md).

Une actualité se dépose dans [`content/actualites/`](content/actualites/) :

```text
content/actualites/2027-02-10-soutenance/
  index.fr.md
  index.en.md
```

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
content/
  actualites/     Actualités
  blog/           Billets de blog (code et mathématiques acceptés)
  events/         Événements et leurs pages de détail
  pages/          Pages À propos, Recherche et Événements
  people/         Biographies des membres
  projects/       Projets et leurs pages de détail
public/imgs/      Logos (LRSIA, IFRI, UAC) et portraits
src/
  sections/       Sections de la page d'accueil (hero, laboratoire, membres...)
  pages/          Pages du site
  components/     Composants réutilisables (mise en page, UI, contenu)
  donnees/        Lecture et structuration des fichiers Markdown
  i18n/           Traductions de l'interface FR / EN
```

---

*Ratheil Research Team. Université d'Abomey-Calavi, Abomey-Calavi, Bénin.*
