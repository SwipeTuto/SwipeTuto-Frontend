import { FilterActionTypesv, FilterActionTypes} from "./filter-types"
import { searchBar } from '../../services/searchService'

export const searchAction = kword => {
  console.log('kword',kword)
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