import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

// redux
import { selectCurrentUser } from "../../../../redux/user/user-selectors";
import { selectCommentLikers, selectClickedCardId, selectLastPublishedComment } from "../../../../redux/filter/filter-selectors";
import { toggleCommentLikeAction, deleteCommentAction, addReplyAction, addCommentAction } from "../../../../redux/filter/filter-actions";
import { getReplies, getNextReplies } from "../../../../services/socialService";

// helper
import { commentsFormattedDate, initialSignalState } from "../../../../helper/index";

// components
import UserAvatar from "../../../UserComponents/UserAvatar/UserAvatar";
import UserUsername from "../../../UserComponents/UserAvatar/UserUsername";
import CommentsInput from "../../CommentsInput copy/CommentsInput";
import ConfirmationOverlay from "../../ConfirmationOverlay/ConfirmationOverlay";
import SecondLevelComment from "../SecondLevelComment/SecondLevelComment";

// assets
// import { ReactComponent as ChatLogo } from "../../../../assets/images/chatbubbles-outline.svg";
import { ReactComponent as HeartEmpty } from "../../../../assets/images/heart-outline.svg";
import { ReactComponent as HeartFull } from "../../../../assets/images/heart.svg";
import { ReactComponent as CloseLogo } from "../../../../assets/images/close.svg";

import "./FirstLevelComment.scss";
import { openConnexionPopup, showSignalPopup } from "../../../../redux/layout/layout-actions";
import VerticalMenu from "../../VerticalMenu/VerticalMenu";

