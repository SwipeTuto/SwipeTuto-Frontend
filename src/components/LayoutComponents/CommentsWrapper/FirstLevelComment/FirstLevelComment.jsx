import React, { useState } from "react";
import UserNameAndAvatar from "../../../UserComponents/UserAvatar/UserNameAndAvatar";

import { ReactComponent as ChatLogo } from "../../../../assets/images/chatbubbles-outline.svg";
import { ReactComponent as HeartEmpty } from "../../../../assets/images/heart-outline.svg";
import { ReactComponent as HeartFull } from "../../../../assets/images/heart.svg";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../redux/user/user-selectors";
import { selectClickedCardComments } from "../../../../redux/filter/filter-selectors";

const FirstLevelComment = ({ comment }) => {
  const currentUser = useSelector(selectCurrentUser);
  const cardComments = useSelector(selectClickedCardComments);

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
    <div className="FirstLevelComment">
      <div className="FirstLevelComment__author">
        <UserNameAndAvatar user={comment && comment.author} />
      </div>
      <div className="FirstLevelComment__center">{comment && comment.text}</div>
      <div className="FirstLevelComment__aside"></div>
    </div>
  );
};

export default FirstLevelComment;
