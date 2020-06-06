import {
  CardsActionTypes
} from './cards-types'
import {
  getCards
} from '../../services/cardsService'


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
        dispatch(getCardsSuccess(card.data))
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