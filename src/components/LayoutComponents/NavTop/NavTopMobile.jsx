import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCardAfterfilterAction,
  setCurrentSearch,
  deleteCurrentSearch,
} from "../../../redux/filter/filter-actions";
import {
  selectMobileNavOpen,
  selectFilterMobileMenuOpen,
} from "../../../redux/layout/layout-selectors";
import {
  openMobileNav,
  closeMobileNav,
  openFilterMobileMenu,
} from "../../../redux/layout/layout-actions";
import { topicArray, initialSearchState } from "../../../helper/index";
import SearchLinkRedirect from "../../../helper/SearchLinkRedirect";

import { logoutAction } from "../../../redux/user/user-actions";

import { ReactComponent as DropDownLogo } from "../../../assets/images/chevrons/chevron-down.svg";
import { ReactComponent as CloseLogo } from "../../../assets/images/close.svg";
import { ReactComponent as MenuLogo } from "../../../assets/images/menu.svg";
import { ReactComponent as AccountLogo } from "../../../assets/images/person.svg";
import { ReactComponent as SettingsLogo } from "../../../assets/images/settings.svg";
import { ReactComponent as SearchLogo } from "../../../assets/images/search.svg";
import { ReactComponent as HelpLogo } from "../../../assets/images/help-circle.svg";
import { ReactComponent as LogOutLogo } from "../../../assets/images/log-out.svg";
import FiltersBarMobile from "../FiltersBar/FiltersBarMobile";
// import newUserAvatar from "../../../assets/images/avatar_new_user.png";
import UserAvatar from "../../UserComponents/UserAvatar/UserAvatar";
import SearchForm from "../SearchForm/SearchForm";

import SwipeTutoSmallLogo from "../../../assets/logos/logo-small-reduced.png";
import SwipeTutoSmallFull from "../../../assets/logos/logo-full-reduced.png";

import "./NavTopMobile.scss";
import {
  selectSearchCategory,
  selectSearchWords,
  selectSearchOrder,
  selectSearchPage,
  selectCurrentSearch,
} from "../../../redux/filter/filter-selectors";

const NavTopMobile = (props) => {
  const [redirection, setRedirection] = useState(false);
  const dispatch = useDispatch();
  const filtersBarMobile = useSelector(selectFilterMobileMenuOpen);
  const [cardsDropdownOpen, setCardsDropdownOpen] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const currentSearch = useSelector(selectCurrentSearch);
  const mobileNavOpen = useSelector(selectMobileNavOpen);
  const searchCategory = useSelector(selectSearchCategory);
  const searchWords = useSelector(selectSearchWords);
  const searchOrder = useSelector(selectSearchOrder);
  const currentSearchPageNumber = useSelector(selectSearchPage);

  // Reset du scroll
  useEffect(() => {
    const NavTopMobileMenu = document.querySelector(".NavTopMobile");

    if (NavTopMobileMenu && NavTopMobileMenu.scroll) {
      NavTopMobileMenu.scroll(0, 0);
    }
    setRedirection(true);
    setRedirection(false);
    setCardsDropdownOpen(false);
  }, [mobileNavOpen, searchWords]);

  // scroll reset
  useEffect(() => {
    const navMenu = document.querySelector(".NavTopMobile__open");
    navMenu.scroll(0, 0);
  }, [mobileNavOpen]);

  const handleNavClose = () => {
    dispatch(closeMobileNav());
    setCardsDropdownOpen(false);
  };
  const handleNavOpen = () => {
    dispatch(openMobileNav());
  };

  const handleClick = (e) => {
    setCardsDropdownOpen(false);
    dispatch(closeMobileNav());
    setRedirection(true);
  };

  const topicHandleClick = (e) => {
    dispatch(setCurrentSearch("searchTopic", e.target.dataset.name));
    dispatch(setCurrentSearch("searchPage", 1));
    dispatch(
      getCardAfterfilterAction({
        ...currentSearch,
        searchTopic: e.target.dataset.name,
        searchPage: 1,
      })
    );

    setCardsDropdownOpen(false);
    dispatch(closeMobileNav());
  };

  const handleFiltersMobileOpen = () => {
    dispatch(openFilterMobileMenu());
  };

  const redirectLink = SearchLinkRedirect();

  return (
    <>
      {redirection && <Redirect to={redirectLink} />}
      <div className={`NavTopMobile ${mobileNavOpen ? "active" : ""}`}>
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
          <div
            className="NavTopMobile__swipeTuto"
            to="/"
            onClick={() => handleNavClose()}
          >
            <img src={SwipeTutoSmallLogo} alt="swipetuto" />
          </div>
          <CustomButton color="white" onClick={handleFiltersMobileOpen}>
            <SearchLogo />
            Recherche
          </CustomButton>
        </div>
        <div className={`NavTopMobile__open ${mobileNavOpen ? "active" : ""}`}>
          {/* <div className="NavTopMobile__searchZone">
            <SearchForm /> 
            <FiltersBarMobile title="Recherche" showResults={false} />
          </div> */}
          <div className="NavTopMobile__swipeTuto-menu">
            <img src={SwipeTutoSmallFull} alt="swipetuto" />
          </div>
          <div className="NavTopMobile__menu">
            <Link
              className="NavTopMobile__link"
              onClick={() => {
                dispatch(closeMobileNav());
                setCardsDropdownOpen(false);
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
                setCardsDropdownOpen(false);
              }}
            >
              Ressources
            </Link>
            <Link
              className="NavTopMobile__link"
              to="/search"
              onClick={() => {
                dispatch(deleteCurrentSearch());
                dispatch(getCardAfterfilterAction(initialSearchState));
                dispatch(closeMobileNav());
                setCardsDropdownOpen(false);
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
                <UserAvatar
                  userImage={
                    currentUser.profile && currentUser.profile.avatar
                      ? currentUser.profile.avatar
                      : null
                  }
                  userFirstName={
                    currentUser.first_name && currentUser.first_name
                  }
                  userLastName={currentUser.last_name && currentUser.last_name}
                />
                <div className="NavTopMobile__user--meta">
                  <p className="NavTopMobile__user--text">
                    {currentUser.username}
                  </p>
                  <p className="NavTopMobile__user--text">
                    {currentUser.email}
                  </p>
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
        </div>
      </div>
    </>
  );
};

export default withRouter(NavTopMobile);
