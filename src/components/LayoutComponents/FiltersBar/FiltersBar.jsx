// Bar avec les items pour filtrer les slides
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// redux
import { selectSearchCategory, selectSearchOrder, selectCurrentSearch, selectSearchTopic } from "../../../redux/filter/filter-selectors";
import { setCurrentSearch } from "../../../redux/filter/filter-actions";

// helper
import { orderArray } from "../../../helper/functions/getQueryOrder";
import { getCategoriesArray } from "../../../helper/functions/getCategoriesArray";
import { topicArray } from "../../../helper/functions/getTopicsArray";

import { ReactComponent as GridLargeLogo } from "../../../assets/images/grid.svg";
import { ReactComponent as GridSmallLogo } from "../../../assets/images/apps.svg";

import "./FiltersBar.scss";
import { selectCardsSize, selectTheme } from "../../../redux/layout/layout-selectors";

const FiltersBar = ({ handleClickSize }) => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  const currentSearch = useSelector(selectCurrentSearch);
  const currentCardSize = useSelector(selectCardsSize);
  const searchCategory = useSelector(selectSearchCategory);
  const searchTopic = useSelector(selectSearchTopic);
  const searchOrder = useSelector(selectSearchOrder);
  const [categoriesArray, setCategoriesArray] = useState([]);

  useEffect(() => {
    const array = getCategoriesArray(searchTopic);
    setCategoriesArray(array);
  }, [searchTopic]);

  const handleOrderChange = (e) => {
    const newOrder = e.target.value;
    const currentSearchCopy = { ...currentSearch, searchOrder: newOrder };
    dispatch(setCurrentSearch(currentSearchCopy));
  };

  const handleTopicChange = (e) => {
    let newTopic = e.target.value;
    if (newTopic === "Tous") {
      newTopic = null;
    }
    const currentSearchCopy = { ...currentSearch, searchTopic: newTopic, searchCategory: null };
    dispatch(setCurrentSearch(currentSearchCopy));
  };

  const handleCategoryChange = (categoryQueryName) => {
    const newCategory = categoryQueryName;
    const currentSearchCopy = { ...currentSearch, searchCategory: newCategory };
    dispatch(setCurrentSearch(currentSearchCopy));
  };

  return (
    <div className="FiltersBar">
      <div className="FiltersBar__wrapper">
        <select
          className={`FiltersBar__topic ${currentTheme}-theme-m`}
          onChange={(e) => handleTopicChange(e)}
          value={searchTopic === null ? "Tous" : searchTopic}
        >
          {topicArray &&
            topicArray.map((topic, index) => {
              return (
                <option key={`topic${topic.queryName}${index}`} data-topic={topic.queryName} value={topic.queryName}>
                  {topic.name}
                </option>
              );
            })}
        </select>
        <div className="FiltersBar__options">
          <div className="FiltersBar__options--links">
            {categoriesArray &&
              categoriesArray.map((category, index) => (
                <div
                  onClick={() => handleCategoryChange(category.queryName)}
                  className={`FiltersBar__options--item ${searchTopic} ${searchCategory === category.queryName && "active"}`}
                  key={`category${category.queryName}${index}`}
                  data-category={category.queryName}
                >
                  {category.name}
                </div>
              ))}
          </div>
        </div>

        <select
          className={`${currentTheme}-theme-m`}
          name="cards-filter"
          id="cards-filter"
          onChange={(e) => handleOrderChange(e)}
          value={searchOrder}
        >
          {orderArray.map((order, index) => (
            <option key={`${order}${index}`} value={order.queryName}>
              {order.name}
            </option>
          ))}
        </select>
        <div
          className={`FiltersBar__size-logo ${currentCardSize === "small" ? "active" : ""}`}
          data-gridsize="small"
          onClick={(e) => handleClickSize(e)}
        >
          <GridSmallLogo className="grid-size-logo" pointerEvents="none" />
        </div>

        <div className={`FiltersBar__size-logo ${currentCardSize === "big" ? "active" : ""}`} data-gridsize="big" onClick={(e) => handleClickSize(e)}>
          <GridLargeLogo className="grid-size-logo" pointerEvents="none" />
        </div>
      </div>
    </div>
  );
};
export default FiltersBar;
