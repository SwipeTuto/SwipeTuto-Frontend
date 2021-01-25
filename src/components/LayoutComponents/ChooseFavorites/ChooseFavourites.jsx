import React from "react";
import { getCategoriesArray } from "../../../helper/functions/getCategoriesArray";
import { topicArray } from "../../../helper/functions/getTopicsArray";

import "./ChooseFavourites.scss";

const ChooseFavourites = () => {
  return (
    <div className="ChooseFavourites">
      {topicArray.map(
        (topic, index) =>
          topic.queryName !== null && (
            <div
              className="ChooseFavourites__topic ChooseFavourites__form"
              style={{ backgroundImage: `url(${require("../../../assets/images/illustrations/" + topic.queryName + ".jpg")}) ` }}
            >
              <form>
                <div className="ChooseFavourites__topic--input">
                  <input type="checkbox" name={`${topic.queryName}-all`} id={`${topic.queryName}-all`} />
                  <label htmlFor={`${topic.queryName}-all`}>{`${topic.name} - Général`}</label>
                </div>
                <div className="ChooseFavourites__category">
                  {getCategoriesArray(topic.queryName).map(
                    (category, index) =>
                      category.queryName !== null &&
                      category.queryName !== "autre" && (
                        <div className="ChooseFavourites__category--input">
                          <input type="checkbox" name={`${category.queryName}-all`} id={`${category.queryName}-${topic.queryName}`} />
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
  );
};

export default ChooseFavourites;
