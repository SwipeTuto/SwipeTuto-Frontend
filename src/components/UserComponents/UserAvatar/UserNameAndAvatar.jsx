import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import { getInitials } from "../../../helper/index";

import "./UserNameAndAvatar.scss";
import { getUserByIdAction } from "../../../redux/user/user-actions";
import { base } from "../../../services/configService";
import { setNoClickedCard } from "../../../redux/filter/filter-actions";
import { closePopupCard } from "../../../redux/layout/layout-actions";

const UserNameAndAvatar = ({ user }) => {
  const dispatch = useDispatch();
  const userImage =
    user && user.profile && user.profile[0] && user.profile[0].avatar
      ? `${base}${user.profile[0].avatar}`
      : null;
  return (
    <Link
      to={`/profile/user_id=${user && user.id}`}
      className="UserNameAndAvatar"
      onClick={() => {
        dispatch(closePopupCard());
        dispatch(setNoClickedCard());
        dispatch(getUserByIdAction(parseInt(user && user.id)));
      }}
    >
      <div className="UserNameAndAvatar__avatar">
        {userImage ? (
          <img
            className="UserNameAndAvatar__avatar--image"
            src={userImage}
            alt="user"
          />
        ) : user && user.first_name && user && user.last_name ? (
          getInitials(user.first_name, user.last_name)
        ) : user && user.first_name ? (
          user.first_name.slice(0, 1).toUpperCase()
        ) : (
          "S"
        )}
      </div>
      <p className="UserNameAndAvatar__username">
        {user && user.username ? user.username : "Utilisateur SwipeTuto"}
      </p>
    </Link>
  );
};

export default UserNameAndAvatar;
