import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
import { ReactComponent as CloseLogo } from "../../../assets/images/close.svg";

import "./ConnexionRedirect.scss";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../redux/layout/layout-selectors";
import Login from "../../LayoutComponents/Login/Login";

const ConnexionRedirect = ({ handleClose }) => {
  const ConnexionRedirectEl = document.querySelector(".ConnexionRedirect");
  const currentTheme = useSelector(selectTheme);
  const handleScrollReset = () => {
    const app = document.getElementsByClassName("App")[0];
    if (app) {
      app.style.position = "";
      app.style.top = "";
    }
    window.scrollTo(0, 0);
  };

  window.scrollTo(0, 0);

  // useEffect(() => {
  //   return () => {
  //     if (ConnexionRedirectEl) {
  //       ConnexionRedirectEl.onbeforeunload = function () {
  //         console.log("before unload");
  //         window.scrollTo(0, 0);
  //       };
  //     }
  //   };
  // }, [ConnexionRedirectEl]);

  return (
    <div
      className="ConnexionRedirect"
      onClick={(e) => {
        e.stopPropagation();
        handleClose();
      }}
    >
      <div className={`ConnexionRedirect__wrapper ${currentTheme}-theme`}>
        <CloseLogo
          className="ConnexionRedirect__close"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
        />
        <h1 className="title title-1">
          Vous devez vous connecter pour réaliser cette action.
        </h1>
        <div className="ConnexionRedirect__grid"></div>
        {/* <Link to="/connexion/login">
          <CustomButton color="dark" onClick={() => handleScrollReset()}>
            Connexion
          </CustomButton>
        </Link> */}
        <Login />
        {/* <h3 className="title title-3">Pas encore de compte ?</h3>
        <Link to="/connexion/signup">
          <CustomButton onClick={() => handleScrollReset()}>
            Inscription
          </CustomButton>
        </Link> */}
      </div>
    </div>
  );
};

export default ConnexionRedirect;
