import React, { useEffect } from "react";
import { Switch, Route, withRouter } from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch, useSelector } from 'react-redux';

import HomePage from './pages/Homepage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SearchPage from './pages/SearchPage/SearchPage'
import RessourcesPage from './pages/RessourcesPage/RessourcesPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import AccountPage from './pages/AccountPages/AccountPages'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import HelpPage from './pages/HelpPage/HelpPage'
import ConditionsOfUsagePage from './pages/ConditionsOfUsagePage/ConditionsOfUsagePage'
import ContactUsPage from './pages/ContactUsPage/ContactUsPage'

import NavTop from "./components/LayoutComponents/NavTop/NavTop";
import NavTopMobile from "./components/LayoutComponents/NavTop/NavTopMobile";
import Footer from "./components/LayoutComponents/Footer/Footer";

import { getCardByIdAction } from './redux/filter/filter-actions'
import { selectIsLoaded, selectShowPopupCard, selectSignalPopupOpen, selectTheme } from "./redux/layout/layout-selectors"
import { setCurrentSearch } from "./redux/filter/filter-actions"


import { urlParams, getUrlId } from "./helper/index"


import './index.scss'
import './App.scss';
import ConfidentialityPage from "./pages/ConfidentialityPage/ConfidentialityPage";
import CookiesPage from "./pages/CookiesPage/CookiesPage";
import InfosPage from "./pages/InfosPage/InfosPage";
import { showPopupCard } from "./redux/layout/layout-actions";
import { getUserByIdAction } from "./redux/user/user-actions";
import SignalPopup from "./components/LayoutComponents/SignalPopup/SignalPopup";
import CardFullPopup from "./components/CardsComponents/CardFullPopup/CardFullPopup";



function App(props) {

  const currentTheme = useSelector(selectTheme)
  const dispatch = useDispatch();
  const [topic, category, ordering, search] = urlParams(props.location)
  const userId = getUrlId(props.location.pathname, "user_id")
  const cardId = getUrlId(props.location.pathname, "card_id")
  const isLoaded = useSelector(selectIsLoaded)
  const signalPopup = useSelector(selectSignalPopupOpen)
  const cardPopupShown = useSelector(selectShowPopupCard)

  useEffect(() => {
    if (!isLoaded && (topic || category || ordering || search)) {
      dispatch(setCurrentSearch("searchWords", search))
      dispatch(setCurrentSearch("searchTopic", topic))
      dispatch(setCurrentSearch("searchCategory", category))
      dispatch(setCurrentSearch("searchOrder", ordering || "-created"))
    } else if (cardId) {
      dispatch(getCardByIdAction(cardId))
      dispatch(showPopupCard())
    } else if (!isLoaded && userId) {
      dispatch(getUserByIdAction(userId))
    } else {
      return
    }
  }, []);

  useEffect(() => {
    const bodyEl = document.querySelector('body');
    bodyEl.classList.remove('light-theme');
    bodyEl.classList.remove('dark-theme');
    bodyEl.classList.add(`${currentTheme}-theme`);
  }, [currentTheme])

  return (
    <div className={`App ${currentTheme}-theme`}>
      <NavTop />
      <NavTopMobile />
      {signalPopup && <SignalPopup />}
      {cardPopupShown && <CardFullPopup />}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/connexion" component={LoginPage} />

        <Route path="/ressources" component={RessourcesPage} />
        <Route path="/conditions" component={ConditionsOfUsagePage} />
        <Route path="/confidentiality" component={ConfidentialityPage} />
        <Route path="/cookies" component={CookiesPage} />
        <Route path="/contact" component={ContactUsPage} />
        <Route path="/infos" component={InfosPage} />
        <Route path="/help" component={HelpPage} />
        <Route path="/card_id=:card_id" component={SearchPage} />
        <Route path="/profile/user_id=:user_id" component={ProfilePage} />
        <ProtectedRoute path="/account" component={AccountPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default withRouter(App);
