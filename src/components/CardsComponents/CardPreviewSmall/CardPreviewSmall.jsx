// Component qui présente en résumé dans la grille un slide avec image de preview, auteur etc ...
import React from "react";
import { useDispatch } from "react-redux";
import { setClickedCard } from "../../../redux/cards/cards-actions";
import { showPopupCard } from "../../../redux/layout/layout-actions";
import { truncate } from "../../../utilsFunctions";
import UserNameAndAvatarSmall from "../../UserComponents/UserNameAndAvatarSmall/UserNameAndAvatarSmall";

import "./CardPreviewSmall.scss";
import {base} from '../../../services/configService'

const CardPreviewSmall = ({ handleCardFullPopupClick, card }) => {
  const {media_image, user, categorie, name} = card
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
        {media_image[0] &&   
          <img src={base + media_image[0].image} alt="slides presentation" />
        }
      
        
        <div className="CardPreviewSmall__hover">
          <p>{truncate(name, 60, false)}</p>
          <div className="CardPreviewSmall__category--stamp">
            {categorie[0].name}
          </div>
        </div>
      </div>
      <div className="CardPreviewSmall__details">
        <UserNameAndAvatarSmall
          authorName={truncate(user.username, 12, false)}
        />
      </div>
    </div>
  );
};

export default CardPreviewSmall;
