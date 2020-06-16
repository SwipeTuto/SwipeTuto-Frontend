import React from "react";
import { withRouter } from "react-router-dom";

import "./NotFoundPage.scss";

const NotFoundPage = ({ location, history }) => {
  setTimeout(() => history.push("/"), 4000);
  return (
    <div className="NotFoundPage">
      <h1 className="title title-1">404 NOT FOUND</h1>
      <p className="NotFoundPage__text">
        Désolé, aucune page de correspond à la section "
        <span className="color__primary">{location.pathname}</span>".
      </p>
      <p className="NotFoundPage__text">
        Vous allez être redirigé vers la page d'accueil.
      </p>
    </div>
  );
};

export default withRouter(NotFoundPage);
