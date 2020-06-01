// Component qui présente en résumé dans la grille un slide avec image de preview, auteur etc ...
import React from "react";
import { useDispatch } from "react-redux";
import { setClickedCard } from "../../../redux/cards/cards-actions";
import { showPopupCard } from "../../../redux/layout/layout-actions";
import { truncate } from "../../../utilsFunctions";
import UserNameAndAvatarSmall from "../../UserComponents/UserNameAndAvatarSmall/UserNameAndAvatarSmall";

import "./CardPreviewSmall.scss";

const CardPreviewSmall = ({ handleCardFullPopupClick, card }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="CardPreviewSmall"
      onClick={() => {
        dispatch(setClickedCard(card));
        dispatch(showPopupCard());
      }}
      data-slideid="1"
    >
      <div className="CardPreviewSmall__image">
        <img src={card.media_image[0].image} alt="slides presentation" />
        <div className="CardPreviewSmall__hover">
          <p>{truncate(card.name, 60, false)}</p>
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

export default CardPreviewSmall;
