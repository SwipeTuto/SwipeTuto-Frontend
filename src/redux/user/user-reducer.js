import { UserActionTypes } from './user-types'

let currentUser = JSON.parse(localStorage.getItem('user'));

const INITIAL_STATE = {
  currentUser: currentUser ? currentUser.user : null,
  clickedUser: null,
  token: currentUser ? currentUser.token : null,
  errors: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        errors: null
      };
    case UserActionTypes.UPDATE_USER_INFOS_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        errors: null
      };
    case UserActionTypes.UPDATE_USER_INFOS_FAILURE:
      return {
        ...state,
        errors: action.payload,
      };
    case UserActionTypes.LOGIN_SUCCESS:
      return { ...state, currentUser: action.payload, errors: null };
    case UserActionTypes.LOGIN_FAILURE:
      return { ...state, errors: action.payload, };
    case UserActionTypes.LOGOUT_SUCCESS:
      return { ...state, currentUser: action.payload, errors: null };
    case UserActionTypes.DELETE_USER_ERRORS:
      return { ...state, errors: null, };


    case UserActionTypes.REGISTER_SUCCESS:
      return { ...state, currentUser: action.payload, errors: null };
    case UserActionTypes.REGISTER_FAILURE:
      return { ...state, error: action.payload };

    case UserActionTypes.SET_CLICKED_USER:
      return { ...state, clickedUser: action.payload, errors: null };
    case UserActionTypes.GET_CLICKED_USER_ERROR:
      return { ...state, errors: action.payload };

    default:
      return state;
  }
};

export default userReducer;