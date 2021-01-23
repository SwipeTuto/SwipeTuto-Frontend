// Popup qui s'ouvre au clic sur une card. Contient CardSliderFull et aussi toutes les infos de la card cliquée

import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

// redux
import {
  selectCurrentUser,
  selectUserFavories,
  selectCurrentUserId,
} from "../../../redux/user/user-selectors";
import {
  selectClickedCard,
  selectCardLikers,
  selectCurrentSearch,
  selectCardsFetchedCards,
  selectOtherCardsByAuthor,
  selectCardsFetched,
} from "../../../redux/filter/filter-selectors";
import {
  setClickedCard,
  setNoClickedCard,
  toggleLikeCardAction,
  getCardAfterfilterAction,
  getOtherCardsByAuthorNameAction,
  toggleSaveCardAction,
} from "../../../redux/filter/filter-actions";
import {
  closePopupCard,
  openConnexionPopup,
  setRedirectUrl,
  showFullscreen,
  showSignalPopup,
} from "../../../redux/layout/layout-actions";
import {
  selectFullscreen,
  selectTheme,
  selectClickedCardIsLoaded,
} from "../../../redux/layout/layout-selectors";

// components
import CardSlider from "../CardSlider/CardSlider";
import Loading from "../../Loading/Loading";
import UserNameAndAvatar from "../../UserComponents/UserAvatar/UserNameAndAvatar";
import CommentsWrapper from "../../LayoutComponents/CommentsWrapper/CommentsWrapper copy";

// Services & helpers
import {
  formattedDate,
  initialSignalState,
  likeUpdate,
  renameCategory,
} from "../../../helper/index";

// Assets
import { ReactComponent as ChevronCircleLeft } from "../../../assets/images/chevrons/chevron-back-circle.svg";
import { ReactComponent as ChevronCircleRight } from "../../../assets/images/chevrons/chevron-forward-circle.svg";
import { ReactComponent as BookmarkEmpty } from "../../../assets/images/bookmark-outline.svg";
import { ReactComponent as BookmarkFull } from "../../../assets/images/bookmark.svg";
import { ReactComponent as HeartEmpty } from "../../../assets/images/heart-outline.svg";
import { ReactComponent as HeartFull } from "../../../assets/images/heart.svg";
import { ReactComponent as CloseLogo } from "../../../assets/images/close.svg";
import { ReactComponent as FullscreenLogo } from "../../../assets/images/expand.svg";

// SCSS
import "./CardFullPopup.scss";
import { getCurrentUserAction } from "../../../redux/user/user-actions";
import VerticalMenu from "../../LayoutComponents/VerticalMenu/VerticalMenu";

