import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DraftPreview from "../../components/CardsComponents/DraftPreview/DraftPreview";
import { getCardsByUserIdAction } from "../../redux/filter/filter-actions";
import { selectCardsFetchedCards } from "../../redux/filter/filter-selectors";
import { setCardsSize } from "../../redux/layout/layout-actions";
import { selectTheme } from "../../redux/layout/layout-selectors";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import "./DrafstPage.scss";

const DraftsPage = () => {
  const currentTheme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const fetchedCards = useSelector(selectCardsFetchedCards);

  useEffect(() => {
    if (currentUser && currentUser.id) dispatch(getCardsByUserIdAction(currentUser.id));
  }, [currentUser, dispatch]);

  useEffect(() => {
    dispatch(setCardsSize("big"));
  }, [dispatch]);

  return (
    <div className={`DraftsPage ${currentTheme}-theme-d`}>
      <h2 className="title title-2">Vos brouillons</h2>
      <div className="DraftsPage__drafts">
        {fetchedCards &&
          fetchedCards.filter((card) => card.state && card.state === 1).map((draftCard) => <DraftPreview key={draftCard.id} draftCard={draftCard} />)}
        {/* <DraftPreview />
        <DraftPreview />
        <DraftPreview />
        <DraftPreview />
        <DraftPreview />
        <DraftPreview />
        <DraftPreview />
        <DraftPreview />
        <DraftPreview />
        <DraftPreview />
        <DraftPreview />
        <DraftPreview />
        <DraftPreview />
        <DraftPreview />
        <DraftPreview />
        <DraftPreview /> */}
      </div>
    </div>
  );
};

export default DraftsPage;
