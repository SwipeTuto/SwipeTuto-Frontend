import React from "react";
import { topicArray } from "../../helper/functions/getTopicsArray";
import ChooseFavourites from "../LayoutComponents/ChooseFavorites/ChooseFavourites";

import "./CFormFavourites.scss";

const CFormFavourites = ({ allowGoNext, stepIsOk }) => {
  return (
    <div className="CFormFavourites form-step">
      <h2>Afin de vous proposer du contenu personnalisé, merci de choisir votre thème préféré :</h2>
      <p>(Pour les choisir plus tard depuis votre espace personnel, cliquez simplement sur valider)</p>
      <div className="CFormFavourites__topics">
        <ChooseFavourites />
      </div>
    </div>
  );
};

export default CFormFavourites;
