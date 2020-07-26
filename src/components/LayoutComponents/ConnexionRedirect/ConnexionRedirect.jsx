import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
import { ReactComponent as CloseLogo } from "../../../assets/images/close.svg";

import "./ConnexionRedirect.scss";
import { deleteFilterErrorAction } from "../../../redux/filter/filter-actions";

const ConnexionRedirect = () => {
  const dispatch = useDispatch();
  return (
    <div
      className="ConnexionRedirect"
      onClick={(e) => {
        e.stopPropagation();
        dispatch(deleteFilterErrorAction());
      }}
    >
      <div className="ConnexionRedirect__wrapper">
        <CloseLogo
          className="ConnexionRedirect__close"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(deleteFilterErrorAction());
          }}
        />
        <h1 className="title title-1">
          Vous devez vous connecter pour réaliser cette action.
        </h1>
        <Link to="/connexion/login">
          <CustomButton color="dark">Connexion</CustomButton>
        </Link>
        <h3 className="title title-3">Pas encore de compte ?</h3>
        <Link to="/connexion/signup">
          <CustomButton>Inscription</CustomButton>
        </Link>
      </div>
    </div>
  );
};

export default ConnexionRedirect;
