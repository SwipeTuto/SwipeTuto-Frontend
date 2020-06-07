import { FilterActionTypes } from "./filter-types"
import { searchBar, langageFilter, getCardByLangageAndCategory } from '../../services/searchService'





export const searchAction = kword => {
  return dispatch => {
    return searchBar(kword)
      .then(search => {
        dispatch(SearchSuccess(search.data.results))
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

export const getCardByLangage = langage => {
  return dispatch => {
    dispatch(getLangageRequest(langage))
    return langageFilter(langage)
      .then(search => {
        dispatch(getLangageSuccess(search.data.results))
      })
      .catch(err => {
        dispatch(getLangageFailure(err.response))
      })
  }
}
const getLangageRequest = langage => ({
  type: FilterActionTypes.GET_CARDS_LANGAGE_REQUEST,
  payload: langage
})
const getLangageSuccess = card => ({
  type: FilterActionTypes.GET_CARDS_LANGAGE_SUCCESS,
  payload: card
})
const getLangageFailure = error => ({
  type: FilterActionTypes.GET_CARDS_LANGAGE_FAILURE,
  payload: error
})


export const getCardByLangageAndCategoryAction = (langage, category) => {
  return dispatch => {
    dispatch(getCardByLangageAndCategoryRequest(langage, category))
    return getCardByLangageAndCategory(langage, category)
    .then(rep => {
      dispatch(getCardByLangageAndCategorySuccess(rep.data.results))
    })
    .catch (err => {
      dispatch(getCardByLangageAndCategoryFailure(err.response))
    })
  }
}
const getCardByLangageAndCategoryRequest = (langage, category) => ({
  type: FilterActionTypes.GET_CARDS_LANGAGE_CATEGORY_REQUEST,
  payload: { langage, category }
})
const getCardByLangageAndCategorySuccess = cards => ({
  type: FilterActionTypes.GET_CARDS_LANGAGE_CATEGORY_SUCCESS,
  payload: cards
})
const getCardByLangageAndCategoryFailure = err => ({
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

export const setSelectionType = (category) => ({
  type: FilterActionTypes.SET_CATEGORY_FILTER,
  payload: category,
});

export const setType = (searchType) => ({
  type: FilterActionTypes.SET_TYPE,
  payload: searchType
})
