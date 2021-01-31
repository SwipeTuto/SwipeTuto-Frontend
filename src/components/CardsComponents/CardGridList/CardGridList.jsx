import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { usePrevious } from "../../../hooks/usePrevious";

// redux
import {
  selectCardsFetchedCards,
  selectTotalNumberOfResults,
  selectPaginationNext,
  selectCurrentSearch,
} from "../../../redux/filter/filter-selectors";
import { selectCardsSize, selectFirstLoadDone, selectIsLoaded, selectShowPopupCard } from "../../../redux/layout/layout-selectors";

// components
// import CardPreviewSmall from "../CardPreviewSmall/CardPreviewSmall";
import PageLoading from "../../Loading/PageLoading";
import ScrollButton from "../../LayoutComponents/ScrollButton/ScrollButton";

// scss
import "./CardGridList.scss";
import { getOtherPageAction } from "../../../redux/filter/filter-actions";
import { useCallback } from "react";
import { useColumnsNumber } from "../../../hooks/useColumnsNumber";
import { getUrlId, urlParams } from "../../../helper/functions/getURLParams";

const CardPreviewSmall = lazy(() => import("../CardPreviewSmall/CardPreviewSmall"));

const CardGridList = ({ allowInfiniteScroll, location, overrideColumnNum }) => {
  const dispatch = useDispatch();
  const nextPageLink = useSelector(selectPaginationNext);
  const cards = useSelector(selectCardsFetchedCards);
  const prevCards = usePrevious(cards);
  const totalNumberOfResults = useSelector(selectTotalNumberOfResults);
  const isLoaded = useSelector(selectIsLoaded);
  const [gridItems, setGridItems] = useState([]);
  const cardsSize = useSelector(selectCardsSize);
  const numberOfColumns = useColumnsNumber();
  const prevNumberOfColumns = usePrevious(numberOfColumns);

  // gestion de l'ordre des cartes par colonne
  const reorderCards = useCallback(
    (cardsArray, columnsNumber, resize) => {
      // prevent de relancer la fonction si on fetch 2 fois les même cartes
      if (prevCards === cards && !resize) return;

      // si le nb de colonne change, on refait les colonnes
      let newArray = [];
      for (let i = 0; i < columnsNumber; i++) {
        newArray.push([]);
      }

      let startIndex = 0;

      cardsArray &&
        cardsArray.length !== 0 &&
        cardsArray.forEach((card) => {
          newArray && newArray[startIndex] && newArray[startIndex].push(card);
          // setLastColumnIndex(startIndex);
          if (startIndex >= numberOfColumns - 1) {
            startIndex = 0;
          } else {
            startIndex++;
          }
          return newArray;
        });

      setGridItems(newArray);
    },
    [prevCards, cards, numberOfColumns]
  );

  // update du array local de cartes si + de fetch
  useEffect(() => {
    if (overrideColumnNum && overrideColumnNum !== prevNumberOfColumns) {
      reorderCards(cards, overrideColumnNum, true);
    } else if (prevNumberOfColumns !== numberOfColumns) {
      reorderCards(cards, numberOfColumns, true);
    } else {
      reorderCards(cards, numberOfColumns, false);
    }
  }, [numberOfColumns, reorderCards, cards, prevNumberOfColumns, overrideColumnNum]);

  // gestion du infinite scroll : call automatique au back à un certain niveau de scroll
  const options = {
    rootMargin: "800px",
  };
  const observer = useRef();
  const bottomGrid = useCallback(
    (node) => {
      if (!isLoaded) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextPageLink) {
          dispatch(getOtherPageAction(nextPageLink));
        }
      }, options);
      if (node) observer.current.observe(node);
    },
    [isLoaded, dispatch, nextPageLink, options]
  );

  useEffect(() => {
    return () => window.scrollTo(0, 0);
  }, []);

  return (
    <div className="CardGridList">
      <div className={`CardGridList__wrapper CardGridList__wrapper--${cardsSize}`}>
        {isNaN(totalNumberOfResults) ? (
          <h2 className="title title-2 nocards-message">Désolé, une erreur est survenue. Si le problème persiste, merci de nous le signaler.</h2>
        ) : totalNumberOfResults === 0 && isLoaded ? (
          <h2 className="title title-2 nocards-message">Désolé, aucune carte trouvée. Essayez une autre recherche.</h2>
        ) : (
          <>
            {gridItems &&
              gridItems.map((column, index) => {
                return (
                  <div className={`grid-column grid-column--${cardsSize}`} key={index}>
                    {column &&
                      column.map((card) => {
                        return (
                          <div className={`grid-item grid-item--${cardsSize}`} key={card.id} data-key={card.id}>
                            <Suspense fallback={<div />}>{card && <CardPreviewSmall size={cardsSize} card={card} />}</Suspense>
                          </div>
                        );
                      })}
                  </div>
                );
              })}
          </>
        )}
      </div>

      {!isLoaded && <PageLoading />}
      {cards && nextPageLink && allowInfiniteScroll && <div className="bottom-grid" ref={bottomGrid}></div>}
      <ScrollButton />
    </div>
  );
};

export default withRouter(CardGridList);
