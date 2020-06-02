// Component qui présente en résumé dans la grille un slide avec image de preview, auteur etc ...
import React from "react";
import { truncate } from "../../../utilsFunctions";

import UserNameAndAvatarSmall from "../../UserComponents/UserNameAndAvatarSmall/UserNameAndAvatarSmall";
import CustomButton from "../../LayoutComponents/CustomButton/CustomButton";
import CardSliderForPreview from "../CardSlider/CardSliderForPreview";

import "./CardPreviewBig.scss";

const CardPreviewBig = ({ handleCardFullPopupClick, card }) => {
  // card = l'objet card qui contient toutes les infos d'une card

  return (
    <div className="CardPreviewBig" data-slideid="1">
      {/* faire le component ci-dessous sans les indicateurs de slide et avec chevron qui apparaissent au-dessus des slides a survol */}
      <CardSliderForPreview
        className="CardPreviewBig__slider"
        cardSlides={card.slides}
      />
      <div className="CardPreviewBig__details">
        <div className="CardPreviewBig__title">
          {truncate(card.title, 30, true)}
        </div>
        <span className="horizontal-separation-primary-dark"></span>
        <UserNameAndAvatarSmall
          className="CardPreviewBig__author"
          authorName={truncate(card.author, 10, false)}
        />
        <div className="CardPreviewBig__tags">
          {card.tags.length > 3
            ? card.tags
                .slice(0, 3)
                .map((tag) => <span className="tag">{`#${tag}`}</span>)
            : card.tags.map((tag) => <span className="tag">{`#${tag}`}</span>)}
        </div>
        <div className="CardPreviewBig__category">
          <p className="category__text">
            {`Catégorie : ${card.category.toUpperCase()}`}
          </p>
          <p className="category__text">
            {`Langage : ${card.langage.toUpperCase()}`}
          </p>
        </div>
        <CustomButton
          color="dark"
          onClick={(e) => {
            handleCardFullPopupClick(
              e.target.parentElement.parentElement,
              card
            );
          }}
        >
          Voir &rarr;
        </CustomButton>
      </div>
    </div>
  );
};

export default CardPreviewBig;
