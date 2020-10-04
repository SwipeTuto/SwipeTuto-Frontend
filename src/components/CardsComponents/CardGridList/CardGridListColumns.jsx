import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import { usePrevious } from "../../../hooks/usePrevious";

// redux
import {
  selectCardsFetchedCards,
  selectSearchType,
  selectTotalNumberOfResults,
  selectPaginationNext,
} from "../../../redux/filter/filter-selectors";
import {
  selectCardsSize,
  selectIsLoaded,
} from "../../../redux/layout/layout-selectors";

// components
import CardPreviewSmall from "../CardPreviewSmall/CardPreviewSmall";
import CardFullPopup from "../CardFullPopup/CardFullPopup";
import Loading from "../../Loading/Loading";
import ScrollButton from "../../LayoutComponents/ScrollButton/ScrollButton";

// scss
import { ReactComponent as GoTopLogo } from "../../../assets/images/chevrons/arrow-up-circle.svg";
import "./CardGridListColumns.scss";
import { getOtherPageAction } from "../../../redux/filter/filter-actions";
import { useCallback } from "react";
import { useScroll } from "../../../hooks/useScroll";
import { useWinWidth } from "../../../hooks/useWinWidth";
import { useColumnsNumber } from "../../../hooks/useColumnsNumber";

const CardGridList = () => {
  const dispatch = useDispatch();
  const nextPageLink = useSelector(selectPaginationNext);

  const cards = useSelector(selectCardsFetchedCards);
  const totalNumberOfResults = useSelector(selectTotalNumberOfResults);
  const isLoaded = useSelector(selectIsLoaded);
  const [gridItems, setGridItems] = useState();
  const cardsSize = useSelector(selectCardsSize);
  const numberOfColumns = useColumnsNumber();

  console.log(numberOfColumns);

  // gestion de l'ordre des cartes par colonne
  const reorderCards = useCallback((cardsArray, numberOfColumns) => {
    const columns = numberOfColumns; // nb de colonnes
    const orderedArray = []; // array de cartes réordonnées
    let currentColumn = 0; // numéro de la colonne en cours
    while (currentColumn < columns) {
      // tant que le numéro de la colonne en cours est inf aux colonnes max
      for (let i = 0; i < cardsArray.length; i += columns) {
        let currentCard = cardsArray[i + currentColumn];
        if (currentCard !== undefined) orderedArray.push(currentCard);
      }
      currentColumn++;
    }
    return orderedArray;
  }, []);

  // update du array local de cartes si + de fetch
  useEffect(() => {
    const newArray = reorderCards(cards, numberOfColumns);
    console.log(newArray);
    setGridItems(newArray);
  }, [cards, numberOfColumns, reorderCards, cardsSize]);

  // gestion du infinite scroll : call automatique au back à un certain niveau de scroll
  const options = {
    rootMargin: "300px",
  };
  const observer = useRef();
  const bottomGrid = useCallback(
    (node) => {
      if (!isLoaded) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextPageLink) {
          console.log("call : " + nextPageLink);
          dispatch(getOtherPageAction(nextPageLink));
          // call refaire layout ?
        }
      }, options);
      if (node) observer.current.observe(node);
    },
    [isLoaded, dispatch, nextPageLink, options]
  );

  // reset du scroll avant de quitter la page
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  return (
    <div className="CardGridList">
      <div
        className={`CardGridList__wrapper CardGridList__wrapper--${cardsSize}`}
      >
        {isNaN(totalNumberOfResults) ? (
          <h2 className="title title-2 nocards-message">
            Désolé, une erreur est survenue. Si le problème persiste, merci de
            nous le signaler.
          </h2>
        ) : totalNumberOfResults === 0 ? (
          <h2 className="title title-2 nocards-message">
            Désolé, aucune carte trouvée. Essayez une autre recherche.
          </h2>
        ) : (
          <>
            {gridItems &&
              gridItems.map((card) => {
                return (
                  <div
                    className={`grid-item grid-item--${cardsSize}`}
                    key={card.id}
                    data-key={card.id}
                  >
                    <CardPreviewSmall size={cardsSize} card={card} />
                  </div>
                );
              })}
          </>
        )}
      </div>

      <CardFullPopup />
      {!isLoaded && <Loading />}
      {cards && nextPageLink && (
        <div className="bottom-grid" ref={bottomGrid}></div>
      )}

      {/* <GoTopLogo className="goTop__button" onClick={handleGoTopButton} /> */}
      <ScrollButton />
    </div>
  );
};

export default withRouter(CardGridList);
