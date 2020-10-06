// Bar avec les items pour filtrer les slides
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";

// redux
import { selectCurrentSearch } from "../../../redux/filter/filter-selectors";
import {
  setCurrentSearch,
  deleteCurrentSearch,
} from "../../../redux/filter/filter-actions";
import {
  selectFilterMobileMenuOpen,
  selectTheme,
} from "../../../redux/layout/layout-selectors";
import { closeFilterMobileMenu } from "../../../redux/layout/layout-actions";

// helper
import {
  categoryArray,
  topicArray,
  getNameFromQueryName,
  orderArray,
} from "../../../helper/index";

// components
import SearchLinkRedirect from "../../../helper/SearchLinkRedirect";
import CustomButton from "../CustomButton/CustomButton";

// assets
import { ReactComponent as DropDownLogo } from "../../../assets/images/chevrons/chevron-down.svg";
import { ReactComponent as CloseLogo } from "../../../assets/images/close.svg";
import { ReactComponent as CloseCircleLogo } from "../../../assets/images/close-circle.svg";

import "./FiltersBarMobile.scss";

const FiltersBarMobile = ({ title, showResults }) => {
  const dispatch = useDispatch();
  const filterMobileMenuOpen = useSelector(selectFilterMobileMenuOpen);
  const currentSearch = useSelector(selectCurrentSearch);
  const currentTheme = useSelector(selectTheme);
  const [redirection, setRedirection] = useState(false);
  const [newSearch, setNewSearch] = useState({});

  const [inputShowed, setInputShowed] = useState({
    topic: false,
    category: false,
    order: false,
  });

  useEffect(() => {
    setRedirection(false);
    setNewSearch(currentSearch);
  }, [currentSearch]);

  const handleSearchChange = (e) => {
    const type = e.target.name;
    const newValue = e.target.value || null;
    const newSearchCopy = newSearch;
    setNewSearch({
      ...newSearchCopy,
      [type]: newValue,
    });
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
    setRedirection(true);
  };

  const toggleShowInput = (item) => {
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
    dispatch(closeFilterMobileMenu());
  };

  const redirectLink = SearchLinkRedirect();

  return (
    <>
      {redirection && <Redirect to={redirectLink} />}
      <div className="FiltersBarMobile">
        {filterMobileMenuOpen && (
          <div className={`FiltersBarMobile__menu ${currentTheme}-theme`}>
            <div className="FiltersBarMobile__menu--top">
              <CloseLogo
                onClick={() => handleCloseFilterMobileMenuCloseClick()}
              />
            </div>
            <div className="FiltersBarMobile__search">
              <h1 className="title title-1">Votre recherche :</h1>
              <form className="FiltersBarMobile__form">
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

                <div className="FiltersBarMobile__form--buttons">
                  <CustomButton
                    color="white"
                    onClick={handleDeleteCurrentSearch}
                  >
                    Réinitialiser
                  </CustomButton>
                  <Link
                    to={`/search?${
                      newSearch.searchWords
                        ? `search=${newSearch.searchWords}`
                        : ""
                    }${
                      newSearch.searchTopic
                        ? `&topic=${newSearch.searchTopic}`
                        : ""
                    }${
                      newSearch.searchOrder
                        ? `&order=${newSearch.searchOrder}`
                        : ""
                    }${
                      newSearch.searchCategory
                        ? `&category=${newSearch.searchCategory}`
                        : ""
                    }`}
                  >
                    {" "}
                    <CustomButton
                      type="submit"
                      color="dark"
                      onClick={(e) => handleFormSubmit(e)}
                    >
                      Rechercher
                    </CustomButton>
                  </Link>
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
