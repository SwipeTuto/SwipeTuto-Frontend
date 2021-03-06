import { FilterActionTypes } from "./filter-types"
import { setLoading, setLoaded, setClickedCardLoading, setClickedCardLoaded, setCommentsLoading, setCommentsLoaded, openNotificationPopup, setRedirectUrl } from '../layout/layout-actions'
import { getCardAfterfilter, getCardsByUser, getOtherPageCard, getCardById, createCardService, deleteCardService, updateCardService, getCardPrefUser } from '../../services/cardsService'
import { toggleLike, toggleCommentLike, addComment, getCardComments, deleteComment, addReply, toggleSave, getCardCommentsNext } from "../../services/socialService"
import { getUserFavoriesById } from "../../services/userService"
import { initialSearchState } from "../../helper/constants"

const getCardAfterfilterSuccess = cards => ({
  type: FilterActionTypes.GET_CARDS_FILTER_SUCCESS,
  payload: cards
})
const getCardAfterfilterFailure = err => ({
  type: FilterActionTypes.GET_CARDS_FILTER_FAILURE,
  payload: err
})

export const getCardAfterfilterAction = (search) => {
  return dispatch => {
    dispatch(setCardsFetchedInStore(""))
    dispatch(setLoading());
    return getCardAfterfilter(search)
      .then(rep => {
        dispatch(getCardAfterfilterSuccess(rep.data))
        dispatch(setLoaded())
        return rep
      })
      .catch(err => {
        dispatch(getCardAfterfilterFailure(err.response))
        dispatch(setLoaded())
      })
  }
}

export const getCardPrefUserAction = () => {
  return dispatch => {
    dispatch(setCardsFetchedInStore(""))
    dispatch(setLoading());
    return getCardPrefUser()
      .then(rep => {
        dispatch(getCardAfterfilterSuccess(rep.data))
        dispatch(setLoaded())
        return rep
      })
      .catch(err => {
        dispatch(getCardAfterfilterFailure(err.response))
        dispatch(setLoaded())
      })
  }
}

const getCardByIdSuccess = card => ({
  type: FilterActionTypes.GET_CARD_BY_ID_SUCCESS,
  payload: card
})
const getCardByIdFailure = err => ({
  type: FilterActionTypes.GET_CARD_BY_ID_FAILURE,
  payload: err
})

export const getCardByIdAction = cardId => {
  return dispatch => {
    dispatch(setClickedCardLoading());
    return getCardById(cardId)
      .then(rep => {
        const repObj = { ...rep };
        if ((repObj.response && repObj.response.status >= 400) || repObj.status >= 400) {
          dispatch(getCardByIdFailure(repObj.response.statusText))
          dispatch(setClickedCardLoaded());
          return
        }
        dispatch(getCardByIdSuccess(rep.data))
        dispatch(setClickedCardLoaded())
      })
  }
}


// Gestion de la currentSearch avec mots, catégorie, langage et ordre de recherche
export const resetCurrentSearch = (item, value = null) => ({
  type: FilterActionTypes.RESET_CURRENT_SEARCH,
  payload: initialSearchState
})

export const setCurrentSearch = (newSearch) => ({
  type: FilterActionTypes.SET_CURRENT_SEARCH,
  payload: newSearch
})

export const deleteCurrentSearch = (item) => ({
  type: FilterActionTypes.DELETE_CURRENT_SEARCH,
  payload: item
})

// Changement de l'ordre de classement (restera à connecter api pour requete - mixer avec requetes getCards et l'autre par langage/categorie)
export const setSearchOrder = (order) => ({
  type: FilterActionTypes.SET_SEARCH_ORDER,
  payload: order
})


export const deleteFilterErrorAction = () => ({
  type: FilterActionTypes.DELETE_FILTER_ERROR,
})


// Mise des cartes récupérées du back dans le store
export const setCardsFetchedInStore = (cards) => ({
  type: FilterActionTypes.SET_CARDS_FETCHED_IN_STORE,
  payload: cards
})


// Fetch des cards à partir du nom de l'auteur
export const getCardsByUserIdAction = (userId, cardState) => {
  return dispatch => {
    dispatch(setCardsFetchedInStore(""))
    dispatch(setLoading())
    return getCardsByUser(userId, cardState)
      .then(rep => {
        dispatch(getCardsByUserIdSuccess(rep.data))
        dispatch(setLoaded())
        return rep
      })
      .catch(err => {
        dispatch(getCardsByUserIdFailure(err.response))
        dispatch(setLoaded())
        console.log(err)
      })
  }
}

// Fetch des autres cards de l'auteur
export const getOtherCardsByAuthorNameAction = username => {
  return dispatch => {
    return getCardsByUser(username)
      .then(rep => {
        dispatch(getOtherCardsByAuthorNameSuccess(rep.data))
        return rep
      })
      .catch(err => {
        dispatch(getOtherCardsByAuthorNameFailure(err.response))
      })
  }
}


