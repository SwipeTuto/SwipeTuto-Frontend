import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../../../redux/layout/layout-selectors";
import { getTopUsersAction } from "../../../redux/user/user-actions";
import { selectTopUsers } from "../../../redux/user/user-selectors";
import UserNameAndAvatar from "../../UserComponents/UserAvatar/UserNameAndAvatar";
import FollowButton from "../FollowButton/FollowButton";

import "./TopUsers.scss";

const TopUsers = ({ quantity, addClass }) => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  const topUsersArray = useSelector(selectTopUsers);

  useEffect(() => {
    dispatch(getTopUsersAction(quantity || 6));
  }, [dispatch, quantity]);

  return (
    <div className={`${addClass ? addClass : ""} TopUsers  ${currentTheme}-theme-m`}>
      <h3 className="title title-3">Comptes à suivre</h3>
      <div className="TopUsers__list">
        {topUsersArray
          ? topUsersArray.map((user) => (
              <div className="TopUsers__topUser">
                <UserNameAndAvatar key={`topuser-${user?.id}`} user={user} link={true} />
                <FollowButton userIDtoFollow={user?.id} />
              </div>
            ))
          : "Chargement ..."}
      </div>
    </div>
  );
};

export default TopUsers;
