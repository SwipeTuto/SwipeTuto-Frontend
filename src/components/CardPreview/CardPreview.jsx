// Component qui présente en résumé dans la grille un slide avec image de preview, auteur etc ...
import React from "react";

import "./CardPreview.scss";

const CardPreview = (props) => {
  // Faire une vérification : si le titre > X caractères : le couper et remplacer par "..."
  // Au clic doit renvoyer sur la page CardPage
  return (
    <div className="CardPreview">
      <div className="CardPreview__image">{/* <img src="" alt="" /> */}</div>
      <div className="CardPreview__details">
        <div className="CardPreview__title">
          Titre Card blablabl ablabafo fkgfrpgl
        </div>
        <div className="CardPreview__tags">
          <span className="tag">#CSS</span>
          <span className="tag">#HTML</span>
          <span className="tag">#JS</span>
        </div>
        <div className="CardPreview__hidden_details">
          <div className="CardPreview__category">
            <p className="category__text">Catégorie : Design</p>
          </div>
          <div className="details__user">
            <div className="details__user_avatar">
              {/* <img src="" alt="" /> */}
            </div>
            <h4 className="title title-4 details__user_name">Wikode</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;
