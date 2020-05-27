// Bar avec les items pour filtrer les slides
import React, { useState } from "react";
import "./FiltersBar.scss";
import { ReactComponent as GridLargeLogo } from "../../../assets/images/grid.svg";
import { ReactComponent as GridSmallLogo } from "../../../assets/images/apps.svg";

const FiltersBar = ({ handleClickSize }) => {
  const [searchFilter, setSearchFilter] = useState("all");
  // const [gridSize, setGridSize] = useState("small");

  const handleClick = (e) => {
    const newSearchFilter = e.target.dataset.filter;
    setSearchFilter(newSearchFilter);
    const allFiltersItems = [
      ...document.querySelectorAll("button.FiltersBar__options--item"),
    ];
    allFiltersItems.map((item) => item.classList.remove("active"));
    e.target.classList.add("active");
  };

  return (
    <div className="FiltersBar">
      <div className="FiltersBar__wrapper">
        <div className="FiltersBar__up">
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
        <div className="FiltersBar__down">
          <div
            className="FiltersBar__size-logo active"
            data-gridsize="small"
            onClick={(e) => handleClickSize(e)}
          >
            <GridSmallLogo className="grid-size-logo" pointerEvents="none" />
          </div>

          <div
            className="FiltersBar__size-logo "
            data-gridsize="big"
            onClick={(e) => handleClickSize(e)}
          >
            <GridLargeLogo className="grid-size-logo" pointerEvents="none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersBar;
