import { useSelector } from "react-redux";

import {
  selectSearchCategory,
  selectSearchTopic,
  selectSearchWords,
  selectSearchOrder,
} from "../redux/filter/filter-selectors";

const SearchLinkRedirect = () => {
  const searchTopic = useSelector(selectSearchTopic);
  const searchCategory = useSelector(selectSearchCategory);
  const searchWords = useSelector(selectSearchWords);
  const searchOrder = useSelector(selectSearchOrder);

  return `/search?${searchWords ? `search=${searchWords}` : ""}${
    searchTopic ? `&topic=${searchTopic}` : ""
  }${searchOrder ? `&order=${searchOrder}` : ""}${
    searchCategory ? `&category=${searchCategory}` : ""
  }`;
};

export default SearchLinkRedirect;




