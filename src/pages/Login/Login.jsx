// Présent dans App.js dans une Route ("/")

import React, { Fragment, useState } from "react";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";
import { loginGoogle } from "../../services/userService";
import { langageList } from "../../services/searchService";

import "./Login.scss";

// Props history, location, match, depuis react router dom
const LoginPage = (props) => {
  const handleClick = (e) => {
    loginGoogle().then((user) => {
      props.history.push("/", { state: { detail: user } });
    });
  };

  return (
    <div className="LoginPage">
      <h1>Login page</h1>
      <CustomButton onClick={(e) => handleClick(e)} color="dark">
        SingnUp with Google
      </CustomButton>
    </div>
  );
};
export default LoginPage;
