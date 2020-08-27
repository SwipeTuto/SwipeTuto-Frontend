import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  selectCurrentUser,
  selectClickedUser,
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
import {
  selectIsLoaded,
  selectTheme,
} from "../../../redux/layout/layout-selectors";
import { getCardsByUserIdAction } from "../../../redux/filter/filter-actions";

const UserPage = ({ userIsSame, location }) => {
  const locationPath = location && location.pathname;

  // Voir comment faire requete pour récupérer les cartes du user dans cards
  // user = current pour user actuel
  // user = other pour la visite d'un autre profil
  const isLoaded = useSelector(selectIsLoaded);
  const cards = useSelector(selectCardsFetchedCards);
  const currentUser = useSelector(selectCurrentUser);
  const clickedUser = useSelector(selectClickedUser);
  const currentTheme = useSelector(selectTheme);
  const [userDatas, setUserDatas] = useState();
  const [pageType, setPageType] = useState();
  const dispatch = useDispatch();
  // dispatch(closeFullscreen());
  // dispatch(closePopupCard(false));

  useEffect(() => {
    if (locationPath) {
      if (locationPath === "/account/saved") {
        setPageType("saved");
      } else if (locationPath === "/account/user") {
        setPageType("user");
      }
    }

    if (
      (userIsSame && currentUser && currentUser.id) ||
      (locationPath && locationPath.includes("/account/user") && currentUser)
    ) {
      setUserDatas(currentUser);
      dispatch(getCardsByUserIdAction(currentUser.id));
    } else if (
      locationPath &&
      locationPath.includes("/account/saved") &&
      currentUser
    ) {
      setUserDatas(clickedUser);
      // action pour fetch les cartes sauvegardées du user
      // dispatch(getCardsByUserIdAction(clickedUser.id));
    } else if (!userIsSame && clickedUser && clickedUser.id) {
      setUserDatas(clickedUser);
      dispatch(getCardsByUserIdAction(clickedUser.id));
    } else {
      setUserDatas(null);
    }
  }, [clickedUser, currentUser, dispatch, userIsSame, locationPath]);

  return (
    <div className={`UserPage ${currentTheme}-theme`}>
      <div className="UserPage__cards">
        {pageType && pageType === "user" ? (
          <h1 className="title title-1">
            Tutoriels de{" "}
            {userDatas && userDatas.username
              ? userDatas.username
              : "l'utilisateur "}
          </h1>
        ) : pageType && pageType === "saved" ? (
          <h1 className="title title-1">Tutoriels Sauvegardés</h1>
        ) : null}

        <div className="UserPage__cards--grid">
          {!isLoaded ? (
            <Loading />
          ) : userDatas && cards.length > 0 ? (
            cards.map((card) => <CardPreviewSmall card={card} key={card.id} />)
          ) : (
            <p className="UserPage__nocards">Aucune carte pour le moment.</p>
          )}
        </div>
        <CardFullPopup />
      </div>
    </div>
  );
};

export default withRouter(UserPage);
