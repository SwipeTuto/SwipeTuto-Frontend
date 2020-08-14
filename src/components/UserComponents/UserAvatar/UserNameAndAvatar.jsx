import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getInitials } from "../../../helper/index";
import { base } from "../../../services/configService";

import { getUserByIdAction } from "../../../redux/user/user-actions";
import { setNoClickedCard } from "../../../redux/filter/filter-actions";
import { closePopupCard } from "../../../redux/layout/layout-actions";

import "./UserNameAndAvatar.scss";

const UserNameAndAvatar = ({ user, link }) => {
  const dispatch = useDispatch();
  const userImage =
    user && user.avatar && user.avatar[0] && user.avatar[0].avatar
      ? `${base}${user.avatar[0].avatar}`
      : null;
  return (
    <>
      {link ? (
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
      ) : (
        <>
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
        </>
      )}
    </>
  );
};

export default UserNameAndAvatar;
