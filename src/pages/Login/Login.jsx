// Présent dans App.js dans une Route ("/")

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";
import { loginGoogle } from "../../services/userService";
import { loginAction, setCurrentUser } from "../../redux/user/user-actions"


import "./Login.scss";
import Register from "./Register";


// Props history, location, match, depuis react router dom
const LoginPage = (props) => {
  const dispatch = useDispatch()
  const [user, setUser] = useState({username: '', password:''})


  // scroll reset
  if (window.scrollY) {
    window.scroll(0, 0);
  }

  const handleClickGoogle = (e) => {
    loginGoogle()
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const handleClick = (e) => {
    const { username, password } = user;
    e.preventDefault();
    if (user.username && user.password) {
     return dispatch(loginAction(username, password))
    }
  }

  return (
    <div className="LoginPage">
      <div className="LoginPage__background"></div>
      <div className="LoginPage--wrapper">
        <div className="login">
          <h1 className="title title-1">Se connecter</h1>
          <form className="login__form">
            <label htmlFor="pseudo" className="login__form--label"> Pseudo : </label>
            <input
              onChange={e => handleChange(e)}
              type="text"
              name="username"
              value={user.username}
              id="pseudo"
              className="login__form--input"
              required
            />
            <label htmlFor="mdp" className="login__form--label"> Mot de passe : </label>
            <input
              onChange={(e) => handleChange(e)}
              value={user.password}
              type="password"
              name="password"
              id="mdp"
              className="login__form--input"
              required
            />
            <CustomButton onClick={e => handleClick(e)} color="dark" type="submit">
              Connexion
            </CustomButton>
          </form>

          <span className="horizontal-separation-primary-light"></span>
          <div className="login__google">
            <h1 className="title title-1">Ou</h1>
            <CustomButton onClick={(e) => handleClickGoogle(e)} color="dark">
              Connexion avec Google
            </CustomButton>
          </div>
        </div>

        <Register />
     
    </div>
    </div>
  );
};

export default LoginPage;
