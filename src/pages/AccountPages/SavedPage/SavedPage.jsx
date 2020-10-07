import React, { useEffect } from "react";
import CardGridList from "../../../components/CardsComponents/CardGridList/CardGridList";
import { getUserFavoriesAction } from "../../../redux/filter/filter-actions";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUserId } from "../../../redux/user/user-selectors";

import "./SavedPage.scss";
import { setCardsSize } from "../../../redux/layout/layout-actions";
import { selectCardsFetchedCards } from "../../../redux/filter/filter-selectors";
import { withRouter } from "react-router-dom";
import {
  selectIsLoaded,
  selectTheme,
} from "../../../redux/layout/layout-selectors";
import Loading from "../../../components/Loading/Loading";
import CardFullPopup from "../../../components/CardsComponents/CardFullPopup/CardFullPopup";

const SavedPage = ({ location }) => {
  const currentTheme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const currentUserId = useSelector(selectCurrentUserId);
  const cards = useSelector(selectCardsFetchedCards);
  const isLoaded = useSelector(selectIsLoaded);

  useEffect(() => {
    dispatch(setCardsSize("small"));
  });

  useEffect(() => {
    dispatch(getUserFavoriesAction(currentUserId));
  }, [dispatch, currentUserId]);

  return (
    <div className={`SavedPage ${currentTheme}-theme`}>
      <div className="SavedPage__cards">
        <h1 className="title title-1">Vos cartes sauvegardées :</h1>
        {!isLoaded ? (
          <Loading />
        ) : cards.length > 0 ? (
          <CardGridList loadFilter={false} />
        ) : (
          <p className="SavedPage__nocards">Aucune carte pour le moment.</p>
        )}
        <CardFullPopup />
      </div>
    </div>
  );
};

export default withRouter(SavedPage);
