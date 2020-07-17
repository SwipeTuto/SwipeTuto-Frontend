// Présent dans App.js

import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { initialSearchState } from "../../../helper/index";
import { ReactComponent as AccountLogo } from "../../../assets/images/person.svg";
import { ReactComponent as SettingsLogo } from "../../../assets/images/settings.svg";
import { ReactComponent as HelpLogo } from "../../../assets/images/help-circle.svg";
import { ReactComponent as LogOutLogo } from "../../../assets/images/log-out.svg";
import { ReactComponent as DropDownLogo } from "../../../assets/images/chevrons/chevron-down.svg";
import SwipeTutoSmallLogo from "../../../assets/logos/logo-small-reduced.png";
import SwipeTutoSmallFull from "../../../assets/logos/logo-full-reduced.png";

import { topicArray } from "../../../helper/index";

import CustomButton from "../CustomButton/CustomButton";
import UserAvatar from "../../UserComponents/UserAvatar/UserAvatar";

import { getCardsAction } from "../../../redux/cards/cards-actions";
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
import SearchLinkRedirect from "../../../helper/SearchLinkRedirect";
import SearchForm from "../SearchForm/SearchForm";

import "./NavTop.scss";

const NavTop = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const currentUserNav = useSelector(selectUserNav);
  const currentSearch = useSelector(selectCurrentSearch);

  const search = useSelector(selectCurrentSearch);
  const searchCategory = useSelector(selectSearchCategory);
  const searchTopic = useSelector(selectSearchTopic);
  const searchWords = useSelector(selectSearchWords);
  const searchOrder = useSelector(selectSearchOrder);
  const currentSearchPageNumber = useSelector(selectSearchPage);

  const [redirection, setRedirection] = useState(false);
  const [newTopic, setNewTopic] = useState("");

  useEffect(() => {
    setRedirection(true);
    setRedirection(false);
  }, [searchWords, search, searchTopic, searchOrder, searchCategory]);

  const topicHandleClick = async (e) => {
    // dispatch(getCardAfterfilterAction(e.target.name, searchCategory, search));
    dispatch(setCurrentSearch("searchTopic", e.target.name));
    dispatch(setCurrentSearch("searchPage", 1));
    dispatch(
      getCardAfterfilterAction({
        ...currentSearch,
        searchTopic: e.target.name,
        searchPage: 1,
      })
    );
  };

  const cardsClick = (e) => {
    dispatch(deleteCurrentSearch());
    dispatch(getCardAfterfilterAction(initialSearchState));
  };

  const redirectLink = SearchLinkRedirect();

  return (
    <>
      {redirection && <Redirect to={redirectLink} />}
      <div className="NavTop">
        <div className="NavTop__left">
          <div className="NavTop__swipeTuto">
            <img src={SwipeTutoSmallLogo} alt="" />
            {/* <img src={SwipeTutoSmallFull} alt="" /> */}
          </div>
          <NavLink exact className="NavTop__link" to="/">
            Accueil
          </NavLink>

          <NavLink className="NavTop__link" to="/ressources">
            Ressources
          </NavLink>
          <NavLink
            className="NavTop__link NavTop__link--category"
            to="/search"
            onClick={(e) => cardsClick(e)}
          >
            Langages
            <DropDownLogo className="NavTop__link--logo" />
          </NavLink>
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
                <UserAvatar
                  userImage={
                    currentUser &&
                    currentUser.profile &&
                    currentUser.profile.avatar &&
                    currentUser.profile.avatar
                  }
                  userFirstName={
                    currentUser &&
                    currentUser.first_name &&
                    currentUser.first_name
                  }
                  userLastName={
                    currentUser &&
                    currentUser.last_name &&
                    currentUser.last_name
                  }
                />
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
              <p className="NavTop__userMenu--text">{currentUser.username}</p>
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
