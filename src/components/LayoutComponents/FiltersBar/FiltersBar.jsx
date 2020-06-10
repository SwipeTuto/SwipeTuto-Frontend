// Bar avec les items pour filtrer les slides
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ReactComponent as GridLargeLogo } from "../../../assets/images/grid.svg";
import { ReactComponent as GridSmallLogo } from "../../../assets/images/apps.svg";

import { getCardAfterfilterAction } from "../../../redux/filter/filter-actions";

import {
  setType,
  setCategoryFilter,
} from "../../../redux/filter/filter-actions";
import "./FiltersBar.scss";

const FiltersBar = ({ handleClickSize }) => {
  // const [searchFilter, setSearchFilter] = useState("all");
  // const [gridSize, setGridSize] = useState("small");
  const dispatch = useDispatch();
  const langage = useSelector((state) => state.filter.currentSearch);
  const category = useSelector((state) => state.filter.categoryFilter);

  const handleClick = (e) => {
    const langageUndifined = langage ? langage : undefined;
    const newSearchFilters = e.target.dataset.filter;
    dispatch(getCardAfterfilterAction(langageUndifined, newSearchFilters));
    // setSearchFilter(newSearchFilter);
    console.log("langage2", langage);
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
<<<<<<< HEAD
            <Link
              to={`/cards${
                langage !== "" && langage !== undefined
                  ? `/${langage}/theorie`
                  : `/_theorie`
              }`}
=======
            < Link to={`/cards${(langage !== "" && langage !== undefined) ? `/${langage}/theorie` : `/theorie`}`}>
            {/* < Link to={`/cards/theorie`}> */}
          
            <button
              className="FiltersBar__options--item"
              data-filter="theorie"
              onClick={handleClick}
>>>>>>> 2e94ce585cd229bcaa9e98e9f71cb21f677ad2c8
            >
              {/* < Link to={`/cards/theorie`}> */}

              <button
                className="FiltersBar__options--item"
                data-filter="theorie"
                onClick={handleClick}
              >
                Théorie
              </button>
            </Link>
<<<<<<< HEAD
            <Link
              to={`/cards${
                langage !== "" && langage !== undefined
                  ? `/${langage}/code`
                  : `/_code`
              }`}
=======
            < Link to={`/cards${langage !== "" && langage !== undefined ? `/${langage}/code` : `/code`}`}>
            <button
            type='submit'
              className="FiltersBar__options--item"
              data-filter="code"
              onClick={handleClick}
>>>>>>> 2e94ce585cd229bcaa9e98e9f71cb21f677ad2c8
            >
              <button
                type="submit"
                className="FiltersBar__options--item"
                data-filter="code"
                onClick={handleClick}
              >
                Code
              </button>
            </Link>
<<<<<<< HEAD
            <Link
              to={`/cards${
                langage !== "" && langage !== undefined
                  ? `/${langage}/_memo`
                  : `/_memo`
              }`}
            >
=======
           < Link to={`/cards${langage !== "" && langage !== undefined ? `/${langage}/memo` : `/memo`}`}>
>>>>>>> 2e94ce585cd229bcaa9e98e9f71cb21f677ad2c8
              <button
                className="FiltersBar__options--item"
                data-filter="memo"
                onClick={handleClick}
              >
                memo
              </button>
            </Link>
<<<<<<< HEAD

            <Link
              to={`/cards${
                langage !== "" && langage !== undefined
                  ? `/${langage}/_bloccode`
                  : `/_bloccode`
              }`}
            >
=======
           
            < Link to={`/cards${langage !== "" && langage !== undefined ? `/${langage}/bloccode` : `/bloccode`}`}>
>>>>>>> 2e94ce585cd229bcaa9e98e9f71cb21f677ad2c8
              <button
                name="bloc code"
                className="FiltersBar__options--item"
                data-filter="bloc code"
                onClick={handleClick}
              >
                bloc code
              </button>
            </Link>
<<<<<<< HEAD
            <Link
              to={`/cards${
                langage !== "" && langage !== undefined
                  ? `/${langage}/_performances`
                  : `/_performances`
              }`}
=======
            < Link to={`/cards${langage !== "" && langage !== undefined ? `/${langage}/performances` : `/performances`}`}>
            <button
              className="FiltersBar__options--item"
              data-filter="performances"
              onClick={handleClick}
>>>>>>> 2e94ce585cd229bcaa9e98e9f71cb21f677ad2c8
            >
              <button
                className="FiltersBar__options--item"
                data-filter="performances"
                onClick={handleClick}
              >
                Performances
              </button>
            </Link>
<<<<<<< HEAD
            <Link
              to={`/cards${
                langage !== "" && langage !== undefined
                  ? `/${langage}/_ressources`
                  : `/_ressources`
              }`}
=======
            < Link to={`/cards${langage !== "" && langage !== undefined ? `/${langage}/ressources` : `/ressources`}`}>
            <button
              className="FiltersBar__options--item"
              data-filter="ressources"
              onClick={handleClick}
>>>>>>> 2e94ce585cd229bcaa9e98e9f71cb21f677ad2c8
            >
              <button
                className="FiltersBar__options--item"
                data-filter="ressources"
                onClick={handleClick}
              >
                Ressources
              </button>
            </Link>
<<<<<<< HEAD
            <Link
              to={`/cards${
                langage !== "" && langage !== undefined
                  ? `/${langage}/_autre`
                  : `/_autre`
              }`}
=======
            < Link to={`/cards${langage !== "" && langage !== undefined ? `/${langage}/autre` : `/autre`}`}>
            <button
              className="FiltersBar__options--item"
              data-filter="autre"
              onClick={handleClick}
>>>>>>> 2e94ce585cd229bcaa9e98e9f71cb21f677ad2c8
            >
              <button
                className="FiltersBar__options--item"
                data-filter="autre"
                onClick={handleClick}
              >
                Autre
              </button>
            </Link>
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
