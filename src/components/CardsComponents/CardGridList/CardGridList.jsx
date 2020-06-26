// Component qui renvoie la liste des card sous forme d'une grille
// Présent sur la Homepage "/" et la "/search" et par défaut sera en affichage "small" pour les cardPreview
// import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  selectCardsFetchedCards,
  selectSearchType,
  selectTotalNumberOfResults,
} from "../../../redux/filter/filter-selectors";

import { selectIsLoaded } from "../../../redux/cards/cards-selectors";

import CardPreviewSmall from "../CardPreviewSmall/CardPreviewSmall";
import CardFullPopup from "../../CardsComponents/CardFullPopup/CardFullPopup";
import Loading from "../../Loading/Loading";

import "./CardGridList.scss";

const CardGridList = ({ cardsSize }) => {
  const cards = useSelector(selectCardsFetchedCards);
  const totalNumberOfResults = useSelector(selectTotalNumberOfResults);
  const searchType = useSelector(selectSearchType);
  const isLoaded = useSelector(selectIsLoaded);

  const [cardPreviewSize, setCardPreviewSize] = useState(cardsSize);

  useEffect(() => {
    if (isLoaded) {
      setCardPreviewSize(cardsSize);
    }
  }, [cardsSize, searchType, isLoaded]);

  return (
    <div className="CardGridList">
      <div
        className={`CardGridList__wrapper${
          cardPreviewSize === "small" ? "--small" : "--big y"
        }`}
      >
        {!isLoaded ? (
          <Loading />
        ) : isNaN(totalNumberOfResults) ? (
          <h2 className="title title-2 nocards-message">
            Désolé, une erreur est survenue. Si le problème persiste, merci de
            nous le signaler.
          </h2>
        ) : totalNumberOfResults === 0 ? (
          <h2 className="title title-2 nocards-message">
            Désolé, aucune carte trouvée. Essayez une autre recherche.
          </h2>
        ) : (
          cards &&
          cards.map((card) => <CardPreviewSmall card={card} key={card.id} />)
        )}
      </div>
      <CardFullPopup cardsArray={cards} />
    </div>
  );
};

export default withRouter(CardGridList);
