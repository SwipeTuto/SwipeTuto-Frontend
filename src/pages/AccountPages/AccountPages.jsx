import React, { lazy, Suspense } from "react";
import { NavLink, Route, Switch, withRouter } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import SettingsPage from "./SettingsPage/SettingsPage";
import UserPage from "./UserPage/UserPage";
import { ReactComponent as SettingsLogo } from "../../assets/images/settings.svg";
import { ReactComponent as AccountLogo } from "../../assets/images/person.svg";
import { ReactComponent as BookmarkLogo } from "../../assets/images/bookmark.svg";
import { ReactComponent as PencilLogo } from "../../assets/images/pencil.svg";
import { ReactComponent as AddLogo } from "../../assets/images/add-circle.svg";
import { ReactComponent as HelpLogo } from "../../assets/images/help-circle.svg";
import { ReactComponent as ContactLogo } from "../../assets/images/mail.svg";
import { ReactComponent as PreferencesLogo } from "../../assets/images/color-palette.svg";
import { ReactComponent as LogOutLogo } from "../../assets/images/log-out.svg";
import "./AccountPages.scss";
import { selectTheme } from "../../redux/layout/layout-selectors";
import UserNameAndAvatar from "../../components/UserComponents/UserAvatar/UserNameAndAvatar";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import PageLoading from "../../components/Loading/PageLoading";
import { logoutAction } from "../../redux/user/user-actions";

const SavedPage = lazy(() => import("./SavedPage/SavedPage"));
const DraftsPage = lazy(() => import("../DraftsPage/DraftsPage"));
const AddCardPage = lazy(() => import("./AddCardPage/AddCardPage"));
const PreferencesPage = lazy(() => import("./PreferencesPage/PreferencesPage"));
const ChangePasswordPage = lazy(() => import("./ChangePasswordPage/ChangePasswordPage"));

const AccountPage = (props) => {
  const currentUser = useSelector(selectCurrentUser);
  const currentTheme = useSelector(selectTheme);
  const dispatch = useDispatch();

  return (
    <div className={`AccountPage ${currentTheme}-theme-d`}>
      <div className={`AccountPage__navigation ${currentTheme}-theme-m`}>
        <div className="AccountPage__navigation--items">
          {currentUser ? (
            <>
              <UserNameAndAvatar user={currentUser} />
              <div className="AccountPage__user-stats"></div>
              <NavLink
                to="/account/add"
                onClick={() => window.localStorage.removeItem("draftNewCard")}
                className={props.location.pathname === "/account/modify" ? "active" : ""}
              >
                <AddLogo />
                Publier
              </NavLink>
              <div className="AccountPage__item-border"></div>
              <NavLink to="/account/user">
                <AccountLogo />
                Profil
              </NavLink>
              <NavLink to="/account/saved">
                <BookmarkLogo />
                Sauvegardés
              </NavLink>
              <NavLink to="/account/drafts">
                <PencilLogo />
                Brouillons
              </NavLink>
              <NavLink to="/account/settings">
                <SettingsLogo />
                Paramètres
              </NavLink>
              <NavLink to="/account/preferences">
                <PreferencesLogo />
                Préférences
              </NavLink>
              <NavLink to="/help">
                <HelpLogo />
                Aide
              </NavLink>
              <NavLink to="/contact">
                <ContactLogo />
                Contact
              </NavLink>

              <p
                className="AccountPage__logout"
                onClick={() => {
                  dispatch(logoutAction());
                }}
              >
                <LogOutLogo />
                Déconnexion
              </p>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="AccountPage__page">
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<PageLoading />}>
              <Route path="/account/changepw" component={ChangePasswordPage} />
              <ProtectedRoute exact path="/account/user" component={UserPage} />
              <ProtectedRoute exact path="/account/settings" component={SettingsPage} />
              <ProtectedRoute exact path="/account/preferences" component={PreferencesPage} />
              <ProtectedRoute exact path="/account/saved" component={SavedPage} />
              <ProtectedRoute exact path="/account/drafts" component={DraftsPage} />
              <ProtectedRoute exact path="/account/modify" component={() => <AddCardPage type="modify" />} />
              <ProtectedRoute exact path="/account/add" component={AddCardPage} />
              <ProtectedRoute exact path="/account/password/reset/confirm/:uidb64/:token" component={ChangePasswordPage} />
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </div>
    </div>
  );
};

export default withRouter(AccountPage);
