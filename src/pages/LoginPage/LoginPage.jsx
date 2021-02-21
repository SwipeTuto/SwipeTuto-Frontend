import React, { useEffect } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import Login from "../../components/LayoutComponents/Login/Login";
import "./LoginPage.scss";
import Register from "../../components/LayoutComponents/Login/Register";
import { selectShowPopupCard, selectTheme } from "../../redux/layout/layout-selectors";
import { closePopupCard } from "../../redux/layout/layout-actions";
import STLogo from "../../assets/stlogos/swipetuto eclair bleu.png";

const LoginPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const currentTheme = useSelector(selectTheme);
  const popupOpen = useSelector(selectShowPopupCard);

  useEffect(() => {
    if (popupOpen) {
      dispatch(closePopupCard());
    }
  }, [popupOpen, dispatch]);
  return (
    <>
      {currentUser && <Redirect to={"/search"} />}
      <div className={`LoginPage ${currentTheme}-theme-d`}>
        <div className="LoginPage__logo">
          <img className="LoginPage__logo--logo" src={STLogo} alt="swipetuto" />
        </div>

        <div className={`LoginPage__wrapper ${currentTheme}-theme-d`}>
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



