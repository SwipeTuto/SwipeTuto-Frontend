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
  addCommentAction,
  addReplyAction,
} from "../../../../redux/filter/filter-actions";
import { getReplies, getNextReplies } from "../../../../services/socialService";

// helper
import { commentsFormattedDate } from "../../../../helper/index";

// components
import UserAvatar from "../../../UserComponents/UserAvatar/UserAvatar";
import UserUsername from "../../../UserComponents/UserAvatar/UserUsername";
import ConnexionRedirect from "../../ConnexionRedirect/ConnexionRedirect";
import CommentsInput from "../../CommentsInput/CommentsInput";
import ConfirmationOverlay from "../../ConfirmationOverlay/ConfirmationOverlay";
import SecondLevelComment from "../SecondLevelComment/SecondLevelComment";

// assets
import { ReactComponent as ChatLogo } from "../../../../assets/images/chatbubbles-outline.svg";
import { ReactComponent as HeartEmpty } from "../../../../assets/images/heart-outline.svg";
import { ReactComponent as HeartFull } from "../../../../assets/images/heart.svg";
import { ReactComponent as MobileMenu } from "../../../../assets/images/ellipsis-vertical.svg";
import { ReactComponent as CloseLogo } from "../../../../assets/images/close.svg";

import "./FirstLevelComment.scss";

