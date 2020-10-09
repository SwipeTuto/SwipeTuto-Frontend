// Présent dans App.js dans une Route ("/")

import React, { useState, useEffect, useCallback } from "react";
import { withRouter, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// redux
import {
  loginAction,
  deleteUserErrors,
  loginGoogleAction,
} from "../../../redux/user/user-actions";
import { selectUserErrors } from "../../../redux/user/user-selectors";

// helper
import { loginGit } from "../../../services/userService";
import { checkRegexInput, errorMessageToDisplay } from "../../../helper/index";

// components
import CustomButton from "../CustomButton/CustomButton";

// assets
import { ReactComponent as GoogleLogo } from "../../../assets/images/logo-google.svg";
import { ReactComponent as GithubLogo } from "../../../assets/images/logo-github.svg";

import "./LoginAndRegister.scss";
import FormInput from "../../FormInputs/FormInput";
import { provider } from "../../../services/firebaseService";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ username: "", password: "" });
  const [savedEmail, setSavedEmail] = useState();
  const [savedPassword, setSavedPassword] = useState();
  const [submitOk, setSubmitOk] = useState(false);
  const userErrors = useSelector(selectUserErrors);
  const allInput = [...document.querySelectorAll(".FormInput")];

  // scroll reset
  useEffect(() => {
    if (window.scrollY) {
      window.scroll(0, 0);
    }
    dispatch(deleteUserErrors());
  }, [dispatch]);

  const handleClickGoogle = (e) => {
    e.stopPropagation();
    dispatch(loginGoogleAction());
  };
  const handleClickGit = (e) => {
    loginGit();
  };

  const handleClick = (e) => {
    const { email, password } = user;
    e.preventDefault();
    if (user.email && user.password) {
      return dispatch(loginAction(email, password));
    }
  };

  const getValue = (name, value) => {
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
  }, [allInput, user]);

  // useEffect(() => {
  //   if (allInput && allInput.length !== 0) {
  //     console.log(allInput[0]);
  //     allInput[0].focus();
  //   }
  // }, [allInput]);

  // const cred = async () => {
  //   const savedCredentials = await navigator.credentials.get({
  //     password: true,
  //     // federated: provider,
  //   });
  //   console.log(savedCredentials);
  //   if (savedCredentials && savedCredentials.id) {
  //     setSavedEmail(savedCredentials.id);
  //     // console.log;
  //   }
  //   if (savedCredentials && savedCredentials.password) {
  //     setSavedPassword(savedCredentials.password);
  //   }
  // };

  // useEffect(() => {
  //   cred();
  // }, []);

  return (
    <div className="Login">
      <h1 className="title title-1">Se connecter</h1>
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
      <p className="error__message">
        {userErrors
          ? userErrors === 400
            ? "Le compte n'a pas pu être trouvé. Merci de vérifier votre email et votre mot de passe."
            : "Une erreur est survenue avec ce compte. Avez-vous les bons identifiants ? Si l'erreur persiste, merci de nous le signaler."
          : ""}
      </p>
      <form className="Login__form">
        <FormInput
          idFor="email"
          label="Votre email :"
          type="email"
          name="email"
          getValue={getValue}
          required={true}
          // firstValue={savedEmail}
        />
        <FormInput
          idFor="password"
          label="Votre mot de passe :"
          type="password"
          name="password"
          getValue={getValue}
          required={true}
          // firstValue={savedPassword}
        />
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
