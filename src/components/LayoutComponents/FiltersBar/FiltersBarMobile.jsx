// Bar avec les items pour filtrer les slides
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { initialSearchState } from "../../../helper/index";
import {
  selectCurrentSearch,
  selectSearchTopic,
  selectTotalNumberOfResults,
  selectSearchCategory,
  selectSearchWords,
  selectSearchOrder,
  selectSearchPage,
} from "../../../redux/filter/filter-selectors";
import {
  categoryArray,
  topicArray,
  getNameFromQueryName,
  orderArray,
} from "../../../helper/index";
import SearchLinkRedirect from "../../../helper/SearchLinkRedirect";

import { ReactComponent as GridLargeLogo } from "../../../assets/images/grid.svg";
import { ReactComponent as DropDownLogo } from "../../../assets/images/chevrons/chevron-down.svg";
import { ReactComponent as GridSmallLogo } from "../../../assets/images/apps.svg";
import { ReactComponent as FilterLogo } from "../../../assets/images/filter.svg";
import CustomButton from "../CustomButton/CustomButton";
import {
  getCardAfterfilterAction,
  setSearchOrder,
  setCurrentSearch,
  deleteCurrentSearch,
} from "../../../redux/filter/filter-actions";
import { getCardsAction } from "../../../redux/cards/cards-actions";
import { urlParams } from "../../../helper/index";

import { ReactComponent as ChevronLeft } from "../../../assets/images/chevrons/chevron-back.svg";
import { ReactComponent as ChevronRight } from "../../../assets/images/chevrons/chevron-forward.svg";
import { ReactComponent as CloseLogo } from "../../../assets/images/close.svg";
import { ReactComponent as CloseCircleLogo } from "../../../assets/images/close-circle.svg";

import "./FiltersBarMobile.scss";
import { selectFilterMobileMenuOpen } from "../../../redux/layout/layout-selectors";
import {
  openFilterMobileMenu,
  closeFilterMobileMenu,
} from "../../../redux/layout/layout-actions";

