import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { selectCurrentUser, selectClickedUser, selectCurrentUserFollowersCount } from "../../../redux/user/user-selectors";
import { selectCardsFetchedCards, selectTotalNumberOfResults } from "../../../redux/filter/filter-selectors";
import Loading from "../../../components/Loading/Loading";
import "./UserPage.scss";
import { selectIsLoaded, selectTheme, selectUserLoaded } from "../../../redux/layout/layout-selectors";
import { getCardsByUserIdAction } from "../../../redux/filter/filter-actions";
import CardGridList from "../../../components/CardsComponents/CardGridList/CardGridList";
import { usePrevious } from "../../../hooks/usePrevious";
import { getUrlId } from "../../../helper/functions/getURLParams";
import UserNameAndAvatar from "../../../components/UserComponents/UserAvatar/UserNameAndAvatar";
import { setNoClickedUser } from "../../../redux/user/user-actions";
import CustomButton from "../../../components/LayoutComponents/CustomButton/CustomButton";
import FollowButton from "../../../components/LayoutComponents/FollowButton/FollowButton";
import UserAvatar from "../../../components/UserComponents/UserAvatar/UserAvatar";
import UserHeader from "../../../components/LayoutComponents/UserHeader/UserHeader";

const UserPage = ({ userIsSame, location }) => {
  const locationPath = location && location.pathname;

  // user = current pour user actuel
  // user = other pour la visite d'un autre profil
  const isLoaded = useSelector(selectIsLoaded);
  const totalCardsFetched = useSelector(selectTotalNumberOfResults);
  const cards = useSelector(selectCardsFetchedCards);
  const currentUser = useSelector(selectCurrentUser);
  // const prevCurrentUserId = usePrevious(currentUser?.id) || null;
  const clickedUser = useSelector(selectClickedUser);
  // const prevClickedUserId = usePrevious(clickedUser?.id) || null;
  const currentTheme = useSelector(selectTheme);
  const [userDatas, setUserDatas] = useState();
  const dispatch = useDispatch();
  const userId = getUrlId(location.pathname, "user_id");
  const userIsLoaded = useSelector(selectUserLoaded);
  const followersCount = useSelector(selectCurrentUserFollowersCount);

  useEffect(() => {
    if (locationPath.includes("card_id")) return;
    if (locationPath.includes("/profile") && clickedUser?.id) {
      setUserDatas(clickedUser);
      dispatch(getCardsByUserIdAction(clickedUser.id));
      // dispatch(setNoClickedUser());
    } else if (locationPath === "/account/user" && currentUser?.id) {
      setUserDatas(currentUser);
      dispatch(getCardsByUserIdAction(currentUser.id));
      // dispatch(setNoClickedUser());
    }
  }, [clickedUser, currentUser, dispatch, locationPath, userId]);

  return (
    <div className={`UserPage ${currentTheme}-theme-d`}>
      <UserHeader />
      <div className="UserPage__cards">
        <h2 className="title title-2">Tutoriels de {userDatas && userDatas.username ? userDatas.username : "l'utilisateur "}</h2>
        {!isLoaded ? (
          <Loading />
        ) : userDatas && cards?.length > 0 ? (
          <CardGridList allowInfiniteScroll={true} />
        ) : (
          <p className="UserPage__nocards">Aucune carte pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default withRouter(UserPage);
