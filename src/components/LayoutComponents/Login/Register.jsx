// Présent dans App.js dans une Route ("/")

import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// redux
import { registerAction } from "../../../redux/user/user-actions";
import { selectUserErrors } from "../../../redux/user/user-selectors";

// helper
import { loginGoogle, loginGit } from "../../../services/userService";
import { checkRegexInput, errorMessageToDisplay } from "../../../helper/index";

// components
import CustomButton from "../CustomButton/CustomButton";

// assets
import { ReactComponent as GoogleLogo } from "../../../assets/images/logo-google.svg";
import { ReactComponent as GithubLogo } from "../../../assets/images/logo-github.svg";
import "./LoginAndRegister.scss";
import FormInput from "../../FormInputs/FormInput";

// Props history, location, match, depuis react router dom
const Register = (props) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [submitOk, setSubmitOk] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const userErrors = useSelector(selectUserErrors);
  const allInput = [...document.querySelectorAll(".FormInput")];

  // scroll reset
  useEffect(() => {
    if (window.scrollY) {
      window.scroll(0, 0);
    }
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(registerAction(user));
  };

  const handleClickGoogle = (e) => {
    loginGoogle();
  };
  const handleClickGit = (e) => {
    loginGit();
  };

  const getValue = (name, value) => {
    if (name === password) setPassword(value);
    if (name === passwordConfirmation) setPasswordConfirmation(value);
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    const readyToSubmit = allInput.every((input) =>
      input.classList.contains("valid-input")
    );

    if (readyToSubmit) {
      setSubmitOk(false);
    } else {
      setSubmitOk(true);
    }
  }, [user, passwordConfirmation, allInput]);

  return (
    <div className="Register">
      <h1 className="title title-1">S'inscrire</h1>
      <div className="Login__google">
        <CustomButton color="white" onClick={(e) => handleClickGoogle(e)}>
          <GoogleLogo />
          Google
        </CustomButton>
        <CustomButton color="white" onClick={(e) => handleClickGit(e)}>
          <GithubLogo />
          Git
        </CustomButton>
      </div>
      <p className="Login__errors">
        {userErrors &&
          userErrors !== 400 &&
          "Une erreur est survenue. Si l'erreur persiste, merci de nous le signaler."}
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
          // firstValue={}
        />

        <label htmlFor="mdp2" className="FormInput__label">
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
        }

        <CustomButton
          onClick={(e) => handleClick(e)}
          color="light"
          type="submit"
          disabled={submitOk}
        >
          Inscription
        </CustomButton>
      </form>
      <span className="horizontal-separation-primary-light"></span>
      <Link to="/connexion/login" className="LoginPage__link">
        Déjà un compte ?
      </Link>
    </div>
  );
};

export default Register;
