// Présent dans App.js

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";

// redux
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import { selectCurrentSearch } from "../../../redux/filter/filter-selectors";
import { logoutAction } from "../../../redux/user/user-actions";
import { toggleUserNav } from "../../../redux/layout/layout-actions";
import {
  selectUserNav,
  selectTheme,
} from "../../../redux/layout/layout-selectors";
import { setCurrentSearch } from "../../../redux/filter/filter-actions";

// helper
import { topicArray } from "../../../helper/index";

// components
import CustomButton from "../CustomButton/CustomButton";
import UserAvatar from "../../UserComponents/UserAvatar/UserAvatar";
import SearchForm from "../SearchForm/SearchForm";
import UserUsername from "../../UserComponents/UserAvatar/UserUsername";

// assets
import { ReactComponent as AccountLogo } from "../../../assets/images/person.svg";
import { ReactComponent as SettingsLogo } from "../../../assets/images/settings.svg";
import { ReactComponent as HelpLogo } from "../../../assets/images/help-circle.svg";
import { ReactComponent as LogOutLogo } from "../../../assets/images/log-out.svg";
import { ReactComponent as DropDownLogo } from "../../../assets/images/chevrons/chevron-down.svg";
import { ReactComponent as BookmarkLogo } from "../../../assets/images/bookmark.svg";
import SwipeTutoSmallSmall from "../../../assets/logos/Logo_small_border_black_smaller_100px.png";

import "./NavTop.scss";

const NavTop = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const currentTheme = useSelector(selectTheme);
  const currentUserNav = useSelector(selectUserNav);
  const currentSearch = useSelector(selectCurrentSearch);

  const topicHandleClick = async (e) => {
    const topicName = e.target.name ? e.target.name : null;
    const currentSearchCopy = { ...currentSearch, searchTopic: topicName };
    dispatch(setCurrentSearch(currentSearchCopy));
  };

  return (
    <div className={`NavTop ${currentTheme}-theme`}>
      <div className="NavTop__left">
        <Link className="NavTop__swipeTuto" to="/">
          <img src={SwipeTutoSmallSmall} alt="" />
        </Link>

        <NavLink exact className="NavTop__link" to="/">
          Accueil
        </NavLink>

        <NavLink className="NavTop__link" to="/ressources">
          Ressources
        </NavLink>
        <p className="NavTop__link NavTop__link--category">
          Langages
          <DropDownLogo className="NavTop__link--logo" />
        </p>
        <div
          className={`NavTop__dropdown NavTop__dropdown--category ${currentTheme}-theme`}
        >
          {topicArray &&
            topicArray.map((rubrique, index) => (
              <div key={index}>
                <img
                  onClick={(e) => topicHandleClick(e)}
                  src={rubrique.logo}
                  name={rubrique.queryName}
                  className="NavTop__dropdown--logo"
                  alt={rubrique.name}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="NavTop__center">
        <SearchForm />
      </div>
      <div className="NavTop__right">
        {currentUser ? (
          <>
            <div
              onClick={() => dispatch(toggleUserNav())}
              className="NavTop__avatar"
            >
              <UserAvatar user={currentUser} link={false} />
            </div>
          </>
        ) : (
          <Link className="NavTop__linkConnexion" to="/connexion/login">
            <CustomButton color="dark">Connexion / Inscription</CustomButton>
          </Link>
        )}
      </div>
      {currentUserNav ? (
        <div className={`NavTop__userMenu ${currentTheme}-theme`}>
          <div className="NavTop__userMenu--meta">
            <UserUsername user={currentUser} link={true} />
            <p className="NavTop__userMenu--text">{currentUser.email}</p>
          </div>
          <div className="NavTop__userMenu--links">
            <Link
              className="NavTop__userMenu--link"
              to="/account/user"
              onClick={() => dispatch(toggleUserNav())}
            >
              <AccountLogo className="NavTop__userMenu--logo" />
              Compte
            </Link>
            <Link
              className="NavTop__userMenu--link"
              to="/account/settings"
              onClick={() => dispatch(toggleUserNav())}
            >
              <SettingsLogo className="NavTop__userMenu--logo" />
              Paramètres
            </Link>
            <Link
              className="NavTop__userMenu--link"
              to="/account/saved"
              onClick={() => dispatch(toggleUserNav())}
            >
              <BookmarkLogo className="NavTop__userMenu--logo" />
              Sauvegardés
            </Link>
            <Link
              className="NavTop__userMenu--link"
              to="/help"
              onClick={() => dispatch(toggleUserNav())}
            >
              <HelpLogo className="NavTop__userMenu--logo" />
              Aide
            </Link>
            <Link
              onClick={() => {
                dispatch(logoutAction());
                dispatch(toggleUserNav());
              }}
              className="NavTop__userMenu--link"
              to="/"
            >
              <LogOutLogo className="NavTop__userMenu--logo" />
              Deconnexion
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavTop;
