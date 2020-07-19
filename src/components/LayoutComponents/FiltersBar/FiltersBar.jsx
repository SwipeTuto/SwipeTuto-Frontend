// Bar avec les items pour filtrer les slides
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import {
  selectCurrentSearch,
  selectSearchTopic,
  selectTotalNumberOfResults,
  selectSearchCategory,
  selectSearchWords,
  selectSearchOrder,
  selectSearchPage,
} from "../../../redux/filter/filter-selectors";
import { categoryArray, orderArray } from "../../../helper/index";
import SearchLinkRedirect from "../../../helper/SearchLinkRedirect";

import { ReactComponent as GridLargeLogo } from "../../../assets/images/grid.svg";
import { ReactComponent as GridSmallLogo } from "../../../assets/images/apps.svg";

import {
  getCardAfterfilterAction,
  setSearchOrder,
  setCurrentSearch,
} from "../../../redux/filter/filter-actions";
import { getCardsAction } from "../../../redux/filter/filter-actions";
import { urlParams } from "../../../helper/index";

import { ReactComponent as ChevronLeft } from "../../../assets/images/chevrons/chevron-back.svg";
import { ReactComponent as ChevronRight } from "../../../assets/images/chevrons/chevron-forward.svg";

import "./FiltersBar.scss";

const FiltersBar = ({ handleClickSize }) => {
  const dispatch = useDispatch();
  // paramètres de recherche :
  const currentSearch = useSelector(selectCurrentSearch);
  const currentPage = useSelector(selectSearchPage);
  const searchTopic = useSelector(selectSearchTopic);
  const searchCategory = useSelector(selectSearchCategory);
  const searchWords = useSelector(selectSearchWords);
  const searchOrder = useSelector(selectSearchOrder);
  const currentSearchPageNumber = useSelector(selectSearchPage);
  const [redirection, setRedirection] = useState(false);
  const linkBar = document.querySelector(".FiltersBar__options--links");

  useEffect(() => {
    setRedirection(false);
  }, []);

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

  const handleOrderChange = (e) => {
    const newOrder = e.target.options[e.target.selectedIndex].value;
    // lancer nouvelle requete cards
    dispatch(setCurrentSearch("searchOrder", newOrder));
    dispatch(setCurrentSearch("searchPage", 1));
    dispatch(
      getCardAfterfilterAction({
        ...currentSearch,
        searchOrder: newOrder,
        searchPage: 1,
      })
    );
    setRedirection(true);
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.dataset.filter;
    dispatch(setCurrentSearch("searchCategory", newCategory));
    dispatch(
      getCardAfterfilterAction({
        ...currentSearch,
        searchCategory: newCategory,
        searchPage: 1,
      })
    );
    dispatch(setCurrentSearch("searchPage", 1));
    setRedirection(true);
  };

  const handleScollRight = () => {
    linkBar.scrollBy(50, 0);
  };
  const handleScollLeft = () => {
    linkBar.scrollBy(-50, 0);
  };

  const redirectLink = SearchLinkRedirect();

  return (
    <>
      {redirection && <Redirect to={redirectLink} />}
      <div className="FiltersBar">
        <div className="FiltersBar__wrapper">
          <div className="FiltersBar__up">
            <select
              name="cards-filter"
              id="cards-filter"
              onChange={(e) => handleOrderChange(e)}
            >
              {orderArray.map((order, index) => (
                <option key={index} value={order.queryName}>
                  {order.name}
                </option>
              ))}
            </select>
            <div className="FiltersBar__options">
              <div className="scroll-logo" onClick={handleScollLeft}>
                <ChevronLeft />
              </div>

              <div className="FiltersBar__options--links">
                {categoryArray &&
                  categoryArray.map((category, index) => (
                    <div
                      onClick={(e) => handleCategoryChange(e)}
                      className={`FiltersBar__options--item ${
                        searchCategory === category.queryName && "active"
                      }`}
                      key={index}
                      data-filter={category.queryName}
                    >
                      {category.name}
                    </div>
                  ))}
              </div>

              <div className="scroll-logo" onClick={handleScollRight}>
                <ChevronRight />
              </div>
            </div>
          </div>
          <div className="FiltersBar__down">
            <p className="FiltersBar__numberOfResults">
              {`${totalNumberOfCardsSearched} résultats trouvés - Page ${currentPage}`}
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
    </>
  );
};
export default FiltersBar;
