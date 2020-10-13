import React, { useCallback, useEffect, useState } from "react";

import "./FormInput.scss";
import { checkRegexInput, errorMessageToDisplay } from "../../helper";

const FormTextarea = ({
  idFor,
  label,
  type,
  name,
  getValue,
  firstValue,
  required,
  placeholder,
  id,
}) => {
  const [data, setData] = useState("");
  const [isValid, setIsValid] = useState("unset");
  const formInputEl = document.querySelector(`.FormInput[name=${name}]`);
  const errorEl = document.querySelector(
    `.input__message[data-inputfor=${name}]`
  );

  const handleChange = useCallback(
    (e) => {
      const newValue = e.target && e.target.value;

      setData(newValue);

      if (newValue === "") {
        setIsValid("unset");
        if (errorEl) errorEl.textContent = "";
        if (formInputEl) formInputEl.classList.remove("valid-input");
        if (formInputEl) formInputEl.classList.remove("invalid-input");
      } else {
        let inputIsOk = checkRegexInput(name, newValue);
        if (inputIsOk === true) {
          setIsValid("valid");
          if (errorEl) errorEl.textContent = "";
          getValue(name, newValue);
        } else {
          setIsValid("invalid");
          if (errorEl) errorEl.textContent = errorMessageToDisplay(name);
        }
      }
    },
    [errorEl, formInputEl, getValue, name]
  );

  useEffect(() => {
    if (firstValue) setData(firstValue);
    if (firstValue === "") setData("");
  }, [firstValue]);

  return (
    <>
      <label htmlFor={idFor && idFor} className="FormInput__label">
        {label && label}
      </label>
      <textarea
        onFocus={(e) => handleChange(e)}
        onChange={(e) => handleChange(e)}
        type={type && type}
        name={name && name}
        value={data}
        id={idFor && idFor}
        className={`FormInput ${isValid}-input`}
        required={required && required}
        placeholder={placeholder}
      ></textarea>

      <p
        className="input__message error__message"
        data-inputfor={name && name}
      ></p>
    </>
  );
};

export default FormTextarea;
