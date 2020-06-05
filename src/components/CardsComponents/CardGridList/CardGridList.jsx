// Component qui renvoie la liste des card sous forme d'une grille
// Présent sur la Homepage "/" et la "/search" et par défaut sera en affichage "small" pour les cardPreview
// import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { selectCardsFetched } from "../../../redux/cards/cards-selectors";
import { selectCategoryFilter } from "../../../redux/cards/cards-selectors";

import CardPreviewSmall from "../CardPreviewSmall/CardPreviewSmall";
import CardFullPopup from "../../CardsComponents/CardFullPopup/CardFullPopup";

import "./CardGridList.scss";

const CardGridList = ({ cardsSize, cardsNumber }) => {
  const categoryFilter = useSelector(selectCategoryFilter);
  const cards = useSelector(selectCardsFetched);
  // ICI TU PEUX TROUVER LES CARTES APRES LE FILTRE
  const searchCard = useSelector(state => state.filter.cardFilter)
  const [cardPreviewSize, setCardPreviewSize] = useState(cardsSize);
  const [cardsArray, setcardsArray] = useState();

  useEffect(() => {

    setCardPreviewSize(cardsSize);
    if (cardsNumber && cardsArray) {
      const cardsArrayCopy = cardsArray.slice(0, cardsNumber);
      setcardsArray(cardsArrayCopy);
    }
    setcardsArray(cards);
  }, [cards, cardsSize, cardsNumber, cardsArray]);

  const setCategory = filter => {
    if (filter === 'all') {
      console.log('cardsArray', cardsArray)
      return cardsArray &&
        cardsArray.map((card) => (
          <CardPreviewSmall card={card} key={card.id} />))
    } else if (filter === 'search') {
      return searchCard &&
        searchCard.map((card) => (
          <CardPreviewSmall card={card} key={card.id} />))
    } else {
      return cardsArray
        .filter((card) => card.categorie[0].name === categoryFilter)
        .map((card) => <CardPreviewSmall card={card} key={card.id} />)
    }
  }


  return (
    <div className="CardGridList">
      <div
        className={`CardGridList__wrapper${
          cardPreviewSize === "small" ? "--small" : "--big"
          }`}
      >
        
        {setCategory(categoryFilter)}
        {/* {categoryFilter === "all"
          ? cardsArray &&
            cardsArray.map((card) => (
              <CardPreviewSmall card={card} key={card.id} />
            ))
          : cardsArray
              .filter((card) => card.categorie[0].name === categoryFilter)
              .map((card) => <CardPreviewSmall card={card} key={card.id} />)} */}
      </div>
      <CardFullPopup cardsArray={cardsArray} />
    </div>
  );
};

export default CardGridList;
