import {  FilterActionTypes} from "./filter-types"
import {  CardsActionTypes} from "../cards/cards-types"
import { searchBar, langageFilter } from '../../services/searchService'

export const searchAction = kword => {
  return dispatch => {
    return searchBar(kword)
      .then(search => {
        dispatch(SearchSuccess(search.data.results))
      })
      .catch(err => {
        dispatch(SearchFailure(err.response))
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