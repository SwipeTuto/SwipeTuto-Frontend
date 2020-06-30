// Popup qui s'ouvre au clic sur une card. Contient CardSliderFull et aussi toutes les infos de la card cliquée

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// import CardSliderPopup from "../CardSlider/CardSliderPopup";
import CardSliderSwipable from "../CardSlider/CardSliderSwipable";
import CardSliderFullscreen from "../CardSlider/CardSliderFullscreen";
import UserAvatar from "../../UserComponents/UserAvatar/UserAvatar";

import { selectShowPopupCard } from "../../../redux/layout/layout-selectors";
import { selectClickedCard } from "../../../redux/cards/cards-selectors";
import { selectFullscreen } from "../../../redux/layout/layout-selectors";
import {
  setClickedCard,
  setNoClickedCard,
} from "../../../redux/cards/cards-actions";
import {
  closePopupCard,
  showFullscreen,
} from "../../../redux/layout/layout-actions";
import { getOtherCardsByAuthorNameAction } from "../../../redux/filter/filter-actions";

import { ReactComponent as ChevronCircleLeft } from "../../../assets/images/chevrons/chevron-back-circle.svg";
import { ReactComponent as ChevronCircleRight } from "../../../assets/images/chevrons/chevron-forward-circle.svg";
import { ReactComponent as LogoFacebook } from "../../../assets/images/logo-facebook.svg";
import { ReactComponent as LogoTwitter } from "../../../assets/images/logo-twitter.svg";
import { ReactComponent as LogoYoutube } from "../../../assets/images/logo-youtube.svg";
import { ReactComponent as LogoGithub } from "../../../assets/images/logo-github.svg";
import { ReactComponent as BookmarkEmpty } from "../../../assets/images/bookmark-outline.svg";
// import { ReactComponent as BookmarkFilled } from "../../../assets/images/bookmark.svg";
import { ReactComponent as HeartEmpty } from "../../../assets/images/heart-outline.svg";
// import { ReactComponent as HeartFilled } from "../../../assets/images/heart.svg";
import { ReactComponent as CloseLogo } from "../../../assets/images/close.svg";
import { ReactComponent as FullscreenLogo } from "../../../assets/images/fullscreen.svg";

import { formattedDate, renameCategory } from "../../../helper/index";
import { base } from "../../../services/configService";
import "./CardFullPopup.scss";
import {
  selectCardsFetchedCards,
  selectOtherCardsByAuthor,
} from "../../../redux/filter/filter-selectors";
import { selectCurrentUser } from "../../../redux/user/user-selectors";

