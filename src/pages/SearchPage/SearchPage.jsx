// Présent dans App.js dans une Route ("/search")

import React, { useState, useEffect } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import FiltersBar from "../../components/LayoutComponents/FiltersBar/FiltersBar";
import CardGridList from "../../components/CardsComponents/CardGridList/CardGridList";
import CurrentSearchWords from "../../components/CurrentSearchWords/CurrentSearchWords";
import { selectIsLoaded } from "../../redux/cards/cards-selectors";
import {
  selectTotalNumberOfResults,
  selectSearchPage,
  selectCurrentSearch,
} from "../../redux/filter/filter-selectors";
import { baseURL } from "../../services/configService";
import { urlParams } from "../../helper/index";
import SearchLinkRedirect from "../../helper/SearchLinkRedirect";

import {
  getOtherPageAction,
  deleteCurrentSearch,
  getCardAfterfilterAction,
  setCurrentSearch,
} from "../../redux/filter/filter-actions";
import { getCardsLoading } from "../../redux/cards/cards-actions";
import Pagination from "../../components/LayoutComponents/Pagination/Pagination";
import { setCurrentCardGridPage } from "../../redux/filter/filter-actions";

import "./SearchPage.scss";

// Récupérer le handleClick sur les display large ou petit des grids et fixer à big ou small et passer ça dans CardGridList

const SearchPage = (props) => {
  const isLoaded = useSelector(selectIsLoaded);
  const [redirection, setRedirection] = useState(false);
  const currentSearch = useSelector(selectCurrentSearch);
  const dispatch = useDispatch();
  const [gridSize, setGridSize] = useState("small");
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const totalNumberOfCards = useSelector(selectTotalNumberOfResults);
  const [topic, category, ordering, search, page] = urlParams(props.location);

  // A CHANGER EN FONCTION DU BACK :
  const numberOfItemByPage = 16;
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

    dispatch(
      getCardAfterfilterAction({
        ...currentSearch,
        searchPage: navPageNumber,
      })
    );
    dispatch(setCurrentSearch("searchPage", navPageNumber));
    setRedirection(true);
  };

  const goToFirstPage = () => {
    dispatch(
      getCardAfterfilterAction({
        ...currentSearch,
        searchPage: 1,
      })
    );
    dispatch(setCurrentSearch("searchPage", 1));
    setRedirection(true);
  };
  const goToLastPage = () => {
    dispatch(
      getCardAfterfilterAction({
        ...currentSearch,
        searchPage: totalNumberOfPages,
      })
    );
    dispatch(setCurrentSearch("searchPage", totalNumberOfPages));
    setRedirection(true);
  };
  const goToPreviousPage = () => {
    dispatch(
      getCardAfterfilterAction({
        ...currentSearch,
        searchPage: currentSearchPage - 1,
      })
    );
    dispatch(setCurrentSearch("searchPage", currentSearchPage - 1));
    setRedirection(true);
  };
  const goToNextPage = () => {
    dispatch(
      getCardAfterfilterAction({
        ...currentSearch,
        searchPage: currentSearchPage + 1,
      })
    );
    dispatch(setCurrentSearch("searchPage", currentSearchPage + 1));
    setRedirection(true);
  };

  useEffect(() => {
    // scroll reset
    if (window.scrollY) {
      window.scroll(0, 0);
    }

    setTotalNumberOfPages(Math.ceil(totalNumberOfCards / numberOfItemByPage));
  }, [totalNumberOfCards, currentSearchPage]);

  const redirectLink = SearchLinkRedirect();

  return (
    <>
      {redirection && <Redirect to={redirectLink} />}
      <div className="SearchPage">
        <div className="SearchPage__wrapper">
          <CurrentSearchWords />
          <FiltersBar handleClickSize={handleClickSize} />
          <CardGridList cardsSize={gridSize} />
          {isLoaded && totalNumberOfCards && totalNumberOfCards !== 0 ? (
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
          )}
        </div>
      </div>
    </>
  );
};

export default withRouter(SearchPage);
