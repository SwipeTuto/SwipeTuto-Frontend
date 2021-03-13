import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CardGridList from "../../components/CardsComponents/CardGridList/CardGridList";
import { getCardsByFollowingsAction, getCardsPrefUserAction, getRandomCardsAction } from "../../redux/filter/filter-actions";
import { selectTheme } from "../../redux/layout/layout-selectors";
import { selectCurrentUser, selectTopUsers } from "../../redux/user/user-selectors";

import "./UserHomePage.scss";
import { getTodayCompleteDate } from "../../helper/functions/formateDate";
import NotificationHomeBox from "../../components/LayoutComponents/NotificationHomeBox/NotificationHomeBox";
import { useWinWidth } from "../../hooks/useWinWidth";
import CardsSizeButton from "../../components/LayoutComponents/CardsSizeButton/CardsSizeButton";
import { selectRandomCards } from "../../redux/filter/filter-selectors";
import CardPreviewSmall from "../../components/CardsComponents/CardPreviewSmall/CardPreviewSmall";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";
import { getTopUsersAction } from "../../redux/user/user-actions";
import UserNameAndAvatar from "../../components/UserComponents/UserAvatar/UserNameAndAvatar";
import FollowButton from "../../components/LayoutComponents/FollowButton/FollowButton";

const UserHomePage = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  const currentUser = useSelector(selectCurrentUser);
  const winWidth = useWinWidth();
  const [view, setView] = useState("selection");
  const randomCardsArray = useSelector(selectRandomCards);
  const topUsersArray = useSelector(selectTopUsers);

  useEffect(() => {
    dispatch(getRandomCardsAction());
    dispatch(getTopUsersAction(3));
  }, [dispatch]);
  // useEffect(() => {
  //   console.log(topUsersArray);
  // }, [topUsersArray]);

  useEffect(() => {
    if (view === "abonnements") {
      dispatch(getCardsByFollowingsAction());
    } else {
      dispatch(getCardsPrefUserAction());
    }
  }, [dispatch, view]);

  const handleFetchRandom = () => {
    dispatch(getRandomCardsAction());
    window.scrollTo(0, 0);
  };

  return (
    <div className={`UserHomePage ${currentTheme}-theme-d`}>
      <div className="UserHomePage__center">
        <div className={`UserHomePage__nav ${currentTheme}-theme-d`}>
          <div className={`UserHomePage__nav--button ${view === "selection" && "active"}`} onClick={() => setView("selection")}>
            Sélection
          </div>
          <div className={`UserHomePage__nav--button ${view === "abonnements" && "active"}`} onClick={() => setView("abonnements")}>
            Abonnements
          </div>
          <CardsSizeButton />
        </div>
        <CardGridList allowInfiniteScroll={true} />
      </div>
      <div className="UserHomePage__right">
        <div className={`UserHomePage__right--block random-cards ${currentTheme}-theme-m`}>
          <CustomButton color="transparent" onClick={handleFetchRandom}>
            Cartes aléatoires
          </CustomButton>
          {randomCardsArray
            ? randomCardsArray.map((card) => <CardPreviewSmall key={`randomcard-${card?.id}`} card={card} size="small" />)
            : "Chargement ..."}
        </div>
        <div className={`UserHomePage__right--block top-users ${currentTheme}-theme-m`}>
          <h3 className="title title-3">Comptes à suivre</h3>
          {topUsersArray
            ? topUsersArray.map((user) => (
                <div className="UserHomePage__topUser">
                  <UserNameAndAvatar key={`topuser-${user?.id}`} user={user} link={true} />
                  <FollowButton userIDtoFollow={user?.id} />
                </div>
              ))
            : "Chargement ..."}
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
