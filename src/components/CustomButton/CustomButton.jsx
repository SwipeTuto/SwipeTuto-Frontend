import React from "react";

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
