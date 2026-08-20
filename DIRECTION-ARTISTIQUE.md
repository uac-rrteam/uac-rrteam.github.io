# Direction artistique — Ratheil Research Team

> Document fondateur. Toute décision de design, de composant et d'animation du
> site doit pouvoir se justifier par une ligne d'ici. Ce qui ne s'y rattache pas
> ne rentre pas.
>
> Ouvert le 2026-08-19, complété le même jour après lecture des trois références
> Awwwards et du document de travail de l'équipe.

---

## 1. Ce que le site doit faire

Présenter la **Ratheil Research Team**, équipe de recherche animée par le
**Dr Vinasétan Ratheil Houndji** au sein du **LRSIA** (dirigé par le Pr Eugène
C. Ezin), à l'**IFRI**, Université d'Abomey-Calavi, Bénin.

Fil conducteur de l'équipe, tel qu'elle le formule elle-même :
**Artificial Intelligence for Societal Impact**.

Trois publics, dans cet ordre :

1. **Un pair qui évalue.** Un chercheur, un jury de financement, un labo
   partenaire. Il cherche la substance en trente secondes : qui, quoi, quels
   travaux, quelle production.
2. **Un étudiant qui postule.** Un futur doctorant de l'IFRI ou d'ailleurs. Il
   cherche des sujets, des personnes, une trajectoire.
3. **Un non-expert curieux.** Journaliste, décideur, partenaire institutionnel.
   `base.md` le dit : le ton doit être **vulgarisé, illustré, accessible**.

Le site est **bilingue FR / EN**, statique, publié sur **GitHub Pages**, et son
contenu vivant se dépose en Markdown sans toucher au code. Ces trois contraintes
ne sont pas négociables et gouvernent la DA autant que l'esthétique.

---

## 2. Les trois arbitrages posés

### Ton : sobre dehors, virtuose dedans

Le site doit se lire comme un site de recherche, pas comme une démonstration
technique. La qualité se sent dans la grille, le rythme typographique, la
précision des transitions et des micro-interactions. Elle ne se montre pas au
premier écran par un effet.

Conséquence pratique : **aucun effet ne se justifie par lui-même.** Un mouvement
existe parce qu'il rend une idée plus claire, jamais parce qu'il est beau.

