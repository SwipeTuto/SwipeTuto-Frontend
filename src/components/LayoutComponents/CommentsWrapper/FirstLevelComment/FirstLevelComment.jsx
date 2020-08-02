import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// redux
import { selectCurrentUser } from "../../../../redux/user/user-selectors";
import {
  selectClickedCardComments,
  selectCommentLikers,
} from "../../../../redux/filter/filter-selectors";
import { toggleCommentLikeAction } from "../../../../redux/filter/filter-actions";

// helper
import { commentsFormattedDate } from "../../../../helper/index";

// components
import UserAvatar from "../../../UserComponents/UserAvatar/UserAvatar";
import UserUsername from "../../../UserComponents/UserAvatar/UserUsername";
import ConnexionRedirect from "../../ConnexionRedirect/ConnexionRedirect";

// assets
import { ReactComponent as ChatLogo } from "../../../../assets/images/chatbubbles-outline.svg";
import { ReactComponent as HeartEmpty } from "../../../../assets/images/heart-outline.svg";
import { ReactComponent as HeartFull } from "../../../../assets/images/heart.svg";

import "./FirstLevelComment.scss";

const FirstLevelComment = ({ comment }) => {
  const currentUser = useSelector(selectCurrentUser);
  const commentLikers = useSelector(selectCommentLikers);
  const cardComments = useSelector(selectClickedCardComments);
  const commentAuthor = comment.author;
  const commentId = comment.id;
  const [commentIsLiked, setCommentIsLiked] = useState();
  const [connectRedirect, setConnectRedirect] = useState(false);

  useEffect(() => {
    setCommentIsLiked(userHasLiked());
  }, [commentLikers, currentUser]);

  const userHasLiked = () => {
    // if (currentUser && currentUser.id) {
    //   return (
    //     commentLikers &&
    //     commentLikers.some((likers) => likers === currentUser.id)
    //   );
    // } else {
    //   return false;
    // }
  };

  const handleCommentLike = () => {
    // if (!currentUser) {
    //   setConnectRedirect(true);
    // } else {
    //   dispatchEvent(toggleCommentLikeAction(commentId));
    //   setCommentIsLiked(!commentIsLiked);
    // }
  };

  const handleCommentRespond = () => {};
  const handleCommentDelete = () => {};

  const handleClose = () => {
    setConnectRedirect(false);
  };

  const commentFormattedDate = commentsFormattedDate(comment.posted_on);

  return (
    <>
      {connectRedirect && <ConnexionRedirect handleClose={handleClose} />}

      <div className="FirstLevelComment">
        <div className=" FirstLevelComment__author">
          <UserAvatar user={commentAuthor} link={true} />
        </div>
        <div className="FirstLevelComment__wrapper">
          <div className=" FirstLevelComment__center">
            <UserUsername user={commentAuthor} link={true} />
            {comment && comment.text}
          </div>
          <div className="FirstLevelComment__actions">
            <p className="FirstLevelComment__action">
              {comment && commentFormattedDate}
            </p>
            <p
              className="FirstLevelComment__action"
              onClick={() => handleCommentLike()}
            >
              J'aime
            </p>
            <p
              className="FirstLevelComment__action"
              onClick={() => handleCommentRespond()}
            >
              Répondre
            </p>
            {commentAuthor &&
              commentAuthor.id &&
              currentUser &&
              currentUser.id &&
              commentAuthor.id === currentUser.id && (
                <p
                  className="FirstLevelComment__action"
                  onClick={() => handleCommentDelete()}
                >
                  Supprimer
                </p>
              )}
          </div>
        </div>
        <div className=" FirstLevelComment__aside">
          <div className="FirstLevelComment__aside--likes">
            {commentIsLiked ? (
              <HeartFull className=" FirstLevelComment__aside--logo" />
            ) : (
              <HeartEmpty className=" FirstLevelComment__aside--logo" />
            )}
            <p className="FirstLevelComment__aside--likes-number">23</p>
          </div>
          <div className="FirstLevelComment__aside--comments">
            <ChatLogo className=" FirstLevelComment__aside--logo" />
            <p className="FirstLevelComment__aside--comments-number">4</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstLevelComment;
