// Présent dans App.js dans une Route ("/")

import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import SwipeTutoSmallLogo from "../../assets/logos/Logo_small_border_black_smaller_700px.png";
import Login from "../../components/LayoutComponents/Login/Login";

import "./LoginPage.scss";
import Register from "../../components/LayoutComponents/Login/Register";
import { selectTheme } from "../../redux/layout/layout-selectors";

// Props history, location, match, depuis react router dom
const LoginPage = ({ location }) => {
  const currentUser = useSelector(selectCurrentUser);
  const currentTheme = useSelector(selectTheme);
  return (
    <>
      {currentUser && <Redirect to={"/"} />}
      <div className={`LoginPage ${currentTheme}-theme`}>
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
        <div className={`LoginPage--wrapper ${currentTheme}-theme`}>
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
