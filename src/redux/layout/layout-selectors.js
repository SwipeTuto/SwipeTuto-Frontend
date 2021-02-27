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
export const selectSignalPopupOpen = createSelector(
  [selectLayout],
  layout => layout.signalPopupOpen
);
export const selectSignalInfos = createSelector(
  [selectLayout],
  layout => layout.signalInfos
);
export const selectRedirectUrl = createSelector(
  [selectLayout],
  layout => layout.redirectUrl
);
export const selectConnexionPopup = createSelector(
  [selectLayout],
  layout => layout.connexionPopup
);
export const selectFirstLoadDone = createSelector(
  [selectLayout],
  layout => layout.firstLoadDone
);
export const selectUserLoaded = createSelector(
  [selectLayout],
  layout => layout.userIsLoaded
);
export const selectNotificationPopupOpen = createSelector(
  [selectLayout],
  layout => layout.notificationPopupOpen
);
export const selectMobileNotifDropdownOpen = createSelector(
  [selectLayout],
  layout => layout.mobileNotifDropdownOpen
);
export const selectButtonLoaded = createSelector(
  [selectLayout],
  layout => layout.buttonIsLoaded
);
export const selectFollowersListOpen = createSelector(
  [selectLayout],
  layout => layout.followersListOpen
);
export const selectFollowersLoaded = createSelector(
  [selectLayout],
  layout => layout.followersLoaded
);
