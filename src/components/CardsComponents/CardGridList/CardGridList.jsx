// Component qui renvoie la liste des card sous forme d'une grille
// Présent sur la Homepage "/" et la "/search" et par défaut sera en affichage "small" pour les cardPreview
import React, { useState, useEffect } from "react";

import CardPreviewSmall from "../CardPreviewSmall/CardPreviewSmall";
import CardPreviewBig from "../CardPreviewBig/CardPreviewBig";

import "./CardGridList.scss";

import SLIDES_DATA_TEST from "../../../SLIDES_DATA_TEST.js"; //collection d'objets avec toutes les infos propres aux slides

const CardGridList = ({ cardsSize, handleCardFullPopupClick }) => {
  const [cardPreviewSize, setCardPreviewSize] = useState(cardsSize);
  const [cardsArray, setcardsArray] = useState(SLIDES_DATA_TEST);

  useEffect(() => setCardPreviewSize(cardsSize), [cardsSize]);

  if (cardPreviewSize === "small") {
    return (
      <div className="CardGridList">
        <div className="CardGridList__wrapper--small">
          {cardsArray.map((card) => (
            <CardPreviewSmall
              handleCardFullPopupClick={handleCardFullPopupClick}
              card={card}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="CardGridList">
        <div className="CardGridList__wrapper--big">
          {cardsArray.map((card) => (
            <CardPreviewBig
              handleCardFullPopupClick={handleCardFullPopupClick}
              card={card}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default CardGridList;
