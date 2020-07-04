import { FilterActionTypes } from "./filter-types"

import { searchBar } from '../../services/searchService'
import { getCardAfterfilter, getCardsByUser, getOtherPageCard } from '../../services/cardsService'
import { getCardsLoaded } from "../cards/cards-actions"

// Recherche avec le back avec mots
export const searchAction = kword => {
  return dispatch => {
    return searchBar(kword)
      .then(search => {
        dispatch(SearchSuccess(search.data))
        dispatch(setCurrentSearch("searchWords", kword))

        dispatch(getCardsLoaded())

      })
      .catch(err => {
        dispatch(SearchFailure(err.response))
        dispatch(setCurrentSearch("searchWords", "Une erreur est survenue."))
      })
  }
}
const SearchSuccess = kword => ({
  type: FilterActionTypes.SEARCH_SUCCESS,
  payload: kword
})
const SearchFailure = error => ({
  type: FilterActionTypes.SEARCH_FAILURE,
  payload: error
})


// recherche vers le back avec langage et catégorie
export const getCardAfterfilterAction = (langage, category, currentUser) => {
  return dispatch => {
    dispatch(getCardAfterfilteryRequest(langage, category))
    return getCardAfterfilter(currentUser)
      .then(rep => {

        dispatch(getCardAfterfilterSuccess(rep.data))
        dispatch(getCardsLoaded())
        return rep
      })
      .catch(err => {
        dispatch(getCardAfterfilterFailure(err.response))
      })
  }
}
const getCardAfterfilteryRequest = (langage, category) => ({
  type: FilterActionTypes.GET_CARDS_LANGAGE_CATEGORY_REQUEST,
  payload: { langage, category }
})
const getCardAfterfilterSuccess = cards => ({
  type: FilterActionTypes.GET_CARDS_LANGAGE_CATEGORY_SUCCESS,
  payload: cards
})
const getCardAfterfilterFailure = err => ({
  type: FilterActionTypes.GET_CARDS_LANGAGE_CATEGORY_FAILURE,
  payload: err
})


// Gestion de la currentSearch avec mots, catégorie, langage et ordre de recherche
export const setCurrentSearch = (item, value) => ({
  type: FilterActionTypes.SET_CURRENT_SEARCH,
  payload: { item, value }
})

export const deleteCurrentSearch = (item) => ({
  type: FilterActionTypes.DELETE_CURRENT_SEARCH,
  payload: item
})

// Changement de l'ordre de classement (restera à connecter api pour requete - mixer avec requetes getCards et l'autre par langage/categorie)
export const setSearchOrder = (order) => ({
  type: FilterActionTypes.SET_SEARCH_ORDER,
  payload: order
})





// Mise des cartes récupérées du back dans le store
export const setCardsFetchedInStore = (cards) => ({
  type: FilterActionTypes.SET_CARDS_FETCHED_IN_STORE,
  payload: cards
})


// Fetch des cards à partir du nom de l'auteur
export const getCardsByUserNameAction = username => {
  return dispatch => {
    return getCardsByUser(username)
      .then(rep => {
        dispatch(getCardsByUserNameSuccess(rep.data))
        return rep
      })
      .catch(err => {
        dispatch(getCardsByUserNameFailure(err.response))
      })
  }
}

// Fetch des autres cards de l'auteur
export const getOtherCardsByAuthorNameAction = username => {
  return dispatch => {
    return getCardsByUser(username)
      .then(rep => {
        dispatch(getOtherCardsByAuthorNameSuccess(rep.data))
        return rep
      })
      .catch(err => {
        dispatch(getOtherCardsByAuthorNameFailure(err.response))
      })
  }
}


const getCardsByUserNameSuccess = cards => ({
  type: FilterActionTypes.GET_CARDS_BY_USER_SUCCESS,
  payload: cards
})
const getCardsByUserNameFailure = err => ({
  type: FilterActionTypes.GET_CARDS_BY_USER_FAILURE,
  payload: err
})

const getOtherCardsByAuthorNameSuccess = cards => ({
  type: FilterActionTypes.GET_OTHER_CARDS_BY_AUTHOR_SUCCESS,
  payload: cards
})
const getOtherCardsByAuthorNameFailure = err => ({
  type: FilterActionTypes.GET_OTHER_CARDS_BY_AUTHOR_FAILURE,
  payload: err
})


// Fetch des données d'une autre page
export const getOtherPageAction = (navLink, newPageNumber) => {
  return dispatch => {
    return getOtherPageCard(navLink)
      .then(rep => {
        console.log(newPageNumber)
        dispatch(getOtherPageSuccess(rep.data))
        dispatch(setCurrentCardGridPage(newPageNumber))
        dispatch(getCardsLoaded())

        return rep
      })
      .catch(err => {
        dispatch(getOtherPageFailure(err.response))
        console.log(err)
      })
  }
}

const getOtherPageSuccess = cards => ({
  type: FilterActionTypes.GET_OTHER_PAGE_ACTION_SUCCESS,
  payload: cards
})
const getOtherPageFailure = err => ({
  type: FilterActionTypes.GET_OTHER_PAGE_ACTION_FAILURE,
  payload: err
})


export const setCurrentCardGridPage = newPageNumber => ({
  type: FilterActionTypes.SET_CARDS_GRID_PAGE,
  payload: newPageNumber
})