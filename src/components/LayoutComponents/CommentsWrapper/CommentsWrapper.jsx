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
  fetchNewComments,
} from "../../../redux/filter/filter-actions";
import { selectCurrentUser } from "../../../redux/user/user-selectors";

// services & helper
import { getCardCommentsNext } from "../../../services/socialService";

// components
import Loading from "../../Loading/Loading";
import FirstLevelComment from "./FirstLevelComment/FirstLevelComment";
import CustomButton from "../CustomButton/CustomButton";
import CommentsInput from "../CommentsInput copy/CommentsInput";

// assets
import { ReactComponent as ChatLogo } from "../../../assets/images/chatbubbles-outline.svg";
import { usePrevious } from "../../../hooks/usePrevious";

import "./CommentsWrapper.scss";
import { selectCommentsLoaded } from "../../../redux/layout/layout-selectors";
import { openConnexionPopup } from "../../../redux/layout/layout-actions";

const CommentsWrapper = () => {
  const dispatch = useDispatch();
  const clickedCardId = useSelector(selectClickedCardId);
  const clickedCardCommentsArray = useSelector(selectClickedCardCommentsArray);
  const nextCommentsLink = useSelector(selectClickedCardCommentsNextLink);
  const lastPublishedComment = useSelector(selectLastPublishedComment);
  const [localLastPublishedArray, setLocalLastPublishedArray] = useState([]);
  const [localCommentsArray, setLocalCommentsArray] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    if (clickedCardId) dispatch(getCardCommentsAction(clickedCardId));
  }, [clickedCardId, dispatch]);

  useEffect(() => {
    setLocalCommentsArray(clickedCardCommentsArray);
  }, [clickedCardCommentsArray]);

  const handleAddCommentClick = (value) => {
    dispatch(addCommentAction(clickedCardId, value));
    setShouldUpdate(false);
  };

  useEffect(() => {
    if (lastPublishedComment && lastPublishedComment.reply_comments) {
      const arrayCopy = localLastPublishedArray;
      arrayCopy.unshift(lastPublishedComment);
      setLocalLastPublishedArray(arrayCopy);
    }
    setShouldUpdate(true);
    // console.log(localLastPublishedArray);
  }, [lastPublishedComment, localLastPublishedArray]);

  const handleFetchNextLink = () => {
    dispatch(fetchNewComments(nextCommentsLink));
  };

  const confirmCommentDelete = (commentId) => {
    dispatch(deleteCommentAction(parseInt(commentId)));
    const fullCommentLocalArray = localCommentsArray.filter(
      (comment) => comment.id === parseInt(commentId)
    );
    const fullCommentLastLocal = localLastPublishedArray.filter(
      (comment) => comment.id === parseInt(commentId)
    );
    // console.log(fullCommentLocalArray, fullCommentLastLocal);
    if (fullCommentLocalArray.length > 0) {
      const index = localCommentsArray.indexOf(fullCommentLocalArray[0]);

      if (index > -1) {
        const arrayCopy = localCommentsArray;
        arrayCopy.splice(index, 1);
        setLocalCommentsArray(arrayCopy);
        console.log(localCommentsArray);
        setShouldUpdate(true);
      }
    } else if (fullCommentLastLocal.length > 0) {
      const index = localLastPublishedArray.indexOf(fullCommentLastLocal[0]);
      if (index > -1) {
        const arrayCopy = localLastPublishedArray;
        arrayCopy.splice(index, 1);
        setLocalLastPublishedArray(arrayCopy);
        setShouldUpdate(true);
      }
    }
  };

  const handleUpdate = () => {
    console.log("call");
    setShouldUpdate(false);
  };

  return (
    <div className="CommentsWrapper">
      <div className="CommentsWrapper__input">
        <CommentsInput handleAddCommentClick={handleAddCommentClick} />
      </div>
      <div className="CommentsWrapper__comments">
        {shouldUpdate &&
          localLastPublishedArray.map((comment) => (
            <FirstLevelComment
              key={comment.id}
              comment={comment}
              confirmCommentDelete={confirmCommentDelete}
              handleUpdate={handleUpdate}
            />
          ))}
        {shouldUpdate &&
          localCommentsArray &&
          localCommentsArray.map((comment) => (
            <FirstLevelComment
              key={comment.id}
              comment={comment}
              confirmCommentDelete={confirmCommentDelete}
              handleUpdate={handleUpdate}
            />
          ))}
      </div>
      <div className="CommentsWrapper__nextButton">
        {nextCommentsLink && (
          <CustomButton color="white" onClick={handleFetchNextLink}>
            Suivants
          </CustomButton>
        )}
      </div>
    </div>
  );
};

export default CommentsWrapper;
