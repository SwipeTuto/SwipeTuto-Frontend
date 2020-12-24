import React from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../redux/layout/layout-selectors";
import stlogo from "../../../assets/stlogos/logo seul.png";
import "./DraftPreview.scss";

const DraftPreview = ({ draft }) => {
  const currentTheme = useSelector(selectTheme);
  // editer : ouverture dans addCard

  // supprimer : popup confirmation puis action state = 2

  // publier : popup confirmation puis action state = 1

  return (
    <div className={`DraftPreview ${currentTheme}-theme-l`}>
      <div className="DraftPreview__image">
        <img src={stlogo} alt="" />
      </div>
      <div className="DraftPreview__wrapper">
        <div className="DraftPreview__title">
          <h3 className="DraftPreview__title title title-3">
            Titre de brouillon qfdsqf fdsfsdfgsf sdfgsgfdsg fgsfgdfgsfgdfgsfgdfgsfgdfgsfgdfgsfgdfgsfgd fgsfgdfgsfgdfgsfgd fgsfgdfgsfgd fgsfgd Titre de
            brouillon qfdsqf fdsfsdfgsf sdfgsgfdsg fgsfgdfgsfgdfgsfgdfgsfgdfgsfgdfgsfgdfgsfgd fgsfgdfgsfgdfgsfgd fgsfgdfgsfgd fgsfgd
          </h3>
        </div>
        <div className="DraftPreview__actions">
          <button className="DraftPreview__button">Supprimer</button>
          <button className="DraftPreview__button">Editer</button>
          <button className="DraftPreview__button">Publier</button>
        </div>
      </div>
    </div>
  );
};

export default DraftPreview;
