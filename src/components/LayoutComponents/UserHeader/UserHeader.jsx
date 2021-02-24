import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { initialSignalState } from "../../../helper/constants";
import { getUrlId } from "../../../helper/functions/getURLParams";
import { getCardsByUserIdAction } from "../../../redux/filter/filter-actions";
import { selectTotalNumberOfResults } from "../../../redux/filter/filter-selectors";
import { showSignalPopup } from "../../../redux/layout/layout-actions";
import { selectIsLoaded, selectTheme, selectUserLoaded } from "../../../redux/layout/layout-selectors";
import { setNoClickedUser } from "../../../redux/user/user-actions";
import { selectClickedUser, selectCurrentUser, selectCurrentUserFollowersCount } from "../../../redux/user/user-selectors";
import Loading from "../../Loading/Loading";
import UserAvatar from "../../UserComponents/UserAvatar/UserAvatar";
import CustomButton from "../CustomButton/CustomButton";
import FollowButton from "../FollowButton/FollowButton";

import "./UserHeader.scss";

const UserHeader = ({ location }) => {
  const locationPath = location && location.pathname;
  const dispatch = useDispatch();
  const [userDatas, setUserDatas] = useState();
  const isLoaded = useSelector(selectIsLoaded);
  const userIsLoaded = useSelector(selectUserLoaded);
  const followersCount = useSelector(selectCurrentUserFollowersCount);
  const totalCardsFetched = useSelector(selectTotalNumberOfResults);
  const currentUser = useSelector(selectCurrentUser);
  const clickedUser = useSelector(selectClickedUser);
  const currentTheme = useSelector(selectTheme);
  const userId = getUrlId(location.pathname, "user_id");

  useEffect(() => {
    if ((userId && userId === currentUser?.id) || (locationPath === "/account/user" && currentUser.id)) {
      setUserDatas(currentUser);
      dispatch(setNoClickedUser());
    } else if (userId && userId !== currentUser?.id && clickedUser?.id) {
      setUserDatas(clickedUser);
      dispatch(setNoClickedUser());
    }
  }, [clickedUser, currentUser, dispatch, locationPath, userDatas, userId]);

  const newSignalObject = {
    ...initialSignalState,
    id_user: parseInt(userId),
  };

  return (
    <div className={`UserHeader ${currentTheme}-theme-m`}>
      {userIsLoaded && (
        <div className="UserHeader__stats">
          <p>
            {totalCardsFetched
              ? totalCardsFetched < 2
                ? totalCardsFetched + " Tutoriel publié"
                : totalCardsFetched + " Tutoriels publiés"
              : "Aucun tutoriel pour le moment"}
          </p>

          <p>{followersCount || 0} abonnés</p>
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
                  <FollowButton />
                  <CustomButton color="transparent" onClick={() => dispatch(showSignalPopup(newSignalObject))}>
                    Signaler
                  </CustomButton>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(UserHeader);
