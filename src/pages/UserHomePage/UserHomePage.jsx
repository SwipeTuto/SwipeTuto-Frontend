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
import RandomCards from "../../components/LayoutComponents/RandomCards/RandomCards";
import TopUsers from "../../components/LayoutComponents/TopUsers/TopUsers";

const UserHomePage = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  const [view, setView] = useState("selection");

  useEffect(() => {
    dispatch(getRandomCardsAction());
    dispatch(getTopUsersAction(3));
  }, [dispatch]);

  useEffect(() => {
    if (view === "abonnements") {
      dispatch(getCardsByFollowingsAction());
    } else {
      dispatch(getCardsPrefUserAction());
    }
  }, [dispatch, view]);

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
        <RandomCards addClass="UserHomePage__right--block" />
        <TopUsers addClass="UserHomePage__right--block" />
      </div>
    </div>
  );
};

export default UserHomePage;
