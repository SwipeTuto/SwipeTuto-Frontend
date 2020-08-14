// Présent dans App.js

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink, Link } from "react-router-dom";

// redux
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import {
  selectSearchCategory,
  selectSearchWords,
  selectSearchOrder,
  selectSearchPage,
  selectCurrentSearch,
  selectSearchTopic,
} from "../../../redux/filter/filter-selectors";
import { logoutAction } from "../../../redux/user/user-actions";
import { toggleUserNav } from "../../../redux/layout/layout-actions";
import { selectUserNav } from "../../../redux/layout/layout-selectors";
import {
  getCardAfterfilterAction,
  setCurrentSearch,
  deleteCurrentSearch,
} from "../../../redux/filter/filter-actions";

// helper
import { initialSearchState } from "../../../helper/index";
import { topicArray } from "../../../helper/index";

// components
import CustomButton from "../CustomButton/CustomButton";
import UserAvatar from "../../UserComponents/UserAvatar/UserAvatar";
import SearchLinkRedirect from "../../../helper/SearchLinkRedirect";
import SearchForm from "../SearchForm/SearchForm";
import UserUsername from "../../UserComponents/UserAvatar/UserUsername";

// assets
import { ReactComponent as AccountLogo } from "../../../assets/images/person.svg";
import { ReactComponent as SettingsLogo } from "../../../assets/images/settings.svg";
import { ReactComponent as HelpLogo } from "../../../assets/images/help-circle.svg";
import { ReactComponent as LogOutLogo } from "../../../assets/images/log-out.svg";
import { ReactComponent as DropDownLogo } from "../../../assets/images/chevrons/chevron-down.svg";
import SwipeTutoSmallSmall from "../../../assets/logos/Logo_small_border_black_smaller_100px.png";

import "./NavTop.scss";

const NavTop = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const currentUserNav = useSelector(selectUserNav);
  const currentSearch = useSelector(selectCurrentSearch);

  const searchCategory = useSelector(selectSearchCategory);
  const searchTopic = useSelector(selectSearchTopic);
  const searchWords = useSelector(selectSearchWords);
  const searchOrder = useSelector(selectSearchOrder);
  const currentSearchPageNumber = useSelector(selectSearchPage);

  const [redirection, setRedirection] = useState(false);

  useEffect(() => {
    setRedirection(true);
    setRedirection(false);
  }, [searchWords, searchTopic, searchOrder, searchCategory]);

  const topicHandleClick = async (e) => {
    const topicName = e.target.name ? e.target.name : null;
    dispatch(setCurrentSearch("searchTopic", topicName));
    dispatch(setCurrentSearch("searchPage", 1));
    // dispatch(
    //   getCardAfterfilterAction({
    //     ...currentSearch,
    //     searchTopic: topicName,
    //     searchPage: 1,
    //   })
    // );
  };

  const redirectLink = SearchLinkRedirect();

  return (
    <>
      {redirection && <Redirect to={redirectLink} />}
      <div className="NavTop">
        <div className="NavTop__left">
          <div className="NavTop__swipeTuto">
            <img src={SwipeTutoSmallSmall} alt="" />
          </div>
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
          <div className=" NavTop__dropdown NavTop__dropdown--category">
            {topicArray &&
              topicArray.map((rubrique, index) => (
                <Link
                  key={index}
                  to={`/search?${searchWords ? `search=${searchWords}&` : ""}${
                    rubrique.queryName ? `topic=${rubrique.queryName}&` : ""
                  }${searchOrder ? `order=${searchOrder}&` : ""}${
                    searchCategory ? `category=${searchCategory}&` : ""
                  }${
                    currentSearchPageNumber
                      ? `page=${currentSearchPageNumber}`
                      : ""
                  }`}
                >
                  <img
                    onClick={(e) => topicHandleClick(e)}
                    src={rubrique.logo}
                    name={rubrique.queryName}
                    className="NavTop__dropdown--logo"
                    alt={rubrique.name}
                  />
                </Link>
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
          <div className="NavTop__userMenu">
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
    </>
  );
};

export default NavTop;
