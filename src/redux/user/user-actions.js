import { UserActionTypes } from './user-types'
import { loginManuel, logout, register, getUserById } from '../../services/userService'
import history from "../../helper/history"
import { getCardById } from '../../services/cardsService';
import { setLoading, setLoaded } from '../layout/layout-actions';

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

// Other user infos
export const setOtherUser = (otherUser) => ({
  type: UserActionTypes.SET_OTHER_USER,
  payload: otherUser,
});

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



// Get user par son id
const setClickedUser = user => ({
  type: UserActionTypes.SET_CLICKED_USER,
  payload: user,
})

const getClickedUserError = error => ({
  type: UserActionTypes.GET_CLICKED_USER_ERROR,
  payload: error,
})


export const getUserByIdAction = id => {
  console.log('OK', id)
  return dispatch => {
    console.log("OK2")
    dispatch(setLoading());
    getUserById(id).then(rep => {
      dispatch(setClickedUser(rep.data))
      console.log(rep.data)
      dispatch(setLoaded())
      return rep.data
    }).catch(err => {
      dispatch(getClickedUserError(err.message))
      dispatch(setLoaded())
      return err
    })
  }
}
