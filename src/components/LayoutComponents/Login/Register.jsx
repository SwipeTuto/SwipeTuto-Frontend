// Présent dans App.js dans une Route ("/")

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// redux
import { loginFacebookAction, loginGoogleAction, registerAction } from "../../../redux/user/user-actions";
import { selectUserErrors } from "../../../redux/user/user-selectors";

// helper
import { loginGoogle } from "../../../services/userService";

// components
import CustomButton from "../CustomButton/CustomButton";

// assets
import { ReactComponent as GoogleLogo } from "../../../assets/images/logo-google.svg";
import { ReactComponent as FacebookLogo } from "../../../assets/images/logo-facebook.svg";
import "./LoginAndRegister.scss";
import FormInput from "../../FormInputs/FormInput";
import { selectTheme } from "../../../redux/layout/layout-selectors";

// Props history, location, match, depuis react router dom
const Register = ({ title }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [submitOk, setSubmitOk] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const userErrors = useSelector(selectUserErrors);
  const allInput = [...document.querySelectorAll(".FormInput")];
  const currentTheme = useSelector(selectTheme);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(registerAction(user));
  };

  // const handleClickGoogle = (e) => {
  //   loginGoogle();
  // };
  // const handleClickGit = (e) => {
  //   // loginGit();
  // };

  const handleClickGoogle = (e) => {
    e.stopPropagation();
    dispatch(loginGoogleAction());
  };
  const handleClickFacebook = (e) => {
    e.stopPropagation();
    dispatch(loginFacebookAction());
  };

  const getValue = (name, value) => {
    if (name === "password") setPassword(value);
    if (name === "passwordConfirmation") setPasswordConfirmation(value);
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    const readyToSubmit = allInput.every((input) => input.classList.contains("valid-input"));

    if (readyToSubmit) {
      setSubmitOk(false);
    } else {
      setSubmitOk(true);
    }
  }, [user, passwordConfirmation, allInput]);

  return (
    <div className={`Register ${currentTheme}-theme`}>
      <h2 className="title title-2">{title ? title : "Bienvenue chez Swipetuto !"}</h2>
      <div className="Login__google">
        <CustomButton color="white" onClick={(e) => handleClickGoogle(e)}>
          <GoogleLogo />
          Continuer avec Google
        </CustomButton>
        <CustomButton color="white" onClick={(e) => handleClickFacebook(e)}>
          <FacebookLogo />
          Continuer avec Facebook
        </CustomButton>
      </div>
      <p className="Login__ou">Ou :</p>
      <p className="Login__errors">
        {userErrors && userErrors !== 400 && "Une erreur est survenue. Si l'erreur persiste, merci de nous le signaler."}
      </p>
      <form className="Register__form">
        <FormInput
          idFor="nom"
          label="Votre nom d'utilisateur :"
          type="text"
          name="username"
          getValue={getValue}
          required={true}
          firstValue={user.username || ""}
        />
        <FormInput
          idFor="email"
          label="Votre email :"
          type="email"
          name="email"
          required={true}
          getValue={getValue}
          // firstValue={}
        />
        <FormInput
          idFor="mdp"
          label="Votre mot de passe :"
          type="password"
          name="password"
          required={true}
          getValue={getValue}
          // firstValue={}
        />
        <FormInput
          idFor="mdp2"
          label="Confirmer votre mot de passe :"
          type="password"
          name="passwordConfirm"
          required={true}
          getValue={getValue}
          valueToCompare={password}
          // firstValue={}
        />

        {/* <label htmlFor="mdp2" className="FormInput__label">
          Confirmez le Mot de passe :
        </label>
        <input
          name="passwordConfirm"
          value={passwordConfirmation || ""}
          onChange={(e) => {
            setPasswordConfirmation(e.target.value);
          }}
          type="password"
          id="mdp2"
          className={`FormInput ${
            !passwordConfirmation
              ? "unset-input"
              : passwordConfirmation !== password || passwordConfirmation === ""
              ? "invalid-input"
              : "valid-input"
          }`}
          required
        />
        {
          <p
            className={`${
              passwordConfirmation !== password
                ? "input__message error__message"
                : "input__message-hide"
            }`}
            data-inputfor="passwordConfirm"
          >
            Ce mot de passe ne correspond pas à celui mentionné précédemment.
          </p>
        } */}

        <CustomButton onClick={(e) => handleClick(e)} color="light" type="submit" disabled={submitOk}>
          Inscription
        </CustomButton>
      </form>
      <span className="horizontal-separation-primary-light"></span>
      <Link to="/connexion/login" className="LoginPage__link">
        <CustomButton>Déjà un compte ?</CustomButton>
      </Link>
    </div>
  );
};

export default Register;
