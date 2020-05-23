// Component qui présente en résumé dans la grille un slide avec image de preview, auteur etc ...
import React from "react";

import UserNameAndAvatarSmall from "../UserNameAndAvatarSmall/UserNameAndAvatarSmall";
import CustomButton from "../CustomButton/CustomButton";

import "./CardPreview.scss";

const CardPreview = (props) => {
  // Faire une vérification : si le titre > X caractères : le couper et remplacer par "..."
  // Au clic doit renvoyer sur la page CardPage "/card/:id"
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
        <div className="CardPreview__category">
          <p className="category__text">Catégorie : Design</p>
        </div>
        <UserNameAndAvatarSmall className="CardPreview__author" />
        <CustomButton color="dark">Voir &rarr;</CustomButton>
      </div>
    </div>
  );
};

export default CardPreview;