const FirstLevelComment = ({ comment, confirmCommentDelete, handleUpdate, handleCommentRespond }) => {
  // console.log(comment);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const clickedCardId = useSelector(selectClickedCardId);
  // const lastPublishedComment = useSelector(selectLastPublishedComment);
  const commentAuthor = comment.author;
  const commentId = comment.id;
  const commentLikers = useSelector(selectCommentLikers(commentId));

  // const replyCount = comment.reply_count;
  // let replyNextLink = comment.reply_comments;
  const likesCount = comment.likes_count;
  const [commentIsLiked, setCommentIsLiked] = useState();
  // const [localRepliesArray, setLocalRepliesArray] = useState([]);
  // const [repliesBlockVisible, setRepliesBlockVisible] = useState(false);
  // const [localReplyArray, setLocalReplyArray] = useState([]);
  // const [replyInputShow, setReplyInputShow] = useState(false);
  // const [firstValue, setNewFirstValue] = useState("");
  // const [localLastPublishedArray, setLocalLastPublishedArray] = useState([]);
  // const [shouldUpdate, setShouldUpdate] = useState(false);
  // const [nextRepliesLink, setNextRepliesLink] = useState();

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

  // Second level comment (reply) delete

  // confirm / reject delete popup
  const handleConfirmClick = () => {
    handleUpdate && handleUpdate();
    confirmCommentDelete(confirmPopupOpen.id);
    setConfirmPopupOpen({ ...confirmPopupOpen, open: false });
  };

  const handleRejectClick = () => {
    setConfirmPopupOpen({ open: false, message: "", id: null });
  };

  //! GESTION INPUT REPONSE
  // toggle affichage input réponse
  // const handleCommentRespond = () => {
  //   // setReplyInputShow(true);
  //   setNewFirstValue(`@${commentAuthor.username} `);
  // };

  // Si clic sur réponse alors focus dans l'input réponse et scroll jusque lui
  // useEffect(() => {
  //   if (replyInputShow) {
  //     const inputToScrollTo = document.querySelector(
  //       `#replyInput-${commentId}`
  //     );
  //     const cardFullPopupEl = document.querySelector(".CardFullPopup");
  //     cardFullPopupEl.scrollTo(0, inputToScrollTo.offsetTop - 100);
  //     inputToScrollTo.focus({ preventScroll: false });
  //     inputToScrollTo.setSelectionRange(
  //       inputToScrollTo.value.length,
  //       inputToScrollTo.value.length
  //     );
  //   }
  // }, [commentId, replyInputShow]);

  // const handleReplyInputClose = () => {
  //   // setReplyInputShow(false);
  // };

  // gestion du nouveau commentaire
  // const handleAddCommentClick = async (value) => {
  //   // await dispatch(addReplyAction(clickedCardId, commentId, value));
  //   dispatch(addCommentAction(clickedCardId, value));
  //   // setNewFirstValue("");
  //   // setReplyInputShow(false);
  // };

  // Dès la publication d'une réponse on la récupère pour la mettre dans ce array local
  // useEffect(() => {
  //   if (lastPublishedComment && !lastPublishedComment.reply_comments) {
  //     const arrayCopy = localLastPublishedArray;
  //     arrayCopy.unshift(lastPublishedComment);
  //     setLocalLastPublishedArray(arrayCopy);
  //   }
  //   // setShouldUpdate(true);
  //   // console.log(localLastPublishedArray);
  // }, [lastPublishedComment, localLastPublishedArray]);

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

  //! GESTION FETECH REPONSES
  // Gestion load des réponses
  // const handleRepliesFetch = async () => {
  //   const repliesArrayFetched = getReplies(commentId);
  //   await repliesArrayFetched.then((rep) => {
  //     // console.log(rep.data);
  //     rep &&
  //       rep.data &&
  //       rep.data.results &&
  //       setLocalReplyArray([...localReplyArray, ...rep.data.results]);

  //     rep && rep.data && rep.data.next
  //       ? setNextRepliesLink(rep.data.next)
  //       : setNextRepliesLink(null);
  //   });
  //   setRepliesBlockVisible(true);
  // };

  // const handleRepliesNextFetch = async () => {
  //   // lancer action pour fetch les réponses
  //   const repliesArrayFetched = getNextReplies(nextRepliesLink);
  //   await repliesArrayFetched.then((rep) => {
  //     rep &&
  //       rep.data &&
  //       rep.data.results &&
  //       setLocalReplyArray([...localReplyArray, ...rep.data.results]);
  //     rep && rep.data && rep.data.next
  //       ? setNextRepliesLink(rep.data.next)
  //       : setNextRepliesLink(null);
  //   });
  //   setRepliesBlockVisible(true);
  // };

  //! GESTION DELETE DES REPLIES
  // const handleReplyDelete = async (replyId) => {
  //   await dispatch(deleteCommentAction(replyId));
  //   const fullReplylocalReplyArray = localReplyArray.filter(
  //     (reply) => reply.id === parseInt(replyId)
  //   );
  //   const fullReplyLastLocal = localLastPublishedArray.filter(
  //     (reply) => reply.id === parseInt(replyId)
  //   );
  //   if (fullReplylocalReplyArray.length > 0) {
  //     const index = localReplyArray.indexOf(fullReplylocalReplyArray[0]);
  //     if (index > -1) {
  //       const arrayCopy = localReplyArray;
  //       arrayCopy.splice(index, 1);
  //       setLocalReplyArray(arrayCopy);
  //       setRepliesBlockVisible(false);
  //       setRepliesBlockVisible(true);
  //     }
  //   } else if (fullReplyLastLocal.length > 0) {
  //     const index = localLastPublishedArray.indexOf(fullReplyLastLocal[0]);
  //     if (index > -1) {
  //       const arrayCopy = localLastPublishedArray;
  //       arrayCopy.splice(index, 1);
  //       setLocalLastPublishedArray(arrayCopy);
  //       setRepliesBlockVisible(false);
  //       setRepliesBlockVisible(true);
  //     }
  //   }
  // };

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
          <div className="FirstLevelComment__center">
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
      {/* <div className="FirstLevelComment__replies">
        {repliesBlockVisible ? (
          <>
            {shouldUpdate &&
              localLastPublishedArray &&
              localLastPublishedArray.length !== 0 &&
              localLastPublishedArray.map((reply) => (
                <SecondLevelComment
                  key={reply.id}
                  reply={reply}
                  handleCommentRespond={handleCommentRespond}
                  // handleReplyDelete={handleReplyDelete}
                />
              ))}
            {localReplyArray &&
              localReplyArray.length !== 0 &&
              localReplyArray.map((reply) => (
                <SecondLevelComment
                  key={reply.id}
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
        ) : (
            <>
              {replyCount !== 0 ? (
                <p
                  className="FirstLevelComment__replies--message"
                  onClick={() => handleRepliesFetch()}
                >
                  Voir les {replyCount ? replyCount : ""} réponses...
                </p>
              ) : null}
            </>
          )} */}
      {/* <div
        className={`FirstLevelComment__replies--input ${
          replyInputShow ? "active" : ""
        }`}
      >
        <CommentsInput
          handleAddCommentClick={handleAddCommentClick}
          id={`replyInput-${comment.id}`}
          firstValue={firstValue}
        />
        <CloseLogo
          className="FirstLevelComment__close-logo"
          onClick={() => handleReplyInputClose()}
        />
      </div> */}
      {/* </div> */}
    </>
  );
};

export default FirstLevelComment;
