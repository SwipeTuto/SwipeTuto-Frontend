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
import { getCardsAction } from "../../redux/filter/filter-actions";
import HeaderImage from "../../assets/logos/header_image.png";

import { ReactComponent as QuestionIllustration } from "../../assets/images/illustrations/illustration-question.svg";
import { ReactComponent as GrilleIllustration } from "../../assets/images/illustrations/illustration-grille.svg";
import { ReactComponent as SuccessIllustration } from "../../assets/images/illustrations/illustration-success.svg";
import { ReactComponent as HeaderLogo } from "../../assets/images/illustrations/header_illustration.svg";

import { selectCardsFetchedCards } from "../../redux/filter/filter-selectors";
import { selectBetaAlertOpen } from "../../redux/layout/layout-selectors";
import { deleteCurrentSearch } from "../../redux/filter/filter-actions";

import "./HomePage.scss";
import { selectIsLoaded } from "../../redux/layout/layout-selectors";

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
      {/* {betaAlertOpen && (
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
      )} */}

      <div className="HomePage__home-header section">
        <div className="HomePage__home-header--wrapper">
          <img className="HomePage__header-image" src={HeaderImage} alt="" />
          <div className="HomePage__home-header--left">
            <h1 className="title title-1">Apprendre Rapidement</h1>
            <p>
              SwipeTuto c'est des centaines de tutoriels autour du web
              disponibles : programmation, design, SEO, frontend, backend... Le
              tout sous forme d'images pour un apprentissage rapide, clair et
              rapide.
              <br />
              Cherchez, filtrez, swipez !
            </p>
            <Link to="/search">
              <CustomButton>Voir les cartes</CustomButton>
            </Link>
          </div>
        </div>
      </div>
      <div className="HomePage__grid section">
        {!isLoaded ? (
          <Loading />
        ) : (
          cards &&
          cards
            .slice(0, 6)
            .map((card) => <CardPreviewSmall card={card} key={card.id} />)
        )}
      </div>
      <CardFullPopup />

      <div className="About section">
        <div className="about-section section-1">
          <div className="about-section__image">
            <QuestionIllustration />
          </div>

          <div className="about-section__text">
            <h2 className="title title-2">Tout public</h2>
            <p>
              Tutoriels pour tous les niveaux et tous les domaines en lien avec
              le domaine du Web.
            </p>
          </div>
        </div>

        <div className="about-section section-2">
          <div className="about-section__image">
            <GrilleIllustration />
          </div>
          <div className="about-section__text">
            <h2 className="title title-2">Cartes</h2>
            <p>
              Un système de cartes d'une ou plusieurs images pour une recherche
              rapide de l'information.
            </p>
          </div>
        </div>

        <div className="about-section section-3">
          <div className="about-section__image">
            <SuccessIllustration />
          </div>
          <div className="about-section__text">
            <h2 className="title title-2">Efficacité</h2>
            <p>
              Likez, enregistrez et partagez les cartes que vous avez aimé pour
              les retrouver à tout moment.
            </p>
          </div>
        </div>
      </div>

      <div className="About__cta section">
        <h1 className="title title-1">Alors qu'attendez-vous ?</h1>
        <Link to="/search">
          <CustomButton color="pink">Voir les cartes</CustomButton>
        </Link>
      </div>
      {/* 
      <div className="cta-section section">
        <p className="HomePage__cta">
          Ou essayez une recherche par tag en cliquant dessus :
        </p>
        <div className="HomePage__tags">
          <button>#HTML</button>
          <button>#JAVASCRIPT</button>
          <button>#CSS</button>
        </div>
      </div> */}

      <div className="HomePage__infos infos__section section">
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
