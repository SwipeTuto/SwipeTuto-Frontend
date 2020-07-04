import React from "react";
import { useSelector } from "react-redux";

import {
  selectSearchCategory,
  selectSearchTopic,
  selectSearchWords,
  selectSearchOrder,
  selectSearchPage,
} from "../redux/filter/filter-selectors";

const SearchLinkRedirect = () => {
  const searchTopic = useSelector(selectSearchTopic);
  const searchCategory = useSelector(selectSearchCategory);
  const searchWords = useSelector(selectSearchWords);
  const searchOrder = useSelector(selectSearchOrder);
  const currentSearchPageNumber = useSelector(selectSearchPage);

  // return `/search?${searchWords ? `search=${searchWords}&` : ""}${
  //   searchTopic ? `topic=${searchTopic}&` : ""
  // }${searchOrder ? `order=${searchOrder}&` : ""}${
  //   searchCategory ? `category=${searchCategory}&` : ""
  // }${currentSearchPageNumber ? `page=${currentSearchPageNumber}` : ""}`;

  return `/search?${searchWords ? `search=${searchWords}&` : ""}${
    searchTopic ? `topic=${searchTopic}&` : ""
  }${searchOrder ? `order=${searchOrder}&` : ""}${
    searchCategory ? `category=${searchCategory}&` : ""
  }${currentSearchPageNumber ? `page=${currentSearchPageNumber}` : ""}`;
};

export default SearchLinkRedirect;
