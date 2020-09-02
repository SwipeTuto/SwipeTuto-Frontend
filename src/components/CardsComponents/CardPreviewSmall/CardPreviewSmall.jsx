import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// redux
import {
  setClickedCard,
  getCardByIdAction,
  toggleLikeCardAction,
} from "../../../redux/filter/filter-actions";
import { showPopupCard } from "../../../redux/layout/layout-actions";
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import { getUserByIdAction } from "../../../redux/user/user-actions";

// service & helper
import { base } from "../../../services/configService";
import { renameCategory, truncate } from "../../../helper/index";

// assets
import { ReactComponent as HeartFull } from "../../../assets/images/heart.svg";
import { ReactComponent as HeartEmpty } from "../../../assets/images/heart-outline.svg";

// components
import ConnexionRedirect from "../../LayoutComponents/ConnexionRedirect/ConnexionRedirect";
import UserNameAndAvatar from "../../UserComponents/UserAvatar/UserNameAndAvatar";

import "./CardPreviewSmall.scss";

const CardPreviewSmall = ({ card }) => {
  const { media_image, user, categorie, name, number_of_likes, likes } = card;
  const dispatch = useDispatch();
  const cardId = card && card.id;
  const currentUser = useSelector(selectCurrentUser);
  const [connectRedirect, setConnectRedirect] = useState(false);
  const [cardIsLiked, setCardIsLiked] = useState();

  useEffect(() => {
    setCardIsLiked(userHasLiked());
  }, [currentUser]);

  const handleClickedCardClick = async () => {
    dispatch(showPopupCard());
    const clickedCardRequest = await dispatch(getCardByIdAction(cardId));
    const clickedCard = await clickedCardRequest.data;
    await dispatch(setClickedCard(clickedCard));

    await window.history.pushState("", "", `/card_id=${cardId && cardId}`);
  };

  const userHasLiked = () => {
    if (currentUser && currentUser.id) {
      return likes && likes.some((likers) => likers === currentUser.id);
    } else {
      return false;
    }
  };

  const handleLikeClick = () => {
    if (!currentUser) {
      setConnectRedirect(true);
    } else {
      dispatch(toggleLikeCardAction(cardId));
      const likedCardText = document.getElementById(`likesNumber${cardId}`);
      if (cardIsLiked) {
        likedCardText.textContent = parseInt(likedCardText.textContent) - 1;
      } else {
        likedCardText.textContent = parseInt(likedCardText.textContent) + 1;
      }
      setCardIsLiked(!cardIsLiked);
    }
  };

  const handleClose = () => {
    setConnectRedirect(false);
  };

  return (
    <>
      {connectRedirect && <ConnexionRedirect handleClose={handleClose} />}
      <div className="CardPreviewSmall" data-slideid="1">
        <div
          className="CardPreviewSmall__image"
          onClick={() => handleClickedCardClick()}
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
              {renameCategory(categorie && categorie[0] && categorie[0].name)
                ? renameCategory(categorie && categorie[0].name)
                : "Autre"}
            </div>
          </div>
        </div>
        {/* </Link> */}
        <div className="CardPreviewSmall__details">
          <UserNameAndAvatar user={user} link={true} />
          <div
            className="CardPreviewSmall__likes"
            onClick={() => handleLikeClick()}
          >
            {cardIsLiked ? (
              <HeartFull className="CardPreviewSmall__likes--logo" />
            ) : (
              <HeartEmpty className="CardPreviewSmall__likes--logo" />
            )}
            <p
              className="CardPreviewSmall__likes--number"
              id={`likesNumber${cardId}`}
            >
              {number_of_likes ? number_of_likes : 0}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default CardPreviewSmall;
