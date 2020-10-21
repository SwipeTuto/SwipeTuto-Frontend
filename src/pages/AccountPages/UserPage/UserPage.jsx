import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  selectCurrentUser,
  selectClickedUser,
} from "../../../redux/user/user-selectors";
import { selectCardsFetchedCards } from "../../../redux/filter/filter-selectors";
import Loading from "../../../components/Loading/Loading";

import "./UserPage.scss";
import {
  selectIsLoaded,
  selectTheme,
} from "../../../redux/layout/layout-selectors";
import { getCardsByUserIdAction } from "../../../redux/filter/filter-actions";
import CardGridList from "../../../components/CardsComponents/CardGridList/CardGridList";
import { setCardsSize } from "../../../redux/layout/layout-actions";

const UserPage = ({ userIsSame, location }) => {
  const locationPath = location && location.pathname;

  // user = current pour user actuel
  // user = other pour la visite d'un autre profil
  const isLoaded = useSelector(selectIsLoaded);
  const cards = useSelector(selectCardsFetchedCards);
  const currentUser = useSelector(selectCurrentUser);
  const clickedUser = useSelector(selectClickedUser);
  const currentTheme = useSelector(selectTheme);
  const [userDatas, setUserDatas] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      (userIsSame && currentUser && currentUser.id) ||
      (locationPath && locationPath.includes("/account/user") && currentUser)
    ) {
      setUserDatas(currentUser);
      dispatch(getCardsByUserIdAction(currentUser.id));
    } else if (!userIsSame && clickedUser && clickedUser.id) {
      setUserDatas(clickedUser);
      dispatch(getCardsByUserIdAction(clickedUser.id));
    } else {
      setUserDatas(null);
    }
  }, [clickedUser, currentUser, dispatch, locationPath, userIsSame]);

  useEffect(() => {
    dispatch(setCardsSize("small"));
  });

  return (
    <div className={`UserPage ${currentTheme}-theme`}>
      <div className="UserPage__cards">
        <h1 className="title title-1">
          Tutoriels de{" "}
          {userDatas && userDatas.username
            ? userDatas.username
            : "l'utilisateur "}
        </h1>
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
