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

export const selectBetaAlertOpen = createSelector(
  [selectLayout],
  layout => layout.betaAlert
)

export const selectIsLoaded = createSelector(
  [selectLayout],
  layout => layout.isLoaded
);