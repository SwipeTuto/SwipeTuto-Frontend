import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getInitials } from "../../../helper/index";

import { getUserByIdAction } from "../../../redux/user/user-actions";
import { base } from "../../../services/configService";
import { setNoClickedCard } from "../../../redux/filter/filter-actions";
import { closePopupCard } from "../../../redux/layout/layout-actions";

import "./UserAvatar.scss";

const UserAvatar = ({ user, link }) => {
  const dispatch = useDispatch();
  const userImage =
    user && user.profile && user.profile[0] && user.profile[0].avatar
      ? `${base}${user.profile[0].avatar}`
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
          <div className="user_avatar">
            {userImage ? (
              <img className="user_avatar--image" src={userImage} alt="user" />
            ) : user && user.first_name && user && user.last_name ? (
              getInitials(user.first_name, user.last_name)
            ) : user && user.first_name ? (
              user.first_name.slice(0, 1).toUpperCase()
            ) : (
              "S"
            )}
          </div>
        </Link>
      ) : (
        <div className="user_avatar">
          {userImage ? (
            <img className="user_avatar--image" src={userImage} alt="user" />
          ) : user && user.first_name && user && user.last_name ? (
            getInitials(user.first_name, user.last_name)
          ) : user && user.first_name ? (
            user.first_name.slice(0, 1).toUpperCase()
          ) : (
            "S"
          )}
        </div>
      )}
    </>
  );
};

export default UserAvatar;