const FirstLevelComment = ({ comment }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const cardComments = useSelector(selectClickedCardComments);
  const clickedCardId = useSelector(selectClickedCardId);
  const commentAuthor = comment.author;
  const commentId = comment.id;
  const commentLikers = useSelector(selectCommentLikers(commentId));
  const replyCount = comment.reply_count;
  const likesCount = comment.likes_count;
  const replyLinkToFetch = comment.reply_comments;
  const [commentIsLiked, setCommentIsLiked] = useState();
  const [connectRedirect, setConnectRedirect] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [repliesBlockVisible, setRepliesBlockVisible] = useState(false);
  const [repliesArray, setRepliesArray] = useState();
  const [replyInputShow, setReplyInputShow] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [nextRepliesLink, setNextRepliesLink] = useState();
  const [confirmPopupOpen, setConfirmPopupOpen] = useState({
    open: false,
    message: "",
    id: null,
  });

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
      const likeElMobile = [
        ...document.getElementsByClassName(
          "FirstLevelComment__mobile--likes-number"
        ),
      ][0];
      const likeEl = [
        ...document.getElementsByClassName(
          "FirstLevelComment__aside--likes-number"
        ),
      ][0];

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

  // juste toggle affichage input réponse
  const handleCommentRespond = () => {
    setNewComment("@" + commentAuthor.username + " ");
    setMobileMenu(false);
    setReplyInputShow(true);
  };

  useEffect(() => {
    if (replyInputShow) {
      const inputToScrollTo = [
        ...document.getElementsByClassName("CommentsInputReply"),
      ][0];
      const cardFullPopupEl = [
        ...document.getElementsByClassName("CardFullPopup active"),
      ][0];
      console.log(inputToScrollTo.offsetTop, cardFullPopupEl);
      cardFullPopupEl.scrollTo(0, inputToScrollTo.offsetTop);
    }
  }, [replyInputShow]);

  const handleReplyInputClose = () => {
    setMobileMenu(false);
    setReplyInputShow(false);
  };

  // gestion du nouveau commentaire
  const handleAddCommentClick = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setConnectRedirect(true);
    } else {
      await dispatch(addReplyAction(clickedCardId, commentId, newComment));

      await handleRepliesFetch();
      const allReplies = [
        ...document.getElementsByClassName("SecondLevelComment"),
      ];
      const lastReply = allReplies[allReplies.length - 1];
      const cardFullPopupEl = [
        ...document.getElementsByClassName("CardFullPopup active"),
      ][0];
      await cardFullPopupEl.scrollTo(0, lastReply.offsetTop);
      if (currentUser) {
        setNewComment("");
      }
    }
  };

  const handleInputValueChange = (e) => {
    setNewComment(e.target.value);
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

  const handleReplyDelete = async (replyId) => {
    await dispatch(deleteCommentAction(replyId, clickedCardId));
    await handleRepliesFetch();
    // setConfirmPopupOpen({ ...confirmPopupOpen, open: false });
  };

  const handleRejectClick = () => {
    setConfirmPopupOpen({ open: false, message: "", id: null });
  };

  const commentFormattedDate = commentsFormattedDate(comment.posted_on);

  const handleRepliesFetch = async () => {
    // lancer action pour fetch les réponses
    const repliesArrayFetched = getReplies(commentId);
    await repliesArrayFetched.then((rep) => {
      rep &&
        rep.data &&
        rep.data.results &&
        setRepliesArray([...rep.data.results]);
      rep && rep.data && rep.data.next
        ? setNextRepliesLink(rep.data.next)
        : setNextRepliesLink(null);
    });
    setRepliesBlockVisible(true);
  };

  const handleRepliesNextFetch = async () => {
    // lancer action pour fetch les réponses
    const repliesArrayFetched = getNextReplies(nextRepliesLink);
    await repliesArrayFetched.then((rep) => {
      rep &&
        rep.data &&
        rep.data.results &&
        setRepliesArray([...repliesArray, ...rep.data.results]);
      rep && rep.data && rep.data.next
        ? setNextRepliesLink(rep.data.next)
        : setNextRepliesLink(null);
    });
    setRepliesBlockVisible(true);
  };

  useEffect(() => {
    console.log(nextRepliesLink);
  }, [nextRepliesLink]);

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
              <p className="FirstLevelComment__mobile--likes-number">
                {likesCount ? likesCount : 0}
              </p>
              {commentIsLiked ? (
                <HeartFull className=" FirstLevelComment__mobile--logo comment-logo__liked" />
              ) : (
                <HeartEmpty className=" FirstLevelComment__mobile--logo" />
              )}
            </div>

            <div className="FirstLevelComment__mobile--comments">
              <p className="FirstLevelComment__mobile--comments-number">
                {replyCount && replyCount}
              </p>
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
            <p className="FirstLevelComment__date">
              {comment && commentFormattedDate}
            </p>
            <p
              className="FirstLevelComment__action"
              onClick={() => handleCommentLike()}
            >
              {commentIsLiked ? "Je n'aime plus" : "J'aime"}
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
              <HeartFull className=" FirstLevelComment__aside--logo comment-logo__liked" />
            ) : (
              <HeartEmpty className=" FirstLevelComment__aside--logo" />
            )}
            <p className="FirstLevelComment__aside--likes-number">
              {likesCount ? likesCount : 0}
            </p>
          </div>
          <div className="FirstLevelComment__aside--comments">
            <ChatLogo className=" FirstLevelComment__aside--logo" />
            <p className="FirstLevelComment__aside--comments-number">
              {replyCount && replyCount}
            </p>
          </div>
        </div>
      </div>
      <div className="FirstLevelComment__replies">
        {repliesBlockVisible ? (
          <>
            {repliesArray &&
              repliesArray.map((reply, index) => (
                <SecondLevelComment
                  key={index}
                  reply={reply}
                  handleCommentRespond={handleCommentRespond}
                  handleReplyDelete={handleReplyDelete}
                />
              ))}
            {nextRepliesLink ? (
              <p
                className="FirstLevelComment__replies--message"
                onClick={() => handleRepliesNextFetch()}
              >
                Voir les réponses suivantes
              </p>
            ) : null}
          </>
        ) : replyCount !== 0 ? (
          <p
            className="FirstLevelComment__replies--message"
            onClick={() => handleRepliesFetch()}
          >
            Voir les {replyCount ? replyCount : ""} réponses...
          </p>
        ) : null}
        {replyInputShow && (
          <div className="FirstLevelComment__replies--input">
            <CommentsInput
              className="CommentsInputReply"
              newComment={newComment}
              handleAddCommentClick={handleAddCommentClick}
              handleInputValueChange={handleInputValueChange}
            />
            <CloseLogo
              className="FirstLevelComment__close-logo"
              onClick={() => handleReplyInputClose()}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default FirstLevelComment;
