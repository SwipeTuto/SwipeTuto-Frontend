import React, { useEffect, Suspense, lazy, useCallback } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import FiltersBar from "../../components/LayoutComponents/FiltersBar/FiltersBar";
// import CardGridList from "../../components/CardsComponents/CardGridList/CardGridList";
import { selectTheme } from "../../redux/layout/layout-selectors";
import { selectCardsFetched, selectCurrentSearch, selectTotalNumberOfResults } from "../../redux/filter/filter-selectors";
import "./SearchPage.scss";
import { setCardsSize } from "../../redux/layout/layout-actions";
import { getCardAfterfilterAction } from "../../redux/filter/filter-actions";

const FiltersBar = lazy(() => import("../../components/LayoutComponents/FiltersBar/FiltersBar"));
const CardGridList = lazy(() => import("../../components/CardsComponents/CardGridList/CardGridList"));

const SearchPage = ({ location }) => {
  const currentTheme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const currentSearch = useSelector(selectCurrentSearch);

  const totalNumberOfResults = useSelector(selectTotalNumberOfResults);

  const getRealNumber = (results) => {
    if (isNaN(results)) {
      return 0;
    } else {
      return results;
    }
  };

  const fetchedFilteredCards = useCallback(() => {
    dispatch(getCardAfterfilterAction(currentSearch));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSearch]);

  useEffect(() => {
    if (currentSearch) fetchedFilteredCards(currentSearch);
  }, [currentSearch, fetchedFilteredCards]);

  useEffect(() => {
    if (window.scrollY) {
      window.scrollTo(0, 0);
    }
  }, []);

  const totalNumberOfCardsSearched = getRealNumber(totalNumberOfResults);

  // const handleClickSize = (e) => {
  //   const newSize = e.target.dataset.gridsize;
  //   dispatch(setCardsSize(newSize));
  //   updateCardSize(newSize);
  // };

  // const updateCardSize = (newSize) => {
  //   const allGridSizeItems = [...document.querySelectorAll(".FiltersBar__size-logo")];
  //   allGridSizeItems.map((item) => item.classList.remove("active"));
  //   const newActiveSizeEl = [...allGridSizeItems.filter((item) => item.dataset.gridsize === newSize)];
  //   if (newActiveSizeEl[0]) newActiveSizeEl[0].classList.add("active");
  // };

  return (
    <>
      <div className={`SearchPage ${currentTheme}-theme-d`}>
        <div className="SearchPage__wrapper">
          <div className="SearchPage__filtersBarMobile">
            <p className="SearchPage__searchResults">{totalNumberOfCardsSearched ? totalNumberOfCardsSearched : 0} Résultats</p>
          </div>
          <Suspense fallback={<div />}>
            <FiltersBar />
            <CardGridList allowInfiniteScroll={true} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default withRouter(SearchPage);
