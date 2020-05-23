// Component qui renvoie la liste des card sous forme d'une grille
import React from "react";

import CardPreview from "../CardPreview/CardPreview";

import "./CardGridList.scss";

const CardGridList = () => {
  return (
    <div className="CardGridList">
      <div className="CardGridList__wrapper">
        <CardPreview />
        <CardPreview />
        <CardPreview />
        <CardPreview />
        <CardPreview />
        <CardPreview />
        <CardPreview />
        <CardPreview />
      </div>
    </div>
  );
};

export default CardGridList;
