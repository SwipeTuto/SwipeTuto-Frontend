// Bar avec les items pour filtrer les slides
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
import { closeFilterMobileMenu, openConnexionPopup } from "../../../redux/layout/layout-actions";

// helper
import {
  categoryArray,
  topicArray,
  getNameFromQueryName,
  orderArray,
  getCategoriesArray,
} from "../../../helper/index";

// components
import CustomButton from "../CustomButton/CustomButton";

// assets
import { ReactComponent as DropDownLogo } from "../../../assets/images/chevrons/chevron-down.svg";
import { ReactComponent as CloseLogo } from "../../../assets/images/close.svg";
import { ReactComponent as CloseCircleLogo } from "../../../assets/images/close-circle.svg";

import "./FiltersBarMobile.scss";
import { selectCurrentUser } from "../../../redux/user/user-selectors";

const FiltersBarMobile = ({ title, showResults }) => {
  const dispatch = useDispatch();
  const filterMobileMenuOpen = useSelector(selectFilterMobileMenuOpen);
  const currentSearch = useSelector(selectCurrentSearch);
  const currentTheme = useSelector(selectTheme);
  const currentUser = useSelector(selectCurrentUser);
  const [newSearch, setNewSearch] = useState({});
  const [categoriesArray, setCategoriesArray] = useState([]);

  const [inputShowed, setInputShowed] = useState({
    topic: false,
    category: false,
    order: false,
  });

  useEffect(() => {
    setCategoriesArray(getCategoriesArray(newSearch.searchTopic))
  }, [newSearch.searchTopic])

  useEffect(() => {
    setNewSearch(currentSearch);
  }, [currentSearch, dispatch]);

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
    if (!currentUser) {
      dispatch(openConnexionPopup());
    } else {
    dispatch(deleteCurrentSearch());
    dispatch(closeFilterMobileMenu());
  };
}

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
    if (!currentUser) {
      dispatch(openConnexionPopup());
    } else {
    const currentSearchCopy = {
      searchWords: newSearch.searchWords,
      searchTopic: newSearch.searchTopic,
      searchOrder: newSearch.searchOrder,
      searchCategory: newSearch.searchCategory,
    };
    dispatch(setCurrentSearch(currentSearchCopy));
    dispatch(closeFilterMobileMenu());
  };
}

  return (
    <>
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
              <form className="FiltersBarMobile__form" onSubmit={e => e.preventDefault()}>
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
                    Thème <DropDownLogo />
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
                          id={'topic'+index}
                          name="searchTopic"
                          onChange={(e) => handleSearchChange(e)}
                          value={topic.queryName || ""}
                          checked={newSearch.searchTopic === topic.queryName}
                        />
                        <label htmlFor={'topic'+index}>{topic.name}</label>
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
                    categoriesArray.map((category, index) => (
                      <div
                        className="FiltersBarMobile__form--input"
                        key={index}
                      >
                        <input
                          className="FiltersBarMobile__input-radio"
                          type="radio"
                          id={'category'+index}
                          name="searchCategory"
                          onChange={(e) => handleSearchChange(e)}
                          value={category.queryName || ""}
                          checked={
                            newSearch.searchCategory === category.queryName
                          }
                        />
                        <label htmlFor={'category'+index}>{category.name}</label>
                      </div>
                    ))
                  ) : (
                    <p className="FiltersBarMobile__currentSearch">
                      {newSearch.searchCategory !== undefined &&
                        getNameFromQueryName(
                          getCategoriesArray(newSearch.searchTopic),
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
                          id={'order'+index}
                          name="searchOrder"
                          onChange={(e) => handleSearchChange(e)}
                          value={order.queryName || ""}
                          checked={newSearch.searchOrder === order.queryName}
                        />
                        <label htmlFor={'order'+index}>{order.name}</label>
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

                 
                    <CustomButton
                      type="submit"
                      color="dark"
                      onClick={(e) => handleFormSubmit(e)}
                    >
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
