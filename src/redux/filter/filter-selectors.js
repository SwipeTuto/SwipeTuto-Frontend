import { createSelector } from 'reselect'
import { base } from "../../services/configService";

export const selectFilter = state => state.filter;

export const selectCurrentSearch = createSelector(
  [selectFilter],
  filter => filter.currentSearch
)
export const selectSearchWords = createSelector(
  [selectCurrentSearch],
  currentSearch => currentSearch.searchWords
)
export const selectSearchTopic = createSelector(
  [selectCurrentSearch],
  currentSearch => currentSearch.searchTopic
)
export const selectSearchCategory = createSelector(
  [selectCurrentSearch],
  currentSearch => currentSearch.searchCategory
)
export const selectSearchOrder = createSelector(
  [selectCurrentSearch],
  currentSearch => currentSearch.searchOrder
)
export const selectCardsFetched = createSelector(
  [selectFilter],
  filter => filter.cardsFetched && filter.cardsFetched
)
export const selectNewPageCards = createSelector(
  [selectFilter],
  filter => filter.newPageCards && filter.newPageCards
)

export const selectSearchPage = createSelector(
  [selectCurrentSearch],
  currentSearch => currentSearch.searchPage && currentSearch.searchPage
)

export const selectOtherCardsByAuthor = createSelector(
  [selectFilter],
  filter => filter.otherCardsByAuthor && filter.otherCardsByAuthor
)

export const selectCardsFetchedCards = createSelector(
  [selectCardsFetched],
  cardsFetched => cardsFetched && cardsFetched.results
)

export const selectTotalNumberOfResults = createSelector(
  [selectFilter],
  filter => filter.cardsFetched && filter.cardsFetched.count
)

export const selectSearchType = createSelector(
  [selectFilter],
  filter => filter.searchType
)

export const selectCategoryFilter = state => state.filter.categoryFilter ? state.filter.categoryFilter : "all";

export const selectTotalNumberOfCardsSearched = state => state.filter.totalNumberOfCardsSearched ? state.filter.totalNumberOfCardsSearched : 0;

export const selectClickedCard = state => state.filter.clickedCard;


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
  [selectFilter],
  filter => filter.cardsFetched && filter.cardsFetched.previous ? filter.cardsFetched.previous : null

)

export const selectPaginationNext = createSelector(
  [selectFilter],
  filter => filter.cardsFetched && filter.cardsFetched.next ? filter.cardsFetched.next : null

)