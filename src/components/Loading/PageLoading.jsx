import React from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/layout/layout-selectors";

import "./PageLoading.scss";

const PageLoading = () => {
  const currentTheme = useSelector(selectTheme);
  return (
    <div className={`PageLoading ${currentTheme}-theme-m`}>
      <div className="loading">
        <div className="loading__dots">
          <div className="loading__dot"></div>
          <div className="loading__dot"></div>
          <div className="loading__dot"></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoading;
