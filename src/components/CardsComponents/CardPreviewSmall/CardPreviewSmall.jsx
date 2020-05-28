// Component qui présente en résumé dans la grille un slide avec image de preview, auteur etc ...
import React from "react";
import { truncate } from "../../../utilsFunctions";

import "./CardPreviewSmall.scss";

const CardPreviewSmall = ({ handleCardFullPopupClick, card }) => {
  // Faire une vérification : si le titre > X caractères : le couper et remplacer par "..."
  // Au clic doit renvoyer sur la page CardPage "/card/:id"
  // Associer le slideid avec soit le id du slide soit le index de la liste des résultats de recherche (permettra navigation après)
  return (
    <div
      className="CardPreviewSmall"
      onClick={(e) => handleCardFullPopupClick(e.target, card)}
      data-slideid="1"
    >
      <div className="CardPreviewSmall__image">
        <img src={card.slides[0]} alt="slides presentation" />
      </div>
      <div className="CardPreviewSmall__details">
        <div className="CardPreviewSmall__title">
          {truncate(card.title, 22, false)}
        </div>
      </div>
    </div>
  );
};

export default CardPreviewSmall;
