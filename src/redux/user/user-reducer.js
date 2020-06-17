import { UserActionTypes } from './user-types'

let currentUser = JSON.parse(localStorage.getItem('user'));
let token = localStorage.getItem('token');

const INITIAL_STATE = {
  currentUser: currentUser ? currentUser : null,
  token: token ? token : null,
  errors: ''
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
      return { currentUser: action.payload };
    case UserActionTypes.REGISTER_FAILURE:
      return { error: action.payload };

    default:
      return state;
  }
};

export default userReducer;