import React, { useEffect } from "react";

import { ReactComponent as GoTopLogo } from "../../assets/images/chevrons/arrow-up-circle.svg";

import "./RessourcesPage.scss";
import { RESSOURCES_WEB } from "./RESSOURCES_WEB";

const RessourcesPage = () => {
  window.onscroll = function () {
    scrollFunction();
  };

  const scrollFunction = () => {
    let goTopButton = document.querySelector(".goTop__button");
    console.log(goTopButton);
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
        {RESSOURCES_WEB.map((category) => {
          return (
            <a href={`#${category.id}`} className="ressource-navigation__item">
              {category.title}
            </a>
          );
        })}
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
                return (
                  <li className="ressource-item">
                    <a
                      href={ressource.lien}
                      target="_blank"
                      rel="noopener noreferrer"
                      alt="ressource website link"
                    >
                      {ressource.nom}
                    </a>
                    <p className="ressource-item__description">
                      {ressource.description}
                    </p>
                  </li>
                );
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
