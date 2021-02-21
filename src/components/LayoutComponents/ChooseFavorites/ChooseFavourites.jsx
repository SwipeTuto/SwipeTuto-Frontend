import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesArray } from "../../../helper/functions/getCategoriesArray";
import { topicArray } from "../../../helper/functions/getTopicsArray";
import { selectUserLoaded } from "../../../redux/layout/layout-selectors";
import { getCurrentUserAction, updateUserPrefAction } from "../../../redux/user/user-actions";
import { selectCurrentUserCategoriesPreferences } from "../../../redux/user/user-selectors";
import PageLoading from "../../Loading/PageLoading";

import "./ChooseFavourites.scss";

const ChooseFavourites = () => {
  const dispatch = useDispatch();
  const categoriesPref = useSelector(selectCurrentUserCategoriesPreferences);
  const isLoaded = useSelector(selectUserLoaded);

  const toggleCategoryPreference = (topicName, categoryName) => {
    dispatch(updateUserPrefAction(topicName, categoryName));
  };

  useEffect(() => {
    dispatch(getCurrentUserAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!isLoaded && <PageLoading />}
      <div className="ChooseFavourites">
        {topicArray.map(
          (topic, index) =>
            topic.queryName !== null && (
              <div
                className="ChooseFavourites__topic ChooseFavourites__form"
                key={`${topic.queryName}-${index}`}
                style={{ backgroundImage: `url(${require("../../../assets/images/illustrations/" + topic.queryName + ".jpg")}) ` }}
              >
                <form>
                  <div className="ChooseFavourites__topic--input">
                    <h3 className="title title-3">{topic.name}</h3>
                  </div>
                  <div className="ChooseFavourites__category">
                    {getCategoriesArray(topic.queryName).map(
                      (category, index) =>
                        category.queryName !== null &&
                        category.queryName !== "autre" && (
                          <div className="ChooseFavourites__category--input" key={`${category.queryName}-${index}`}>
                            <input
                              type="checkbox"
                              name={`${category.queryName}-all`}
                              id={`${category.queryName}-${topic.queryName}`}
                              onChange={() => toggleCategoryPreference(topic.queryName, category.queryName)}
                              checked={categoriesPref?.some((item) => item === category.queryName)}
                            />
                            <label htmlFor={`${category.queryName}-${topic.queryName}`}>{`${category.name}`}</label>
                          </div>
                        )
                    )}
                  </div>
                </form>
              </div>
            )
        )}
      </div>
    </>
  );
};

export default ChooseFavourites;
