// Présent dans App.js dans une Route ("/")

import React, { useEffect } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import SwipeTutoSmallLogo from "../../assets/logos/Logo_small_border_black_smaller_700px.png";
import Login from "../../components/LayoutComponents/Login/Login";

import "./LoginPage.scss";
import Register from "../../components/LayoutComponents/Login/Register";
import {
  selectShowPopupCard,
  selectTheme,
} from "../../redux/layout/layout-selectors";
import { closePopupCard } from "../../redux/layout/layout-actions";

// Props history, location, match, depuis react router dom
const LoginPage = () => {
  const dispatch = useDispatch();
  const location = window.location.href;
  const currentUser = useSelector(selectCurrentUser);
  const currentTheme = useSelector(selectTheme);
  const popupOpen = useSelector(selectShowPopupCard);
  window.scroll(0, 0);
  useEffect(() => {
    if (popupOpen) {
      dispatch(closePopupCard());
    }
  }, [popupOpen, dispatch]);
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
