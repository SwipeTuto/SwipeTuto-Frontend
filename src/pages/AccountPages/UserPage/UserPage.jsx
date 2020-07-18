import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentUser,
  selectOtherUser,
} from "../../../redux/user/user-selectors";
import { selectCardsFetchedCards } from "../../../redux/filter/filter-selectors";
import { ReactComponent as LogoFacebook } from "../../../assets/images/logo-facebook.svg";
import { ReactComponent as LogoTwitter } from "../../../assets/images/logo-twitter.svg";
import { ReactComponent as LogoYoutube } from "../../../assets/images/logo-youtube.svg";
import { ReactComponent as LogoGithub } from "../../../assets/images/logo-github.svg";
import {
  closeFullscreen,
  closePopupCard,
} from "../../../redux/layout/layout-actions";
import Loading from "../../../components/Loading/Loading";
import CardPreviewSmall from "../../../components/CardsComponents/CardPreviewSmall/CardPreviewSmall";
import CardFullPopup from "../../../components/CardsComponents/CardFullPopup/CardFullPopup";

import "./UserPage.scss";
import { selectIsLoaded } from "../../../redux/cards/cards-selectors";
import { getCardsByUserEmailAction } from "../../../redux/filter/filter-actions";

const UserPage = ({ user }) => {
  // Voir comment faire requete pour récupérer les cartes du user dans cards
  // user = current pour user actuel
  // user = other pour la visite d'un autre profil
  const isLoaded = useSelector(selectIsLoaded);
  const cards = useSelector(selectCardsFetchedCards);
  const currentUser = useSelector(selectCurrentUser);
  const otherUser = useSelector(selectOtherUser);
  const [userDatas, setUserDatas] = useState();
  const dispatch = useDispatch();
  // dispatch(closeFullscreen());
  // dispatch(closePopupCard(false));

  useEffect(() => {
    if (user === "current" && currentUser && currentUser.email) {
      setUserDatas(currentUser);
      dispatch(getCardsByUserEmailAction(currentUser.email));
    } else if (user === "other" && otherUser && otherUser.email) {
      setUserDatas(otherUser);
      dispatch(getCardsByUserEmailAction(otherUser.email));
    } else {
      setUserDatas(null);
    }
  }, []);

  return (
    <div className="UserPage">
      <div className="UserPage__cards">
        <h1 className="title title-1">
          Tutoriels de{" "}
          {userDatas && userDatas.username
            ? userDatas.username
            : "l'utilisateur "}
          :
        </h1>
        <div className="UserPage__cards--grid">
          {!isLoaded ? (
            <Loading />
          ) : userDatas && cards.length > 0 ? (
            cards.map((card) => <CardPreviewSmall card={card} key={card.id} />)
          ) : (
            <p className="UserPage__nocards">Aucune carte pour le moment.</p>
          )}
        </div>
        <CardFullPopup cardsArray={cards} />
      </div>
    </div>
  );
};

export default UserPage;
