import React from "react";
import { NavLink, Switch } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import SettingsPage from "./SettingsPage/SettingsPage";
import UserPage from "./UserPage/UserPage";
import UserHeader from "./UserHeader/UserHeader";

import { ReactComponent as SettingsLogo } from "../../assets/images/settings.svg";
import { ReactComponent as AccountLogo } from "../../assets/images/person.svg";
import { ReactComponent as BookmarkLogo } from "../../assets/images/bookmark.svg";

import "./AccountPages.scss";
import { selectTheme } from "../../redux/layout/layout-selectors";
import SavedPage from "./SavedPage/SavedPage";

const AccountPage = (props) => {
  const currentUser = useSelector(selectCurrentUser);
  const currentTheme = useSelector(selectTheme);

  // scroll reset
  if (window.scrollY) {
    window.scroll(0, 0);
  }

  return (
    <div className={`AccountPage ${currentTheme}-theme`}>
      <div className="AccountPage__wrapper">
        <div className="AccountPage__top">
          <UserHeader user="current" />
          <div className="AccountPage__navigation">
            <h2 className="title title-2">Navigation</h2>
            {currentUser ? (
              <>
                <NavLink to="/account/user">
                  <AccountLogo />
                  Compte
                </NavLink>
                <NavLink to="/account/saved">
                  <BookmarkLogo />
                  Sauvegardés
                </NavLink>
                <NavLink to="/account/settings">
                  <SettingsLogo />
                  Paramètres
                </NavLink>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <Switch>
          <ProtectedRoute exact path="/account/user" component={UserPage} />
          <ProtectedRoute
            exact
            path="/account/settings"
            component={SettingsPage}
          />
          <ProtectedRoute exact path="/account/saved" component={SavedPage} />
        </Switch>
      </div>
    </div>
  );
};

export default AccountPage;
