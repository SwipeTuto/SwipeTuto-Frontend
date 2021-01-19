
import React, { lazy, Suspense } from "react";
import { useSelector } from 'react-redux'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoute";
import { selectCurrentUser } from "./redux/user/user-selectors";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import PageLoading from "./components/Loading/PageLoading";
const FirstConnexionPage = lazy(() => import('./pages/FirstConnexionPage/FirstConnexionPage'))
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'))
const HomePage = lazy(() => import('./pages/Homepage/HomePage'))
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
          <ProtectedRoute exact path="/search" component={SearchPage} />
          <Route path="/connexion" component={LoginPage} />
          <Route exact path="/conditions" component={ConditionsOfUsagePage} />
          <Route exact path="/confidentiality" component={ConfidentialityPage} />
          <Route exact path="/cookies" component={CookiesPage} />
          <Route exact path="/contact" component={ContactUsPage} />
          <Route exact path="/infos" component={InfosPage} />
          <Route exact path="/help" component={HelpPage} />
          <Route exact path="/first-connexion" component={FirstConnexionPage} />
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