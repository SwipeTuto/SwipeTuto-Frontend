// Component qui présente en résumé dans la grille un slide avec image de preview, auteur etc ...
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import UserNameAndAvatarSmall from "../../UserComponents/UserNameAndAvatarSmall/UserNameAndAvatarSmall";
import UserAvatar from "../../UserComponents/UserAvatar/UserAvatar";

import { selectClickedCard } from "../../../redux/filter/filter-selectors";
import { setClickedCard } from "../../../redux/filter/filter-actions";
import { showPopupCard } from "../../../redux/layout/layout-actions";
import { setType } from "../../../redux/filter/filter-actions";

import { base } from "../../../services/configService";
import { renameCategory, truncate } from "../../../helper/index";

import "./CardPreviewSmall.scss";

const CardPreviewSmall = ({ card }) => {
  const { media_image, user, categorie, name } = card;
  const dispatch = useDispatch();
  const cardId = card && card.id && card.id;

  return (
    <div className="CardPreviewSmall" data-slideid="1">
      {/* <Link to={`/search?card_id=${card.id}`}> */}
      <div
        className="CardPreviewSmall__image"
        onClick={() => {
          dispatch(setClickedCard(card));
          dispatch(showPopupCard());
          window.history.pushState("", "", `/card_id=${cardId && cardId}`);
        }}
      >
        {media_image[0] && media_image[0].image ? (
          <img
            src={base + media_image[0].image}
            alt="slides presentation"
            onContextMenu={(e) => e.preventDefault()}
          />
        ) : (
          <img src="https://fakeimg.pl/500x500/" />
        )}

        <div className="CardPreviewSmall__hover">
          <p>{truncate(name, 60, false)}</p>
          <div className="CardPreviewSmall__category--stamp">
            {renameCategory(categorie && categorie[0].name)}
          </div>
        </div>
      </div>
      {/* </Link> */}
      <div className="CardPreviewSmall__details">
        <Link to={`/profile/user_id=${user.id}`}>
          <UserAvatar
            userImage={
              user.profile &&
              user.profile[0] &&
              user.profile[0].avatar &&
              `${base}${user.profile[0].avatar}`
            }
            userFirstName={user.first_name && user.first_name}
            userLastName={user.last_name && user.last_name}
          />
          <p>{user.username}</p>
        </Link>
      </div>
    </div>
  );
};
export default CardPreviewSmall;
