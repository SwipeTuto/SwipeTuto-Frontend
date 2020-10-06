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
  selectLastCardsFetched,
  selectCurrentSearch,
} from "../../../redux/filter/filter-selectors";
import {
  selectCardsSize,
  selectIsLoaded,
} from "../../../redux/layout/layout-selectors";

// components
import CardPreviewSmall from "../CardPreviewSmall/CardPreviewSmall";
import CardFullPopup from "../CardFullPopup/CardFullPopup";
import Loading from "../../Loading/Loading";
import PageLoading from "../../Loading/PageLoading";
import ScrollButton from "../../LayoutComponents/ScrollButton/ScrollButton";

// scss
import { ReactComponent as GoTopLogo } from "../../../assets/images/chevrons/arrow-up-circle.svg";
import "./CardGridListColumnsNew.scss";
import {
  getCardAfterfilterAction,
  getOtherPageAction,
} from "../../../redux/filter/filter-actions";
import { useCallback } from "react";
import { useScroll } from "../../../hooks/useScroll";
import { useWinWidth } from "../../../hooks/useWinWidth";
import { useColumnsNumber } from "../../../hooks/useColumnsNumber";
import { formattedDate } from "../../../helper";

const CardGridList = () => {
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
  const lastCardsFetched = useSelector(selectLastCardsFetched);
  const currentSearch = useSelector(selectCurrentSearch);
  const prevCurrentSearch = usePrevious(currentSearch);

  useEffect(() => {
    if (prevCurrentSearch && prevCurrentSearch !== currentSearch) {
      dispatch(getCardAfterfilterAction(currentSearch));
      console.log("call");
    }
  }, [currentSearch, prevCurrentSearch, dispatch]);

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
    if (prevNumberOfColumns !== numberOfColumns) {
      reorderCards(cards, numberOfColumns, true);
    } else {
      reorderCards(cards, numberOfColumns, false);
    }
  }, [numberOfColumns, reorderCards, cards, prevNumberOfColumns]);

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

  // const gridItemsArray = document.querySelectorAll(".grid-item");
  // if (gridItemsArray) console.log(gridItemsArray.length);

  return (
    <div className="CardGridList">
      <div
        className={`CardGridList__wrapper CardGridList__wrapper--${cardsSize}`}
      >
        {/* <div className="CardGridList__wrapper"> */}
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
              gridItems.map((column, index) => {
                return (
                  <div
                    className={`grid-column grid-column--${cardsSize}`}
                    key={index}
                  >
                    {column &&
                      column.map((card) => {
                        return (
                          <div
                            className={`grid-item grid-item--${cardsSize}`}
                            key={card.id}
                            data-key={card.id}
                          >
                            {card.id}
                            {card && (
                              <CardPreviewSmall size={cardsSize} card={card} />
                            )}
                          </div>
                        );
                      })}
                  </div>
                );
              })}
          </>
        )}
      </div>

      <CardFullPopup />
      {!isLoaded && <PageLoading />}
      {cards && nextPageLink && (
        <div className="bottom-grid" ref={bottomGrid}></div>
      )}

      {/* <GoTopLogo className="goTop__button" onClick={handleGoTopButton} /> */}
      <ScrollButton />
    </div>
  );
};

export default withRouter(CardGridList);
