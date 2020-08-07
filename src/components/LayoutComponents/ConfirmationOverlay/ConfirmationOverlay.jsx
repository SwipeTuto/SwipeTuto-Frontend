import React from "react";

import "./ConfirmationOverlay.scss";
import CustomButton from "../CustomButton/CustomButton";

const ConfirmationOverlay = ({
  message,
  handleConfirmClick,
  handleRejectClick,
}) => {
  return (
    <div className="ConfirmationOverlay" onClick={() => handleRejectClick()}>
      <div className="ConfirmationOverlay__wrapper">
        <h2 className="title title-2">{message && message}</h2>
        <div className="ConfirmationOverlay__buttons">
          <CustomButton color="white" onClick={() => handleRejectClick()}>
            Annuler
          </CustomButton>
          <CustomButton onClick={() => handleConfirmClick()}>
            Confirmer
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationOverlay;
