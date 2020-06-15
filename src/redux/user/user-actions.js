import { UserActionTypes } from './user-types'
import { loginManuel, logout } from '../../services/userService'

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const loginAction = (username, password) => {
  return dispatch => {
      return loginManuel(username, password)
          .then(user => {
              dispatch(loginSuccess(user.data.user));
          })
          .catch(err => {
              dispatch(loginErrors(err.response))
          })
  }
}

const loginSuccess = user => ({
  type: UserActionTypes.LOGIN_SUCCESS,
  payload: user
})
const loginErrors = error =>  ({
  type: UserActionTypes.LOGIN_FAILURE,
  payload: error
})

export const logoutAction = () => {
  return dispatch => {
    logout() && dispatch(logoutSuccess())
  }
}

const logoutSuccess = () => ({
  type: UserActionTypes.LOGOUT_SUCCESS,
  payload: ''
})