import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

// redux
import {
  selectCardsFetchedCards,
  selectSearchType,
  selectTotalNumberOfResults,
  selectNewPageCards,
  selectPaginationNext,
} from "../../../redux/filter/filter-selectors";
import { selectIsLoaded } from "../../../redux/layout/layout-selectors";

// components
import CardPreviewSmall from "../CardPreviewSmall/CardPreviewSmall";
import CardFullPopup from "../../CardsComponents/CardFullPopup/CardFullPopup";
import Loading from "../../Loading/Loading";

// scss
import "./CardGridList.scss";
import { getOtherPageAction } from "../../../redux/filter/filter-actions";
import CustomButton from "../../LayoutComponents/CustomButton/CustomButton";
import { useCallback } from "react";

const CardGridList = ({ cardsSize }) => {
  const dispatch = useDispatch();
  const nextPageLink = useSelector(selectPaginationNext);
  let nextPageLinkCopy = nextPageLink;
  const cards = useSelector(selectCardsFetchedCards);
  const [shouldLoadNext, setShouldLoadNext] = useState(false);
  const [scrollLevelReached, setScrollLevelReached] = useState(false);
  const totalNumberOfResults = useSelector(selectTotalNumberOfResults);
  const searchType = useSelector(selectSearchType);
  const isLoaded = useSelector(selectIsLoaded);
  // const cardGridListWrapper = document.querySelector(".CardGridList__wrapper");
  const loadMoreBtn = document.querySelector("#loadMoreBtn");

  const [cardPreviewSize, setCardPreviewSize] = useState(cardsSize);

  useEffect(() => {
    if (isLoaded) {
      setCardPreviewSize(cardsSize);
    }
  }, [cardsSize, searchType, isLoaded]);

  // useEffect(() => {
  //   if (shouldLoadNext) {
  //     loadNextPage();
  //   }
  // }, [shouldLoadNext]);

  // const loadNextPage = () => {
  //   if (nextPageLinkCopy && shouldLoadNext) {
  //     console.log("ACTION CALL");
  //     // console.log(nextPageLinkCopy);
  //     // dispatch(getOtherPageAction(nextPageLinkCopy));
  //     setShouldLoadNext(false);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", (e) => {
  //     e.stopPropagation();
  //     const windowHeight = window.innerHeight;
  //     const loadMoreBtnLevel = loadMoreBtn?.getBoundingClientRect().top;
  //     if (scrollLevelReached === true) {
  //       return;
  //     } else {
  //       if (loadMoreBtnLevel < windowHeight) {
  //         setShouldLoadNext(true);
  //       } else {
  //         setShouldLoadNext(false);
  //       }
  //     }
  //   });
  // }, [loadMoreBtn, scrollLevelReached]);

  return (
    <div className="CardGridList">
      <div
        className={`CardGridList__wrapper CardGridList__wrapper${
          cardPreviewSize === "small" ? "--small" : "--big"
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
      {nextPageLink && (
        <CustomButton
          onClick={() => {
            setShouldLoadNext(true);
          }}
          id="loadMoreBtn"
        >
          Charger plus
        </CustomButton>
      )}

      <CardFullPopup />
    </div>
  );
};

export default withRouter(CardGridList);
