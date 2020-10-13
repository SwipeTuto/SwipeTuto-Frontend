import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

// redux
import { selectCurrentUser } from "../../../../redux/user/user-selectors";
import {
  selectCommentLikers,
  selectClickedCardId,
  selectLastPublishedComment,
} from "../../../../redux/filter/filter-selectors";
import {
  toggleCommentLikeAction,
  deleteCommentAction,
  addReplyAction,
} from "../../../../redux/filter/filter-actions";
import { getReplies, getNextReplies } from "../../../../services/socialService";

// helper
import {
  commentsFormattedDate,
  initialSignalState,
} from "../../../../helper/index";

// components
import UserAvatar from "../../../UserComponents/UserAvatar/UserAvatar";
import UserUsername from "../../../UserComponents/UserAvatar/UserUsername";
import CommentsInput from "../../CommentsInput/CommentsInput";
import ConfirmationOverlay from "../../ConfirmationOverlay/ConfirmationOverlay";
import SecondLevelComment from "../SecondLevelComment/SecondLevelComment";

// assets
import { ReactComponent as ChatLogo } from "../../../../assets/images/chatbubbles-outline.svg";
import { ReactComponent as HeartEmpty } from "../../../../assets/images/heart-outline.svg";
import { ReactComponent as HeartFull } from "../../../../assets/images/heart.svg";
import { ReactComponent as CloseLogo } from "../../../../assets/images/close.svg";

import "./FirstLevelComment.scss";
import {
  openConnexionPopup,
  showSignalPopup,
} from "../../../../redux/layout/layout-actions";
import VerticalMenu from "../../VerticalMenu/VerticalMenu";

