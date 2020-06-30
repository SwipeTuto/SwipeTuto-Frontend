import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import { getInitials } from "../../../helper/index";

import "./UserAvatar.scss";
import { CardsActionTypes } from "../../../redux/cards/cards-types";

const UserAvatar = ({ userImage, userFirstName, userLastName }) => {
  return (
    <div className="user_avatar">
      {userImage ? (
        <img className="user_avatar--image" src={userImage} alt="user" />
      ) : userFirstName && userLastName ? (
        getInitials(userFirstName, userLastName)
      ) : userFirstName ? (
        userFirstName.slice(0, 1).toUpperCase()
      ) : (
        "S"
      )}
    </div>
  );
};

export default UserAvatar;
