// Bar avec les items pour filtrer les slides
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import {
  selectSearchLangage,
  selectTotalNumberOfResults,
  selectSearchCategory,
} from "../../../redux/filter/filter-selectors";

import { ReactComponent as GridLargeLogo } from "../../../assets/images/grid.svg";
import { ReactComponent as GridSmallLogo } from "../../../assets/images/apps.svg";

import {
  getCardAfterfilterAction,
  setSearchOrder,
} from "../../../redux/filter/filter-actions";
import { getCardsAction } from "../../../redux/cards/cards-actions";

import { ReactComponent as ChevronLeft } from "../../../assets/images/chevrons/chevron-back.svg";
import { ReactComponent as ChevronRight } from "../../../assets/images/chevrons/chevron-forward.svg";

import "./FiltersBar.scss";

const FiltersBar = ({ handleClickSize }) => {
  const dispatch = useDispatch();
  const langage = useSelector(selectSearchLangage);
  const category = useSelector(selectSearchCategory);
  const totalNumberOfResults = useSelector(selectTotalNumberOfResults);
  const getRealNumber = (results) => {
    if (isNaN(results)) {
      return 0;
    } else {
      return results;
    }
  };
  const totalNumberOfCardsSearched = getRealNumber(totalNumberOfResults);

  const AllOrFilterCards = (langage, category) => {
    langage || category
      ? dispatch(getCardAfterfilterAction(langage, category))
      : dispatch(getCardsAction());
  };

  const handleClick = (e) => {
    AllOrFilterCards(langage, e.target.dataset.filter);
  };

  const handleOrderChange = (e) => {
    const newOrder = e.target.options[e.target.selectedIndex].value;

    dispatch(setSearchOrder(newOrder));
  };

  return (
    <div className="FiltersBar">
      <div className="FiltersBar__wrapper">
        <div className="FiltersBar__up">
          <select
            name="cards-filter"
            id="cards-filter"
            onChange={(e) => handleOrderChange(e)}
          >
            <option value="chronology">Nouveau</option>
            <option value="popularity">Populaire</option>
          </select>
          <div className="FiltersBar__options">
            <div className="scroll-logo">
              <ChevronLeft />
            </div>
            <div className="FiltersBar__options--links">
              <NavLink to={`/search?langage=${langage}&category=`}>
                <button
                  className={
                    "FiltersBar__options--item " + (category === "" && "active")
                  }
                  onClick={(e) => handleClick(e)}
                  data-filter=""
                >
                  Tous
                </button>
              </NavLink>

              <NavLink to={`/search?langage=${langage}&category=theorie`}>
                <button
                  className={
                    "FiltersBar__options--item " +
                    (category === "theorie" && "active")
                  }
                  data-filter="theorie"
                  onClick={handleClick}
                >
                  Théorie
                </button>
              </NavLink>

              <NavLink to={`/search?langage=${langage}&category=code`}>
                <button
                  type="submit"
                  className={
                    "FiltersBar__options--item " +
                    (category === "code" && "active")
                  }
                  data-filter="code"
                  onClick={handleClick}
                >
                  Code
                </button>
              </NavLink>

              <NavLink to={`/search?langage=${langage}&category=memo`}>
                <button
                  className={
                    "FiltersBar__options--item " +
                    (category === "memo" && "active")
                  }
                  data-filter="memo"
                  onClick={handleClick}
                >
                  memo
                </button>
              </NavLink>

              <NavLink to={`/search?langage=${langage}&category=bloc code`}>
                <button
                  name="bloc code"
                  className={
                    "FiltersBar__options--item " +
                    (category === "bloc code" && "active")
                  }
                  data-filter="bloc code"
                  onClick={handleClick}
                >
                  bloc code
                </button>
              </NavLink>

              <NavLink to={`/search?langage=${langage}&category=performances`}>
                <button
                  className={
                    "FiltersBar__options--item " +
                    (category === "performances" && "active")
                  }
                  data-filter="performances"
                  onClick={handleClick}
                >
                  Performances
                </button>
              </NavLink>

              <NavLink to={`/search?langage=${langage}&category=ressources`}>
                <button
                  className={
                    "FiltersBar__options--item " +
                    (category === "ressources" && "active")
                  }
                  data-filter="ressources"
                  onClick={handleClick}
                >
                  Ressources
                </button>
              </NavLink>
              <NavLink to={`/search?langage=${langage}&category=autre`}>
                <button
                  className={
                    "FiltersBar__options--item " +
                    (category === "autre" && "active")
                  }
                  data-filter="autre"
                  onClick={handleClick}
                >
                  Autre
                </button>
              </NavLink>
            </div>
            <div className="scroll-logo">
              <ChevronRight />
            </div>
          </div>
        </div>
        <div className="FiltersBar__down">
          <p className="FiltersBar__numberOfResults">
            {`${totalNumberOfCardsSearched} résultats trouvés.`}
          </p>
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
