import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import Colcade from "colcade";

// redux
import {
  selectCardsFetchedCards,
  selectSearchType,
  selectTotalNumberOfResults,
  selectPaginationNext,
} from "../../../redux/filter/filter-selectors";
import { selectIsLoaded } from "../../../redux/layout/layout-selectors";

// components
import CardPreviewSmall from "../CardPreviewSmall/CardPreviewSmall";
import CardFullPopup from "../CardFullPopup/CardFullPopup";
import Loading from "../../Loading/Loading";

// scss
import { ReactComponent as GoTopLogo } from "../../../assets/images/chevrons/arrow-up-circle.svg";
import "./CardGridListColcade.scss";
import { getOtherPageAction } from "../../../redux/filter/filter-actions";
import { useCallback } from "react";

const CardGridList = ({ cardsSize }) => {
  const dispatch = useDispatch();
  const nextPageLink = useSelector(selectPaginationNext);
  const cards = useSelector(selectCardsFetchedCards);

  const totalNumberOfResults = useSelector(selectTotalNumberOfResults);
  const searchType = useSelector(selectSearchType);
  const isLoaded = useSelector(selectIsLoaded);

  const [gridItems, setGridItems] = useState();

  useEffect(() => {
    if (isLoaded) {
      const allGridItems = [...document.getElementsByClassName("grid-item")];
      setGridItems(allGridItems);
    }
  }, [cardsSize, searchType, isLoaded]);

  // element as first argument
  // var grid = document.querySelector(".grid");
  // var colc = new Colcade(".grid", {
  //   columns: ".grid-col",
  //   items: ".grid-item",
  // });

  useEffect(() => {});

  const observer = useRef();
  const bottomGrid = useCallback(
    (node) => {
      if (!isLoaded) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextPageLink) {
          dispatch(getOtherPageAction(nextPageLink));
          // msnry.layout();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoaded, dispatch, nextPageLink]
  );

  window.onscroll = function () {
    scrollFunction();
  };

  const scrollFunction = () => {
    let goTopButton = document.querySelector(".goTop__button");

    if (
      goTopButton &&
      (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
    ) {
      goTopButton.style.display = "block";
    } else if (goTopButton) {
      goTopButton.style.display = "none";
    }
  };

  const handleGoTopButton = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  return (
    <div className="CardGridList">
      <div
        className="grid"
        data-colcade="columns: .grid-col, items: .grid-item"
      >
        <div className="grid-col grid-col--1"></div>
        <div className="grid-col grid-col--2"></div>
        <div className="grid-col grid-col--3"></div>
        {cardsSize === "small" ? (
          <div className="grid-col grid-col--4"></div>
        ) : null}
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
            {/* <div className={`grid-sizer grid-sizer--${cardsSize}`}></div> */}
            {cards &&
              cards.map((card) => {
                return (
                  <div
                    className={`grid-item grid-item--${cardsSize}`}
                    key={card.id}
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
      {cards && gridItems && cards.length === gridItems.length && (
        <div className="bottom-grid" ref={bottomGrid}></div>
      )}

      <GoTopLogo className="goTop__button" onClick={handleGoTopButton} />
    </div>
  );
};

export default withRouter(CardGridList);
