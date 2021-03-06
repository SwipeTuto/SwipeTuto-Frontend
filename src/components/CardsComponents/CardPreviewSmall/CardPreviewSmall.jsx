import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// redux
import {
  setClickedCard,
  getCardByIdAction,
  toggleLikeCardAction,
  toggleSaveCardAction,
  deleteCardAction,
} from "../../../redux/filter/filter-actions";
import { openConnexionPopup, showPopupCard, showSignalPopup } from "../../../redux/layout/layout-actions";
import { selectCurrentUser, selectCurrentUserId } from "../../../redux/user/user-selectors";

// service & helper
// import { base } from "../../../services/configService";
import { likeUpdate } from "../../../helper/functions/likeUpdate";
import { convertNumber } from "../../../helper/functions/convertNumber";
import { truncate } from "../../../helper/functions/truncateString";

// assets
// import { ReactComponent as HeartFull } from "../../../assets/images/heart.svg";
import { ReactComponent as HeartFull } from "../../../assets/images/heart.svg";
import { ReactComponent as EyeLogo } from "../../../assets/images/eye.svg";

// components
import UserNameAndAvatar from "../../UserComponents/UserAvatar/UserNameAndAvatar";

import "./CardPreviewSmall.scss";
import Loading from "../../Loading/Loading";
import { selectTheme } from "../../../redux/layout/layout-selectors";
import { userHasLiked } from "../../../helper/functions/userHasLiked";
import VerticalMenu from "../../LayoutComponents/VerticalMenu/VerticalMenu";
import { initialSignalState } from "../../../helper/constants";

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

  useEffect(() => {
    const heartEl = document.getElementById(`CardPreviewSmall__heart${cardId}`);
    if (userHasLiked(currentUserId, likes) && firstCheck) {
      heartEl && heartEl.classList.add("active");
    }
    setFirstCheck(false);
  }, [cardId, currentUserId, firstCheck, likes]);

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
      img.setAttribute("alt", "slide du tutoriel");
      elem.append(img);
      if (media_image[0] && media_image[0].image) {
        img.onload = () => {
          setCardIsReady(true);
          setIsError(false);
        };
        img.onerror = (err) => {
          setCardIsReady(false);
          setIsError(true);
          console.log(err);
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
      }, 10000);
    }
    if (cardIsReady) {
      clearTimeout(thisTimeout);
    }
  }, [cardIsReady]);

  const newSignalObject = { ...initialSignalState, id_card: cardId };

  return (
    <div className={`CardPreviewSmall`} data-slideid="1">
      <div className="CardPreviewSmall__media">
        <div
          className={`CardPreviewSmall__image  ${cardIsReady ? "active" : "hide"}`}
          id={`CardPreviewSmall__image--${cardId}`}
          onClick={() => handleClickedCardClick()}
        >
          <div className="CardPreviewSmall__hover">
            <p>{name && truncate(name, 60, false)}</p>
            {currentUserId !== card.user.id ? (
              <VerticalMenu>
                <p
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(showSignalPopup(newSignalObject));
                  }}
                >
                  Signaler
                </p>
              </VerticalMenu>
            ) : (
              ""
            )}
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
