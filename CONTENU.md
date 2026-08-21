# Gérer le contenu du site

À l'exception de la page d'accueil, le contenu éditorial du site se trouve
dans `content/`. Vite lit tous les fichiers Markdown pendant la construction :
ajouter un fichier suffit pour qu'il apparaisse dans la liste correspondante.

## Convention commune

Chaque contenu bilingue utilise deux fichiers portant le même identifiant :

```text
mon-identifiant.fr.md
mon-identifiant.en.md
```

L'identifiant devient l'adresse de la page. Par exemple :

```text
content/projects/ai4ckd.fr.md
→ /fr/research/projects/ai4ckd
```

Chaque fichier commence par un en-tête placé entre deux lignes `---`, puis son
corps en Markdown. Les champs inconnus sont ignorés et les champs facultatifs
peuvent simplement être omis.

## Membres — `content/people/`

```markdown
---
nom: Prénom NOM
statut: Doctorante
sujet: Sujet ou axe principal
arrivee: 2026
portrait: nom-du-fichier-sans-extension
ordre: 3
projets: [ai4ckd, stop-mnt]
lien1: LinkedIn | https://linkedin.com/...
lien2: E-mail | mailto:adresse@example.com
---

La biographie et les autres sections s'écrivent ici en Markdown.

## Responsabilités

- Une responsabilité
- Une autre
```

Le portrait doit être placé dans `public/imgs/people/`. Le champ `portrait`
ne contient ni dossier ni extension. Si aucun portrait n'est disponible, il
suffit de supprimer la ligne.

`ordre` détermine la position dans l'annuaire. `projets` contient les
identifiants des projets à afficher sur la page du membre.

## Projets — `content/projects/`

```markdown
---
titre: Nom du projet
periode: Depuis 2026
role: Coordonnateur
financement: Organisme de financement
collaborateurs: [Nom ou institution, Autre collaborateur]
resume: Une phrase affichée dans la liste.
ordre: 1
lien1: Site du projet | https://example.com
lien2: Dépôt GitHub | https://github.com/...
---

Description complète du projet en Markdown.
```

Chaque projet apparaît automatiquement sur `/research` et son titre mène à sa
page de détail. Le champ `collaborateurs` accepte des personnes ou des
institutions ; ne renseignez que les collaborations confirmées.

## Événements — `content/events/`

```markdown
---
titre: Nom de l'événement
date: 2027-05-12
periode: 12 au 15 mai 2027
lieu: Abomey-Calavi, Bénin
resume: Une phrase affichée dans la liste.
lien1: Site officiel | https://example.com
---

Présentation complète de l'événement en Markdown.
```

La date doit garder le format `AAAA-MM-JJ`, car elle sert au classement du plus
récent au plus ancien.

## Pages — `content/pages/`

Les fichiers `about`, `research` et `events` portent les textes généraux de
leurs pages. Leur en-tête contient `titre` et `resume`; leur corps accepte le
Markdown ordinaire.

## Actualités — `content/actualites/`

La procédure spécifique, y compris les brouillons et les liens, est détaillée
dans [PUBLIER.md](PUBLIER.md).

## Traductions et repli

Le français est la langue de référence. Si la version anglaise d'un élément
manque, le site affiche temporairement sa version française au lieu de masquer
l'élément. Il reste préférable de créer les deux fichiers ensemble.
