// Présent dans App.js dans une Route ("/search")

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import FiltersBar from "../../components/LayoutComponents/FiltersBar/FiltersBar";
import CardGridList from "../../components/CardsComponents/CardGridList/CardGridList";
import CurrentSearchWords from "../../components/CurrentSearchWords/CurrentSearchWords";
import { selectIsLoaded } from "../../redux/cards/cards-selectors";
import {
  selectTotalNumberOfResults,
  selectSearchPage,
} from "../../redux/filter/filter-selectors";
import { baseURL } from "../../services/configService";

import {
  getOtherPageAction,
  deleteCurrentSearch,
} from "../../redux/filter/filter-actions";
import { getCardsLoading } from "../../redux/cards/cards-actions";
import Pagination from "../../components/LayoutComponents/Pagination/Pagination";
import { setCurrentCardGridPage } from "../../redux/filter/filter-actions";

import "./SearchPage.scss";

// Récupérer le handleClick sur les display large ou petit des grids et fixer à big ou small et passer ça dans CardGridList

const SearchPage = () => {
  const isLoaded = useSelector(selectIsLoaded);
  const dispatch = useDispatch();
  const [gridSize, setGridSize] = useState("small");
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const totalNumberOfCards = useSelector(selectTotalNumberOfResults);

  // A CHANGER EN FONCTION DU BACK :
  const numberOfItemByPage = 16;
  const currentCardsGridPage = useSelector(selectSearchPage);

  // useEffect(() => {
  //   dispatch(deleteCurrentSearch());
  // }, []);

  // "http://localhost:8000/api/v1/card/?page=2"

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
    const navLink = e.target.dataset.link;
    const newPageNumber = parseInt(e.target.dataset.page);
    dispatch(getCardsLoading());
    dispatch(getOtherPageAction(navLink, newPageNumber));
  };

  const goToFirstPage = () => {
    const navLink = `${baseURL}card/?page=1`;
    dispatch(getCardsLoading());
    dispatch(getOtherPageAction(navLink, 1));
  };
  const goToLastPage = () => {
    const navLink = `${baseURL}card/?page=${totalNumberOfPages}`;
    dispatch(getOtherPageAction(navLink, totalNumberOfPages));
  };
  const goToPreviousPage = () => {
    const currentPage = parseInt(currentCardsGridPage);
    const navLink = `${baseURL}card/?page=${currentPage - 1}`;
    dispatch(getOtherPageAction(navLink, currentPage - 1));
  };
  const goToNextPage = () => {
    const currentPage = parseInt(currentCardsGridPage);
    const navLink = `${baseURL}card/?page=${currentPage + 1}`;
    dispatch(getOtherPageAction(navLink, currentPage + 1));
  };

  useEffect(() => {
    // scroll reset
    if (window.scrollY) {
      window.scroll(0, 0);
    }

    setTotalNumberOfPages(Math.ceil(totalNumberOfCards / numberOfItemByPage));
    dispatch(setCurrentCardGridPage(1));
  }, [totalNumberOfCards, numberOfItemByPage]);

  return (
    <div className="SearchPage">
      <div className="SearchPage__wrapper">
        <CurrentSearchWords />
        <FiltersBar handleClickSize={handleClickSize} />
        <CardGridList cardsSize={gridSize} />
        {isLoaded && totalNumberOfCards && totalNumberOfCards !== 0 ? (
          <Pagination
            currentPageClicked={currentCardsGridPage}
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
  );
};

export default SearchPage;
