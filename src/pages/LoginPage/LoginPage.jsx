// Présent dans App.js dans une Route ("/")

import React, { useState, useEffect } from "react";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";

import { loginGoogle, loginGit } from "../../services/userService";
import { loginAction, setCurrentUser } from "../../redux/user/user-actions";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import loginImage from "../../assets/images/login-image.jpg";
import { ReactComponent as GoogleLogo } from "../../assets/images/logo-google.svg";
import { ReactComponent as GithubLogo } from "../../assets/images/logo-github.svg";
// import SwipeTutoSmallFull from "../../assets/logos/logo-full-reduced.png";
// import SwipeTutoSmallLogo from "../../assets/logos/logo-small-reduced.png";
import SwipeTutoSmallLogo from "../../assets/logos/Logo_small_border_black_smaller_700px.png";

import { checkRegexInput, errorMessageToDisplay } from "../../helper/index";
import Login from "../../components/LayoutComponents/Login/Login";

import "./LoginPage.scss";
import Register from "../../components/LayoutComponents/Login/Register";

// Props history, location, match, depuis react router dom
const LoginPage = ({ location }) => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <>
      {currentUser && <Redirect to={"/"} />}
      <div className="LoginPage">
        <div className="LoginPage__message">
          <div className="LoginPage__message--logo">
            <img src={SwipeTutoSmallLogo} alt="swipetuto" />
          </div>
          {location.pathname === "/connexion/login" ? (
            <h1 className="title title-1">Heureux de vous revoir !</h1>
          ) : location.pathname === "/connexion/signup" ? (
            <h1 className="title title-1">Bienvenue chez SwipeTuto !</h1>
          ) : (
            ""
          )}
        </div>
        <div className="LoginPage--wrapper">
          <Switch>
            <Route path="/connexion/login" component={Login} />
            <Route path="/connexion/signup" component={Register} />
          </Switch>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
