import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// redux
import { selectCurrentSearch, selectSearchWords } from "../../../redux/filter/filter-selectors";
import { setCurrentSearch } from "../../../redux/filter/filter-actions";
import { closeMobileNav } from "../../../redux/layout/layout-actions";

// assets
import { ReactComponent as SearchLogo } from "../../../assets/images/search.svg";
import { ReactComponent as CloseLogo } from "../../../assets/images/close-circle.svg";

import "./SearchForm.scss";
import { initialSearchState } from "../../../helper/constants";
import { selectTheme } from "../../../redux/layout/layout-selectors";

const SearchForm = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const searchWords = useSelector(selectSearchWords);
  const currentSearch = useSelector(selectCurrentSearch);
  const currentTheme = useSelector(selectTheme);

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
    dispatch(setCurrentSearch(initialSearchState));
  };

  return (
    <form className="SearchForm" onSubmit={(e) => handleSubmit(e)}>
      <div className={`SearchForm__search ${isFocus ? "focus" : ""} ${currentTheme}-theme-l`}>
        {searchWords ? (
          <div className="SearchForm__button" onClick={() => handleSearchDelete()}>
            <CloseLogo className="SearchForm__button--logo" pointerEvents="none" />
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
          placeholder="Recherche"
          onChange={(e) => handleChange(e)}
          value={searchInput || ""}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
      </div>
    </form>
  );
};

export default SearchForm;
