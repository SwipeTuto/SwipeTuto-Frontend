// Présent dans App.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/navtop_logo.png";
import { ReactComponent as SearchLogo } from "../../../assets/images/search.svg";
import CustomButton from "../CustomButton/CustomButton";

import "./NavTop.scss";

const NavTop = ({ avatar }) => {
  const [search, setSearch] = useState("");

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

  console.log("TOP OK");
  // Ajouter changement : si utilisateur connecté afficher un accès au compte à la place des boutons connexion et inscription
  return (
    <div className="NavTop">
      <div className="NavTop__left">
        <Link to="/" className="NavTop__logo">
          <img
            className="NavTop__logo--image"
            src={avatar ? avatar : logo}
            alt=""
          />
        </Link>
        <Link className="NavTop__link" to="/">
          Accueil
        </Link>
        <Link className="NavTop__link" to="/search">
          Cartes
        </Link>
        <Link className="NavTop__link" to="/ressources">
          Ressources
        </Link>
      </div>
      <div className="NavTop__center">
        <form className="NavTop__search" onSubmit={handleSubmit}>
          <input
            className="NavTop__input"
            id="kword"
            type="text"
            placeholder="Recherche..."
            onChange={handleChange}
            value={search}
          />
          <button type="submit" className="NavTop__button">
            <SearchLogo className="NavTop__button--logo" />
          </button>
        </form>
      </div>
      <div className="NavTop__right">
        <CustomButton color="dark">
          <Link className="NavTop__link" to="/login">
            Connexion
          </Link>
        </CustomButton>
        <CustomButton color="light">Inscription</CustomButton>
      </div>
    </div>
  );
};

export default NavTop;
