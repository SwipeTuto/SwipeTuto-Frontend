import { createSelector } from 'reselect'
import { base } from "../../services/configService";

export const selectCards = state => state.cards;
export const selectCardsFetched = state => state.cards.cardsFetched ? state.cards.cardsFetched.results : null;


export const selectClickedCard = state => state.cards.clickedCard;
export const selectClickedCardMediaImage = createSelector(
  [selectClickedCard],
  clickedCard => (clickedCard ? clickedCard.media_image : null)
);

export const selectClickedCardSlides = createSelector(
  [selectClickedCardMediaImage],
  media_image => {
    let slidesArray = [];
    media_image.map(image => slidesArray.push(base + image.image));
    return slidesArray;
  }
)

export const selectPaginationPrevious = createSelector(
  [selectCards],
  cards => cards.cardsFetched && cards.cardsFetched.previous ? cards.cardsFetched.previous : null

)

export const selectPaginationNext = createSelector(
  [selectCards],
  cards => cards.cardsFetched && cards.cardsFetched.next ? cards.cardsFetched.next : null

)