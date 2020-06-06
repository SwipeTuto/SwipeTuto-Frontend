import { FilterActionTypes } from "./filter-types"
import { CardsActionTypes } from "../cards/cards-types"
import { searchBar, langageFilter } from '../../services/searchService'

export const searchAction = kword => {
  return dispatch => {
    return searchBar(kword)
      .then(search => {
        dispatch(SearchSuccess(search.data.results))
        dispatch(setCurrentSearch(kword))
        dispatch(setSearchType("search"))

      })
      .catch(err => {
        dispatch(SearchFailure(err.response))
        dispatch(setCurrentSearch("Une erreur est survenue."))
      })
  }
}

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

const SearchSuccess = kword => ({
  type: FilterActionTypes.SEARCH_SUCCESS,
  payload: kword
})

const SearchFailure = error => ({
  type: FilterActionTypes.SEARCH_FAILURE,
  payload: error
})

export const getLangage = langage => {
  return dispatch => {
    return langageFilter(langage)
      .then(search => {
        dispatch(getLangageSuccess(search.data.results))
      })
      .catch(err => {
        dispatch(getLangageFailure(err.response))
      })
  }
}

const getLangageSuccess = card => ({
  type: FilterActionTypes.GET_CART_LANGAGE_SUCESS,
  payload: card
})

const getLangageFailure = error => ({
  type: FilterActionTypes.GET_CART_LANGAGE_FAILURE,
  payload: error
})

export const setSearchType = (searchType) => ({
  type: FilterActionTypes.SET_SEARCH_TYPE,
  payload: searchType
})