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
  // const [commentError, setCommentError] = useState(false);
  // const [newCommentObject, setNewCommentObject] = useState();
  const [newCommentsLocalArray, setNewCommentsLocalArray] = useState([]);

  useEffect(() => {
    // console.log(typeof clickedCardId);
    if (clickedCardId) dispatch(getCardCommentsAction(clickedCardId));
    // if (newCommentSubmit) {
    //   dispatch(getCardCommentsAction(clickedCardId));
    //   setNewCommentSubmit(false);
    // }
  }, [clickedCardId, newCommentSubmit]);

  useEffect(() => {
    console.log(newCommentsLocalArray);
  }, [newCommentsLocalArray]);

  // useEffect(() => {
  //   console.log(commentsArray, newCommentsLocalArray);
  // }, [commentsArray, newCommentsLocalArray]);
  // useEffect(() => {
  //   if (newCommentSubmit) {
  //     dispatch(getCardCommentsAction(clickedCardId));
  //     setNewCommentSubmit(false);
  //   }
  // }, [newCommentSubmit, clickedCardId]);

  const handleAddCommentClick = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setConnectRedirect(true);
    } else {
      dispatch(addCommentAction(clickedCardId, newComment));

      // setNewCommentSubmit(false);

      if (currentUser) {
        const now = new Date();

        const newCommentObject = {
          author: {
            id: currentUser.id,
            username: currentUser.username,
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
            email: currentUser.email,
            profile: currentUser.profile,
            avatar: currentUser.avatar,
          },
          text: newComment,
          posted_on: now,
        };

        setNewComment("");
        setNewCommentsLocalArray([newCommentObject, ...newCommentsLocalArray]);
        // setNewCommentSubmit(true);

        const commentsNumberElement = document.getElementsByClassName(
          "CommentsWrapper__title--commentsNumber"
        )[0];
        commentsNumberElement.textContent = `${
          parseInt(commentsNumberElement.textContent) + 1
        }`;
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
    setNewCommentsLocalArray([...newCommentsLocalArray, ...commentsArray]);
    // const newCommentsLocalArrayCopy = newCommentsLocalArray;
    dispatch(getCardCommentsNextPageAction(nextLink));
    // setNewCommentsLocalArray([...newCommentsLocalArrayCopy, commentsArray]);
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

          {newCommentsLocalArray &&
            newCommentsLocalArray.length !== 0 &&
            newCommentsLocalArray &&
            newCommentsLocalArray.map((comment) => (
              <FirstLevelComment comment={comment} />
            ))}

          {commentsArray && commentsArray.length === 0 ? (
            <p className="CommentsWrapper__comment">
              Aucun commentaire pour le moment.
            </p>
          ) : (
            commentsArray &&
            commentsArray.map((comment) => (
              <FirstLevelComment comment={comment} />
            ))
          )}

          {nextLink && (
            <CustomButton color="white" onClick={handleNextCommentsLoad}>
              Charger plus.
            </CustomButton>
          )}
        </div>
        {/* <form className="CommentsWrapper__newComment">
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
        </form> */}
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
