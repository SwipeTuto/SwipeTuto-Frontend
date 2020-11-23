import React from "react";

import "./FormInput.scss";

const FormSelect = ({ children, idFor, label, name, getValue, firstValue }) => {
  console.log(firstValue);
  return (
    <>
      <label htmlFor={idFor && idFor} className="FormInput__label">
        {label && label}
      </label>
      <select onChange={(e) => getValue(name, e.target.value)} name={name && name} id={idFor && idFor} className="FormInput" value={firstValue || ""}>
        {children}
      </select>
    </>
  );
};

export default FormSelect;
