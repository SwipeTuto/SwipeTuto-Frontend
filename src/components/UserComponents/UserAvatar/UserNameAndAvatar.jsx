import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import { base, coudinaryBase } from "../../../services/configService";

import { getUserByIdAction } from "../../../redux/user/user-actions";
import { setNoClickedCard } from "../../../redux/filter/filter-actions";
import { closePopupCard } from "../../../redux/layout/layout-actions";

import "./UserNameAndAvatar.scss";
import { selectTheme } from "../../../redux/layout/layout-selectors";

const UserNameAndAvatar = ({ user, link, changeLink, themed }) => {
  const dispatch = useDispatch();
  const userImage =
    user && user.avatar && user.avatar[0] && user.avatar[0].avatar
      ? `${user.avatar[0].avatar}`
      : // ? `${base}${user.avatar[0].avatar}`
        null;
  const [error, setError] = useState(false);
  const currentTheme = useSelector(selectTheme);

  return (
    <>
      {link ? (
        <Link
          to={changeLink ? changeLink : `/profile/user_id=${user && user.id}`}
          className={`UserNameAndAvatar ${themed ? currentTheme + "-theme-l" : ""}`}
          onClick={() => {
            dispatch(closePopupCard());
            dispatch(setNoClickedCard());
            dispatch(getUserByIdAction(parseInt(user && user.id)));
          }}
        >
          <div className="UserNameAndAvatar__avatar">
            {userImage && !error ? (
              <img className="user_avatar--image" src={userImage} alt="user" onError={() => setError(true)} />
            ) : user && user.username ? (
              user && user.username && user.username.slice(0, 1)
            ) : (
              "S"
            )}
          </div>
          <p className="UserNameAndAvatar__username">{user && user.username ? user.username : "Utilisateur SwipeTuto"}</p>
        </Link>
      ) : (
        <>
          <div className="UserNameAndAvatar__avatar">
            {userImage ? (
              <img className="UserNameAndAvatar__avatar--image" src={userImage} alt="user" />
            ) : (
              user && user.username && user.username.slice(0, 1)
            )}
          </div>
          <p className="UserNameAndAvatar__username">{user && user.username ? user.username : "Utilisateur SwipeTuto"}</p>
        </>
      )}
    </>
  );
};

export default UserNameAndAvatar;
