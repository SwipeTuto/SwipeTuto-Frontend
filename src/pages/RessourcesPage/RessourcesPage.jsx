import React from "react";

import { ReactComponent as GoTopLogo } from "../../assets/images/chevrons/arrow-up-circle.svg";
import { ReactComponent as ChevronLeft } from "../../assets/images/chevrons/chevron-back.svg";
import { ReactComponent as ChevronRight } from "../../assets/images/chevrons/chevron-forward.svg";
import CardPreviewSmallRessources from "../../components/CardPreviewSmallRessources/CardPreviewSmallRessources";

import "./RessourcesPage.scss";
import { RESSOURCES_WEB } from "./RESSOURCES_WEB";

const RessourcesPage = () => {
  // scroll reset
  if (window.scrollY) {
    window.scroll(0, 0);
  }

  window.onscroll = function () {
    scrollFunction();
  };

  const scrollFunction = () => {
    let goTopButton = document.querySelector(".goTop__button");

    if (
      goTopButton &&
      (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
    ) {
      goTopButton.style.display = "block";
    } else if (goTopButton) {
      goTopButton.style.display = "none";
    }
  };

  const handleGoTopButton = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  return (
    <div className="RessourcesPage">
      <h1 className="title title-1">
        Ressources utiles pour le développeur Web
      </h1>
      <div className="ressource-navigation">
        <div className="scroll-logo">
          <ChevronLeft />
        </div>
        <div className="ressource-navigation-scroll">
          {RESSOURCES_WEB.map((category) => {
            return (
              <a
                href={`#${category.id}`}
                className="ressource-navigation__item"
              >
                {category.title}
              </a>
            );
          })}
        </div>

        <div className="scroll-logo">
          <ChevronRight />
        </div>
      </div>

      {RESSOURCES_WEB.map((category) => {
        return (
          <div className="ressource-category">
            <h2 className="title title-2" id={category.id}>
              {category.title}
            </h2>
            <p className="ressource-note">{category.note}</p>
            <ul className="ressource-liste">
              {category.ressources.map((ressource) => {
                return <CardPreviewSmallRessources ressource={ressource} />;
              })}
            </ul>
          </div>
        );
      })}

      <GoTopLogo className="goTop__button" onClick={handleGoTopButton} />
    </div>
  );
};

export default RessourcesPage;
