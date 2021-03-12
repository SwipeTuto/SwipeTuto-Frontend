import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCardsSize } from "../../../redux/layout/layout-actions";
import { selectCardsSize } from "../../../redux/layout/layout-selectors";

import { ReactComponent as GridLargeLogo } from "../../../assets/images/grid.svg";
import { ReactComponent as GridSmallLogo } from "../../../assets/images/apps.svg";

import "./CardsSizeButton.scss";

const CardsSizeButton = () => {
  const currentCardSize = useSelector(selectCardsSize);
  const dispatch = useDispatch();

  const handleClickSize = (e) => {
    const newSize = e.target.dataset.gridsize;
    dispatch(setCardsSize(newSize));
    updateCardSize(newSize);
  };

  const updateCardSize = (newSize) => {
    const allGridSizeItems = [...document.querySelectorAll(".FiltersBar__size-logo")];
    allGridSizeItems.map((item) => item.classList.remove("active"));
    const newActiveSizeEl = [...allGridSizeItems.filter((item) => item.dataset.gridsize === newSize)];
    if (newActiveSizeEl[0]) newActiveSizeEl[0].classList.add("active");
  };

  return (
    <div className="CardsSizeButton">
      <div
        className={`CardsSizeButton__size-logo ${currentCardSize === "small" ? "active" : ""}`}
        data-gridsize="small"
        onClick={(e) => handleClickSize(e)}
      >
        <GridSmallLogo className="grid-size-logo" pointerEvents="none" />
      </div>

      <div
        className={`CardsSizeButton__size-logo ${currentCardSize === "big" ? "active" : ""}`}
        data-gridsize="big"
        onClick={(e) => handleClickSize(e)}
      >
        <GridLargeLogo className="grid-size-logo" pointerEvents="none" />
      </div>
    </div>
  );
};

export default CardsSizeButton;
