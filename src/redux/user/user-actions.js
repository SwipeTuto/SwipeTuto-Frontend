import { UserActionTypes } from './user-types'
import { loginManuel, logout, register } from '../../services/userService'
import history from "../../helper/history"

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const loginAction = (username, password) => {
  return dispatch => {
    return loginManuel(username, password)
      .then(user => {
        history.push('/', history.location)
        history.go()
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
const loginErrors = error => ({
  type: UserActionTypes.LOGIN_FAILURE,
  payload: error
})

export const logoutAction = () => {
  return dispatch => {
    history.push('/', history.location)
    history.go()
    logout() && dispatch(logoutSuccess())
  }
}

const logoutSuccess = () => ({
  type: UserActionTypes.LOGOUT_SUCCESS,
  payload: ''
})

// REGISTER
export const registerAction = users => {
  return dispatch => {
    register(users)
      .then(user => {
        dispatch(registerSuccess(user));
        // history.push('/cards', history.location)
        // history.go()
      })
      .catch(err => {
        dispatch(registerErrors(err.response))
      })
  }
}

const registerSuccess = user => ({
  type: UserActionTypes.REGISTER_SUCCESS,
  payload: user
})
const registerErrors = error => ({
  type: UserActionTypes.REGISTER_FAILURE,
  payload: error
})