// Faire qqch avec clickedCard ! correspond à la etaget dans SearchPage, la card parente clickée où on aura accès à data-slideid
// handleCloseCardFullPopupClick vient de searchPage et permet de fermer la popup au click à coté de la popup
const CardFullPopup = ({ history, location }) => {
  const isFullScreen = useSelector(selectFullscreen);
  const currentTheme = useSelector(selectTheme);
  const currentSearch = useSelector(selectCurrentSearch);
  const cardsFetched = useSelector(selectCardsFetched);
  const currentUser = useSelector(selectCurrentUser);
  const currentUserId = useSelector(selectCurrentUserId);
  const clickedCard = useSelector(selectClickedCard);
  const clickedCardId = clickedCard && clickedCard.id;
  const dispatch = useDispatch();
  const [indexOfCurrentCard, setIndexOfCurrentCard] = useState();
  const cardsArray = useSelector(selectCardsFetchedCards);
  const [cardsArrayLength, setCardsArrayLength] = useState();
  const otherCardsByAuthor = useSelector(selectOtherCardsByAuthor);
  const cardLikers = useSelector(selectCardLikers);
  const [cardIsLiked, setCardIsLiked] = useState();
  const [cardIsSaved, setCardIsSaved] = useState(false);
  const clickedCardIsLoaded = useSelector(selectClickedCardIsLoaded);
  const currentUserSavedCards = useSelector(selectUserFavories);

  useEffect(() => {
    if (!clickedCard || !cardsArray) return;
    setCardsArrayLength(cardsArray.length);
    const currentCardId = cardsArray.findIndex(
      (card) => card.id === clickedCardId
    );
    setIndexOfCurrentCard(currentCardId);
  }, [cardsArray, clickedCard, clickedCardId]);

  const userHasLiked = useCallback(() => {
    if (currentUser && currentUser.id) {
      return (
        cardLikers && cardLikers.some((likers) => likers === currentUser.id)
      );
    } else {
      return false;
    }
  }, [cardLikers, currentUser]);

  const userHasSaved = useCallback(() => {
    if (currentUser && currentUser.id) {
      return (
        currentUserSavedCards &&
        currentUserSavedCards.some((cardsId) => cardsId === clickedCardId)
      );
    } else {
      return false;
    }
  }, [clickedCardId, currentUser, currentUserSavedCards]);

  useEffect(() => {
    setCardIsLiked(userHasLiked());
  }, [cardLikers, currentUser, userHasLiked]);

  useEffect(() => {
    setCardIsSaved(userHasSaved());
  }, [currentUser, userHasSaved]);

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
      ? document.querySelector(".CardFullPopup")
      : null;

    currentClickedCard.scroll(0, 0);

    const indexOfCurrentCard = cardsArray.indexOf(clickedCard);
    if (indexOfCurrentCard <= 0) return;
    const previousCard = cardsArray[indexOfCurrentCard - 1];
    dispatch(setClickedCard(previousCard));
  };

  const goNextCard = () => {
    const currentClickedCard = clickedCard
      ? document.querySelector(".CardFullPopup")
      : null;
    currentClickedCard.scroll(0, 0);

    const indexOfCurrentCard = cardsArray.indexOf(clickedCard);
    if (indexOfCurrentCard >= cardsArray.length - 1) return;
    const nextCard = cardsArray[indexOfCurrentCard + 1];
    dispatch(setClickedCard(nextCard));
  };

  const handlePopupClose = () => {
    if (location.pathname === "/") {
      window.history.pushState("", "", "/");
    } else if (location.pathname === "/account/saved") {
      window.history.pushState("", "", "/account/saved");
    } else {
      dispatch(setRedirectUrl(true));

      window.history.pushState(
        "",
        "",
        history.location.pathname + history.location.search
      );
      if (!cardsFetched) {
        dispatch(getCardAfterfilterAction(currentSearch));
      }
    }

    dispatch(setNoClickedCard());
    dispatch(closePopupCard());
    dispatch(getCurrentUserAction(currentUserId));

    // if (document.getElementsByClassName("HomePage")[0]) {
    //   window.history.pushState("", "", "/");
    // } else if (document.getElementsByClassName("SavedPage")[0]) {
    //   window.history.pushState("", "", "/account/saved");
    // } else {
    //   dispatch(setRedirectUrl(true));

    //   window.history.pushState(
    //     "",
    //     "",
    //     history.location.pathname + history.location.search
    //   );
    //   if (!cardsFetched) {
    //     dispatch(getCardAfterfilterAction(currentSearch));
    //   }
    // }

    // const currentClickedCard = clickedCard
    //   ? document.querySelector(".CardFullPopup")
    //   : null;

    // if (!currentClickedCard) {
    //   return;
    // } else {
    //   dispatch(setNoClickedCard());
    // }
  };

  // LIKE
  const handleLikeClick = () => {
    if (!currentUser) {
      // setConnectRedirect(true);
      dispatch(openConnexionPopup());
    } else {
      dispatch(toggleLikeCardAction(clickedCardId, currentUserId));
      likeUpdate(clickedCardId);
      setCardIsLiked(!cardIsLiked);
    }
  };

  // SAVE
  const handleSaveClick = () => {
    if (!currentUser) {
      // setConnectRedirect(true);
      dispatch(openConnexionPopup());
    } else {
      dispatch(toggleSaveCardAction(clickedCardId));
      setCardIsSaved(!cardIsSaved);
    }
  };

  const newSignalObject = { ...initialSignalState, id_card: clickedCardId };

  return (
    <div
      className="CardFullPopup"
      onClick={() => {
        handlePopupClose();
      }}
    >
      <div
        className={`CardFullPopup__wrapper ${currentTheme}-theme`}
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
            {clickedCardIsLoaded ? (
              <>
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
                <VerticalMenu>
                  <p onClick={() => dispatch(showSignalPopup(newSignalObject))}>
                    Signaler
                  </p>
                </VerticalMenu>
              </>
            ) : null}
            <CloseLogo
              className="card-action-button"
              onClick={(e) => {
                e.stopPropagation();
                handlePopupClose();
              }}
            />
          </div>
        </div>

        {clickedCardIsLoaded ? (
          <>
            <div className="CardFullPopup__slider">
              <CardSlider />
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
                          window.history.pushState(
                            "",
                            "",
                            `/card_id=${card.id && card.id}`
                          );
                          document.querySelector(".CardFullPopup").scroll(0, 0);
                        }}
                      >
                        {clickedCardIsLoaded &&
                        card &&
                        card.media_image &&
                        card.media_image["0"] &&
                        card.media_image["0"].image ? (
                          <img
                            style={{ width: "100%", height: "100%" }}
                            src={card.media_image["0"].image}
                            alt="autre"
                          />
                        ) : (
                          <div className="CardFullPopup__empty-image">
                            Image(s) Indisponible(s)
                          </div>
                        )}
                      </div>
                    ))}
              </div>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>

      {!isFullScreen && cardsArray && (
        <>
          {indexOfCurrentCard === 0 ? (
            <ChevronCircleRight
              className="nav__chevron nav__chevron--right"
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
        </>
      )}
    </div>
  );
};

export default withRouter(CardFullPopup);
