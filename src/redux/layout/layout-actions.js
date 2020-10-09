import { LayoutActionTypes } from './layout-types'

export const showPopupCard = () => ({
  type: LayoutActionTypes.SHOW_POPUP_CARD,
});

export const closePopupCard = () => ({
  type: LayoutActionTypes.CLOSE_POPUP_CARD,
});



export const closeFullscreen = () => ({
  type: LayoutActionTypes.CLOSE_FULLSCREEN,
})

export const toggleUserNav = () => ({
  type: LayoutActionTypes.TOGGLE_USER_NAV,
})

export const showFullscreen = () => ({
  type: LayoutActionTypes.SHOW_FULLSCREEN,
})
export const openMobileNav = () => ({
  type: LayoutActionTypes.OPEN_MOBILE_NAV,
})
export const closeMobileNav = () => ({
  type: LayoutActionTypes.CLOSE_MOBILE_NAV,
})
export const showSignalPopup = () => ({
  type: LayoutActionTypes.SHOW_SIGNAL_POPUP,
})
export const closeSignalPopup = () => ({
  type: LayoutActionTypes.CLOSE_SIGNAL_POPUP,
})
export const openFilterMobileMenu = () => ({
  type: LayoutActionTypes.OPEN_FILTER_MOBILE_MENU,
})
export const closeFilterMobileMenu = () => ({
  type: LayoutActionTypes.CLOSE_FILTER_MOBILE_MENU,
})

export const setLoading = () => ({
  type: LayoutActionTypes.SET_LOADING,
})
export const setCardsSize = (size) => ({
  type: LayoutActionTypes.SET_CARDS_SIZE,
  payload: size
})

export const setLoaded = () => ({
  type: LayoutActionTypes.SET_LOADED,
})
export const setClickedCardLoading = () => ({
  type: LayoutActionTypes.SET_CLICKED_CARD_LOADING,
})

export const setClickedCardLoaded = () => ({
  type: LayoutActionTypes.SET_CLICKED_CARD_LOADED,
})
export const setCommentsLoading = () => ({
  type: LayoutActionTypes.SET_COMMENTS_LOADING,
})

export const setCommentsLoaded = () => ({
  type: LayoutActionTypes.SET_COMMENTS_LOADED,
})
export const setImageLoading = () => ({
  type: LayoutActionTypes.SET_IMAGE_LOADING,
})

export const setImageLoaded = () => ({
  type: LayoutActionTypes.SET_IMAGE_LOADED,
})
export const toggleThemeAction = (theme) => ({
  type: LayoutActionTypes.TOGGLE_THEME,
  payload: theme
})

export const otherPageLoading = () => ({
  type: LayoutActionTypes.OTHER_PAGE_CARDS_LOADING,
})
export const otherPageLoaded = () => ({
  type: LayoutActionTypes.OTHER_PAGE_CARDS_LOADED,
})
