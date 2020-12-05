// Popup qui s'ouvre au clic sur une card. Contient CardSliderFull et aussi toutes les infos de la card cliquée

import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

// redux
import { selectCurrentUser, selectUserFavories, selectCurrentUserId } from "../../../redux/user/user-selectors";
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
  deleteCardAction,
} from "../../../redux/filter/filter-actions";
import {
  closePopupCard,
  openConnexionPopup,
  openNotificationPopup,
  setRedirectUrl,
  showFullscreen,
  showSignalPopup,
} from "../../../redux/layout/layout-actions";
import {
  selectFullscreen,
  selectTheme,
  selectClickedCardIsLoaded,
  selectShowPopupCard,
  selectIsLoaded,
} from "../../../redux/layout/layout-selectors";

// components
import CardSlider from "../CardSlider/CardSlider";
import Loading from "../../Loading/Loading";
import UserNameAndAvatar from "../../UserComponents/UserAvatar/UserNameAndAvatar";
import CommentsWrapper from "../../LayoutComponents/CommentsWrapper/CommentsWrapper";
// import ShareButtons from "../../LayoutComponents/ShareButtons/ShareButtons";

// Services & helpers
import { convertNumber, formattedDate, initialSignalState, likeUpdate, renameQuery, stringToHTML } from "../../../helper/index";

// Assets
import { ReactComponent as ChevronCircleLeft } from "../../../assets/images/chevrons/chevron-back-circle.svg";
import { ReactComponent as ChevronCircleRight } from "../../../assets/images/chevrons/chevron-forward-circle.svg";
import { ReactComponent as BookmarkEmpty } from "../../../assets/images/bookmark-outline.svg";
import { ReactComponent as BookmarkFull } from "../../../assets/images/bookmark.svg";
import { ReactComponent as HeartEmpty } from "../../../assets/images/heart-outline.svg";
import { ReactComponent as HeartFull } from "../../../assets/images/heart.svg";
import { ReactComponent as CloseLogo } from "../../../assets/images/close.svg";
import { ReactComponent as FullscreenLogo } from "../../../assets/images/expand.svg";
import { ReactComponent as EyeLogo } from "../../../assets/images/eye.svg";
// import { ReactComponent as ShareLogo } from "../../../assets/images/share-social.svg";

