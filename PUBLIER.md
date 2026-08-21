# Publier une actualité

Pour mettre une nouvelle en ligne, il suffit de **créer un dossier** dans
`content/actualites/`, d'y déposer les deux versions du texte et d'envoyer le
tout sur GitHub. Le site se
reconstruit tout seul et la nouvelle paraît deux à trois minutes plus tard sur
<https://uac-rrteam.github.io/>.

Aucune ligne de code à écrire, aucun outil à installer.

---

## 1. Créer le fichier

Le nom du dossier suit toujours la même forme :

```
AAAA-MM-JJ-un-titre-court/
  index.fr.md
  index.en.md
```

- **La date** met la nouvelle à sa place dans le fil, la plus récente en haut.
- **Le titre court** n'a ni accent, ni espace, ni majuscule ; les mots sont
  séparés par des tirets.
- **`index.fr.md`** contient la version française et **`index.en.md`** la version anglaise.

Exemples :

```
content/actualites/2026-11-23-bwai-2026/index.fr.md
content/actualites/2026-11-23-bwai-2026/index.en.md
content/actualites/2027-02-10-soutenance-de-these/index.fr.md
```

> Si la traduction anglaise n'est pas encore prête, publiez seulement
> `index.fr.md` : le français servira temporairement de repli.

---

## 2. Écrire le contenu

Un fichier se compose de deux parties : une fiche d'identité entre deux lignes
de tirets, puis le texte.

```markdown
---
titre: Soutenance de thèse de Marianne BALOGOUN
date: 2027-02-10
periode: Février 2027
lien1: L'annonce | https://uac-ifri.bj/
---

Marianne BALOGOUN soutient sa thèse sur la **prédiction de la couverture
radio** par apprentissage automatique, appliquée à la télévision numérique
terrestre au Bénin.

La soutenance se tient à l'amphithéâtre de l'IFRI, campus d'Abomey-Calavi.
```

### Ce que la fiche peut contenir

| Ligne | Obligatoire | Ce qu'elle fait |
|---|---|---|
| `titre` | oui | Le titre affiché en gros |
| `date` | oui | Range la nouvelle dans le fil, format `AAAA-MM-JJ` |
| `periode` | non | Ce qui s'affiche à gauche du titre. Sans elle, la date brute s'affiche |
| `lien1` à `lien4` | non | Un lien : l'intitulé, une barre verticale `\|`, puis l'adresse |
| `brouillon` | non | Mettre `oui` pour garder la nouvelle dans le dépôt sans la publier |

### Ce que le texte accepte

Le texte s'écrit en **Markdown**, une façon d'écrire du texte enrichi sans
balise compliquée :

```markdown
Du texte normal, avec du **gras** et de l'*italique*.

## Un sous-titre

- Un point de liste
- Un autre

[Un lien vers le BWAI](https://bwai-ifri-uac.bj/)

> Une citation, pour une phrase à mettre en avant.
```

Laissez une ligne vide entre deux paragraphes : c'est ce qui les sépare.

---

## 3. Envoyer

### Depuis le site de GitHub, sans rien installer

1. Ouvrir <https://github.com/uac-rrteam/uac-rrteam.github.io>
2. Entrer dans le dossier `content/actualites/`
3. Cliquer sur **Add file**, puis **Create new file**
4. Dans le champ du nom, écrire par exemple
   `2027-02-10-soutenance-de-these/index.fr.md`, puis coller le contenu
5. En bas, cliquer sur **Commit changes**

C'est tout. La publication démarre à l'instant où vous validez.

### Depuis votre ordinateur

```bash
git add content/actualites/
git commit -m "Ajoute l'actualité de la soutenance de Marianne"
git push
```

---

## 4. Vérifier que c'est en ligne

Ouvrir l'onglet **Actions** du dépôt :
<https://github.com/uac-rrteam/uac-rrteam.github.io/actions>

- Un rond **orange** : la publication est en cours, laissez-lui deux minutes.
- Une coche **verte** : c'est en ligne. Rafraîchissez la page des actualités.
- Une croix **rouge** : quelque chose bloque. Cliquez dessus pour lire ce qui
  a échoué, puis voyez la section suivante.

---

## 5. Si quelque chose ne paraît pas

Dans l'ordre, les trois causes les plus fréquentes :

**Le fichier n'apparaît pas du tout.** Vérifiez son chemin : il doit s'appeler
`index.fr.md` ou `index.en.md` dans son propre dossier sous
`content/actualites/`.

**La nouvelle s'affiche sans titre.** La fiche d'identité est mal fermée. Il
faut exactement trois tirets `---` sur la première ligne, et trois tirets sur
une ligne à part avant le texte.

**Elle paraît au mauvais endroit dans le fil.** La date est mal écrite. Le
format est `2027-02-10`, l'année d'abord, et rien d'autre sur la ligne.

---

## Ce qui se passe derrière

À chaque envoi sur la branche `main`, GitHub construit le site et le publie.
La recette est dans `.github/workflows/deployer.yml` et n'a pas besoin d'être
modifiée pour ajouter du contenu.

Les fichiers Markdown sont lus **au moment de la construction**, pas quand un
visiteur ouvre la page. Une nouvelle mal écrite se voit donc dans l'onglet
Actions, jamais chez le visiteur.
