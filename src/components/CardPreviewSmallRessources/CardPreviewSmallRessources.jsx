import React from "react";

import "./CardPreviewSmallRessources.scss";

const CardPreviewSmallRessources = ({
  ressource: { nom, description, lien },
}) => {
  return (
    <div className="CardPreviewSmallRessources">
      <a href={lien} target="_blank" rel="noopener noreferrer">
        <h4 className="title title-4">{nom}</h4>
        <p>{description}</p>
      </a>
    </div>
  );
};

export default CardPreviewSmallRessources;