const FiltersBarMobile = ({ title, showResults }) => {
  const dispatch = useDispatch();
  // paramètres de recherche :
  const filterMobileMenuOpen = useSelector(selectFilterMobileMenuOpen);
  const currentSearch = useSelector(selectCurrentSearch);
  const currentPage = useSelector(selectSearchPage);
  const searchTopic = useSelector(selectSearchTopic);
  const searchCategory = useSelector(selectSearchCategory);
  const searchWords = useSelector(selectSearchWords);
  const searchOrder = useSelector(selectSearchOrder);
  const currentSearchPageNumber = useSelector(selectSearchPage);
  const [redirection, setRedirection] = useState(false);
  const linkBar = document.querySelector(".FiltersBar__options--links");
  const [newSearch, setNewSearch] = useState({});

  const [inputShowed, setInputShowed] = useState({
    topic: false,
    category: false,
    order: false,
  });

  useEffect(() => {
    setRedirection(false);
    setNewSearch(currentSearch);
  }, []);

  // useEffect(() => {
  //   setRedirection(true);
  // }, [currentSearch]);

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

  const handleSearchChange = (e) => {
    const type = e.target.name;
    const newValue = e.target.value || null;
    const newSearchCopy = newSearch;
    setNewSearch({
      ...newSearchCopy,
      [type]: newValue,
    });
  };

  const handleFilterBarMobileOpenClick = () => {
    dispatch(openFilterMobileMenu());
  };
  const handleCloseFilterMobileMenuCloseClick = () => {
    dispatch(closeFilterMobileMenu());
  };

  const handleSearchWordChange = (e) => {
    const newSearchCopy = newSearch;
    setNewSearch({ ...newSearchCopy, searchWords: e.target.value });
  };

  const handleDeleteCurrentSearch = () => {
    dispatch(deleteCurrentSearch());
    dispatch(closeFilterMobileMenu());
    dispatch(getCardAfterfilterAction(initialSearchState));
    setRedirection(true);
  };

  const toggleShowInput = (item) => {
    // console.log(item);
    const inputShowedCopy = inputShowed;
    setInputShowed({
      ...inputShowedCopy,
      [item]: !inputShowedCopy[item],
    });
  };

  const clearSearchWords = () => {
    const newSearchCopy = newSearch;
    setNewSearch({ ...newSearchCopy, searchWords: null });
  };

  const handleFormSubmit = (e) => {
    setRedirection(true);
    e.preventDefault();
    dispatch(setCurrentSearch("searchWords", newSearch.searchWords));
    dispatch(setCurrentSearch("searchTopic", newSearch.searchTopic));
    dispatch(setCurrentSearch("searchOrder", newSearch.searchOrder));
    dispatch(setCurrentSearch("searchCategory", newSearch.searchCategory));
    dispatch(setCurrentSearch("searchPage", 1));
    dispatch(getCardAfterfilterAction(newSearch));
  };

  const redirectLink = SearchLinkRedirect();

  return (
    <>
      {redirection && <Redirect to={redirectLink} />}
      <div className="FiltersBarMobile">
        {filterMobileMenuOpen && (
          <div className="FiltersBarMobile__menu">
            <div className="FiltersBarMobile__menu--top">
              <CloseLogo onClick={handleCloseFilterMobileMenuCloseClick} />
            </div>
            <div className="FiltersBarMobile__search">
              <h1 className="title title-1">Votre recherche :</h1>
              <form
                className="FiltersBarMobile__form"
                onSubmit={(e) => handleFormSubmit(e)}
              >
                <div className="FiltersBarMobile__form--group">
                  <h2 className="title title-2">
                    <label htmlFor="wordsFilter">Termes de recherche :</label>
                  </h2>

                  <div>
                    <input
                      id="wordsFilter"
                      type="text"
                      className="FiltersBarMobile__form--text"
                      onChange={(e) => handleSearchWordChange(e)}
                      value={newSearch.searchWords || ""}
                    />
                    {newSearch.searchWords && (
                      <CloseCircleLogo onClick={clearSearchWords} />
                    )}
                  </div>
                </div>
                <div
                  className="FiltersBarMobile__form--group"
                  data-filter="topic"
                >
                  <h2
                    className="title title-2"
                    onClick={() => toggleShowInput("topic")}
                  >
                    Langage <DropDownLogo />
                  </h2>
                  {inputShowed.topic === true ? (
                    topicArray.map((topic, index) => (
                      <div
                        className="FiltersBarMobile__form--input"
                        key={index}
                      >
                        <input
                          className="FiltersBarMobile__input-radio"
                          type="radio"
                          id={index}
                          name="searchTopic"
                          onChange={(e) => handleSearchChange(e)}
                          value={topic.queryName || ""}
                          checked={newSearch.searchTopic === topic.queryName}
                        />
                        <label htmlFor={index}>{topic.name}</label>
                      </div>
                    ))
                  ) : (
                    <p className="FiltersBarMobile__currentSearch">
                      {newSearch.searchTopic !== undefined &&
                        getNameFromQueryName(topicArray, newSearch.searchTopic)}
                    </p>
                  )}
                </div>

                <div
                  className="FiltersBarMobile__form--group"
                  data-filter="category"
                >
                  <h2
                    className="title title-2"
                    onClick={() => toggleShowInput("category")}
                  >
                    Catégorie <DropDownLogo />
                  </h2>
                  {inputShowed.category === true ? (
                    categoryArray.map((category, index) => (
                      <div
                        className="FiltersBarMobile__form--input"
                        key={index}
                      >
                        <input
                          className="FiltersBarMobile__input-radio"
                          type="radio"
                          id={index}
                          name="searchCategory"
                          onChange={(e) => handleSearchChange(e)}
                          value={category.queryName || ""}
                          checked={
                            newSearch.searchCategory === category.queryName
                          }
                        />
                        <label htmlFor={index}>{category.name}</label>
                      </div>
                    ))
                  ) : (
                    <p className="FiltersBarMobile__currentSearch">
                      {newSearch.searchCategory !== undefined &&
                        getNameFromQueryName(
                          categoryArray,
                          newSearch.searchCategory
                        )}
                    </p>
                  )}
                </div>

                <div
                  className="FiltersBarMobile__form--group"
                  data-filter="order"
                >
                  <h2
                    className="title title-2"
                    onClick={() => toggleShowInput("order")}
                  >
                    Ordre <DropDownLogo />
                  </h2>
                  {inputShowed.order === true ? (
                    orderArray.map((order, index) => (
                      <div
                        className="FiltersBarMobile__form--input"
                        key={index}
                      >
                        <input
                          className="FiltersBarMobile__input-radio"
                          type="radio"
                          id={index}
                          name="searchOrder"
                          onChange={(e) => handleSearchChange(e)}
                          value={order.queryName || ""}
                          checked={newSearch.searchOrder === order.queryName}
                        />
                        <label htmlFor={index}>{order.name}</label>
                      </div>
                    ))
                  ) : (
                    <p className="FiltersBarMobile__currentSearch">
                      {newSearch.searchOrder !== undefined &&
                        getNameFromQueryName(orderArray, newSearch.searchOrder)}
                    </p>
                  )}
                </div>
                <Link
                  to={`/search?${
                    newSearch.searchWords
                      ? `search=${newSearch.searchWords}&`
                      : ""
                  }${
                    newSearch.searchTopic
                      ? `topic=${newSearch.searchTopic}&`
                      : ""
                  }${
                    newSearch.searchOrder
                      ? `order=${newSearch.searchOrder}&`
                      : ""
                  }${
                    newSearch.searchCategory
                      ? `category=${newSearch.searchCategory}&`
                      : ""
                  }${
                    currentSearchPageNumber
                      ? `page=${currentSearchPageNumber}`
                      : ""
                  }`}
                ></Link>
                <div className="FiltersBarMobile__form--buttons">
                  <CustomButton
                    color="white"
                    onClick={handleDeleteCurrentSearch}
                  >
                    Réinitialiser
                  </CustomButton>
                  <CustomButton type="submit" color="dark">
                    Rechercher
                  </CustomButton>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default FiltersBarMobile;
