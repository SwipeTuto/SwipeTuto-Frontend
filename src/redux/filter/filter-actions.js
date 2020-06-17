import { FilterActionTypes } from "./filter-types"

import { searchBar } from '../../services/searchService'
import { getCardAfterfilter, getCardsByUser } from '../../services/cardsService'

export const searchAction = kword => {
  return dispatch => {
    return searchBar(kword)
      .then(search => {
        dispatch(SearchSuccess(search.data))
        dispatch(setCurrentSearch(kword))
        dispatch(setType("search"))

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
        dispatch(getCardAfterfilterSuccess(rep.data.results))
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


export const getCardsByUserNameAction = username => {
  return dispatch => {
    return getCardsByUser(username)
      .then(rep => {
        dispatch(getCardsByUserNameSuccess(rep.data.results))
        return rep
      })
      .catch(err => {
        dispatch(getCardsByUserNameFailure(err.response))
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

