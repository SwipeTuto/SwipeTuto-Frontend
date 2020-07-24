import { FilterActionTypes } from "./filter-types"
import { setLoading, setLoaded } from '../layout/layout-actions'

import { searchBar } from '../../services/searchService'
import { getCards, CardsActionTypes, getCardAfterfilter, getCardsByUser, getOtherPageCard, getCardById } from '../../services/cardsService'




const getCardAfterfilterSuccess = cards => ({
  type: FilterActionTypes.GET_CARDS_FILTER_SUCCESS,
  payload: cards
})
const getCardAfterfilterFailure = err => ({
  type: FilterActionTypes.GET_CARDS_FILTER_FAILURE,
  payload: err
})

export const getCardAfterfilterAction = (search) => {
  return dispatch => {
    // dispatch(getCardAfterfilteryRequest(search))
    dispatch(setLoading());
    console.log(search)
    return getCardAfterfilter(search)
      .then(rep => {
        dispatch(getCardAfterfilterSuccess(rep.data))
        dispatch(setLoaded())
        return rep
      })
      .catch(err => {
        dispatch(getCardAfterfilterFailure(err.response))
        dispatch(setLoaded())
      })
  }
}

const getCardByIdSuccess = card => ({
  type: FilterActionTypes.GET_CARD_BY_ID_SUCCESS,
  payload: card
})
const getCardByIdFailure = err => ({
  type: FilterActionTypes.GET_CARD_BY_ID_FAILURE,
  payload: err
})

export const getCardByIdAction = cardId => {
  return dispatch => {
    dispatch(setLoading());
    return getCardById(cardId)
      .then(rep => {
        dispatch(getCardByIdSuccess(rep.data))
        dispatch(setLoaded())
        return rep
      })
      .catch(err => {
        dispatch(getCardByIdFailure(err.response))
        dispatch(setLoaded())
      })

  }
}


// Gestion de la currentSearch avec mots, catégorie, langage et ordre de recherche
export const setCurrentSearch = (item, value = null) => ({
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
export const getCardsByUserEmailAction = userEmail => {
  return dispatch => {
    return getCardsByUser(userEmail)
      .then(rep => {
        dispatch(getCardsByUserEmailSuccess(rep.data))
        return rep
      })
      .catch(err => {
        dispatch(getCardsByUserEmailFailure(err.response))
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


const getCardsByUserEmailSuccess = cards => ({
  type: FilterActionTypes.GET_CARDS_BY_USER_SUCCESS,
  payload: cards
})
const getCardsByUserEmailFailure = err => ({
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
        dispatch(getOtherPageSuccess(rep.data))
        dispatch(setCurrentCardGridPage(newPageNumber))
        dispatch(setLoaded())

        return rep
      })
      .catch(err => {
        dispatch(getOtherPageFailure(err.response))
        // console.log(err)
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


// Clicked Card 
export const setClickedCard = (card) => ({
  type: FilterActionTypes.SET_CLICKED_CARD,
  payload: card,
});

export const setNoClickedCard = () => ({
  type: FilterActionTypes.SET_NO_CLICKED_CARD,
  payload: null,
});


// Récupérer toutes les cards
export const getCardsAction = () => {
  return dispatch => {
    return getCards()
      .then(card => {
        dispatch(setCardsFetchedInStore(card)) // cards dans cardsFetched
        dispatch(setLoaded()) // stop loader
      })
      .catch(err => {
        dispatch(getCardsErrors(err.response))
      })
  }
};


const getCardsErrors = error => ({
  type: FilterActionTypes.GET_ALL_CARDS_FAILURE,
  payload: error
})