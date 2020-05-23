// A mettre sur HomePage
import React from "react";
import { ReactComponent as HeaderLogo } from "../../assets/images/header_illustration.svg";

import "./HomeHeader.scss";

const HomeHeader = () => {
  return (
    <div className="HomeHeader">
      <div className="HomeHeader__left">
        <h1 className="title title-1">
          Apprendre.
          <br />
          Rapidement.
          <br />
          <span className="primary-text">Efficacement.</span>
        </h1>
        <p className="HomeHeader__left--subtitle">
          Lire des pages entière de documentation ?<br />
          Regarder des heures de vidéos ?<br />
          Et si vous pouviez avoir l'information en un coup d'oeil ?
        </p>
        <p className="HomeHeader__left--cta">
          Essayez une recherche par tag en cliquant dessus :
        </p>
        <div className="HomeHeader__left--tags">
          <button>#HTML</button>
          <button>#CSS</button>
          <button>#JAVASCRIPT</button>
        </div>
      </div>
      <div className="HomeHeader__right">
        <HeaderLogo className="HomeHeader__right--logo" />
      </div>
    </div>
  );
};

export default HomeHeader;
