import { CardsActionTypes } from './cards-types'

export const setClickedCard = (card) => ({
  type: CardsActionTypes.SET_CLICKED_CARD,
  payload: card,
});

export const setNoClickedCard = () => ({
  type: CardsActionTypes.SET_NO_CLICKED_CARD,
  payload: null,
});

export const setCategoryFilter = (category) => ({
  type: CardsActionTypes.SET_CATEGORY_FILTER,
  payload: category,
});