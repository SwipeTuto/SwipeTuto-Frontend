import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// redux
import {
  selectClickedCardCommentsNumber,
  selectClickedCardCommentsArray,
  selectClickedCardId,
  selectFilterError,
  selectClickedCardCommentsNextLink,
} from "../../../redux/filter/filter-selectors";
import {
  addCommentAction,
  deleteFilterErrorAction,
  getCardCommentsAction,
  getCardCommentsNextPageAction,
} from "../../../redux/filter/filter-actions";
import { selectCurrentUser } from "../../../redux/user/user-selectors";

// services & helper

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
  const clickedCardId = useSelector(selectClickedCardId);
  const currentUser = useSelector(selectCurrentUser);
  const commentError = useSelector(selectFilterError);
  const nextLink = useSelector(selectClickedCardCommentsNextLink);
  const [newComment, setNewComment] = useState("");
  const [newCommentSubmit, setNewCommentSubmit] = useState(false);

  useEffect(() => {
    if (clickedCardId) dispatch(getCardCommentsAction(clickedCardId));
  }, [clickedCardId, newCommentSubmit]);

  const handleAddCommentClick = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setConnectRedirect(true);
    } else {
      dispatch(addCommentAction(clickedCardId, newComment));

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

  const handleNextCommentsLoad = () => {
    dispatch(getCardCommentsNextPageAction(nextLink));
  };

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

        <div className="CommentsWrapper__comments comments-section">
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
          {commentsArray && commentsArray.length === 0 ? (
            <p className="CommentsWrapper__comment">
              Aucun commentaire pour le moment.
            </p>
          ) : (
            commentsArray &&
            commentsArray.map((comment) => (
              <FirstLevelComment comment={comment} key={comment.id} />
            ))
          )}

          {nextLink && (
            <CustomButton color="white" onClick={handleNextCommentsLoad}>
              Charger plus.
            </CustomButton>
          )}
        </div>
        <CommentsInput
          newComment={newComment}
          handleAddCommentClick={handleAddCommentClick}
          handleInputValueChange={handleInputValueChange}
        />
      </div>
    </>
  );
};

export default CommentsWrapper;
