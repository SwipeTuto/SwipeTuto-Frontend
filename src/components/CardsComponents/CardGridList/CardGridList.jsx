// Component qui renvoie la liste des card sous forme d'une grille
// Présent sur la Homepage "/" et la "/search" et par défaut sera en affichage "small" pour les cardPreview
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

import CardPreviewSmall from "../CardPreviewSmall/CardPreviewSmall";
import CardPreviewBig from "../CardPreviewBig/CardPreviewBig";
import CardFullPopup from "../../CardsComponents/CardFullPopup/CardFullPopup";

import "./CardGridList.scss";

import SLIDES_DATA_TEST from "../../../SLIDES_DATA_TEST.js"; //collection d'objets avec toutes les infos propres aux slides

const CardGridList = ({ cardsSize, cardsNumber }) => {
  const [cardPreviewSize, setCardPreviewSize] = useState(cardsSize);
  const [cardsArray, setcardsArray] = useState(SLIDES_DATA_TEST);
  const [showCardFullPopup, setShowCardFullPopup] = useState(false);
  const [clickedcard, setClickedcard] = useState(null);

  useEffect(() => setCardPreviewSize(cardsSize), [cardsSize]);
  console.log(cardsNumber);
  useEffect(() => {
    if (cardsNumber && cardsArray) {
      console.log(cardsArray);
      const cardsArrayCopy = cardsArray.slice(0, cardsNumber);
      console.log(cardsArrayCopy);
      setcardsArray(cardsArrayCopy);
    }
  }, []);

  const handleCardFullPopupClick = (etarget, card) => {
    // récupérer le id pour récupérer les infos du slide cliqué et les afficher dans CardFullPopup; depuis CardPreviewBig et CardPreviewSmall
    setClickedcard(card);
    setShowCardFullPopup(true);
    document.getElementsByClassName("App")[0].style.position = "fixed";
    document.getElementsByClassName("App")[0].style.overflow = "hidden";
  };

  const handleCloseCardFullPopupClick = (e) => {
    document.getElementsByClassName("App")[0].style.position = "static";
    document.getElementsByClassName("App")[0].style.overflow = "visible";
    e.target.classList.remove("active");
    setClickedcard(null);

    setShowCardFullPopup(false);
  };

  const goPreviousCard = (currentCard) => {
    const indexOfCurrentCard = cardsArray.indexOf(currentCard);
    if (indexOfCurrentCard <= 0) return;
    const previousCard = cardsArray[indexOfCurrentCard - 1];
    setClickedcard(previousCard);
  };

  const goNextCard = (currentCard) => {
    const indexOfCurrentCard = cardsArray.indexOf(currentCard);
    if (indexOfCurrentCard >= cardsArray.length - 1) return;
    const nextCard = cardsArray[indexOfCurrentCard + 1];
    setClickedcard(nextCard);
  };

  return (
    <>
      {/* {cardPreviewSize === "small" ? (
        <div className="CardGridList">
          <div className="CardGridList__wrapper--small">
            {cardsArray.map((card) => (
              <CardPreviewSmall
                handleCardFullPopupClick={handleCardFullPopupClick}
                card={card}
                key={card.id}
              />
            ))}
          </div>
          <CardFullPopup
            showCardFullPopup={showCardFullPopup}
            clickedcard={clickedcard}
            handleCloseCardFullPopupClick={handleCloseCardFullPopupClick}
            goPreviousCard={goPreviousCard}
            goNextCard={goNextCard}
          />
        </div>
      ) : (
        <div className="CardGridList">
          <div className="CardGridList__wrapper--big">
            {cardsArray.map((card) => (
              <CardPreviewBig
                handleCardFullPopupClick={handleCardFullPopupClick}
                card={card}
                key={card.id}
              />
            ))}
          </div>
          <CardFullPopup
            showCardFullPopup={showCardFullPopup}
            clickedcard={clickedcard}
            handleCloseCardFullPopupClick={handleCloseCardFullPopupClick}
            goPreviousCard={goPreviousCard}
            goNextCard={goNextCard}
          />
        </div>
      )} */}
      <div className="CardGridList">
        <div
          className={`CardGridList__wrapper${
            cardPreviewSize === "small" ? "--small" : "--big"
          }`}
        >
          {cardsArray.map((card) => (
            <CardPreviewSmall
              handleCardFullPopupClick={handleCardFullPopupClick}
              card={card}
              key={card.id}
            />
          ))}
        </div>
        <CardFullPopup
          showCardFullPopup={showCardFullPopup}
          clickedcard={clickedcard}
          handleCloseCardFullPopupClick={handleCloseCardFullPopupClick}
          goPreviousCard={goPreviousCard}
          goNextCard={goNextCard}
        />
      </div>
    </>
  );
};

export default CardGridList;
