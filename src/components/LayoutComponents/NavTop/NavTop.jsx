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
import { toggleUserNav } from "../../../redux/layout/layout-actions";
import { selectUserNav } from "../../../redux/layout/layout-selectors";
import {searchAction,setType} from "../../../redux/filter/filter-actions";
import { setSelectionType, getCardAfterfilterAction } from "../../../redux/filter/filter-actions";


import "./NavTop.scss";



const NavTop = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const currentUserNav = useSelector(selectUserNav);
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
 
  const handleClick = (e) => {
    dispatch(searchAction(searchInput));
    dispatch(setSelectionType("search"));
    props.history.push("/cards");
  };
  
  const logoHandleClick = (e) => {
    dispatch(getCardAfterfilterAction(e.target.name))
    dispatch(setType("langage"));
  };

  // Ajouter changement : si utilisateur connecté afficher un accès au compte à la place des boutons connexion et inscription
  return (
    <div className="NavTop">
      <div className="NavTop__left">
        <Link className="NavTop__link" to="/">
          Accueil
        </Link>
        <Link className="NavTop__link" to="/cards" onClick={() => dispatch(setType("all"))}>
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
          <Link to="/cards/css/">
            <img
              onClick={(e) => logoHandleClick(e)}
              name="css"
              src={CSSLogo}
              className="NavTop__dropdown--logo"
              alt="CSS"
            />
          </Link>
          <Link to="/cards/javascript/">
            <img
              onClick={(e) => logoHandleClick(e)}
              name="javascript"
              src={JavascriptLogo}
              className="NavTop__dropdown--logo"
              alt="Javascript"
            />
          </Link>
          <Link to="/cards/react/">
            <img
              onClick={(e) => logoHandleClick(e)}
              name="reactjs"
              src={ReactJSLogo}
              className="NavTop__dropdown--logo"
              alt="React JS"
            />
          </Link>
          <Link to="/cards/nodeJs/">
            <img
              onClick={(e) => logoHandleClick(e)}
              name="nodejs"
              src={NodeJSLogo}
              className="NavTop__dropdown--logo"
              alt="Node JS"
            />
          </Link>
          <Link to="/cards/python/">
            <img
              onClick={(e) => logoHandleClick(e)}
              name="python"
              src={PythonLogo}
              className="NavTop__dropdown--logo"
              alt="Python"
            />
          </Link>
          <Link to="/cards/php">
            <img
              onClick={(e) => logoHandleClick(e)}
              name="php"
              src={PHPLogo}
              className="NavTop__dropdown--logo"
              alt="php"
            />
          </Link>
          <Link to="/cards/sass/">
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
