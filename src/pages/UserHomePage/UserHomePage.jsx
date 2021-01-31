import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CardGridList from "../../components/CardsComponents/CardGridList/CardGridList";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";
import UserNameAndAvatar from "../../components/UserComponents/UserAvatar/UserNameAndAvatar";
import { getCardPrefUserAction } from "../../redux/filter/filter-actions";
import { selectTheme } from "../../redux/layout/layout-selectors";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import { ReactComponent as AddLogo } from "../../assets/images/add-circle.svg";
import "./UserHomePage.scss";
import CardPreviewSmall from "../../components/CardsComponents/CardPreviewSmall/CardPreviewSmall";
import { getTodayCompleteDate } from "../../helper/functions/formateDate";

const UserHomePage = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(getCardPrefUserAction());
  }, [dispatch]);

  return (
    <div className={`UserHomePage ${currentTheme}-theme-d`}>
      <div className={`UserHomePage__center`}>
        <h2 className="title title-2">Rien que pour vous :</h2>
        <CardGridList overrideColumnNum={2} />
      </div>
      <div className={`UserHomePage__side ${currentTheme}-theme-m`}>
        {/* <h2 className="title title-2">Tendances</h2> */}
        <p>Bonjour {currentUser.first_name || ""} !</p>
        <p>Voici les tendances du {getTodayCompleteDate()}</p>
        <div className="UserHomePage__side--stats">Statistiques en tous genres</div>
        <p>
          Envie de changer les cartes de votre page d'accueil ? <Link to="/account/preferences">Changer vos préférences depuis votre compte</Link>
        </p>
      </div>
    </div>
  );
};

export default UserHomePage;
