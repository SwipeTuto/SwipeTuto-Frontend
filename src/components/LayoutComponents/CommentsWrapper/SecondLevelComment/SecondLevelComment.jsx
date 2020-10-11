import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

// redux
import { selectCurrentUser } from "../../../../redux/user/user-selectors";
import { toggleCommentLikeAction } from "../../../../redux/filter/filter-actions";

// helper
import {
  commentsFormattedDate,
  initialSignalState,
} from "../../../../helper/index";

// components
import UserAvatar from "../../../UserComponents/UserAvatar/UserAvatar";
import UserUsername from "../../../UserComponents/UserAvatar/UserUsername";

// assets
import { ReactComponent as HeartEmpty } from "../../../../assets/images/heart-outline.svg";
import { ReactComponent as HeartFull } from "../../../../assets/images/heart.svg";
import { ReactComponent as MobileMenu } from "../../../../assets/images/ellipsis-vertical.svg";

import "./SecondLevelComment.scss";
import ConfirmationOverlay from "../../ConfirmationOverlay/ConfirmationOverlay";
import {
  openConnexionPopup,
  showSignalPopup,
} from "../../../../redux/layout/layout-actions";
import VerticalMenu from "../../VerticalMenu/VerticalMenu";

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
  const [confirmPopupOpen, setConfirmPopupOpen] = useState({
    open: false,
    message: "",
    id: null,
  });
  const commentLikers = reply && reply.likes;

  const userHasLiked = useCallback(() => {
    if (currentUser && currentUser.id) {
      return (
        commentLikers &&
        commentLikers.some((likers) => likers === currentUser.id)
      );
    } else {
      return false;
    }
  }, [commentLikers, currentUser]);

  useEffect(() => {
    setCommentIsLiked(userHasLiked());
  }, [commentLikers, currentUser, userHasLiked]);

  const handleCommentLike = () => {
    if (!currentUser) {
      dispatch(openConnexionPopup());
    } else {
      dispatch(toggleCommentLikeAction(commentId));
      const likeElMobile = document.querySelector(
        `.SecondLevelComment__mobile--likes-number[data-likes="${commentId}"]`
      );
      const likeEl = document.querySelector(
        `.SecondLevelComment__aside--likes-number[data-likes="${commentId}"]`
      );
      if (commentIsLiked) {
        if (likeElMobile)
          likeElMobile.textContent = parseInt(likeElMobile.textContent) - 1;
        if (likeEl) likeEl.textContent = parseInt(likeEl.textContent) - 1;
      } else {
        if (likeElMobile)
          likeElMobile.textContent = parseInt(likeElMobile.textContent) + 1;
        if (likeEl) likeEl.textContent = parseInt(likeEl.textContent) + 1;
      }
      setCommentIsLiked(!commentIsLiked);
    }
  };
  const handleCommentDelete = (e) => {
    if (!currentUser) dispatch(openConnexionPopup());
    const commentId = e.target.dataset.commentid;
    setConfirmPopupOpen({
      open: true,
      message: "Voulez-vous vraiment supprimer ce commentaire ?",
      id: commentId,
    });
  };

  const handleConfirmClick = () => {
    handleReplyDelete(confirmPopupOpen.id);
    setConfirmPopupOpen({ ...confirmPopupOpen, open: false });
  };

  const handleRejectClick = () => {
    setConfirmPopupOpen({ open: false, message: "", id: null });
  };

  const commentFormattedDate = commentsFormattedDate(reply.posted_on);

  const newSignalObject = { ...initialSignalState, id_comment: commentId };

  return (
    <>
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
            <div className="SecondLevelComment__center--top">
              <UserUsername user={commentAuthor} link={true} />
              <VerticalMenu>
                {commentAuthor &&
                commentAuthor.id &&
                currentUser &&
                currentUser.id &&
                commentAuthor.id === currentUser.id ? (
                  <p
                    data-commentid={commentId}
                    onClick={(e) => handleCommentDelete(e)}
                  >
                    Supprimer
                  </p>
                ) : (
                  <p onClick={() => dispatch(showSignalPopup(newSignalObject))}>
                    Signaler
                  </p>
                )}
              </VerticalMenu>
            </div>
            <p className="SecondLevelComment__comment">{reply && reply.text}</p>
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
            <p
              className="SecondLevelComment__aside--likes-number"
              data-likes={commentId}
            >
              {reply && reply.likes && reply.likes.length}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecondLevelComment;
