import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

import { ReactComponent as CloseLogo } from "../../assets/images/close-circle.svg";

import { selectSearchWords } from "../../redux/filter/filter-selectors";
import { deleteCurrentSearch } from "../../redux/filter/filter-actions";
import { getCardsAction } from "../../redux/cards/cards-actions";

import "./CurrentSearchWords.scss";

const CurrentSearchWords = ({ history }) => {
  const dispatch = useDispatch();
  const searchWords = useSelector(selectSearchWords);

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteCurrentSearch());
    dispatch(getCardsAction());

    history.push("/cards");
  };

  return (
    <>
      {searchWords ? (
        <div className="currentSearch">
          <div className="currentSearch__button">
            Recherche actuelle : {searchWords}
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
