import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  searchAction,
  getCardAfterfilterAction,
} from "../../../redux/filter/filter-actions";
import { selectMobileNavOpen } from "../../../redux/layout/layout-selectors";
import {
  openMobileNav,
  closeMobileNav,
} from "../../../redux/layout/layout-actions";
import { getCardsAction } from "../../../redux/cards/cards-actions";

import { ReactComponent as SearchLogo } from "../../../assets/images/search.svg";
import { ReactComponent as DropDownLogo } from "../../../assets/images/chevrons/chevron-down.svg";
import { ReactComponent as CloseLogo } from "../../../assets/images/close.svg";
import { ReactComponent as MenuLogo } from "../../../assets/images/menu.svg";
import { ReactComponent as AccountLogo } from "../../../assets/images/person.svg";
import { ReactComponent as SettingsLogo } from "../../../assets/images/settings.svg";
import { ReactComponent as HelpLogo } from "../../../assets/images/help-circle.svg";
import { ReactComponent as LogOutLogo } from "../../../assets/images/log-out.svg";
// import newUserAvatar from "../../../assets/images/avatar_new_user.png";
import UserAvatar from "../../UserComponents/UserAvatar/UserAvatar";

import "./NavTopMobile.scss";

const NavTopMobile = (props) => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [cardsDropdownOpen, setCardsDropdownOpen] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const mobileNavOpen = useSelector(selectMobileNavOpen);

  // Reset du scroll
  useEffect(() => {
    const NavTopMobileMenu = document.querySelector(".NavTopMobile");

    if (NavTopMobileMenu && NavTopMobileMenu.scroll) {
      NavTopMobileMenu.scroll(0, 0);
    }
  }, [mobileNavOpen]);

  const handleNavClose = () => {
    dispatch(closeMobileNav());
    setCardsDropdownOpen(false);
  };
  const handleNavOpen = () => {
    dispatch(openMobileNav());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let searchCopy = searchInput;
    searchCopy = e.target.value;
    setSearchInput(searchCopy);
    dispatch(closeMobileNav());
    setCardsDropdownOpen(false);
    setSearchInput("");
    props.history.push("/cards");
  };

  const handleChange = (e) => {
    const searchText = e.target.value;
    setSearchInput(searchText);
  };

  const handleClick = (e) => {
    dispatch(searchAction(searchInput));

    setCardsDropdownOpen(false);
    dispatch(closeMobileNav());
    props.history.push("/cards");
  };

  const logoHandleClick = (e) => {
    console.log(e.target.dataset.name);
    dispatch(getCardAfterfilterAction(e.target.dataset.name, ""));

    setCardsDropdownOpen(false);
    dispatch(closeMobileNav());
  };

  const allLogoHandleClick = () => {
    dispatch(getCardsAction());
    setCardsDropdownOpen(false);
    dispatch(closeMobileNav());
  };

  return (
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
        {/* {currentUser && (
          <div className="NavTopMobile__avatar">
            <UserAvatar
              userImage={currentUser.user.profile.avatar}
              userFirstName={currentUser.user.first_name}
              userLastName={currentUser.user.last_name}
            />
          </div>
        )} */}
      </div>
      <div className={`NavTopMobile__open ${mobileNavOpen ? "active" : ""}`}>
        <div className="NavTopMobile__searchZone">
          <form className="NavTopMobile__search" onSubmit={handleSubmit}>
            <input
              className="NavTopMobile__input"
              id="searchMobile"
              name="searchMobile"
              type="text"
              placeholder="Recherche..."
              onChange={handleChange}
              value={searchInput}
            />
            <button
              type="submit"
              onClick={(e) => handleClick(e)}
              className="NavTopMobile__button"
            >
              <SearchLogo className="NavTopMobile__button--logo" />
            </button>
          </form>
        </div>
        {/* <div className="mobileNavSeparation"></div> */}
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
            to="/cards"
            onClick={() => {
              const currentState = cardsDropdownOpen;
              setCardsDropdownOpen(!currentState);
            }}
          >
            Cartes
            <DropDownLogo className="NavTopMobile__dropdown--logo" />
          </Link>
          <div
            className={`NavTopMobile__dropdown ${
              cardsDropdownOpen ? "active" : ""
            }`}
          >
            <Link to="/cards/">
              <p
                className="NavTopMobile__dropdown--item"
                data-name="all"
                onClick={() => allLogoHandleClick()}
              >
                Toutes
              </p>
            </Link>
            <Link to="/cards/html">
              <p
                className="NavTopMobile__dropdown--item"
                data-name="html"
                onClick={(e) => logoHandleClick(e)}
              >
                HTML
              </p>
            </Link>
            <Link to="/cards/css/">
              <p
                onClick={(e) => logoHandleClick(e)}
                data-name="css"
                className="NavTopMobile__dropdown--item"
              >
                CSS
              </p>
            </Link>
            <Link to="/cards/javascript/">
              <p
                onClick={(e) => logoHandleClick(e)}
                data-name="javascript"
                className="NavTopMobile__dropdown--item"
              >
                Javascript
              </p>
            </Link>
            <Link to="/cards/react/">
              <p
                onClick={(e) => logoHandleClick(e)}
                data-name="reactjs"
                className="NavTopMobile__dropdown--item"
              >
                React JS
              </p>
            </Link>
            <Link to="/cards/nodeJs/">
              <p
                onClick={(e) => logoHandleClick(e)}
                data-name="nodejs"
                className="NavTopMobile__dropdown--item"
              >
                Node JS
              </p>
            </Link>
            <Link to="/cards/python/">
              <p
                onClick={(e) => logoHandleClick(e)}
                data-name="python"
                className="NavTopMobile__dropdown--item"
              >
                Python
              </p>
            </Link>
            <Link to="/cards/php">
              <p
                onClick={(e) => logoHandleClick(e)}
                data-name="php"
                className="NavTopMobile__dropdown--item"
              >
                PHP
              </p>
            </Link>
            <Link to="/cards/sass/">
              <p
                onClick={(e) => logoHandleClick(e)}
                data-name="sass"
                className="NavTopMobile__dropdown--item"
              >
                Sass
              </p>
            </Link>
          </div>
          {/* <Link
            className="NavTopMobile__link NavTopMobile__link--category"
            to="/cards"
            onClick={() => {
              dispatch(closeMobileNav());
            }}
          >
            Catégories
          </Link> */}
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
        </div>
        {/* <div className="mobileNavSeparation"></div> */}
        {currentUser ? (
          <div className="NavTopMobile__user">
            <div className="NavTopMobile__userInfos">
              <UserAvatar
                userImage={
                  currentUser.profile.avatar && currentUser.profile.avatar
                }
                userFirstName={currentUser.first_name && currentUser.first_name}
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
              <Link className="NavTopMobile__userMenu--link" to="/">
                <AccountLogo className="NavTopMobile__userMenu--logo" />
                Compte
              </Link>
              <Link className="NavTopMobile__userMenu--link" to="/">
                <SettingsLogo className="NavTopMobile__userMenu--logo" />
                Paramètres
              </Link>
              <Link className="NavTopMobile__userMenu--link" to="/">
                <HelpLogo className="NavTopMobile__userMenu--logo" />
                Aide
              </Link>
              <Link className="NavTopMobile__userMenu--link" to="/">
                <LogOutLogo className="NavTopMobile__userMenu--logo" />
                Deconnexion
              </Link>
            </div>
          </div>
        ) : (
          <Link
            className="NavTopMobile__linkConnexion"
            to="/login"
            onClick={() => handleClick()}
          >
            <CustomButton color="dark">Connexion / Inscription</CustomButton>
          </Link>
        )}
      </div>
    </div>
  );
};

export default withRouter(NavTopMobile);
