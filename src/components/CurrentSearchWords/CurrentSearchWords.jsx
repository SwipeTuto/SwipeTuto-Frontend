import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentSearch } from "../../redux/filter/filter-selectors";
import { ReactComponent as CloseLogo } from "../../assets/images/close-circle.svg";
import {
  deleteCurrentSearch,
  setSearchType,
} from "../../redux/filter/filter-actions";

import "./CurrentSearchWords.scss";

const CurrentSearchWords = () => {
  const dispatch = useDispatch();
  const currentSearch = useSelector(selectCurrentSearch);

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteCurrentSearch());
    dispatch(setSearchType("all"));
  };

  return (
    <>
      {currentSearch ? (
        <div className="currentSearch">
          <div className="currentSearch__button">
            Recherche actuelle : {currentSearch}
            <CloseLogo
              className="currentSearch__close"
              onClick={(e) => handleDelete(e)}
            />
          </div>
        </div>
      ) : (
        <div className="currentSearch--hide"></div>
      )}
    </>
  );
};

export default CurrentSearchWords;
