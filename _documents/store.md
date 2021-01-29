

# STORE
## User Reducer
### State
```javascript
const INITIAL_STATE = {
  currentUser: currentUser ? currentUser : null,
  token: token ? token : null,
};
```
### Actions
| TYPE             | PAYLOAD | STATE            | DESCRIPTION                               |
|------------------|---------|------------------|-------------------------------------------|
| SET_CURRENT_USER | user    | user/currentUser | Information concenant l'utilisateur loggé |




## Layout Reducer
### State
```javascript
const INITIAL_STATE = {
  popupShown: false,
  fullscreen: false,
  showUserNav: false
};
```
### Actions
| TYPE             | PAYLOAD | STATE              | DESCRIPTION                                                                     |
|------------------|---------|--------------------|---------------------------------------------------------------------------------|
| SHOW_POPUP_CARD  | -       | layout/popupShown  | True : Ajoute la classe "active" à CardFullPopup pour l'afficher                |
| CLOSE_POPUP_CARD | -       | layout/popupShown  | False : Enlève la classe "active" pour enlever la popup                         |
| SHOW_FULLSCREEN  | -       | layout/fullscreen  | True : Active mode fullscreen et change l'affichage du slider en grand          |
| CLOSE_FULLSCREEN | -       | layout/fullscreen  | False : Désactive mode fullscreen et change l'affichage du slider en plus petit |
| TOGGLE_USER_NAV  | -       | layout/showUserNav | Toggle l'affichage du menu User s'il y en a un connecté (depuis NavTop)         |




## Cards Reducer
### State
```javascript
const INITIAL_STATE = {
  clickedCard: null,
  cardsFetched: {},
  errors: {}
};
```
### Actions
| TYPE                  | PAYLOAD | STATE              | DESCRIPTION                                    |
|-----------------------|---------|--------------------|------------------------------------------------|
| GET_ALL_CARDS_SUCCESS | cards   | cards/cardsFetched | Retour toutes les cards                        |
| GET_ALL_CARDS_FAILURE | error   | cards/errors       | errors                                         |
| -                     | -       | -                  |                                                |
| SET_CLICKED_CARD      | card    | cards/clickedCard  | Reçoit l'objet correspondant à la card cliquée |
| SET_NO_CLICKED_CARD   | null    | cards/clickedCard  | Repasse clickedCard à null                     |






## Filter Reducer
### State
```javascript
	const  INITIAL_STATE = {
		searchType:  'all',
		currentSearch:  '',
		errors:  '',
		categoryFilter:  '',
		cardFilter:  ""
	}
```
- Il est important de retourner les cartes après les filtres dans le state cardFilter
- SET_CURRENT_SEARCH doit contenir les recherches par kword ou langage pour pouvoir ajouter le filtre category
### Actions
| TYPE                               | PAYLOAD           | STATE                                       | DESCRIPTION                                                                  |
|------------------------------------|-------------------|---------------------------------------------|------------------------------------------------------------------------------|
| GET_CARDS_LANGAGE_CATEGORY_REQUEST | langage, category | filter/currentSearch, filter/categoryFilter | set langage et category                                                      |
| GET_CARDS_LANGAGE_CATEGORY_SUCCESS | cards             | filter/cardFilter                           | Return  de la liste des cartes par le back après l'ajout de filtre catégorie |
| GET_CARDS_LANGAGE_CATEGORY_FAILURE | errors            | filter/errors                               | errors                                                                       |
| -                                  | -                 | -                                           |                                                                              |
| SEARCH_SUCCESS                     | Cards             | filter/cardFilter                           | Retour des cartes après la recherche                                         |
| SEARCH_FAILURE                     | errors            | filter/errors                               | errors                                                                       |
| -                                  | -                 | -                                           | -                                                                            |
| DELETE_CURRENT_SEARCH              | -                 | filter/currentSearch                        | Passe currentSearch à vide                                                   |
| SET_CATEGORY_FILTER                | categories        | filter/categoryFilter                       | Applique la categorie voulu                                                  |
| SET_TYPE                           | type              | filter/searchType                           | Applique le type voulu (ALL, LANGAGE, SEARCH)                                |
| SET_CURRENT_SEARCH                 | kword  or langage | filter/currentSearch                        | Stock la valeur de la recherche et retour les cartes si elle trouve          |

## BreakPoint (EventListener)
Cette section à pour but de voir les appels au store à des moments précises tel qu'un clique ou un load

### HomePage
```javascript
// URL
http://localhost:3000/
```
#### OnLoad
Au chargement de la page
| TYPE                  | DIFF      | REDUCER | state                 |
|-----------------------|-----------|---------|-----------------------|
| SET_CATEGORY_FILTER   | categorie | filter  | filter/categoryFilter |
| GET_ALL_CARDS_SUCCESS | Cards     | cards   | cardsFetched          |


###  Langage (menu catégories)
```javascript
// URL
http://localhost:3000/cards/php
```
#### OnClick
Au click sur un langage
| TYPE               | DIFF    | REDUCER | state         |
|--------------------|---------|---------|---------------|
| SET_SEARCH_TYPE    | type    | filter  | searchType    |
| SET_CURRENT_SEARCH | langage | filter  | currentSearch |

###  Category (Sous menu Langage)
```javascript
// URL
http://localhost:3000/cards/php/memo
```
#### OnClick
Au click sur un categorie
| TYPE | DIFF | REDUCER | state |
| ---- | ---- | ------- | ----- |
