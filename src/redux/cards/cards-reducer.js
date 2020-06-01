import { CardsActionTypes } from './cards-types'

const INITIAL_STATE = {
  clickedCard: null,
};

const cardsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CardsActionTypes.SET_CLICKED_CARD:
      return {
        ...state,
        clickedCard: action.payload,
      };
    case CardsActionTypes.SET_NO_CLICKED_CARD:
      return {
        ...state,
        clickedCard: null,
      };
    default:
      return state;
  }
};

export default cardsReducer;