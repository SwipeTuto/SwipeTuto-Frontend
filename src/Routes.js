
import React from "react";
import { useSelector } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from './pages/Homepage/HomePageNew';
import LoginPage from './pages/LoginPage/LoginPage';
import SearchPage from './pages/SearchPage/SearchPage'
// import RessourcesPage from './pages/RessourcesPage/RessourcesPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import AccountPage from './pages/AccountPages/AccountPages'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import HelpPage from './pages/HelpPage/HelpPage'
import ConditionsOfUsagePage from './pages/ConditionsOfUsagePage/ConditionsOfUsagePage'
import ContactUsPage from './pages/ContactUsPage/ContactUsPage'
import ConfidentialityPage from "./pages/ConfidentialityPage/ConfidentialityPage";
import CookiesPage from "./pages/CookiesPage/CookiesPage";
import InfosPage from "./pages/InfosPage/InfosPage";
import AddCardPage from "./pages/AddCardPage/AddCardPage";
import { selectCurrentUser } from "./redux/user/user-selectors";
import UserHomePage from "./pages/UserHomePage/UserHomePage";
import DraftsPage from "./pages/DraftsPage/DraftsPage";

const Routes = () => {

  const currentUser = useSelector(selectCurrentUser)

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
      <ProtectedRoute path="/home" component={UserHomePage} />

      {currentUser ? (
        <Route path="/card_id=:card_id" component={SearchPage} />
      ) : (
          <Route path="/card_id=:card_id" component={HomePage} />
        )}
      <Route path="/profile/user_id=:user_id" component={ProfilePage} />
      <ProtectedRoute path="/account" component={AccountPage} />

      <Route component={NotFoundPage} />
    </Switch>
  )
}



export default withRouter(Routes);