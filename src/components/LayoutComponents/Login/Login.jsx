// Présent dans App.js dans une Route ("/")

import React, { useState, useEffect, useCallback } from "react";
import { withRouter, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// redux
import {
  loginAction,
  deleteUserErrors,
} from "../../../redux/user/user-actions";
import { selectUserErrors } from "../../../redux/user/user-selectors";

// helper
import { loginGoogle, loginGit } from "../../../services/userService";
import { checkRegexInput, errorMessageToDisplay } from "../../../helper/index";

// components
import CustomButton from "../CustomButton/CustomButton";

// assets
import { ReactComponent as GoogleLogo } from "../../../assets/images/logo-google.svg";
import { ReactComponent as GithubLogo } from "../../../assets/images/logo-github.svg";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ username: "", password: "" });
  const [submitOk, setSubmitOk] = useState(false);
  const userErrors = useSelector(selectUserErrors);

  // scroll reset
  useEffect(() => {
    if (window.scrollY) {
      window.scroll(0, 0);
    }
    dispatch(deleteUserErrors());
  }, [dispatch]);

  const handleClickGoogle = (e) => {
    loginGoogle();
  };
  const handleClickGit = (e) => {
    loginGit();
  };

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      const currentInput = document.querySelector(
        `.LoginPage input[name=${name}]`
      );
      const errorMessage = document.querySelector(
        `.LoginPage .input__message[data-inputfor=${name}`
      );

      currentInput.classList.remove("valid-input");
      currentInput.classList.add("invalid-input");

      if (value) {
        let inputIsOk = checkRegexInput(name, value); //test valeur avec regex, true or false

        if (!inputIsOk) {
          currentInput.classList.remove("valid-input");
          currentInput.classList.add("invalid-input");
          errorMessage.classList.add("error__message");
          errorMessage.textContent = errorMessageToDisplay(name);
        } else {
          errorMessage.classList.remove("error__message");
          currentInput.classList.remove("invalid-input");
          currentInput.classList.add("valid-input");
        }
      }
      setUser({ ...user, [name]: value });
    },
    [user]
  );

  const handleClick = (e) => {
    const { email, password } = user;
    e.preventDefault();
    if (user.email && user.password) {
      return dispatch(loginAction(email, password));
    }
  };

  useEffect(() => {
    const allInput = [
      ...document.querySelectorAll(".LoginPage .login__form--input"),
    ];
    const readyToSubmit = allInput.every((input) =>
      input.classList.contains("valid-input")
    );

    if (readyToSubmit) {
      setSubmitOk(false);
    } else {
      setSubmitOk(true);
    }
  }, [user, handleChange]);

  return (
    <div className="login">
      <h1 className="title title-1">Se connecter</h1>
      <div className="login__google">
        <CustomButton color="white" onClick={(e) => handleClickGoogle(e)}>
          <GoogleLogo />
          Google
        </CustomButton>
        <CustomButton color="white" onClick={(e) => handleClickGit(e)}>
          <GithubLogo />
          Git
        </CustomButton>
      </div>
      <p className="error__message">
        {userErrors
          ? userErrors === 400
            ? "Le compte n'a pas pu être trouvé. Merci de vérifier votre email et votre mot de passe."
            : "Une erreur est survenue. Si l'erreur persiste, merci de nous le signaler."
          : ""}
      </p>
      <form className="login__form">
        <label htmlFor="pseudo" className="login__form--label">
          {" "}
          Email :{" "}
        </label>
        <input
          onChange={(e) => handleChange(e)}
          type="email"
          name="email"
          value={user.email || ""}
          id="email_login"
          className="login__form--input invalid-input"
          required
        />
        <p className="input__message" data-inputfor="email"></p>
        <label htmlFor="mdp" className="login__form--label">
          {" "}
          Mot de passe :{" "}
        </label>
        <input
          onChange={(e) => handleChange(e)}
          value={user.password}
          type="password"
          name="password"
          id="mdp_login"
          className="login__form--input invalid-input"
          required
        />
        <p className="input__message" data-inputfor="password"></p>
        <CustomButton
          onClick={(e) => handleClick(e)}
          id="login-button"
          color="dark"
          type="submit"
          disabled={submitOk}
        >
          Connexion
        </CustomButton>
      </form>

      <span className="horizontal-separation-primary-light"></span>
      <Link to="/connexion/signup" className="LoginPage__link">
        <CustomButton>Pas encore de compte ?</CustomButton>
      </Link>
    </div>
  );
};
export default withRouter(Login);
