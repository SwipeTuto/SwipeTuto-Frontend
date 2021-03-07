import React, { useEffect, useRef } from "react";
import { withRouter, Redirect, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import NavTop from "./components/LayoutComponents/NavTop/NavTop";
import NavTopMobile from "./components/LayoutComponents/NavTop/NavTopMobile";
import Footer from "./components/LayoutComponents/Footer/Footer";

import { deleteFilterErrorAction, getCardAfterfilterAction, getCardByIdAction } from './redux/filter/filter-actions'
import { selectConnexionPopup, selectFirstLoadDone, selectIsLoaded, selectRedirectUrl, selectShowPopupCard, selectSignalPopupOpen, selectTheme } from "./redux/layout/layout-selectors"
import { selectCurrentUser, selectCurrentUserSettings } from "./redux/user/user-selectors"
import { setCurrentSearch } from "./redux/filter/filter-actions"

import { initialSearchState } from "./helper/constants"
import { urlParams, getUrlId } from "./helper/functions/getURLParams"

import './index.scss'
import './App.scss';
import { closeConnexionPopup, closePopupCard, openNotificationPopup, setCardsSize, setFirstLoadDone, setRedirectUrl, showPopupCard, toggleThemeAction } from "./redux/layout/layout-actions";
import { getCurrentUserAction, getUserByIdAction } from "./redux/user/user-actions";
import SignalPopup from "./components/LayoutComponents/SignalPopup/SignalPopup";
import CardFullPopup from "./components/CardsComponents/CardFullPopup/CardFullPopup";
import SearchLinkRedirect from "./helper/SearchLinkRedirect";
import ConnexionRedirect from "./components/LayoutComponents/ConnexionRedirect/ConnexionRedirect";
import { selectCardsFetched, selectClickedCard, selectCurrentSearch, selectFilterError } from "./redux/filter/filter-selectors";
import { usePrevious } from "./hooks/usePrevious";
import Routes from "./Routes"
import NotificationPopup from "./components/LayoutComponents/NotificationPopup/NotificationPopup";

function App(props) {

  const currentTheme = useSelector(selectTheme)
  const dispatch = useDispatch();
  const [topic, category, ordering, search] = urlParams(props.location)
  const userId = getUrlId(props.location.pathname, "user_id")
  const currentUser = useSelector(selectCurrentUser);
  const currentUserSettings = useSelector(selectCurrentUserSettings)
  const cardId = getUrlId(props.location.pathname, "card_id")
  const isLoaded = useSelector(selectIsLoaded)
  const signalPopup = useSelector(selectSignalPopupOpen)
  const redirectUrl = useSelector(selectRedirectUrl)
  const firstLoadDone = useSelector(selectFirstLoadDone)
  const currentSearch = useSelector(selectCurrentSearch)
  const prevSearchState = usePrevious(currentSearch)
  const connexionPopup = useSelector(selectConnexionPopup)
  const locationPathname = props.location.pathname;
  const clickedCard = useSelector(selectClickedCard)
  const fetchedCards = useSelector(selectCardsFetched)
  const popupCardIsOpen = useSelector(selectShowPopupCard);
  const appEl = useRef(null)
  const filterError = useSelector(selectFilterError)

  useEffect(() => {
    dispatch(getCurrentUserAction())
  }, [dispatch])

  useEffect(() => {

    if (firstLoadDone === false && locationPathname === "/search") { // si params url
      if (topic || category || ordering || search) {
        const currentSearchCopy = {
          "searchWords": search,
          "searchTopic": topic,
          "searchCategory": category,
          "searchOrder": ordering,
        }
        dispatch(setCurrentSearch(currentSearchCopy))
        dispatch(setRedirectUrl(true));
      }
    } else if (firstLoadDone === false && !currentUser && (locationPathname === "/")) { // si page d'accueil
      dispatch(getCardAfterfilterAction(initialSearchState))
    } else if (firstLoadDone === false && cardId) { // si page d'une carte ouverte
      dispatch(showPopupCard())
      dispatch(getCardByIdAction(cardId))
    } else if (firstLoadDone === false && !isLoaded && userId) { // si page de user autre que celle du currentUser
      dispatch(getUserByIdAction(userId))
    } else if (prevSearchState && currentSearch && ( // à chaque changement de state de recherche, modifier l'url
      prevSearchState.searchCategory !== currentSearch.searchCategory
      || prevSearchState.searchOrder !== currentSearch.searchOrder
      || prevSearchState.searchTopic !== currentSearch.searchTopic
      || prevSearchState.searchWords !== currentSearch.searchWords)
      && !cardId
      && !userId
    ) {
      dispatch(setRedirectUrl(true));
    }
    if (firstLoadDone === false) {
      dispatch(setFirstLoadDone())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardId, category, currentSearch, dispatch, fetchedCards, firstLoadDone, isLoaded, locationPathname, ordering, prevSearchState, props.history, search, topic, userId]);

  useEffect(() => {

    const bodyEl = document.querySelector('body');
    bodyEl.classList.remove('light-theme');
    bodyEl.classList.remove('dark-theme');
    bodyEl.classList.add(`${currentTheme}-theme-d`);

  }, [currentTheme])

  useEffect(() => {
    if (filterError && clickedCard === null) {

      dispatch(openNotificationPopup("error", 'Une erreur est survenue. Vous avez été redirigé.'))
      dispatch(deleteFilterErrorAction())
      dispatch(closePopupCard())
      dispatch(setRedirectUrl(true))

    }
  }, [clickedCard, dispatch, filterError, redirectUrl])

  useEffect(() => {
    const firstloader = document.getElementById('firstloader');
    if (firstloader) {
      firstloader.remove()
    }
  }, [])

  const redirectLink = SearchLinkRedirect();

  const handleClose = () => {
    dispatch(closeConnexionPopup())
  };

  const getScrollbarWidth = () => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    return scrollbarWidth;
  }

  useEffect(() => {
    if (popupCardIsOpen) {
      document.body.style.paddingRight = `${getScrollbarWidth()}px`;
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100%';
    } else {
      document.body.style.paddingRight = '0px';
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popupCardIsOpen])

  useEffect(() => {
    if (window.scrollY) {
      window.scroll(0, 0);
    }
  }, [props.location.pathname]);

  useEffect(() => {
    if (currentUserSettings) {
      currentUserSettings.color_theme && (currentUserSettings.color_theme === "light" || currentUserSettings.color_theme === "dark") && dispatch(toggleThemeAction(currentUserSettings.color_theme))
      currentUserSettings.card_size && (currentUserSettings.card_size === "small" || currentUserSettings.card_size === "big") && dispatch(setCardsSize(currentUserSettings.card_size))
    }
  }, [currentUserSettings, dispatch])


  return (
    <>
      {redirectUrl && <Redirect to={redirectLink} />}
      {connexionPopup ? <ConnexionRedirect handleClose={handleClose} /> : null}
      <div ref={appEl} className={`App ${currentTheme}-theme ${popupCardIsOpen ? "noscroll" : ""}`}>
        <NotificationPopup />
        <NavTop />
        <NavTopMobile />
        {signalPopup && <SignalPopup />}
        {clickedCard && <CardFullPopup />}
        <Routes />
        {locationPathname !== "/feedback_beta" && (
          <Link className="App__feedback" to="/feedback_beta">
            Donnez votre avis sur cette version Beta de Swipetuto !
          </Link>
        )}
        <Footer />

      </div>
    </>
  );
}

export default withRouter(App);
