import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// redux
import { selectCurrentUser } from "../../../../redux/user/user-selectors";
import {
  selectClickedCardComments,
  selectCommentLikers,
  selectClickedCardId,
} from "../../../../redux/filter/filter-selectors";
import {
  toggleCommentLikeAction,
  deleteCommentAction,
  getCardCommentsAction,
} from "../../../../redux/filter/filter-actions";

// helper
import { commentsFormattedDate } from "../../../../helper/index";

// components
import UserAvatar from "../../../UserComponents/UserAvatar/UserAvatar";
import UserUsername from "../../../UserComponents/UserAvatar/UserUsername";
import ConnexionRedirect from "../../ConnexionRedirect/ConnexionRedirect";

// assets
import { ReactComponent as ChatLogo } from "../../../../assets/images/chatbubbles-outline.svg";
import { ReactComponent as HeartEmpty } from "../../../../assets/images/heart-outline.svg";
import { ReactComponent as HeartFull } from "../../../../assets/images/heart.svg";
import { ReactComponent as MobileMenu } from "../../../../assets/images/ellipsis-vertical.svg";

import "./FirstLevelComment.scss";
import ConfirmationOverlay from "../../ConfirmationOverlay/ConfirmationOverlay";

const FirstLevelComment = ({ comment }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const commentLikers = useSelector(selectCommentLikers);
  const cardComments = useSelector(selectClickedCardComments);
  const clickedCardId = useSelector(selectClickedCardId);
  const commentAuthor = comment.author;
  const commentId = comment.id;
  const [commentIsLiked, setCommentIsLiked] = useState();
  const [connectRedirect, setConnectRedirect] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [confirmPopupOpen, setConfirmPopupOpen] = useState({
    open: false,
    message: "",
    id: null,
  });

  useEffect(() => {
    setCommentIsLiked(userHasLiked());
  }, [commentLikers, currentUser]);

  const userHasLiked = () => {
    // if (currentUser && currentUser.id) {
    //   return (
    //     commentLikers &&
    //     commentLikers.some((likers) => likers === currentUser.id)
    //   );
    // } else {
    //   return false;
    // }
  };

  const handleCommentLike = () => {
    // if (!currentUser) {
    //   setConnectRedirect(true);
    // } else {
    //   dispatchEvent(toggleCommentLikeAction(commentId));
    //   setCommentIsLiked(!commentIsLiked);
    // }
    setMobileMenu(false);
  };

  const handleCommentRespond = () => {
    setMobileMenu(false);
  };

  const handleCommentDelete = (e) => {
    if (!currentUser) setConnectRedirect(true);
    const commentId = e.target.dataset.commentid;
    setConfirmPopupOpen({
      open: true,
      message: "Voulez-vous vraiment supprimer ce commentaire ?",
      id: commentId,
    });
    setMobileMenu(false);
  };

  const handleClose = () => {
    setConnectRedirect(false);
  };

  const handleConfirmClick = () => {
    dispatch(deleteCommentAction(confirmPopupOpen.id, clickedCardId));
    setConfirmPopupOpen({ ...confirmPopupOpen, open: false });
    // dispatch(getCardCommentsAction(clickedCardId));
  };
  const handleRejectClick = () => {
    setConfirmPopupOpen({ open: false, message: "", id: null });
  };

  const commentFormattedDate = commentsFormattedDate(comment.posted_on);

  return (
    <>
      {connectRedirect && <ConnexionRedirect handleClose={handleClose} />}
      {confirmPopupOpen &&
        confirmPopupOpen.open &&
        confirmPopupOpen.open === true && (
          <ConfirmationOverlay
            handleConfirmClick={handleConfirmClick}
            handleRejectClick={handleRejectClick}
            message={confirmPopupOpen && confirmPopupOpen.message}
          />
        )}

      <div className="FirstLevelComment">
        <div className=" FirstLevelComment__author">
          <UserAvatar user={commentAuthor} link={true} />
          <div className="FirstLevelComment__mobile-stats">
            <div className="FirstLevelComment__mobile--likes">
              <p className="FirstLevelComment__mobile--likes-number">23</p>
              {commentIsLiked ? (
                <HeartFull className=" FirstLevelComment__mobile--logo" />
              ) : (
                <HeartEmpty className=" FirstLevelComment__mobile--logo" />
              )}
            </div>

            <div className="FirstLevelComment__mobile--comments">
              <p className="FirstLevelComment__mobile--comments-number">4</p>
              <ChatLogo className=" FirstLevelComment__mobile--logo" />
            </div>
          </div>
        </div>
        <div className="FirstLevelComment__wrapper">
          <div className="FirstLevelComment__center">
            <UserUsername user={commentAuthor} link={true} />
            <p className="FirstLevelComment__comment">
              {comment && comment.text}
            </p>
            <div className="FirstLevelComment__mobile-menu">
              <MobileMenu
                className="FirstLevelComment__mobile-menu--logo"
                onClick={() => setMobileMenu(!mobileMenu)}
              />
              {mobileMenu && (
                <div className="FirstLevelComment__mobile-menu--panel">
                  {commentAuthor &&
                    commentAuthor.id &&
                    currentUser &&
                    currentUser.id &&
                    commentAuthor.id === currentUser.id && (
                      <p
                        className="FirstLevelComment__mobile-action"
                        data-commentid={commentId}
                        onClick={(e) => handleCommentDelete(e)}
                      >
                        Supprimer
                      </p>
                    )}
                </div>
              )}
            </div>
          </div>
          <div className="FirstLevelComment__actions">
            <p className="FirstLevelComment__action">
              {comment && commentFormattedDate}
            </p>
            <p
              className="FirstLevelComment__action"
              onClick={() => handleCommentLike()}
            >
              J'aime
            </p>
            <p
              className="FirstLevelComment__action"
              onClick={() => handleCommentRespond()}
            >
              Répondre
            </p>
            {commentAuthor &&
              commentAuthor.id &&
              currentUser &&
              currentUser.id &&
              commentAuthor.id === currentUser.id && (
                <p
                  className="FirstLevelComment__action"
                  data-commentid={commentId}
                  onClick={(e) => handleCommentDelete(e)}
                >
                  Supprimer
                </p>
              )}
          </div>
        </div>
        <div className=" FirstLevelComment__aside">
          <div className="FirstLevelComment__aside--likes">
            {commentIsLiked ? (
              <HeartFull className=" FirstLevelComment__aside--logo" />
            ) : (
              <HeartEmpty className=" FirstLevelComment__aside--logo" />
            )}
            <p className="FirstLevelComment__aside--likes-number">23</p>
          </div>
          <div className="FirstLevelComment__aside--comments">
            <ChatLogo className=" FirstLevelComment__aside--logo" />
            <p className="FirstLevelComment__aside--comments-number">4</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstLevelComment;
