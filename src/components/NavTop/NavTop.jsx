import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/navtop_logo.png";
import { ReactComponent as SearchLogo } from "../../assets/images/search.svg";
import CustomButton from "../CustomButton/CustomButton";

import "./NavTop.scss";

const NavTop = () => {
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

  return (
    <div className="NavTop">
      <div className="NavTop__left">
        <Link to="/" className="NavTop__logo">
          <img className="NavTop__logo--image" src={logo} alt="" />
        </Link>
        <Link className="NavTop__link" to="/">
          Item1
        </Link>
        <Link className="NavTop__link" to="/">
          Item2
        </Link>
        <Link className="NavTop__link" to="/">
          Item3
        </Link>
      </div>
      <div className="NavTop__center">
        <form className="NavTop__search" onSubmit={handleSubmit}>
          <input
            className="NavTop__input"
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
        <CustomButton color="dark">Connexion</CustomButton>
        <CustomButton color="light">Inscription</CustomButton>
      </div>
    </div>
  );
};

export default NavTop;
