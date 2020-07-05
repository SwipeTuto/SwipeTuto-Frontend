import React from "react";
import { useSelector } from "react-redux";

import {
  selectSearchCategory,
  selectSearchTopic,
  selectSearchWords,
  selectSearchOrder,
  selectSearchPage,
} from "../redux/filter/filter-selectors";

const GetSearchStore = () => {
  const searchTopic = useSelector(selectSearchTopic);
  const searchCategory = useSelector(selectSearchCategory);
  const searchWords = useSelector(selectSearchWords);
  const searchOrder = useSelector(selectSearchOrder);
  const searchPage = useSelector(selectSearchPage);

  return {
    searchWords,
    searchTopic,
    searchCategory,
    searchOrder,
    searchPage,
  };
};

export default GetSearchStore;
