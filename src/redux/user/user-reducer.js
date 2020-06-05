import { UserActionTypes } from './user-types'

let user = JSON.parse(localStorage.getItem('user'));
let currentUser = JSON.parse(localStorage.getItem('user'));
let token = localStorage.getItem('token');

const INITIAL_STATE = {
  currentUser: currentUser ? currentUser : null,
  user: user ? user : {},
  token: token ? token : null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;