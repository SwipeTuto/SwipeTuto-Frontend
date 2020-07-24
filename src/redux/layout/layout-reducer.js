import { LayoutActionTypes } from './layout-types'

const INITIAL_STATE = {
  popupShown: false,
  fullscreen: false,
  showUserNav: false,
  mobileNavOpen: false,
  filterMobileMenuOpen: false,
  betaAlert: true,
  isLoaded: false,
};

const layoutReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LayoutActionTypes.SHOW_POPUP_CARD:
      document.getElementsByClassName("App")[0].style.position = "fixed";
      document.getElementsByClassName("App")[0].style.overflow = "hidden";
      return {
        ...state,
        popupShown: true,
      };
    case LayoutActionTypes.CLOSE_POPUP_CARD:
      document.getElementsByClassName("App")[0].style.position = "static";
      document.getElementsByClassName("App")[0].style.overflow = "visible";
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
        filterMobileMenuOpen: false
      };
    case LayoutActionTypes.CLOSE_MOBILE_NAV:
      document.getElementsByClassName("App")[0].style.position = "static";
      document.getElementsByClassName("App")[0].style.overflow = "visible";
      return {
        ...state,
        mobileNavOpen: false,
      };
    case LayoutActionTypes.OPEN_FILTER_MOBILE_MENU:
      document.getElementsByClassName("App")[0].style.position = "fixed";
      document.getElementsByClassName("App")[0].style.overflow = "hidden";
      return {
        ...state,
        filterMobileMenuOpen: true,
        mobileNavOpen: false
      };
    case LayoutActionTypes.CLOSE_FILTER_MOBILE_MENU:
      document.getElementsByClassName("App")[0].style.position = "static";
      document.getElementsByClassName("App")[0].style.overflow = "visible";
      return {
        ...state,
        filterMobileMenuOpen: false,
      };
    case LayoutActionTypes.CLOSE_BETA_ALERT:
      return {
        ...state,
        betaAlert: false,
      };
    case LayoutActionTypes.SET_LOADING:
      return {
        ...state,
        isLoaded: false,
      }
    case LayoutActionTypes.SET_LOADED:
      return {
        ...state,
        isLoaded: true,
      }
    default:
      return state;
  }
};

export default layoutReducer;