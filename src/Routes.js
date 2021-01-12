
import React, { lazy, Suspense } from "react";
import { useSelector } from 'react-redux'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoute";
// import HomePage from './pages/Homepage/HomePageNew';
// import LoginPage from './pages/LoginPage/LoginPage';
// import SearchPage from './pages/SearchPage/SearchPage'
// import RessourcesPage from './pages/RessourcesPage/RessourcesPage'
// import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
// import AccountPage from './pages/AccountPages/AccountPages'
// import ProfilePage from './pages/ProfilePage/ProfilePage'
// import HelpPage from './pages/HelpPage/HelpPage'
// import ConditionsOfUsagePage from './pages/ConditionsOfUsagePage/ConditionsOfUsagePage'
// import ContactUsPage from './pages/ContactUsPage/ContactUsPage'
// import ConfidentialityPage from "./pages/ConfidentialityPage/ConfidentialityPage";
// import CookiesPage from "./pages/CookiesPage/CookiesPage";
// import InfosPage from "./pages/InfosPage/InfosPage";
// import AddCardPage from "./pages/AccountPages/AddCardPage/AddCardPage";
// import UserHomePage from "./pages/UserHomePage/UserHomePage";
// import DraftsPage from "./pages/DraftsPage/DraftsPage";
import { selectCurrentUser } from "./redux/user/user-selectors";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import PageLoading from "./components/Loading/PageLoading";
// import AddCardPage from "./pages/AccountPages/AddCardPage/AddCardPage";

const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'))
const HomePage = lazy(() => import('./pages/Homepage/HomePageNew'))
const SearchPage = lazy(() => import('./pages/SearchPage/SearchPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))
const AccountPage = lazy(() => import('./pages/AccountPages/AccountPages'))
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'))
const HelpPage = lazy(() => import('./pages/HelpPage/HelpPage'))
const ConditionsOfUsagePage = lazy(() => import('./pages/ConditionsOfUsagePage/ConditionsOfUsagePage'))
const ContactUsPage = lazy(() => import('./pages/ContactUsPage/ContactUsPage'))
const ConfidentialityPage = lazy(() => import("./pages/ConfidentialityPage/ConfidentialityPage"))
const CookiesPage = lazy(() => import("./pages/CookiesPage/CookiesPage"))
const InfosPage = lazy(() => import("./pages/InfosPage/InfosPage"))
const UserHomePage = lazy(() => import("./pages/UserHomePage/UserHomePage"))

const Routes = () => {

  const currentUser = useSelector(selectCurrentUser)

  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoading />}>
        <Switch>
          {/* <Route exact path="/" component={HomePage} /> */}
          <ProtectedRoute exact path="/search" component={SearchPage} />
          <Route path="/connexion" component={LoginPage} />
          <Route exact path="/conditions" component={ConditionsOfUsagePage} />
          <Route exact path="/confidentiality" component={ConfidentialityPage} />
          <Route exact path="/cookies" component={CookiesPage} />
          <Route exact path="/contact" component={ContactUsPage} />
          <Route exact path="/infos" component={InfosPage} />
          <Route exact path="/help" component={HelpPage} />
          {/* <ProtectedRoute path="/home" component={UserHomePage} /> */}
          <Route path="/profile/user_id=:user_id" component={ProfilePage} />
          <ProtectedRoute path="/account" component={AccountPage} />
          <Route path="/card_id=:card_id" component={SearchPage} />

          {currentUser ? (

            <ProtectedRoute exact path="/" component={UserHomePage} />

          ) : (

              <Route exact path="/" component={HomePage} />

            )}
          <Route exact path="/404" component={NotFoundPage} />
          <Redirect to="/404" />
        </Switch>
      </Suspense>
    </ErrorBoundary>
  )
}

export default withRouter(Routes);