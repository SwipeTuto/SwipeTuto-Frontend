// Présent dans App.js dans une Route ("/")

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HomeHeader from "../../components/LayoutComponents/HomeHeader/HomeHeader";
import CardGridList from "../../components/CardsComponents/CardGridList/CardGridList";
import CardFullPopup from "../../components/CardsComponents/CardFullPopup/CardFullPopup";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";

import { ReactComponent as QuestionIllustration } from "../../assets/images/illustration-question.svg";
import { ReactComponent as RechercheIllustration } from "../../assets/images/illustration-recherche.svg";
import { ReactComponent as GrilleIllustration } from "../../assets/images/illustration-grille.svg";
import { ReactComponent as SuccessIllustration } from "../../assets/images/illustration-success.svg";

import { setClickedCard } from "../../redux/cards/cards-actions";
import { selectClickedCard } from "../../redux/cards/cards-selectors";
import { showPopupCard } from "../../redux/layout/layout-actions";
import { selectShowPopupCard } from "../../redux/layout/layout-selectors";

import "./HomePage.scss";

const HomePage = () => {
  const clickedCard = useSelector(selectClickedCard);
  const popupShown = useSelector(selectShowPopupCard);
  // const [showCardFullPopup, setShowCardFullPopup] = useState(false);
  // const [clickedCard, setClickedCard] = useState(null);

  const handleCardFullPopupClick = (etarget) => {
    // récupérer le id pour récupérer les infos du slide cliqué et les afficher dans CardFullPopup
    setClickedCard(etarget);
    // setShowCardFullPopup(true);
    document.getElementsByClassName("App")[0].style.position = "fixed";
    document.getElementsByClassName("App")[0].style.overflow = "hidden";
  };

  const handleCloseCardFullPopupClick = (e) => {
    document.getElementsByClassName("App")[0].style.position = "static";
    document.getElementsByClassName("App")[0].style.overflow = "visible";
    e.target.classList.remove("active");

    // setShowCardFullPopup(false);
  };

  return (
    <div className="HomePage">
      <HomeHeader />
      {/* <CardGridList cardsSize="small" cardsNumber={8} /> */}
      <CardGridList cardsSize="big" cardsNumber={6} />
      <CardFullPopup
        showPopupCard={showPopupCard}
        clickedCard={clickedCard}
        handleCloseCardFullPopupClick={handleCloseCardFullPopupClick}
      />

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
          <Link to="/search">
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

// const mapDispatchToProps = (dispatch) => ({
//   showPopupCard: () => dispatch(showPopupCard()),
// });

// const mapStateToProps = (state) => ({
//   clickedCard: selectClickedCard(state),
//   popupShown: selectShowPopupCard(state),
// });

export default HomePage;
