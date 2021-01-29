import React from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/layout/layout-selectors";

import "./FormInput.scss";

const FormSelect = ({ children, idFor, label, name, getValue, firstValue }) => {
  const currentTheme = useSelector(selectTheme);
  return (
    <>
      <label htmlFor={idFor && idFor} className="FormInput__label">
        {label && label}
      </label>
      <select
        onChange={(e) => getValue(name, e.target.value)}
        name={name && name}
        id={idFor && idFor}
        className={`FormInput ${currentTheme}-theme-m`}
        value={firstValue || ""}
      >
        {children}
      </select>
    </>
  );
};

export default FormSelect;
