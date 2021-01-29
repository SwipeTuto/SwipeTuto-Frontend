import React from "react";

import "./ConfirmationOverlay.scss";
import CustomButton from "../CustomButton/CustomButton";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../redux/layout/layout-selectors";

const ConfirmationOverlay = ({ message, handleConfirmClick, handleRejectClick }) => {
  const currentTheme = useSelector(selectTheme);
  return (
    <div className="ConfirmationOverlay" onClick={() => handleRejectClick()}>
      <div className={`ConfirmationOverlay__wrapper ${currentTheme}-theme-m`}>
        <h2 className="title title-2">{message && message}</h2>
        <div className="ConfirmationOverlay__buttons">
          <CustomButton color="white" onClick={() => handleRejectClick()}>
            Annuler
          </CustomButton>
          <CustomButton onClick={() => handleConfirmClick()}>Confirmer</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationOverlay;
