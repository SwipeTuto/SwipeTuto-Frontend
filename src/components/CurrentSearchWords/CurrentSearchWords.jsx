import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

import { ReactComponent as CloseLogo } from "../../assets/images/close-circle.svg";

import { selectCurrentSearch } from "../../redux/filter/filter-selectors";
import {
  deleteCurrentSearch,
  setType,
} from "../../redux/filter/filter-actions";
import { getCardsAction } from "../../redux/cards/cards-actions";

import "./CurrentSearchWords.scss";

const CurrentSearchWords = ({ history }) => {
  const dispatch = useDispatch();
  const currentSearch = useSelector(selectCurrentSearch);

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteCurrentSearch());
    dispatch(getCardsAction());
    dispatch(setType("all"));
    history.push("/cards");
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

export default withRouter(CurrentSearchWords);
