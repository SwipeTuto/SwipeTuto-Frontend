// Component qui présente en résumé dans la grille un slide avec image de preview, auteur etc ...
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import UserNameAndAvatarSmall from "../../UserComponents/UserNameAndAvatarSmall/UserNameAndAvatarSmall";

import { setClickedCard } from "../../../redux/cards/cards-actions";
import { showPopupCard } from "../../../redux/layout/layout-actions";
import { setType } from "../../../redux/filter/filter-actions";

import { base } from "../../../services/configService";
import { renameCategory, truncate } from "../../../helper/index";

import "./CardPreviewSmall.scss";

const CardPreviewSmall = ({ card }) => {
  const { media_image, user, categorie, name } = card;
  const dispatch = useDispatch();

  useEffect(() => {}, [user]);

  return (
    <div className="CardPreviewSmall" data-slideid="1">
      <div
        className="CardPreviewSmall__image"
        onClick={() => {
          dispatch(setClickedCard(card));
          dispatch(showPopupCard());
        }}
      >
        {media_image[0] && (
          <img
            src={base + media_image[0].image}
            alt="slides presentation"
            onContextMenu={(e) => e.preventDefault()}
          />
        )}

        <div className="CardPreviewSmall__hover">
          <p>{truncate(name, 60, false)}</p>
          <div className="CardPreviewSmall__category--stamp">
            {renameCategory(categorie && categorie[0].name)}
          </div>
        </div>
      </div>
      <div
        className="CardPreviewSmall__details"
        onClick={() => {
          dispatch(setType("search"));
        }}
      >
        <Link to={`/search?user=${user.username}`}>
          <UserNameAndAvatarSmall
            authorName={truncate(user.username, 12, false)}
          />
        </Link>
      </div>
    </div>
  );
};
export default CardPreviewSmall;
