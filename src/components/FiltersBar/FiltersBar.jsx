// Bar avec les items pour filtrer les slides
import React, { useState } from "react";
import "./FiltersBar.scss";

const FiltersBar = () => {
  const [searchFilter, setSearchFilter] = useState("all");

  const handleClick = (e) => {
    const newSearchFilter = e.target.dataset.filter;
    setSearchFilter(newSearchFilter);
    const allFiltersItems = [
      ...document.querySelectorAll("button.FiltersBar__options--item"),
    ];
    allFiltersItems.map((item) => item.classList.remove("active"));
    e.target.classList.add("active");
  };

  // Bug ajout classe active : au premier clic il y a 2 active
  return (
    <div className="FiltersBar">
      <div className="FiltersBar__wrapper">
        <select name="cards-filter" id="cards-filter">
          <option value="popular">Populaire</option>
          <option value="new">Nouveau</option>
        </select>
        <div className="FiltersBar__options">
          <button
            className="FiltersBar__options--item active"
            data-filter="all"
            onClick={handleClick}
          >
            Tous
          </button>
          <button
            className="FiltersBar__options--item"
            data-filter="theory"
            onClick={handleClick}
          >
            Théorie
          </button>
          <button
            className="FiltersBar__options--item"
            data-filter="code"
            onClick={handleClick}
          >
            Code
          </button>
          <button
            className="FiltersBar__options--item"
            data-filter="design"
            onClick={handleClick}
          >
            Design
          </button>
          <button
            className="FiltersBar__options--item"
            data-filter="performance"
            onClick={handleClick}
          >
            Performances
          </button>
          <button
            className="FiltersBar__options--item"
            data-filter="ressources"
            onClick={handleClick}
          >
            Ressources
          </button>
          <button
            className="FiltersBar__options--item"
            data-filter="other"
            onClick={handleClick}
          >
            Autre
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersBar;