// Faire qqch avec clickedCard ! correspond à la etaget dans SearchPage, la card parente clickée où on aura accès à data-slideid
// handleCloseCardFullPopupClick vient de searchPage et permet de fermer la popup au click à coté de la popup
const CardFullPopup = () => {
  const isFullScreen = useSelector(selectFullscreen);
  const clickedCard = useSelector(selectClickedCard);
  const popupShown = useSelector(selectShowPopupCard);
  const dispatch = useDispatch();
  const [indexOfCurrentCard, setIndexOfCurrentCard] = useState();
  const cardsArray = useSelector(selectCardsFetchedCards);
  const [cardsArrayLength, setCardsArrayLength] = useState();
  const cardID = useSelector((state) => state.cards.clickedCard);
  const otherCardsByAuthor = useSelector(selectOtherCardsByAuthor);

  useEffect(() => {
    if (!clickedCard || !cardsArray) return;
    setCardsArrayLength(cardsArray.length);
    setIndexOfCurrentCard(cardsArray.indexOf(clickedCard));
  }, [clickedCard, cardsArray, cardsArrayLength, indexOfCurrentCard]);

  // scroll reset
  useEffect(() => {
    if (cardID) {
      dispatch(getOtherCardsByAuthorNameAction(cardID.user.username));
    }
    if (popupShown && document.querySelector(".CardFullPopup.active")) {
      document.querySelector(".CardFullPopup.active").scroll(0, 0);
    }
  }, [popupShown, cardID, dispatch]);

  const clickedCardDate =
    clickedCard && formattedDate(new Date(clickedCard.modified));

  const goPreviousCard = () => {
    const currentClickedCard = clickedCard
      ? document.querySelector(".CardFullPopup.active")
      : null;

    currentClickedCard.scroll(0, 0);

    const indexOfCurrentCard = cardsArray.indexOf(clickedCard);
    if (indexOfCurrentCard <= 0) return;
    const previousCard = cardsArray[indexOfCurrentCard - 1];
    dispatch(setClickedCard(previousCard));
  };

  const goNextCard = () => {
    const currentClickedCard = clickedCard
      ? document.querySelector(".CardFullPopup.active")
      : null;
    currentClickedCard.scroll(0, 0);

    const indexOfCurrentCard = cardsArray.indexOf(clickedCard);
    if (indexOfCurrentCard >= cardsArray.length - 1) return;
    const nextCard = cardsArray[indexOfCurrentCard + 1];
    dispatch(setClickedCard(nextCard));
  };

  const handlePopupClose = () => {
    const currentClickedCard = clickedCard
      ? document.querySelector(".CardFullPopup.active")
      : null;

    if (!currentClickedCard) return;
    if (
      currentClickedCard.classList.contains("CardFullPopup") &&
      currentClickedCard.classList.contains("active")
    ) {
      dispatch(closePopupCard());
      dispatch(setNoClickedCard());
    } else {
      return;
    }
  };

  return (
    <div
      className={`CardFullPopup ${popupShown ? "active" : ""}`}
      onClick={() => handlePopupClose()}
    >
      <div
        className="CardFullPopup__wrapper"
        onClick={(e) => e.stopPropagation()}
      >
        {/* <CloseLogo
          className="CardFullPopup__close"
          onClick={(e) => {
            e.stopPropagation();
            handlePopupClose();
          }}
        /> */}
        <div className="CardFullPopup__grid">
          <div className="CardFullPopup__header">
            <h1 className="title title-1">{clickedCard && clickedCard.name}</h1>
            <div className="CardFullPopup__action-button">
              <BookmarkEmpty className="card-action-button" />
              <HeartEmpty className="card-action-button" />
              <FullscreenLogo
                className="card-action-button"
                onClick={() => dispatch(showFullscreen())}
              />
              <CloseLogo
                className="card-action-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePopupClose();
                }}
              />
            </div>
          </div>
          {/* <div className="CardFullPopup__grid__slide">
            {clickedCard && <CardSliderPopup />}
          </div> */}
          {/* TEST POUR SLIDER SWIPPABLE :*/}
          {clickedCard && isFullScreen ? (
            <CardSliderFullscreen />
          ) : clickedCard ? (
            <div className="CardFullPopup__grid__slide">
              <CardSliderSwipable />
            </div>
          ) : (
            ""
          )}
          <div className="grid__description">
            <h1 className="title title-1">Description</h1>
            <p>{clickedCard && clickedCard.description}</p>
          </div>
          <div className="grid__aside-infos-grid">
            <UserAvatar
              userImage={
                clickedCard &&
                clickedCard.user.profile[0].avatar &&
                `${base}${clickedCard.user.profile[0].avatar}`
              }
              userFirstName={
                clickedCard &&
                clickedCard.user.first_name &&
                clickedCard.user.first_name
              }
              userLastName={
                clickedCard &&
                clickedCard.user.last_name &&
                clickedCard.user.last_name
              }
            />
            <p className="infos__author">
              {clickedCard &&
                clickedCard.user &&
                clickedCard.user.username &&
                clickedCard.user.username}
            </p>
            <div className="infos__published-date">
              <p>Publié le :</p>
              <p>{clickedCardDate}</p>
            </div>
            <div className="infos__category--stamp">
              {clickedCard && renameCategory(clickedCard.categorie[0].name)}
            </div>
            <span className="horizontal-separation-primary-light"></span>
            <div className="infos__tags">
              <h3 className="title title-4">Tags du Post :</h3>
              <div className="infos__tags--container">
                {clickedCard &&
                  clickedCard.tag.map((tag) => (
                    <span className="tag" key={tag.name}>{`#${tag.name}`}</span>
                  ))}
              </div>
            </div>
            <span className="horizontal-separation-primary-light"></span>
            <div className="infos__autres-posts">
              <h3 className="title title-4">Du même auteur :</h3>
              <div className="autres-posts--grid">
                {/* requete getCardsByUser ne renvoie pas categorie... renvoyer tous l'objet card ! */}
                {otherCardsByAuthor &&
                  clickedCard &&
                  otherCardsByAuthor.results
                    .filter((card) => card.id !== clickedCard.id)
                    .slice(0, 4)
                    .map((card) => (
                      <div
                        className="autres-posts--preview"
                        key={card.id}
                        card={card}
                        onClick={() => {
                          dispatch(setClickedCard(card));
                          document
                            .querySelector(".CardFullPopup.active")
                            .scroll(0, 0);
                        }}
                      >
                        {/* FAIRE LE LIEN ET LE POPUP VERS LA CARTE */}
                        <img
                          style={{ width: "100%", height: "100%" }}
                          src={base + card.media_image["0"].image}
                          alt="Autres travaux de l'auteur"
                        />
                      </div>
                    ))}
              </div>
            </div>
            <span className="horizontal-separation-primary-light"></span>
            <div className="infos__social">
              <h3 className="title title-4">Réseaux sociaux :</h3>
              <div className="social-grid">
                <LogoYoutube className="social-grid--item" />
                <LogoGithub className="social-grid--item" />
                <LogoFacebook className="social-grid--item" />
                <LogoTwitter className="social-grid--item" />
              </div>
            </div>
          </div>
          <div className="grid__commentaires">
            <h1 className="title title-1">Commentaires</h1>
            Liste des commentaires
          </div>
        </div>

        {indexOfCurrentCard === 0 ? (
          <ChevronCircleRight
            className="nav__chevron nav__chevron--right"
            // onClick={() => goNextCard()}
            onClick={(event) => {
              event.stopPropagation();
              goNextCard();
            }}
          />
        ) : indexOfCurrentCard === cardsArrayLength - 1 ? (
          <ChevronCircleLeft
            className="nav__chevron nav__chevron--left"
            onClick={(event) => {
              event.stopPropagation();
              goPreviousCard();
            }}
          />
        ) : (
          <>
            <ChevronCircleRight
              className="nav__chevron nav__chevron--right"
              // onClick={() => goNextCard()}
              onClick={(event) => {
                event.stopPropagation();
                goNextCard();
              }}
            />
            <ChevronCircleLeft
              className="nav__chevron nav__chevron--left"
              onClick={(event) => {
                event.stopPropagation();
                goPreviousCard();
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CardFullPopup;
