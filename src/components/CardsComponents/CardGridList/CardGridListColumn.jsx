import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import Masonry from "masonry-layout";

// redux
import {
  selectCardsFetchedCards,
  selectSearchType,
  selectTotalNumberOfResults,
  selectNewPageCards,
  selectPaginationNext,
} from "../../../redux/filter/filter-selectors";
import {
  selectIsLoaded,
  selectOtherPageLoading,
} from "../../../redux/layout/layout-selectors";

// components
import CardPreviewSmall from "../CardPreviewSmall/CardPreviewSmall";
import CardFullPopup from "../CardFullPopup/CardFullPopup";
import Loading from "../../Loading/Loading";

// scss
import "./CardGridListColumn.scss";
import { getOtherPageAction } from "../../../redux/filter/filter-actions";
import CustomButton from "../../LayoutComponents/CustomButton/CustomButton";
import { useCallback } from "react";
import { createElement } from "react";

const CardGridList = ({ cardsSize }) => {
  const dispatch = useDispatch();
  const nextPageLink = useSelector(selectPaginationNext);
  const cards = useSelector(selectCardsFetchedCards);
  // const otherPageLoaded = useSelector(selectOtherPageLoading);
  const [scrollLevel, setScrollLevel] = useState();
  const [roots, setRoots] = useState();
  const [shouldLoadNext, setShouldLoadNext] = useState();
  const totalNumberOfResults = useSelector(selectTotalNumberOfResults);
  const searchType = useSelector(selectSearchType);
  const isLoaded = useSelector(selectIsLoaded);

  const [cardPreviewSize, setCardPreviewSize] = useState(cardsSize);

  useEffect(() => {
    if (isLoaded) {
      setCardPreviewSize(cardsSize);
    }
  }, [cardsSize, searchType, isLoaded]);

  // détecter le bas de la grille
  const observer = useRef();
  const bottomGrid = useCallback(
    (node) => {
      if (!isLoaded) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextPageLink) {
          dispatch(getOtherPageAction(nextPageLink));
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoaded, dispatch, nextPageLink]
  );

  // gestion grille masonry
  const minColWidth = 256;

  const rootElements = [...document.getElementsByClassName("masonry-root")];
  const cellElements = [...document.getElementsByClassName("masonry-cell")];
  const cardsElements = [
    ...document.getElementsByClassName("CardPreviewSmall"),
  ];

  let rootsData;

  const onLoad = useCallback(() => {
    let roots = rootElements.map((rootEl) => {
      // const cellElements = [...document.getElementsByClassName("masonry-cell")];
      const cells = cellElements.map((cell) => {
        let style = getComputedStyle(cell);
        return {
          element: cell,
          outerHeight:
            parseInt(style.marginTop) +
            cell.offsetHeight +
            parseInt(style.marginBottom),
        };
      });
      return {
        element: rootEl,
        noOfColumns: 0,
        cells: cells,
      };
    });
    rootsData = roots;
    // do the first layout
    onResize(roots);
  }, [cellElements, rootElements]);

  const onResize = (roots) => {
    cardsElements.map((card) => (card.style.width = minColWidth + "px"));
    roots.forEach((root) => {
      // only layout when the number of columns has changed
      let newNoOfColumns = Math.floor(root.element.offsetWidth / minColWidth);
      if (newNoOfColumns !== root.noOfColumns) {
        // initialize
        root.noOfColumns = newNoOfColumns;
        let columns = [];
        for (let i = 0; i < root.noOfColumns; i++) {
          columns.push({
            cells: [],
            outerHeight: 0,
          });
        }

        // divide...
        root.cells.forEach((cell) => {
          const minOuterHeight = Math.min(
            ...columns.map((column) => column.outerHeight)
          );
          const column = columns.find(
            (column) => column.outerHeight === minOuterHeight
          );
          column.cells.push(cell);
          column.outerHeight += cell.outerHeight;
        });

        // calculate masonry height
        const masonryHeight = Math.max(
          ...columns.map((column) => column.outerHeight)
        );

        // ...and conquer
        let order = 0;
        columns.forEach((column) => {
          column.cells.forEach((cell) => {
            cell.element.style.order = order++;
            // set the cell's flex-basis to 0
            cell.element.style.flexBasis = 0;
          });

          // set flex-basis of the last cell to fill the
          // leftover space at the bottom of the column
          // to prevent the first cell of the next column
          // to be rendered at the bottom of this column
          column.cells[column.cells.length - 1].element.style.flexBasis =
            column.cells[column.cells.length - 1].element.offsetHeight +
            masonryHeight -
            column.outerHeight -
            1 +
            "px";
        });

        // set the masonry height to trigger
        // re-rendering of all cells over columns
        // one pixel more than the tallest column
        root.element.style.maxHeight = masonryHeight + 1 + "px";
      }
    });
  };

  // subscribe to load and resize events
  // window.addEventListener("load", onLoad);
  window.addEventListener("resize", () => {
    if (rootsData) {
      onResize(rootsData);
    }
  });

  useEffect(() => {
    if (isLoaded) {
      onLoad();
    }
  }, [isLoaded, onLoad]);

  return (
    <div className="CardGridList">
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
          <div className="masonry-root">
            {cards &&
              cards.map((card) => {
                return (
                  <div className="masonry-cell" key={card.id}>
                    <CardPreviewSmall card={card} />
                  </div>
                );
              })}
          </div>
        </>
      )}

      <CardFullPopup />
      {!isLoaded && <Loading />}
      <div className="bottom-grid" ref={bottomGrid}></div>
    </div>
  );
};

export default withRouter(CardGridList);
