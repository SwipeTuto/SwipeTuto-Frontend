import React, { useEffect, useRef } from "react";
import { withRouter, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import NavTop from "./components/LayoutComponents/NavTop/NavTop";
import NavTopMobile from "./components/LayoutComponents/NavTop/NavTopMobile";
import Footer from "./components/LayoutComponents/Footer/Footer";

import { deleteFilterErrorAction, getCardAfterfilterAction, getCardByIdAction } from './redux/filter/filter-actions'
import { selectConnexionPopup, selectFirstLoadDone, selectIsLoaded, selectRedirectUrl, selectShowPopupCard, selectSignalPopupOpen, selectTheme } from "./redux/layout/layout-selectors"
import { setCurrentSearch } from "./redux/filter/filter-actions"

import { urlParams, getUrlId, initialSearchState } from "./helper/index"

import './index.scss'
import './App.scss';
import { closeConnexionPopup, closePopupCard, openNotificationPopup, setFirstLoadDone, setRedirectUrl, showPopupCard } from "./redux/layout/layout-actions";
import { getUserByIdAction } from "./redux/user/user-actions";
import SignalPopup from "./components/LayoutComponents/SignalPopup/SignalPopup";
import CardFullPopup from "./components/CardsComponents/CardFullPopup/CardFullPopup";
import SearchLinkRedirect from "./helper/SearchLinkRedirect";
import ConnexionRedirect from "./components/LayoutComponents/ConnexionRedirect/ConnexionRedirect";
import { selectCardsFetched, selectClickedCard, selectCurrentSearch, selectFilterError } from "./redux/filter/filter-selectors";
import { usePrevious } from "./hooks/usePrevious";
// import { selectCurrentUser } from "./redux/user/user-selectors";
import Routes from "./Routes"
import NotificationPopup from "./components/LayoutComponents/NotificationPopup/NotificationPopup";
import FirstConnexionForm from "./components/FirstConnexionForm/FirstConnexionForm";
// import { auth } from "./services/firebaseService"

function App(props) {

  const currentTheme = useSelector(selectTheme)
  const dispatch = useDispatch();
  const [topic, category, ordering, search] = urlParams(props.location)
  const userId = getUrlId(props.location.pathname, "user_id")
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
  // const currentUser = useSelector(selectCurrentUser);
  const fetchedCards = useSelector(selectCardsFetched)
  // const location = useLocation()
  const popupCardIsOpen = useSelector(selectShowPopupCard);
  const appEl = useRef(null)
  const filterError = useSelector(selectFilterError)

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
    } else if (firstLoadDone === false && locationPathname === "/") { // si page d'une carte ouverte
      dispatch(getCardAfterfilterAction(initialSearchState))
    } else if (firstLoadDone === false && cardId) { // si page d'une carte ouverte
      dispatch(showPopupCard())
      dispatch(getCardByIdAction(cardId))
    } else if (firstLoadDone === false && !isLoaded && userId) { // si page de user autre que celle du currentUser
      dispatch(getUserByIdAction(userId))
      // dispatch(setFirstLoadDone())
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
  }, [cardId, category, currentSearch, dispatch, fetchedCards, firstLoadDone, isLoaded, locationPathname, ordering, prevSearchState, props.history, search, topic, userId]);

  useEffect(() => {

    const bodyEl = document.querySelector('body');
    bodyEl.classList.remove('light-theme');
    bodyEl.classList.remove('dark-theme');
    bodyEl.classList.add(`${currentTheme}-theme-d`);

  }, [currentTheme])

  useEffect(() => {
    if (filterError && clickedCard === null) {

      dispatch(openNotificationPopup('Une erreur est survenue. Vous avez été redirigé.'))
      dispatch(deleteFilterErrorAction())
      dispatch(closePopupCard())
      // window.history.pushState("", "", "/");
      dispatch(setRedirectUrl(true))

    }
  }, [clickedCard, dispatch, filterError, redirectUrl])

  const redirectLink = SearchLinkRedirect();

  const handleClose = () => {
    dispatch(closeConnexionPopup())
  };

  // const scrollYWindow = window.scrollY;
  // const scrollY = appEl.current && appEl.current.style.top;
  // const largeurEcran = window.innerWidth;
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


  return (
    <>
      {redirectUrl && <Redirect to={redirectLink} />}
      {connexionPopup ? <ConnexionRedirect handleClose={handleClose} /> : null}
      <div ref={appEl} className={`App ${currentTheme}-theme ${popupCardIsOpen ? "noscroll" : ""}`}>
        <FirstConnexionForm />
        <NotificationPopup />
        <NavTop />
        <NavTopMobile />
        {signalPopup && <SignalPopup />}
        {clickedCard && <CardFullPopup />}
        <Routes />
        <Footer />

      </div>
    </>
  );
}

export default withRouter(App);
