import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../../../redux/layout/layout-selectors";
import "./DraftPreview.scss";
import ConfirmationOverlay from "../../LayoutComponents/ConfirmationOverlay/ConfirmationOverlay";
import { deleteCardAction, getCardsByUserIdAction, updateCardAction } from "../../../redux/filter/filter-actions";
import { selectCurrentUserId } from "../../../redux/user/user-selectors";
import { withRouter } from "react-router-dom";
import { openNotificationPopup } from "../../../redux/layout/layout-actions";
import { formattedDate } from "../../../helper/functions/formateDate";

const DraftPreview = ({ draftCard, history }) => {
  const currentTheme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const currentuserId = useSelector(selectCurrentUserId);
  const [confirmDeletePopupOpen, setConfirmDeletePopupOpen] = useState({
    open: false,
    message: "",
    id: null,
  });
  const [confirmPublishPopupOpen, setConfirmPublishPopupOpen] = useState({
    open: false,
    message: "",
    id: null,
  });

  const handleDeleteDraft = (draftID) => {
    setConfirmDeletePopupOpen({
      open: true,
      message: "Voulez-vous vraiment supprimer ce brouillon de façon définitive ?",
      id: draftID,
    });
  };

  const handleConfirmDeleteClick = async () => {
    (await confirmDeletePopupOpen?.id) && dispatch(deleteCardAction(confirmDeletePopupOpen.id, currentuserId, history));
    handleRejectDeleteClick();
  };
  const handleRejectDeleteClick = () => {
    setConfirmDeletePopupOpen({
      open: false,
      message: "",
      id: null,
    });
  };

  const handlePublishDraft = (draftID) => {
    setConfirmPublishPopupOpen({
      open: true,
      message: "Voulez-vous vraiment publier ce brouillon ?",
      id: draftID,
    });
  };

  const handleConfirmPublishClick = async () => {
    try {
      const updateState = {
        ...draftCard,
        state: 1,
      };
      await dispatch(updateCardAction(draftCard.id, updateState));
      dispatch(getCardsByUserIdAction(currentuserId, 0));
      await window.localStorage.removeItem("draftNewCard");
    } catch (err) {
      dispatch(openNotificationPopup("error", "Une erreur est survenue. Merci de réessayer."));
      console.log(err);
    }

    handleRejectPublishClick();
  };

  const handleRejectPublishClick = () => {
    setConfirmPublishPopupOpen({
      open: false,
      message: "",
      id: null,
    });
  };

  const handleEditClick = async (draftCard) => {
    await window.localStorage.setItem(
      "draftNewCard",
      JSON.stringify({
        name: draftCard?.name,
        description: draftCard?.description,
        topic: draftCard?.topic[0]?.name,
        categorie: draftCard?.categorie[0]?.name,
        images: getImagesUrlArray(),
        user: currentuserId,
        id: draftCard?.id,
      })
    );
    history.push("/account/modify");
  };

  const getImagesUrlArray = () => {
    return draftCard?.media_image?.map((imgObj) => imgObj.image);
  };

  return (
    <>
      {confirmDeletePopupOpen && confirmDeletePopupOpen.open && confirmDeletePopupOpen.open === true && (
        <ConfirmationOverlay
          handleConfirmClick={handleConfirmDeleteClick}
          handleRejectClick={handleRejectDeleteClick}
          message={confirmDeletePopupOpen && confirmDeletePopupOpen.message}
        />
      )}
      {confirmPublishPopupOpen && confirmPublishPopupOpen.open && confirmPublishPopupOpen.open === true && (
        <ConfirmationOverlay
          handleConfirmClick={handleConfirmPublishClick}
          handleRejectClick={handleRejectPublishClick}
          message={confirmPublishPopupOpen && confirmPublishPopupOpen.message}
        />
      )}
      <div className={`DraftPreview ${currentTheme}-theme-l`} onClick={() => draftCard && handleEditClick(draftCard)}>
        <div className="DraftPreview__image">
          <img src={draftCard?.media_image[0]?.image} alt="draft preview" />
        </div>
        <div className="DraftPreview__wrapper">
          <div className="DraftPreview__title">
            <h3 className="DraftPreview__title title title-3">{draftCard?.name}</h3>
          </div>
          <p>{draftCard?.modified && formattedDate(draftCard.modified)}</p>
          <div className="DraftPreview__actions" onClick={(e) => e.stopPropagation()}>
            <button className="DraftPreview__button" onClick={() => handleDeleteDraft(draftCard?.id)}>
              Supprimer
            </button>
            <button className="DraftPreview__button" onClick={() => draftCard && handleEditClick(draftCard)}>
              Editer
            </button>
            <button className="DraftPreview__button" onClick={() => handlePublishDraft(draftCard?.id)}>
              Publier
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(DraftPreview);