// SCSS
import "./CardFullPopup.scss";
import { getCurrentUserAction } from "../../../redux/user/user-actions";
import VerticalMenu from "../../LayoutComponents/VerticalMenu/VerticalMenu";
import ShareMenu from "../../LayoutComponents/ShareMenu/ShareMenu";
import { deleteCardService } from "../../../services/cardsService";
import ConfirmationOverlay from "../../LayoutComponents/ConfirmationOverlay/ConfirmationOverlay";

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
  const popupCardIsOpen = useSelector(selectShowPopupCard);
  const isFullscreen = useSelector(selectFullscreen);
  const [confirmPopupOpen, setConfirmPopupOpen] = useState({
    open: false,
    message: "",
  });
  const descrEl = document.querySelector(".CardFullPopup__description");
  const isLoaded = useSelector(selectIsLoaded);

  useEffect(() => {
    if (!clickedCard || !cardsArray) return;
    setCardsArrayLength(cardsArray.length);
    const currentCardId = cardsArray.findIndex((card) => card.id === clickedCardId);
    setIndexOfCurrentCard(currentCardId);
  }, [cardsArray, clickedCard, clickedCardId]);

  const userHasLiked = useCallback(() => {
    if (currentUser && currentUser.id) {
      return cardLikers && cardLikers.some((likers) => likers === currentUser.id);
    } else {
      return false;
    }
  }, [cardLikers, currentUser]);

  const userHasSaved = useCallback(() => {
    if (currentUser && currentUser.id) {
      return currentUserSavedCards && currentUserSavedCards.some((cardsId) => cardsId === clickedCardId);
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

  const clickedCardDate = clickedCard && formattedDate(new Date(clickedCard.modified));

  const goPreviousCard = () => {
    const currentClickedCard = clickedCard ? document.querySelector(".CardFullPopup__scroll-wrapper") : null;
    currentClickedCard.scroll(0, 0);

    const indexOfCurrentCard = cardsArray.findIndex((card) => card.id === clickedCard.id);
    if (indexOfCurrentCard <= 0) return;
    const previousCard = cardsArray[indexOfCurrentCard - 1];
    dispatch(setClickedCard(previousCard));
  };

  const goNextCard = () => {
    const currentClickedCard = clickedCard ? document.querySelector(".CardFullPopup__scroll-wrapper") : null;
    currentClickedCard.scroll(0, 0);

    const indexOfCurrentCard = cardsArray.findIndex((card) => card.id === clickedCard.id);
    if (indexOfCurrentCard >= cardsArray.length - 1) return;
    const nextCard = cardsArray[indexOfCurrentCard + 1];
    dispatch(setClickedCard(nextCard));
  };

  const handlePopupClose = () => {
    console.log(location.pathname);
    if (location.pathname === "/") {
      window.history.pushState("", "", "/");
    } else if (location.pathname.includes("/account/")) {
      window.history.pushState("", "", location.pathname);
    } else if (location.pathname.includes("/profile/")) {
      window.history.pushState("", "", location.pathname);
    } else {
      dispatch(setRedirectUrl(true));

      window.history.pushState("", "", history.location.pathname + history.location.search);
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

  const handleConfirmClick = async () => {
    await dispatch(deleteCardAction(clickedCardId));
    setConfirmPopupOpen({ ...confirmPopupOpen, open: false });
    dispatch(closePopupCard());
    history.push("/account/user");

    // A VOIR pour fermer popup et rediriger
  };

  const handleRejectClick = () => {
    setConfirmPopupOpen({ open: false, message: "" });
  };

  const handleCardDelete = () => {
    if (!currentUser) dispatch(openConnexionPopup());
    setConfirmPopupOpen({
      open: true,
      message: "Voulez-vous vraiment supprimer cette carte ?",
    });
  };

  useEffect(() => {
    let cardDescrHTML;
    if (clickedCard.description) {
      cardDescrHTML = stringToHTML(clickedCard.description);
    }
    if (descrEl && cardDescrHTML) {
      descrEl.innerHTML = "";
      descrEl.appendChild(cardDescrHTML);
    }
  }, [clickedCard.description, descrEl]);

  const newSignalObject = { ...initialSignalState, id_card: clickedCardId };

  return (
    <>
      {!isLoaded && (
        <div className="CardFullPopup__loading">
          <Loading />
        </div>
      )}
      {confirmPopupOpen && confirmPopupOpen.open && confirmPopupOpen.open === true && (
        <ConfirmationOverlay
          handleConfirmClick={handleConfirmClick}
          handleRejectClick={handleRejectClick}
          message={confirmPopupOpen && confirmPopupOpen.message}
        />
      )}
      {popupCardIsOpen && (
        <div
          className="CardFullPopup"
          // className={`CardFullPopup ${popupCardIsOpen ? "noscroll" : ""}`}
          onClick={() => {
            handlePopupClose();
          }}
        >
          {!isFullscreen && (
            <div className="CardFullPopup__mobile">
              {clickedCardIsLoaded ? (
                <>
                  {cardIsLiked ? (
                    <HeartFull
                      className="card-action-button card-action-button__liked"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLikeClick();
                      }}
                    />
                  ) : (
                    <HeartEmpty
                      className="card-action-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLikeClick();
                      }}
                    />
                  )}
                  {cardIsSaved ? (
                    <BookmarkFull
                      className="card-action-button card-action-button__saved"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSaveClick();
                      }}
                    />
                  ) : (
                    <BookmarkEmpty
                      className="card-action-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSaveClick();
                      }}
                    />
                  )}

                  {/* <ShareLogo
                className="card-action-button"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              /> */}
                  <ShareMenu />

                  <FullscreenLogo
                    className="card-action-button"
                    id="card-action-button__fullscreen"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(showFullscreen());
                    }}
                  />

                  <VerticalMenu>
                    {currentUserId === clickedCard.user.id ? (
                      <p
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardDelete();
                        }}
                      >
                        Supprimer
                      </p>
                    ) : (
                      <p
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(showSignalPopup(newSignalObject));
                        }}
                      >
                        Signaler
                      </p>
                    )}
                  </VerticalMenu>

                  <CloseLogo
                    className="card-action-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePopupClose();
                    }}
                  />
                </>
              ) : null}
            </div>
          )}

          <div className={`CardFullPopup__allwrapper${isFullscreen ? "--fullscreen" : ""}`}>
            <div className="CardFullPopup__scroll-wrapper">
              <div className={`CardFullPopup__wrapper ${currentTheme}-theme`} onClick={(e) => e.stopPropagation()}>
                <div className="CardFullPopup__user CardFullPopup__section">
                  {/* <ShareButtons /> */}
                  <UserNameAndAvatar user={clickedCard && clickedCard.user && clickedCard.user} link={true} />
                </div>

                {clickedCardIsLoaded ? (
                  <>
                    <div className="CardFullPopup__slider">
                      <CardSlider />
                    </div>

                    <h1 className="title title-1 CardFullPopup__title">{clickedCard && clickedCard.name}</h1>

                    <div className="CardFullPopup__meta CardFullPopup__section">
                      <p className="CardFullPopup__meta-block CardFullPopup__meta--topic_category">
                        {clickedCard &&
                          clickedCard.topic &&
                          clickedCard.topic[0] &&
                          clickedCard.topic[0].name &&
                          renameQuery(clickedCard.topic[0].name)}{" "}
                        /{" "}
                        {clickedCard &&
                          clickedCard.categorie &&
                          clickedCard.categorie[0] &&
                          clickedCard.categorie[0].name &&
                          renameQuery(clickedCard.categorie[0].name)}
                      </p>
                      <p className="CardFullPopup__meta-block CardFullPopup__meta--date">Publié le {clickedCardDate}</p>
                      <div className="CardFullPopup__meta-block  CardFullPopup__meta--stats">
                        <span className="CardFullPopup__meta--logo">
                          <EyeLogo />
                        </span>

                        <span className="CardFullPopup__meta--number">
                          {clickedCard && clickedCard.total_views ? convertNumber(clickedCard.total_views) : 0}
                        </span>

                        <div className="CardFullPopup__like-btn" onClick={() => handleLikeClick()}>
                          <span
                            className={`CardFullPopup__meta--logo ${userHasLiked() ? "active" : ""}`}
                            id={`likesNumberPopupLogo${clickedCard.id}`}
                          >
                            {cardIsLiked ? <HeartFull /> : <HeartEmpty />}
                          </span>

                          <span
                            className={`CardFullPopup__meta--number ${userHasLiked() ? "active" : ""}`}
                            id={`likesNumberPopupNumber${clickedCard.id}`}
                          >
                            {clickedCard && clickedCard.number_of_likes ? convertNumber(clickedCard.number_of_likes) : 0}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="CardFullPopup__description CardFullPopup__section">
                      <h2 className="title title-2">Description</h2>
                      {/* {clickedCard && <> {stringToHTML(clickedCard.description)}</>} */}
                    </div>

                    <div className="CardFullPopup__commentaires CardFullPopup__section">
                      <h2 className="title title-2">Commentaires</h2>
                      <CommentsWrapper />
                    </div>

                    <div className="CardFullPopup__autres-posts CardFullPopup__section">
                      <h2 className="title title-2">Du même auteur :</h2>
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
                                  window.history.pushState("", "", `/card_id=${card.id && card.id}`);
                                  document.querySelector(".CardFullPopup__scroll-wrapper").scroll(0, 0);
                                }}
                              >
                                {clickedCardIsLoaded && card && card.media_image && card.media_image["0"] && card.media_image["0"].image ? (
                                  <img style={{ width: "100%", height: "100%" }} src={card.media_image["0"].image} alt="autre" />
                                ) : (
                                  <div className="CardFullPopup__empty-image">Image(s) Indisponible(s)</div>
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
            </div>

            <div className="CardFullPopup__action-button">
              {clickedCardIsLoaded ? (
                <>
                  <div
                    className="card-action-button__wrapper"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <CloseLogo
                      className="card-action-button"
                      onClick={(e) => {
                        handlePopupClose();
                      }}
                    />
                  </div>
                  {cardIsLiked ? (
                    <div
                      className="card-action-button__wrapper"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <HeartFull
                        className="card-action-button card-action-button__liked"
                        onClick={(e) => {
                          handleLikeClick();
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      className="card-action-button__wrapper"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <HeartEmpty
                        className="card-action-button"
                        onClick={(e) => {
                          handleLikeClick();
                        }}
                      />
                    </div>
                  )}
                  {cardIsSaved ? (
                    <div
                      className="card-action-button__wrapper"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <BookmarkFull
                        className="card-action-button card-action-button__saved"
                        onClick={(e) => {
                          handleSaveClick();
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      className="card-action-button__wrapper"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <BookmarkEmpty
                        className="card-action-button"
                        onClick={(e) => {
                          handleSaveClick();
                        }}
                      />
                    </div>
                  )}

                  {/* <div
                className="card-action-button__wrapper"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              > */}
                  {/* <ShareMenu addclass="card-action-button__wrapper" /> */}
                  <ShareMenu addclass="card-action-button__wrapper" test="test" />
                  {/* </div> */}

                  <div
                    className="card-action-button__wrapper"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(showFullscreen());
                    }}
                  >
                    <FullscreenLogo
                      className="card-action-button"
                      id="card-action-button__fullscreen"
                      // onClick={(e) => {
                      //   dispatch(showFullscreen());
                      // }}
                    />
                  </div>
                  {/* <div
                className="card-action-button__wrapper"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              > */}

                  <VerticalMenu addclass="card-action-button__wrapper">
                    {currentUserId === clickedCard.user.id ? (
                      <p
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardDelete();
                        }}
                      >
                        Supprimer
                      </p>
                    ) : (
                      <p
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(showSignalPopup(newSignalObject));
                        }}
                      >
                        Signaler
                      </p>
                    )}
                  </VerticalMenu>
                  {/* </div> */}
                </>
              ) : null}
            </div>
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
      )}
    </>
  );
};

export default withRouter(CardFullPopup);
