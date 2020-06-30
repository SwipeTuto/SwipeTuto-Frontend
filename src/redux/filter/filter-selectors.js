import { createSelector } from 'reselect'

export const selectFilter = state => state.filter;

export const selectCurrentSearch = createSelector(
  [selectFilter],
  filter => filter.currentSearch
)
export const selectCategoryFilter = createSelector(
  [selectFilter],
  filter => filter.categoryFilter
)
export const selectCardsFetched = createSelector(
  [selectFilter],
  filter => filter.cardsFetched && filter.cardsFetched
)
export const selectNewPageCards = createSelector(
  [selectFilter],
  filter => filter.newPageCards && filter.newPageCards
)

export const selectCurrentCardsGridPage = createSelector(
  [selectFilter],
  filter => filter.currentCardsGridPage && filter.currentCardsGridPage
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

// export const selectCategoryFilter = state => state.filter.categoryFilter ? state.filter.categoryFilter : "all";

export const selectTotalNumberOfCardsSearched = state => state.filter.totalNumberOfCardsSearched ? state.filter.totalNumberOfCardsSearched : 0;