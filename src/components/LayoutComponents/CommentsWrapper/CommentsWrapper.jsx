import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";

// redux
import {
  // selectClickedCardCommentsNumber,
  selectClickedCardCommentsArray,
  selectClickedCardId,
  // selectFilterError,
  selectClickedCardCommentsNextLink,
  selectLastPublishedComment,
} from "../../../redux/filter/filter-selectors";
import {
  addCommentAction,
  // deleteFilterErrorAction,
  getCardCommentsAction,
  deleteCommentAction,
  fetchNewComments,
  deleteLastPublishedCommentInStore,
} from "../../../redux/filter/filter-actions";
// import { selectCurrentUser } from "../../../redux/user/user-selectors";

// services & helper
// import { getCardCommentsNext } from "../../../services/socialService";

// components
// import Loading from "../../Loading/Loading";
import FirstLevelComment from "./FirstLevelComment/FirstLevelComment";
import CustomButton from "../CustomButton/CustomButton";
import CommentsInput from "../CommentsInput/CommentsInput";

// assets
// import { ReactComponent as ChatLogo } from "../../../assets/images/chatbubbles-outline.svg";
// import { usePrevious } from "../../../hooks/usePrevious";

import "./CommentsWrapper.scss";
import { selectCommentsLoaded } from "../../../redux/layout/layout-selectors";
// import { selectCommentsLoaded } from "../../../redux/layout/layout-selectors";
// import { openConnexionPopup } from "../../../redux/layout/layout-actions";

const CommentsWrapper = () => {
  const dispatch = useDispatch();
  const clickedCardId = useSelector(selectClickedCardId);
  const clickedCardCommentsArray = useSelector(selectClickedCardCommentsArray);
  const nextCommentsLink = useSelector(selectClickedCardCommentsNextLink);
  const lastPublishedComment = useSelector(selectLastPublishedComment);
  const [localLastPublishedArray, setLocalLastPublishedArray] = useState([]);
  const [localCommentsArray, setLocalCommentsArray] = useState([]);
  // const [shouldUpdate, setShouldUpdate] = useState(false);
  const [firstValue, setNewFirstValue] = useState("");
  const commentsLoaded = useSelector(selectCommentsLoaded);

  useEffect(() => {
    if (clickedCardId) dispatch(getCardCommentsAction(clickedCardId));
    setLocalLastPublishedArray([]);
  }, [clickedCardId, dispatch]);

  useEffect(() => {
    setLocalCommentsArray(clickedCardCommentsArray);
  }, [clickedCardCommentsArray]);

  const handleAddCommentClick = (value) => {
    dispatch(addCommentAction(clickedCardId, value));
    setNewFirstValue(null);
  };

  useEffect(() => {
    if (lastPublishedComment) {
      const arrayCopy = localLastPublishedArray;
      arrayCopy.push(lastPublishedComment);
      setLocalLastPublishedArray(arrayCopy);
    }
    dispatch(deleteLastPublishedCommentInStore());
  }, [dispatch, lastPublishedComment, localLastPublishedArray]);

  const handleFetchNextLink = () => {
    dispatch(fetchNewComments(nextCommentsLink));
  };

  const confirmCommentDelete = (commentId) => {
    dispatch(deleteCommentAction(parseInt(commentId)));
    const commentInLocalArray = localCommentsArray.filter((comment) => comment.id === parseInt(commentId));
    const fullCommentLastLocal = localLastPublishedArray.filter((comment) => comment.id === parseInt(commentId));
    if (commentInLocalArray.length > 0) {
      const index = localCommentsArray.indexOf(commentInLocalArray[0]);

      if (index > -1) {
        const arrayCopy = [...localCommentsArray];
        arrayCopy.splice(index, 1);
        setLocalCommentsArray(arrayCopy);
      }
    } else if (fullCommentLastLocal.length > 0) {
      const index = localLastPublishedArray.indexOf(fullCommentLastLocal[0]);
      if (index > -1) {
        const arrayCopy = [...localLastPublishedArray];
        arrayCopy.splice(index, 1);
        setLocalLastPublishedArray(arrayCopy);
      }
    }
  };

  // const handleUpdate = () => {
  //   console.log("call");
  //   // setShouldUpdate(false);
  // };

  const handleCommentRespond = (commentAuthor) => {
    const newFirstValue = `@${commentAuthor.username} `;
    const commentInput = document.querySelector("#commentInput");
    const cardFullPopupEl = document.querySelector(".CardFullPopup");
    cardFullPopupEl.scrollTo(0, commentInput.offsetTop);
    commentInput.focus();
    setNewFirstValue(newFirstValue);
  };

  return (
    <div className="CommentsWrapper">
      {commentsLoaded ? (
        <>
          <div className="CommentsWrapper__comments">
            {localCommentsArray?.length === 0 && localLastPublishedArray?.length === 0 && <p>Aucun commentaire pour le moment ...</p>}
            {localCommentsArray &&
              localCommentsArray.map((comment) => (
                <FirstLevelComment
                  key={comment.id}
                  comment={comment}
                  confirmCommentDelete={confirmCommentDelete}
                  // handleUpdate={handleUpdate}
                  handleCommentRespond={() => {
                    handleCommentRespond(comment.author);
                  }}
                />
              ))}
          </div>
          <div className="CommentsWrapper__nextButton">
            {nextCommentsLink && (
              <CustomButton color="transparent" onClick={handleFetchNextLink}>
                Commentaires plus anciens ...
              </CustomButton>
            )}
          </div>
          <div className="CommentsWrapper__comments">
            {localLastPublishedArray.map((comment) => (
              <FirstLevelComment
                key={comment.id}
                comment={comment}
                confirmCommentDelete={confirmCommentDelete}
                // handleUpdate={handleUpdate}
                handleCommentRespond={() => {
                  handleCommentRespond(comment.author);
                }}
              />
            ))}
          </div>

          <div className="CommentsWrapper__input">
            <CommentsInput id="commentInput" handleAddCommentClick={handleAddCommentClick} firstValue={firstValue} />
          </div>
        </>
      ) : (
        "Chargement des commentaires ..."
      )}
    </div>
  );
};

export default CommentsWrapper;
