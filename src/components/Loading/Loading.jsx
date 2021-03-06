import React from "react";

import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading__dots">
        <div className="loading__dot"></div>
        <div className="loading__dot"></div>
        <div className="loading__dot"></div>
      </div>
      <div className="loading__message">Chargement ...</div>
    </div>
  );
};

export default Loading;
