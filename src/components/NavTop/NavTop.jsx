// Présent dans App.js

import React, { useState, useEffect, } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/navtop_logo.png";
import { ReactComponent as SearchLogo } from "../../assets/images/search.svg";
import CustomButton from "../CustomButton/CustomButton";

import "./NavTop.scss";


const NavTop = ({ avatar }) => {
  console.log('5')
  console.log('avatar', avatar)
 
  const [search, setSearch] = useState("");
  const [test, setTest] = useState(null)


  useEffect(() => {
   
      avatar ? setTest(avatar) : setTest('')
   
   
  })
  
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
        <Link to="/" className="NavTop__logo">
          <img className="NavTop__logo--image" src={test ? test : logo} alt="" />
        </Link>
        <Link className="NavTop__link" to="/search">
          Cartes
        </Link>
        <Link className="NavTop__link" to="/">
          Lexique
        </Link>
        <Link className="NavTop__link" to="/">
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
        <CustomButton
          color="dark">
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
