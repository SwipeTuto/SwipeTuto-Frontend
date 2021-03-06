import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DraftPreview from "../../components/CardsComponents/DraftPreview/DraftPreview";
import Loading from "../../components/Loading/Loading";
import { getCardsByUserIdAction } from "../../redux/filter/filter-actions";
import { selectCardsFetchedCards } from "../../redux/filter/filter-selectors";
import { setCardsSize } from "../../redux/layout/layout-actions";
import { selectIsLoaded, selectTheme } from "../../redux/layout/layout-selectors";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import "./DrafstPage.scss";

const DraftsPage = () => {
  const currentTheme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const fetchedCards = useSelector(selectCardsFetchedCards);
  const isLoaded = useSelector(selectIsLoaded);

  useEffect(() => {
    if (currentUser && currentUser.id) dispatch(getCardsByUserIdAction(currentUser.id, 0));
  }, [currentUser, dispatch]);

  // useEffect(() => {
  //   dispatch(setCardsSize("big"));
  // }, [dispatch]);

  return (
    <div className={`DraftsPage ${currentTheme}-theme-d`}>
      <h2 className="title title-2">Vos brouillons</h2>
      <div className="DraftsPage__drafts">
        {isLoaded ? (
          fetchedCards && fetchedCards.filter((card) => card.state === 0).length === 0 ? (
            <p>Aucun brouillon pour le moment.</p>
          ) : (
            fetchedCards?.filter((card) => card.state === 0).map((draftCard) => <DraftPreview key={draftCard.id} draftCard={draftCard} />)
          )
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default DraftsPage;
