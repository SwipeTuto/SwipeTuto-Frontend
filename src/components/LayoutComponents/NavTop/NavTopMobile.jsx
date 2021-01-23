import React, { useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// redux
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import { setCurrentSearch } from "../../../redux/filter/filter-actions";
import {
  selectMobileNavOpen,
  selectFilterMobileMenuOpen,
  selectTheme,
} from "../../../redux/layout/layout-selectors";
import {
  openMobileNav,
  closeMobileNav,
  openFilterMobileMenu,
  setLoaded,
} from "../../../redux/layout/layout-actions";
import { logoutAction } from "../../../redux/user/user-actions";
import { selectCurrentSearch } from "../../../redux/filter/filter-selectors";

// components
import CustomButton from "../CustomButton/CustomButton";
import FiltersBarMobile from "../FiltersBar/FiltersBarMobile";
import UserAvatar from "../../UserComponents/UserAvatar/UserAvatar";
import UserUsername from "../../UserComponents/UserAvatar/UserUsername";

// assets
import { ReactComponent as CloseLogo } from "../../../assets/images/close.svg";
import { ReactComponent as MenuLogo } from "../../../assets/images/menu.svg";
import { ReactComponent as AccountLogo } from "../../../assets/images/person.svg";
import { ReactComponent as SettingsLogo } from "../../../assets/images/settings.svg";
import { ReactComponent as SearchLogo } from "../../../assets/images/search.svg";
import { ReactComponent as HelpLogo } from "../../../assets/images/help-circle.svg";
import { ReactComponent as LogOutLogo } from "../../../assets/images/log-out.svg";
import { ReactComponent as BookmarkLogo } from "../../../assets/images/bookmark.svg";
import SwipeTutoSmallLogo from "../../../assets/logos/Logo_small_border_black_smaller_100px.png";
import SwipeTutoSmallFull from "../../../assets/logos/Logo full border black smaller_350px.png";

import "./NavTopMobile.scss";
import { useDarkMode } from "../../../hooks/useDarkMode";
import ToggleButton from "../ToggleTheme/ToggleTheme";
import { initialSearchState } from "../../../helper";

const NavTopMobile = (props) => {
  const dispatch = useDispatch();
  const filtersBarMobile = useSelector(selectFilterMobileMenuOpen);
  const currentTheme = useSelector(selectTheme);
  const currentUser = useSelector(selectCurrentUser);
  const mobileNavOpen = useSelector(selectMobileNavOpen);
  // const searchWords = useSelector(selectSearchWords);
  const currentSearch = useSelector(selectCurrentSearch);
  const {
    searchWords,
    searchTopic,
    searchCategory,
    searchOrder,
  } = currentSearch;

  useEffect(() => {
    const NavTopMobileMenu = document.querySelector(".NavTopMobile");
    if (NavTopMobileMenu && NavTopMobileMenu.scroll) {
      NavTopMobileMenu.scroll(0, 0);
      dispatch(setLoaded());
    }
  }, [dispatch]);

  // scroll reset
  useEffect(() => {
    const navMenu = document.querySelector(".NavTopMobile__open");
    navMenu.scroll(0, 0);
  }, [mobileNavOpen]);

  const handleNavClose = () => {
    dispatch(closeMobileNav());
  };
  const handleNavOpen = () => {
    dispatch(openMobileNav());
  };

  const handleFiltersMobileOpen = () => {
    dispatch(openFilterMobileMenu());
  };

  const [theme, setTheme] = useDarkMode();
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div
      className={`NavTopMobile ${
        mobileNavOpen ? "active" : ""
      } ${currentTheme}-theme`}
    >
      {filtersBarMobile && (
        <FiltersBarMobile title="Recherche" showResults={false} />
      )}

      <div className="NavTopMobile__top">
        {mobileNavOpen ? (
          <CloseLogo
            className="NavTopMobile__toggle"
            onClick={(e) => {
              e.stopPropagation();
              handleNavClose();
            }}
          />
        ) : (
          <MenuLogo
            className="NavTopMobile__toggle"
            onClick={(e) => {
              e.stopPropagation();
              handleNavOpen();
            }}
          />
        )}
        <Link
          className="NavTopMobile__swipeTuto"
          to="/"
          onClick={() => handleNavClose()}
        >
          <img src={SwipeTutoSmallLogo} alt="" />
        </Link>
        <Link to="/search">
          <CustomButton color="white" onClick={handleFiltersMobileOpen}>
            <SearchLogo />
            Recherche
          </CustomButton>
        </Link>
      </div>
      <div className={`NavTopMobile__open ${mobileNavOpen ? "active" : ""}`}>
        <div className="NavTopMobile__swipeTuto-menu">
          <img src={SwipeTutoSmallFull} alt="swipetuto" />
        </div>
        <div className="NavTopMobile__menu">
          <Link
            className="NavTopMobile__link"
            onClick={() => {
              dispatch(closeMobileNav());
            }}
            to="/"
          >
            Accueil
          </Link>
          <Link
            className="NavTopMobile__link"
            to="/ressources"
            onClick={() => {
              dispatch(closeMobileNav());
            }}
          >
            Ressources
          </Link>
          <Link
            className="NavTopMobile__link"
            to={`/search?${searchWords ? `search=${searchWords}` : ""}${
              searchTopic ? `&topic=${searchTopic}` : ""
            }${searchOrder ? `&order=${searchOrder}` : ""}${
              searchCategory ? `&category=${searchCategory}` : ""
            }`}
            onClick={() => {
              dispatch(setCurrentSearch(initialSearchState));
              dispatch(closeMobileNav());
            }}
          >
            Cartes
          </Link>

          <p className="NavTopMobile__link" onClick={handleFiltersMobileOpen}>
            <SearchLogo className="NavTopMobile__logo" />
            Recherche
          </p>
        </div>
        {currentUser ? (
          <div className="NavTopMobile__user">
            <div className="NavTopMobile__user--infos">
              <UserAvatar user={currentUser} link={false} />
              <div className="NavTopMobile__user--meta">
                <UserUsername user={currentUser} link={true} />
                <p className="NavTopMobile__user--text">{currentUser.email}</p>
              </div>
            </div>
            <div className="NavTopMobile__userMenu">
              <Link
                className="NavTopMobile__userMenu--link"
                to="/account/user"
                onClick={() => handleNavClose()}
              >
                <AccountLogo className="NavTopMobile__logo" />
                Compte
              </Link>
              <Link
                className="NavTopMobile__userMenu--link"
                to="/account/settings"
                onClick={() => handleNavClose()}
              >
                <SettingsLogo className="NavTopMobile__logo" />
                Paramètres
              </Link>
              <Link
                className="NavTopMobile__userMenu--link"
                to="/help"
                onClick={() => handleNavClose()}
              >
                <HelpLogo className="NavTopMobile__logo" />
                Aide
              </Link>
              <Link
                className="NavTopMobile__userMenu--link"
                to="/account/saved"
                onClick={() => handleNavClose()}
              >
                <BookmarkLogo className="NavTopMobile__logo" />
                Sauvegardés
              </Link>
              <Link
                className="NavTopMobile__userMenu--link"
                to="/"
                onClick={() => {
                  handleNavClose();
                  dispatch(logoutAction());
                }}
              >
                <LogOutLogo className="NavTopMobile__logo" />
                Deconnexion
              </Link>
            </div>
          </div>
        ) : (
          <Link
            className="NavTopMobile__linkConnexion"
            to="/connexion/login"
            onClick={() => handleNavClose()}
          >
            <CustomButton color="dark">Connexion / Inscription</CustomButton>
          </Link>
        )}
        <ToggleButton toggleTheme={toggleTheme} theme={theme} />
      </div>
    </div>
  );
};

export default withRouter(NavTopMobile);
