import { createSelector } from 'reselect'

export const selectFilter = state => state.filter;

export const selectCurrentSearch = createSelector(
  [selectFilter],
  filter => filter.currentSearch
)
export const selectCardFilter = createSelector(
  [selectFilter],
  filter => filter.cardFilter
)

export const selectSearchType = createSelector(
  [selectFilter],
  filter => filter.searchType
)

export const selectCategoryFilter = state => state.filter.categoryFilter ? state.filter.categoryFilter : "all";

export const selectTotalNumberOfCardsSearched = state => state.filter.totalNumberOfCardsSearched ? state.filter.totalNumberOfCardsSearched : 0;