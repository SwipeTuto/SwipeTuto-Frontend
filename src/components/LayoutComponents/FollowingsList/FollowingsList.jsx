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
import FollowButton from "../FollowButton/FollowButton";
import { ReactComponent as CloseLogo } from "../../../assets/images/close.svg";

import "../FollowersList/FollowersList";

const FollowingsList = ({ userID }) => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  const currentUserID = useSelector(selectCurrentUserId);
  const currentUser = useSelector(selectCurrentUser);
  const followingsLoaded = useSelector(selectFollowingsLoaded);
  const followingsArray = useSelector(selectCurrentUserFollowingsList);

  useEffect(() => {
    userID && dispatch(getUserFollowingsListAction(userID));
  }, [userID, dispatch]);

  const closeList = () => {
    dispatch(closeFollowingsListPopup());
  };

  return (
    <div className="FollowersList" onClick={() => closeList()}>
      <div className={`FollowersList__wrapper ${currentTheme}-theme-m`} onClick={(e) => e.stopPropagation()}>
        <div className="FollowersList__header">
          <h3 className="title title-3">Abonnements</h3>
          <div className="FollowersList__header--close">
            <CloseLogo onClick={() => closeList()} />
          </div>
        </div>
        <div className="FollowersList__list">
          {followingsLoaded ? (
            followingsArray && followingsArray.length > 0 ? (
              followingsArray.map((following) => (
                <div className="FollowersList__profile" key={following?.id}>
                  <Link to={`/profile/user_id=${following?.id}`} onClick={() => closeList()}>
                    <UserAvatar user={following} />
                    <p>{following?.username}</p>
                  </Link>
                  <FollowButton userIDtoFollow={following?.id} />
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
