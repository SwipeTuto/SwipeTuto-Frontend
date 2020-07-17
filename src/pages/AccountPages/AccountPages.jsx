import React from "react";
import { NavLink, Route, Switch, Link } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import SettingsPage from "./SettingsPage/SettingsPage";
import UserPage from "./UserPage/UserPage";
import UserAvatar from "../../components/UserComponents/UserAvatar/UserAvatar";

import { ReactComponent as LogoFacebook } from "../../assets/images/logo-facebook.svg";
import { ReactComponent as LogoTwitter } from "../../assets/images/logo-twitter.svg";
import { ReactComponent as LogoYoutube } from "../../assets/images/logo-youtube.svg";
import { ReactComponent as LogoGithub } from "../../assets/images/logo-github.svg";
import { ReactComponent as SettingsLogo } from "../../assets/images/settings.svg";
import { ReactComponent as AccountLogo } from "../../assets/images/person.svg";
import newUserAvatar from "../../assets/images/avatar_new_user.png";

import "./AccountPages.scss";

const AccountPage = ({ match }) => {
  const currentUser = useSelector(selectCurrentUser);

  // scroll reset
  if (window.scrollY) {
    window.scroll(0, 0);
  }

  return (
    <div className="AccountPage">
      <div className="AccountPage__wrapper">
        <div className="AccountPage__header">
          <div className="AccountPage__userInfos">
            <div className="AccountPage__avatar">
              <UserAvatar
                userImage={
                  currentUser &&
                  currentUser.profile &&
                  currentUser.profile.avatar
                    ? currentUser.profile.avatar
                    : null
                }
                userFirstName={
                  currentUser && currentUser.first_name
                    ? currentUser.first_name
                    : null
                }
                userLastName={
                  currentUser && currentUser.last_name
                    ? currentUser.last_name
                    : null
                }
              />
            </div>
            <div className="AccountPage__text">
              <p className="AccountPage__userWelcome">{currentUser.username}</p>
              <p className="AccountPage__userWelcome">{currentUser.email}</p>
            </div>
            <div className="AccountPage__mobile">
              <Link className="AccountPage__mobile--link" to="/account/user">
                <AccountLogo />
              </Link>
              <Link
                className="AccountPage__mobile--link"
                to="/account/settings"
              >
                <SettingsLogo />
              </Link>
            </div>
          </div>
          <div className="AccountPage__bio">
            <p className="AccountPage__bio--text">
              {currentUser &&
              currentUser.profile &&
              currentUser.profile.description
                ? currentUser.profile.description
                : "Utilisateur SwipeTuto."}
            </p>
          </div>
          <div className="AccountPage__social">
            {/* <a href="#" target="_blank" className="AccountPage__social--link">
              <LogoYoutube className="AccountPage__social--logo" />
            </a>
            <a href="#" target="_blank" className="AccountPage__social--link">
              <LogoGithub className="AccountPage__social--logo" />
            </a>
            <a href="#" target="_blank" className="AccountPage__social--link">
              <LogoFacebook className="AccountPage__social--logo" />
            </a>
            <a href="#" target="_blank" className="AccountPage__social--link">
              <LogoTwitter className="AccountPage__social--logo" />
            </a> */}
          </div>
        </div>

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
