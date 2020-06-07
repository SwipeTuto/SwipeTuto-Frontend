

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
| TYPE             | PAYLOAD | STATE       | DESCRIPTION                                |
| ---------------- | ------- | ----------- | ------------------------------------------ |
| SET_CURRENT_USER | user    | currentUser | Information concenant l'utilisateur logger |




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
| TYPE             | PAYLOAD | STATE       | DESCRIPTION |
| ---------------- | ------- | ----------- | ----------- |
| SHOW_POPUP_CARD  |         | popupShown  |             |
| CLOSE_POPUP_CARD |         | popupShown  |             |
| SHOW_FULLSCREEN  |         | fullscreen  |
| CLOSE_FULLSCREEN |         | fullscreen  |
| TOGGLE_USER_NAV  |         | showUserNav |




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
| TYPE                  | PAYLOAD | STATE        | DESCRIPTION             |
| --------------------- | ------- | ------------ | ----------------------- |
| GET_ALL_CARDS_SUCCESS | cards   | cardsFetched | Retour toutes les cards |
| GET_ALL_CARDS_FAILURE | error   | errors       | errors                  |
| -                     | -       | -            |                         |
| SET_CLICKED_CARD      |         | clickedCard  |
| SET_NO_CLICKED_CARD   |         | clickedCard  |






## Filter Reducer
### State
```javascript
	const  INITIAL_STATE = {
		searchType:  'all',
		currentSearch:  '',
		errors:  '',
		categoryFilter:  'all',
		cardFilter:  ""
	}
```
- Il est important de retourner les cartes après les filtres dans le state cardFilter
- SET_CURRENT_SEARCH doit contenir les recherches par kword ou langage pour pouvoir ajouter le filtre category
### Actions
| TYPE                               | PAYLOAD           | STATE                        | DESCRIPTION                                                                 |
| ---------------------------------- | ----------------- | ---------------------------- | --------------------------------------------------------------------------- |
| GET_CARDS_LANGAGE_REQUEST          | langage           | currentSearch                | Return le langage choisi                                                    |
| GET_CARDS_LANGAGE_SUCCESS          | cards             | cardFilter                   | Return  de la liste des cartes par le back après l'ajoute de filtre langage |
| GET_CARDS_LANGAGE_FAILURE          | errors            | errors                       | errors                                                                      |
| -                                  | -                 | -                            |                                                                             |
| GET_CARDS_LANGAGE_CATEGORY_REQUEST | langage, category | currentSearch,categoryFilter | set langage et category                                                     |
| GET_CARDS_LANGAGE_CATEGORY_SUCCESS | cards             | cardFilter                   | Return  de la liste des cartes par le back après l'ajoute de filtre         |
| GET_CARDS_LANGAGE_CATEGORY_FAILURE | errors            | errors                       | errors                                                                      |
| -                                  | -                 | -                            |                                                                             |
| SEARCH_SUCCESS                     | Cards             | cardFilter                   | Retour des cartes après la recherche                                        |
| SEARCH_FAILURE                     | errors            | errors                       | errors                                                                      |
| -                                  | -                 | -                            |      -                                                                      |
| DELETE_CURRENT_SEARCH              |                   |                              |                                                                             |
| SET_CATEGORY_FILTER                | categories        | categoryFilter               | Applique la categorie voulu                                                 |
| SET_TYPE                           | type              | searchType                   | Applique le type voulu (ALL, LANGAGE, SEARCH)                               |
| SET_CURRENT_SEARCH                 | kword  or langage | currentSearch                | Stock la valeur de la recherche et retour les cartes si elle trouve         |

## BreakPoint (EventListener)
Cette section à pour but de voir les appels au store à des moments précises tel qu'un clique ou un load

### HomePage
```javascript
// URL
http://localhost:3000/
```
#### OnLoad
Au chargement de la page
| TYPE                          | DIFF  | REDUCER | state        |
| ----------------------------- | ----- | ------- | ------------ |
| ***SET_CATEGORY_FILTER ???*** | empty | null    | null         |
| GET_ALL_CARDS_SUCCESS         | Cards | cards   | cardsFetched |


###  Langage (menu catégories)
```javascript
// URL
http://localhost:3000/cards/php
```
#### OnClick
Au click sur un langage
| TYPE                      | DIFF    | REDUCER | state         |
| ------------------------- | ------- | ------- | ------------- |
| GET_CARDS_LANGAGE_REQUEST | langage | filter  | cardFilter2   |
| SET_SEARCH_TYPE           | type    | filter  | searchType    |
| SET_CURRENT_SEARCH        | langage | filter  | currentSearch |
| GET_CARDS_LANGAGE_SUCCESS | cards   | filter  | cardFilter    |

###  Category (Sous menu Langage)
```javascript
// URL
http://localhost:3000/cards/php/memo
```
#### OnClick
Au click sur un categorie
| TYPE | DIFF | REDUCER | state |
| ---- | ---- | ------- | ----- |
