// Présent dans App.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/navtop_logo.png";
import { ReactComponent as SearchLogo } from "../../../assets/images/search.svg";
import CustomButton from "../CustomButton/CustomButton";

import "./NavTop.scss";

const NavTop = ({ avatar }) => {
  const [search, setSearch] = useState("");
  const [avatarUser, setAvatarUser] = useState(null);

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

  // useEffect(() => (avatar ? setAvatarUser(avatar) : logo), [avatarUser]);

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
        <Link className="NavTop__link" to="/ressources">
          Ressources
        </Link>
        <Link className="NavTop__link" to="/cards">
          Catégories
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
        {avatarUser ? (
          <Link to="/" className="NavTop__logo">
            <img
              className="NavTop__logo--image"
              src={avatarUser}
              alt="user avatar"
            />
          </Link>
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
    </div>
  );
};

export default NavTop;
