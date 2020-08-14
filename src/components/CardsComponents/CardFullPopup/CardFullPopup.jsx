// Popup qui s'ouvre au clic sur une card. Contient CardSliderFull et aussi toutes les infos de la card cliquée

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

// redux
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import {
  selectClickedCard,
  selectCardLikers,
  selectCurrentSearch,
  selectCardsFetchedCards,
  selectOtherCardsByAuthor,
} from "../../../redux/filter/filter-selectors";
import {
  setClickedCard,
  setNoClickedCard,
  toggleLikeCardAction,
  getCardAfterfilterAction,
  getOtherCardsByAuthorNameAction,
} from "../../../redux/filter/filter-actions";
import {
  closePopupCard,
  showFullscreen,
} from "../../../redux/layout/layout-actions";
import {
  selectFullscreen,
  selectImageIsLoaded,
  selectShowPopupCard,
} from "../../../redux/layout/layout-selectors";

// components
import SearchLinkRedirect from "../../../helper/SearchLinkRedirect";
import CardSliderSwipable from "../CardSlider/CardSliderSwipable";
import CardSliderFullscreen from "../CardSlider/CardSliderFullscreen";
import Loading from "../../Loading/Loading";
import UserNameAndAvatar from "../../UserComponents/UserAvatar/UserNameAndAvatar";
import CommentsWrapper from "../../LayoutComponents/CommentsWrapper/CommentsWrapper";
import ConnexionRedirect from "../../LayoutComponents/ConnexionRedirect/ConnexionRedirect";

// Services & helpers
import { formattedDate, renameCategory } from "../../../helper/index";
import { base } from "../../../services/configService";

// Assets
import { ReactComponent as ChevronCircleLeft } from "../../../assets/images/chevrons/chevron-back-circle.svg";
import { ReactComponent as ChevronCircleRight } from "../../../assets/images/chevrons/chevron-forward-circle.svg";
import { ReactComponent as LogoFacebook } from "../../../assets/images/logo-facebook.svg";
import { ReactComponent as LogoTwitter } from "../../../assets/images/logo-twitter.svg";
import { ReactComponent as LogoYoutube } from "../../../assets/images/logo-youtube.svg";
import { ReactComponent as LogoGithub } from "../../../assets/images/logo-github.svg";
import { ReactComponent as BookmarkEmpty } from "../../../assets/images/bookmark-outline.svg";
import { ReactComponent as BookmarkFull } from "../../../assets/images/bookmark.svg";
import { ReactComponent as HeartEmpty } from "../../../assets/images/heart-outline.svg";
import { ReactComponent as HeartFull } from "../../../assets/images/heart.svg";
import { ReactComponent as CloseLogo } from "../../../assets/images/close.svg";
import { ReactComponent as FullscreenLogo } from "../../../assets/images/expand.svg";

// SCSS
import "./CardFullPopup.scss";

