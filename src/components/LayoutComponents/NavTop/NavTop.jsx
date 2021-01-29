// Présent dans App.js

import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";

// redux
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import { selectCurrentSearch } from "../../../redux/filter/filter-selectors";
import { logoutAction } from "../../../redux/user/user-actions";

import { selectTheme } from "../../../redux/layout/layout-selectors";
import { deleteCurrentSearch, getCardAfterfilterAction, setCardsFetchedInStore, setCurrentSearch } from "../../../redux/filter/filter-actions";

// helper
import { getCategoriesArray, initialSearchState, topicArray } from "../../../helper/index";

// components
import CustomButton from "../CustomButton/CustomButton";
import SearchForm from "../SearchForm/SearchForm";
import UserUsername from "../../UserComponents/UserAvatar/UserUsername";

// assets
import { ReactComponent as AccountLogo } from "../../../assets/images/person.svg";
import { ReactComponent as SettingsLogo } from "../../../assets/images/settings.svg";
import { ReactComponent as HelpLogo } from "../../../assets/images/help-circle.svg";
import { ReactComponent as LogOutLogo } from "../../../assets/images/log-out.svg";
import { ReactComponent as DropDownLogo } from "../../../assets/images/chevron-down.svg";
import { ReactComponent as BookmarkLogo } from "../../../assets/images/bookmark.svg";
import { ReactComponent as AddLogo } from "../../../assets/images/add.svg";
import { ReactComponent as DropdownFullLogo } from "../../../assets/images/caret-down.svg";
import { ReactComponent as PencilLogo } from "../../../assets/images/pencil.svg";
import STSmallLogoBlackmod from "../../../assets/stlogos/logo seul blackmode.png";
import STSmallLogo from "../../../assets/stlogos/logo seul.png";

import "./NavTop.scss";
import UserNameAndAvatar from "../../UserComponents/UserAvatar/UserNameAndAvatar";
import ToggleButton from "../ToggleTheme/ToggleTheme";
import { useDarkMode } from "../../../hooks/useDarkMode";

