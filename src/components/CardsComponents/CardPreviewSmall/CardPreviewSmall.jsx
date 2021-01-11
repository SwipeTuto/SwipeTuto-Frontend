import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

// redux
import { setClickedCard, getCardByIdAction, toggleLikeCardAction } from "../../../redux/filter/filter-actions";
import { openConnexionPopup, showPopupCard } from "../../../redux/layout/layout-actions";
import { selectCurrentUser, selectCurrentUserId } from "../../../redux/user/user-selectors";

// service & helper
// import { base } from "../../../services/configService";
import { convertNumber, likeUpdate, truncate } from "../../../helper/index";

// assets
// import { ReactComponent as HeartFull } from "../../../assets/images/heart.svg";
import { ReactComponent as HeartFull } from "../../../assets/images/heart.svg";
import { ReactComponent as EyeLogo } from "../../../assets/images/eye.svg";

// components
import UserNameAndAvatar from "../../UserComponents/UserAvatar/UserNameAndAvatar";

import "./CardPreviewSmall.scss";
import Loading from "../../Loading/Loading";
import { selectTheme } from "../../../redux/layout/layout-selectors";

const CardPreviewSmall = ({ card, size }) => {
  const { media_image, user, name, number_of_likes, likes, total_views } = card;
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  const cardId = card && card.id;
  const currentUser = useSelector(selectCurrentUser);
  const currentUserId = useSelector(selectCurrentUserId);
  // const [cardIsLiked, setCardIsLiked] = useState();
  const [cardIsReady, setCardIsReady] = useState(false);
  const [isError, setIsError] = useState(false);
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
    const clickedCard = clickedCardRequest && (await clickedCardRequest.data);
    clickedCard && dispatch(setClickedCard(clickedCard));

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
    if (elem && elem.childNodes && [...elem.childNodes].some((child) => child.localName === "img")) return;
    let img;
    if (elem) {
      img = document.createElement("img");
      img.setAttribute("onContextMenu", (e) => e.preventDefault());
      elem.append(img);
      if (media_image[0] && media_image[0].image) {
        img.onload = () => {
          setCardIsReady(true);
          setIsError(false);
        };
        img.onerror = () => {
          setCardIsReady(false);
          setIsError(true);
        };
        img.src = `${media_image[0].image_low ? media_image[0].image_low : media_image[0].image}`;
      } else {
        setIsError(true);
      }
    }
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [cardId, media_image]);

  useEffect(() => {
    if (!cardIsReady) {
      var thisTimeout = setTimeout(function () {
        setIsError(true);
      }, 5000);
    }
    if (cardIsReady) {
      clearTimeout(thisTimeout);
    }
  }, [cardIsReady]);

  return (
    <div className={`CardPreviewSmall ${currentTheme}-theme-m`} data-slideid="1">
      <div
        className={`CardPreviewSmall__image  ${cardIsReady ? "active" : "hide"} ${currentTheme}-theme-l`}
        id={`CardPreviewSmall__image--${cardId}`}
        onClick={() => handleClickedCardClick()}
      >
        <div className="CardPreviewSmall__hover">
          <p>{name && truncate(name, 60, false)}</p>
        </div>
      </div>

      <div
        className={`CardPreviewSmall__image ${
          !cardIsReady ? "active" : "hide"
        } CardPreviewSmall__image--loading CardPreviewSmall__image--loading-${size} ${currentTheme}-theme-l`}
        onClick={() => handleClickedCardClick()}
      >
        {isError ? <p>Image non disponible.</p> : <Loading />}
      </div>

      <div className="CardPreviewSmall__details">
        <UserNameAndAvatar user={user} link={true} />

        <div className={`CardPreviewSmall__likes ${currentTheme}-theme`}>
          <div className={`CardPreviewSmall__likes--logo`}>
            <EyeLogo />
          </div>
          <p className={`CardPreviewSmall__likes--number`}>{total_views ? convertNumber(total_views) : 0}</p>
        </div>

        <div className={`CardPreviewSmall__likes ${currentTheme}-theme`} onClick={() => handleLikeClick()}>
          <div className={`CardPreviewSmall__likes--logo`}>
            <HeartFull id={`CardPreviewSmall__heart${cardId}`} />
          </div>

          <p className={`CardPreviewSmall__likes--number`} id={`likesNumber${cardId}`}>
            {number_of_likes ? convertNumber(number_of_likes) : 0}
          </p>
        </div>
      </div>
    </div>
  );
};
export default React.memo(CardPreviewSmall);
