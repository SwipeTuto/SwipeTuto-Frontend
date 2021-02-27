import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { closeFollowersListPopup } from "../../../redux/layout/layout-actions";
import { selectFollowersListOpen, selectFollowersLoaded, selectTheme } from "../../../redux/layout/layout-selectors";
import { getUserFollowersListAction } from "../../../redux/user/user-actions";
import { selectCurrentUser, selectCurrentUserFollowers, selectCurrentUserId } from "../../../redux/user/user-selectors";
import Loading from "../../Loading/Loading";
import UserAvatar from "../../UserComponents/UserAvatar/UserAvatar";

import "./FollowersList.scss";

const FollowersList = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  const currentUserID = useSelector(selectCurrentUserId);
  const currentUser = useSelector(selectCurrentUser);
  const followersLoaded = useSelector(selectFollowersLoaded);
  const followersListOpen = useSelector(selectFollowersListOpen);
  // const followersArray = useSelector(selectCurrentUserFollowers);
  const followersArray = [
    {
      id: 3,
      username: "andres gomes",
      first_name: "andres",
      last_name: "gomes",
      settings: {
        color_theme: "dark",
        card_size: "big",
      },
      email: "swipetuto@gmail.com",
      profile: {
        description: null,
        category_favorie: [
          {
            name: "informatique",
            topic: {
              name: "technologie",
              id: 1,
            },
          },
          {
            name: "desserts",
            topic: {
              name: "cuisine",
              id: 2,
            },
          },
        ],
      },
      avatar: [
        {
          id: 3,
          avatar: null,
          url: "http://res.cloudinary.com/hiimurmrd/image/upload/v1606655189/media/avatar/3_swipetuto%40gmail.com.jpg.png",
        },
      ],
      favories: [],
      followers: [],
      followers_count: 0,
      reglement: null,
    },
    {
      id: 19,
      username: "Gomes Andres",
      first_name: "Gomes",
      last_name: "Andres",
      settings: {
        color_theme: "light",
        card_size: "small",
      },
      email: "andres.gomesiglesias@gmail.com",
      profile: {
        description: "",
        category_favorie: [
          {
            name: "informatique",
            topic: {
              name: "technologie",
              id: 1,
            },
          },
        ],
      },
      avatar: [
        {
          id: 11,
          avatar: null,
          url: "http://res.cloudinary.com/hiimurmrd/image/upload/v1610487941/media/avatar/19_andres.gomesiglesias%40gmail.com.jpg.jpg",
        },
      ],
      favories: [],
      followers: [],
      followers_count: 0,
      reglement: null,
    },
  ];

  useEffect(() => {
    dispatch(getUserFollowersListAction(currentUserID));
  }, [currentUserID, dispatch]);

  const closeList = () => {
    dispatch(closeFollowersListPopup());
  };

  return (
    <div className="FollowersList" onClick={() => closeList()}>
      <div className={`FollowersList__wrapper ${currentTheme}-theme-m`} onClick={(e) => e.stopPropagation()}>
        <h3 className="title title-3">Abonnés de {currentUser?.username}</h3>
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
