import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCardAfterfilterAction,
  setCurrentSearch,
} from "../../../redux/filter/filter-actions";
import { selectMobileNavOpen } from "../../../redux/layout/layout-selectors";
import {
  openMobileNav,
  closeMobileNav,
} from "../../../redux/layout/layout-actions";
import { topicArray } from "../../../helper/index";
import SearchLinkRedirect from "../../../helper/SearchLinkRedirect";

import { logoutAction } from "../../../redux/user/user-actions";

import { ReactComponent as DropDownLogo } from "../../../assets/images/chevrons/chevron-down.svg";
import { ReactComponent as CloseLogo } from "../../../assets/images/close.svg";
import { ReactComponent as MenuLogo } from "../../../assets/images/menu.svg";
import { ReactComponent as AccountLogo } from "../../../assets/images/person.svg";
import { ReactComponent as SettingsLogo } from "../../../assets/images/settings.svg";
import { ReactComponent as HelpLogo } from "../../../assets/images/help-circle.svg";
import { ReactComponent as LogOutLogo } from "../../../assets/images/log-out.svg";
// import newUserAvatar from "../../../assets/images/avatar_new_user.png";
import UserAvatar from "../../UserComponents/UserAvatar/UserAvatar";
import SearchForm from "../SearchForm/SearchForm";

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

  const handleTopicClick = (e) => {
    // dispatch(getCardAfterfilterAction(e.target.dataset.name, searchCategory));
    dispatch(setCurrentSearch("searchTopic", e.target.dataset.name));
    dispatch(
      getCardAfterfilterAction({
        ...currentSearch,
        searchTopic: e.target.dataset.name,
      })
    );

    setCardsDropdownOpen(false);
    dispatch(closeMobileNav());
  };

  const redirectLink = SearchLinkRedirect();

  return (
    <>
      {redirection && <Redirect to={redirectLink} />}
      <div className={`NavTopMobile ${mobileNavOpen ? "active" : ""}`}>
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

          <h1 className="title title-1">SwipeTuto</h1>
        </div>
        <div className={`NavTopMobile__open ${mobileNavOpen ? "active" : ""}`}>
          <div className="NavTopMobile__searchZone">
            <SearchForm />
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
            <p
              className="NavTopMobile__link"
              onClick={() => {
                const currentState = cardsDropdownOpen;
                setCardsDropdownOpen(!currentState);
              }}
            >
              Langages
              <DropDownLogo className="NavTopMobile__dropdown--logo" />
            </p>
            <div
              className={`NavTopMobile__dropdown ${
                cardsDropdownOpen ? "active" : ""
              }`}
            >
              {topicArray &&
                topicArray.map((rubrique, index) => (
                  <Link
                    key={index}
                    to={`/search?${
                      searchWords ? `search=${searchWords}&` : ""
                    }${
                      rubrique.queryName ? `topic=${rubrique.queryName}&` : ""
                    }${searchOrder ? `order=${searchOrder}&` : ""}${
                      searchCategory ? `category=${searchCategory}&` : ""
                    }${
                      currentSearchPageNumber
                        ? `page=${currentSearchPageNumber}`
                        : ""
                    }`}
                  >
                    <p
                      onClick={(e) => handleTopicClick(e)}
                      data-name={rubrique.queryName}
                      className="NavTopMobile__dropdown--item"
                    >
                      {rubrique.name}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
          {currentUser ? (
            <div className="NavTopMobile__user">
              <div className="NavTopMobile__userInfos">
                <UserAvatar
                  userImage={
                    currentUser.profile.avatar && currentUser.profile.avatar
                  }
                  userFirstName={
                    currentUser.first_name && currentUser.first_name
                  }
                  userLastName={currentUser.last_name && currentUser.last_name}
                />
                <div className="NavTopMobile__userWelcome">
                  <p className="NavTopMobile__userWelcome--text">Bonjour</p>
                  <p className="NavTopMobile__userWelcome--text">
                    {currentUser.username}
                  </p>
                  <p className="NavTopMobile__userWelcome--text">
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
                  <AccountLogo className="NavTopMobile__userMenu--logo" />
                  Compte
                </Link>
                <Link
                  className="NavTopMobile__userMenu--link"
                  to="/account/settings"
                  onClick={() => handleNavClose()}
                >
                  <SettingsLogo className="NavTopMobile__userMenu--logo" />
                  Paramètres
                </Link>
                <Link
                  className="NavTopMobile__userMenu--link"
                  to="/help"
                  onClick={() => handleNavClose()}
                >
                  <HelpLogo className="NavTopMobile__userMenu--logo" />
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
                  <LogOutLogo className="NavTopMobile__userMenu--logo" />
                  Deconnexion
                </Link>
              </div>
            </div>
          ) : (
            <Link
              className="NavTopMobile__linkConnexion"
              to="/login"
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
