import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

// redux
import {
  setClickedCard,
  getCardByIdAction,
  toggleLikeCardAction,
} from "../../../redux/filter/filter-actions";
import {
  openConnexionPopup,
  showPopupCard,
} from "../../../redux/layout/layout-actions";
import {
  selectCurrentUser,
  selectCurrentUserId,
} from "../../../redux/user/user-selectors";

// service & helper
// import { base } from "../../../services/configService";
import { likeUpdate, renameCategory, truncate } from "../../../helper/index";

// assets
// import { ReactComponent as HeartFull } from "../../../assets/images/heart.svg";
import { ReactComponent as HeartEmpty } from "../../../assets/images/heart-outline.svg";

// components
import UserNameAndAvatar from "../../UserComponents/UserAvatar/UserNameAndAvatar";

import "./CardPreviewSmall.scss";
import Loading from "../../Loading/Loading";
import { selectTheme } from "../../../redux/layout/layout-selectors";

const CardPreviewSmall = ({ card, size }) => {
  const { media_image, user, categorie, name, number_of_likes, likes } = card;
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  const cardId = card && card.id;
  const currentUser = useSelector(selectCurrentUser);
  const currentUserId = useSelector(selectCurrentUserId);
  // const [cardIsLiked, setCardIsLiked] = useState();
  const [cardIsReady, setCardIsReady] = useState(false);
  const [firstCheck, setFirstCheck] = useState(true);

  const userHasLiked = useCallback(() => {
    if (currentUser && currentUser.id) {
      return likes && likes.some((likers) => likers === currentUser.id);
    } else {
      return false;
    }
  }, [currentUser, likes]);

  useEffect(() => {
    const heartEl = document.getElementById(`CardPreviewSmall__heart${cardId}`);
    if (userHasLiked() && firstCheck) {
      heartEl && heartEl.classList.add("active");
    }
    setFirstCheck(false);
  }, [cardId, firstCheck, userHasLiked]);

  const handleClickedCardClick = async () => {
    dispatch(showPopupCard());
    const clickedCardRequest = await dispatch(getCardByIdAction(cardId));
    const clickedCard = await clickedCardRequest.data;
    await dispatch(setClickedCard(clickedCard));

    await window.history.pushState("", "", `/card_id=${cardId && cardId}`);
  };

  const handleLikeClick = () => {
    if (!currentUser) {
      dispatch(openConnexionPopup());
    } else {
      dispatch(toggleLikeCardAction(cardId, currentUserId));
      likeUpdate(cardId);
    }
  };

  useEffect(() => {
    const elem = document.querySelector(`#CardPreviewSmall__image--${cardId}`);
    if (
      elem &&
      elem.childNodes &&
      [...elem.childNodes].some((child) => child.localName === "img")
    )
      return;
    if (elem) {
      const img = document.createElement("img");
      img.setAttribute("onContextMenu", (e) => e.preventDefault());
      if (media_image[0] && media_image[0].image) {
        img.onload = () => {
          setCardIsReady(true);
        };
        img.onerror = () => {
          setCardIsReady(false);
        };
        img.src = `${media_image[0].image}`;
      }
      elem.append(img);
    }
  }, [cardId, media_image]);

  return (
    <div className={`CardPreviewSmall ${currentTheme}-theme`} data-slideid="1">
      <div
        className={`CardPreviewSmall__image  ${
          cardIsReady ? "active" : "hide"
        }`}
        id={`CardPreviewSmall__image--${cardId}`}
        onClick={() => handleClickedCardClick()}
      >
        <div className="CardPreviewSmall__hover">
          <p>{name && truncate(name, 60, false)}</p>
          {/* <div className="CardPreviewSmall__category--stamp">
            {renameCategory(categorie && categorie[0] && categorie[0].name)
              ? renameCategory(categorie && categorie[0].name)
              : "Autre"}
          </div> */}
        </div>
      </div>

      <div
        className={`CardPreviewSmall__image ${
          !cardIsReady ? "active" : "hide"
        } CardPreviewSmall__image--loading CardPreviewSmall__image--loading-${size}`}
      >
        <Loading />
      </div>

      <div className="CardPreviewSmall__details">
        <UserNameAndAvatar user={user} link={true} />
        <div
          className="CardPreviewSmall__likes"
          onClick={() => handleLikeClick()}
        >
          <div className="CardPreviewSmall__likes--logo">
            <HeartEmpty id={`CardPreviewSmall__heart${cardId}`} />
          </div>
          <p
            className="CardPreviewSmall__likes--number"
            id={`likesNumber${cardId}`}
          >
            {number_of_likes ? number_of_likes : 0}
          </p>
        </div>
      </div>
    </div>
  );
};
export default CardPreviewSmall;
