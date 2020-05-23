// Component qui renvoie la liste des card sous forme d'une grille
import React from "react";

import CardPreview from "../CardPreview/CardPreview";

import "./CardGridList.scss";

const CardGridList = () => {
  return (
    <div className="CardGridList">
      <CardPreview />
      <CardPreview />
      <CardPreview />
      <CardPreview />
      <CardPreview />
      <CardPreview />
      <CardPreview />
      <CardPreview />
    </div>
  );
};

export default CardGridList;
