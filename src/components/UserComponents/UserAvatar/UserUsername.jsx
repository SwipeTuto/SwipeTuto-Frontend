import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserByIdAction } from "../../../redux/user/user-actions";
import { setNoClickedCard } from "../../../redux/filter/filter-actions";
import { closePopupCard } from "../../../redux/layout/layout-actions";

import "./UserAvatar.scss";

const UserUsername = ({ user, link, addActionOnClick }) => {
  const dispatch = useDispatch();

  return (
    <>
      {link ? (
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
