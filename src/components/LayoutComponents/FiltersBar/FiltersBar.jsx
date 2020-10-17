// Bar avec les items pour filtrer les slides
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// redux
import {
  selectTotalNumberOfResults,
  selectSearchCategory,
  selectSearchOrder,
  selectCurrentSearch,
  selectSearchTopic,
} from "../../../redux/filter/filter-selectors";
import { setCurrentSearch } from "../../../redux/filter/filter-actions";

// helper
import {
  categoryArray,
  getCategoriesArray,
  orderArray,
} from "../../../helper/index";

// component

// assets
import { ReactComponent as GridLargeLogo } from "../../../assets/images/grid.svg";
import { ReactComponent as GridSmallLogo } from "../../../assets/images/apps.svg";
import { ReactComponent as ChevronLeft } from "../../../assets/images/chevrons/chevron-back.svg";
import { ReactComponent as ChevronRight } from "../../../assets/images/chevrons/chevron-forward.svg";

import "./FiltersBar.scss";
import { selectTheme } from "../../../redux/layout/layout-selectors";

const FiltersBar = ({ handleClickSize }) => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  const currentSearch = useSelector(selectCurrentSearch);
  const searchCategory = useSelector(selectSearchCategory);
  const searchTopic = useSelector(selectSearchTopic);
  const searchOrder = useSelector(selectSearchOrder);
  const linkBar = document.querySelector(".FiltersBar__options--links");
  const [categoriesArray, setCategoriesArray] = useState([]);

  // useEffect(() => {
  //   setRedirection(false);
  // }, []);

  useEffect(() => {
    const array = getCategoriesArray(searchTopic);
    setCategoriesArray(array);
  }, [searchTopic]);

  // pages de requêtes :
  const totalNumberOfResults = useSelector(selectTotalNumberOfResults);
  const getRealNumber = (results) => {
    if (isNaN(results) || results === null) {
      return 0;
    } else {
      return results;
    }
  };
  const totalNumberOfCardsSearched = getRealNumber(totalNumberOfResults);

  const handleOrderChange = (e) => {
    const newOrder = e.target.options[e.target.selectedIndex].value;
    const currentSearchCopy = { ...currentSearch, searchOrder: newOrder };
    dispatch(setCurrentSearch(currentSearchCopy));
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.dataset.filter;
    const currentSearchCopy = { ...currentSearch, searchCategory: newCategory };
    dispatch(setCurrentSearch(currentSearchCopy));
  };

  const handleScollRight = () => {
    linkBar.scrollBy(50, 0);
  };
  const handleScollLeft = () => {
    linkBar.scrollBy(-50, 0);
  };

  return (
    <div className="FiltersBar">
      <div className="FiltersBar__wrapper">
        <div className="FiltersBar__up">
          <select
            className={`${currentTheme}-theme`}
            name="cards-filter"
            id="cards-filter"
            onChange={(e) => handleOrderChange(e)}
            value={searchOrder}
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
              {categoriesArray &&
                categoriesArray.map((category, index) => (
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
            {`${totalNumberOfCardsSearched} résultats trouvés`}
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
