// Présent dans App.js

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/navtop_logo.png";
import { ReactComponent as SearchLogo } from "../../../assets/images/search.svg";
import CustomButton from "../CustomButton/CustomButton";
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import { setCurrentUser } from "../../../redux/user/user-actions";
import { toggleUserNav } from "../../../redux/layout/layout-actions";
import { selectUserNav } from "../../../redux/layout/layout-selectors";

import "./NavTop.scss";

const NavTop = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const currentUserNav = useSelector(selectUserNav);
  const [search, setSearch] = useState("");

  const getUser = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    getUser && dispatch(setCurrentUser(getUser));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let searchCopy = search;
    searchCopy = e.target.value;
    setSearch(searchCopy);
  };

  const handleChange = (e) => {
    const searchText = e.target.value;
    setSearch(searchText);
  };

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
        <Link className="NavTop__link" to="/cards">
          Catégories
        </Link>
        <Link className="NavTop__link" to="/ressources">
          Ressources
        </Link>
      </div>
      <div className="NavTop__center">
        <form className="NavTop__search" onSubmit={handleSubmit}>
          <button type="submit" className="NavTop__button">
            <SearchLogo className="NavTop__button--logo" />
          </button>
          <input
            className="NavTop__input"
            id="kword"
            type="text"
            placeholder="Recherche..."
            onChange={handleChange}
            value={search}
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
          <>
            <Link className="NavTop__linkConnexion" to="/login">
              <CustomButton color="dark">Connexion</CustomButton>
            </Link>
            <Link className="NavTop__linkConnexion" to="/login">
              <CustomButton color="light">Inscription</CustomButton>
            </Link>
          </>
        )}
      </div>
      {currentUserNav ? (
        <div className="NavTop__userMenu">
          <p className="NavTop__userMenu--text">Bonjour</p>
          <p className="NavTop__userMenu--text">{currentUser.username}</p>
          <span className="horizontal-separation-primary-light"></span>
          <Link className="NavTop__userMenu--link" to="/">
            Compte
          </Link>
          <Link className="NavTop__userMenu--link" to="/">
            Paramètres
          </Link>
          <Link className="NavTop__userMenu--link" to="/">
            Deconnexion
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default NavTop;
