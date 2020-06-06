import { LayoutActionTypes } from './layout-types'

const INITIAL_STATE = {
  popupShown: false,
  fullscreen: false,
  showUserNav: false
};

const layoutReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LayoutActionTypes.SHOW_POPUP_CARD:
      // document.getElementsByClassName("App")[0].style.position = "fixed";
      // document.getElementsByClassName("App")[0].style.overflow = "hidden";
      return {
        ...state,
        popupShown: true,
      };
    case LayoutActionTypes.CLOSE_POPUP_CARD:
      // document.getElementsByClassName("App")[0].style.position = "static";
      // document.getElementsByClassName("App")[0].style.overflow = "visible";
      return {
        ...state,
        popupShown: false,
      };
    case LayoutActionTypes.SHOW_FULLSCREEN:
      document.querySelector(".CardSliderLarge").requestFullscreen();
      return {
        ...state,
        fullscreen: true,
      };
    case LayoutActionTypes.CLOSE_FULLSCREEN:
      if (document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement) {
        document.exitFullscreen()
      };
      return {
        ...state,
        fullscreen: false,
      };
    case LayoutActionTypes.TOGGLE_USER_NAV:
      return {
        ...state,
        showUserNav: !state.showUserNav,
      };
    default:
      return state;
  }
};

export default layoutReducer;