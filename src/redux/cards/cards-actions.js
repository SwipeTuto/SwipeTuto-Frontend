import {
  CardsActionTypes
} from './cards-types'
import {
  getCards
} from '../../services/cardsService'

import { setCurrentSearch, setType, setCategoryFilter } from "../filter/filter-actions"

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
        dispatch(setCurrentSearch('')) // set le langage
        dispatch(setCategoryFilter('')) // set la category
        dispatch(setType('all')) // change le type
        dispatch(getCardsSuccess(card))
      })
      .catch(err => {
        dispatch(getCardsErrors(err.response))
      })
  }

};

const getCardsSuccess = card => ({
  type: CardsActionTypes.GET_ALL_CARDS_SUCCESS,
  payload: card
})
const getCardsErrors = error => ({
  type: CardsActionTypes.GET_ALL_CARDS_FAILURE,
  payload: error
})