import { CardsActionTypes } from './cards-types'

const INITIAL_STATE = {
  clickedCard: null,
  cardsFetched: {},
  errors: {}
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

    case CardsActionTypes.GET_ALL_CARDS_SUCCESS:
      return {
        ...state,
        cardsFetched: action.payload
      }
    case CardsActionTypes.GET_ALL_CARDS_FAILURE:
      return {
        ...state,
        errors: action.payload
      }
    default:
      return state;
  }
};
// ss
export default cardsReducer;