import {
  CardsActionTypes
} from './cards-types'
import {
  getCards
} from '../../services/cardsService'

import { setCurrentSearch, setType, setCategoryFilter, setCardsFetchedInStore } from "../filter/filter-actions"

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
        console.log('card', card)
        dispatch(setCurrentSearch('')) // set le langage
        dispatch(setCategoryFilter('')) // set la category
        dispatch(setType('all')) // change le type
        dispatch(getCardsSuccess()) // stop loader
        dispatch(setCardsFetchedInStore(card)) // cards dans cardsFetched
      })
      .catch(err => {
        dispatch(getCardsErrors(err.response))
      })
  }

};

export const getCardsSuccess = () => ({
  type: CardsActionTypes.GET_ALL_CARDS_SUCCESS,

})
const getCardsErrors = error => ({
  type: CardsActionTypes.GET_ALL_CARDS_FAILURE,
  payload: error
})