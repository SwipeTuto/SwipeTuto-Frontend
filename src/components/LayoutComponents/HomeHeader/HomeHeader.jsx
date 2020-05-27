// A mettre sur HomePage
import React from "react";
import { ReactComponent as HeaderLogo } from "../../../assets/images/header_illustration.svg";

import "./HomeHeader.scss";

const HomeHeader = () => {
  return (
    <div className="HomeHeader">
      <div className="HomeHeader__wrapper">
        <div className="HomeHeader__left">
          <h1 className="title title-1">
            Apprendre.
            <br />
            Rapidement.
            <br />
            <span className="primary-text">Efficacement.</span>
          </h1>
        </div>
        <div className="HomeHeader__right">
          <HeaderLogo className="HomeHeader__right--logo" />
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
