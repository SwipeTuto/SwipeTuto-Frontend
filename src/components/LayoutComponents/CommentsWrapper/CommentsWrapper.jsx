import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// redux
import {
  selectClickedCardCommentsNumber,
  selectClickedCardCommentsArray,
  selectClickedCardId,
  selectFilterError,
  selectClickedCardCommentsNextLink,
  selectLastPublishedComment,
} from "../../../redux/filter/filter-selectors";
import {
  addCommentAction,
  deleteFilterErrorAction,
  getCardCommentsAction,
  deleteCommentAction,
} from "../../../redux/filter/filter-actions";
import { selectCurrentUser } from "../../../redux/user/user-selectors";

// services & helper
import { getCardCommentsNext } from "../../../services/socialService";

// components
import FirstLevelComment from "./FirstLevelComment/FirstLevelComment";
import SecondLevelComment from "./SecondLevelComment/SecondLevelComment";
import ConnexionRedirect from "../ConnexionRedirect/ConnexionRedirect";
import CustomButton from "../CustomButton/CustomButton";
import CommentsInput from "../CommentsInput/CommentsInput";

// assets
import { ReactComponent as ChatLogo } from "../../../assets/images/chatbubbles-outline.svg";

import "./CommentsWrapper.scss";

const CommentsWrapper = () => {
  const dispatch = useDispatch();
  const [connectRedirect, setConnectRedirect] = useState(false);
  const commentsNumber = useSelector(selectClickedCardCommentsNumber);
  const commentsArray = useSelector(selectClickedCardCommentsArray);
  const [localCommentsArray, setLocalCommentsArray] = useState();
  const clickedCardId = useSelector(selectClickedCardId);
  const currentUser = useSelector(selectCurrentUser);
  const commentError = useSelector(selectFilterError);
  const nextLink = useSelector(selectClickedCardCommentsNextLink);
  const [localNextLink, setLocalNextLink] = useState();
  const [newComment, setNewComment] = useState("");
  const [newCommentSubmit, setNewCommentSubmit] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const lastPublishedComment = useSelector(selectLastPublishedComment);
  const [localLastPublishedComments, setLocalLastPublishedComments] = useState(
    []
  );

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
  }, [newCommentSubmit]);

  useEffect(() => {
    if (clickedCardId) dispatch(getCardCommentsAction(clickedCardId));
  }, [clickedCardId]);

  useEffect(() => {
    setLocalCommentsArray(commentsArray);
    setLocalNextLink(nextLink);
  }, [commentsArray, nextLink]);

  const handleAddCommentClick = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setConnectRedirect(true);
    } else {
      dispatch(addCommentAction(clickedCardId, newComment));
      setNewCommentSubmit(true);
      const commentsNumberEl = document.querySelector(
        "p.CommentsWrapper__title--commentsNumber"
      );
      commentsNumberEl.textContent = parseInt(commentsNumberEl.textContent) + 1;

      if (currentUser) {
        setNewComment("");
      }
    }
  };

  const handleInputValueChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleClose = () => {
    setConnectRedirect(false);
  };

  const handleNextCommentsLoad = async () => {
    const nextComments = getCardCommentsNext(nextLink);
    await nextComments.then((rep) => {
      rep &&
        rep.data &&
        rep.data.results &&
        setLocalCommentsArray([...localCommentsArray, ...rep.data.results]);
      rep && rep.data && rep.data.next
        ? setLocalNextLink(rep.data.next)
        : setLocalNextLink(null);
    });
  };

  // useEffect(() => {
  //   localLastPublishedComments.forEach((localComment) => {
  //     const commentFull = localCommentsArray.filter((comment) => {
  //       return comment.id === localComment.id;
  //     });
  //     console.log(commentFull);
  //     if (commentFull.length > 0) {
  //       const index = localLastPublishedComments.indexOf(localComment);
  //       console.log(index);
  //       const arrayCopy = localLastPublishedComments;
  //       if (index > -1) {
  //         arrayCopy.splice(index, 1);
  //         setLocalLastPublishedComments(arrayCopy);
  //       }
  //     }
  //   });
  // }, [localCommentsArray]);

  const confirmCommentDelete = (commentId) => {
    dispatch(deleteCommentAction(parseInt(commentId)));
    const fullCommentLocalArray = localCommentsArray.filter(
      (comment) => comment.id === parseInt(commentId)
    );
    const fullCommentLastLocal = localLastPublishedComments.filter(
      (comment) => comment.id === parseInt(commentId)
    );
    console.log(fullCommentLocalArray, fullCommentLastLocal);
    if (fullCommentLocalArray.length > 0) {
      const index = localCommentsArray.indexOf(fullCommentLocalArray[0]);
      console.log(index);
      if (index > -1) {
        const arrayCopy = localCommentsArray;
        arrayCopy.splice(index, 1);
        setLocalCommentsArray(arrayCopy);
        const commentsNumberEl = document.querySelector(
          "p.CommentsWrapper__title--commentsNumber"
        );
        commentsNumberEl.textContent =
          parseInt(commentsNumberEl.textContent) - 1;
        console.log(localCommentsArray);
      }
    } else if (fullCommentLastLocal.length > 0) {
      const index = localLastPublishedComments.indexOf(fullCommentLastLocal[0]);
      console.log(index);
      if (index > -1) {
        const arrayCopy = localLastPublishedComments;
        arrayCopy.splice(index, 1);
        setLocalLastPublishedComments(arrayCopy);
        const commentsNumberEl = document.querySelector(
          "p.CommentsWrapper__title--commentsNumber"
        );
        commentsNumberEl.textContent =
          parseInt(commentsNumberEl.textContent) - 1;
        console.log(localLastPublishedComments);
      }
    }
  };

  useEffect(() => {
    console.table(localCommentsArray);
    console.log("------------------");
    console.table(localLastPublishedComments);
  }, [localCommentsArray, localLastPublishedComments]);

  return (
    <>
      {connectRedirect && <ConnexionRedirect handleClose={handleClose} />}
      <div className="CommentsWrapper">
        <div className="CommentsWrapper__title comments-section">
          <ChatLogo className="CommentsWrapper__title--logo" />
          <p className="CommentsWrapper__title--commentsNumber">
            {commentsNumber && commentsNumber}
          </p>
          <h1 className="title title-1">Commentaires</h1>
        </div>
        <CommentsInput
          newComment={newComment}
          handleAddCommentClick={handleAddCommentClick}
          handleInputValueChange={handleInputValueChange}
        />
        <div className="CommentsWrapper__comments comments-section">
          {localLastPublishedComments &&
            localLastPublishedComments.length !== 0 &&
            localLastPublishedComments.map((comment) => (
              <>
                {console.log("LAST RENDER")}
                <FirstLevelComment
                  comment={comment}
                  key={comment.id}
                  confirmCommentDelete={confirmCommentDelete}
                />
              </>
            ))}
          {commentError ? (
            <>
              <p className="CommentsWrapper__comment--error">
                Une erreur est survenue lors de la publication du commentaire.
                Merci de réessayer plus tard. Si le problème persiste, veuillez
                nous contacter.
              </p>
              <p
                className="CommentsWrapper__error-delete"
                onClick={() => dispatch(deleteFilterErrorAction())}
              >
                J'ai compris.
              </p>
            </>
          ) : (
            ""
          )}
          {localCommentsArray && localCommentsArray.length === 0 ? (
            <p className="CommentsWrapper__comment">
              Aucun commentaire pour le moment.
            </p>
          ) : (
            localCommentsArray &&
            localCommentsArray.map((comment) => (
              <>
                {console.log("LOCAL RENDER")}
                <FirstLevelComment
                  comment={comment}
                  key={comment.id}
                  confirmCommentDelete={confirmCommentDelete}
                />
              </>
            ))
          )}

          {localNextLink && (
            <CustomButton color="white" onClick={handleNextCommentsLoad}>
              Charger plus.
            </CustomButton>
          )}
        </div>
      </div>
    </>
  );
};

export default CommentsWrapper;
