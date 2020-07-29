import React, { useState } from "react";
import UserNameAndAvatar from "../../../UserComponents/UserAvatar/UserNameAndAvatar";

import { ReactComponent as ChatLogo } from "../../../../assets/images/chatbubbles-outline.svg";
import { ReactComponent as HeartEmpty } from "../../../../assets/images/heart-outline.svg";
import { ReactComponent as HeartFull } from "../../../../assets/images/heart.svg";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../redux/user/user-selectors";
import { selectClickedCardComments } from "../../../../redux/filter/filter-selectors";

import "./FirstLevelComment.scss";
import UserAvatar from "../../../UserComponents/UserAvatar/UserAvatar";
import UserUsername from "../../../UserComponents/UserAvatar/UserUsername";

const FirstLevelComment = ({ comment }) => {
  const currentUser = useSelector(selectCurrentUser);
  const cardComments = useSelector(selectClickedCardComments);
  const commentAuthor = comment.author;

  const userHasLiked = (comment) => {
    if (currentUser && currentUser.id) {
      // return (
      //   comment && comment.likes && comment.likes.some((likers) => likers === currentUser.id)
      // );
    } else {
      return false;
    }
  };

  return (
    <div className="CommentsWrapper__comment FirstLevelComment">
      <div className=" FirstLevelComment__author">
        <UserAvatar user={commentAuthor} link={true} />
      </div>
      <div className=" FirstLevelComment__center">
        <UserUsername user={commentAuthor} link={true} />
        {comment && comment.text}
      </div>
      <div className=" FirstLevelComment__aside">
        <div className="FirstLevelComment__aside--likes">
          <HeartEmpty className=" FirstLevelComment__aside--logo" />
          <p className="FirstLevelComment__aside--likes-number">23</p>
        </div>
        <div className="FirstLevelComment__aside--comments">
          <ChatLogo className=" FirstLevelComment__aside--logo" />
          <p className="FirstLevelComment__aside--comments-number">4</p>
        </div>
      </div>
    </div>
  );
};

export default FirstLevelComment;
