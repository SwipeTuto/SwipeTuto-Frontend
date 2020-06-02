import { CardsActionTypes } from './cards-types'

const INITIAL_STATE = {
  clickedCard: null,
  categoryFilter: "all",
  cards: {},
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
    case CardsActionTypes.SET_CATEGORY_FILTER:
      return {
        ...state,
        categoryFilter: action.payload,
      };

    case CardsActionTypes.GET_ALL_CARDS_SUCCESS:
      return {...state, cards: action.payload }
      case CardsActionTypes.GET_ALL_CARDS_FAILURE:
      return {...state, errors: action.payload }
    default:
      return state;
  }
};

export default cardsReducer;