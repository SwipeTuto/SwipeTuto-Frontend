import React from "react";

import "./CardPreviewSmallRessources.scss";

const CardPreviewSmallRessources = ({
  ressource: { nom, description, lien, image },
}) => {
  console.log(image);
  return (
    <div className="CardPreviewSmallRessources">
      <a href={lien} target="_blank" rel="noopener noreferrer">
        <h4 className="title title-4">{nom}</h4>
        <div className="CardPreviewSmallRessources__image">
          <img
            className="CardPreviewSmallRessources__image--image"
            src={image}
            alt="illustration"
          />
        </div>
        <p>{description}</p>
      </a>
    </div>
  );
};

export default CardPreviewSmallRessources;
