import {
  CardsActionTypes
} from './cards-types'
import {
  getCards
} from '../../services/cardsService'

import { setCurrentSearch, setCardsFetchedInStore } from "../filter/filter-actions"

export const setClickedCard = (card) => ({
  type: CardsActionTypes.SET_CLICKED_CARD,
  payload: card,
});

export const setNoClickedCard = () => ({
  type: CardsActionTypes.SET_NO_CLICKED_CARD,
  payload: null,
});



export const getCardsAction = () => {
  return dispatch => {
    return getCards()
      .then(card => {
        dispatch(setCurrentSearch({
          searchWords: '',
          searchLangage: '',
          searchCategory: '',
          searchOrder: 'chronology'
        })) // set le langage

        dispatch(setCardsFetchedInStore(card)) // cards dans cardsFetched
        dispatch(getCardsLoaded()) // stop loader
      })
      .catch(err => {
        dispatch(getCardsErrors(err.response))
      })
  }
};

export const getCardsLoading = () => ({
  type: CardsActionTypes.GET_CARDS_LOADING,
})

export const getCardsLoaded = () => ({
  type: CardsActionTypes.GET_CARDS_SUCCESS,
})

const getCardsErrors = error => ({
  type: CardsActionTypes.GET_ALL_CARDS_FAILURE,
  payload: error
})