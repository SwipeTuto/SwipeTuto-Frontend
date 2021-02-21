import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserByIdAction } from "../../../redux/user/user-actions";
import { setNoClickedCard } from "../../../redux/filter/filter-actions";
import { closePopupCard } from "../../../redux/layout/layout-actions";

import "./UserAvatar.scss";
import { selectCurrentUser } from "../../../redux/user/user-selectors";

const UserAvatar = ({ user, link, addActionOnClick }) => {
  const dispatch = useDispatch();
  const userImage = user && user.avatar && user.avatar[0] && user.avatar[0].url ? `${user.avatar[0].url}` : null;
  const [error, setError] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  let [isLinked, setIsLinked] = useState(link);

  useEffect(() => {
    if (!currentUser) setIsLinked(false);
  }, [currentUser]);

  return (
    <>
      {isLinked ? (
        <Link
          to={`/profile/user_id=${user && user.id}`}
          className="UserNameAndAvatar"
          onClick={() => {
            addActionOnClick && addActionOnClick();
            dispatch(closePopupCard());
            dispatch(setNoClickedCard());
            // dispatch(getUserByIdAction(parseInt(user && user.id)));
          }}
        >
          <div className="user_avatar">
            {userImage && !error ? (
              <img className="user_avatar--image" src={userImage} alt="user" onError={() => setError(true)} />
            ) : user && user.username ? (
              user && user.username && user.username.slice(0, 1)
            ) : (
              "S"
            )}
          </div>
        </Link>
      ) : (
        <div className="user_avatar">
          {userImage ? (
            <img className="UserNameAndAvatar__avatar--image" src={userImage} alt="user" />
          ) : (
            user && user.username && user.username.slice(0, 1)
          )}
        </div>
      )}
    </>
  );
};

export default React.memo(UserAvatar);
