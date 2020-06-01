// Component qui présente en résumé dans la grille un slide avec image de preview, auteur etc ...
import React from "react";
import { useDispatch } from "react-redux";
import { setClickedCard } from "../../../redux/cards/cards-actions";
import { showPopupCard } from "../../../redux/layout/layout-actions";
import { truncate } from "../../../utilsFunctions";
import UserNameAndAvatarSmall from "../../UserComponents/UserNameAndAvatarSmall/UserNameAndAvatarSmall";

import "./CardPreviewSmall.scss";

const CardPreviewSmall = ({
  handleCardFullPopupClick,
  card,
  // setClickedCard,
  // showPopupCard,
}) => {
  const dispatch = useDispatch();
  // Faire une vérification : si le titre > X caractères : le couper et remplacer par "..."
  // Au clic doit renvoyer sur la page CardPage "/card/:id"
  // Associer le slideid avec soit le id du slide soit le index de la liste des résultats de recherche (permettra navigation après)
  return (
    <div
      className="CardPreviewSmall"
      // onClick={(e) => handleCardFullPopupClick(e.target, card)}
      onClick={() => {
        dispatch(setClickedCard(card));
        dispatch(showPopupCard());
      }}
      data-slideid="1"
    >
      <div className="CardPreviewSmall__image">
        <img src={card.media_image[0].image} alt="slides presentation" />
        <div className="CardPreviewSmall__hover">
          <h1 className="title title-1">{truncate(card.name, 60, false)}</h1>
          {/* <h1 className="title title-1">{card.title}</h1> */}
        </div>
      </div>
      <div className="CardPreviewSmall__details">
        <UserNameAndAvatarSmall
          authorName={truncate(card.user.username, 12, false)}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setClickedCard: (card) => dispatch(setClickedCard(card)),
  showPopupCard: () => dispatch(showPopupCard()),
});

export default CardPreviewSmall;
