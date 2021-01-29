import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./InfosPage.scss";
import { selectTheme } from "../../redux/layout/layout-selectors";

const InfosPage = () => {
  const currentTheme = useSelector(selectTheme);
  // scroll reset

  if (window.scrollY) {
    window.scroll(0, 0);
  }

  return (
    <div className={`InfosPage ${currentTheme}-theme-d`}>
      <h1 className="title title-1">Informations</h1>
      <h2 className="title title-2">Général</h2>
      <p>
        Swipetuto est une plateforme de partage de tutoriels. Créée en 2020 par
        deux développeurs auto-didactes, la plateforme va encore évoluer et
        grandir, avec l'ajout de nombreuses fonctionnalités dans un futur
        proche.
      </p>
      <h2 className="title title-2">Le concept</h2>
      <p>
        Les utilisateurs sont libres de s'inscrire et de publier leur propres
        tutoriels dans le format swipetuto. Ce format est basé sur l'utilisation
        d'images pour présenter les informations de façon claire, rapide à
        comprendre, et optimale pour l'apprentissage. Ensemble, ces images
        donnent un carousel qu'il est possible de faire défiler sur tout
        appareil doté d'un écran tactile. En plus de ces images, il est possible
        d'ajouter un texte descriptif. Toutes ces informations constituent
        ensemble une "carte" de tutoriel. Il est alors possible d'aimer (like),
        d'enregistrer et de commenter ces cartes pour intéragir avec la
        communauté et favoriser l'apprentissage commun.
      </p>
      <h2 className="title title-2">Nous rejoindre</h2>
      <p>
        En pleine phase de développement, Swipetuto peut être amené à solliciter
        des aides tierces. Vous pensez avec quelque chose à nous apporter ?
        Proposez-nous vos idées dans la rurbique{" "}
        <Link to="/contact">Contact.</Link>
      </p>
    </div>
  );
};

export default InfosPage;
