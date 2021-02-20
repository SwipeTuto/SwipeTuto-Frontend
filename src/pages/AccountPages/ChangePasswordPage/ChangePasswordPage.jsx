import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../../components/FormInputs/FormInput";
import CustomButton from "../../../components/LayoutComponents/CustomButton/CustomButton";
import { selectTheme } from "../../../redux/layout/layout-selectors";
// import axios from "axios";
import { withRouter } from "react-router-dom";
import { resetConfirmPassowrd } from "../../../services/userService";
import { openNotificationPopup } from "../../../redux/layout/layout-actions";

// path pour accéder au component : /account/change-password
const ChangePasswordPage = ({ match }) => {
  const dispatch = useDispatch();
  // console.log(match.params);
  const { uidb64, token } = match.params;
  const currentTheme = useSelector(selectTheme);
  const [submitOk, setSubmitOk] = useState(false);
  // const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const allInput = [...document.querySelectorAll(".FormInput")];

  // useEffect(() => {
  //   console.log(password, passwordConfirmation);
  // }, [passwordConfirmation, password]);

  const getValue = (name, value) => {
    // if (name === "oldPassword") setOldPassword(value);
    if (name === "password") setPassword(value);
    if (name === "passwordConfirm") setPasswordConfirmation(value);
  };

  useEffect(() => {
    const readyToSubmit = allInput.every((input) => input.classList.contains("valid-input"));

    if (readyToSubmit && readyToSubmit === true) {
      setSubmitOk(true);
    } else {
      setSubmitOk(false);
    }
  }, [passwordConfirmation, allInput]);

  const handleClick = (e) => {
    e.preventDefault();
    // console.log(password, passwordConfirmation, uidb64, token);
    if (password && passwordConfirmation && uidb64 && token) {
      const userNewPasswordObj = {
        new_password1: password,
        new_password2: passwordConfirmation,
        token: token,
        uid: uidb64,
      };
      // console.log(userNewPasswordObj);
      resetConfirmPassowrd(userNewPasswordObj);
    } else {
      dispatch(openNotificationPopup("error", "Une erreur est survenue. Merci de réessayer plus tard ou de signaler le problème."));
    }

    // return axios
    //   .post(`http://localhost:8000/dj-rest-auth/password/reset/`, { email: "a.gomes115@hotmail.com" })
    //   .then((rep) => {
    //     console.log(rep);
    //     return rep;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     return err;
    //   });
    // faire le call api avec userPasswordsObj
    // console.log(userPasswordsObj);
  };

  return (
    <div className={`ChangePasswordPage ${currentTheme}-theme-d`}>
      <h2 className="title title-2">Changez votre mot de passe</h2>
      <div className="ChangePasswordPage__form-wrapper">
        <form className="ChangePasswordPage__form">
          {/* <FormInput idFor="oldMdp" label="Votre ancien mot de passe :" type="password" name="oldPassword" required={true} getValue={getValue} />*/}
          <FormInput idFor="mdp" label="Votre nouveau mot de passe :" type="password" name="password" required={true} getValue={getValue} />

          {/* <FormInput idFor="mdp" label="Nouveau mot de passe:" type="password" name="oldPassword" required={true} getValue={getValue} /> */}
          <FormInput
            idFor="mdp2"
            label="Confirmer votre nouveau mot de passe :"
            type="password"
            name="passwordConfirm"
            required={true}
            getValue={getValue}
            valueToCompare={password}
          />
          <CustomButton onClick={(e) => handleClick(e)} color="light" type="submit" disabled={submitOk === true ? "" : "disabled"}>
            Changer le mot de passe
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default withRouter(ChangePasswordPage);
// {{ protocol }}://{{ domain }}{% url 'password_reset_confirm' uidb64=uid token=token %}
