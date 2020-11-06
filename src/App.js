import React, { useEffect } from "react";
import { withRouter, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import NavTop from "./components/LayoutComponents/NavTop/NavTop";
import NavTopMobile from "./components/LayoutComponents/NavTop/NavTopMobile";
import Footer from "./components/LayoutComponents/Footer/Footer";

import { getCardAfterfilterAction, getCardByIdAction } from './redux/filter/filter-actions'
import { selectConnexionPopup, selectFirstLoadDone, selectIsLoaded, selectRedirectUrl, selectSignalPopupOpen, selectTheme } from "./redux/layout/layout-selectors"
import { setCurrentSearch } from "./redux/filter/filter-actions"

import { urlParams, getUrlId } from "./helper/index"

import './index.scss'
import './App.scss';
import { closeConnexionPopup, setFirstLoadDone, setRedirectUrl } from "./redux/layout/layout-actions";
import { getUserByIdAction } from "./redux/user/user-actions";
import SignalPopup from "./components/LayoutComponents/SignalPopup/SignalPopup";
import CardFullPopup from "./components/CardsComponents/CardFullPopup/CardFullPopup";
import SearchLinkRedirect from "./helper/SearchLinkRedirect";
import ConnexionRedirect from "./components/LayoutComponents/ConnexionRedirect/ConnexionRedirect";
import { selectCardsFetched, selectClickedCard, selectCurrentSearch } from "./redux/filter/filter-selectors";
import { usePrevious } from "./hooks/usePrevious";
// import { selectCurrentUser } from "./redux/user/user-selectors";
import Routes from "./Routes"
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
    } else if (firstLoadDone === false && cardId) { // si page d'une carte ouverte
      dispatch(getCardByIdAction(cardId))
    } else if (firstLoadDone === false && !isLoaded && userId) { // si page de user autre que celle du currentUser
      dispatch(getUserByIdAction(userId))
      // dispatch(setFirstLoadDone())
    } else if (fetchedCards === null && locationPathname && !locationPathname.includes("/account")) {
      const currentSearchCopy = { ...currentSearch, searchOrder: "likes" };
      dispatch(getCardAfterfilterAction(currentSearchCopy))
    } else if (prevSearchState && currentSearch && ( // à chaque changement de state de recherche, modifier l'url
      prevSearchState.searchCategory !== currentSearch.searchCategory ||
      prevSearchState.searchOrder !== currentSearch.searchOrder || prevSearchState.searchTopic !== currentSearch.searchTopic || prevSearchState.searchWords !== currentSearch.searchWords
    )) {
      dispatch(setRedirectUrl(true));
    }
    if (firstLoadDone === false) {
      dispatch(setFirstLoadDone())
    }
  }, [cardId, category, currentSearch, dispatch, fetchedCards, firstLoadDone, isLoaded, locationPathname, ordering, prevSearchState, search, topic, userId]);

  useEffect(() => {

    const bodyEl = document.querySelector('body');
    bodyEl.classList.remove('light-theme');
    bodyEl.classList.remove('dark-theme');
    bodyEl.classList.add(`${currentTheme}-theme`);

  }, [currentTheme])

  const redirectLink = SearchLinkRedirect();

  const handleClose = () => {
    dispatch(closeConnexionPopup())
  };

  return (
    <>
      {redirectUrl && <Redirect to={redirectLink} />}
      {connexionPopup ? <ConnexionRedirect handleClose={handleClose} /> : null}
      <div className={`App ${currentTheme}-theme`}>
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
