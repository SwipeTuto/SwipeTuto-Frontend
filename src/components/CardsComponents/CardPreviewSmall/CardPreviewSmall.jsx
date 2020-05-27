// Component qui présente en résumé dans la grille un slide avec image de preview, auteur etc ...
import React from "react";

import "./CardPreviewSmall.scss";

const CardPreviewSmall = ({ handleCardFullPopupClick }) => {
  // Faire une vérification : si le titre > X caractères : le couper et remplacer par "..."
  // Au clic doit renvoyer sur la page CardPage "/card/:id"
  // Associer le slideid avec soit le id du slide soit le index de la liste des résultats de recherche (permettra navigation après)
  return (
    <div
      className="CardPreviewSmall"
      onClick={(e) => handleCardFullPopupClick(e.target)}
      data-slideid="1"
    >
      <div className="CardPreviewSmall__image">
        {/* <img src="" alt="" /> */}
      </div>
      <div className="CardPreviewSmall__details">
        <div className="CardPreviewSmall__title">
          Titre Card blablabl ablabafo fkgfrpgl
        </div>
      </div>
    </div>
  );
};

export default CardPreviewSmall;
