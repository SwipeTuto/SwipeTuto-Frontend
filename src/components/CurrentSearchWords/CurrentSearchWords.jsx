import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

import { ReactComponent as CloseLogo } from "../../assets/images/close-circle.svg";

import {
  selectSearchWords,
  selectSearchLangage,
  selectSearchCategory,
  selectSearchOrder,
  selectCurrentCardsGridPage,
} from "../../redux/filter/filter-selectors";
import { deleteCurrentSearch } from "../../redux/filter/filter-actions";
import { getCardsAction } from "../../redux/cards/cards-actions";

import "./CurrentSearchWords.scss";

const CurrentSearchWords = ({ history }) => {
  const dispatch = useDispatch();
  const [redirection, setRedirection] = useState(false);

  const searchLangage = useSelector(selectSearchLangage);
  const searchCategory = useSelector(selectSearchCategory);
  const searchWords = useSelector(selectSearchWords);
  const searchOrder = useSelector(selectSearchOrder);
  const currentSearchPageNumber = useSelector(selectCurrentCardsGridPage);

  const handleDelete = (e) => {
    e.stopPropagation();
    const itemToDelete = () =>
      e.target.dataset.searchitem ? e.target.dataset.searchitem : null;
    console.log(itemToDelete());
    dispatch(deleteCurrentSearch(itemToDelete()));
    setRedirection(true);
    dispatch(getCardsAction());
  };

  const paramsArray = [
    { value: searchWords, name: "searchWords" },
    { value: searchLangage, name: "searchLangage" },
    { value: searchCategory, name: "searchCategory" },
  ];

  useEffect(() => {
    setRedirection(false);
  }, []);

  return (
    <>
      {redirection && (
        <Redirect
          to={`/search?${searchWords ? `search=${searchWords}&` : ""}${
            searchLangage ? `langage=${searchLangage}&` : ""
          }${searchOrder ? `order=${searchOrder}&` : ""}${
            searchCategory ? `category=${searchCategory}&` : ""
          }${currentSearchPageNumber ? `page=${currentSearchPageNumber}` : ""}`}
        />
      )}

      {(searchWords || searchLangage || searchCategory) && (
        <div className="currentSearch">
          {paramsArray &&
            paramsArray.map(
              (param, index) =>
                param &&
                param.value && (
                  <div className="currentSearch__button">
                    {param.value}
                    <div
                      onClick={(e) => handleDelete(e)}
                      data-searchitem={param.name}
                      className="currentSearch__close"
                    >
                      <CloseLogo
                        className="currentSearch__close--logo"
                        pointerEvents="none"
                      />
                    </div>
                  </div>
                )
            )}
        </div>
      )}
    </>
  );
};

export default withRouter(CurrentSearchWords);
