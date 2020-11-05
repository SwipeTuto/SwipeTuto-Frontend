import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// redux
import {
  selectCurrentSearch,
  selectSearchWords,
} from "../../../redux/filter/filter-selectors";
import {
  setCurrentSearch,
  deleteCurrentSearch,
} from "../../../redux/filter/filter-actions";
import { closeMobileNav } from "../../../redux/layout/layout-actions";

// components

// assets
import { ReactComponent as SearchLogo } from "../../../assets/images/search.svg";
import { ReactComponent as CloseLogo } from "../../../assets/images/close-circle.svg";

import "./SearchForm.scss";

const SearchForm = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const searchWords = useSelector(selectSearchWords);
  const currentSearch = useSelector(selectCurrentSearch);

  useEffect(() => {
    if (searchWords === null) {
      setSearchInput("");
    }
  }, [dispatch, searchWords]);

  const handleChange = (e) => {
    const searchText = e.target.value;
    setSearchInput(searchText);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentSearchCopy = { ...currentSearch, searchWords: searchInput };
    dispatch(setCurrentSearch(currentSearchCopy));
    dispatch(closeMobileNav());
  };

  const handleSearchDelete = () => {
    setSearchInput("");
    dispatch(deleteCurrentSearch());
  };

  return (
    <form className="SearchForm" onSubmit={(e) => handleSubmit(e)}>
      <div className="SearchForm__search">
        {searchWords ? (
          <div
            className="SearchForm__button"
            onClick={() => handleSearchDelete()}
          >
            <CloseLogo
              className="SearchForm__button--logo"
              pointerEvents="none"
            />
          </div>
        ) : (
            <button type="submit" className="SearchForm__button">
              <SearchLogo className="SearchForm__button--logo" />
            </button>
          )}
        <input
          className="SearchForm__search--input"
          id="search"
          name="search"
          type="text"
          placeholder="Recherche..."
          onChange={(e) => handleChange(e)}
          value={searchInput || ""}
        />
      </div>
    </form>
  );
};

export default SearchForm;
