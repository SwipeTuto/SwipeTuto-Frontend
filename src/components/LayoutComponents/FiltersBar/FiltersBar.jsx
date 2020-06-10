// Bar avec les items pour filtrer les slides
import React , { useState, useEffect }from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"

import { ReactComponent as GridLargeLogo } from "../../../assets/images/grid.svg";
import { ReactComponent as GridSmallLogo } from "../../../assets/images/apps.svg";

import { getCardAfterfilterAction } from "../../../redux/filter/filter-actions"


import {setType} from "../../../redux/filter/filter-actions";
import "./FiltersBar.scss";

const FiltersBar = ({ handleClickSize }) => {
  // const [searchFilter, setSearchFilter] = useState("all");
  // const [gridSize, setGridSize] = useState("small");
  const dispatch = useDispatch();
  const langage = useSelector(state => state.filter.currentSearch)
  const category = useSelector(state => state.filter.categoryFilter)

  const handleClick = (e) => {
  const langageUndified = (langage ? langage : undefined)
  const newSearchFilters  = e.target.dataset.filter
    dispatch(getCardAfterfilterAction(langageUndified, newSearchFilters)); 
    // setSearchFilter(newSearchFilter);
console.log('langage2',langage)
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
              onClick={() => dispatch(setType("all"))}
            >
              Tous
              
            </button>
            < Link to={`/cards${(langage !== "" && langage !== undefined) ? `/${langage}/theorie` : `/_theorie`}`}>
            {/* < Link to={`/cards/theorie`}> */}
          
            <button
              className="FiltersBar__options--item"
              data-filter="theorie"
              onClick={handleClick}
            >
              Théorie
            </button>
            </Link>
            < Link to={`/cards${langage !== "" && langage !== undefined ? `/${langage}/code` : `/_code`}`}>
            <button
            type='submit'
              className="FiltersBar__options--item"
              data-filter="code"
              onClick={handleClick}
            >
              Code
            </button>
            </Link>
           < Link to={`/cards${langage !== "" && langage !== undefined ? `/${langage}/_memo` : `/_memo`}`}>
              <button
                className="FiltersBar__options--item"
                data-filter="memo"
                onClick={handleClick}
              >
                memo
            </button>
            </Link>
           
            < Link to={`/cards${langage !== "" && langage !== undefined ? `/${langage}/_bloccode` : `/_bloccode`}`}>
              <button
                name="bloc code"
                className="FiltersBar__options--item"
                data-filter="bloc code"
                onClick={handleClick}
              >
                bloc code
            </button>
            </Link>
            < Link to={`/cards${langage !== "" && langage !== undefined ? `/${langage}/_performances` : `/_performances`}`}>
            <button
              className="FiltersBar__options--item"
              data-filter="performances"
              onClick={handleClick}
            >
              Performances
            </button>
            </Link>
            < Link to={`/cards${langage !== "" && langage !== undefined ? `/${langage}/_ressources` : `/_ressources`}`}>
            <button
              className="FiltersBar__options--item"
              data-filter="ressources"
              onClick={handleClick}
            >
              Ressources
            </button>
            </Link>
            < Link to={`/cards${langage !== "" && langage !== undefined ? `/${langage}/_autre` : `/_autre`}`}>
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
