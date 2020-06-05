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