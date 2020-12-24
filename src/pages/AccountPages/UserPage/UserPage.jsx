import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { selectCurrentUser, selectClickedUser } from "../../../redux/user/user-selectors";
import {
  selectCardsFetched,
  selectCardsFetchedCards,
  selectTotalNumberOfCardsSearched,
  selectTotalNumberOfResults,
} from "../../../redux/filter/filter-selectors";
import Loading from "../../../components/Loading/Loading";

import "./UserPage.scss";
import { selectIsLoaded, selectTheme } from "../../../redux/layout/layout-selectors";
import { getCardsByUserIdAction } from "../../../redux/filter/filter-actions";
import CardGridList from "../../../components/CardsComponents/CardGridList/CardGridList";
import { setCardsSize } from "../../../redux/layout/layout-actions";
import { usePrevious } from "../../../hooks/usePrevious";
import { getUrlId } from "../../../helper";
import UserNameAndAvatar from "../../../components/UserComponents/UserAvatar/UserNameAndAvatar";

const UserPage = ({ userIsSame, location }) => {
  const locationPath = location && location.pathname;

  // user = current pour user actuel
  // user = other pour la visite d'un autre profil
  const isLoaded = useSelector(selectIsLoaded);
  const totalCardsFetched = useSelector(selectTotalNumberOfResults);
  const cards = useSelector(selectCardsFetchedCards);
  const currentUser = useSelector(selectCurrentUser);
  const prevCurrentUserId = usePrevious(currentUser?.id) || null;
  const clickedUser = useSelector(selectClickedUser);
  const prevClickedUserId = usePrevious(clickedUser?.id) || null;
  const currentTheme = useSelector(selectTheme);
  const [userDatas, setUserDatas] = useState();
  const dispatch = useDispatch();
  const userId = getUrlId(location.pathname, "user_id");

  useEffect(() => {
    console.log(userIsSame);
  }, [userIsSame]);

  useEffect(() => {
    if (locationPath.includes("card_id")) return;
    if (userId && clickedUser && (prevClickedUserId === null || prevClickedUserId !== clickedUser.id)) {
      setUserDatas(clickedUser);
      dispatch(getCardsByUserIdAction(clickedUser.id));
    } else if (
      locationPath === "/account/user" &&
      currentUser &&
      currentUser.id &&
      (prevCurrentUserId === null || prevCurrentUserId !== currentUser.id)
    ) {
      setUserDatas(currentUser);
      dispatch(getCardsByUserIdAction(currentUser.id));
    }
  }, [clickedUser, currentUser, dispatch, locationPath, prevClickedUserId, prevCurrentUserId, userId]);

  useEffect(() => {
    dispatch(setCardsSize("big"));
  }, [dispatch]);

  return (
    <div className={`UserPage ${currentTheme}-theme-d`}>
      <div className="UserPage__header">
        <UserNameAndAvatar user={userDatas} />
        <p className="UserPage__header--cards">
          {totalCardsFetched
            ? totalCardsFetched < 2
              ? totalCardsFetched + " Tutoriel publié"
              : totalCardsFetched + " Tutoriels publiés"
            : "Aucun tutoriel pour le moment"}
        </p>
        {userDatas?.profile?.description && <p className="UserPage__header--description">{userDatas.profile.description}</p>}
      </div>
      <div className="UserPage__cards">
        <h2 className="title title-2">Tutoriels de {userDatas && userDatas.username ? userDatas.username : "l'utilisateur "}</h2>
        {!isLoaded ? (
          <Loading />
        ) : userDatas && cards.length > 0 ? (
          <CardGridList loadFilter={false} allowInfiniteScroll={true} />
        ) : (
          <p className="UserPage__nocards">Aucune carte pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default withRouter(UserPage);
