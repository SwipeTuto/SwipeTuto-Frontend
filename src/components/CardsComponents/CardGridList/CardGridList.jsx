// Component qui renvoie la liste des card sous forme d'une grille
// Présent sur la Homepage "/" et la "/search" et par défaut sera en affichage "small" pour les cardPreview
// import PropTypes from "prop-types";
import React, { useState, useEffect, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

import { selectCardsFetched } from "../../../redux/cards/cards-selectors";

import { selectCardFilter, selectSearchType } from "../../../redux/filter/filter-selectors";


import CardPreviewSmall from "../CardPreviewSmall/CardPreviewSmall";
import CardFullPopup from "../../CardsComponents/CardFullPopup/CardFullPopup";
import Loading from "../../Loading/Loading";


import "./CardGridList.scss";

const CardGridList = ({ cardsSize, cardsNumber }) => {
  const dispatch = useDispatch()

  const cards = useSelector(selectCardsFetched);
  const searchType = useSelector(selectSearchType);
  const searchCard = useSelector(selectCardFilter);


  const [cardPreviewSize, setCardPreviewSize] = useState(cardsSize);
  const [cardsArray, setcardsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (cards || cardsArray) {
      setIsLoading(false);
    }
    setCardPreviewSize(cardsSize);
    if (searchType === "search" || searchType === "langage") {
      setcardsArray(searchCard);
    } else {
      setcardsArray(cards);
    }
  }, [cards, cardsSize, cardsNumber, cardsArray, searchType, searchCard]);


 
  return (
    <div className="CardGridList">

      <div
        className={`CardGridList__wrapper${
          cardPreviewSize === "small" ? "--small" : "--big y"
        }`}
      >
        {isLoading ? (
          <Loading />
        ) : (
          cardsArray &&
          cardsArray.map((card) => (
            <CardPreviewSmall card={card} key={card.id} />
          ))
        )}
      </div>
      <CardFullPopup cardsArray={cardsArray} />
    </div>
  );
};

export default withRouter(CardGridList);
