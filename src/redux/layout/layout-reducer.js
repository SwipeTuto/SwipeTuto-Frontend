import { LayoutActionTypes } from './layout-types'

const INITIAL_STATE = {
  popupShown: false,
  fullscreen: false,
  showUserNav: false,
  mobileNavOpen: false,
  betaAlert: true,
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
    case LayoutActionTypes.OPEN_MOBILE_NAV:
      document.getElementsByClassName("App")[0].style.position = "fixed";
      document.getElementsByClassName("App")[0].style.overflow = "hidden";
      return {
        ...state,
        mobileNavOpen: true,
      };
    case LayoutActionTypes.CLOSE_MOBILE_NAV:
      document.getElementsByClassName("App")[0].style.position = "static";
      document.getElementsByClassName("App")[0].style.overflow = "visible";
      return {
        ...state,
        mobileNavOpen: false,
      };
    case LayoutActionTypes.CLOSE_BETA_ALERT:
      return {
        ...state,
        betaAlert: false,
      };
    default:
      return state;
  }
};

export default layoutReducer;