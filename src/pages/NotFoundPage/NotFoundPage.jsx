import React from "react";
import { withRouter, Link } from "react-router-dom";

import "./NotFoundPage.scss";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";
import { useDispatch } from "react-redux";
import { showSignalPopup } from "../../redux/layout/layout-actions";

const NotFoundPage = ({ location }) => {
  const dispatch = useDispatch();

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
      <div className="NotFoundPage__action">
        <CustomButton color="dark" onClick={() => dispatch(showSignalPopup())}>
          Signaler
        </CustomButton>
        <Link to="/">
          <CustomButton>Accueil</CustomButton>
        </Link>
      </div>
    </div>
  );
};

export default withRouter(NotFoundPage);
