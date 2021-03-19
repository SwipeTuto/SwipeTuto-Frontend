import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRandomCardsAction } from "../../../redux/filter/filter-actions";
import { selectRandomCards } from "../../../redux/filter/filter-selectors";
import { selectTheme } from "../../../redux/layout/layout-selectors";
import CardPreviewSmall from "../../CardsComponents/CardPreviewSmall/CardPreviewSmall";
import CustomButton from "../CustomButton/CustomButton";

import "./RandomCards.scss";

const RandomCards = ({ addClass }) => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  const randomCardsArray = useSelector(selectRandomCards);

  useEffect(() => {
    dispatch(getRandomCardsAction());
  }, [dispatch]);

  const handleFetchRandom = () => {
    dispatch(getRandomCardsAction());
    window.scrollTo(0, 0);
  };
  return (
    <div className={`${addClass ? addClass : ""} RandomCards  ${currentTheme}-theme-m`}>
      <CustomButton color="transparent" onClick={handleFetchRandom}>
        Cartes aléatoires
      </CustomButton>
      {randomCardsArray
        ? randomCardsArray.map((card) => <CardPreviewSmall key={`randomcard-${card?.id}`} card={card} size="small" />)
        : "Chargement ..."}
    </div>
  );
};

export default RandomCards;
