import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

import { ReactComponent as CloseLogo } from "../../assets/images/close-circle.svg";

import {
  selectSearchWords,
  selectSearchTopic,
  selectSearchCategory,
  selectCurrentSearch,
} from "../../redux/filter/filter-selectors";
import { topicArray, categoryArray } from "../../helper/index";
import {
  deleteCurrentSearch,
  getCardAfterfilterAction,
  setCurrentSearch,
  getCardsAction,
} from "../../redux/filter/filter-actions";
import SearchLinkRedirect from "../../helper/SearchLinkRedirect";

import "./CurrentSearchWords.scss";

const CurrentSearchWords = ({ history }) => {
  const dispatch = useDispatch();
  const [redirection, setRedirection] = useState(false);

  const searchTopic = useSelector(selectSearchTopic);
  const searchCategory = useSelector(selectSearchCategory);
  const searchWords = useSelector(selectSearchWords);
  const currentSearch = useSelector(selectCurrentSearch);

  const handleDelete = (e) => {
    e.stopPropagation();
    const itemToDelete = () =>
      e.target.dataset.searchitem ? e.target.dataset.searchitem : null;
    dispatch(deleteCurrentSearch(itemToDelete()));
    dispatch(
      getCardAfterfilterAction({
        ...currentSearch,
        [e.target.dataset.searchitem]: null,
        searchPage: 1,
      })
    );
    dispatch(setCurrentSearch("searchPage", 1));
    setRedirection(true);
  };

  const paramsArray = [
    { name: "searchWords", value: searchWords },
    { name: "searchTopic", value: searchTopic },
    { name: "searchCategory", value: searchCategory },
  ];

  useEffect(() => {
    setRedirection(false);
  }, []);

  const getParamName = (param) => {
    switch (param.name) {
      case "searchTopic":
        const topic = topicArray.find((item) => item.queryName === param.value);
        const topicIndex = topicArray.indexOf(topic);
        return `Langage : ${topicArray[topicIndex].name}`;

      case "searchCategory":
        const category = categoryArray.find(
          (item) => item.queryName === param.value
        );
        const categoryIndex = categoryArray.indexOf(category);
        return `Catégorie : ${categoryArray[categoryIndex].name}`;
      case "searchWords":
        return `Termes : ${param.value}`;

      default:
        return param.value;
    }
  };
  const redirectLink = SearchLinkRedirect();

  return (
    <>
      {redirection && <Redirect to={redirectLink} />}

      {(searchWords || searchTopic || searchCategory) && (
        <div className="currentSearch">
          {paramsArray &&
            paramsArray.map(
              (param, index) =>
                param &&
                param.value && (
                  <div className="currentSearch__button" key={index}>
                    {getParamName(param)}

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
