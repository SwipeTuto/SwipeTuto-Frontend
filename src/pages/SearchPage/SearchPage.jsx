// Présent dans App.js dans une Route ("/search")

import React, { useState } from "react";

import NavTop from "../../components/LayoutComponents/NavTop/NavTop";
import FiltersBar from "../../components/LayoutComponents/FiltersBar/FiltersBar";
import CardGridList from "../../components/CardsComponents/CardGridList/CardGridList";

import "./SearchPage.scss";

// Récupérer le handleClick sur les display large ou petit des grids et fixer à big ou small et passer ça dans CardGridList

const SearchPage = () => {
  const [gridSize, setGridSize] = useState("small");

  // scroll reset
  if (window.scrollY) {
    window.scroll(0, 0);
  }

  const handleClickSize = (e) => {
    const allGridSizeItems = [
      ...document.querySelectorAll(".FiltersBar__size-logo"),
    ];
    const newSize = e.target.dataset.gridsize;
    setGridSize(newSize);
    allGridSizeItems.map((item) => item.classList.remove("active"));
    e.target.classList.add("active");
  };

  return (
    <div className="SearchPage">
      <div className="SearchPage__wrapper">
        <FiltersBar handleClickSize={handleClickSize} />
        <CardGridList cardsSize={gridSize} cardsNumber={12} />
      </div>
    </div>
  );
};

export default SearchPage;
