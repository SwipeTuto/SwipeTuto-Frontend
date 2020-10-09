import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

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
import Loading from "../../Loading/Loading";
import FirstLevelComment from "./FirstLevelComment/FirstLevelComment";
import CustomButton from "../CustomButton/CustomButton";
import CommentsInput from "../CommentsInput/CommentsInput";

// assets
import { ReactComponent as ChatLogo } from "../../../assets/images/chatbubbles-outline.svg";

import "./CommentsWrapper.scss";
import { selectCommentsLoaded } from "../../../redux/layout/layout-selectors";
import { openConnexionPopup } from "../../../redux/layout/layout-actions";

const CommentsWrapper = () => {
  const dispatch = useDispatch();
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
  const lastPublishedComment = useSelector(selectLastPublishedComment);
  const commentsAreLoaded = useSelector(selectCommentsLoaded);
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
  }, [newCommentSubmit, lastPublishedComment, localLastPublishedComments]);

  useEffect(() => {
    if (clickedCardId) dispatch(getCardCommentsAction(clickedCardId));
  }, [clickedCardId, dispatch]);

  useEffect(() => {
    setLocalCommentsArray(commentsArray);
    setLocalNextLink(nextLink);
  }, [commentsArray, nextLink]);

  const handleAddCommentClick = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      dispatch(openConnexionPopup());
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

  const confirmCommentDelete = (commentId) => {
    dispatch(deleteCommentAction(parseInt(commentId)));
    const fullCommentLocalArray = localCommentsArray.filter(
      (comment) => comment.id === parseInt(commentId)
    );
    const fullCommentLastLocal = localLastPublishedComments.filter(
      (comment) => comment.id === parseInt(commentId)
    );
    if (fullCommentLocalArray.length > 0) {
      const index = localCommentsArray.indexOf(fullCommentLocalArray[0]);
      if (index > -1) {
        const arrayCopy = localCommentsArray;
        arrayCopy.splice(index, 1);
        setLocalCommentsArray(arrayCopy);
        const commentsNumberEl = document.querySelector(
          "p.CommentsWrapper__title--commentsNumber"
        );
        commentsNumberEl.textContent =
          parseInt(commentsNumberEl.textContent) - 1;
      }
    } else if (fullCommentLastLocal.length > 0) {
      const index = localLastPublishedComments.indexOf(fullCommentLastLocal[0]);
      if (index > -1) {
        const arrayCopy = localLastPublishedComments;
        arrayCopy.splice(index, 1);
        setLocalLastPublishedComments(arrayCopy);
        const commentsNumberEl = document.querySelector(
          "p.CommentsWrapper__title--commentsNumber"
        );
        commentsNumberEl.textContent =
          parseInt(commentsNumberEl.textContent) - 1;
      }
    }
  };

  return (
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
        {commentsAreLoaded ? (
          <>
            {localLastPublishedComments &&
              localLastPublishedComments.length !== 0 &&
              localLastPublishedComments.map((comment) => (
                <FirstLevelComment
                  comment={comment}
                  key={comment.id}
                  confirmCommentDelete={confirmCommentDelete}
                />
              ))}
            {commentError ? (
              <>
                <p className="CommentsWrapper__comment--error">
                  Une erreur est survenue lors de la publication du commentaire.
                  Merci de réessayer plus tard. Si le problème persiste,
                  veuillez <Link to="/contact">nous contacter</Link>.
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
                <FirstLevelComment
                  comment={comment}
                  key={comment.id}
                  confirmCommentDelete={confirmCommentDelete}
                />
              ))
            )}

            {localNextLink && (
              <CustomButton color="white" onClick={handleNextCommentsLoad}>
                Charger plus ...
              </CustomButton>
            )}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default CommentsWrapper;
