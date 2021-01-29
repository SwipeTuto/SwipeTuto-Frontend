// Boutons réutilisables avec style adaptatif, présents dans NavTop,

import React from "react";
import "./CustomButton.scss";

const CustomButton = ({ children, color, ...otherProps }) => {
  const buttonColor = color ? color : null;

  return (
    <button
      className={`custom-button ${buttonColor ? buttonColor : ""}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default CustomButton;
