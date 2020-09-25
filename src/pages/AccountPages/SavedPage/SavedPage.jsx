import React, { useEffect } from "react";
import CardGridListMasonry from "../../../components/CardsComponents/CardGridList/CardGridListMasonry";
import { getUserFavoriesAction } from "../../../redux/filter/filter-actions";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUserId } from "../../../redux/user/user-selectors";

const SavedPage = () => {
  const dispatch = useDispatch();
  const currentUserId = useSelector(selectCurrentUserId);

  useEffect(() => {
    dispatch(getUserFavoriesAction(currentUserId));
  }, [dispatch, currentUserId]);

  return (
    <div className="SavedPage">
      <CardGridListMasonry cardsSize="small" />
    </div>
  );
};

export default SavedPage;
