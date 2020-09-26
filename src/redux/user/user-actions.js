import { UserActionTypes } from './user-types'
import { loginManuel, logout, register, getUserById, updateUserInfos, loginGoogle, login, getUserIDToken, getUserFavoriesById } from '../../services/userService'
import history from "../../helper/history"
import { setLoading, setLoaded } from '../layout/layout-actions';

export const deleteUserErrors = () => ({
  type: UserActionTypes.DELETE_USER_ERRORS,
});

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const loginAction = (username, password) => {
  return dispatch => {
    return loginManuel(username, password)
      .then(user => {
        dispatch(deleteUserErrors())
        if (!user.data) {
          dispatch(loginErrors("Erreur avec votre compte. Merci d'en essayer un autre."))
          localStorage.removeItem('user')
        } else {
          history.push('/', history.location)
          history.go()
        }
      })

  }
}
export const loginGoogleAction = () => {
  return dispatch => {
    return loginGoogle()
      .then(rep => {
        login(rep)
          .then(rep => {
            dispatch(deleteUserErrors())
            if (!rep.data) {
              dispatch(loginErrors("Erreur avec votre compte. Merci d'en essayer un autre."))
            } else {
              history.push('/', history.location)
              history.go()
            }
          })
      })

  }
}



export const loginErrors = error => ({
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
        dispatch(registerSuccess(user.data.user));
        history.push('/', history.location)
        history.go()
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


// upload virtuellement le store
export const toggleStoreSavedCardAction = cardId => ({
  type: UserActionTypes.TOGGLE_STORE_SAVED_CARD,
  payload: cardId
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
  return dispatch => {
    dispatch(setLoading());
    getUserById(id).then(rep => {
      dispatch(setClickedUser(rep.data))
      dispatch(setLoaded())
      dispatch(deleteUserErrors())
      return rep.data
    }).catch(err => {
      dispatch(getClickedUserError(err.message))
      dispatch(setLoaded())
      return err
    })
  }
}

export const getCurrentUserAction = id => {
  return dispatch => {
    dispatch(setLoading());
    getUserById(id).then(rep => {
      dispatch(setCurrentUser(rep.data.user))
      dispatch(setLoaded())
      dispatch(deleteUserErrors())
      return rep.data
    }).catch(err => {
      dispatch(getClickedUserError(err.message))
      dispatch(setLoaded())
      return err
    })
  }
}




export const updateUserInfosAction = userInfos => {
  // console.log(userInfos)
  return dispatch => {
    return (

      updateUserInfos(userInfos)
        .then(rep => {
          dispatch(updateUserInfosSuccess(rep.data.user))
          dispatch(setLoaded())
          return rep
        }).catch(err => {
          dispatch(updateUserInfosError(err))
          dispatch(setLoaded())
          return err
        })
    )

  }
}

export const updateUserInfosError = error => ({
  type: UserActionTypes.UPDATE_USER_INFOS_FAILURE,
  payload: error
})
export const updateUserInfosSuccess = userInfos => ({
  type: UserActionTypes.UPDATE_USER_INFOS_SUCCESS,
  payload: userInfos
})