// Faire qqch avec clickedCard ! correspond à la etaget dans SearchPage, la card parente clickée où on aura accès à data-slideid
// handleCloseCardFullPopupClick vient de searchPage et permet de fermer la popup au click à coté de la popup
const CardFullPopup = ({ history }) => {
  const isFullScreen = useSelector(selectFullscreen);
  const [redirection, setRedirection] = useState(false);
  const currentSearch = useSelector(selectCurrentSearch);
  const currentUser = useSelector(selectCurrentUser);
  const clickedCard = useSelector(selectClickedCard);
  const clickedCardId = clickedCard && clickedCard.id;
  const popupShown = useSelector(selectShowPopupCard);
  const dispatch = useDispatch();
  const [indexOfCurrentCard, setIndexOfCurrentCard] = useState();
  const cardsArray = useSelector(selectCardsFetchedCards);
  const [cardsArrayLength, setCardsArrayLength] = useState();
  const otherCardsByAuthor = useSelector(selectOtherCardsByAuthor);
  const cardLikers = useSelector(selectCardLikers);
  const [cardIsLiked, setCardIsLiked] = useState();
  const [cardIsSaved, setCardIsSaved] = useState(false);
  const [connectRedirect, setConnectRedirect] = useState(false);
  const imageIsLoaded = useSelector(selectImageIsLoaded);

  useEffect(() => {
    if (!clickedCard || !cardsArray) return;
    setCardsArrayLength(cardsArray.length);
    setIndexOfCurrentCard(cardsArray.indexOf(clickedCard));
  }, [clickedCard, cardsArray, cardsArrayLength, indexOfCurrentCard]);

  const userHasLiked = () => {
    if (currentUser && currentUser.id) {
      return (
        cardLikers && cardLikers.some((likers) => likers === currentUser.id)
      );
    } else {
      return false;
    }
  };

  useEffect(() => {
    setCardIsLiked(userHasLiked());
  }, [cardLikers, currentUser]);

  useEffect(() => setRedirection(false), [popupShown]);

  // scroll reset
  useEffect(() => {
    if (clickedCard && clickedCard.user && clickedCard.user.id) {
      dispatch(getOtherCardsByAuthorNameAction(clickedCard.user.id));
    }
  }, [clickedCard, dispatch]);

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
    if (document.getElementsByClassName("HomePage")[0]) {
      window.history.pushState("", "", "/");
    } else {
      setRedirection(true);
      window.history.pushState(
        "",
        "",
        history.location.pathname + history.location.search
      );
    }

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
    if (cardIsLiked !== userHasLiked()) {
      dispatch(getCardAfterfilterAction(currentSearch));
    }
  };

  const handleClose = () => {
    setConnectRedirect(false);
  };

  // LIKE
  const handleLikeClick = () => {
    if (!currentUser) {
      setConnectRedirect(true);
    } else {
      dispatch(toggleLikeCardAction(clickedCardId));
      setCardIsLiked(!cardIsLiked);
    }
  };

  // SAVE
  const handleSaveClick = () => {
    console.log(clickedCardId);
    setCardIsSaved(!cardIsSaved);
    // dispatch(toggleSaveCardAction(clickedCardId));
    // Dispatch toggle d'un save à la carte comme pour les likes
  };

  const redirectLink = SearchLinkRedirect();

  return (
    <>
      {redirection && <Redirect to={redirectLink} />}
      {connectRedirect ? (
        <ConnexionRedirect handleClose={handleClose} />
      ) : (
        <div
          className={`CardFullPopup ${popupShown ? "active" : ""}`}
          onClick={() => handlePopupClose()}
        >
          <div
            className="CardFullPopup__wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="CardFullPopup__header">
              <div className="CardFullPopup__user">
                <UserNameAndAvatar
                  user={clickedCard && clickedCard.user && clickedCard.user}
                  link={true}
                />
              </div>

              <div className="CardFullPopup__action-button">
                {cardIsSaved ? (
                  <BookmarkFull
                    className="card-action-button card-action-button__saved"
                    onClick={handleSaveClick}
                  />
                ) : (
                  <BookmarkEmpty
                    className="card-action-button"
                    onClick={handleSaveClick}
                  />
                )}

                {/* FAIRE UN CHECK SI CARD DEJA LIKEE PAR USER EN VOYANT ID */}
                {cardIsLiked ? (
                  <HeartFull
                    className="card-action-button card-action-button__liked"
                    onClick={handleLikeClick}
                  />
                ) : (
                  <HeartEmpty
                    className="card-action-button"
                    onClick={handleLikeClick}
                  />
                )}

                <FullscreenLogo
                  className="card-action-button"
                  id="card-action-button__fullscreen"
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
            <div className="CardFullPopup__slider">
              {!imageIsLoaded ? (
                <Loading />
              ) : clickedCard && isFullScreen ? (
                <CardSliderFullscreen />
              ) : clickedCard ? (
                <CardSliderSwipable />
              ) : (
                ""
              )}
            </div>

            <h1 className="title title-1 CardFullPopup__title">
              {clickedCard && clickedCard.name}
            </h1>
            <div className="CardFullPopup__meta CardFullPopup__section">
              <div className="CardFullPopup__meta--other-infos">
                <div className="CardFullPopup__meta--published-date">
                  <div className="CardFullPopup__meta--category-stamp">
                    {clickedCard &&
                      clickedCard.categorie &&
                      clickedCard.categorie[0] &&
                      clickedCard.categorie[0].name &&
                      renameCategory(clickedCard.categorie[0].name)}
                  </div>
                  <p>Publié le :</p>
                  <p>{clickedCardDate}</p>
                </div>
              </div>
            </div>

            <div className="CardFullPopup__description CardFullPopup__section">
              <h1 className="title title-1">Description</h1>
              <p>{clickedCard && clickedCard.description}</p>
            </div>

            <div className="CardFullPopup__commentaires CardFullPopup__section">
              <CommentsWrapper />
            </div>

            <div className="CardFullPopup__autres-posts">
              <h3 className="title title-4">Du même auteur :</h3>
              <div className="autres-posts--grid">
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
                        <img
                          style={{ width: "100%", height: "100%" }}
                          src={base + card.media_image["0"].image}
                          alt="autre"
                        />
                      </div>
                    ))}
              </div>
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
      )}
    </>
  );
};

export default withRouter(CardFullPopup);
