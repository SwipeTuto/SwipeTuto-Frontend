import { UserActionTypes } from './user-types'
import { loginManuel, logout, register, getUserById, updateUserInfos, loginGoogle, login, LoginProviderFacebook, FacebookLogin, updatePrefService, getCurrentUser, resetConfirmPassowrd } from '../../services/userService'
import { getUserFollowersList, toggleFollowByUserID, getUserFollowingsList } from '../../services/socialService'
import history from "../../helper/functions/createBrowserHistory"
import { setUserLoading, setUserLoaded, setLoaded, setLoading, openNotificationPopup, setButtonLoading, setButtonLoaded, setFollowersLoading, setFollowersLoaded, setFollowingsLoading, setFollowingsLoaded } from '../layout/layout-actions';


export const rulesAcceptedAction = () => {
  return dispatch => {
    console.log('le user a accepté les conditions')
    // updateUserInfos()
    //   .then(rep => {
    //     console.log(rep)
    //   })
    //   .catch(err => {
    //     // ENVOYER MAIL POUR SIGNALER PB AVEC LE COMPTE
    //     dispatch(openNotificationPopup('Une erreur est survenue. Nous faisons le nécessaire pour résoudre le problème.'))
    //   })
  }
}


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
    dispatch(setButtonLoading())
    return loginManuel(username, password)
      .then(user => {
        dispatch(deleteUserErrors())
        if (!user.data) {
          dispatch(loginErrors("Erreur avec votre compte. Merci d'en essayer un autre."))
          localStorage.removeItem('user')
          dispatch(setButtonLoaded())
        } else {
          if (currentUrl) {
            window.location.href = currentUrl;
            dispatch(setButtonLoaded())
          } else {
            return dispatch(setButtonLoaded())
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
    dispatch(setButtonLoading())
    register(users)
      .then(user => {
        dispatch(registerSuccess(user.data.user));
        dispatch(setButtonLoaded())
        history.push('/search', history.location)
        history.go()
      })
      .catch(err => {
        dispatch(registerErrors(err.response))
        dispatch(setButtonLoaded())
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
    dispatch(setNoClickedUser)
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
      console.log(rep)
      dispatch(setCurrentUser(rep.data.user))
      dispatch(updateCurrentUserFollows('followings', rep.data.user?.followings))
      dispatch(updateCurrentUserFollows('followings_count', rep.data.user?.followings_count))
      dispatch(updateCurrentUserFollows('followers', rep.data.user?.followers))
      dispatch(updateCurrentUserFollows('followers_count', rep.data.user?.followers_count))
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
          dispatch(openNotificationPopup("error", "Une erreur est survenue. Merci de réessayer ou de signaler l'erreur."))
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



export const updateUserPasswordAction = (userNewPasswordObj) => {
  return async dispatch => {
    dispatch(setLoading())
    const res = await resetConfirmPassowrd(userNewPasswordObj)
    if (res && { ...res }.isAxiosError) {
      dispatch(openNotificationPopup("error", "Une erreur est survenue. Merci de réessayer ou de signaler l'erreur."))
      return
    } else {
      dispatch(openNotificationPopup('success', "Votre mot de passe a été modifié avec succès !"))
      history.push("/account/user")
    }
    dispatch(setLoaded())
  }
}


export const toggleFollowByUserIDAction = (userIDtoFollow) => {
  return dispatch => {
    dispatch(setButtonLoading())
    return (
      toggleFollowByUserID(userIDtoFollow)
        .then((rep) => {
          // console.log(rep)
          dispatch(updateCurrentUserFollows('followings', rep?.data?.followings))
          dispatch(updateCurrentUserFollows('followings_count', rep?.data?.followings_count))
          dispatch(setButtonLoaded())
          return rep
        }).catch(err => {
          dispatch(openNotificationPopup("error", "Une erreur est survenue. Merci de réessayer ou de signaler l'erreur."))
          dispatch(setButtonLoaded())
          return err
        })
    )
  }
}

export const updateCurrentUserFollows = (type, data) => ({
  type: UserActionTypes.UPDATE_CURRENTUSER_FOLLOWS,
  payload: { type, data }
})


export const getUserFollowingsListAction = (userID, type) => {
  return dispatch => {
    dispatch(setFollowingsLoading())
    dispatch(setFollowingsList([]))
    return (
      getUserFollowingsList(userID)
        .then(rep => {
          console.log(rep)
          dispatch(setFollowingsList(rep?.data?.results))
          dispatch(setFollowingsLoaded())
          return rep
        }).catch(err => {
          dispatch(openNotificationPopup("error", "Une erreur est survenue. Merci de réessayer ou de signaler l'erreur."))
          dispatch(setFollowingsLoaded())
          return err
        })
    )
  }
}
export const setFollowingsList = followings => ({
  type: UserActionTypes.SET_FOLLOWINGS_LIST,
  payload: followings
})



export const getUserFollowersListAction = (userID) => {
  return dispatch => {
    dispatch(setFollowersLoading())
    dispatch(setFollowersList([]))
    return (
      getUserFollowersList(userID)
        .then(rep => {
          console.log(rep)
          dispatch(setFollowersList(rep?.data?.results))
          dispatch(setFollowersLoaded())
          return rep
        }).catch(err => {
          dispatch(openNotificationPopup("error", "Une erreur est survenue. Merci de réessayer ou de signaler l'erreur."))
          dispatch(setFollowersLoaded())
          return err
        })
    )
  }
}

export const setFollowersList = followers => ({
  type: UserActionTypes.SET_FOLLOWERS_LIST,
  payload: followers
})