`base.md` cite [BAIR Berkeley](https://bair.berkeley.edu/) comme référence de
structure. On en garde la structure et la crédibilité, pas l'absence de design.

### Identité : propre à l'équipe

La Ratheil Research Team est **une équipe parmi d'autres au LRSIA**. Le site est
le sien, pas celui du laboratoire.

- Les logos LRSIA, IFRI et UAC sont **présents et respectés**, en signature
  institutionnelle : pied de page, page « À propos du LRSIA ».
- Ils ne **dictent pas** la palette du site. La base actuelle échantillonne le
  bleu et le rouge du logo LRSIA et les impose partout ; on abandonne ce
  principe.
- L'équipe a **son propre emblème, sa palette et sa typographie**. Voir §3.

### Imagerie : la recherche elle-même

**Interdit d'entrée : l'imagerie générique de l'IA.** Pas de cerveau bleu, pas de
réseau de neurones décoratif, pas de tête de robot, pas de circuit imprimé, pas
de main humaine touchant une main numérique. La base actuelle en contient trois
(robot, fiole, réseau de neurones) : ils partent.

Le matériau visuel vient de ce que l'équipe **fait réellement**, et sa spécialité
la plus identifiable est la **programmation par contraintes** et l'optimisation
combinatoire. C'est un vocabulaire graphique précis, animable, et que personne
d'autre n'utilise.

---

## 3. L'emblème : le ratel

L'équipe s'appelle **Ratheil**. Le **ratel** est un animal africain, présent au
Bénin dans le complexe W-Arly-Pendjari. Le nom de l'équipe contenait déjà son
emblème ; il suffisait de l'entendre.

Ce n'est pas qu'un jeu de mots. Le ratel est **l'animal le plus obstiné du
continent** : il ne lâche pas, il creuse, il crochète les serrures, il ouvre les
ruches. Son nom savant, *Mellivora*, veut dire « mangeur de miel ». Pour une
équipe qui fait de l'optimisation sous contraintes avec des moyens comptés, la
métaphore n'a pas besoin d'être expliquée sur le site : elle se voit.

Trois raisons pratiques, au-delà du sens :

1. **Sa robe est déjà un logo.** Un manteau clair du crâne à la queue sur un
   corps noir. Deux valeurs, une silhouette lisible à 16 px comme à 800 px. Très
   peu d'animaux offrent ça.
2. **Il donne la palette.** Le noir de son corps est le fond sombre du site, le
   gris os de son manteau est le fond clair, le miel qu'il chasse est l'accent.
   La palette n'est pas choisie à côté de l'emblème, elle en sort. Voir §7.
3. **Personne d'autre ne l'utilise** dans le paysage des laboratoires d'IA.

### Le registre : propre et attachant

Le ratel est **soigné et attachant**, pas féroce et pas cartoon. La tête de trois
quarts, le regard de face, calme et attentif. Ce qui le rend attachant tient au
dessin, jamais à une pose : la rondeur du crâne, le petit museau, l'œil bien
posé. Il ne fait pas de clin d'œil, ne lève pas le pouce, ne parle pas dans une
bulle. **C'est une signature, pas une mascotte animée.**

Réalisation en **SVG dessiné à la main**, volume par dégradés, fourrure par
traits fins générés le long du sens du poil, bord du manteau irrégulier comme du
poil et non comme une découpe vectorielle.

Il vit à trois tailles, et chacune est une version distincte, pas la même
redimensionnée :

| Taille | Version | Où |
|---|---|---|
| 16–32 px | silhouette deux valeurs, sans fourrure | favicon, onglet |
| 40–80 px | tête simplifiée, fourrure suggérée | en-tête, pied de page |
| 200 px et plus | tête complète, fourrure dessinée | accueil, page équipe, ouvertures de section |

Le grand format **apparaît à des endroits choisis**, pas partout : l'ouverture de
l'accueil, la tête de la page équipe, la fin du site. Trois apparitions au
maximum sur un même parcours, sinon la signature devient un motif.

### Pourquoi pas de 3D

Pas de modèle Blender, pas de `cannon.js`, pas de `three.js` pour l'emblème. Un
moteur physique sert à simuler des collisions et un logo n'a rien à simuler ; un
GLB coûte des centaines de kilo-octets et une carte graphique, sur un site qui
doit s'ouvrir depuis Cotonou sur une connexion modeste, et ne descend pas à
16 px dans un onglet. Le SVG pèse quelques kilo-octets, suit le thème clair et
sombre, et reste net à toutes les tailles.

Si une scène en 3D se justifie un jour, ce sera **une page précise avec un
propos précis**, jamais l'identité.

---

## 4. Le vocabulaire visuel

### Le système de Likova, décodé

[likova.space](https://likova.space/) est **la** référence ; rocketweblabs.com et
micro1.ai ne sont que des appuis ponctuels. Voici ce qu'on lui reprend, relevé
au navigateur sur vingt-quatre écrans successifs.

**1. Un fond unique, et toutes les images ramenées dedans.** Likova pose un bleu
nuit sur tout le site et étalonne chaque photographie vers ce bleu. Il n'y a
jamais deux ambiances chromatiques. C'est de là que vient l'unité, avant même la
typographie. On fait pareil : un seul fond, et les portraits comme les photos
d'événement sont étalonnés vers lui.

**2. Le panneau à encoche.** C'est leur signature. Un rectangle, blanc ou sombre,
posé sur une photographie en pleine largeur, dont **un coin est entaillé par un
plus petit rectangle**. Jamais d'angle arrondi, jamais d'ombre portée, jamais de
liseré. Ce panneau est leur seul conteneur : il porte le logotype, les libellés,
les chiffres, la bannière de cookies.

On le reprend, et il devient honnêtement nôtre : **un rectangle entaillé, c'est
un domaine dont une valeur a été retirée.** Chez eux l'encoche est un ornement ;
chez nous c'est la primitive du §4. Même forme, sens réel.

**3. Le grand nombre.** Les chiffres sont les héros : `6-7-8`, `53 300`, `2026`,
`8`, `5`, `18`. Posés énormes, très légers, alignés à droite, avec à leur gauche
un libellé minuscule en capitales et un filet fin entre les deux. C'est la
manière exacte dont une équipe de recherche doit montrer ses chiffres.
Les nôtres, tous sourçables : membres, domaines, éditions du BWAI, année de
création du LRSIA, année de la thèse.

**4. Deux tailles de texte, et rien entre les deux.** Soit 10–12 px en capitales
très interlettrées, soit 60–120 px très légers. Il n'y a pas de taille moyenne.
Cette absence est ce qui donne le calme.

**5. Le paragraphe d'affirmation, aligné à droite.** Les grandes déclarations
sont en capitales, légères, alignées à droite sur le fond. C'est inhabituel et
c'est ce qui les distingue du texte courant.

**6. Le panneau épinglé dont le contenu relaie.** Le mouvement dominant : un
panneau reste en place pendant que la photographie change dessous et que son
contenu se remplace. On sait déjà faire, c'est le mécanisme de
`PinnedStackReveal` et `WheelSectionSwap` dans la bibliothèque.

**7. La carte au trait.** Une carte sombre, routes en filets d'un pixel, icônes
minuscules, et le lieu dans un petit cadre. Elle sert à montrer des distances.
La nôtre montrera les collaborations : UCLouvain, IFRI, CNHU-HKM, les éditions
du BWAI.

Ce qu'on **ne** reprend pas de Likova : la barre de navigation à quatre entrées
disparates, le compteur de favoris, et le fait que la page d'accueil ne dise
jamais ce que le lieu est avant le troisième écran. Un site de recherche doit
répondre en trente secondes.

### Le socle : la contrainte qui propage

Quatre primitives, toutes tirées de la résolution sous contraintes. Elles
servent de bibliothèque de formes pour l'ensemble du site.

| Primitive | Ce que c'est | Ce que ça donne à l'écran |
|---|---|---|
| **Domaine** | l'ensemble des valeurs encore possibles pour une variable | une rangée de cellules dont certaines s'éteignent |
| **Propagation** | fixer une variable réduit les domaines voisins | une extinction en cascade, de proche en proche |
| **Arbre de recherche** | on branche, on explore, on coupe | des branches qui s'ouvrent, certaines élaguées |
| **Tournée** | un parcours à réordonner sur un semis de points | un chemin qui se dénoue et se raccourcit |

Ces quatre formes se déclinent en **grilles, cascades, élagages et chemins**.
C'est le seul répertoire autorisé pour les visuels abstraits du site.

### Un motif par domaine de recherche

Chaque grand domaine reçoit une déclinaison, pour qu'on les distingue au coup
d'œil sans jamais lire une étiquette.

| Domaine | Motif |
|---|---|
| **IA pour l'agriculture** | la parcelle, une grille de rendement qui se remplit |
| **IA pour la santé** | le signal, une série temporelle (l'EEG de l'épilepsie est littéral) |
| **IA pour l'éducation** | la cohorte, une distribution qui se répartit |
| **Optimisation pour le bien commun** | le graphe, une tournée qui se réordonne |

### La place de la photographie

La photographie est réservée aux **personnes** et aux **événements** : portraits
de l'équipe, images du CP4SD et des éditions du BWAI. Elle documente, elle
n'illustre pas un concept. Aucune photo d'illustration achetée, aucune banque
d'images générique.

---

## 5. Architecture de l'information

```
/                     accueil : la thèse de l'équipe, les quatre domaines, les temps forts
/about/lrsia          le laboratoire, sa direction, ses six domaines, la Déclaration de Montréal
/about/team           l'équipe : d'où vient le nom, ce qu'on cherche, comment collaborer
/research             page-chapeau des quatre domaines, une sous-page par domaine
/people               la liste des membres
/people/<slug>        une page par membre
/events               CP4SD 2025, les éditions du BWAI, ce qui vient
/news                 actualités, alimentées par content/blog/<slug>.<langue>.md
```

### Une page par membre

Chaque membre a **sa propre page**, pas une carte dans une grille. Elle porte son
portrait, son statut, son année d'arrivée, son sujet expliqué en langage clair,
ses projets, ses liens (GitHub, LinkedIn, Google Scholar, e-mail, site
personnel), ses enseignements et ses responsabilités associatives quand il y en
a.

Les profils sont hétérogènes et c'est normal : l'équipe compte des doctorants,
des assistants de recherche, des stagiaires de licence, et des collaborateurs
extérieurs dont les travaux sortent des quatre domaines annoncés. **Le gabarit
doit accueillir cette diversité sans la lisser**, et chacun a droit à la même
page complète, quel que soit son statut.

**L'effectif est ouvert et grandira.** Conséquence directe sur la structure :
une page membre est un fichier `content/people/<slug>.<langue>.md` avec un
en-tête de métadonnées. Ajouter quelqu'un veut dire déposer deux fichiers et une
photo, jamais toucher au code. La liste `/people` se construit à partir du
dossier, dans un ordre déclaré par les métadonnées et non codé en dur.

Neuf membres sont documentés à ce jour dans le document de travail. Le gabarit
doit tenir aussi bien pour un doctorant avec des publications que pour un
stagiaire de licence arrivé cette année.

### Règle de contenu

**Tout ce qui évolue est en Markdown**, rien qui évolue n'est en dur dans un
composant. Personnes, actualités, événements, publications.

---

## 6. Le mouvement et les éléments permanents

Le mouvement suit le sujet. Dans une résolution sous contraintes, les choses
**convergent, se réduisent, se résolvent**. Jamais elles ne rebondissent, ne
flottent ni ne scintillent.

1. **Un mouvement dit quelque chose de vrai.** Une liste qui se filtre filtre
   pour de bon. Un chiffre qui monte compte quelque chose de réel.
2. **Ça se résout, ça ne s'agite pas.** Courbes de sortie franches, pas de
   ressort, pas d'oscillation, pas de flottement continu.
3. **Une idée par écran.** Un mouvement orchestré vaut mieux que six effets
   dispersés.
4. **Le repos coûte zéro.** Aucune boucle ne tourne quand rien ne bouge. Le site
   doit tenir sur une connexion et une machine modestes, c'est un site
   universitaire béninois avant d'être une vitrine.
5. **`prefers-reduced-motion` est un vrai état**, pas une case à cocher : le site
   doit rester complet et lisible sans une seule animation.

### Le repère de défilement, à gauche

Une **colonne verticale fixe sur le bord gauche**, lue comme un thermomètre : une
graduation fine sur toute la hauteur de la fenêtre, une colonne de miel qui monte
au fur et à mesure de la lecture, et le nom de la section courante en Martian
Mono, à la verticale, au niveau atteint.

Il remplace la barre de défilement native, qui est masquée. Il n'est pas
décoratif : il dit **où on en est et dans quelle section**, ce qu'aucune barre
native ne dit. Les graduations correspondent aux sections réelles de la page, on
peut cliquer dessus pour y aller.

Contraintes : il disparaît sous 900 px de large, il est navigable au clavier, il
reste lisible sur les deux thèmes, et sous `prefers-reduced-motion` il saute
d'une graduation à l'autre au lieu de glisser.

---

## 7. Palette

Elle sort du ratel, et de rien d'autre. Le corps donne le sombre, le manteau
donne le clair, le miel donne l'accent.

### Le fond, une seule valeur pour tout le site

Likova ne travaille pas sur un noir neutre mais sur un **bleu très sombre**, et
y ramène chaque photographie. C'est de là que vient son unité. On adopte le
principe, pas la valeur : notre fond est `#080B16`, un noir bleuté un peu plus
profond et moins saturé que le leur.

Ce choix reste fidèle au ratel : sa robe noire vue de nuit tire au bleu, et le
miel ressort bien plus franchement sur un bleu nuit que sur un gris.

**Toute photographie publiée sur le site est étalonnée vers `#080B16`.** Pas
d'exception, pas de vignette laissée en l'état.

### Neutres

Les gris sont **froids**, franchement bleutés dans le thème sombre. C'est ce qui
fait ressortir l'accent chaud sans qu'il ait besoin d'être criard, et c'est ce
qui distingue une palette choisie d'un gris par défaut.

| Rôle | Sombre | Clair |
|---|---|---|
| Fond | `#080B16` | `#E8E9E7` |
| Surface levée | `#11162A` | `#F4F4F2` |
| Filet, bordure | `#1E2540` | `#CDCFCB` |
| Texte | `#E9EAEC` | `#0C0F18` |
| Texte adouci | `#E9EAEC` à 62 % | `#0C0F18` à 66 % |

Contrastes vérifiés : 15,6:1 sur le texte principal en thème sombre et 15,3:1 en
thème clair (AAA), 6,2:1 sur le texte adouci (AA).

### Accent, le miel

| Jeton | Sombre | Clair | Usage |
|---|---|---|---|
| `--miel` | `#E9A13B` | `#E9A13B` | aplats, filets, colonne du repère, état actif |
| `--miel-encre` | `#E9A13B` | `#8A5310` | texte et liens |

Sur fond sombre le miel donne 8,5:1, il peut porter du texte. Sur fond clair il
tombe à 1,8:1 : **il ne porte jamais de texte sur fond clair**, on passe à
`--miel-encre`, qui donne 5,6:1.

### Couleurs sémantiques

Le vocabulaire visuel repose sur des états, ils ont donc leur propre jeu,
distinct de l'accent. **Un état n'est jamais signalé par le miel.**

| État | Couleur | Sens |
|---|---|---|
| **Assigné, résolu** | `#4FA88A` | la variable a pris sa valeur |
| **Ouvert, indécis** | aucune couleur | un domaine non réduit n'a pas de couleur, c'est le propos |
| **Élagué, éliminé** | `#E0736B` sur sombre, `#C0453E` sur clair | la branche est coupée |

Les deux thèmes sont **conçus séparément**, aucun n'est obtenu par inversion. Le
socle de jetons hérité d'e-freeshop actuellement dans `src/index.css` est
remplacé intégralement.

---

## 8. Typographie

### Wúrà mi by GemmaS, pour tout ce que le site dit

Likova compose **tout** dans un seul caractère, du titre de 96 px au libellé de
10 px. C'est une grande part de son unité, et on la reprend.

Ce caractère sera **Wúrà mi by GemmaS**, dessiné par Siméon Céphas Amoussou.
C'est une grotesque géométrique dérivée d'Outfit (SIL OFL 1.1), condensée à
84 %, avec une signature propre : sur sept majuscules dont une barre rejoint un
montant (`B D E F P R T`), la jonction reste **ouverte**, une fente subsiste.

Deux raisons de la prendre ici, au-delà du fait qu'elle nous appartient :

1. **Son squelette est celui de Likova.** TT Norms Pro et Wúrà mi sont deux
   grotesques géométriques ; posées très légères et très ouvertes, elles
   produisent le même calme.
2. **Sa signature ne se voit qu'en très léger.** En Regular, les fentes
   ouvertes passent presque inaperçues. À 96 px en ExtraLight, elles portent le
   mot. Le caractère a été dessiné pour ce format sans qu'on le sache.

La famille a été complétée le 2026-08-19 : **ExtraLight (200) et Light (300)**
construites depuis la même source variable par
`gadgets/efreeshop-vite-starter/scripts/construire-police.py`, aux valeurs d'axe
100 et 170.

| Graisse | Où | Interdit |
|---|---|---|
| **ExtraLight 200** | titres et nombres au-dessus de 60 px, interlettrage `0.30em` sur le nom de l'équipe | tout ce qui est sous 40 px |
| **Light 300** | titres de 32 à 60 px, grands nombres secondaires | tout ce qui est sous 24 px |
| **Regular 400** | interface, navigation, libellés en capitales à 10–12 px, tableaux | — |
| **Bold 700** | un mot mis en avant dans une phrase, rien de plus | jamais un titre entier |

Règle vérifiée au rendu : **sous 20 px, l'ExtraLight décroche**, la ligne part en
fumée sur fond sombre. Les deux graisses légères sont strictement des graisses
d'affichage.

### Newsreader, pour la voix de la recherche

Seule exception, et elle est motivée : Likova n'a presque pas de texte long, le
site de l'équipe en aura beaucoup (articles vulgarisés, notices des membres,
pages de domaine). Une grotesque géométrique condensée est mauvaise sur huit
cents mots.

**Newsreader** (OFL, Google Fonts, axe optique) porte donc le **corps des textes
longs uniquement** : 17–19 px, graisse 400, interligne 1.65, colonne de 65
caractères. Elle n'est chargée que sur les pages qui en contiennent.

La distinction devient alors porteuse de sens : **ce que le site dit se lit en
Wúrà mi, ce que l'équipe écrit se lit en Newsreader.** Le lecteur le sent avant
de le comprendre.

### Pas de troisième caractère

Pas de fonte à chasse fixe téléchargée. Les libellés minuscules en capitales se
composent en Wúrà mi Regular, comme chez Likova. Si du code apparaît dans un
article, il prend l'empilement système `ui-monospace`, qui ne coûte rien.

On garde en revanche le **libellé entre accolades** (`{ ÉVÉNEMENTS }`,
`{ 2025 }`) repéré chez Rocket Web Labs : c'est un signe typographique, pas une
fonte, et pour une équipe d'informatique c'est un signe natif.

### Contraintes de fonte

- Diacritiques vérifiés dans le fichier livré : `é è à ç É È À Ç œ Œ « »`
  passent toutes. Vinasétan, Kpédétin, Mélène, Sèmèvo, Aïcha se composent juste.
- **Les lettres du fon `ɖ ɛ ɔ` sont absentes** de Wúrà mi, vérifié dans la table
  de caractères. Si un mot en fon doit apparaître, il faut d'abord ajouter les
  glyphes à la fonte. Ne jamais les improviser ni les remplacer par un
  approchant.
- Interdits d'office : **Inter**, **Space Grotesk**, **Outfit**. Les deux
  premiers sont le défaut de tout le monde ; le troisième est la fonte de
  micro1, l'une de nos références, et c'est aussi la source de Wúrà mi, ce qui
  rendrait la parenté visible.
- `font-display: swap`, empilement de secours réel déclaré, et les quatre
  graisses servies en woff2 depuis `public/fonts/` (environ 20 Ko chacune).

---

## 9. Ce qu'on ne fait pas

Liste tirée de l'état actuel du dépôt et des dérives courantes.

- Pas de composant d'effet emprunté à une autre marque. Le
  `apple-tahoe-liquid-glass-button` et le `glass-surface` actuels partent.
- Pas de jetons recopiés d'un autre projet.
- Pas d'imagerie générique de l'IA (voir §2).
- Pas de banque d'images pour illustrer un concept.
- Pas de sur-titre en petites capitales espacées au-dessus de chaque section.
  Les accolades de §8 sont un libellé de donnée, pas un sur-titre de section.
- Pas de dégradé violet-bleu, pas de carte à liseré arrondi, pas d'emoji comme
  marqueur de section. Rocket Web Labs en met dans son texte courant ; on ne le
  reprend pas.
- Pas de chiffre inventé. Un compteur affiche une valeur qu'on peut sourcer.
- Aucune référence à e-freeshop, à sa charte, à son logo ou à son nommage. C'est
  un autre projet, ce sont ici de vraies personnes.

---

## 10. Ce qui reste à vérifier auprès de l'équipe

- Les portraits des membres, en photographie, cadrage et format homogènes.
- La liste des publications avec leurs références complètes, qui alimentera le
  tableau de la page recherche.
- L'ordre d'affichage voulu sur `/people` : par statut, par année d'arrivée, ou
  par domaine.

---

*Ratheil Research Team · LRSIA · IFRI · Université d'Abomey-Calavi, Bénin*
