# Filtre

## PROBLEME

- Problème avec le state de input Search
- La catégorie reste sélectionner après changement de langage
- Limiter le SET_TYPE. Si le payload et égale au type choisi ne pas faire l'appellent au store (faire un helper)
- Dans le state user : currentUser et user qui contiennent les infos user. Doublons.
- Dans FiltersBar : utilisation de handleclick pour "Tous", comme pour les autres onglets. Mais la requête pour all ne donne aucune card.
- Comment actualiser l'affichage de l'avatar sans recharger la page quand quelqu'un se connecte ?
- Mettre chargement pendant recherche des cards, et là si aucune mettre message. Utiliser promesses ? Sinon ajouter une action au lancement de la requete (mettre un truc du style searchInProgress: true; dans le state au lancement d'une recherche -> loader affiché; et quand requete success : passer à false -> enlève le loader)
- Problème : première card n'affiche que la première image. Les autres images ne sont pas trouvées. Les cards suivantes fonctionnent.

## CORRIGE

- Manque un api pour retourn seulement les catégories (OK)
- Problème au niveau du menu category. Celui-ci, fait bien l'appelle au Back, recup les Cartes filtrer, mais les cartes ne change pas
- Quand la page se reload avec l'URL au complet (cards/html/memo). Le filtre ne se passe pas (se remet sur tous par défaut)
