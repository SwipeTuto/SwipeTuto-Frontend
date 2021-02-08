import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormInput from "../../../components/FormInputs/FormInput";
import CustomButton from "../../../components/LayoutComponents/CustomButton/CustomButton";
import { selectTheme } from "../../../redux/layout/layout-selectors";
import axios from "axios";

// path pour accéder au component : /account/change-password
const ChangePasswordPage = () => {
  const currentTheme = useSelector(selectTheme);
  const [submitOk, setSubmitOk] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const allInput = [...document.querySelectorAll(".FormInput")];

  const getValue = (name, value) => {
    if (name === "oldPassword") setOldPassword(value);
    if (name === "password") setPassword(value);
    if (name === "passwordConfirmation") setPasswordConfirmation(value);
  };

  useEffect(() => {
    console.log(oldPassword, password, passwordConfirmation);
  }, [oldPassword, password, passwordConfirmation]);
  useEffect(() => {
    console.log(submitOk);
  }, [submitOk]);

  useEffect(() => {
    const readyToSubmit = allInput.every((input) => input.classList.contains("valid-input"));

    console.log(readyToSubmit);

    if (readyToSubmit && readyToSubmit === true) {
      setSubmitOk(false);
      console.log("CALL READY");
    } else {
      setSubmitOk(true);
      console.log("CALL NOT READY");
    }
  }, [password, oldPassword, passwordConfirmation, allInput]);

  const handleClick = (e) => {
    e.preventDefault();
    const userPasswordsObj = {
      oldPassword,
      password,
      passwordConfirmation,
    };
    
    return axios.post(`http://localhost:8000/dj-rest-auth/password/reset/`, {"email": "a.gomes115@hotmail.com"}).then(rep => {
      console.log(rep)
      return rep
    }).catch(err => {
      console.log(err)
      return err
    })
    // faire le call api avec userPasswordsObj
    console.log(userPasswordsObj);
  };

  return (
    <div className={`ChangePasswordPage ${currentTheme}-theme-d`}>
      <h2 className="title title-2">Changez votre mot de passe</h2>
      <div className="ChangePasswordPage__form-wrapper">
        <form className="ChangePasswordPage__form">
          <FormInput idFor="mdp" label="Nouveau mot de passe:" type="password" name="oldPassword" required={true} getValue={getValue} />
          <FormInput
            idFor="mdp2"
            label="Confirmer votre mot de passe :"
            type="password"
            name="passwordConfirm"
            required={true}
            getValue={getValue}
            valueToCompare={password}
          />
          <CustomButton onClick={(e) => handleClick(e)} color="light" type="submit" disabled={submitOk}>
            Changer le mot de passe
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
