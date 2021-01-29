import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserByIdAction } from "../../../redux/user/user-actions";
import { setNoClickedCard } from "../../../redux/filter/filter-actions";
import { closePopupCard, setLoading } from "../../../redux/layout/layout-actions";
import "./UserNameAndAvatar.scss";
import { selectTheme } from "../../../redux/layout/layout-selectors";
import { selectCurrentUser } from "../../../redux/user/user-selectors";

const UserNameAndAvatar = ({ user, link, changeLink, themed }) => {
  const dispatch = useDispatch();
  const userImage = user && user.avatar && user.avatar[0] && user.avatar[0].url ? `${user.avatar[0].url}` : null;
  const [error, setError] = useState(false);
  const currentTheme = useSelector(selectTheme);
  const currentUser = useSelector(selectCurrentUser);
  let [isLinked, setIsLinked] = useState(link);

  useEffect(() => {
    if (!currentUser) setIsLinked(false);
  }, [currentUser]);

  return (
    <div className="UserNameAndAvatar">
      {isLinked ? (
        <Link
          to={changeLink ? changeLink : `/profile/user_id=${user && user.id}`}
          className={`UserNameAndAvatar ${themed ? currentTheme + "-theme-l" : ""}`}
          onClick={async () => {
            dispatch(setLoading());
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
    </div>
  );
};

export default React.memo(UserNameAndAvatar);
