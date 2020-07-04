// Bar avec les items pour filtrer les slides
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  selectSearchLangage,
  selectTotalNumberOfResults,
  selectSearchCategory,
  selectSearchWords,
  selectSearchOrder,
  selectCurrentCardsGridPage,
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
  // paramètres de recherche :
  const currentSearch = useSelector(state => state.filter.currentSearch);
  const searchLangage = useSelector(selectSearchLangage);
  const searchCategory = useSelector(selectSearchCategory);
  const searchWords = useSelector(selectSearchWords);
  const searchOrder = useSelector(selectSearchOrder);
  const currentSearchPageNumber = useSelector(selectCurrentCardsGridPage);
  // pages de requêtes :
  const totalNumberOfResults = useSelector(selectTotalNumberOfResults);
  const getRealNumber = (results) => {
    if (isNaN(results)) {
      return 0;
    } else {
      return results;
    }
  };
  const totalNumberOfCardsSearched = getRealNumber(totalNumberOfResults);

  const AllOrFilterCards = (searchLangage, searchCategory) => {
    searchLangage || searchCategory
      ? dispatch(getCardAfterfilterAction(searchLangage, searchCategory, currentSearch))
      : dispatch(getCardsAction());
  };

  const handleClick = (e) => {
    AllOrFilterCards(searchLangage, e.target.dataset.filter);
  };

  const handleOrderChange = (e) => {
    const newOrder = e.target.options[e.target.selectedIndex].value;

    dispatch(setSearchOrder(newOrder));
  };

  const categoryArray = [
    {
      queryName: null,
      barName: "Tous",
    },
    {
      queryName: "theorie",
      barName: "Théorie",
    },
    {
      queryName: "code",
      barName: "Code",
    },
    {
      queryName: "memo",
      barName: "Mémo",
    },
    {
      queryName: "bloc code",
      barName: "Bloc Code",
    },
    {
      queryName: "performances",
      barName: "Performances",
    },
    {
      queryName: "ressources",
      barName: "Ressources",
    },
    {
      queryName: "autre",
      barName: "Autre",
    },
  ];

  return (
    <div className="FiltersBar">
      <div className="FiltersBar__wrapper">
        <div className="FiltersBar__up">
          <select
            name="cards-filter"
            id="cards-filter"
            onChange={(e) => handleOrderChange(e)}
          >
            <option value="created">Nouveau</option>
            <option value="update">Modifié</option>
            <option value="like">Populaire</option>
          </select>
          <div className="FiltersBar__options">
            <div className="scroll-logo">
              <ChevronLeft />
            </div>
            <div className="FiltersBar__options--links">
              {categoryArray &&
                categoryArray.map((category, index) => (
                  <Link
                    className={`FiltersBar__options--item ${
                      searchCategory === category.queryName && "active"
                    }`}
                    to={`/search?${
                      searchWords ? `search=${searchWords}&` : ""
                    }${searchLangage ? `langage=${searchLangage}&` : ""}${
                      searchOrder ? `order=${searchOrder}&` : ""
                    }${
                      category.queryName
                        ? `category=${category.queryName}&`
                        : ""
                    }${
                      currentSearchPageNumber
                        ? `page=${currentSearchPageNumber}`
                        : ""
                    }`}
                    key={index}
                    onClick={(e) => handleClick(e)}
                    data-filter={category.queryName}
                  >
                    {category.barName}
                  </Link>
                ))}
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
