import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { closeFollowersListPopup } from "../../../redux/layout/layout-actions";
import { selectFollowersListOpen, selectFollowersLoaded, selectTheme } from "../../../redux/layout/layout-selectors";
import { getUserFollowersListAction } from "../../../redux/user/user-actions";
import {
  selectCurrentUser,
  selectCurrentUserFollowers,
  selectCurrentUserFollowersList,
  selectCurrentUserId,
} from "../../../redux/user/user-selectors";
import Loading from "../../Loading/Loading";
import UserAvatar from "../../UserComponents/UserAvatar/UserAvatar";

import "./FollowersList.scss";

const FollowersList = ({ userID }) => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  const currentUserID = useSelector(selectCurrentUserId);
  const currentUser = useSelector(selectCurrentUser);
  const followersLoaded = useSelector(selectFollowersLoaded);
  // const followersListOpen = useSelector(selectFollowersListOpen);
  const followersArray = useSelector(selectCurrentUserFollowersList);

  useEffect(() => {
    userID && dispatch(getUserFollowersListAction(userID));
  }, [userID, dispatch]);

  const closeList = () => {
    dispatch(closeFollowersListPopup());
  };

  return (
    <div className="FollowersList" onClick={() => closeList()}>
      <div className={`FollowersList__wrapper ${currentTheme}-theme-m`} onClick={(e) => e.stopPropagation()}>
        <h3 className="title title-3">Abonnés</h3>
        <div className="FollowersList__list">
          {followersLoaded ? (
            followersArray && followersArray.length > 0 ? (
              followersArray.map((follower) => (
                <div className="FollowersList__profile" key={follower?.id} onClick={() => closeList()}>
                  <Link to={`/profile/user_id=${follower?.id}`}>
                    <UserAvatar user={follower} />
                    <p>{follower?.username}</p>
                  </Link>
                </div>
              ))
            ) : (
              <p>Aucun abonné pour le moment</p>
            )
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowersList;
