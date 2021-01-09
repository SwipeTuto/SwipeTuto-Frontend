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
import { ReactComponent as PencilLogo } from "../../assets/images/pencil.svg";
import { ReactComponent as AddLogo } from "../../assets/images/add-circle.svg";
import { ReactComponent as HelpLogo } from "../../assets/images/help-circle.svg";
import { ReactComponent as ContactLogo } from "../../assets/images/mail.svg";
import { ReactComponent as PreferencesLogo } from "../../assets/images/color-palette.svg";

import "./AccountPages.scss";
import { selectTheme } from "../../redux/layout/layout-selectors";
import SavedPage from "./SavedPage/SavedPage";
import DraftsPage from "../DraftsPage/DraftsPage";
import AddCardPage from "./AddCardPage/AddCardPage";
import UserNameAndAvatar from "../../components/UserComponents/UserAvatar/UserNameAndAvatar";
import PreferencesPage from "./PreferencesPage/PreferencesPage";

const AccountPage = (props) => {
  const currentUser = useSelector(selectCurrentUser);
  const currentTheme = useSelector(selectTheme);

  // scroll reset

  if (window.scrollY) {
    window.scroll(0, 0);
  }

  return (
    <div className={`AccountPage ${currentTheme}-theme-d`}>
      <div className={`AccountPage__navigation ${currentTheme}-theme-m`}>
        <div className="AccountPage__navigation--items">
          {currentUser ? (
            <>
              <UserNameAndAvatar user={currentUser} />
              <NavLink to="/account/add" onClick={() => window.localStorage.removeItem("draftNewCard")}>
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
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="AccountPage__page">
        <Switch>
          <ProtectedRoute exact path="/account/user" component={UserPage} />
          <ProtectedRoute exact path="/account/settings" component={SettingsPage} />
          <ProtectedRoute exact path="/account/preferences" component={PreferencesPage} />
          <ProtectedRoute exact path="/account/saved" component={SavedPage} />
          <ProtectedRoute exact path="/account/drafts" component={DraftsPage} />
          <ProtectedRoute exact path="/account/modify" component={() => <AddCardPage type="modify" />} />
          <ProtectedRoute exact path="/account/add" component={AddCardPage} />
        </Switch>
      </div>
    </div>
  );
};

export default AccountPage;
