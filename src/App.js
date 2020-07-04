import React, { useEffect } from "react";
import { Switch, Route, withRouter } from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch, useSelector } from 'react-redux';

import HomePage from './pages/Homepage/HomePage';
import Login from './pages/Login/Login';
import SearchPage from './pages/SearchPage/SearchPage'
import RessourcesPage from './pages/RessourcesPage/RessourcesPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import AccountPage from './pages/AccountPages/AccountPages'
// import SettingsPage from './pages/SettingsPage/SettingsPage'
import HelpPage from './pages/HelpPage/HelpPage'
import ConditionsOfUsagePage from './pages/ConditionsOfUsagePage/ConditionsOfUsagePage'
import ContactUsPage from './pages/ContactUsPage/ContactUsPage'

import NavTop from "./components/LayoutComponents/NavTop/NavTop";
import NavTopMobile from "./components/LayoutComponents/NavTop/NavTopMobile";
import Footer from "./components/LayoutComponents/Footer/Footer";

import { getCardsAction } from './redux/cards/cards-actions'
import { selectIsLoaded } from "./redux/cards/cards-selectors"
import { getCardAfterfilterAction } from "./redux/filter/filter-actions"

import { urlParams } from "./helper/index"

import './index.scss'
import './App.scss';
import ConfidentialityPage from "./pages/ConfidentialityPage/ConfidentialityPage";
import CookiesPage from "./pages/CookiesPage/CookiesPage";
import InfosPage from "./pages/InfosPage/InfosPage";




function App(props) {


  const dispatch = useDispatch();

  const [langage, category] = urlParams(props.location)
  const isLoaded = useSelector(selectIsLoaded)

  // useEffect(() => {
  //   !isLoaded && (
  //     langage || category ? dispatch(getCardAfterfilterAction(langage, category)) : dispatch(getCardsAction())
  //   )
  // }, [category, langage, dispatch, isLoaded]);

  useEffect(() => {
    !isLoaded && (
      langage || category ? dispatch(getCardAfterfilterAction(langage, category)) : dispatch(getCardsAction())
    )
  }, [isLoaded]);

  // const allImages = [...document.getElementsByTagName('img')];
  // console.log(allImages);
  // allImages.map(image => image.addEventListener('contextmenu', e => e.preventDefault()));

  return (
    <div className="App">
      <NavTop />
      <NavTopMobile />

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/login" component={Login} />
        <Route path="/ressources" component={RessourcesPage} />
        <Route path="/conditions" component={ConditionsOfUsagePage} />
        <Route path="/confidentiality" component={ConfidentialityPage} />
        <Route path="/cookies" component={CookiesPage} />
        <Route path="/contact-us" component={ContactUsPage} />
        <Route path="/infos" component={InfosPage} />
        <ProtectedRoute path="/account" component={AccountPage} />
        <ProtectedRoute exact path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default withRouter(App);
