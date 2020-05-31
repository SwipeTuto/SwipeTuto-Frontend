// Component qui présente en résumé dans la grille un slide avec image de preview, auteur etc ...
import React from "react";
import { truncate } from "../../../utilsFunctions";
import UserNameAndAvatarSmall from "../../UserComponents/UserNameAndAvatarSmall/UserNameAndAvatarSmall";

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
        <div className="CardPreviewSmall__hover">
          <h1 className="title title-1">{truncate(card.title, 60, false)}</h1>
          {/* <h1 className="title title-1">{card.title}</h1> */}
        </div>
      </div>
      <div className="CardPreviewSmall__details">
        <UserNameAndAvatarSmall authorName={truncate(card.author, 12, false)} />
      </div>
    </div>
  );
};

export default CardPreviewSmall;
