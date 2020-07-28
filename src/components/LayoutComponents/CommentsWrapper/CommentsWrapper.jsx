import React, { useState } from "react";
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
import { addCommentAction } from "../../../redux/filter/filter-actions";
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import { formattedDate } from "../../../helper";

const CommentsWrapper = () => {
  const dispatch = useDispatch();
  const commentsNumber = useSelector(selectClickedCardCommentsNumber);
  const commentsArray = useSelector(selectClickedCardComments);
  const clickedCardId = useSelector(selectClickedCardId);
  const currentUser = useSelector(selectCurrentUser);
  const commentError = useSelector(selectFilterError);
  const [newComment, setNewComment] = useState("");
  // const [commentError, setCommentError] = useState(false);
  const [newCommentObject, setNewCommentObject] = useState({});

  const handleAddCommentClick = (e) => {
    e.preventDefault();
    setNewCommentObject({});
    console.log(clickedCardId, newComment);
    dispatch(addCommentAction(clickedCardId, newComment));
    if (currentUser) {
      const now = new Date();

      setNewCommentObject({
        author: {
          id: currentUser.id,
          username: currentUser.username,
          profile: currentUser.profile,
        },
        text: newComment,
        posted_on: formattedDate(now),
      });

      setNewComment("");
    }
  };

  return (
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
        <CustomButton color="dark" onClick={(e) => handleAddCommentClick(e)}>
          Envoyer
        </CustomButton>
      </form>
      <div className="CommentsWrapper__comments comments-section">
        {commentsArray && commentsArray.length === 0 ? (
          <p className="CommentsWrapper__comment">
            Aucun commentaire pour le moment.
          </p>
        ) : (
          commentsArray && commentsArray.map((comment) => console.log(comment))
        )}
        {newCommentObject && <FirstLevelComment comment={newCommentObject} />}
      </div>
    </div>
  );
};

export default CommentsWrapper;
