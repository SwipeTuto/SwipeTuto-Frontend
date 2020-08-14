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
export const openFilterMobileMenu = () => ({
  type: LayoutActionTypes.OPEN_FILTER_MOBILE_MENU,
})
export const closeFilterMobileMenu = () => ({
  type: LayoutActionTypes.CLOSE_FILTER_MOBILE_MENU,
})

export const closeBetaAlert = () => ({
  type: LayoutActionTypes.CLOSE_BETA_ALERT,
})

export const setLoading = () => ({
  type: LayoutActionTypes.SET_LOADING,
})

export const setLoaded = () => ({
  type: LayoutActionTypes.SET_LOADED,
})
export const setImageLoading = () => ({
  type: LayoutActionTypes.SET_IMAGE_LOADING,
})

export const setImageLoaded = () => ({
  type: LayoutActionTypes.SET_IMAGE_LOADED,
})
