// Présent dans App.js dans une Route ("/")

import React from "react";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";
import { loginGoogle } from "../../services/userService";

import "./Login.scss";

const LoginPage = () => {
  const handleClick = (e) => {
    loginGoogle();
  };

  return (
    <div className="LoginPage">
      <h1>Connexion</h1>
      <CustomButton onClick={(e) => handleClick(e)} color="dark">
        Se connecter avec Google
      </CustomButton>
    </div>
  );
};
export default LoginPage;
