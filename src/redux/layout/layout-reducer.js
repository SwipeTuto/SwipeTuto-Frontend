import { LayoutActionTypes } from './layout-types'

const INITIAL_STATE = {
  popupShown: false,
  signalPopupOpen: false,
  fullscreen: false,
  showUserNav: false,
  mobileNavOpen: false,
  filterMobileMenuOpen: false,
  isLoaded: false,
  cardsSize: 'small',
  otherPageCardsLoaded: true,
  clickedCardIsLoaded: false,
  imageIsLoaded: false,
  commentsAreLoaded: false,
  theme: "light"
};

const layoutReducer = (state = INITIAL_STATE, action) => {
  const app = document.getElementsByClassName("App")[0];
  const cardPopupElement = document.getElementsByClassName("CardFullPopup")[0];
  const scrollYWindow = window.scrollY;
  const scrollY = app && app.style.top;

  switch (action.type) {
    case LayoutActionTypes.SHOW_POPUP_CARD:
      if (cardPopupElement) cardPopupElement.addEventListener('wheel', (e) => {
        e.stopPropagation();
      })

      app.style.position = 'fixed';
      app.style.top = `-${scrollYWindow}px`;

      return {
        ...state,
        popupShown: true,
      };
    case LayoutActionTypes.CLOSE_POPUP_CARD:
      app.style.position = '';
      app.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
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
    case LayoutActionTypes.TOGGLE_USER_NAV:
      return {
        ...state,
        showUserNav: !state.showUserNav,
      };
    case LayoutActionTypes.OPEN_MOBILE_NAV:
      app.style.position = "fixed";
      app.style.overflow = "hidden";
      return {
        ...state,
        mobileNavOpen: true,
        filterMobileMenuOpen: false
      };
    case LayoutActionTypes.CLOSE_MOBILE_NAV:
      app.style.position = "static";
      app.style.overflow = "visible";
      return {
        ...state,
        mobileNavOpen: false,
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
    case LayoutActionTypes.SHOW_SIGNAL_POPUP:
      return {
        ...state,
        signalPopupOpen: true,
      }
    case LayoutActionTypes.CLOSE_SIGNAL_POPUP:
      return {
        ...state,
        signalPopupOpen: false,
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
    case LayoutActionTypes.TOGGLE_THEME:
      // const localTheme = window.localStorage.getItem('theme');
      return {
        ...state,
        theme: action.payload,
      }
    default:
      return state;
  }
};

export default layoutReducer;