const NavTop = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const currentTheme = useSelector(selectTheme);
  const currentSearch = useSelector(selectCurrentSearch);
  const dropdown = useRef();
  const dropdownBtn = useRef();
  const [navDropdownOpen, setNavDropdownOpen] = useState(false);

  const topicHandleClick = async (topicQueryName) => {
    dispatch(setCardsFetchedInStore(null));
    const currentSearchCopy = {
      ...currentSearch,
      searchTopic: topicQueryName,
      searchCategory: null,
    };
    dispatch(setCurrentSearch(currentSearchCopy));
  };

  const categoryHandleClick = async (topicQueryName, categoryQueryName) => {
    dispatch(setCardsFetchedInStore(null));

    const currentSearchCopy = {
      ...currentSearch,
      searchTopic: topicQueryName,
      searchCategory: categoryQueryName,
    };
    dispatch(setCurrentSearch(currentSearchCopy));
  };

  const checkClickInside = (event) => {
    const isClickInside = dropdown.current && dropdown.current.contains(event.target);
    const isClickOnBtn = dropdownBtn.current && dropdownBtn.current.contains(event.target);

    if (!isClickInside && !isClickOnBtn && navDropdownOpen) {
      setNavDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", checkClickInside);
    return () => {
      document.removeEventListener("click", checkClickInside);
    };
  });

  const [theme, setTheme] = useDarkMode();
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className={`NavTop ${currentTheme}-theme-m`}>
      <div className="NavTop__left">
        <Link to="/" className="NavTop__swipeTuto">
          <img
            className="NavTop__swipeTuto--image"
            src={currentTheme === "light" ? STSmallLogo : STSmallLogoBlackmod}
            alt=""
            onClick={() => {
              dispatch(setCurrentSearch(initialSearchState));
              dispatch(getCardAfterfilterAction(initialSearchState));
            }}
          />
        </Link>
        {!currentUser ? (
          <NavLink exact className="NavTop__link" to="/">
            Accueil
          </NavLink>
        ) : (
          <>
            <NavLink exact className="NavTop__link" to="/">
              Accueil
            </NavLink>

            <div className="NavTop__link NavTop__link--category">
              <NavLink
                exact
                className="NavTop__link"
                to="/search"
                onClick={() => {
                  dispatch(deleteCurrentSearch());
                  dispatch(getCardAfterfilterAction(initialSearchState));
                }}
              >
                Explorer
              </NavLink>
              <DropDownLogo className="NavTop__link--logo" />
            </div>
            <div className={`NavTop__dropdown NavTop__dropdown--category ${currentTheme}-theme-l`}>
              {topicArray &&
                topicArray.map((topic, index) => (
                  <div className="NavTop__topicList" key={`topic${topic.name}${index}`}>
                    <Link
                      key={`topicList${index}`}
                      to="/search"
                      onClick={() => topicHandleClick(topic.queryName)}
                      name={topic.queryName}
                      className={`${topic.queryName}-item`}
                    >
                      <span className="NavTop__topicList--topic">{topic.name}</span>
                    </Link>
                    {getCategoriesArray(topic.queryName).map((category, index) => (
                      <Link
                        key={`category${index}${category.name}`}
                        to="/search"
                        onClick={() => categoryHandleClick(topic.queryName, category.queryName)}
                        name={category.queryName}
                        className={`${topic.queryName}-item`}
                      >
                        <span className="NavTop__topicList--category">{category.name}</span>
                      </Link>
                    ))}
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
      <div className="NavTop__center">{currentUser && <SearchForm />}</div>
      <div className="NavTop__right">
        {currentUser ? (
          <>
            <div className="NavTop__avatar">
              <UserNameAndAvatar user={currentUser} link={true} changeLink="/account/user" themed={true} />
            </div>
            <div
              className="NavTop__addcard"
              onClick={() => {
                window.localStorage.removeItem("draftNewCard");
              }}
            >
              <Link to="/account/add" className={`NavTop__roundBtn ${currentTheme}-theme-l`}>
                <AddLogo />
              </Link>
            </div>
            <div
              className={`NavTop__dropdownUserMenu NavTop__roundBtn ${currentTheme}-theme-l`}
              ref={dropdownBtn}
              onClick={() => {
                if (navDropdownOpen) {
                  setNavDropdownOpen(false);
                } else {
                  setNavDropdownOpen(true);
                }
              }}
            >
              <DropdownFullLogo />
            </div>
          </>
        ) : (
          <Link className="NavTop__linkConnexion" to="/connexion/login">
            <CustomButton color="dark">Connexion</CustomButton>
          </Link>
        )}
      </div>
      {navDropdownOpen ? (
        <div className={`NavTop__userMenu ${currentTheme}-theme-l`} ref={dropdown}>
          <div className="NavTop__userMenu--meta">
            <UserUsername user={currentUser} link={true} />
            <p className="NavTop__userMenu--text">{currentUser.email}</p>
            <ToggleButton toggleTheme={toggleTheme} theme={theme} />
          </div>
          <div className="NavTop__userMenu--links">
            <Link className="NavTop__userMenu--link" to="/account/user" onClick={() => setNavDropdownOpen(false)}>
              <AccountLogo className="NavTop__userMenu--logo" />
              Compte
            </Link>

            <Link className="NavTop__userMenu--link" to="/account/saved" onClick={() => setNavDropdownOpen(false)}>
              <BookmarkLogo className="NavTop__userMenu--logo" />
              Sauvegardés
            </Link>
            <Link className="NavTop__userMenu--link" to="/account/drafts" onClick={() => setNavDropdownOpen(false)}>
              <PencilLogo className="NavTop__userMenu--logo" />
              Brouillons
            </Link>
            <Link className="NavTop__userMenu--link" to="/account/settings" onClick={() => setNavDropdownOpen(false)}>
              <SettingsLogo className="NavTop__userMenu--logo" />
              Paramètres
            </Link>
            <Link className="NavTop__userMenu--link" to="/help" onClick={() => setNavDropdownOpen(false)}>
              <HelpLogo className="NavTop__userMenu--logo" />
              Aide
            </Link>

            <Link
              onClick={() => {
                dispatch(logoutAction());
                setNavDropdownOpen(false);
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

export default React.memo(NavTop);
