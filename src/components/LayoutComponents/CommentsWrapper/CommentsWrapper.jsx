import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import FirstLevelComment from "./FirstLevelComment/FirstLevelComment";
import SecondLevelComment from "./SecondLevelComment/SecondLevelComment";

import "./CommentsWrapper.scss";
import CustomButton from "../CustomButton/CustomButton";
import {
  selectClickedCardCommentsNumber,
  selectClickedCardComments,
  selectClickedCardId,
  selectFilterError,
} from "../../../redux/filter/filter-selectors";

import { ReactComponent as ChatLogo } from "../../../assets/images/chatbubbles-outline.svg";
import {
  addCommentAction,
  deleteFilterErrorAction,
} from "../../../redux/filter/filter-actions";
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import { formattedDate } from "../../../helper";
import ConnexionRedirect from "../ConnexionRedirect/ConnexionRedirect";

const CommentsWrapper = () => {
  const dispatch = useDispatch();
  const [connectRedirect, setConnectRedirect] = useState(false);
  const commentsNumber = useSelector(selectClickedCardCommentsNumber);
  const commentsArray = useSelector(selectClickedCardComments);
  const clickedCardId = useSelector(selectClickedCardId);
  const currentUser = useSelector(selectCurrentUser);
  const commentError = useSelector(selectFilterError);
  const [newComment, setNewComment] = useState("");
  // const [commentError, setCommentError] = useState(false);
  // const [newCommentObject, setNewCommentObject] = useState();
  const [newCommentsLocalArray, setNewCommentsLocalArray] = useState([]);

  useEffect(() => {
    setNewCommentsLocalArray(commentsArray);
  }, [commentsArray]);

  const handleAddCommentClick = (e) => {
    e.preventDefault();
    if (!currentUser) {
      setConnectRedirect(true);
    } else {
      // setNewCommentObject({});
      console.log(clickedCardId, newComment);
      dispatch(addCommentAction(clickedCardId, newComment));
      if (currentUser) {
        const now = new Date();

        const newCommentObject = {
          author: {
            id: currentUser.id,
            username: currentUser.username,
            profile: currentUser.profile,
          },
          text: newComment,
          posted_on: now,
        };

        newCommentsLocalArray.push(newCommentObject);

        setNewComment("");

        const commentsNumberElement = document.getElementsByClassName(
          "CommentsWrapper__title--commentsNumber"
        )[0];
        commentsNumberElement.textContent = `${
          parseInt(commentsNumberElement.textContent) + 1
        }`;
      }
    }
  };

  const handleClose = () => {
    setConnectRedirect(false);
  };

  return (
    <>
      {connectRedirect && <ConnexionRedirect handleClose={handleClose} />}
      <div className="CommentsWrapper">
        <div className="CommentsWrapper__title comments-section">
          <h1 className="title title-1">Commentaires</h1>
          <ChatLogo className="CommentsWrapper__title--logo" />
          <p className="CommentsWrapper__title--commentsNumber">
            {commentsNumber && commentsNumber}
          </p>
        </div>
        <form className="CommentsWrapper__newComment">
          <textarea
            placeholder="Ajouter un commentaire..."
            className="CommentsWrapper__newComment--input"
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <CustomButton
            color="dark"
            disabled={newComment === "" ? "disabled" : ""}
            onClick={(e) => handleAddCommentClick(e)}
          >
            Envoyer
          </CustomButton>
        </form>
        <div className="CommentsWrapper__comments comments-section">
          {commentError ? (
            <>
              <p className="CommentsWrapper__comment--error">
                Une erreur est survenue lors de la publication du commentaire.
                Merci de réessayer plus tard. Si le problème persiste, veuillez
                nous contacter.
                <p
                  className="CommentsWrapper__error-delete"
                  onClick={() => dispatch(deleteFilterErrorAction())}
                >
                  J'ai compris.
                </p>
              </p>
            </>
          ) : (
            ""
          )}

          {newCommentsLocalArray && newCommentsLocalArray.length === 0 ? (
            <p className="CommentsWrapper__comment">
              Aucun commentaire pour le moment.
            </p>
          ) : (
            newCommentsLocalArray &&
            newCommentsLocalArray.map((comment) => (
              <FirstLevelComment comment={comment} />
            ))
          )}

          {/* {newCommentObject && !commentError ? (
            <FirstLevelComment comment={newCommentObject} />
          ) : commentError ? (
            <p className="CommentsWrapper__comment CommentsWrapper__comment--error">
              Une erreur est survenue lors de la publication du commentaire.
              Merci de réessayer plus tard. Si le problème persiste, veuillez
              nous contacter.
            </p>
          ) : (
            ""
          )}
          {commentsArray && commentsArray.length === 0 && !newCommentObject ? (
            <p className="CommentsWrapper__comment">
              Aucun commentaire pour le moment.
            </p>
          ) : (
            commentsArray &&
            commentsArray.map((comment) => (
              <FirstLevelComment comment={comment} />
            ))
          )} */}
        </div>
      </div>
    </>
  );
};

export default CommentsWrapper;
