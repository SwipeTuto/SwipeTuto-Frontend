import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { base, coudinaryBase } from "../../../services/configService";

import { getUserByIdAction } from "../../../redux/user/user-actions";
import { setNoClickedCard } from "../../../redux/filter/filter-actions";
import { closePopupCard } from "../../../redux/layout/layout-actions";

import "./UserAvatar.scss";

const UserAvatar = ({ user, link }) => {
  const dispatch = useDispatch();
  const userImage =
    user && user.avatar && user.avatar[0] && user.avatar[0].avatar
      ? `${user.avatar[0].avatar}`
      : null;
  const [error, setError] = useState(false);
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
          
            {userImage && !error ? (
              <img
                className="user_avatar--image"
                src={userImage}
                alt="user"
                onError={() => setError(true)}
              />
            ) : (
              user && user.username && user.username.slice(0, 1)
            )}
          </div>
        </Link>
      ) : (
        <div className="user_avatar">
          {userImage ? (
            <img
              className="UserNameAndAvatar__avatar--image"
              src={userImage}
              alt="user"
            />
          ) : (
            user && user.username && user.username.slice(0, 1)
          )}
        </div>
      )}
    </>
  );
};

export default UserAvatar;
