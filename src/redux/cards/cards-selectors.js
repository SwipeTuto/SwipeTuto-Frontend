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

export const selectCategoryFilter = state => state.cards.categoryFilter;