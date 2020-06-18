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
import { getCardAfterfilterAction } from "./redux/filter/filter-actions"

import { urlParams } from "./utils/index"

import './index.scss'
import './App.scss';
import ConfidentialityPage from "./pages/ConfidentialityPage/ConfidentialityPage";
import CookiesPage from "./pages/CookiesPage/CookiesPage";




function App(props) {


  const dispatch = useDispatch();

  const [langage, category] = urlParams(props.location)
  const isLoaded = useSelector(state => state.cards.isLoaded)

  useEffect(() => {
    isLoaded && (
      langage || category ? dispatch(getCardAfterfilterAction(langage, category)) : dispatch(getCardsAction())
    )
  }, [category, langage, dispatch, isLoaded]);

  return (
    <div className="App">
      <NavTop />
      <NavTopMobile />
      {/* <NavLeft /> */}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/cards" component={SearchPage} />
        <Route exact path="/search" component={SearchPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/ressources" component={RessourcesPage} />
        <Route exact path="/conditions" component={ConditionsOfUsagePage} />
        <Route exact path="/confidentiality" component={ConfidentialityPage} />
        <Route exact path="/cookies" component={CookiesPage} />
        <Route exact path="/contact-us" component={ContactUsPage} />
        <ProtectedRoute path="/account" component={AccountPage} />
        {/* <ProtectedRoute exact path="/settings" component={SettingsPage} /> */}
        <ProtectedRoute exact path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default withRouter(App);
