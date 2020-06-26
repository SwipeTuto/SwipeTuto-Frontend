// Présent dans App.js

import React, { useState } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { ReactComponent as SearchLogo } from "../../../assets/images/search.svg";
import { ReactComponent as AccountLogo } from "../../../assets/images/person.svg";
import { ReactComponent as SettingsLogo } from "../../../assets/images/settings.svg";
import { ReactComponent as HelpLogo } from "../../../assets/images/help-circle.svg";
import { ReactComponent as LogOutLogo } from "../../../assets/images/log-out.svg";
import { ReactComponent as DropDownLogo } from "../../../assets/images/chevrons/chevron-down.svg";

import HTMLLogo from "../../../assets/images/tech_logo/HTML.png";
import CSSLogo from "../../../assets/images/tech_logo/CSS.png";
import JavascriptLogo from "../../../assets/images/tech_logo/javascript.png";
import SassLogo from "../../../assets/images/tech_logo/sass.png";
import PythonLogo from "../../../assets/images/tech_logo/python.png";
import PHPLogo from "../../../assets/images/tech_logo/PHP.png";
import ReactJSLogo from "../../../assets/images/tech_logo/reactJS.png";
import NodeJSLogo from "../../../assets/images/tech_logo/nodeJS.png";
import allLogo from "../../../assets/images/tech_logo/all_logo.png";
import newUserAvatar from "../../../assets/images/avatar_new_user.png";

import CustomButton from "../CustomButton/CustomButton";

import {
  getCardsAction,
  getCardsLoading,
} from "../../../redux/cards/cards-actions";
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import { logoutAction } from "../../../redux/user/user-actions";
import { toggleUserNav } from "../../../redux/layout/layout-actions";
import { selectUserNav } from "../../../redux/layout/layout-selectors";
import {
  searchAction,
  setType,
  getCardAfterfilterAction,
} from "../../../redux/filter/filter-actions";

import history from "../../../helper/history";
import "./NavTop.scss";
import { BASEMEDIA } from "../../../services/configService";
const NavTop = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const currentUserNav = useSelector(selectUserNav);
  const [searchInput, setSearchInput] = useState("");
  const [researchIsSubmitted, setResearchIsSubmitted] = useState(false);
  const category = useSelector((state) => state.filter.categoryFilter);

  const handleSubmit = (e) => {
    e.preventDefault();
    let searchCopy = searchInput;
    searchCopy = e.target.value;
    setSearchInput(searchCopy);
    setResearchIsSubmitted(true);
  };

  const handleFocus = (e) => {
    setSearchInput("");
    setResearchIsSubmitted(false);
  };

  const handleChange = (e) => {
    const searchText = e.target.value;
    setSearchInput(searchText);
  };

  const handleClick = (e) => {
    // dispatch(getCardsLoading());
    dispatch(searchAction(searchInput));
    dispatch(setType("search"));
  };

  const logoHandleClick = (e) => {
    dispatch(getCardAfterfilterAction(e.target.name));
    dispatch(setType("langage"));
  };

  const allLogoHandleClick = () => {
    dispatch(getCardsAction());
    console.log("all clic");
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

  // Ajouter changement : si utilisateur connecté afficher un accès au compte à la place des boutons connexion et inscription
  return (
    <>
      {researchIsSubmitted && <Redirect to="/cards" />}
      <div className="NavTop">
        <div className="NavTop__left">
          <NavLink exact className="NavTop__link" to="/">
            Accueil
          </NavLink>

          <NavLink
            className="NavTop__link NavTop__link--category"
            to="/cards"
            onClick={(e) => cardsClick(e)}
          >
            Catégories
            <DropDownLogo className="NavTop__link--logo" />
          </NavLink>
          <NavLink className="NavTop__link" to="/ressources">
            Ressources
          </NavLink>
          <div className=" NavTop__dropdown NavTop__dropdown--category">
            <Link to="/cards">
              <img
                src={allLogo}
                className="NavTop__dropdown--logo"
                alt="all"
                onClick={() => allLogoHandleClick()}
              />
            </Link>
            <Link to={`/search?langage=html&category=${category}`}>
              <img
                onClick={(e) => logoHandleClick(e)}
                src={HTMLLogo}
                name="html"
                className="NavTop__dropdown--logo"
                alt="HTML"
              />
            </Link>
            <Link to={`/search?langage=css&category=${category}`}>
              <img
                onClick={(e) => logoHandleClick(e)}
                name="css"
                src={CSSLogo}
                className="NavTop__dropdown--logo"
                alt="CSS"
              />
            </Link>
            <Link to={`/search?langage=javascript&category=${category}`}>
              <img
                onClick={(e) => logoHandleClick(e)}
                name="javascript"
                src={JavascriptLogo}
                className="NavTop__dropdown--logo"
                alt="Javascript"
              />
            </Link>
            <Link to={`/search?langage=reactjs&category=${category}`}>
              <img
                onClick={(e) => logoHandleClick(e)}
                name="reactjs"
                src={ReactJSLogo}
                className="NavTop__dropdown--logo"
                alt="React JS"
              />
            </Link>
            <Link to={`/search?langage=nodejs&category=${category}`}>
              <img
                onClick={(e) => logoHandleClick(e)}
                name="nodejs"
                src={NodeJSLogo}
                className="NavTop__dropdown--logo"
                alt="Node JS"
              />
            </Link>
            <Link to={`/search?langage=python&category=${category}`}>
              <img
                onClick={(e) => logoHandleClick(e)}
                name="python"
                src={PythonLogo}
                className="NavTop__dropdown--logo"
                alt="Python"
              />
            </Link>
            <Link to={`/search?langage=php&category=${category}`}>
              <img
                onClick={(e) => logoHandleClick(e)}
                name="php"
                src={PHPLogo}
                className="NavTop__dropdown--logo"
                alt="php"
              />
            </Link>
            <Link to={`/search?langage=sass&category=${category}`}>
              <img
                onClick={(e) => logoHandleClick(e)}
                name="sass"
                src={SassLogo}
                className="NavTop__dropdown--logo"
                alt="Sass"
              />
            </Link>
          </div>
        </div>
        <div className="NavTop__center">
          <form className="NavTop__search" onSubmit={handleSubmit}>
            <button
              type="submit"
              onClick={(e) => handleClick(e)}
              className="NavTop__button"
            >
              <SearchLogo className="NavTop__button--logo" />
            </button>
            <input
              className="NavTop__input"
              id="search"
              name="search"
              type="text"
              placeholder="Recherche..."
              onChange={handleChange}
              value={searchInput || ""}
              onFocus={handleFocus}
            />
          </form>
        </div>
        <div className="NavTop__right">
          {currentUser && currentUser.username ? (
            <>
              <div
                onClick={() => dispatch(toggleUserNav())}
                className="NavTop__avatar"
              >
                <img
                  className="NavTop__avatar--userAvatar"
                  src={
                    BASEMEDIA +
                      (currentUser.profile && currentUser.profile.avatar) ||
                    newUserAvatar
                  }
                  alt="user"
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

export default withRouter(NavTop);
