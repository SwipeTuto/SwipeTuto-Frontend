import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/user-selectors";
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
import { getCardsByUserNameAction } from "../../../redux/filter/filter-actions";

const UserPage = () => {
  // Voir comment faire requete pour récupérer les cartes du user dans cards
  const isLoaded = useSelector(selectIsLoaded);
  const cards = useSelector(selectCardsFetchedCards);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  // dispatch(closeFullscreen());
  // dispatch(closePopupCard(false));

  useEffect(() => {
    dispatch(getCardsByUserNameAction(currentUser.username));
  }, []);

  return (
    <div className="UserPage">
      <div className="UserPage__cards">
        <h1 className="title title-1">Vos cartes :</h1>
        <div className="UserPage__cards--grid">
          {!isLoaded ? (
            <Loading />
          ) : (
            cards.map((card) => <CardPreviewSmall card={card} key={card.id} />)
          )}
        </div>
        <CardFullPopup cardsArray={cards} />
      </div>
    </div>
  );
};

export default UserPage;
