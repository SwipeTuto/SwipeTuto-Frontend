import React from "react";

import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading__spinner"></div>
      <div className="loading__message">Chargement...</div>
    </div>
  );
};

export default Loading;
