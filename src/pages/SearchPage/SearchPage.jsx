// Présent dans App.js dans une Route ("/search")

import React from "react";

import NavTop from "../../components/NavTop/NavTop";
import FiltersBar from "../../components/FiltersBar/FiltersBar";
import CardGridList from "../../components/CardGridList/CardGridList";

import "./SearchPage.scss";

const SearchPage = () => {
  return (
    <div className="SearchPage">
      <NavTop />
      <FiltersBar />
      <CardGridList />
    </div>
  );
};

export default SearchPage;
