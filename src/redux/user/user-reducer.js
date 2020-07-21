import { UserActionTypes } from './user-types'

let currentUser = JSON.parse(localStorage.getItem('user'));
let token = localStorage.getItem('token');

const INITIAL_STATE = {
  currentUser: currentUser ? currentUser.user : null,
  clickedUser: null,
  token: currentUser ? currentUser.token : null,
  errors: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UserActionTypes.LOGIN_SUCCESS:
      return { ...state, currentUser: action.payload, };
    case UserActionTypes.LOGIN_FAILURE:
      return { ...state, errors: action.payload, };
    case UserActionTypes.LOGOUT_SUCCESS:
      return { ...state, currentUser: action.payload, };


    case UserActionTypes.REGISTER_SUCCESS:
      return { ...state, currentUser: action.payload };
    case UserActionTypes.REGISTER_FAILURE:
      return { ...state, error: action.payload };

    case UserActionTypes.SET_CLICKED_USER:
      return { ...state, clickedUser: action.payload };
    case UserActionTypes.GET_CLICKED_USER_ERROR:
      return { ...state, errors: action.payload };

    default:
      return state;
  }
};

export default userReducer;