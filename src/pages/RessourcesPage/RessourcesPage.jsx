import React from "react";
import { ReactComponent as ChevronLeft } from "../../assets/images/chevrons/chevron-back.svg";
import { ReactComponent as ChevronRight } from "../../assets/images/chevrons/chevron-forward.svg";
import CardPreviewSmallRessources from "../../components/CardPreviewSmallRessources/CardPreviewSmallRessources";
import ScrollButton from "../../components/LayoutComponents/ScrollButton/ScrollButton";

import "./RessourcesPage.scss";
import { RESSOURCES_WEB } from "./RESSOURCES_WEB";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/layout/layout-selectors";

const RessourcesPage = () => {
  const linkBar = document.querySelector(".ressource-navigation-scroll");
  const currentTheme = useSelector(selectTheme);

  // scroll reset
  if (window.scrollY) {
    window.scroll(0, 0);
  }

  const handleScrollRight = () => {
    linkBar.scrollBy(50, 0);
  };
  const handleScrollLeft = () => {
    linkBar.scrollBy(-50, 0);
  };

  return (
    <div className={`RessourcesPage ${currentTheme}-theme`}>
      <div className="RessourcesPage__header">
        <h1 className="title title-1">
          Ressources utiles pour le développeur Web
        </h1>
        <div className="ressource-navigation">
          <div className="scroll-logo" onClick={handleScrollLeft}>
            <ChevronLeft />
          </div>
          <div className="ressource-navigation-scroll">
            {RESSOURCES_WEB.map((category) => {
              return (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="ressource-navigation__item"
                >
                  {category.title}
                </a>
              );
            })}
          </div>

          <div className="scroll-logo" onClick={handleScrollRight}>
            <ChevronRight />
          </div>
        </div>
      </div>

      {RESSOURCES_WEB.map((category) => {
        return (
          <div className="ressource-category section" key={category.id}>
            <h2 className="title title-2" id={category.id}>
              {category.title}
            </h2>
            <p className="ressource-note">{category.note}</p>
            <ul className="ressource-liste">
              {category.ressources.map((ressource) => {
                return (
                  <CardPreviewSmallRessources
                    ressource={ressource}
                    key={ressource.nom}
                  />
                );
              })}
            </ul>
          </div>
        );
      })}

      <ScrollButton />
    </div>
  );
};

export default RessourcesPage;
