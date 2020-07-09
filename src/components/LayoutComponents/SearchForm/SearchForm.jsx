import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  selectSearchCategory,
  selectSearchTopic,
  selectSearchWords,
  selectCurrentSearch,
} from "../../../redux/filter/filter-selectors";
import {
  searchAction,
  getCardAfterfilterAction,
  setCurrentSearch,
  deleteCurrentSearch,
} from "../../../redux/filter/filter-actions";
import { closeMobileNav } from "../../../redux/layout/layout-actions";
import { ReactComponent as SearchLogo } from "../../../assets/images/search.svg";
import { ReactComponent as CloseLogo } from "../../../assets/images/close-circle.svg";
import SearchLinkRedirect from "../../../helper/SearchLinkRedirect";

import "./SearchForm.scss";

const SearchForm = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [redirection, setRedirection] = useState(false);
  const currentSearch = useSelector(selectCurrentSearch);
  const searchWords = useSelector(selectSearchWords);
  const searchTopic = useSelector(selectSearchTopic);
  const searchCategory = useSelector(selectSearchCategory);

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
    // dispatch(searchAction(searchInput));
    dispatch(
      getCardAfterfilterAction({ ...currentSearch, searchWords: searchInput })
    );
    dispatch(closeMobileNav());
    setRedirection(true);
  };

  const handleSearchDelete = () => {
    setSearchInput("");
    // dispatch(deleteCurrentSearch("searchWords"));
    dispatch(deleteCurrentSearch());
    dispatch(
      getCardAfterfilterAction({
        searchWords: null,
        searchTopic: null,
        searchCategory: null,
        searchOrder: "-created",
        searchPage: 1,
      })
    );
    setRedirection(true);
  };

  const redirectLink = SearchLinkRedirect();

  return (
    <>
      {redirection && <Redirect to={redirectLink} />}
      <form className="SearchForm" onSubmit={(e) => handleSubmit(e)}>
        <button type="submit" className="SearchForm__button">
          <SearchLogo className="SearchForm__button--logo" />
        </button>
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
          {searchInput && (
            <div
              className="SearchForm__search--delete"
              onClick={() => handleSearchDelete()}
            >
              <CloseLogo className="delete-logo" pointerEvents="none" />
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default SearchForm;
