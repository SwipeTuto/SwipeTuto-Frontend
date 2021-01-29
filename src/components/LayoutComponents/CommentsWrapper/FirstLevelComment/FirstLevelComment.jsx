import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

// redux
import { selectCurrentUser } from "../../../../redux/user/user-selectors";
import { selectCommentLikers } from "../../../../redux/filter/filter-selectors";
import { toggleCommentLikeAction } from "../../../../redux/filter/filter-actions";
// import { getReplies, getNextReplies } from "../../../../services/socialService";

// helper
import { commentsFormattedDate, initialSignalState } from "../../../../helper/index";

// components
import UserAvatar from "../../../UserComponents/UserAvatar/UserAvatar";
import UserUsername from "../../../UserComponents/UserAvatar/UserUsername";
// import CommentsInput from "../../CommentsInput copy/CommentsInput";
import ConfirmationOverlay from "../../ConfirmationOverlay/ConfirmationOverlay";
// import SecondLevelComment from "../SecondLevelComment/SecondLevelComment";

// assets
// import { ReactComponent as ChatLogo } from "../../../../assets/images/chatbubbles-outline.svg";
import { ReactComponent as HeartEmpty } from "../../../../assets/images/heart-outline.svg";
import { ReactComponent as HeartFull } from "../../../../assets/images/heart.svg";
// import { ReactComponent as CloseLogo } from "../../../../assets/images/close.svg";

import "./FirstLevelComment.scss";
import { openConnexionPopup, showSignalPopup } from "../../../../redux/layout/layout-actions";
import VerticalMenu from "../../VerticalMenu/VerticalMenu";
import { selectTheme } from "../../../../redux/layout/layout-selectors";

const FirstLevelComment = ({ comment, confirmCommentDelete, handleUpdate, handleCommentRespond }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const commentAuthor = comment.author;
  const commentId = comment.id;
  const commentLikers = useSelector(selectCommentLikers(commentId));
  const likesCount = comment.likes_count;
  const [commentIsLiked, setCommentIsLiked] = useState();
  const currentTheme = useSelector(selectTheme);

  //! GESTION DELETE
  const [confirmPopupOpen, setConfirmPopupOpen] = useState({
    open: false,
    message: "",
    id: null,
  });

  // First level comment delete
  const handleCommentDelete = (e) => {
    if (!currentUser) dispatch(openConnexionPopup());
    const commentId = e.target.dataset.commentid;
    setConfirmPopupOpen({
      open: true,
      message: "Voulez-vous vraiment supprimer ce commentaire ?",
      id: commentId,
    });
  };

  // confirm / reject delete popup
  const handleConfirmClick = () => {
    handleUpdate && handleUpdate();
    confirmCommentDelete(confirmPopupOpen.id);
    setConfirmPopupOpen({ ...confirmPopupOpen, open: false });
  };

  const handleRejectClick = () => {
    setConfirmPopupOpen({ open: false, message: "", id: null });
  };

  //! FIRST LEVEL COMMENT ELEMENT
  const userHasLiked = useCallback(() => {
    if (currentUser && currentUser.id) {
      return commentLikers && commentLikers.some((likers) => likers === currentUser.id);
    } else {
      return false;
    }
  }, [commentLikers, currentUser]);

  useEffect(() => {
    setCommentIsLiked(userHasLiked());
  }, [commentLikers, currentUser, userHasLiked]);

  const handleCommentLike = (commentId) => {
    if (!currentUser) {
      dispatch(openConnexionPopup());
    } else {
      dispatch(toggleCommentLikeAction(commentId));
      const likeEl = document.querySelector(`.FirstLevelComment__action--likes-number[data-likes="${commentId}"]`);
      if (commentIsLiked) {
        likeEl.textContent = parseInt(likeEl.textContent) - 1;
      } else {
        likeEl.textContent = parseInt(likeEl.textContent) + 1;
      }
      setCommentIsLiked(!commentIsLiked);
    }
  };

  // utilitaires :
  const commentFormattedDate = commentsFormattedDate(comment.posted_on);
  const newSignalObject = { ...initialSignalState, id_comment: commentId };

  return (
    <>
      {confirmPopupOpen && confirmPopupOpen.open && confirmPopupOpen.open === true && (
        <ConfirmationOverlay
          handleConfirmClick={handleConfirmClick}
          handleRejectClick={handleRejectClick}
          message={confirmPopupOpen && confirmPopupOpen.message}
        />
      )}

      <div className="FirstLevelComment">
        <div className=" FirstLevelComment__author">
          <UserAvatar user={commentAuthor} link={true} />
        </div>
        <div className="FirstLevelComment__wrapper">
          <div className={`FirstLevelComment__center ${currentTheme}-theme-l`}>
            <VerticalMenu>
              {commentAuthor && commentAuthor.id && currentUser && currentUser.id && commentAuthor.id === currentUser.id ? (
                <p data-commentid={commentId} onClick={(e) => handleCommentDelete(e)}>
                  Supprimer
                </p>
              ) : (
                <p onClick={() => dispatch(showSignalPopup(newSignalObject))}>Signaler</p>
              )}
            </VerticalMenu>
            <div className="FirstLevelComment__center--top">
              <div className="FirstLevelComment__username">
                <UserUsername user={commentAuthor} link={true} />
                <span className="FirstLevelComment__date">{comment && commentFormattedDate}</span>
              </div>
            </div>
            <p className="FirstLevelComment__comment">{comment && comment.text}</p>
          </div>
          <div className="FirstLevelComment__actions">
            <p className="FirstLevelComment__action--likes-number" data-likes={commentId}>
              {likesCount ? likesCount : 0}
            </p>
            {commentIsLiked ? (
              <HeartFull className=" FirstLevelComment__action--logo comment-logo__liked" />
            ) : (
              <HeartEmpty className=" FirstLevelComment__action--logo" />
            )}
            <p className="FirstLevelComment__action" onClick={() => handleCommentLike(commentId)}>
              {commentIsLiked ? "Je n'aime plus" : "J'aime"}
            </p>
            <p className="FirstLevelComment__action" onClick={() => handleCommentRespond(commentAuthor)}>
              Répondre
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstLevelComment;
