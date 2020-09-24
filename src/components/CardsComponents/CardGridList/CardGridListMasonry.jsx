import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

// redux
import {
  selectCardsFetchedCards,
  selectSearchType,
  selectTotalNumberOfResults,
  selectNewPageCards,
  selectPaginationNext,
  selectLatestFetchCards,
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
import "./CardGridListMasonry.scss";
import { getOtherPageAction } from "../../../redux/filter/filter-actions";
import CustomButton from "../../LayoutComponents/CustomButton/CustomButton";
import { useCallback } from "react";
import { createElement } from "react";

const CardGridList = ({ cardsSize }) => {
  const dispatch = useDispatch();
  const nextPageLink = useSelector(selectPaginationNext);
  const cards = useSelector(selectCardsFetchedCards);

  const latestCards = useSelector(selectLatestFetchCards);
  // const otherPageLoaded = useSelector(selectOtherPageLoading);
  const [prevCards, setPrevCards] = useState([]);

  const totalNumberOfResults = useSelector(selectTotalNumberOfResults);
  const searchType = useSelector(selectSearchType);
  const isLoaded = useSelector(selectIsLoaded);

  const [cardPreviewSize, setCardPreviewSize] = useState(cardsSize);

  useEffect(() => {
    if (isLoaded) {
      setCardPreviewSize(cardsSize);
    }
  }, [cardsSize, searchType, isLoaded]);

  const observer = useRef();
  const bottomGrid = useCallback(
    (node) => {
      if (!isLoaded) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextPageLink) {
          console.log("VISIBLE");
          dispatch(getOtherPageAction(nextPageLink));
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoaded, dispatch, nextPageLink]
  );

  var elem = document.querySelector(".grid");
  var msnry = new Masonry(elem, {
    itemSelector: ".grid-item",
    columnWidth: ".grid-sizer",
    percentPosition: true,
    gutter: 10,
    horizontalOrder: true,
    fitWidth: true,
  });

  imagesLoaded(elem).on("progress", function () {
    msnry.layout();
  });

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
          <div className="grid">
            <div class={`grid-sizer grid-sizer--${cardsSize}`}></div>
            {cards &&
              cards.map((card) => {
                return (
                  <div
                    className={`grid-item grid-item--${cardsSize}`}
                    key={card.id}
                  >
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
