// Présent dans App.js dans une Route ("/")

import React, { Fragment } from "react";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";
import { loginGoogle } from "../../services/userService";

const LoginPage = () => {
  const handleClick = (e) => {
    loginGoogle();
  };

  return (
    <Fragment>
      <h1>Login page</h1>
      <CustomButton onClick={(e) => handleClick(e)} color="dark">
        SingnUp with Google
      </CustomButton>
    </Fragment>
  );
};
export default LoginPage;
