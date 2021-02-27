import { initialSignalState } from '../../helper/constants';
import { LayoutActionTypes } from './layout-types'

const INITIAL_STATE = {
  firstLoadDone: false,
  popupShown: false,
  signalPopupOpen: false,
  signalInfos: initialSignalState,
  fullscreen: false,
  mobileNavOpen: false,
  mobileNotifDropdownOpen: false,
  notificationPopupOpen: {
    open: false,
    notification: "",
    type: ""
  },
  filterMobileMenuOpen: false,
  isLoaded: true,
  cardsSize: 'small',
  otherPageCardsLoaded: true,
  clickedCardIsLoaded: true,
  imageIsLoaded: true,
  userIsLoaded: true,
  buttonIsLoaded: true,
  commentsAreLoaded: true,
  redirectUrl: false,
  connexionPopup: false,
  followersListOpen: false,
  followersLoaded: true,
  theme: "light"
};

const layoutReducer = (state = INITIAL_STATE, action) => {
  const app = document.getElementsByClassName("App")[0];
  const cardPopupElement = document.getElementsByClassName("CardFullPopup")[0];

  switch (action.type) {
    case LayoutActionTypes.SHOW_POPUP_CARD:
      return {
        ...state,
        popupShown: true,
      };
    case LayoutActionTypes.FIRST_LOAD_DONE:
      return {
        ...state,
        firstLoadDone: true,
      };
    case LayoutActionTypes.CLOSE_POPUP_CARD:
      return {
        ...state,
        popupShown: false,
      };
    case LayoutActionTypes.SHOW_FULLSCREEN:
      if (cardPopupElement) cardPopupElement.style.overflow = "hidden";
      return {
        ...state,
        fullscreen: true,
      };
    case LayoutActionTypes.CLOSE_FULLSCREEN:
      cardPopupElement.style.overflowY = "scroll";
      return {
        ...state,
        fullscreen: false,
      };
    case LayoutActionTypes.SET_CARDS_SIZE:
      return {
        ...state,
        cardsSize: action.payload,
      };
    case LayoutActionTypes.OPEN_MOBILE_NAV:
      app.style.position = "fixed";
      app.style.overflow = "hidden";
      return {
        ...state,
        mobileNavOpen: true,
        filterMobileMenuOpen: false,
        mobileNotifDropdownOpen: false,
      };
    case LayoutActionTypes.CLOSE_MOBILE_NAV:
      app.style.position = "static";
      app.style.overflow = "visible";
      return {
        ...state,
        mobileNavOpen: false,
      };
    case LayoutActionTypes.OPEN_NOTIF_DROPDOWN_MENU:

      app.style.position = "fixed";
      app.style.overflow = "hidden";
      return {
        ...state,
        mobileNotifDropdownOpen: true,
      };
    case LayoutActionTypes.CLOSE_NOTIF_DROPDOWN_MENU:
      app.style.position = "static";
      app.style.overflow = "visible";
      return {
        ...state,
        mobileNotifDropdownOpen: false,
      };
    case LayoutActionTypes.OPEN_FILTER_MOBILE_MENU:
      app.style.position = "fixed";
      app.style.overflow = "hidden";
      return {
        ...state,
        filterMobileMenuOpen: true,
        mobileNavOpen: false
      };
    case LayoutActionTypes.CLOSE_FILTER_MOBILE_MENU:
      app.style.position = "static";
      app.style.overflow = "visible";
      return {
        ...state,
        filterMobileMenuOpen: false,
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
    case LayoutActionTypes.SET_CLICKED_CARD_LOADING:
      return {
        ...state,
        clickedCardIsLoaded: false,
      }
    case LayoutActionTypes.SET_CLICKED_CARD_LOADED:
      return {
        ...state,
        clickedCardIsLoaded: true,
      }
    case LayoutActionTypes.SET_USER_LOADING:
      return {
        ...state,
        userIsLoaded: false,
      }
    case LayoutActionTypes.SET_USER_LOADED:
      return {
        ...state,
        userIsLoaded: true,
      }
    case LayoutActionTypes.SET_COMMENTS_LOADING:
      return {
        ...state,
        commentsAreLoaded: false,
      }
    case LayoutActionTypes.SET_COMMENTS_LOADED:
      return {
        ...state,
        commentsAreLoaded: true,
      }
    case LayoutActionTypes.SET_IMAGE_LOADING:
      return {
        ...state,
        imageIsLoaded: false,
      }
    case LayoutActionTypes.SET_IMAGE_LOADED:
      return {
        ...state,
        imageIsLoaded: true,
      }
    case LayoutActionTypes.BUTTON_LOADING:
      return {
        ...state,
        buttonIsLoaded: false,
      }
    case LayoutActionTypes.BUTTON_LOADED:
      return {
        ...state,
        buttonIsLoaded: true,
      }
    case LayoutActionTypes.FOLLOWERS_LOADING:
      return {
        ...state,
        followersLoaded: false,
      }
    case LayoutActionTypes.FOLLOWERS_LOADED:
      return {
        ...state,
        followersLoaded: true,
      }
    case LayoutActionTypes.SHOW_SIGNAL_POPUP:
      return {
        ...state,
        signalPopupOpen: true,
        signalInfos: action.payload
      }
    case LayoutActionTypes.CLOSE_SIGNAL_POPUP:
      return {
        ...state,
        signalPopupOpen: false,
        signalInfos: initialSignalState
      }
    case LayoutActionTypes.OPEN_CONNEXION_POPUP:
      return {
        ...state,
        connexionPopup: true,
      }
    case LayoutActionTypes.CLOSE_CONNEXION_POPUP:
      return {
        ...state,
        connexionPopup: false,
      }
    case LayoutActionTypes.OTHER_PAGE_CARDS_LOADING:
      return {
        ...state,
        otherPageCardsLoaded: false,
      }
    case LayoutActionTypes.OTHER_PAGE_CARDS_LOADED:
      return {
        ...state,
        otherPageCardsLoaded: true,
      }
    case LayoutActionTypes.OPEN_NOTIFICATION_POPUP:
      // console.log(action.payload)
      return {
        ...state,
        notificationPopupOpen: {
          open: true,
          notification: action?.payload?.notification,
          type: action?.payload?.type
        },
      }
    case LayoutActionTypes.CLOSE_NOTIFICATION_POPUP:
      return {
        ...state,
        notificationPopupOpen: {
          open: false,
          notification: "",
          type: ""
        },
      }
    case LayoutActionTypes.TOGGLE_THEME:
      return {
        ...state,
        theme: action.payload,
      }
    case LayoutActionTypes.REDIRECT_URL:
      return {
        ...state,
        redirectUrl: action.payload,
      }
    case LayoutActionTypes.OPEN_FOLLOWERS_LIST_POPUP:
      return {
        ...state,
        followersListOpen: true,
      }
    case LayoutActionTypes.CLOSE_FOLLOWERS_LIST_POPUP:
      return {
        ...state,
        followersListOpen: false,
      }
    default:
      return state;
  }
};

export default layoutReducer;