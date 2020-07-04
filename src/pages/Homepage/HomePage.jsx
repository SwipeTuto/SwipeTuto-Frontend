// Présent dans App.js dans une Route ("/")

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import CardPreviewSmall from "../../components/CardsComponents/CardPreviewSmall/CardPreviewSmall";
import CardFullPopup from "../../components/CardsComponents/CardFullPopup/CardFullPopup";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";
import Loading from "../../components/Loading/Loading";
import {
  closeFullscreen,
  closePopupCard,
  closeBetaAlert,
} from "../../redux/layout/layout-actions";
import { getCardsAction } from "../../redux/cards/cards-actions";

import { ReactComponent as QuestionIllustration } from "../../assets/images/illustrations/illustration-question.svg";
import { ReactComponent as GrilleIllustration } from "../../assets/images/illustrations/illustration-grille.svg";
import { ReactComponent as SuccessIllustration } from "../../assets/images/illustrations/illustration-success.svg";
import { ReactComponent as HeaderLogo } from "../../assets/images/illustrations/header_illustration.svg";

import { selectCardsFetchedCards } from "../../redux/filter/filter-selectors";
import { selectBetaAlertOpen } from "../../redux/layout/layout-selectors";
import { deleteCurrentSearch } from "../../redux/filter/filter-actions";

import "./HomePage.scss";
import { selectIsLoaded } from "../../redux/cards/cards-selectors";

const HomePage = () => {
  const isLoaded = useSelector(selectIsLoaded);
  const cards = useSelector(selectCardsFetchedCards);
  const betaAlertOpen = useSelector(selectBetaAlertOpen);
  const [cardsArrayCut, setCardsArrayCut] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCardsAction());

    if (cards) {
      setCardsArrayCut(cards.slice(0, 6));
    }
  }, []);

  // scroll reset
  if (window.scrollY) {
    window.scroll(0, 0);
  }

  const handleCloseInfoClick = () => {
    dispatch(closeBetaAlert());
  };

  return (
    <div className="HomePage">
      {betaAlertOpen && (
        <div className="HomePage__infos beta__alert">
          <h2 className="title title-2">Informations</h2>
          <p>
            Le site est encore en construction. Certaines fonctionnalités ne
            sont pas encore mises en place et d'autres devraient être améliorées
            sous peu. Vous pouvez suivre les futures fonctionnalités sur la page{" "}
            <Link to="/infos" className="HomePage__infos--link">
              Informations
            </Link>
            .
          </p>
          <button
            className="beta__alert--button"
            onClick={() => handleCloseInfoClick()}
          >
            Fermer
          </button>
        </div>
      )}

      <div className="HomePage__home-header ">
        <div className="HomePage__home-header--wrapper">
          <div className="HomePage__home-header--left">
            <h1 className="title title-1">
              Apprendre.
              <br />
              Rapidement.
              <br />
              <span>Efficacement.</span>
            </h1>
          </div>
          <div className="HomePage__home-header--right">
            <HeaderLogo className="HomePage__home-header--right-logo" />
          </div>
        </div>
      </div>
      <div className="HomePage__grid">
        {!isLoaded ? (
          <Loading />
        ) : (
          cards &&
          cards
            .slice(0, 6)
            .map((card) => <CardPreviewSmall card={card} key={card.id} />)
        )}
      </div>
      <CardFullPopup cardsArray={cardsArrayCut} />

      <div className="About">
        <div className="about-section section-1">
          <div className="about-section__image">
            <QuestionIllustration />
          </div>

          <div className="about-section__text">
            <h2 className="title title-2">
              Le Web
              <br />
              pour les <span className="pink-text">débutants</span>
            </h2>
            <p>
              Lire des dizaines de pages ou regarder plusieurs vidéos ? Et si on
              gagnait du temps en utilisant des images ?
            </p>
          </div>
        </div>

        <div className="about-section section-2">
          <div className="about-section__image">
            <GrilleIllustration />
          </div>
          <div className="about-section__text">
            <h2 className="title title-2">
              Des cartes mémo claires et{" "}
              <span className="pink-text">simples</span>
            </h2>
            <p>
              Un système de cartes d'une ou plusieurs images pour une recherche
              rapide de l'information, avec plusieurs tailles possible pour
              votre confort.
            </p>
          </div>
        </div>

        <div className="about-section section-3">
          <div className="about-section__image">
            <SuccessIllustration />
          </div>
          <div className="about-section__text">
            <h2 className="title title-2">
              Atteindre ses objectifs{" "}
              <span className="pink-text">rapidement</span>
            </h2>
            <p>
              Pour découvrir de nouvelles notions ou en réviser d'autres, soyez
              efficaces dans votre parcours.
            </p>
          </div>
        </div>
      </div>

      <div className="About__cta">
        <h1 className="title title-1">
          Alors qu'attendez-vous ?<br />
          On apprend ?{" "}
          <span role="img" aria-label="emoji">
            😄
          </span>{" "}
        </h1>
        <Link to="/cards">
          <CustomButton color="pink">Voir les cartes</CustomButton>
        </Link>
      </div>

      <div className="HomePage__section cta-section">
        <p className="HomePage__cta">
          Ou essayez une recherche par tag en cliquant dessus :
        </p>
        <div className="HomePage__tags">
          <button>#HTML</button>
          <button>#JAVASCRIPT</button>
          <button>#CSS</button>
        </div>
      </div>

      <div className="HomePage__infos infos__section">
        <h2 className="title title-2">Informations</h2>
        <p>
          Le site est encore en construction. Certaines fonctionnalités ne sont
          pas encore mises en place et d'autres devraient être améliorées sous
          peu. Vous pouvez suivre les futures fonctionnalités sur la page{" "}
          <Link to="/infos" className="HomePage__infos--link">
            Informations
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default HomePage;
