import React, { useCallback, useEffect, useState } from "react";

import "./FormInput.scss";
import { checkRegexInput, errorMessageToDisplay } from "../../helper/functions/inputsHandler";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/layout/layout-selectors";

const FormInput = ({ idFor, label, type, name, getValue, firstValue, required, placeholder, valueToCompare }) => {
  const [data, setData] = useState("");
  const [isValid, setIsValid] = useState("unset");
  const formInputEl = document.querySelector(`.FormInput[name=${name}]`);
  const errorEl = document.querySelector(`.input__message[data-inputfor=${name}]`);
  const currentTheme = useSelector(selectTheme);

  const handleChange = useCallback(
    (e) => {
      const newValue = e.target && e.target.value;

      setData(newValue);

      if (newValue === "") {
        getValue(name, "");
        setIsValid("unset");
        if (errorEl) errorEl.textContent = "";
        if (formInputEl) formInputEl.classList.remove("valid-input");
        if (formInputEl) formInputEl.classList.remove("invalid-input");
      } else {
        if (name === "passwordConfirm") {
          // console.log(valueToCompare, newValue);
          if (valueToCompare === newValue) {
            setIsValid("valid");
            if (errorEl) errorEl.textContent = "";
            // getValue(name, newValue);
          } else {
            setIsValid("invalid");
            if (errorEl) errorEl.textContent = errorMessageToDisplay(name);
            // getValue(name, newValue);
          }
        } else {
          let inputIsOk = checkRegexInput(name, newValue);
          if (inputIsOk === true) {
            setIsValid("valid");
            if (errorEl) errorEl.textContent = "";
            // getValue(name, newValue);
          } else {
            setIsValid("invalid");
            if (errorEl) errorEl.textContent = errorMessageToDisplay(name);
          }
        }
        getValue(name, newValue);
      }
    },
    [errorEl, formInputEl, getValue, name, valueToCompare]
  );

  useEffect(() => {
    if (firstValue || firstValue === "") setData(firstValue);
  }, [firstValue]);

  return (
    <>
      <label htmlFor={idFor && idFor} className="FormInput__label">
        {label && label}
      </label>
      <input
        onFocus={(e) => handleChange(e)}
        onChange={(e) => handleChange(e)}
        type={type && type}
        name={name && name}
        value={data}
        id={idFor && idFor}
        className={`FormInput ${isValid}-input ${currentTheme}-theme-m`}
        required={required && required}
        autoComplete="on"
        placeholder={placeholder}
      />

      <p className="input__message error__message" data-inputfor={name && name}></p>
    </>
  );
};

export default FormInput;