const getCardsByUserIdSuccess = cards => ({
  type: FilterActionTypes.GET_CARDS_BY_USER_SUCCESS,
  payload: cards
})
const getCardsByUserIdFailure = err => ({
  type: FilterActionTypes.GET_CARDS_BY_USER_FAILURE,
  payload: err
})

const getOtherCardsByAuthorNameSuccess = cards => ({
  type: FilterActionTypes.GET_OTHER_CARDS_BY_AUTHOR_SUCCESS,
  payload: cards
})
const getOtherCardsByAuthorNameFailure = err => ({
  type: FilterActionTypes.GET_OTHER_CARDS_BY_AUTHOR_FAILURE,
  payload: err
})


// Fetch des données d'une autre page
export const getOtherPageAction = (navLink) => {
  return dispatch => {
    dispatch(setLoading())
    return getOtherPageCard(navLink)
      .then(rep => {
        dispatch(getOtherPageSuccess(rep.data))
        dispatch(setLoaded())

        return rep
      })
      .catch(err => {
        dispatch(getOtherPageFailure(err.response))
        dispatch(setLoaded())
      })
  }
}




const getOtherPageSuccess = datas => ({
  type: FilterActionTypes.GET_OTHER_PAGE_ACTION_SUCCESS,
  payload: datas
})
const getOtherPageFailure = err => ({
  type: FilterActionTypes.GET_OTHER_PAGE_ACTION_FAILURE,
  payload: err
})


// Clicked Card 
export const setClickedCard = (card) => ({
  type: FilterActionTypes.SET_CLICKED_CARD,
  payload: card,
});

export const setNoClickedCard = () => ({
  type: FilterActionTypes.SET_NO_CLICKED_CARD,
  payload: null,
});

export const toggleLikeCardAction = (cardId, currentUserId) => {
  return dispatch => {
    return toggleLike(cardId)
      .then(rep => {
        dispatch(likeCardActionSuccess(cardId, currentUserId))
      })
      .catch(err => {
        dispatch(likeCardActionErrors(err))
      })
  }
};

const likeCardActionErrors = error => ({
  type: FilterActionTypes.TOGGLE_LIKE_CARD_ERROR,
  payload: error
})

const likeCardActionSuccess = (cardId, currentUserId) => ({
  type: FilterActionTypes.TOGGLE_LIKE_CARD_SUCCESS,
  payload: { cardId, currentUserId }
})

export const toggleSaveCardAction = (cardId) => {
  return dispatch => {
    return toggleSave(cardId)
      .then(rep => {
        dispatch(saveCardActionSuccess())
      })
      .catch(err => {
        dispatch(saveCardActionErrors(err))
      })
  }
};

const saveCardActionErrors = error => ({
  type: FilterActionTypes.TOGGLE_SAVE_CARD_ERROR,
  payload: error
})

const saveCardActionSuccess = () => ({
  type: FilterActionTypes.TOGGLE_SAVE_CARD_SUCCESS,
})





export const toggleCommentLikeAction = (commentId) => {
  return dispatch => {
    return toggleCommentLike(commentId)
      .then(rep => {
        dispatch(toggleCommentLikeSuccess())
      })
      .catch(err => {
        dispatch(toggleCommentLikeError(err.response.status))
      })
  }
};

const toggleCommentLikeError = error => ({
  type: FilterActionTypes.TOGGLE_LIKE_COMMENT_ERROR,
  payload: error
})

const toggleCommentLikeSuccess = () => ({
  type: FilterActionTypes.TOGGLE_LIKE_COMMENT_SUCCESS,
})




export const addCommentAction = (cardId, comment) => {
  return dispatch => {
    return addComment(cardId, comment)
      .then(rep => {
        dispatch(addCommentSuccess(rep.data))
      })
      .catch(err => {
        dispatch(addCommentErrors(err))
      })
  }
};

const addCommentErrors = error => ({
  type: FilterActionTypes.ADD_COMMENT_ERROR,
  payload: error
})

const addCommentSuccess = (commentData) => ({
  type: FilterActionTypes.ADD_COMMENT_SUCCESS,
  payload: commentData
})

export const fetchNewComments = (url) => {
  return dispatch => {
    return getCardCommentsNext(url)
      .then(rep => {
        dispatch(fetchNewCommentsSuccess(rep.data))
      })
      .catch(err => {
        dispatch(fetchNewCommentsErrors(err))
      })
  }
};

const fetchNewCommentsErrors = error => ({
  type: FilterActionTypes.FETCH_NEW_COMMENTS_ERROR,
  payload: error
})

const fetchNewCommentsSuccess = (nextCommentsData) => ({
  type: FilterActionTypes.FETCH_NEW_COMMENTS_SUCCESS,
  payload: nextCommentsData
})

export const addReplyAction = (cardId, commentId, comment) => {
  return dispatch => {
    return addReply(commentId, comment)
      .then(rep => {
        dispatch(addCommentSuccess(rep.data))
      })
      .catch(err => {
        dispatch(addCommentErrors(err))
      })
  }
};

