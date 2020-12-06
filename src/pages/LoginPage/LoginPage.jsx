// Présent dans App.js dans une Route ("/")

import React, { useEffect } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import SwipeTutoLargeLogo from "../../assets/swipetuto/STvb_big.png";
import Login from "../../components/LayoutComponents/Login/Login";

import "./LoginPage.scss";
import Register from "../../components/LayoutComponents/Login/Register";
import { selectShowPopupCard, selectTheme } from "../../redux/layout/layout-selectors";
import { closePopupCard } from "../../redux/layout/layout-actions";

// Props history, location, match, depuis react router dom
const LoginPage = () => {
  const dispatch = useDispatch();
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
      {currentUser && <Redirect to={"/search"} />}
      <div className={`LoginPage ${currentTheme}-theme`}>
        <div className="LoginPage__logo">
          <img className="LoginPage__logo--logo" src={SwipeTutoLargeLogo} alt="swipetuto" />
        </div>

        <div className={`LoginPage__wrapper ${currentTheme}-theme`}>
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
