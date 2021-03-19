import { LoadingsActionTypes } from "./loadings-types"


const INITIAL_STATE = {
  pageLoading: false
}

const loadingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LoadingsActionTypes.SET_PAGE_LOADING:
      return {
        ...state,
        pageLoading: true
      }
    default:
      return state
  }
}

export default loadingsReducer;