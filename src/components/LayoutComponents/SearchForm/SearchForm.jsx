import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

// redux
import {
  selectSearchWords,
  selectCurrentSearch,
} from "../../../redux/filter/filter-selectors";
import {
  getCardAfterfilterAction,
  setCurrentSearch,
  deleteCurrentSearch,
} from "../../../redux/filter/filter-actions";
import { closeMobileNav } from "../../../redux/layout/layout-actions";

// helper
import { initialSearchState } from "../../../helper/index";

// components
import SearchLinkRedirect from "../../../helper/SearchLinkRedirect";

// assets
import { ReactComponent as SearchLogo } from "../../../assets/images/search.svg";
import { ReactComponent as CloseLogo } from "../../../assets/images/close-circle.svg";

import "./SearchForm.scss";

const SearchForm = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [redirection, setRedirection] = useState(false);
  const currentSearch = useSelector(selectCurrentSearch);
  const searchWords = useSelector(selectSearchWords);

  useEffect(() => {
    if (searchWords === null) {
      setSearchInput("");
    }

    setRedirection(true);
    setRedirection(false);
  }, [searchWords]);

  const handleChange = (e) => {
    const searchText = e.target.value;
    setSearchInput(searchText);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setCurrentSearch("searchWords", searchInput));
    dispatch(setCurrentSearch("searchPage", 1));
    // dispatch(searchAction(searchInput));
    // dispatch(
    //   getCardAfterfilterAction({
    //     ...currentSearch,
    //     searchWords: searchInput,
    //     searchPage: 1,
    //   })
    // );
    dispatch(closeMobileNav());
    setRedirection(true);
  };

  const handleSearchDelete = () => {
    setSearchInput("");
    // dispatch(deleteCurrentSearch("searchWords"));
    dispatch(deleteCurrentSearch());
    // dispatch(getCardAfterfilterAction(initialSearchState));
    setRedirection(true);
  };

  const redirectLink = SearchLinkRedirect();

  return (
    <>
      {redirection && <Redirect to={redirectLink} />}
      <form className="SearchForm" onSubmit={(e) => handleSubmit(e)}>
        <div className="SearchForm__search">
          <input
            className="SearchForm__search--input"
            id="search"
            name="search"
            type="text"
            placeholder="Recherche..."
            onChange={(e) => handleChange(e)}
            value={searchInput || ""}
          />
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
        </div>
      </form>
    </>
  );
};

export default SearchForm;
