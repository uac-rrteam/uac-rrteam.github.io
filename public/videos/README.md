# Video de fond du hero

Le hero de l'accueil attend une video de fond en boucle, dans l'esprit de
micro1.ai (montagnes, oiseaux qui traversent lentement vers l'horizon).

## Fichiers attendus

Deposer ici, sans changer les noms (le hero les charge dans cet ordre) :

- `hero.webm` (prioritaire, plus leger)
- `hero.mp4` (repli, compatibilite large)

Et une image d'attente pendant le chargement :

- `../imgs/hero-poster.jpg`

## Contraintes

- Duree courte (quelques secondes a 1-2 min), boucle sans coupure visible.
- Sombre et calme : le titre blanc se pose dessus, un voile noir 35 % est deja
  applique par le code.
- Poids maitrise : viser moins de 5 Mo pour la webm (GitHub Pages sert le
  fichier tel quel, pas de streaming). Recompresser si besoin (ffmpeg, crf ~30).
- Sans son (la balise est `muted`).

Tant qu'aucune video n'est presente, le hero affiche un fond sombre uni : la
mise en page reste correcte, il manque juste le mouvement.
