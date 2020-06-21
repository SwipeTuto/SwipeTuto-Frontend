import { FilterActionTypes } from "./filter-types"

import { searchBar } from '../../services/searchService'
import { getCardAfterfilter, getCardsByUser, getOtherPageCard } from '../../services/cardsService'
import { getCardsLoaded } from "../cards/cards-actions"


export const searchAction = kword => {
  return dispatch => {
    return searchBar(kword)
      .then(search => {
        dispatch(SearchSuccess(search.data))
        dispatch(setCurrentSearch(kword))
        dispatch(setType("search"))
        dispatch(getCardsLoaded())

      })
      .catch(err => {
        dispatch(SearchFailure(err.response))
        dispatch(setCurrentSearch("Une erreur est survenue."))
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



export const getCardAfterfilterAction = (langage, category) => {
  return dispatch => {
    dispatch(getCardAfterfilteryRequest(langage, category))
    return getCardAfterfilter(langage, category)
      .then(rep => {
        dispatch(setType('search'));
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



export const setCurrentSearch = searchWords => ({
  type: FilterActionTypes.SET_CURRENT_SEARCH,
  payload: searchWords
})

export const deleteCurrentSearch = () => ({
  type: FilterActionTypes.DELETE_CURRENT_SEARCH,
})

export const setCategoryFilter = (category) => ({
  type: FilterActionTypes.SET_CATEGORY_FILTER,
  payload: category,
});

export const setType = (searchType) => ({
  type: FilterActionTypes.SET_TYPE,
  payload: searchType
})


export const setTotalNumberOfCardsSearchedToNull = () => ({
  type: FilterActionTypes.SET_TOTAL_NUMBER_OF_CARDS_SEARCHED_TO_NULL,
})

export const setCardsFetchedInStore = (cards) => ({
  type: FilterActionTypes.SET_CARDS_FETCHED_IN_STORE,
  payload: cards
})


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

export const getOtherCardsByAuthorNameAction = username => {
  return dispatch => {
    return getCardsByUser(username)
      .then(rep => {
        dispatch(getOtherCardsByAuthorNameSuccess(rep.data))
        console.log(rep.data)
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