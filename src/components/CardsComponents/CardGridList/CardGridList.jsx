// Component qui renvoie la liste des card sous forme d'une grille
// Présent sur la Homepage "/" et la "/search" et par défaut sera en affichage "small" pour les cardPreview
import React, { useState, useEffect } from "react";

import CardPreviewSmall from "../CardPreviewSmall/CardPreviewSmall";
import CardPreviewBig from "../CardPreviewBig/CardPreviewBig";

import "./CardGridList.scss";

const CardGridList = ({ cardsSize, handleCardFullPopupClick }) => {
  const [cardPreviewSize, setCardPreviewSize] = useState(cardsSize);

  useEffect(() => setCardPreviewSize(cardsSize), [cardsSize]);

  if (cardPreviewSize === "small") {
    return (
      <div className="CardGridList">
        <div className="CardGridList__wrapper--small">
          <CardPreviewSmall
            handleCardFullPopupClick={handleCardFullPopupClick}
          />
          <CardPreviewSmall
            handleCardFullPopupClick={handleCardFullPopupClick}
          />
          <CardPreviewSmall
            handleCardFullPopupClick={handleCardFullPopupClick}
          />
          <CardPreviewSmall
            handleCardFullPopupClick={handleCardFullPopupClick}
          />
          <CardPreviewSmall
            handleCardFullPopupClick={handleCardFullPopupClick}
          />
          <CardPreviewSmall
            handleCardFullPopupClick={handleCardFullPopupClick}
          />
          <CardPreviewSmall
            handleCardFullPopupClick={handleCardFullPopupClick}
          />
          <CardPreviewSmall
            handleCardFullPopupClick={handleCardFullPopupClick}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="CardGridList">
        <div className="CardGridList__wrapper--big">
          <CardPreviewBig handleCardFullPopupClick={handleCardFullPopupClick} />
          <CardPreviewBig handleCardFullPopupClick={handleCardFullPopupClick} />
          <CardPreviewBig handleCardFullPopupClick={handleCardFullPopupClick} />
          <CardPreviewBig handleCardFullPopupClick={handleCardFullPopupClick} />
          <CardPreviewBig handleCardFullPopupClick={handleCardFullPopupClick} />
          <CardPreviewBig handleCardFullPopupClick={handleCardFullPopupClick} />
          <CardPreviewBig handleCardFullPopupClick={handleCardFullPopupClick} />
          <CardPreviewBig handleCardFullPopupClick={handleCardFullPopupClick} />
        </div>
      </div>
    );
  }
};

export default CardGridList;
