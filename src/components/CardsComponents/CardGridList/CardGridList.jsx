// Component qui renvoie la liste des card sous forme d'une grille
// Présent sur la Homepage "/" et la "/search" et par défaut sera en affichage "small" pour les cardPreview
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClickedCard } from "../../../redux/cards/cards-actions";
import { selectClickedCard } from "../../../redux/cards/cards-selectors";
import { selectCategoryFilter } from "../../../redux/cards/cards-selectors";

import CardPreviewSmall from "../CardPreviewSmall/CardPreviewSmall";
import CardPreviewBig from "../CardPreviewBig/CardPreviewBig";
import CardFullPopup from "../../CardsComponents/CardFullPopup/CardFullPopup";

import "./CardGridList.scss";

import SLIDES_DATA_TEST from "../../../SLIDES_DATA_TEST.js"; //collection d'objets avec toutes les infos propres aux slides

const CardGridList = ({ cardsSize, cardsNumber }) => {
  const categoryFilter = useSelector(selectCategoryFilter);
  const [cardPreviewSize, setCardPreviewSize] = useState(cardsSize);
  const [cardsArray, setcardsArray] = useState(SLIDES_DATA_TEST.results);

  useEffect(() => setCardPreviewSize(cardsSize), [cardsSize]);
  useEffect(() => {
    if (cardsNumber && cardsArray) {
      const cardsArrayCopy = cardsArray.slice(0, cardsNumber);
      setcardsArray(cardsArrayCopy);
    }
  }, []);

  return (
    <div className="CardGridList">
      <div
        className={`CardGridList__wrapper${
          cardPreviewSize === "small" ? "--small" : "--big"
        }`}
      >
        {categoryFilter === "all"
          ? cardsArray.map((card) => (
              <CardPreviewSmall card={card} key={card.id} />
            ))
          : cardsArray
              .filter((card) => card.categorie[0].name === categoryFilter)
              .map((card) => <CardPreviewSmall card={card} key={card.id} />)}
      </div>
      <CardFullPopup cardsArray={cardsArray} />
    </div>
  );
};

export default CardGridList;
