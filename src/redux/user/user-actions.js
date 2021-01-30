import { UserActionTypes } from './user-types'
import { loginManuel, logout, register, getUserById, updateUserInfos, loginGoogle, login, LoginProviderFacebook, FacebookLogin, updatePrefService, getCurrentUser } from '../../services/userService'
import history from "../../helper/functions/createBrowserHistory"
import { setUserLoading, setUserLoaded, setLoaded, setLoading, openNotificationPopup } from '../layout/layout-actions';


export const deleteUserErrors = () => ({
  type: UserActionTypes.DELETE_USER_ERRORS,
});

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const loginAction = (username, password) => {
  const currentUrl = window.location.href;
  return dispatch => {
    return loginManuel(username, password)
      .then(user => {
        dispatch(deleteUserErrors())
        if (!user.data) {
          dispatch(loginErrors("Erreur avec votre compte. Merci d'en essayer un autre."))
          localStorage.removeItem('user')
        } else {
          if (currentUrl) {
            window.location.href = currentUrl;
          } else {
            return
          }
        }
      })

  }
}

export const loginGoogleAction = () => {
  const currentUrl = window.location.href;
  return dispatch => {
    return loginGoogle()
      .then(rep => {
        login(rep)
          .then(rep => {
            dispatch(deleteUserErrors())
            if (!rep.data) {
              dispatch(loginErrors("Erreur avec votre compte. Merci d'en essayer un autre."))
            } else {
              if (currentUrl) {
                window.location.href = currentUrl;
              } else {
                return
              }
            }
          })
      })

  }
}

export const loginFacebookAction = () => {
  const currentUrl = window.location.href;
  return dispatch => {
    return LoginProviderFacebook()
      .then(rep => {
        FacebookLogin(rep)
          .then(rep => {
            dispatch(deleteUserErrors())
            if (!rep.data) {
              dispatch(loginErrors("Erreur avec votre compte. Merci d'en essayer un autre."))
            } else {
              if (currentUrl) {
                window.location.href = currentUrl;
              } else {
                return
              }
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
        history.push('/search', history.location)
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
    dispatch(setUserLoading());
    getUserById(id).then(rep => {
      dispatch(setClickedUser(rep.data))
      dispatch(setUserLoaded())
      dispatch(deleteUserErrors())
      return rep.data
    }).catch(err => {
      dispatch(getClickedUserError(err.message))
      dispatch(setUserLoaded())
      return err
    })
  }
}

export const setNoClickedUser = () => ({
  type: UserActionTypes.SET_NO_CLICKED_USER
})

export const getCurrentUserAction = () => {
  return dispatch => {
    dispatch(setUserLoading());
    getCurrentUser().then(rep => {
      dispatch(setCurrentUser(rep.data.user))
      dispatch(setUserLoaded())
      dispatch(deleteUserErrors())
      return rep.data
    }).catch(err => {
      dispatch(getClickedUserError(err.message))
      dispatch(setUserLoaded())
      return err
    })
  }
}




export const updateUserInfosAction = userInfos => {
  return dispatch => {
    return (
      updateUserInfos(userInfos)
        .then(rep => {
          dispatch(updateUserInfosSuccess(rep.data.user))
          dispatch(setUserLoaded())
          return rep
        }).catch(err => {
          dispatch(updateUserInfosError(err))
          dispatch(setUserLoaded())
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

export const updateUserPrefAction = (topicName, categoryName) => {
  return dispatch => {
    dispatch(setUserLoading())
    return (
      updatePrefService(topicName, categoryName)
        .then(rep => {
          dispatch(updateUserProfileSuccess(rep.data.profile))
          dispatch(setUserLoaded())
          return rep
        }).catch(err => {
          dispatch(openNotificationPopup("Une erreur est survenue. Merci de réessayer ou de signaler l'erreur."))
          dispatch(updateUserProfileError(err))
          dispatch(setUserLoaded())
          return err
        })
    )

  }
}


export const updateUserProfileError = error => ({
  type: UserActionTypes.UPDATE_USER_PROFILE_FAILURE,
  payload: error
})
export const updateUserProfileSuccess = userProfile => ({
  type: UserActionTypes.UPDATE_USER_PROFILE_SUCCESS,
  payload: userProfile
})