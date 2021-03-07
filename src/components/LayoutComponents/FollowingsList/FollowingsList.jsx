import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { closeFollowersListPopup, closeFollowingsListPopup } from "../../../redux/layout/layout-actions";
import { selectFollowersListOpen, selectFollowersLoaded, selectFollowingsLoaded, selectTheme } from "../../../redux/layout/layout-selectors";
import { getUserFollowersListAction, getUserFollowingsListAction } from "../../../redux/user/user-actions";
import {
  selectCurrentUser,
  selectCurrentUserFollowers,
  selectCurrentUserFollowings,
  selectCurrentUserFollowingsList,
  selectCurrentUserId,
} from "../../../redux/user/user-selectors";
import Loading from "../../Loading/Loading";
import UserAvatar from "../../UserComponents/UserAvatar/UserAvatar";

import "../FollowersList/FollowersList";

const FollowingsList = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  const currentUserID = useSelector(selectCurrentUserId);
  const currentUser = useSelector(selectCurrentUser);
  const followingsLoaded = useSelector(selectFollowingsLoaded);
  const followingsArray = useSelector(selectCurrentUserFollowingsList);

  useEffect(() => {
    dispatch(getUserFollowingsListAction(currentUserID));
  }, [currentUserID, dispatch]);

  const closeList = () => {
    dispatch(closeFollowingsListPopup());
  };

  return (
    <div className="FollowersList" onClick={() => closeList()}>
      <div className={`FollowersList__wrapper ${currentTheme}-theme-m`} onClick={(e) => e.stopPropagation()}>
        <h3 className="title title-3">Abonnements de {currentUser?.username}</h3>
        <div className="FollowersList__list">
          {followingsLoaded ? (
            followingsArray && followingsArray.length > 0 ? (
              followingsArray.map((follower) => (
                <div className="FollowersList__profile" key={follower?.id} onClick={() => closeList()}>
                  <Link to={`/profile/user_id=${follower?.id}`}>
                    <UserAvatar user={follower} />
                    <p>{follower?.username}</p>
                  </Link>
                </div>
              ))
            ) : (
              <p>Aucun abonnement pour le moment</p>
            )
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowingsList;
