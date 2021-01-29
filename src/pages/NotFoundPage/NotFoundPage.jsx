import React from "react";
import { withRouter, Link } from "react-router-dom";
import "./NotFoundPage.scss";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";
import { useDispatch } from "react-redux";
import { showSignalPopup } from "../../redux/layout/layout-actions";
import { ReactComponent as NotFoundImg } from "../../assets/images/illustrations/not-found.svg";

const NotFoundPage = ({ location }) => {
  const dispatch = useDispatch();

  return (
    <div className="NotFoundPage">
      <h1 className="title title-1">Oups !</h1>
      <NotFoundImg />
      <p className="NotFoundPage__text">Désolé, cette page n'a pas été trouvée ! Vous pouvez rejoindre l'accueil ou nous signaler un problème :</p>
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
