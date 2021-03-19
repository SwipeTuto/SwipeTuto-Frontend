import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { initialSignalState } from "../../../helper/constants";
import { getUrlId } from "../../../helper/functions/getURLParams";
import { getCardsByUserIdAction } from "../../../redux/filter/filter-actions";
import { selectTotalNumberOfResults } from "../../../redux/filter/filter-selectors";
import {
  closeFollowersListPopup,
  closeFollowingsListPopup,
  openFollowersListPopup,
  openFollowingsListPopup,
  showSignalPopup,
} from "../../../redux/layout/layout-actions";
import {
  selectFollowersListOpen,
  selectFollowingsListOpen,
  selectIsLoaded,
  selectTheme,
  selectUserLoaded,
} from "../../../redux/layout/layout-selectors";
import { setNoClickedUser } from "../../../redux/user/user-actions";
import {
  selectClickedUser,
  selectCurrentUser,
  selectCurrentUserFollowersCount,
  selectCurrentUserFollowingsCount,
} from "../../../redux/user/user-selectors";
import Loading from "../../Loading/Loading";
import UserAvatar from "../../UserComponents/UserAvatar/UserAvatar";
import CustomButton from "../CustomButton/CustomButton";
import FollowButton from "../FollowButton/FollowButton";
import FollowersList from "../FollowersList/FollowersList";
import FollowingsList from "../FollowingsList/FollowingsList";
import VerticalMenu from "../VerticalMenu/VerticalMenu";

import "./UserHeader.scss";

const UserHeader = ({ location }) => {
  const locationPath = location && location.pathname;
  const dispatch = useDispatch();
  const [userDatas, setUserDatas] = useState();
  const isLoaded = useSelector(selectIsLoaded);
  const userIsLoaded = useSelector(selectUserLoaded);
  const [followersCount, setFollowersCount] = useState(userDatas?.followers_count || 0);
  const [followingsCount, setFollowingsCount] = useState(userDatas?.followings_count || 0);
  const totalCardsFetched = useSelector(selectTotalNumberOfResults);
  const currentUser = useSelector(selectCurrentUser);
  const clickedUser = useSelector(selectClickedUser);
  const currentTheme = useSelector(selectTheme);
  const userId = getUrlId(location.pathname, "user_id");
  const followersListOpen = useSelector(selectFollowersListOpen);
  const followingsListOpen = useSelector(selectFollowingsListOpen);

  useEffect(() => {
    console.log(followingsCount);
    console.log(followersCount);
  }, [followersCount, followingsCount]);

  useEffect(() => {
    if ((userId && userId === currentUser?.id) || (locationPath === "/account/user" && currentUser.id)) {
      setUserDatas(currentUser);
      // dispatch(setNoClickedUser());
    } else if (userId && userId !== currentUser?.id && clickedUser?.id) {
      setUserDatas(clickedUser);
      // dispatch(setNoClickedUser());
    }
  }, [clickedUser, currentUser, dispatch, locationPath, userDatas, userId]);

  useEffect(() => {
    if (userDatas) {
      setFollowingsCount(userDatas?.followings_count);
      setFollowersCount(userDatas?.followers_count);
    }
  }, [userDatas]);

  const newSignalObject = {
    ...initialSignalState,
    id_user: parseInt(userId),
  };

  const handleShowFollowers = () => {
    dispatch(closeFollowingsListPopup());
    if (followersListOpen) {
      dispatch(closeFollowersListPopup());
    } else {
      dispatch(openFollowersListPopup());
    }
  };
  const handleShowFollowings = () => {
    dispatch(closeFollowersListPopup());
    if (followingsListOpen) {
      dispatch(closeFollowingsListPopup());
    } else {
      dispatch(openFollowingsListPopup());
    }
  };

  const adjustFollowers = (followed) => {
    console.log("call");
    if (followed) {
      setFollowersCount((prevState) => prevState + 1);
    } else {
      setFollowersCount((prevState) => prevState - 1);
    }
  };

  return (
    <>
      {followersListOpen && <FollowersList userID={userDatas?.id} />}
      {followingsListOpen && <FollowingsList userID={userDatas?.id} />}
      <div className={`UserHeader ${currentTheme}-theme-m`}>
        {userIsLoaded && (
          <div className="UserHeader__stats">
            <p className="UserHeader__stats--stat">
              {totalCardsFetched
                ? totalCardsFetched < 2
                  ? totalCardsFetched + " Tutoriel publié"
                  : totalCardsFetched + " Tutoriels publiés"
                : "Aucun tutoriel pour le moment"}
            </p>

            <p className="UserHeader__stats--stat UserHeader__stats--followers" onClick={() => handleShowFollowers()}>
              {followersCount || 0} abonnés
            </p>
            <p className="UserHeader__stats--stat UserHeader__stats--followings" onClick={() => handleShowFollowings()}>
              {followingsCount || 0} abonnements
            </p>
            <VerticalMenu>
              <p onClick={() => dispatch(showSignalPopup(newSignalObject))}>Signaler</p>
            </VerticalMenu>
          </div>
        )}
        <div className="UserHeader__bottom">
          {userIsLoaded ? <UserAvatar user={userDatas} /> : <Loading />}
          {isLoaded && (
            <div className="UserHeader__right">
              <h2 className="title title-2">{userDatas?.username}</h2>
              {userIsLoaded && userDatas?.profile?.description && <p className="UserHeader__right--description">{userDatas.profile.description}</p>}
              <div className="UserHeader__buttons">
                {userDatas === currentUser ? (
                  <Link to="/account/settings">
                    <CustomButton color="dark">Gérer le profil</CustomButton>
                  </Link>
                ) : (
                  <>
                    <FollowButton adjustFollowers={adjustFollowers} userIDtoFollow={userId} />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default withRouter(UserHeader);
