// Présent dans App.js

import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/navtop_logo.png";
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

import CustomButton from "../CustomButton/CustomButton";
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import { setCurrentUser } from "../../../redux/user/user-actions";
import { toggleUserNav } from "../../../redux/layout/layout-actions";
import { selectUserNav } from "../../../redux/layout/layout-selectors";
import {
  searchAction,
  setSearchType,
  setCurrentSearch,
} from "../../../redux/filter/filter-actions";
import { setCategoryFilter } from "../../../redux/filter/filter-actions";
import { getLangage } from "../../../redux/filter/filter-actions";

import "./NavTop.scss";
import { selectCurrentSearch } from "../../../redux/filter/filter-selectors";

const NavTop = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const currentUserNav = useSelector(selectUserNav);
  const [getLangages, setGetLangages] = useState("all");
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let searchCopy = searchInput;
    searchCopy = e.target.value;
    setSearchInput(searchCopy);
    props.history.push("/cards");
  };

  const handleChange = (e) => {
    const searchText = e.target.value;
    setSearchInput(searchText);
  };
  // ACTION POUR LE FILTRE
  const handleClick = (e) => {
    dispatch(searchAction(searchInput));
    dispatch(setCategoryFilter("search"));
    props.history.push("/cards");
  };
  const setPathname = (e) => {
    // e.preventDefault()
    dispatch(getLangage(e.target.name));
    dispatch(setCategoryFilter("langage"));
    dispatch(setSearchType("langage"));
    dispatch(setCurrentSearch(e.target.alt));
  };

  /**
   * IMPORTANT
   * setPathname me permet de répurer le params de URL(HTML,PHP etc)
   * searchAction me permet de filter par rapport à la bar de recherche
   *
   * Concernant les categories il y a 2 solutions
   * 1. récup les infos qui sont déjà fitrer par le langage ou search bar et filter ce résultat
   *  - problème: comment on fait pour charger plus de memo???
   * 2. le faire en back
   *  - problème: peut alourdire la back (mais l'api déjà préte)
   *
   * il faudrait réfléchir à une solution j'ai des propositions
   * 1. garder ta strucutre mais avoir un state(dans redux) pour chaque filtre (categorie, langage) et add ces filtres
   * 2. Pas de filtre en front. On laisse le back nous retourner les cartes. On ferait que les affichés
   * 3. charger un pull de 16 cartes, si dans les filtres il y a moins de 16 cartes on refait un appel à l'api les cartes retourner seront filtrer etc etc etc
   *
   */

  // Ajouter changement : si utilisateur connecté afficher un accès au compte à la place des boutons connexion et inscription
  return (
    <div className="NavTop">
      <div className="NavTop__left">
        <Link className="NavTop__link" to="/">
          Accueil
        </Link>
        <Link className="NavTop__link" to="/cards">
          Cartes
        </Link>
        <Link className="NavTop__link NavTop__link--category" to="/cards">
          Catégories
          <DropDownLogo className="NavTop__link--logo" />
        </Link>
        <Link className="NavTop__link" to="/ressources">
          Ressources
        </Link>
        <div className=" NavTop__dropdown NavTop__dropdown--category">
          <Link to="/cards/html">
            <img src={HTMLLogo} className="NavTop__dropdown--logo" alt="HTML" />
          </Link>
          <Link to="/cards/css">
            <img
              onClick={(e) => setPathname(e)}
              name="css"
              src={CSSLogo}
              className="NavTop__dropdown--logo"
              alt="CSS"
            />
          </Link>
          <Link to="/cards/javascript">
            <img
              onClick={(e) => setPathname(e)}
              name="javascript"
              src={JavascriptLogo}
              className="NavTop__dropdown--logo"
              alt="Javascript"
            />
          </Link>
          <Link to="/cards/react">
            <img
              onClick={(e) => setPathname(e)}
              name="reactjs"
              src={ReactJSLogo}
              className="NavTop__dropdown--logo"
              alt="React JS"
            />
          </Link>
          <Link to="/cards/nodeJs">
            <img
              onClick={(e) => setPathname(e)}
              name="nodejs"
              src={NodeJSLogo}
              className="NavTop__dropdown--logo"
              alt="Node JS"
            />
          </Link>
          <Link to="/cards/python">
            <img
              onClick={(e) => setPathname(e)}
              name="python"
              src={PythonLogo}
              className="NavTop__dropdown--logo"
              alt="Python"
            />
          </Link>
          <Link to="/cards/php">
            <img
              onClick={(e) => setPathname(e)}
              name="php"
              src={PHPLogo}
              className="NavTop__dropdown--logo"
              alt="PHP"
            />
          </Link>
          <Link to="/cards/sass">
            <img
              onClick={(e) => setPathname(e)}
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
            value={searchInput}
          />
        </form>
      </div>
      <div className="NavTop__right">
        {currentUser && currentUser.avatar ? (
          <>
            <div
              onClick={() => dispatch(toggleUserNav())}
              className="NavTop__avatar"
            >
              <img
                className="NavTop__avatar--userAvatar"
                src={currentUser.avatar}
                alt="user avatar"
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
          <Link className="NavTop__userMenu--link" to="/">
            <AccountLogo className="NavTop__userMenu--logo" />
            Compte
          </Link>
          <Link className="NavTop__userMenu--link" to="/">
            <SettingsLogo className="NavTop__userMenu--logo" />
            Paramètres
          </Link>
          <Link className="NavTop__userMenu--link" to="/">
            <HelpLogo className="NavTop__userMenu--logo" />
            Aide
          </Link>
          <Link className="NavTop__userMenu--link" to="/">
            <LogOutLogo className="NavTop__userMenu--logo" />
            Deconnexion
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default withRouter(NavTop);
