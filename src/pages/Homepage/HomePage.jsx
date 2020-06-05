// Présent dans App.js dans une Route ("/")

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import HomeHeader from "../../components/LayoutComponents/HomeHeader/HomeHeader";
import CardGridList from "../../components/CardsComponents/CardGridList/CardGridList";
import CardFullPopup from "../../components/CardsComponents/CardFullPopup/CardFullPopup";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";

import { ReactComponent as QuestionIllustration } from "../../assets/images/illustrations/illustration-question.svg";
import { ReactComponent as GrilleIllustration } from "../../assets/images/illustrations/illustration-grille.svg";
import { ReactComponent as SuccessIllustration } from "../../assets/images/illustrations/illustration-success.svg";

import { selectCardsFetched } from "../../redux/cards/cards-selectors";

import "./HomePage.scss";

const HomePage = () => {
  const cards = useSelector(selectCardsFetched);

  // scroll reset
  if (window.scrollY) {
    window.scroll(0, 0);
  }

  return (
    <div className="HomePage">
      <HomeHeader />
      <CardGridList cardsSize="big" cardsNumber={6} />
      <CardFullPopup cardsArray={cards} />

      <div className="About">
        <div className="about-section section-1">
          <div className="about-section__text">
            <h2 className="title title-1">
              Le Web
              <br />
              pour les <span className="primary-medium-text">débutants</span>.
            </h2>
            <p>
              Fatigué de lire des dizaines de pages & forums pour trouver
              l'information ?
            </p>
            <p>
              Fatigué de regarder plusieurs vidéos sans y trouver ce que vous
              recherchier ?
            </p>
            <p>Et si on utilisait des images ?</p>
          </div>
          <div className="about-section__image">
            <QuestionIllustration />
          </div>
        </div>
        <span className="horizontal-separation-primary-dark"></span>
        <div className="about-section section-3">
          <div className="about-section__image">
            <GrilleIllustration />
          </div>
          <div className="about-section__text">
            <h2 className="title title-2">
              Des <span className="primary-medium-text">cartes</span> mémo.
            </h2>
            <p>
              Un système de cartes d'une ou plusieurs images pour une recherche
              rapide de l'information.
            </p>
            <p>
              Plusieurs affichages possibles pour s'adapter à toutes les envies
              et assurer le meilleur confort d'apprentissage.
            </p>
          </div>
        </div>
        <span className="horizontal-separation-primary-dark"></span>
        <div className="about-section section-4">
          <div className="about-section__text">
            <h2 className="title title-2">
              Atteindre ses{" "}
              <span className="primary-medium-text">objectifs</span>
            </h2>
            <p>
              Pour découvrir de nouvelles notions ou en réviser d'autres, soyez
              efficaces dans votre parcours.
            </p>
            <p>
              Un gain de temps signifie une progression plus rapide pour
              atteindre vos objectifs !
            </p>
          </div>
          <div className="about-section__image">
            <SuccessIllustration />
          </div>
        </div>
        <span className="horizontal-separation-primary-dark"></span>
        <div className="About__cta">
          <h1 className="title title-1">
            Alors qu'attendez-vous ?<br />
            On apprend ?{" "}
            <span role="img" aria-label="emoji">
              😄
            </span>{" "}
          </h1>
          <Link to="/cards">
            <CustomButton color="dark">Voir les cartes</CustomButton>
          </Link>
        </div>
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
    </div>
  );
};

export default HomePage;
