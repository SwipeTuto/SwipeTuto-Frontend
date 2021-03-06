import React, { useRef } from "react";
import { ReactComponent as CloseLogo } from "../../../assets/images/close.svg";

import "./ConnexionRedirect.scss";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../redux/layout/layout-selectors";
import Login from "../../LayoutComponents/Login/Login";

const ConnexionRedirect = ({ handleClose }) => {
  const currentTheme = useSelector(selectTheme);
  const popupEl = useRef(null);

  return (
    <div
      className="ConnexionRedirect"
      ref={popupEl}
      onClick={(e) => {
        e.stopPropagation();
        handleClose();
      }}
    >
      <div className={`ConnexionRedirect__wrapper ${currentTheme}-theme-m`}>
        <CloseLogo
          className="ConnexionRedirect__close"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
        />
        <h1 className="title title-1">Vous devez vous connecter pour réaliser cette action.</h1>
        <Login />
      </div>
    </div>
  );
};

export default ConnexionRedirect;
