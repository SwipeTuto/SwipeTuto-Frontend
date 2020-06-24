// Présent dans App.js dans une Route ("/")

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";
import { registerAction } from "../../redux/user/user-actions";
import { checkRegexInput, errorMessageToDisplay } from "../../helper/index";

import "./Login.scss";

// Props history, location, match, depuis react router dom
const Register = (props) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [submitOk, setSubmitOk] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  // scroll reset

  const handleChange = (e) => {
    const { name, value } = e.target;
    let inputIsOk = checkRegexInput(name, value); //test valeur avec regex, true or false
    const currentInput = document.querySelector(`.signup input[name=${name}]`);
    const errorMessage = document.querySelector(
      `.signup .input__message[data-inputfor=${name}`
    );
    if (name === "password") {
      setPassword(value);
    }

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
    e.preventDefault();
    dispatch(registerAction(user));
  };

  useEffect(() => {
    if (window.scrollY) {
      window.scroll(0, 0);
    }
    const allInput = [...document.querySelectorAll(".signup__form--input")];
    const readyToSubmit = allInput.every((input) =>
      input.classList.contains("valid-input")
    );

    if (readyToSubmit) {
      setSubmitOk(false);
    } else {
      setSubmitOk(true);
    }
  }, [user]);

  return (
    <div className="signup">
      <h1 className="title title-1">S'inscrire</h1>
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
        <label htmlFor="nom" className="signup__form--label">
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
        <p className="input__message" data-inputfor="lastname"></p>
        <label htmlFor="email" className="signup__form--label">
          Email :
        </label>
        <input
          name="email"
          value={user.email || ""}
          onChange={(e) => handleChange(e)}
          type="email"
          id="emails"
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
          onChange={(e) => handleChange(e)}
          type="password"
          id="mdp"
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
          id="mdp2"
          className={`signup__form--input ${
            passwordConfirmation !== password ? "invalid-input" : "valid-input"
          }`}
          required
        />
        <p className="input__message" data-inputfor="passwordConfirm">
          {passwordConfirmation !== password
            ? "Ce mot de passe ne correspond pas à celui mentionné précédemment."
            : ""}
        </p>
        <CustomButton
          onClick={(e) => handleClick(e)}
          color="light"
          type="submit"
          disabled={submitOk}
        >
          Inscription
        </CustomButton>
      </form>
    </div>
  );
};

export default Register;
