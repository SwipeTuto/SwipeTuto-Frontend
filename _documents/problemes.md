# Filtre
## PROBLEME
- double appel au back au chargement de la page
- Problème avec le state de input Search
- La catégorie reste sélectionner après changement de langage
- Limiter le SET_TYPE. Si le payload et égale au type choisi ne pas faire l'appellent au store (faire un helper)


## CORRIGE
- Manque un api pour retourn seulement les catégories (OK)
- Problème au niveau du menu category. Celui-ci, fait bien l'appelle au Back, recup les Cartes filtrer, mais les cartes ne change pas
- Quand la page se reload avec l'URL au complet (cards/html/memo). Le filtre ne se passe pas