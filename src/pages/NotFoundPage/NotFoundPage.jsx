import React from "react";
import { withRouter, Link } from "react-router-dom";

import "./NotFoundPage.scss";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";

const NotFoundPage = ({ location }) => {
  return (
    <div className="NotFoundPage">
      <h1 className="title title-1">404 NOT FOUND</h1>
      <p className="NotFoundPage__text">
        Désolé, aucune page de correspond à "
        <span className="color__primary">{location.pathname}</span>".
      </p>
      <p className="NotFoundPage__text">
        Nous vous invitons à rejoindre la page d'accueil en cliquant sur le lien
        ci-dessous :
      </p>
      <Link to="/">
        <CustomButton>Accueil</CustomButton>
      </Link>
    </div>
  );
};

export default withRouter(NotFoundPage);
