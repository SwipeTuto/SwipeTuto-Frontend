import React from "react";

import { ReactComponent as LogoSun } from "../../../assets/images/sunny.svg";
import { ReactComponent as LogoMoon } from "../../../assets/images/moon.svg";

import "./ToggleTheme.scss";

const ToggleButton = ({ theme, toggleTheme }) => {
  const isLight = theme === "light";
  return (
    <button onClick={toggleTheme} className="ToggleTheme">
      {isLight ? (
        <>
          Thème Sombre
          <LogoMoon className="ToggleTheme__logo" />
        </>
      ) : (
        <>
          Thème Clair
          <LogoSun className="ToggleTheme__logo" />
        </>
      )}
    </button>
  );
};

export default ToggleButton;