const FirstLevelComment = ({ comment, confirmCommentDelete }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const clickedCardId = useSelector(selectClickedCardId);
  const lastPublishedComment = useSelector(selectLastPublishedComment);
  const commentAuthor = comment.author;
  const commentId = comment.id;
  const commentLikers = useSelector(selectCommentLikers(commentId));
  const replyCount = comment.reply_count;
  const likesCount = comment.likes_count;
  const [commentIsLiked, setCommentIsLiked] = useState();
  const [localRepliesArray, setLocalRepliesArray] = useState([]);
  const [repliesBlockVisible, setRepliesBlockVisible] = useState(false);
  const [replyInputShow, setReplyInputShow] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [newCommentSubmit, setNewCommentSubmit] = useState(false);
  const [nextRepliesLink, setNextRepliesLink] = useState();
  const [localLastPublishedComments, setLocalLastPublishedComments] = useState(
    []
  );
  const [confirmPopupOpen, setConfirmPopupOpen] = useState({
    open: false,
    message: "",
    id: null,
  });

  useEffect(() => {
    if (
      newCommentSubmit === true &&
      lastPublishedComment !== null &&
      lastPublishedComment !==
        localLastPublishedComments[localLastPublishedComments.length - 1]
    ) {
      const arrayCopy = localLastPublishedComments;
      arrayCopy.push(lastPublishedComment);
      setLocalLastPublishedComments(arrayCopy);
      setNewCommentSubmit(false);
    }
  }, [newCommentSubmit, lastPublishedComment, localLastPublishedComments]);

  useEffect(() => {
    localLastPublishedComments.forEach((localComment) => {
      const commentAlreadyExists = localRepliesArray.filter((comment) => {
        return comment.id === localComment.id;
      });
      if (commentAlreadyExists.length > 0) {
        const index = localLastPublishedComments.indexOf(localComment);
        const arrayCopy = localLastPublishedComments;
        if (index > -1) {
          arrayCopy.splice(index, 1);
          setLocalLastPublishedComments(arrayCopy);
        }
      }
    });
  }, [localRepliesArray, localLastPublishedComments]);

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

  const handleCommentLike = (commentId) => {
    if (!currentUser) {
      dispatch(openConnexionPopup());
    } else {
      dispatch(toggleCommentLikeAction(commentId));
      const likeElMobile = document.querySelector(
        `.FirstLevelComment__mobile--likes-number[data-likes="${commentId}"]`
      );
      const likeEl = document.querySelector(
        `.FirstLevelComment__aside--likes-number[data-likes="${commentId}"]`
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
  };

  // juste toggle affichage input réponse
  const handleCommentRespond = () => {
    const inputToScrollTo = [
      ...document.getElementsByClassName("CommentsInput__newComment--input"),
    ][1];
    const userNameEl = document.createElement("span");
    userNameEl.classList.add("primary-lighter-text");
    const textNode = document.createTextNode(`@${commentAuthor.username} `);
    userNameEl.appendChild(textNode);
    // console.log(userNameEl);
    // console.log(inputToScrollTo);
    // trouver comment mettre la mention en couleur
    setNewComment(`@${commentAuthor.username} `);

    setReplyInputShow(true);
  };

  useEffect(() => {
    if (replyInputShow) {
      const inputToScrollTo = [
        ...document.getElementsByClassName("CommentsInput__newComment--input"),
      ][1];
      const cardFullPopupEl = [
        ...document.getElementsByClassName("CardFullPopup"),
      ][0];
      cardFullPopupEl.scrollTo(0, inputToScrollTo.offsetTop - 100);
      inputToScrollTo.focus();
      inputToScrollTo.setSelectionRange(
        inputToScrollTo.value.length,
        inputToScrollTo.value.length
      );
    }
  }, [replyInputShow]);

  const handleReplyInputClose = () => {
    setReplyInputShow(false);
  };

  // gestion du nouveau commentaire
  const handleAddCommentClick = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      dispatch(openConnexionPopup());
      // setConnectRedirect(true);
    } else {
      await dispatch(addReplyAction(clickedCardId, commentId, newComment));
      // await handleRepliesFetch();
      setNewComment("");
      setReplyInputShow(false);
      setNewCommentSubmit(true);
    }
  };

  const handleInputValueChange = (e) => {
    setNewComment(e.target.value);
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
    confirmCommentDelete(confirmPopupOpen.id);
    setConfirmPopupOpen({ ...confirmPopupOpen, open: false });
  };

  const handleReplyDelete = async (replyId) => {
    await dispatch(deleteCommentAction(replyId));
    const fullReplyLocalArray = localRepliesArray.filter(
      (reply) => reply.id === parseInt(replyId)
    );
    const fullReplyLastLocal = localLastPublishedComments.filter(
      (reply) => reply.id === parseInt(replyId)
    );
    if (fullReplyLocalArray.length > 0) {
      const index = localRepliesArray.indexOf(fullReplyLocalArray[0]);
      if (index > -1) {
        const arrayCopy = localRepliesArray;
        arrayCopy.splice(index, 1);
        setLocalRepliesArray(arrayCopy);
        setRepliesBlockVisible(false);
        setRepliesBlockVisible(true);
      }
    } else if (fullReplyLastLocal.length > 0) {
      const index = localLastPublishedComments.indexOf(fullReplyLastLocal[0]);
      if (index > -1) {
        const arrayCopy = localLastPublishedComments;
        arrayCopy.splice(index, 1);
        setLocalLastPublishedComments(arrayCopy);
        setRepliesBlockVisible(false);
        setRepliesBlockVisible(true);
      }
    }
    // await handleRepliesFetch();
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
        setLocalRepliesArray([...localRepliesArray, ...rep.data.results]);
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
        setLocalRepliesArray([...localRepliesArray, ...rep.data.results]);
      rep && rep.data && rep.data.next
        ? setNextRepliesLink(rep.data.next)
        : setNextRepliesLink(null);
    });
    setRepliesBlockVisible(true);
  };

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

      <div className="FirstLevelComment">
        <div className=" FirstLevelComment__author">
          <UserAvatar user={commentAuthor} link={true} />
          <div className="FirstLevelComment__mobile-stats">
            <div className="FirstLevelComment__mobile--likes">
              <p
                className="FirstLevelComment__mobile--likes-number"
                data-likes={commentId}
              >
                {likesCount ? likesCount : 0}
              </p>
              {commentIsLiked ? (
                <HeartFull className=" FirstLevelComment__mobile--logo comment-logo__liked" />
              ) : (
                <HeartEmpty className=" FirstLevelComment__mobile--logo" />
              )}
            </div>
          </div>
        </div>
        <div className="FirstLevelComment__wrapper">
          <div className="FirstLevelComment__center">
            <div className="FirstLevelComment__center--top">
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
            <p className="FirstLevelComment__comment">
              {comment && comment.text}
            </p>
          </div>
          <div className="FirstLevelComment__actions">
            <p className="FirstLevelComment__date">
              {comment && commentFormattedDate}
            </p>
            <p
              className="FirstLevelComment__action"
              onClick={() => handleCommentLike(commentId)}
            >
              {commentIsLiked ? "Je n'aime plus" : "J'aime"}
            </p>
            <p
              className="FirstLevelComment__action"
              onClick={() => handleCommentRespond()}
            >
              Répondre
            </p>
          </div>
        </div>
        <div className=" FirstLevelComment__aside">
          <div className="FirstLevelComment__aside--likes">
            {commentIsLiked ? (
              <HeartFull className=" FirstLevelComment__aside--logo comment-logo__liked" />
            ) : (
              <HeartEmpty className=" FirstLevelComment__aside--logo" />
            )}
            <p
              className="FirstLevelComment__aside--likes-number"
              data-likes={commentId}
            >
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
            {localRepliesArray &&
              localRepliesArray.map((reply, index) => {
                return (
                  <SecondLevelComment
                    key={index}
                    reply={reply}
                    handleCommentRespond={handleCommentRespond}
                    handleReplyDelete={handleReplyDelete}
                  />
                );
              })}
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
        {localLastPublishedComments &&
          localLastPublishedComments.length !== 0 &&
          localLastPublishedComments.map((reply, index) => (
            <SecondLevelComment
              key={index}
              reply={reply}
              handleCommentRespond={handleCommentRespond}
              handleReplyDelete={handleReplyDelete}
            />
          ))}
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
