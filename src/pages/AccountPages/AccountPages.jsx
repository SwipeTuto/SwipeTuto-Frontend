import React, { useEffect } from "react";
import { NavLink, Route, Switch, Link } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import SettingsPage from "./SettingsPage/SettingsPage";
import UserPage from "./UserPage/UserPage";
import UserHeader from "./UserHeader/UserHeader";

import { ReactComponent as LogoFacebook } from "../../assets/images/logo-facebook.svg";
import { ReactComponent as LogoTwitter } from "../../assets/images/logo-twitter.svg";
import { ReactComponent as LogoYoutube } from "../../assets/images/logo-youtube.svg";
import { ReactComponent as LogoGithub } from "../../assets/images/logo-github.svg";
import { ReactComponent as SettingsLogo } from "../../assets/images/settings.svg";
import { ReactComponent as AccountLogo } from "../../assets/images/person.svg";
import newUserAvatar from "../../assets/images/avatar_new_user.png";

import "./AccountPages.scss";

const AccountPage = (props) => {
  const currentUser = useSelector(selectCurrentUser);
  console.log(props);

  // scroll reset
  if (window.scrollY) {
    window.scroll(0, 0);
  }

  useEffect(() => {}, []);

  return (
    <div className="AccountPage">
      <div className="AccountPage__wrapper">
        <UserHeader user="current" />
        <div className="AccountPage__infos">// USER INFOS</div>
        <Switch>
          <ProtectedRoute exact path="/account/user" component={UserPage} />
          <ProtectedRoute
            exact
            path="/account/settings"
            component={SettingsPage}
          />
        </Switch>
      </div>
      <div className="AccountPage__navigation">
        <h2 className="title title-2">Navigation</h2>
        {currentUser ? (
          <>
            <NavLink to="/account/user">
              <AccountLogo />
              Compte
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
  );
};

export default AccountPage;
