import { createSelector } from 'reselect'

export const selectLayout = state => state.layout;
export const selectShowPopupCard = createSelector(
  [selectLayout],
  layout => layout.popupShown
)

export const selectFullscreen = createSelector(
  [selectLayout],
  layout => layout.fullscreen
)

export const selectUserNav = createSelector(
  [selectLayout],
  layout => layout.showUserNav
)

export const selectMobileNavOpen = createSelector(
  [selectLayout],
  layout => layout.mobileNavOpen
)
export const selectFilterMobileMenuOpen = createSelector(
  [selectLayout],
  layout => layout.filterMobileMenuOpen
)

export const selectCardsSize = createSelector(
  [selectLayout],
  layout => layout.cardsSize
);
export const selectIsLoaded = createSelector(
  [selectLayout],
  layout => layout.isLoaded
);
export const selectClickedCardIsLoaded = createSelector(
  [selectLayout],
  layout => layout.clickedCardIsLoaded
);
export const selectCommentsLoaded = createSelector(
  [selectLayout],
  layout => layout.commentsAreLoaded
);
export const selectImageIsLoaded = createSelector(
  [selectLayout],
  layout => layout.imageIsLoaded
);
export const selectTheme = createSelector(
  [selectLayout],
  layout => layout.theme
);
export const selectOtherPageLoading = createSelector(
  [selectLayout],
  layout => layout.otherPageCardsLoaded
);