// Présent dans App.js dans une Route ("/search")

import React, { useState } from "react";

import NavTop from "../../components/LayoutComponents/NavTop/NavTop";
import FiltersBar from "../../components/LayoutComponents/FiltersBar/FiltersBar";
import CardGridList from "../../components/CardsComponents/CardGridList/CardGridList";
import CardFullPopup from "../../components/CardsComponents/CardFullPopup/CardFullPopup";

import "./SearchPage.scss";

// Récupérer le handleClick sur les display large ou petit des grids et fixer à big ou small et passer ça dans CardGridList

const SearchPage = () => {
  const [gridSize, setGridSize] = useState("small");
  const [showCardFullPopup, setShowCardFullPopup] = useState(false);
  const [clickedcard, setClickedcard] = useState(null);

  const handleClickSize = (e) => {
    const allGridSizeItems = [
      ...document.querySelectorAll(".FiltersBar__size-logo"),
    ];
    const newSize = e.target.dataset.gridsize;
    setGridSize(newSize);
    allGridSizeItems.map((item) => item.classList.remove("active"));
    e.target.classList.add("active");
  };

  const handleCardFullPopupClick = (etarget, card) => {
    // récupérer le id pour récupérer les infos du slide cliqué et les afficher dans CardFullPopup; depuis CardPreviewBig et CardPreviewSmall
    setClickedcard(card);
    console.log(clickedcard);
    setShowCardFullPopup(true);
    document.getElementsByClassName("App")[0].style.position = "fixed";
    document.getElementsByClassName("App")[0].style.overflow = "hidden";
  };

  const handleCloseCardFullPopupClick = (e) => {
    document.getElementsByClassName("App")[0].style.position = "static";
    document.getElementsByClassName("App")[0].style.overflow = "visible";
    e.target.classList.remove("active");
    setClickedcard(null);

    setShowCardFullPopup(false);
  };

  return (
    <div className="SearchPage">
      <div className="SearchPage__wrapper">
        <NavTop />
        <FiltersBar handleClickSize={handleClickSize} />
        <CardGridList
          cardsSize={gridSize}
          handleCardFullPopupClick={handleCardFullPopupClick}
        />
      </div>
      <CardFullPopup
        showCardFullPopup={showCardFullPopup}
        clickedcard={clickedcard}
        handleCloseCardFullPopupClick={handleCloseCardFullPopupClick}
      />
    </div>
  );
};

export default SearchPage;
