// Présent dans App.js dans une Route ("/")

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../CustomButton/CustomButton";
import { registerAction } from "../../../redux/user/user-actions";
import { loginGoogle, loginGit } from "../../../services/userService";
import { checkRegexInput, errorMessageToDisplay } from "../../../helper/index";
import { ReactComponent as GoogleLogo } from "../../../assets/images/logo-google.svg";
import { ReactComponent as GithubLogo } from "../../../assets/images/logo-github.svg";

import "./Login.scss";
import { selectUserErrors } from "../../../redux/user/user-selectors";

// Props history, location, match, depuis react router dom
const Register = (props) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [submitOk, setSubmitOk] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const userErrors = useSelector(selectUserErrors);

  // scroll reset
  useEffect(() => {
    if (window.scrollY) {
      window.scroll(0, 0);
    }
  }, []);

  const handleChange = (e) => {
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

        errorMessage.textContent = errorMessageToDisplay(name);
      } else {
        currentInput.classList.remove("invalid-input");
        currentInput.classList.add("valid-input");
        errorMessage.style.display = "none";
      }
    }
    setUser({ ...user, [name]: value });
  };

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

  useEffect(() => {
    const allInput = [...document.querySelectorAll(".signup__form--input")];
    const readyToSubmit = allInput.every((input) =>
      input.classList.contains("valid-input")
    );

    if (readyToSubmit) {
      setSubmitOk(false);
    } else {
      setSubmitOk(true);
    }
  }, [user, handleChange, passwordConfirmation]);

  return (
    <div className="signup">
      <h1 className="title title-1">S'inscrire</h1>
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
      <p className="login__errors">
        {userErrors &&
          userErrors !== 400 &&
          "Une erreur est survenue. Si l'erreur persiste, merci de nous le signaler."}
      </p>
      <form className="signup__form">
        <label htmlFor="nom" className="signup__form--label">
          Pseudo :
        </label>
        <input
          onChange={(e) => handleChange(e)}
          name="username"
          value={user.username || ""}
          type="text"
          id="nom"
          className="signup__form--input invalid-input"
          required
        />
        <p className="input__message" data-inputfor="username"></p>
        {/* <label htmlFor="nom" className="signup__form--label">
          Nom :
        </label>
        <input
          onChange={(e) => handleChange(e)}
          name="firstname"
          value={user.firstname || ""}
          type="text"
          id="nom"
          className="signup__form--input invalid-input"
          required
        />
        <p className="input__message" data-inputfor="firstname"></p>
        <label htmlFor="prenom" className="signup__form--label">
          Prénom :
        </label>
        <input
          name="lastname"
          value={user.lastname || ""}
          onChange={(e) => handleChange(e)}
          type="text"
          id="prenom"
          className="signup__form--input invalid-input"
          required
        />
        <p className="input__message" data-inputfor="lastname"></p> */}
        <label htmlFor="email" className="signup__form--label">
          Email :
        </label>
        <input
          name="email"
          value={user.email || ""}
          onChange={(e) => handleChange(e)}
          type="email"
          id="email_register"
          className="signup__form--input invalid-input"
          required
        />
        <p className="input__message" data-inputfor="email"></p>
        <label htmlFor="mdp" className="signup__form--label">
          Mot de passe :
        </label>
        <input
          name="password"
          value={user.password || ""}
          onChange={(e) => {
            setPassword(e.target.value);
            handleChange(e);
          }}
          type="password"
          id="mdp_register"
          className="signup__form--input invalid-input"
          required
        />

        <p className="input__message" data-inputfor="password"></p>
        <label htmlFor="mdp2" className="signup__form--label">
          Confirmez le Mot de passe :
        </label>
        <input
          name="passwordConfirm"
          value={passwordConfirmation || ""}
          onChange={(e) => {
            setPasswordConfirmation(e.target.value);
          }}
          type="password"
          id="mdp_register_confirm"
          className={`signup__form--input ${
            passwordConfirmation !== password || passwordConfirmation === ""
              ? "invalid-input"
              : "valid-input"
          }`}
          required
        />
        {passwordConfirmation !== password && (
          <p className="input__message" data-inputfor="passwordConfirm">
            Ce mot de passe ne correspond pas à celui mentionné précédemment.
          </p>
        )}

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
