// Présent dans App.js

import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
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

import { ReactComponent as CloseLogo } from "../../../assets/images/close-circle.svg";
// import newUserAvatar from "../../../assets/images/avatar_new_user.png";

import CustomButton from "../CustomButton/CustomButton";
import UserAvatar from "../../UserComponents/UserAvatar/UserAvatar";

import { getCardsAction } from "../../../redux/cards/cards-actions";
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import {
  selectSearchCategory,
  selectSearchLangage,
  selectSearchWords,
  selectSearchOrder,
  selectCurrentCardsGridPage,
} from "../../../redux/filter/filter-selectors";
import { logoutAction } from "../../../redux/user/user-actions";
import { toggleUserNav } from "../../../redux/layout/layout-actions";
import { selectUserNav } from "../../../redux/layout/layout-selectors";
import {
  searchAction,
  getCardAfterfilterAction,
  setCurrentSearch,
} from "../../../redux/filter/filter-actions";

import history from "../../../helper/history";
import "./NavTop.scss";
import { BASEMEDIA } from "../../../services/configService";

const NavTop = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const currentUserNav = useSelector(selectUserNav);
  const searchLangage = useSelector(selectSearchLangage);
  const searchCategory = useSelector(selectSearchCategory);
  const searchWords = useSelector(selectSearchWords);
  const searchOrder = useSelector(selectSearchOrder);
  const currentSearchPageNumber = useSelector(selectCurrentCardsGridPage);
  const [searchInput, setSearchInput] = useState("");
  const [redirection, setRedirection] = useState(false);
  const category = useSelector(selectSearchCategory);
  // const [userObject, setUserObject] = useState();

  useEffect(() => {
    if (searchWords === null) {
      setSearchInput("");
    }
    setRedirection(false);
  }, [searchWords]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setCurrentSearch("searchWords", searchInput));
    dispatch(searchAction(searchInput));
    setRedirection(true);
  };

  const handleChange = (e) => {
    const searchText = e.target.value;
    setSearchInput(searchText);
  };

  const handleSearchDelete = () => {
    setSearchInput("");
  };

  const logoHandleClick = (e) => {
    dispatch(getCardAfterfilterAction(e.target.name, searchCategory));
  };

  // const allLogoHandleClick = () => {
  //   dispatch(getCardsAction());
  // };

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

  const rubriquesArray = [
    {
      queryName: null,
      name: "all",
      logo: allLogo,
    },
    {
      queryName: "html",
      name: "HTML",
      logo: HTMLLogo,
    },
    {
      queryName: "css",
      name: "CSS",
      logo: CSSLogo,
    },
    {
      queryName: "javascript",
      name: "Javascript",
      logo: JavascriptLogo,
    },
    {
      queryName: "reactjs",
      name: "React JS",
      logo: ReactJSLogo,
    },
    {
      queryName: "nodejs",
      name: "Node JS",
      logo: NodeJSLogo,
    },
    {
      queryName: "python",
      name: "Python",
      logo: PythonLogo,
    },
    {
      queryName: "php",
      name: "PHP",
      logo: PHPLogo,
    },
    {
      queryName: "sass",
      name: "Sass",
      logo: SassLogo,
    },
  ];

  // Ajouter changement : si utilisateur connecté afficher un accès au compte à la place des boutons connexion et inscription
  return (
    <>
      {redirection && (
        <Redirect
          to={`/search?${searchWords ? `search=${searchWords}&` : ""}${
            searchLangage ? `langage=${searchLangage}&` : ""
          }${searchOrder ? `order=${searchOrder}&` : ""}${
            searchCategory ? `category=${searchCategory}&` : ""
          }${currentSearchPageNumber ? `page=${currentSearchPageNumber}` : ""}`}
        />
      )}
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
            to={`/search?${searchWords && `search=${searchWords}&`}${
              searchLangage && `langage=${searchLangage}&`
            }${searchOrder && `order=${searchOrder}&`}${
              searchCategory && `category=${searchCategory}&`
            }${currentSearchPageNumber && `page=${currentSearchPageNumber}`}`}
            onClick={(e) => cardsClick(e)}
          >
            Langages
            <DropDownLogo className="NavTop__link--logo" />
          </NavLink>
          <div className=" NavTop__dropdown NavTop__dropdown--category">
            {rubriquesArray &&
              rubriquesArray.map((rubrique, index) => (
                <Link
                  key={index}
                  to={`/search?${searchWords ? `search=${searchWords}&` : ""}${
                    rubrique.queryName ? `langage=${rubrique.queryName}&` : ""
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
          <form className="NavTop__search" onSubmit={handleSubmit}>
            <button type="submit" className="NavTop__button">
              <SearchLogo className="NavTop__button--logo" />
            </button>
            <div className="NavTop__input--container">
              <input
                className="NavTop__input"
                id="search"
                name="search"
                type="text"
                placeholder="Recherche..."
                onChange={handleChange}
                value={searchInput || ""}
              />
              {searchInput && (
                <div
                  className="NavTop__delete"
                  onClick={() => handleSearchDelete()}
                >
                  <CloseLogo
                    className="NavTop__delete--logo"
                    pointerEvents="none"
                  />
                </div>
              )}
            </div>
          </form>
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