export const getCardCommentsAction = (cardId) => {
  return dispatch => {
    dispatch(setCommentsLoading())
    return getCardComments(cardId)
      .then(rep => {
        dispatch(getCardCommentsSuccess(rep.data))
        dispatch(setCommentsLoaded())
      })
      .catch(err => {
        dispatch(getCardCommentsError(err))
        dispatch(setCommentsLoaded())
      })
  }
};


const getCardCommentsError = error => ({
  type: FilterActionTypes.GET_CARD_COMMENTS_ERROR,
  payload: error
})

const getCardCommentsSuccess = (comments) => ({
  type: FilterActionTypes.GET_CARD_COMMENTS_SUCCESS,
  payload: comments
})


export const deleteCommentAction = (commentId) => {
  return dispatch => {
    return deleteComment(commentId)
      .then(rep => {
        dispatch(deleteCommentSuccess())
      })
      .catch(err => {
        dispatch(deleteCommentErrors(err))
      })
  }
};

const deleteCommentErrors = error => ({
  type: FilterActionTypes.DELETE_COMMENT_ERROR,
  payload: error
})

const deleteCommentSuccess = () => ({
  type: FilterActionTypes.DELETE_COMMENT_SUCCESS,
})

export const getUserFavoriesAction = userId => {
  return dispatch => {
    dispatch(setCardsFetchedInStore(""))
    dispatch(setLoading());
    userId && getUserFavoriesById(userId).then(rep => {
      dispatch(getUserFavoriesSuccess(rep.data))
      dispatch(setLoaded())
      return rep.data
    }).catch(err => {
      console.log(err)
      dispatch(getUserFavoriesError(err))
      dispatch(setLoaded())
      return err
    })
  }
}

export const getUserFavoriesError = error => ({
  type: FilterActionTypes.GET_FAVORIES_CARDS_FAILURE,
  payload: error
})
export const getUserFavoriesSuccess = favories => ({
  type: FilterActionTypes.GET_FAVORIES_CARDS_SUCCESS,
  payload: favories
})

export const createCardAction = (cardObject, cardState) => {
  console.log(cardObject, cardState)
  return async dispatch => {
    dispatch(setLoading());
    dispatch(setCardsFetchedInStore(""))
    dispatch(setRedirectUrl(false))
    cardObject && await createCardService(cardObject).then(rep => {
      dispatch(openNotificationPopup("success", "Carte créée avec succès !"))
      dispatch(setLoaded())

      if (cardState !== 0) {
        dispatch(setCurrentSearch(initialSearchState))
        dispatch(setRedirectUrl(true))
      }

      return rep.data
    }).catch(err => {
      console.error(err)
      dispatch(openNotificationPopup("error", 'Une erreur est survenue... Merci de réessayer ou de nous signaler le problème'))
      dispatch(setLoaded())
      return err
    })
  }
}

// modify card action à faire sur le même modèle que create
export const updateCardAction = (cardId, updateObj) => {
  console.log(cardId, updateObj)
  return async dispatch => {
    dispatch(setLoading());
    dispatch(setCardsFetchedInStore(""))
    dispatch(setRedirectUrl(false))
    if (cardId && updateObj) {
      await updateCardService(cardId, updateObj).then(rep => {
        dispatch(openNotificationPopup("success", "Carte modifiée avec succès !"))
        dispatch(setLoaded())
        dispatch(setCurrentSearch(initialSearchState))
        // dispatch(setRedirectUrl(true))
        return rep.data
      }).catch(err => {

        console.error(err)
        dispatch(openNotificationPopup("error", 'Une erreur est survenue... Merci de réessayer ou de nous signaler le problème'))
        dispatch(setLoaded())
        return err
      })
    } else {
      dispatch(openNotificationPopup("error", "Une erreur est survenue... Merci de réessayer ou de nous signaler le problème"))
      dispatch(setLoaded())
    }
  }
}

export const deleteCardAction = (cardId, currentUserId, history) => {
  return async dispatch => {
    dispatch(setLoading());
    if (cardId) {
      const res = await deleteCardService(cardId)
      if (res && { ...res }.isAxiosError) {
        dispatch(openNotificationPopup("error", 'Une erreur est survenue... Merci de réessayer ou de nous signaler le problème'))
        dispatch(setLoaded())
        return
      } else {

        dispatch(openNotificationPopup("success", "Carte supprimée avec succès !"))
        dispatch(setLoaded())
        if (history.location.pathname === "/account/drafts") {
          currentUserId && dispatch(getCardsByUserIdAction(currentUserId, 0));
        } else {
          currentUserId && dispatch(getCardsByUserIdAction(currentUserId));
          history && history.push("/account/user");
        }
      }
    }
  }
}


export const deleteLastPublishedCommentInStore = () => ({
  type: FilterActionTypes.DELETE_LAST_PUBLISHED_COMMENT_IN_STORE,
})

