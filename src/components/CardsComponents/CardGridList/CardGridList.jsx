// Component qui renvoie la liste des card sous forme d'une grille
// Présent sur la Homepage "/" et la "/search" et par défaut sera en affichage "small" pour les cardPreview
// import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

import { selectCardsFetched } from "../../../redux/cards/cards-selectors";
import { selectCategoryFilter } from "../../../redux/filter/filter-selectors";
import { selectCardFilter } from "../../../redux/filter/filter-selectors";
import { selectSearchType } from "../../../redux/filter/filter-selectors";

import CardPreviewSmall from "../CardPreviewSmall/CardPreviewSmall";
import CardFullPopup from "../../CardsComponents/CardFullPopup/CardFullPopup";
import Loading from "../../Loading/Loading";
// EN TEST
import { langageAndCategorieFilter } from "../../../services/searchService";

import "./CardGridList.scss";

const CardGridList = ({ cardsSize, cardsNumber, location }) => {
  const categoryFilter = useSelector(selectCategoryFilter);
  const cards = useSelector(selectCardsFetched);
  const searchType = useSelector(selectSearchType);
  // ICI TU PEUX TROUVER LES CARTES APRES LE FILTRE
  const searchCard = useSelector(selectCardFilter);

  const [cardPreviewSize, setCardPreviewSize] = useState(cardsSize);
  const [cardsArray, setcardsArray] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // EN TEST
    langageAndCategorieFilter("php", "memo");

    if (cards) {
      setIsLoading(false);
    }
    setCardPreviewSize(cardsSize);
    // setcardsArray(cards);

    if (searchType === "search" || searchType === "langage") {
      setcardsArray(searchCard);
    } else {
      setcardsArray(cards);
    }

    // console.log(cardsArray);
  }, [cards, cardsSize, cardsNumber, cardsArray, searchType, searchCard]);

  return (
    <div className="CardGridList">
      <div
        className={`CardGridList__wrapper${
          cardPreviewSize === "small" ? "--small" : "--big"
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
