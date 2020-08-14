# Critères de validation des inputs - projet Swipetuto

| type                | critères                                                                                                                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| email               | Doit être au format exemple@test.com (avec XX puis @ puis XX puis .YY). Ce qui suit le "." à la fin doit faire entre 2 et 6 caractères (normalement il n'existe pas de terminaison de taille plus petite ou plus grande). |
| username            | Peut contenir des lettres majuscules et minuscules, des chiffres, et les tirets "-" et "_". Doit faire entre 3 et 16 caractères. Attention, lettres avec accents non tolérées (trop pénible à gérer pour le username).    |
| name (first & last) | Uniquement des lettres, accents autorisés, entre 2 et 16 caractères.                                                                                                                                                      |
| url                 | Format classique d'url, avec https obligatoire. Les caractères dangereux type "<" ne sont pas admis, seulement : "@:%_\+.~#?&//=".                                                                                        |
| password            | Lettres majuscules et minuscules autorisées, chiffres aussi, avec tous autres symboles. Minimum 8 caractères dont : 1 minuscule, 1 majuscule et 1 nombre.                                                                 |
| description         | Tout autorisé entre 0 et 250 caractères.                                                                                                                                                                                  |

