// Présent dans App.js

import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { ReactComponent as AccountLogo } from "../../../assets/images/person.svg";
import { ReactComponent as SettingsLogo } from "../../../assets/images/settings.svg";
import { ReactComponent as HelpLogo } from "../../../assets/images/help-circle.svg";
import { ReactComponent as LogOutLogo } from "../../../assets/images/log-out.svg";
import { ReactComponent as DropDownLogo } from "../../../assets/images/chevrons/chevron-down.svg";

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
} from "../../../redux/filter/filter-selectors";
import { logoutAction } from "../../../redux/user/user-actions";
import { toggleUserNav } from "../../../redux/layout/layout-actions";
import { selectUserNav } from "../../../redux/layout/layout-selectors";
import { getCardAfterfilterAction } from "../../../redux/filter/filter-actions";
import SearchLinkRedirect from "../../../helper/SearchLinkRedirect";
import SearchForm from "../SearchForm/SearchForm";

import "./NavTop.scss";

const NavTop = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const currentUserNav = useSelector(selectUserNav);

  const searchCategory = useSelector(selectSearchCategory);
  const searchWords = useSelector(selectSearchWords);
  const searchOrder = useSelector(selectSearchOrder);
  const currentSearchPageNumber = useSelector(selectSearchPage);
  const [redirection, setRedirection] = useState(false);

  useEffect(() => {
    setRedirection(true);
    setRedirection(false);
  }, [searchWords]);

  const logoHandleClick = (e) => {
    dispatch(getCardAfterfilterAction(e.target.name, searchCategory));
  };

  const cardsClick = (e) => {
    const allFiltersItems = [
      ...document.querySelectorAll("button.FiltersBar__options--item"),
    ];

    allFiltersItems.map((item) => {
      item.classList.remove("active");
      return item.dataset.filter === "all" && item.classList.add("active");
    });

    dispatch(getCardsAction());
  };

  const redirectLink = SearchLinkRedirect();

  return (
    <>
      {redirection && <Redirect to={redirectLink} />}
      <div className="NavTop">
        <div className="NavTop__left">
          <NavLink exact className="NavTop__link" to="/">
            Accueil
          </NavLink>

          <NavLink className="NavTop__link" to="/ressources">
            Ressources
          </NavLink>
          <NavLink
            className="NavTop__link NavTop__link--category"
            to={redirectLink}
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
                    onClick={(e) => logoHandleClick(e)}
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
                    currentUser.profile.avatar && currentUser.profile.avatar
                  }
                  userFirstName={
                    currentUser.first_name && currentUser.first_name
                  }
                  userLastName={currentUser.last_name && currentUser.last_name}
                />
              </div>
            </>
          ) : (
            <Link className="NavTop__linkConnexion" to="/login">
              <CustomButton color="dark">Connexion / Inscription</CustomButton>
            </Link>
          )}
        </div>
        {currentUserNav ? (
          <div className="NavTop__userMenu">
            <p className="NavTop__userMenu--text">Bonjour</p>
            <p className="NavTop__userMenu--text">{currentUser.username}</p>
            <p className="NavTop__userMenu--text">{currentUser.email}</p>
            <span className="horizontal-separation-primary-light"></span>
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
        ) : null}
      </div>
    </>
  );
};

export default NavTop;
