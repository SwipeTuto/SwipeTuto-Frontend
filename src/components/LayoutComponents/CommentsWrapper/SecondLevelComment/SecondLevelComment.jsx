import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// redux
import { selectCurrentUser } from "../../../../redux/user/user-selectors";
import { selectClickedCardId } from "../../../../redux/filter/filter-selectors";
import { toggleCommentLikeAction } from "../../../../redux/filter/filter-actions";

// helper
import { commentsFormattedDate } from "../../../../helper/index";

// components
import UserAvatar from "../../../UserComponents/UserAvatar/UserAvatar";
import UserUsername from "../../../UserComponents/UserAvatar/UserUsername";
import ConnexionRedirect from "../../ConnexionRedirect/ConnexionRedirect";

// assets
import { ReactComponent as HeartEmpty } from "../../../../assets/images/heart-outline.svg";
import { ReactComponent as HeartFull } from "../../../../assets/images/heart.svg";
import { ReactComponent as MobileMenu } from "../../../../assets/images/ellipsis-vertical.svg";

import "./SecondLevelComment.scss";
import ConfirmationOverlay from "../../ConfirmationOverlay/ConfirmationOverlay";

const SecondLevelComment = ({
  reply,
  handleCommentRespond,
  handleReplyDelete,
}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const commentAuthor = reply.author;
  const commentId = reply.id;
  const [commentIsLiked, setCommentIsLiked] = useState();
  const [connectRedirect, setConnectRedirect] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [confirmPopupOpen, setConfirmPopupOpen] = useState({
    open: false,
    message: "",
    id: null,
  });
  const commentLikers = reply && reply.likes;

  useEffect(() => {
    setCommentIsLiked(userHasLiked());
  }, [commentLikers, currentUser]);

  const userHasLiked = () => {
    if (currentUser && currentUser.id) {
      return (
        commentLikers &&
        commentLikers.some((likers) => likers === currentUser.id)
      );
    } else {
      return false;
    }
  };

  const handleCommentLike = () => {
    if (!currentUser) {
      setConnectRedirect(true);
    } else {
      dispatch(toggleCommentLikeAction(commentId));
      const likeElMobile = document.querySelector(
        `.SecondLevelComment__mobile--likes-number[data-likes="${commentId}"]`
      );
      const likeEl = document.querySelector(
        `.SecondLevelComment__aside--likes-number[data-likes="${commentId}"]`
      );

      if (commentIsLiked) {
        likeElMobile.textContent = parseInt(likeElMobile.textContent) - 1;
        likeEl.textContent = parseInt(likeEl.textContent) - 1;
      } else {
        likeElMobile.textContent = parseInt(likeElMobile.textContent) + 1;
        likeEl.textContent = parseInt(likeEl.textContent) + 1;
      }
      setCommentIsLiked(!commentIsLiked);
    }
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
    handleReplyDelete(confirmPopupOpen.id);
    setConfirmPopupOpen({ ...confirmPopupOpen, open: false });
  };

  const handleRejectClick = () => {
    setConfirmPopupOpen({ open: false, message: "", id: null });
  };

  const commentFormattedDate = commentsFormattedDate(reply.posted_on);

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

      <div className="SecondLevelComment">
        <div className=" SecondLevelComment__author">
          <UserAvatar user={commentAuthor} link={true} />
          <div className="SecondLevelComment__mobile-stats">
            <div className="SecondLevelComment__mobile--likes">
              <p className="SecondLevelComment__mobile--likes-number">
                {reply && reply.likes && reply.likes.length}
              </p>
              {commentIsLiked ? (
                <HeartFull className=" SecondLevelComment__mobile--logo comment-logo__liked" />
              ) : (
                <HeartEmpty className=" SecondLevelComment__mobile--logo" />
              )}
            </div>
          </div>
        </div>
        <div className="SecondLevelComment__wrapper">
          <div className="SecondLevelComment__center">
            <UserUsername user={commentAuthor} link={true} />
            <p className="SecondLevelComment__comment">{reply && reply.text}</p>
            <div className="SecondLevelComment__mobile-menu">
              <MobileMenu
                className="SecondLevelComment__mobile-menu--logo"
                onClick={() => setMobileMenu(!mobileMenu)}
              />
              {mobileMenu && (
                <div className="SecondLevelComment__mobile-menu--panel">
                  {commentAuthor &&
                    commentAuthor.id &&
                    currentUser &&
                    currentUser.id &&
                    commentAuthor.id === currentUser.id && (
                      <p
                        className="SecondLevelComment__mobile-action"
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
          <div className="SecondLevelComment__actions">
            <p className="SecondLevelComment__action">
              {reply && commentFormattedDate}
            </p>
            <p
              className="SecondLevelComment__action"
              onClick={() => handleCommentLike()}
            >
              {commentIsLiked ? "Je n'aime plus" : "J'aime"}
            </p>
            <p
              className="SecondLevelComment__action"
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
                  className="SecondLevelComment__action"
                  data-commentid={commentId}
                  onClick={(e) => handleCommentDelete(e)}
                >
                  Supprimer
                </p>
              )}
          </div>
        </div>
        <div className=" SecondLevelComment__aside">
          <div className="SecondLevelComment__aside--likes">
            {commentIsLiked ? (
              <HeartFull className=" SecondLevelComment__aside--logo comment-logo__liked" />
            ) : (
              <HeartEmpty className=" SecondLevelComment__aside--logo" />
            )}
            <p className="SecondLevelComment__aside--likes-number">
              {reply && reply.likes && reply.likes.length}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecondLevelComment;
