import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CardGridList from "../../components/CardsComponents/CardGridList/CardGridList";
import { getCardPrefUserAction } from "../../redux/filter/filter-actions";
import { selectTheme } from "../../redux/layout/layout-selectors";
import { selectCurrentUser } from "../../redux/user/user-selectors";

import "./UserHomePage.scss";
import { getTodayCompleteDate } from "../../helper/functions/formateDate";
import NotificationHomeBox from "../../components/LayoutComponents/NotificationHomeBox/NotificationHomeBox";
import { useWinWidth } from "../../hooks/useWinWidth";

const UserHomePage = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  const currentUser = useSelector(selectCurrentUser);
  const winWidth = useWinWidth();

  useEffect(() => {
    dispatch(getCardPrefUserAction());
  }, [dispatch]);

  const fakeNotif = [
    {
      type: "new",
      message: "Mario a publié un tutoriel Bricolage",
    },
    {
      type: "suggestion",
      message: "Et si on commençait à apprendre la guitare ?",
    },
    {
      type: "new",
      message: "Yoshi a publié un nouveau tutoriel Nutrition",
    },
    {
      type: "new",
      message: "Bowser a publié un nouveau tutoriel Design",
    },
    {
      type: "alert",
      message: "4 nouveaux tutoriels Yoga disponibles",
    },
    {
      type: "suggestion",
      message: "Pourquoi pas découvrir la programmation ?",
    },
    {
      type: "new",
      message: "Toad a publié un tutoriel Coiffure",
    },
    {
      type: "alert",
      message: "7 nouveaux tutoriels Méditation disponibles",
    },
    {
      type: "suggestion",
      message: "Pourquoi pas découvrir la programmation ?",
    },
    {
      type: "new",
      message: "Toad a publié un tutoriel Coiffure",
    },
    {
      type: "alert",
      message: "7 nouveaux tutoriels Méditation disponibles",
    },
    {
      type: "suggestion",
      message: "Pourquoi pas découvrir la programmation ?",
    },
    {
      type: "new",
      message: "Toad a publié un tutoriel Coiffure",
    },
    {
      type: "alert",
      message: "7 nouveaux tutoriels Méditation disponibles",
    },
  ];

  return (
    <div className={`UserHomePage ${currentTheme}-theme-d`}>
      <div className={`UserHomePage__center`}>
        <h2 className="title title-2">Rien que pour vous :</h2>
        <CardGridList overrideColumnNum={winWidth <= 680 ? 1 : winWidth <= 960 ? 2 : 3} allowInfiniteScroll={true} />
      </div>
      <div className={`UserHomePage__side ${currentTheme}-theme-m`}>
        {/* <h2 className="title title-2">Tendances</h2> */}
        <p>Bonjour {currentUser.first_name || ""} !</p>
        <p>Voici les tendances du {getTodayCompleteDate()} :</p>
        <div className="UserHomePage__side--news">
          {fakeNotif.map((notif, index) => (
            <NotificationHomeBox notification={notif} key={index} />
          ))}
        </div>
        <p>
          Envie de changer les cartes de votre page d'accueil ? <Link to="/account/preferences">Changer vos préférences depuis votre compte</Link>
        </p>
      </div>
    </div>
  );
};

export default UserHomePage;
