import { createSelector } from 'reselect'

export const selectCards = state => state.cards;

export const selectClickedCard = state => state.cards.clickedCard;
export const selectClickedCardMediaImage = createSelector(
  [selectClickedCard],
  clickedCard => (clickedCard ? clickedCard.media_image : null)
);

export const selectClickedCardSlides = createSelector(
  [selectClickedCardMediaImage],
  media_image => {
    let slidesArray = [];
    media_image.map(image => slidesArray.push(image.image));
    return slidesArray;
  }
)