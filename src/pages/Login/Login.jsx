// Présent dans App.js dans une Route ("/")

import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";

import { loginGoogle, loginGit } from "../../services/userService";
import { loginAction, setCurrentUser } from "../../redux/user/user-actions";
import { selectCurrentUser } from "../../redux/user/user-selectors";

import { checkRegexInput, errorMessageToDisplay } from "../../helper/index";

import "./Login.scss";
import Register from "./Register";

// Props history, location, match, depuis react router dom
const LoginPage = (props) => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [user, setUser] = useState({ username: "", password: "" });
  const [submitOk, setSubmitOk] = useState(false);

  // scroll reset
  if (window.scrollY) {
    window.scroll(0, 0);
  }

  const handleClickGoogle = (e) => {
    loginGoogle();
  };
  const handleClickGit = (e) => {
    loginGit();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let inputIsOk = checkRegexInput(name, value); //test valeur avec regex, true or false

    const currentInput = document.querySelector(
      `.LoginPage input[name=${name}]`
    );
    const errorMessage = document.querySelector(
      `.LoginPage .input__message[data-inputfor=${name}`
    );

    if (!inputIsOk) {
      currentInput.classList.remove("valid-input");
      currentInput.classList.add("invalid-input");

      errorMessage.textContent = errorMessageToDisplay(name);
    } else {
      currentInput.classList.remove("invalid-input");
      currentInput.classList.add("valid-input");
      errorMessage.textContent = "";
    }
    setUser({ ...user, [name]: value });
  };

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
    <>
      {currentUser && <Redirect to={"/"} />}
      <div className="LoginPage">
        <div className="LoginPage__background"></div>
        <div className="LoginPage--wrapper">
          <div className="login">
            <h1 className="title title-1">Se connecter</h1>
            <form className="login__form">
              <label htmlFor="pseudo" className="login__form--label">
                {" "}
                Email :{" "}
              </label>
              <input
                onChange={(e) => handleChange(e)}
                type="email"
                name="email"
                value={user.email}
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
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                value={user.password}
                type="password"
                name="password"
                id="mdp_login"
                className="login__form--input valid-input"
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
            <div className="login__google">
              <h1 className="title title-1">Ou</h1>
              <CustomButton onClick={(e) => handleClickGoogle(e)} color="dark">
                Connexion avec Google
              </CustomButton>
              <CustomButton onClick={(e) => handleClickGit(e)} color="dark">
                Connexion avec Git
              </CustomButton>
            </div>
          </div>
          <Register />
        </div>
      </div>
    </>
  );
};
export default LoginPage;
