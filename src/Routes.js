
import React from "react";
import { Switch, Route, withRouter } from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from './pages/Homepage/HomePageNew';
import LoginPage from './pages/LoginPage/LoginPage';
import SearchPage from './pages/SearchPage/SearchPage'
import RessourcesPage from './pages/RessourcesPage/RessourcesPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import AccountPage from './pages/AccountPages/AccountPages'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import HelpPage from './pages/HelpPage/HelpPage'
import ConditionsOfUsagePage from './pages/ConditionsOfUsagePage/ConditionsOfUsagePage'
import ContactUsPage from './pages/ContactUsPage/ContactUsPage'
import ConfidentialityPage from "./pages/ConfidentialityPage/ConfidentialityPage";
import CookiesPage from "./pages/CookiesPage/CookiesPage";
import InfosPage from "./pages/InfosPage/InfosPage";

const Routes = () => {

  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <ProtectedRoute path="/search" component={SearchPage} />
      <Route path="/connexion" component={LoginPage} />
      {/* <Route path="/ressources" component={RessourcesPage} /> */}
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
  )
}



export default withRouter(Routes);