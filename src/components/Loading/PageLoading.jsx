import React from "react";

import "./PageLoading.scss";

const PageLoading = () => {
  return (
    <div className="PageLoading">
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
