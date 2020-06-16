// Présent dans App.js dans une Route ("/")

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";
import { registerAction } from "../../redux/user/user-actions"


import "./Login.scss";


// Props history, location, match, depuis react router dom
const Register = (props) => {
  const dispatch = useDispatch()
  const [user, setUser] = useState({})


  // scroll reset
  if (window.scrollY) {
    window.scroll(0, 0);
  }


  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const handleClick = e => {
    e.preventDefault();
    dispatch(registerAction(user))
  }


  return (

        <div className="signup">
          <h1 className="title title-1">S'inscrire</h1>
          <form className="signup__form">
            <label htmlFor="nom" className="signup__form--label">
            Pseudo :
            </label>
            <input
              onChange={e => handleChange(e)}
              name="username"
              value={user.username}
              type="text"
              id="nom"
              className="signup__form--input"
              required
            />
            <label htmlFor="nom" className="signup__form--label">
              Nom :
            </label>
            <input
              onChange={e => handleChange(e)}
              name="firstname"
              value={user.firstname}
              type="text"
              id="nom"
              className="signup__form--input"
              required
            />
            <label htmlFor="prenom" className="signup__form--label">
              Prénom :
            </label>
            <input
              name="lastname"
              value={user.lastname}
              onChange={e => handleChange(e)}
              type="text"
              id="prenom"
              className="signup__form--input"
              required
            />
           
            <label htmlFor="email" className="signup__form--label">
              Email :
            </label>
            <input
              name="email"
              value={user.email}
              onChange={e => handleChange(e)}
              type="email"
              id="emails"
              className="signup__form--input"
              required
            />
            <label htmlFor="mdp" className="signup__form--label">
              Mot de passe :
            </label>
            <input
              name="password"
              value={user.password}
              onChange={e => handleChange(e)}
              type="password"
              id="mdp"
              className="signup__form--input"
              required
            />
        
            <CustomButton onClick={e => handleClick(e)} color="light" type="submit">
              Inscription
            </CustomButton>
          </form>
        </div>
    
  );
};

export default Register;
