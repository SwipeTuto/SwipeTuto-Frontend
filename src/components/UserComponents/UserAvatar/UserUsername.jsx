import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserByIdAction } from "../../../redux/user/user-actions";
import { setNoClickedCard } from "../../../redux/filter/filter-actions";
import { closePopupCard } from "../../../redux/layout/layout-actions";

import "./UserAvatar.scss";
import { selectCurrentUser } from "../../../redux/user/user-selectors";

const UserUsername = ({ user, link, addActionOnClick }) => {
  const dispatch = useDispatch();
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
          className="UserUsername"
          onClick={() => {
            addActionOnClick && addActionOnClick();
            dispatch(closePopupCard());
            dispatch(setNoClickedCard());
            dispatch(getUserByIdAction(parseInt(user && user.id)));
          }}
        >
          <p className="UserUsername__username">{user && user.username ? user.username : "Utilisateur SwipeTuto"}</p>
        </Link>
      ) : (
        <p className="UserUsername__username">{user && user.username ? user.username : "Utilisateur SwipeTuto"}</p>
      )}
    </>
  );
};

export default React.memo(UserUsername);
