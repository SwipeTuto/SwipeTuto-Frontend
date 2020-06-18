import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import { selectCardsFetched } from "../../../redux/cards/cards-selectors";
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

const UserPage = () => {
  // Voir comment faire requete pour récupérer les cartes du user dans cards
  const [isLoading, setIsLoading] = useState(true);
  const cards = useSelector(selectCardsFetched);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  dispatch(closeFullscreen());
  dispatch(closePopupCard(false));

  useEffect(() => {
    if (cards) {
      setIsLoading(false);
    }
  }, [cards]);

  return (
    <div className="UserPage">
      {/* <div className="UserPage__header">
        <div className="UserPage__avatar">
          <img
            className="UserPage__userAvatar"
            src={currentUser.avatar}
            alt="user avatar"
          />
        </div>
        <div className="UserPage__text">
          <p className="UserPage__userWelcome">{currentUser.username}</p>
          <p className="UserPage__userWelcome">{currentUser.email}</p>
        </div>
      </div>
      <div className="UserPage__bio">
        <p className="UserPage__bio--text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis iste
          incidunt, perferendis laboriosam vel nihil aliquid, eos quia magni
          harum quas cumque libero? Laboriosam vero numquam non, quia quod
          deserunt!
        </p>
      </div>
      <div className="UserPage__social">
        <a href="#" target="_blank" className="UserPage__social--link">
          <LogoYoutube className="UserPage__social--logo" />
        </a>
        <a href="#" target="_blank" className="UserPage__social--link">
          <LogoGithub className="UserPage__social--logo" />
        </a>
        <a href="#" target="_blank" className="UserPage__social--link">
          <LogoFacebook className="UserPage__social--logo" />
        </a>
        <a href="#" target="_blank" className="UserPage__social--link">
          <LogoTwitter className="UserPage__social--logo" />
        </a>
      </div> */}
      <div className="UserPage__cards">
        <h2 className="title title-2">
          Cartes créées par {currentUser.username}
        </h2>
        <div className="UserPage__cards--grid">
          {isLoading ? (
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
