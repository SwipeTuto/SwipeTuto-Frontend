// Bar avec les items pour filtrer les slides
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"

import { ReactComponent as GridLargeLogo } from "../../../assets/images/grid.svg";
import { ReactComponent as GridSmallLogo } from "../../../assets/images/apps.svg";

import { getCardByLangageAndCategoryAction } from "../../../redux/filter/filter-actions"


import "./FiltersBar.scss";

const FiltersBar = ({ handleClickSize }) => {
  // const [searchFilter, setSearchFilter] = useState("all");
  // const [gridSize, setGridSize] = useState("small");
  const dispatch = useDispatch();
  const langage = useSelector(state => state.filter.currentSearch)

  const handleClick = (e) => {
    const newSearchFilter = e.target.dataset.filter;
    dispatch(getCardByLangageAndCategoryAction(langage, newSearchFilter));
    // setSearchFilter(newSearchFilter);

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
              data-filter="theorie"
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
            <Link to={`/cards/${langage}/memo/`}>
              <button
                className="FiltersBar__options--item"
                data-filter="memo"
                onClick={handleClick}
              >
                memo
            </button>
            </Link>
            <Link to={`/cards/${langage}/bloccode/`}>
              <button
                name="bloc code"
                className="FiltersBar__options--item"
                data-filter="bloc code"
                onClick={handleClick}
              >
                bloc code
            </button>
            </Link>
            <button
              className="FiltersBar__options--item"
              data-filter="performances"
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
              data-filter="autre"
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
