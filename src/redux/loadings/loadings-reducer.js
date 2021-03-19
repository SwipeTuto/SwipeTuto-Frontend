import { LoadingsActionTypes } from "./loadings-types"


const INITIAL_STATE = {
  pageLoading: false,
  updateAvatarButton: false,
}

const loadingsReducer = (state = INITIAL_STATE, action) => {
  // return {
  //   ...state,
  //   [action.type]: action.payload
  // }
  switch (action.type) {
    case LoadingsActionTypes.SET_PAGE_LOADING:
      return {
        ...state,
        pageLoading: true
      }
    case LoadingsActionTypes.UPDATE_AVATAR:
      return {
        ...state,
        updateAvatarButton: action.payload
      }
    default:
      return state
  }
}

export default loadingsReducer;