// Présent dans App.js dans une Route ("/search")
import React from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FiltersBar from "../../components/LayoutComponents/FiltersBar/FiltersBar";
import CardGridList from "../../components/CardsComponents/CardGridList/CardGridList";
import CurrentSearchWords from "../../components/CurrentSearchWords/CurrentSearchWords";
import { selectTheme } from "../../redux/layout/layout-selectors";
import { selectTotalNumberOfResults } from "../../redux/filter/filter-selectors";
import "./SearchPage.scss";
import { setCardsSize } from "../../redux/layout/layout-actions";

const SearchPage = ({ location }) => {
  const currentTheme = useSelector(selectTheme);
  const dispatch = useDispatch();

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

  const totalNumberOfCardsSearched = getRealNumber(totalNumberOfResults);

  const handleClickSize = (e) => {
    const allGridSizeItems = [
      ...document.querySelectorAll(".FiltersBar__size-logo"),
    ];
    const newSize = e.target.dataset.gridsize;
    dispatch(setCardsSize(newSize));
    allGridSizeItems.map((item) => item.classList.remove("active"));
    e.target.classList.add("active");
  };

  return (
    <>
      <div className={`SearchPage ${currentTheme}-theme`}>
        <div className="SearchPage__wrapper">
          <CurrentSearchWords />
          <div className="SearchPage__filtersBarMobile">
            <p className="SearchPage__searchResults">
              {totalNumberOfCardsSearched} Résultats
            </p>
          </div>
          <FiltersBar handleClickSize={handleClickSize} />
          <CardGridList />
        </div>
      </div>
    </>
  );
};

export default withRouter(SearchPage);
