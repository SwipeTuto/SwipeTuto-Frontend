// Présent dans App.js dans une Route ("/")

import React from "react";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";
import { loginGoogle } from "../../services/userService";
// import { langageList } from "../../services/searchService";
// import { useDispatch } from "react-redux";
// import { setCurrentUser } from "../../redux/user/user-actions";

import "./Login.scss";

// Props history, location, match, depuis react router dom
const LoginPage = (props) => {
  // const dispatch = useDispatch();

  // scroll reset
  if (window.scrollY) {
    window.scroll(0, 0);
  }

  const handleClick = (e) => {
    loginGoogle().then((user) => {
      props.history.push("/");
      // dispatch(setCurrentUser(user));
    });
  };

  return (
    <div className="LoginPage">
      <div className="LoginPage__background"></div>
      <div className="LoginPage--wrapper">
        <div className="login">
          <h1 className="title title-1">Se connecter</h1>
          <form className="login__form">
            <label htmlFor="pseudo" className="login__form--label">
              Pseudo :
            </label>
            <input
              type="text"
              id="pseudo"
              className="login__form--input"
              required
            />
            <label htmlFor="mdp" className="login__form--label">
              Mot de passe :
            </label>
            <input
              type="password"
              id="mdp"
              className="login__form--input"
              required
            />
            <CustomButton color="dark" type="submit">
              Connexion
            </CustomButton>
          </form>

          <span className="horizontal-separation-primary-light"></span>
          <div className="login__google">
            <h1 className="title title-1">Ou</h1>
            <CustomButton onClick={(e) => handleClick(e)} color="dark">
              Connexion avec Google
            </CustomButton>
          </div>
        </div>
        <div className="signup">
          <h1 className="title title-1">S'inscrire</h1>
          <form className="signup__form">
            <label htmlFor="nom" className="signup__form--label">
              Nom :
            </label>
            <input
              type="text"
              id="nom"
              className="signup__form--input"
              required
            />
            <label htmlFor="prenom" className="signup__form--label">
              Prénom :
            </label>
            <input
              type="text"
              id="prenom"
              className="signup__form--input"
              required
            />
            <label htmlFor="pseudo" className="signup__form--label">
              Pseudo :
            </label>
            <input
              type="text"
              id="pseudo"
              className="signup__form--input"
              required
            />
            <label htmlFor="email" className="signup__form--label">
              Email :
            </label>
            <input
              type="email"
              id="email"
              className="signup__form--input"
              required
            />
            <label htmlFor="mdp" className="signup__form--label">
              Mot de passe :
            </label>
            <input
              type="password"
              id="mdp"
              className="signup__form--input"
              required
            />
            <label htmlFor="mdp2" className="signup__form--label">
              Confirmez mot de passe :
            </label>
            <input
              type="password"
              id="mdp2"
              className="signup__form--input"
              required
            />
            <CustomButton color="light" type="submit">
              Inscription
            </CustomButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
