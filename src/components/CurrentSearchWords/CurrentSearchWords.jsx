import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

import { ReactComponent as CloseLogo } from "../../assets/images/close-circle.svg";

import {
  selectSearchWords,
  selectSearchTopic,
  selectSearchCategory,
} from "../../redux/filter/filter-selectors";
import {
  topicArray,
  categoryArray,
  getCategoriesArray,
} from "../../helper/index";
import { deleteCurrentSearch } from "../../redux/filter/filter-actions";

import "./CurrentSearchWords.scss";

const CurrentSearchWords = ({ history }) => {
  const dispatch = useDispatch();

  const searchTopic = useSelector(selectSearchTopic);
  const searchCategory = useSelector(selectSearchCategory);
  const searchWords = useSelector(selectSearchWords);

  const handleDelete = (e) => {
    e.stopPropagation();
    const itemToDelete = e.target.dataset.searchitem
      ? e.target.dataset.searchitem
      : null;
    if (itemToDelete === "searchTopic" && searchTopic) {
      dispatch(deleteCurrentSearch("searchCategory"));
      dispatch(deleteCurrentSearch(itemToDelete));
    } else {
      dispatch(deleteCurrentSearch(itemToDelete));
    }
  };

  const paramsArray = [
    { name: "searchWords", value: searchWords },
    { name: "searchTopic", value: searchTopic },
    { name: "searchCategory", value: searchCategory },
  ];

  const getParamName = (param) => {
    switch (param.name) {
      case "searchTopic":
        const topic = topicArray.find((item) => item.queryName === param.value);
        const topicIndex = topicArray.indexOf(topic);
        return `Langage : ${topicArray[topicIndex].name}`;

      case "searchCategory":
        const categoryArrayCopy = getCategoriesArray(searchTopic);
        const category = categoryArrayCopy.find(
          (item) => item.queryName === param.value
        );
        const categoryIndex = categoryArrayCopy.indexOf(category);
        return `Catégorie : ${categoryArrayCopy[categoryIndex].name}`;
      case "searchWords":
        return `Termes : ${param.value}`;

      default:
        return param.value;
    }
  };

  return (
    <>
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
