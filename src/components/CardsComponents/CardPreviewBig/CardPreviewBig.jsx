// Component qui présente en résumé dans la grille un slide avec image de preview, auteur etc ...
import React from "react";

import UserNameAndAvatarSmall from "../../UserComponents/UserNameAndAvatarSmall/UserNameAndAvatarSmall";
import CustomButton from "../../LayoutComponents/CustomButton/CustomButton";
import CardSliderForPreview from "../CardSlider/CardSliderForPreview";

import "./CardPreviewBig.scss";

const CardPreviewBig = ({ handleCardFullPopupClick }) => {
  // Faire une vérification : si le titre > X caractères : le couper et remplacer par "..."
  // Faire une vérif : si + que 4 tags enlever les autres
  // Associer le slideid avec soit le id du slide soit le index de la liste des résultats de recherche (permettra navigation après)
  return (
    <div className="CardPreviewBig" data-slideid="1">
      {/* faire le component ci-dessous sans les indicateurs de slide et avec chevron qui apparaissent au-dessus des slides a survol */}
      <CardSliderForPreview className="CardPreviewBig__slider" />
      <div className="CardPreviewBig__details">
        <div className="CardPreviewBig__title">
          Titre Card blablabl ablabafo fkgfrpgl
        </div>
        <span className="horizontal-separation-primary-dark"></span>
        <UserNameAndAvatarSmall className="CardPreviewBig__author" />
        <div className="CardPreviewBig__tags">
          <span className="tag">#CSS</span>
          <span className="tag">#HTML</span>
          <span className="tag">#JS</span>
        </div>
        <div className="CardPreviewBig__category">
          <p className="category__text">Catégorie : Design</p>
          <p className="category__text">Collection : HTML</p>
        </div>
        <CustomButton
          color="dark"
          onClick={(e) =>
            handleCardFullPopupClick(e.target.parentElement.parentElement)
          }
        >
          Voir &rarr;
        </CustomButton>
      </div>
    </div>
  );
};

export default CardPreviewBig;
