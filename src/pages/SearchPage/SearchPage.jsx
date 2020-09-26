// Présent dans App.js dans une Route ("/search")
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import FiltersBar from "../../components/LayoutComponents/FiltersBar/FiltersBar";
import CardGridList from "../../components/CardsComponents/CardGridList/CardGridListMasonry";
import CurrentSearchWords from "../../components/CurrentSearchWords/CurrentSearchWords";
import {
  selectIsLoaded,
  selectTheme,
} from "../../redux/layout/layout-selectors";
import {
  selectTotalNumberOfResults,
  selectSearchPage,
  selectCurrentSearch,
  selectPaginationNext,
} from "../../redux/filter/filter-selectors";
import { getOtherPageAction } from "../../redux/filter/filter-actions";
import SearchLinkRedirect from "../../helper/SearchLinkRedirect";

import {
  getCardAfterfilterAction,
  setCurrentSearch,
} from "../../redux/filter/filter-actions";
import Pagination from "../../components/LayoutComponents/Pagination/Pagination";

import "./SearchPage.scss";
import { useCallback } from "react";

// Récupérer le handleClick sur les display large ou petit des grids et fixer à big ou small et passer ça dans CardGridList

const SearchPage = (props) => {
  const isLoaded = useSelector(selectIsLoaded);
  const [redirection, setRedirection] = useState(false);
  const currentSearch = useSelector(selectCurrentSearch);
  const currentTheme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const [gridSize, setGridSize] = useState("small");
  const nextPageLink = useSelector(selectPaginationNext);
  const [shouldLoadMore, setShouldLoadMore] = useState(false);
  const [screenHeight, setScreenHeight] = useState(0);
  const [bottomGridLevel, setBottomGridLevel] = useState(0);
  const [scrollLevel, setScrollLevel] = useState(0);

  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const totalNumberOfCards = useSelector(selectTotalNumberOfResults);
  const currentSearchPageNumber = useSelector(selectSearchPage);
  const totalNumberOfResults = useSelector(selectTotalNumberOfResults);

  const getRealNumber = (results) => {
    if (isNaN(results)) {
      return 0;
    } else {
      return results;
    }
  };

  window.addEventListener("load", () => {
    window.scroll(0, 0);
  });
  // useEffect(() => {
  //   if (window.scrollY) {
  //     window.scroll(0, 0);
  //   }
  // }, []);

  const totalNumberOfCardsSearched = getRealNumber(totalNumberOfResults);

  // A CHANGER EN FONCTION DU BACK :
  const numberOfItemByPage = 20;
  const currentSearchPage = useSelector(selectSearchPage);

  const handleClickSize = (e) => {
    const allGridSizeItems = [
      ...document.querySelectorAll(".FiltersBar__size-logo"),
    ];
    const newSize = e.target.dataset.gridsize;
    setGridSize(newSize);
    allGridSizeItems.map((item) => item.classList.remove("active"));
    e.target.classList.add("active");
  };

  const handlePaginationNavigation = (e) => {
    const navPageNumber = e.target.dataset.page;
    dispatch(setCurrentSearch("searchPage", navPageNumber));
    setRedirection(true);
  };

  const goToFirstPage = () => {
    dispatch(setCurrentSearch("searchPage", 1));
    setRedirection(true);
  };
  const goToLastPage = () => {
    dispatch(setCurrentSearch("searchPage", parseInt(totalNumberOfPages)));
    setRedirection(true);
  };
  const goToPreviousPage = () => {
    dispatch(setCurrentSearch("searchPage", parseInt(currentSearchPage - 1)));
    setRedirection(true);
  };
  const goToNextPage = () => {
    dispatch(setCurrentSearch("searchPage", parseInt(currentSearchPage + 1)));
    setRedirection(true);
  };

  useEffect(() => {
    setTotalNumberOfPages(Math.ceil(totalNumberOfCards / numberOfItemByPage));
  }, [totalNumberOfCards, currentSearch]);

  useEffect(() => {
    dispatch(getCardAfterfilterAction(currentSearch));
  }, [currentSearch, dispatch]);

  const redirectLink = SearchLinkRedirect();

  return (
    <>
      {redirection && <Redirect to={redirectLink} />}
      <div className={`SearchPage ${currentTheme}-theme`}>
        <div className="SearchPage__wrapper">
          <CurrentSearchWords />
          <div className="SearchPage__filtersBarMobile">
            <p className="SearchPage__searchResults">
              {totalNumberOfCardsSearched} Résultats - Page{" "}
              {currentSearchPageNumber}
            </p>
          </div>
          <FiltersBar handleClickSize={handleClickSize} />

          <CardGridList cardsSize={gridSize} />
          {/* {isLoaded && totalNumberOfCards && totalNumberOfCards !== 0 ? (
            <Pagination
              currentSearch={currentSearch}
              totalPages={totalNumberOfPages}
              goToFirstPage={goToFirstPage}
              goToLastPage={goToLastPage}
              goToPreviousPage={goToPreviousPage}
              goToNextPage={goToNextPage}
              handlePaginationNavigation={handlePaginationNavigation}
            />
          ) : (
            ""
          )} */}
        </div>
      </div>
    </>
  );
};

export default withRouter(SearchPage);
