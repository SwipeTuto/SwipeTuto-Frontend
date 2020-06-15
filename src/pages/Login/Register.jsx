// Présent dans App.js dans une Route ("/")

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";
import { loginGoogle } from "../../services/userService";
import { loginAction } from "../../redux/user/user-actions"


import "./Login.scss";


// Props history, location, match, depuis react router dom
const Register = (props) => {
  const dispatch = useDispatch()
  const [user, setUser] = useState({username: '', password:''})


  // scroll reset
  if (window.scrollY) {
    window.scroll(0, 0);
  }


  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }


  return (

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
    
  );
};

export default Register;
